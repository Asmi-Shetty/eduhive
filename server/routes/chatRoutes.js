// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const Chat = require('./Chat');
const authenticateJWT = require('../middleware/authMiddleware');

// Create a new chat (between two users)
router.post('/create', authenticateJWT, async (req, res) => {
  const { participants, message } = req.body;
  const chat = new Chat({
    participants,
    messages: [{ sender: req.user.userId, text: message }]
  });
  await chat.save();
  res.status(201).send(chat);
});

// Get all chats for the user
router.get('/', authenticateJWT, async (req, res) => {
  const chats = await Chat.find({ participants: req.user.userId });
  res.status(200).send(chats);
});

module.exports = router;
