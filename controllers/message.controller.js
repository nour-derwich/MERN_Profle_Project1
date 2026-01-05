const { query } = require("../config/database");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");

// @desc    Create new message (handles both contact and project inquiry)
// @route   POST /api/messages
// @access  Public
exports.createMessage = asyncHandler(async (req, res) => {
  const {
    full_name,
    email,
    subject,
    message,
    message_type = "contact", // 'contact' or 'project'
    project_type,
    timeline,
    budget_range,
    phone,
    company,
    website,
  } = req.body;

  const text = `
    INSERT INTO messages (
      full_name, email, subject, message, 
      message_type, project_type, timeline, budget_range,
      phone, company, website,
      ip_address, user_agent, status
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 'unread')
    RETURNING *
  `;

  const values = [
    full_name,
    email,
    subject,
    message,
    message_type,
    project_type || null,
    timeline || null,
    budget_range || null,
    phone || null,
    company || null,
    website || null,
    req.ip,
    req.headers["user-agent"],
  ];

  const result = await query(text, values);
  const savedMessage = result.rows[0];

  // Send email notifications based on message type
  try {
    await this.sendMessageNotification(savedMessage);
  } catch (emailError) {
    console.error("Email notification error:", emailError);
    // Continue even if email fails
  }

  res.status(201).json({
    success: true,
    message:
      message_type === "project"
        ? "Project inquiry submitted successfully"
        : "Message sent successfully",
    data: savedMessage,
  });
});

