const { query } = require("../config/database");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");

// @desc    Create new message
// @route   POST /api/messages
// @access  Public
exports.createMessage = asyncHandler(async (req, res) => {
  const { full_name, email, subject, message } = req.body;

  const text = `
    INSERT INTO messages (full_name, email, subject, message, ip_address, user_agent)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;

  const values = [
    full_name,
    email,
    subject,
    message,
    req.ip,
    req.headers["user-agent"],
  ];

  const result = await query(text, values);

  res.status(201).json({
    success: true,
    message: "Message sent successfully",
    data: result.rows[0],
  });
});

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private/Admin
exports.getAllMessages = asyncHandler(async (req, res) => {
  const { status, limit = 50, offset = 0 } = req.query;

  let text = "SELECT * FROM messages WHERE 1=1";
  const values = [];
  let paramCount = 1;

  if (status) {
    text += ` AND status = $${paramCount}`;
    values.push(status);
    paramCount++;
  }

  text += ` ORDER BY created_at DESC LIMIT $${paramCount} OFFSET $${
    paramCount + 1
  }`;
  values.push(limit, offset);

  const result = await query(text, values);

  res.status(200).json({
    success: true,
    count: result.rows.length,
    data: result.rows,
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

  // Mark as read
  await query("UPDATE messages SET status = $1 WHERE id = $2", [
    "read",
    req.params.id,
  ]);

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

  // Send reply email
  try {
    await sendEmail({
      to: originalMessage.email,
      subject: `Re: ${originalMessage.subject}`,
      html: `
        <h2>Réponse à votre message</h2>
        <p>Bonjour ${originalMessage.full_name},</p>
        <p>${reply_message}</p>
        <hr>
        <p><strong>Votre message original:</strong></p>
        <p>${originalMessage.message}</p>
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
