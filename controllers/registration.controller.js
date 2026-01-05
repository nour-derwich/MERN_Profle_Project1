const Registration = require("../models/registration.models");
const Formation = require("../models/formation.models");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const emailService = require("../utils/sendEmail");
const crypto = require("crypto");
const { query } = require("../config/database"); // Add this import

// @desc    Create new registration
// @route   POST /api/registrations
// @access  Public
exports.createRegistration = asyncHandler(async (req, res, next) => {
  const { formation_id, email, full_name, current_role, terms } = req.body;

  // Check if formation exists and has available slots
  const formation = await Formation.findById(formation_id);

  if (!formation) {
    return next(new ErrorResponse("Formation not found", 404));
  }

  if (formation.current_participants >= formation.max_participants) {
    return next(new ErrorResponse("Formation is full", 400));
  }

  // Check if user already registered for this formation
  const existingRegistration = await Registration.findByEmailAndFormation(
    email,
    formation_id
  );

  if (existingRegistration) {
    return next(
      new ErrorResponse("You are already registered for this formation", 400)
    );
  }

  // Generate verification token
  const verificationToken = crypto.randomBytes(20).toString("hex");
  const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  // Prepare registration data - map current_role to job_title
  const registrationData = {
    ...req.body,
    // Map current_role to job_title for the database
    job_title: req.body.current_role,
    terms_accepted: req.body.terms,
    verification_token: verificationToken,
    verification_token_expires: verificationTokenExpires,
  };

  console.log('Prepared registration data:', registrationData);

  // Create registration
  const registration = await Registration.create(registrationData);

  try {
    // 1. Send confirmation email to user
    await emailService.sendRegistrationConfirmation(registration, formation);

    // 2. Send admin notification
    if (process.env.ADMIN_EMAIL) {
      await emailService.sendAdminNotification(
        registration,
        formation,
        process.env.ADMIN_EMAIL
      );
    }
  } catch (emailError) {
    console.error("Email sending error:", emailError);
    // Don't fail the registration if emails fail
  }

  res.status(201).json({
    success: true,
    message:
      "Registration successful. Please check your email for confirmation.",
    data: {
      id: registration.id,
      full_name: registration.full_name,
      email: registration.email,
      formation_title: formation.title,
      requires_verification: true,
      verification_sent: true,
    },
  });
});

// @desc    Verify registration email
// @route   GET /api/registrations/verify/:token
// @access  Public
exports.verifyEmail = asyncHandler(async (req, res, next) => {
  const { token } = req.params;

  const text = `
    SELECT r.*, f.* 
    FROM registrations r
    JOIN formations f ON r.formation_id = f.id
    WHERE r.verification_token = $1 
    AND r.verification_token_expires > NOW()
    AND r.is_verified = false
  `;
  const result = await query(text, [token]);

  if (!result.rows[0]) {
    return next(
      new ErrorResponse("Invalid or expired verification token", 400)
    );
  }

  const registration = result.rows[0];
  const formation = {
    id: registration.formation_id,
    title: registration.title,
    level: registration.level,
    category: registration.category,
    start_date: registration.start_date,
    price: registration.price,
    currency: registration.currency,
  };

  // Update registration to verified
  const updateText = `
    UPDATE registrations 
    SET is_verified = true, 
        status = 'confirmed',
        verification_token = NULL,
        verification_token_expires = NULL,
        confirmed_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *
  `;
  const updateResult = await query(updateText, [registration.id]);

  try {
    // Send welcome email after verification
    await emailService.sendWelcomeEmail(
      {
        id: registration.id,
        full_name: registration.full_name,
        email: registration.email,
        created_at: registration.created_at,
      },
      formation
    );
  } catch (emailError) {
    console.error("Welcome email error:", emailError);
  }

  res.status(200).json({
    success: true,
    message: "Email verified successfully! Welcome email has been sent.",
    data: {
      ...updateResult.rows[0],
      formation_title: formation.title,
    },
  });
});

