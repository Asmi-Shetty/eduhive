const mongoose = require('mongoose');

const studySessionSchema = new mongoose.Schema({
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', // User who created the session
        required: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' // Users who joined the session
    }],
    startTime: {
        type: Date,
        required: true,
        default: Date.now
    },
    endTime: {
        type: Date
    },
    duration: {
        type: Number, // Duration in minutes
        default: 0
    },
    topic: {
        type: String,
        required: true,
        trim: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    contributesToStreak: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const StudySession = mongoose.model('StudySession', studySessionSchema);
module.exports = StudySession;
