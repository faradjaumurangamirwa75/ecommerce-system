
const express = require("express");
const router = express.Router();

const {
  getMessages,
  createMessage,
  markMessageAsRead,
  deleteMessage
} = require("../controllers/messageController");

// Get all messages
router.get("/", getMessages);

// Send a new message
router.post("/", createMessage);

// Mark message as read
router.patch("/:id/read", markMessageAsRead);

// Delete message
router.delete("/:id", deleteMessage);

module.exports = router;