// @desc    Send email notification for new message
// @access  Private
exports.sendMessageNotification = async (messageData) => {
  const {
    message_type,
    full_name,
    email,
    subject,
    message,
    project_type,
    timeline,
    budget_range,
  } = messageData;

  const isProjectInquiry = message_type === "project";
  const emailSubject = isProjectInquiry
    ? `🚀 New Project Inquiry: ${subject || `From ${full_name}`}`
    : `📧 New Contact Message: ${subject || `From ${full_name}`}`;

  // HTML template for email notification
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px; }
        .header { background: ${
          isProjectInquiry
            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            : "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)"
        }; 
                 padding: 30px; color: white; text-align: center; border-radius: 10px 10px 0 0; }
        .content { padding: 30px; background: #f8fafc; border: 1px solid #e2e8f0; }
        .message-type { display: inline-block; padding: 5px 15px; border-radius: 20px; 
                       background: ${isProjectInquiry ? "#dcfce7" : "#f0f9ff"}; 
                       color: ${isProjectInquiry ? "#059669" : "#0369a1"}; 
                       font-weight: bold; margin-bottom: 20px; }
        .info-box { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4f46e5; }
        .info-row { display: flex; margin-bottom: 10px; }
        .info-label { min-width: 150px; color: #64748b; font-weight: bold; }
        .info-value { flex: 1; color: #1e293b; }
        .message-content { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e5e7eb; }
        .btn { display: inline-block; background: #4f46e5; color: white; padding: 12px 30px; 
               text-decoration: none; border-radius: 6px; margin-top: 20px; }
        ${
          isProjectInquiry
            ? `
        .project-details { background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #bae6fd; }
        .project-details h3 { color: #0369a1; margin-top: 0; }
        `
            : ""
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 style="margin-top: 0;">${
          isProjectInquiry ? "🚀 New Project Inquiry" : "📧 New Contact Message"
        }</h1>
        <p>From: ${full_name} (${email})</p>
      </div>
      
      <div class="content">
        <div class="message-type">
          ${isProjectInquiry ? "PROJECT INQUIRY" : "CONTACT MESSAGE"}
        </div>
        
        <div class="info-box">
          <h3>👤 Sender Information</h3>
          <div class="info-row">
            <div class="info-label">Full Name:</div>
            <div class="info-value">${full_name}</div>
          </div>
          <div class="info-row">
            <div class="info-label">Email:</div>
            <div class="info-value"><a href="mailto:${email}">${email}</a></div>
          </div>
          ${
            messageData.phone
              ? `
          <div class="info-row">
            <div class="info-label">Phone:</div>
            <div class="info-value"><a href="tel:${messageData.phone}">${messageData.phone}</a></div>
          </div>
          `
              : ""
          }
          ${
            messageData.company
              ? `
          <div class="info-row">
            <div class="info-label">Company:</div>
            <div class="info-value">${messageData.company}</div>
          </div>
          `
              : ""
          }
          ${
            messageData.website
              ? `
          <div class="info-row">
            <div class="info-label">Website:</div>
            <div class="info-value"><a href="${messageData.website}" target="_blank">${messageData.website}</a></div>
          </div>
          `
              : ""
          }
          <div class="info-row">
            <div class="info-label">Received:</div>
            <div class="info-value">${new Date().toLocaleString()}</div>
          </div>
        </div>
        
        ${
          isProjectInquiry
            ? `
        <div class="project-details">
          <h3>📋 Project Details</h3>
          ${
            project_type
              ? `
          <div class="info-row">
            <div class="info-label">Project Type:</div>
            <div class="info-value"><strong>${project_type}</strong></div>
          </div>
          `
              : ""
          }
          ${
            timeline
              ? `
          <div class="info-row">
            <div class="info-label">Timeline:</div>
            <div class="info-value">${timeline}</div>
          </div>
          `
              : ""
          }
          ${
            budget_range
              ? `
          <div class="info-row">
            <div class="info-label">Budget Range:</div>
            <div class="info-value"><strong style="color: #059669;">${budget_range}</strong></div>
          </div>
          `
              : ""
          }
        </div>
        `
            : ""
        }
        
        <div class="message-content">
          <h3>${isProjectInquiry ? "📝 Project Description" : "💬 Message"}</h3>
          <div style="white-space: pre-wrap; line-height: 1.8;">${message}</div>
        </div>
        
        <div style="text-align: center;">
          <a href="${
            process.env.ADMIN_URL || "http://localhost:3000/admin"
          }/messages" class="btn">
            👁️ View in Admin Dashboard
          </a>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 14px;">
          <p><strong>Quick Actions:</strong></p>
          <p>
            📧 <a href="mailto:${email}?subject=Re: ${subject}">Reply via Email</a> | 
            📞 ${
              messageData.phone
                ? `<a href="tel:${messageData.phone}">Call ${full_name}</a>`
                : "No phone provided"
            }
          </p>
          ${
            isProjectInquiry
              ? `
          <p style="background: #fef3c7; padding: 10px; border-radius: 6px; margin-top: 15px;">
            ⚡ <strong>Project Inquiry Priority:</strong> This is a potential project lead. Recommended response time: < 24 hours.
          </p>
          `
              : ""
          }
        </div>
      </div>
    </body>
    </html>
  `;

  // Send to admin
  const adminEmail = process.env.ADMIN_EMAIL || process.env.FROM_EMAIL;
  await sendEmail({
    to: adminEmail,
    subject: emailSubject,
    html,
  });

  // Also send auto-reply to sender
  const senderHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: ${
          isProjectInquiry
            ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            : "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)"
        }; 
                 padding: 30px; color: white; text-align: center; border-radius: 10px; }
        .content { padding: 20px; }
        .confirmation { background: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
        .next-steps { background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 style="margin-top: 0;">${
          isProjectInquiry
            ? "🚀 Thank You for Your Project Inquiry!"
            : "📧 Message Received!"
        }</h1>
      </div>
      
      <div class="content">
        <div class="confirmation">
          <h2 style="color: #059669;">✅ ${
            isProjectInquiry ? "Project Inquiry Submitted" : "Message Sent"
          } Successfully!</h2>
          <p>Dear <strong>${full_name}</strong>,</p>
          <p>Thank you for reaching out. I have received your ${
            isProjectInquiry ? "project inquiry" : "message"
          } and will get back to you as soon as possible.</p>
        </div>
        
        ${
          isProjectInquiry
            ? `
        <div class="next-steps">
          <h3>📋 What happens next?</h3>
          <ol>
            <li>I'll review your project requirements within 24 hours</li>
            <li>You'll receive a detailed response with initial thoughts</li>
            <li>We can schedule a discovery call to discuss further</li>
            <li>I'll provide a custom proposal based on your needs</li>
          </ol>
          <p><strong>Project Type:</strong> ${project_type}</p>
          ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ""}
          ${
            budget_range
              ? `<p><strong>Budget Range:</strong> ${budget_range}</p>`
              : ""
          }
        </div>
        `
            : `
        <div class="next-steps">
          <h3>⏱️ What to expect?</h3>
          <p>I typically respond to messages within <strong>4-6 hours</strong> during business days.</p>
          <p>If your inquiry is urgent, feel free to contact me via WhatsApp or Telegram for faster response.</p>
        </div>
        `
        }
        
        <div style="margin-top: 30px; padding: 20px; background: #f8fafc; border-radius: 8px; text-align: center;">
          <h3>💡 Alternative Contact Methods</h3>
          <p>For urgent matters, you can also reach me through:</p>
          <p>
            📱 <strong>WhatsApp:</strong> +216 95 88 17 09<br>
            ✈️ <strong>Telegram:</strong> @naceur_keraani
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; color: #64748b; font-size: 14px;">
          <p>Best regards,<br><strong>Naceur Keraani</strong></p>
          <p>${process.env.FROM_EMAIL}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail({
    to: email,
    subject: isProjectInquiry
      ? `✅ Project Inquiry Received - ${subject || "New Project"}`
      : `✅ Message Received - ${subject || "Contact Form"}`,
    html: senderHtml,
  });
};

// @desc    Get all messages with filtering
// @route   GET /api/messages
// @access  Private/Admin
exports.getAllMessages = asyncHandler(async (req, res) => {
  const {
    status,
    message_type,
    search,
    limit = 50,
    offset = 0,
    startDate,
    endDate,
  } = req.query;

  let text = `
    SELECT m.*, 
           COUNT(*) OVER() as total_count
    FROM messages m
    WHERE 1=1
  `;

  const values = [];
  let paramCount = 1;

  if (status) {
    text += ` AND status = $${paramCount}`;
    values.push(status);
    paramCount++;
  }

  if (message_type) {
    text += ` AND message_type = $${paramCount}`;
    values.push(message_type);
    paramCount++;
  }

  if (search) {
    text += ` AND (
      full_name ILIKE $${paramCount} OR 
      email ILIKE $${paramCount} OR 
      subject ILIKE $${paramCount} OR 
      message ILIKE $${paramCount}
    )`;
    values.push(`%${search}%`);
    paramCount++;
  }

  if (startDate) {
    text += ` AND created_at >= $${paramCount}`;
    values.push(startDate);
    paramCount++;
  }

  if (endDate) {
    text += ` AND created_at <= $${paramCount}`;
    values.push(endDate);
    paramCount++;
  }

  text += ` ORDER BY 
    CASE 
      WHEN message_type = 'project' THEN 1 
      WHEN status = 'unread' THEN 2 
      ELSE 3 
    END,
    created_at DESC 
    LIMIT $${paramCount} OFFSET $${paramCount + 1}`;

  values.push(limit, offset);

  const result = await query(text, values);

  res.status(200).json({
    success: true,
    count: result.rows.length,
    total: result.rows[0]?.total_count || 0,
    data: result.rows.map((row) => {
      const { total_count, ...message } = row;
      return message;
    }),
  });
});

// @desc    Get message statistics
// @route   GET /api/messages/stats
// @access  Private/Admin
exports.getMessageStats = asyncHandler(async (req, res) => {
  const text = `
    SELECT 
      COUNT(*) as total_messages,
      COUNT(CASE WHEN status = 'unread' THEN 1 END) as unread_messages,
      COUNT(CASE WHEN message_type = 'project' THEN 1 END) as project_inquiries,
      COUNT(CASE WHEN message_type = 'contact' THEN 1 END) as contact_messages,
      COUNT(CASE WHEN status = 'replied' THEN 1 END) as replied_messages,
      COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as last_7_days,
      COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '30 days' THEN 1 END) as last_30_days
    FROM messages
  `;

  const result = await query(text);

  // Get message types distribution
  const typesText = `
    SELECT 
      message_type,
      COUNT(*) as count,
      ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM messages), 2) as percentage
    FROM messages
    GROUP BY message_type
    ORDER BY count DESC
  `;

  const typesResult = await query(typesText);

  // Get recent project inquiries
  const recentProjectsText = `
    SELECT 
      id, full_name, email, project_type, timeline, budget_range, created_at
    FROM messages 
    WHERE message_type = 'project'
    ORDER BY created_at DESC
    LIMIT 5
  `;

  const recentProjectsResult = await query(recentProjectsText);

  res.status(200).json({
    success: true,
    data: {
      summary: result.rows[0],
      messageTypes: typesResult.rows,
      recentProjects: recentProjectsResult.rows,
    },
  });
});

// @desc    Get message by ID
// @route   GET /api/messages/:id
// @access  Private/Admin
exports.getMessageById = asyncHandler(async (req, res, next) => {
  const text = "SELECT * FROM messages WHERE id = $1";
  const result = await query(text, [req.params.id]);

  if (result.rows.length === 0) {
    return next(new ErrorResponse("Message not found", 404));
  }

  // Mark as read if it's unread
  if (result.rows[0].status === "unread") {
    await query("UPDATE messages SET status = 'read' WHERE id = $1", [
      req.params.id,
    ]);
  }

  res.status(200).json({
    success: true,
    data: result.rows[0],
  });
});

// @desc    Update message status
// @route   PATCH /api/messages/:id/status
// @access  Private/Admin
exports.updateMessageStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  const validStatuses = ["unread", "read", "replied", "archived"];
  if (!validStatuses.includes(status)) {
    return next(
      new ErrorResponse(
        `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
        400
      )
    );
  }

  const text = `
    UPDATE messages 
    SET status = $1, updated_at = CURRENT_TIMESTAMP
    WHERE id = $2
    RETURNING *
  `;

  const result = await query(text, [status, req.params.id]);

  if (result.rows.length === 0) {
    return next(new ErrorResponse("Message not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Message status updated",
    data: result.rows[0],
  });
});

