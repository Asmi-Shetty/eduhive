const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Meeting = require('../models/Meeting');
const User = require('../models/user');
const Reward = require('../models/Reward');
const { authenticateJWT } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create-meeting', authenticateJWT, async (req, res) => {
    try {
        const meetingId = uuidv4();
        const { expiresInMinutes } = req.body;
        if (!expiresInMinutes || isNaN(expiresInMinutes) || expiresInMinutes <= 0) {
            return res.status(400).json({ message: 'Invalid expiration time' });
        }
        const expiresAt = new Date(Date.now() + expiresInMinutes * 60000);

        const meeting = new Meeting({ meetingId, host: req.user.id, expiresAt });
        await meeting.save();

        // Award reward points
        const rewardPoints = 10; // Set points for meeting creation
        await User.findByIdAndUpdate(req.user.id, { $inc: { rewardPoints } });
        await Reward.create({ userId: req.user.id, points: rewardPoints, reason: 'Created a meeting' });

        res.json({ meetingLink: `http://localhost:6476/meeting/${meetingId}` });
    } catch (error) {
        res.status(500).json({ message: 'Error creating meeting', error });
    }
});

router.get('/:meetingId', async (req, res) => {
    try {
        const meeting = await Meeting.findOne({ meetingId: req.params.meetingId });
        if (!meeting) return res.status(404).json({ message: 'Meeting not found' });

        res.json({ meetingId: meeting.meetingId, host: meeting.host, expiresAt: meeting.expiresAt });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving meeting', error });
    }
});

module.exports = router;