// @desc    Resend verification email
// @route   POST /api/registrations/resend-verification
// @access  Public
exports.resendVerificationEmail = asyncHandler(async (req, res, next) => {
  const { email, formation_id } = req.body;

  const text = `
    SELECT r.*, f.* 
    FROM registrations r
    JOIN formations f ON r.formation_id = f.id
    WHERE r.email = $1 
    AND r.formation_id = $2
    AND r.is_verified = false
    AND r.verification_token_expires > NOW()
  `;
  const result = await query(text, [email, formation_id]);

  if (!result.rows[0]) {
    return next(
      new ErrorResponse("No pending verification found or token expired", 400)
    );
  }

  const registration = result.rows[0];
  const formation = {
    id: registration.formation_id,
    title: registration.title,
    level: registration.level,
    category: registration.category,
    start_date: registration.start_date,
    price: registration.price,
    currency: registration.currency,
  };

  try {
    await emailService.sendRegistrationConfirmation(registration, formation);
  } catch (emailError) {
    console.error("Resend email error:", emailError);
    return next(new ErrorResponse("Failed to send verification email", 500));
  }

  res.status(200).json({
    success: true,
    message: "Verification email resent successfully",
  });
});

// @desc    Update payment status and notify user
// @route   PATCH /api/registrations/:id/payment
// @access  Private/Admin
exports.updatePaymentStatus = asyncHandler(async (req, res, next) => {
  const { payment_status, payment_reference, notify_user = true } = req.body;
  const { id } = req.params;

  const registration = await Registration.findById(id);

  if (!registration) {
    return next(new ErrorResponse("Registration not found", 404));
  }

  const formation = await Formation.findById(registration.formation_id);

  // Update payment status
  const updatedRegistration = await Registration.updatePaymentStatus(
    id,
    payment_status,
    payment_reference
  );

  // Send payment confirmation email if payment is successful
  if (notify_user && payment_status === "paid") {
    try {
      await emailService.sendPaymentConfirmation(
        updatedRegistration,
        formation,
        {
          reference: payment_reference,
          method: updatedRegistration.payment_method,
        }
      );
    } catch (emailError) {
      console.error("Payment confirmation email error:", emailError);
    }
  }

  res.status(200).json({
    success: true,
    message:
      "Payment status updated" + (notify_user ? " and user notified" : ""),
    data: updatedRegistration,
  });
});

// @desc    Send welcome email manually
// @route   POST /api/registrations/:id/send-welcome
// @access  Private/Admin
exports.sendWelcomeEmail = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const registration = await Registration.findById(id);

  if (!registration) {
    return next(new ErrorResponse("Registration not found", 404));
  }

  if (!registration.is_verified) {
    return next(new ErrorResponse("Registration not verified yet", 400));
  }

  const formation = await Formation.findById(registration.formation_id);

  try {
    await emailService.sendWelcomeEmail(registration, formation);
  } catch (error) {
    console.error("Welcome email error:", error);
    return next(new ErrorResponse("Failed to send welcome email", 500));
  }

  res.status(200).json({
    success: true,
    message: "Welcome email sent successfully",
  });
});

