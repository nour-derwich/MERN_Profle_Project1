const express = require("express");
const router = express.Router();
const {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessageStatus,
  replyToMessage,
  deleteMessage,
  getMessageStats,
} = require("../controllers/message.controller");

// Public routes
router.route("/").post(createMessage);

// Admin routes (protected - add authentication middleware)
router.route("/").get(getAllMessages);
router.route("/stats").get(getMessageStats);
router.route("/:id").get(getMessageById);
router.route("/:id/status").patch(updateMessageStatus);
router.route("/:id/reply").post(replyToMessage);
router.route("/:id").delete(deleteMessage);

module.exports = router;
