const express = require('express');
const router = express.Router();
const Note = require('../models/Notes'); // Assuming your model file is named noteModel.js
const { authenticateJWT } = require('../middleware/authMiddleware'); // Authentication middleware

// Route to create a new note
router.post('/create', authenticateJWT, async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user.id; // Extract user ID from authentication middleware

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const newNote = new Note({
            title,
            content,
            user: userId,
        });

        await newNote.save();
        res.status(201).json({ message: 'Note created successfully', note: newNote });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = router;
