const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',  // Reference to the User model
        required: true,
        unique: true   // Ensure each user appears only once
    },
    rewardPoints: {
        type: Number,
        default: 0     // Tracks total reward points
    },
    streak: {
        type: Number,
        default: 0     // Tracks the current streak
    },
    lastUpdated: {
        type: Date,
        default: Date.now // Stores the last update time
    }
});

// Function to update leaderboard ranking
leaderboardSchema.statics.updateLeaderboard = async function () {
    try {
        const users = await mongoose.model('User').find().sort({ rewardPoints: -1, streak: -1 });
        for (let i = 0; i < users.length; i++) {
            await this.findOneAndUpdate(
                { user: users[i]._id },
                { rewardPoints: users[i].rewardPoints, streak: users[i].streak, lastUpdated: new Date() },
                { upsert: true, new: true }
            );
        }
    } catch (error) {
        console.error('Error updating leaderboard:', error);
    }
};

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);
module.exports = Leaderboard;
