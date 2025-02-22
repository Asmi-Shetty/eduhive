const express = require('express');
const Reward = require('../models/Reward');
const User = require('../models/user');
const { authenticateJWT } = require('../middleware/authMiddleware');

const router = express.Router();

// Get user's reward points
router.get('/:userId', authenticateJWT, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.json({ rewardPoints: user.rewardPoints });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching rewards', error });
    }
});

// ✅ Update reward points (increase, decrease, or reset)
router.patch('/update', authenticateJWT, async (req, res) => {
    try {
        const { userId, points } = req.body;

        if (!userId || points == null) {
            return res.status(400).json({ message: 'User ID and points are required.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        user.rewardPoints = points;  // Set new reward points value
        await user.save();

        res.json({ message: 'Reward points updated successfully', rewardPoints: user.rewardPoints });
    } catch (error) {
        res.status(500).json({ message: 'Error updating rewards', error: error.message });
    }
});


// Add reward points manually (admin use)
router.post('/add', authenticateJWT, async (req, res) => {
    try {
        const { userId, points, reason } = req.body;

        await user.findByIdAndUpdate(userId, { $inc: { rewardPoints: points } });
        await Reward.create({ userId, points, reason });

        res.json({ message: 'Reward points added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding rewards', error });
    }
});

module.exports = router;
