const express = require('express');
const router = express.Router();
const Note = require('../models/Notes'); 


router.post('/notes', async (req, res) => {
    try {
        const { title, content, owner } = req.body;
        const newNote = new Note({ title, content, owner });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find().populate('owner'); 
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/notes/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id).populate('owner');
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/notes/:id', async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id, 
            { title, content }, 
            { new: true }
        );
        if (!updatedNote) return res.status(404).json({ message: 'Note not found' });
        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.delete('/notes/:id', async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) return res.status(404).json({ message: 'Note not found' });
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;