// @desc    Reply to message
// @route   POST /api/messages/:id/reply
// @access  Private/Admin
exports.replyToMessage = asyncHandler(async (req, res, next) => {
  const { reply_message } = req.body;

  // Get original message
  const getMessage = "SELECT * FROM messages WHERE id = $1";
  const messageResult = await query(getMessage, [req.params.id]);

  if (messageResult.rows.length === 0) {
    return next(new ErrorResponse("Message not found", 404));
  }

  const originalMessage = messageResult.rows[0];

  // Update message with reply
  const updateText = `
    UPDATE messages 
    SET reply_message = $1, replied_at = CURRENT_TIMESTAMP, status = 'replied'
    WHERE id = $2
    RETURNING *
  `;

  const result = await query(updateText, [reply_message, req.params.id]);

  // Send reply email with context
  try {
    const subjectPrefix =
      originalMessage.message_type === "project"
        ? `Re: Project Inquiry - ${
            originalMessage.subject || originalMessage.project_type
          }`
        : `Re: ${originalMessage.subject}`;

    await sendEmail({
      to: originalMessage.email,
      subject: subjectPrefix,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); padding: 30px; color: white; text-align: center; border-radius: 10px; }
            .reply { background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4f46e5; }
            .original { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin-top: 0;">${
              originalMessage.message_type === "project"
                ? "🚀 Response to Your Project Inquiry"
                : "📧 Response to Your Message"
            }</h1>
          </div>
          
          <p>Hello <strong>${originalMessage.full_name}</strong>,</p>
          
          <div class="reply">
            <p><strong>My response:</strong></p>
            <div style="white-space: pre-wrap; line-height: 1.8;">${reply_message}</div>
          </div>
          
          <div class="original">
            <p><strong>Your original message:</strong></p>
            <div style="white-space: pre-wrap; line-height: 1.6; color: #64748b;">${
              originalMessage.message
            }</div>
            ${
              originalMessage.project_type
                ? `
            <hr style="margin: 15px 0;">
            <p><strong>Project Details:</strong></p>
            <p>Type: ${originalMessage.project_type}</p>
            ${
              originalMessage.timeline
                ? `<p>Timeline: ${originalMessage.timeline}</p>`
                : ""
            }
            ${
              originalMessage.budget_range
                ? `<p>Budget: ${originalMessage.budget_range}</p>`
                : ""
            }
            `
                : ""
            }
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background: #dcfce7; border-radius: 8px; text-align: center;">
            <p><strong>💡 Next Steps?</strong></p>
            <p>Feel free to reply to this email if you have any further questions or need clarification.</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #64748b; font-size: 14px;">
            <p>Best regards,<br><strong>Naceur Keraani</strong></p>
            <p>${process.env.FROM_EMAIL}</p>
            <p style="font-size: 12px; margin-top: 20px;">
              This is an automated response. For urgent matters, contact me via WhatsApp: +216 95 88 17 09
            </p>
          </div>
        </body>
        </html>
      `,
    });
  } catch (error) {
    console.error("Email error:", error);
  }

  res.status(200).json({
    success: true,
    message: "Reply sent successfully",
    data: result.rows[0],
  });
});

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
exports.deleteMessage = asyncHandler(async (req, res, next) => {
  const text = "DELETE FROM messages WHERE id = $1 RETURNING id";
  const result = await query(text, [req.params.id]);

  if (result.rows.length === 0) {
    return next(new ErrorResponse("Message not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Message deleted successfully",
  });
});
