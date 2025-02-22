// routes/pollRoutes.js
const express = require('express');
const router = express.Router();
const Poll = require('../models/Poll');
const authenticateJWT = require('../middleware/authMiddleware');

// Create a new poll
router.post('/create', authenticateJWT, async (req, res) => {
  const { question, options, group } = req.body;
  const poll = new Poll({
    question,
    options,
    createdBy: req.user.userId,
    group
  });
  await poll.save();
  res.status(201).send(poll);
});

// Get all polls for the user
router.get('/', authenticateJWT, async (req, res) => {
  const polls = await Poll.find({ createdBy: req.user.userId });
  res.status(200).send(polls);
});

module.exports = router;
