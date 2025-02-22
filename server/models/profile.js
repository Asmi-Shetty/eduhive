const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        unique: true
    },
    bio: {
        type: String,
        trim: true,
        default: ''
    },
    profilePicture: {
        type: String, 
        default: ''
    },
    
    achievements: [{
        title: String,
        date: { type: Date, default: Date.now },
        description: String
    }],
}, { timestamps: true });

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
