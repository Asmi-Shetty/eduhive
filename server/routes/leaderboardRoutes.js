const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import User model

// Leaderboard Route
router.get('/leaderboard', async (req, res) => {
    try {
        // Fetch users sorted by points in descending order (highest first)
        const leaderboard = await User.find().sort({ points: -1 }).select('name points');

        res.json({ leaderboard });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
