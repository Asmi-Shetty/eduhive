const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
    meetingId: { 
        type: String, 
        unique: true, 
        required: true 
    },
    host: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user', 
        required: true 
    },
});

module.exports = mongoose.model('Meeting', MeetingSchema);
