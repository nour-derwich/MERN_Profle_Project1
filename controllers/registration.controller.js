const Registration = require("../models/registration.model");
const Formation = require("../models/formation.models");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");

// @desc    Create new registration
// @route   POST /api/registrations
// @access  Public
exports.createRegistration = asyncHandler(async (req, res, next) => {
  const { formation_id } = req.body;

  // Check if formation exists and has available slots
  const formation = await Formation.findById(formation_id);

  if (!formation) {
    return next(new ErrorResponse("Formation not found", 404));
  }

  if (formation.current_participants >= formation.max_participants) {
    return next(new ErrorResponse("Formation is full", 400));
  }

  // Create registration
  const registration = await Registration.create(req.body);

  // Send confirmation email
  try {
    await sendEmail({
      to: registration.email,
      subject: "Confirmation d'inscription",
      html: `
        <h1>Merci pour votre inscription!</h1>
        <p>Bonjour ${registration.full_name},</p>
        <p>Votre inscription à la formation "${formation.title}" a été enregistrée avec succès.</p>
        <p>Date de début: ${formation.start_date}</p>
        <p>Nous vous contacterons bientôt pour confirmer votre participation.</p>
      `,
    });
  } catch (error) {
    console.error("Email error:", error);
  }

  res.status(201).json({
    success: true,
    message: "Registration successful",
    data: registration,
  });
});

// @desc    Get all registrations
// @route   GET /api/registrations
// @access  Private/Admin
exports.getAllRegistrations = asyncHandler(async (req, res) => {
  const { formation_id, status } = req.query;

  const filters = { formation_id, status };
  const registrations = await Registration.findAll(filters);

  res.status(200).json({
    success: true,
    count: registrations.length,
    data: registrations,
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

// @desc    Get registration statistics
exports.getRegistrationStats = asyncHandler(async (req, res) => {
  const statsQuery = `
    SELECT 
      COUNT(*) as total_registrations,
      COUNT(CASE WHEN status = 'confirmed' THEN 1 END) as confirmed,
      COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
      COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled,
      COUNT(CASE WHEN payment_status = 'paid' THEN 1 END) as paid,
      SUM(CASE WHEN payment_status = 'paid' THEN amount_paid ELSE 0 END) as total_revenue
    FROM registrations
  `;

  const result = await query(statsQuery);

  res.status(200).json({
    success: true,
    data: result.rows[0]
  });
});

// @desc    Get registrations by formation
exports.getRegistrationsByFormation = asyncHandler(async (req, res) => {
  const { formationId } = req.params;

  const registrations = await Registration.findAll({ formation_id: formationId });

  res.status(200).json({
    success: true,
    count: registrations.length,
    data: registrations
  });
});

// @desc    Export registrations to CSV
exports.exportRegistrations = asyncHandler(async (req, res) => {
  const { formation_id, status } = req.query;

  let text = `
    SELECT 
      r.id, r.full_name, r.email, r.phone, 
      r.status, r.payment_status, r.amount_paid,
      r.registration_date, f.title as formation_title
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
// Convert to CSV
    const csvHeaders = [
      "ID",
      "Full Name",
      "Email",
      "Phone",
      "Status",
      "Payment Status",
      "Amount Paid",
      "Registration Date",
      "Formation Title"
    ];
    const csvRows = result.rows.map(row => [
      row.id,
      row.full_name,
      row.email,
      row.phone,
      row.status,
      row.payment_status,
      row.amount_paid,
      row.registration_date,
      row.formation_title
    ]);
  
    let csvContent = csvHeaders.join(",") + "\n";
    csvRows.forEach(row => {
      csvContent += row.map(value => `"${value}"`).join(",") + "\n";
    });
  
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="registrations.csv"'
    );
    res.status(200).send(csvContent);
});