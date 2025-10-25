const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");
const { protect, authorize } = require("../middleware/auth");
const { validateMessage } = require("../middleware/validation");

// Public route
router.post("/", validateMessage, messageController.createMessage);

// Protected routes (admin only)
router.get("/", protect, authorize("admin"), messageController.getAllMessages);
router.get(
  "/:id",
  protect,
  authorize("admin"),
  messageController.getMessageById
);
router.patch(
  "/:id/status",
  protect,
  authorize("admin"),
  messageController.updateMessageStatus
);
router.post(
  "/:id/reply",
  protect,
  authorize("admin"),
  messageController.replyToMessage
);
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  messageController.deleteMessage
);

module.exports = router;
