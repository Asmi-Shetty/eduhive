const express = require("express");
const router = express.Router();
const User = require("../models/user"); // Ensure the correct path to your User model
const { authenticateJWT } = require("../middleware/authMiddleware");
const Profile = require("../models/profile");


router.post('/create', async (req, res) => {
    try {
        const { user, bio, profilePicture, achievements} = req.body;

        // Check if profile already exists for the user
        const existingProfile = await Profile.findOne({ user });
        if (existingProfile) {
            return res.status(400).json({ message: 'Profile already exists for this user' });
        }

        // Create and save profile in one step
        const newProfile = await Profile.create({
            user,
            bio,
            profilePicture,
            achievements,
        });

        res.status(201).json(newProfile);
    } catch (error) {
        console.error(error); // Log error for debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.get("/:userId", authenticateJWT, async (req, res) => {
    try {
        // Fetch the user details without password
        const user = await User.findById(req.params.userId).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });

        // Fetch the profile details linked to the user
        const profile = await Profile.findOne({ user: req.params.userId });

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        // Merge user and profile details in the response
        res.json({ user, profile });
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile", error: error.message });
    }
});


router.patch("/:userId", authenticateJWT, async (req, res) => {
    try {
        const { name, bio, profilePicture } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            { name, bio, profilePicture },
            { new: true, runValidators: true }
        ).select("-password"); // Exclude password field

        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile", error });
    }
});

module.exports = router;