// @desc    Send custom notification to registrant
// @route   POST /api/registrations/:id/notify
// @access  Private/Admin
exports.sendCustomNotification = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { subject, message } = req.body;

  const registration = await Registration.findById(id);

  if (!registration) {
    return next(new ErrorResponse("Registration not found", 404));
  }

  const formation = await Formation.findById(registration.formation_id);

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4f46e5; color: white; padding: 20px; text-align: center; border-radius: 8px; }
        .content { padding: 20px; background: #f8fafc; border-radius: 8px; margin: 20px 0; }
        .footer { text-align: center; color: #64748b; font-size: 14px; margin-top: 30px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h2>📢 Notification de l'équipe</h2>
        <p>${formation.title}</p>
      </div>
      
      <div class="content">
        <p>Bonjour <strong>${registration.full_name}</strong>,</p>
        ${message.replace(/\n/g, "<br>")}
      </div>
      
      <div class="footer">
        <p>Cordialement,<br>L'équipe ${process.env.FROM_NAME}</p>
        <p>Pour toute question : ${process.env.SUPPORT_EMAIL}</p>
      </div>
    </body>
    </html>
  `;

  try {
    await emailService.sendEmail({
      to: registration.email,
      subject: `[${formation.title}] ${subject}`,
      html,
    });
  } catch (error) {
    console.error("Custom notification error:", error);
    return next(new ErrorResponse("Failed to send notification", 500));
  }

  res.status(200).json({
    success: true,
    message: "Notification sent successfully",
  });
});

// @desc    Get registration by ID
// @route   GET /api/registrations/:id
// @access  Private/Admin
exports.getRegistrationById = asyncHandler(async (req, res, next) => {
  const registration = await Registration.findById(req.params.id);

  if (!registration) {
    return next(new ErrorResponse("Registration not found", 404));
  }

  res.status(200).json({
    success: true,
    data: registration,
  });
});

// @desc    Update registration status
// @route   PATCH /api/registrations/:id/status
// @access  Private/Admin
exports.updateRegistrationStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  const registration = await Registration.updateStatus(req.params.id, status);

  if (!registration) {
    return next(new ErrorResponse("Registration not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Registration status updated",
    data: registration,
  });
});

// @desc    Get all registrations
// @route   GET /api/registrations
// @access  Private/Admin
exports.getAllRegistrations = asyncHandler(async (req, res) => {
  const { formation_id, status, email, payment_status } = req.query;

  const filters = {
    formation_id,
    status,
    email,
    payment_status,
  };

  const registrations = await Registration.findAll(filters);

  res.status(200).json({
    success: true,
    count: registrations.length,
    data: registrations,
  });
});

// @desc    Get registration statistics (NO PAYMENT FIELDS)
// @route   GET /api/registrations/stats
// @access  Private/Admin
exports.getRegistrationStats = asyncHandler(async (req, res) => {
  const { formation_id, start_date, end_date } = req.query;

  let whereClause = "WHERE 1=1";
  const values = [];
  let paramCount = 1;

  if (formation_id) {
    whereClause += ` AND r.formation_id = $${paramCount}`;
    values.push(formation_id);
    paramCount++;
  }

  if (start_date && end_date) {
    whereClause += ` AND r.registration_date BETWEEN $${paramCount} AND $${
      paramCount + 1
    }`;
    values.push(start_date, end_date);
    paramCount += 2;
  }

  const statsQuery = `
    SELECT 
      COUNT(*) as total_registrations,
      COUNT(CASE WHEN r.status = 'confirmed' THEN 1 END) as confirmed,
      COUNT(CASE WHEN r.status = 'pending' THEN 1 END) as pending,
      COUNT(CASE WHEN r.status = 'cancelled' THEN 1 END) as cancelled,
      COUNT(CASE WHEN r.is_verified = true THEN 1 END) as verified,
      COUNT(DISTINCT r.formation_id) as unique_formations,
      COUNT(DISTINCT r.email) as unique_participants
    FROM registrations r
    ${whereClause}
  `;

  const result = await query(statsQuery, values);

  // Get monthly stats (NO PAYMENT FIELDS)
  const monthlyQuery = `
    SELECT 
      DATE_TRUNC('month', registration_date) as month,
      COUNT(*) as registrations,
      COUNT(CASE WHEN status = 'confirmed' THEN 1 END) as confirmed_count
    FROM registrations
    GROUP BY DATE_TRUNC('month', registration_date)
    ORDER BY month DESC
    LIMIT 6
  `;
  const monthlyResult = await query(monthlyQuery);

  // Get formation distribution
  const formationStatsQuery = `
    SELECT 
      f.title as formation_title,
      COUNT(r.id) as registration_count,
      COUNT(CASE WHEN r.status = 'confirmed' THEN 1 END) as confirmed_count
    FROM formations f
    LEFT JOIN registrations r ON f.id = r.formation_id
    GROUP BY f.id, f.title
    ORDER BY registration_count DESC
  `;
  const formationResult = await query(formationStatsQuery);

  res.status(200).json({
    success: true,
    data: {
      summary: result.rows[0],
      monthly: monthlyResult.rows,
      formations: formationResult.rows,
    },
  });
});

// @desc    Get registrations by formation
// @route   GET /api/registrations/formation/:formationId
// @access  Private/Admin
exports.getRegistrationsByFormation = asyncHandler(async (req, res) => {
  const { formationId } = req.params;

  const registrations = await Registration.findAll({
    formation_id: formationId,
  });

  res.status(200).json({
    success: true,
    count: registrations.length,
    data: registrations,
  });
});


// @desc    Update registration details
// @route   PUT /api/registrations/:id
// @access  Private/Admin
exports.updateRegistration = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const updateFields = req.body;

  // Build dynamic update query
  const fieldNames = Object.keys(updateFields);
  const fieldValues = Object.values(updateFields);

  if (fieldNames.length === 0) {
    return next(new ErrorResponse("No fields to update", 400));
  }

  const setClause = fieldNames
    .map((field, index) => `${field} = $${index + 2}`)
    .join(", ");

  const text = `
    UPDATE registrations 
    SET ${setClause}, updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *
  `;

  const values = [id, ...fieldValues];
  const result = await query(text, values);

  if (!result.rows[0]) {
    return next(new ErrorResponse("Registration not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Registration updated successfully",
    data: result.rows[0],
  });
});

// @desc    Delete registration
// @route   DELETE /api/registrations/:id
// @access  Private/Admin
exports.deleteRegistration = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const registration = await Registration.delete(id);

  if (!registration) {
    return next(new ErrorResponse("Registration not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Registration deleted successfully",
    data: {},
  });
});

// @desc    Export registrations to CSV (NO PAYMENT FIELDS)
// @route   GET /api/registrations/export
// @access  Private/Admin
exports.exportRegistrations = asyncHandler(async (req, res) => {
  const { formation_id, status } = req.query;

  let text = `
    SELECT 
      r.id, r.full_name, r.email, r.phone, 
      r.status, r.registration_date, 
      f.title as formation_title
    FROM registrations r
    LEFT JOIN formations f ON r.formation_id = f.id
    WHERE 1=1
  `;
  const values = [];
  let paramCount = 1;

  if (formation_id) {
    text += ` AND r.formation_id = $${paramCount}`;
    values.push(formation_id);
    paramCount++;
  }
  if (status) {
    text += ` AND r.status = $${paramCount}`;
    values.push(status);
    paramCount++;
  }
  text += " ORDER BY r.registration_date DESC";
  const result = await query(text, values);

  // Convert to CSV (NO PAYMENT COLUMNS)
  const csvHeaders = [
    "ID",
    "Full Name",
    "Email",
    "Phone",
    "Status",
    "Registration Date",
    "Formation Title",
  ];
  const csvRows = result.rows.map((row) => [
    row.id,
    row.full_name,
    row.email,
    row.phone,
    row.status,
    row.registration_date,
    row.formation_title,
  ]);

  let csvContent = csvHeaders.join(",") + "\n";
  csvRows.forEach((row) => {
    csvContent += row.map((value) => `"${value}"`).join(",") + "\n";
  });

  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="registrations.csv"'
  );
  res.status(200).send(csvContent);
});

// @desc    Cancel registration (NO PAYMENT FIELDS)
// @route   POST /api/registrations/:id/cancel
// @access  Public
exports.cancelRegistration = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { email, reason } = req.body;

  const registration = await Registration.findById(id);

  if (!registration) {
    return next(new ErrorResponse("Registration not found", 404));
  }

  if (registration.email !== email) {
    return next(new ErrorResponse("Unauthorized", 401));
  }

  if (registration.status === "cancelled") {
    return next(new ErrorResponse("Registration already cancelled", 400));
  }

  // Update registration status (NO PAYMENT FIELDS)
  const text = `
    UPDATE registrations 
    SET status = 'cancelled',
        cancelled_at = CURRENT_TIMESTAMP,
        cancellation_reason = $1
    WHERE id = $2
    RETURNING *
  `;
  const result = await query(text, [reason, id]);

  // Decrement formation participants count
  await query(
    "UPDATE formations SET current_participants = current_participants - 1 WHERE id = $1 AND current_participants > 0",
    [registration.formation_id]
  );

  res.status(200).json({
    success: true,
    message: "Registration cancelled successfully",
    data: result.rows[0],
  });
});

// @desc    Perform bulk action on registrations (NO PAYMENT FIELDS)
// @route   POST /api/registrations/bulk-action
// @access  Private/Admin
exports.bulkAction = asyncHandler(async (req, res, next) => {
  const { action, registration_ids } = req.body;

  if (!Array.isArray(registration_ids) || registration_ids.length === 0) {
    return next(new ErrorResponse("No registration IDs provided", 400));
  }

  let result;

  switch (action) {
    case "confirm":
      result = await query(
        `UPDATE registrations 
         SET status = 'confirmed', 
             confirmed_at = CURRENT_TIMESTAMP,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = ANY($1) 
         RETURNING *`,
        [registration_ids]
      );
      break;

    case "cancel":
      result = await query(
        `UPDATE registrations 
         SET status = 'cancelled', 
             cancelled_at = CURRENT_TIMESTAMP,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = ANY($1) 
         RETURNING *`,
        [registration_ids]
      );
      break;

    case "delete":
      result = await query(
        "DELETE FROM registrations WHERE id = ANY($1) RETURNING *",
        [registration_ids]
      );
      break;

    default:
      return next(new ErrorResponse("Invalid action", 400));
  }

  res.status(200).json({
    success: true,
    message: `Bulk action '${action}' completed successfully`,
    affected: result.rowCount,
    data: result.rows,
  });
});