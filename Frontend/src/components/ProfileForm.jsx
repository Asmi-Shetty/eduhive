import { useState } from "react";
import axios from "axios";

const ProfileForm = ({ onSubmit }) => {
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState({
    bio: "",
    profilePicture: "",
    achievements: [],
    achievementTitle: "",
    achievementDescription: ""
  });

  // Handle Input Change
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle Adding Achievements
  const handleAddAchievement = () => {
    if (profile.achievementTitle && profile.achievementDescription) {
      setProfile({
        ...profile,
        achievements: [
          ...profile.achievements,
          {
            title: profile.achievementTitle,
            description: profile.achievementDescription,
            date: new Date().toISOString(),
          },
        ],
        achievementTitle: "",
        achievementDescription: "",
      });
    }
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken"); // Get auth token
      const user = localStorage.getItem("userId"); // Get user ID
      if (!token) {
        setError("Authentication error. Please log in again.");
        console.error("❌ No auth token found.");
        return;
      }

      // Prepare Data
      const requestData = {
        user : user,
        bio: profile.bio,
        profilePicture: profile.profilePicture || "", // Avoid undefined
        achievements: profile.achievements,
      };

      console.log("📤 Sending data:", requestData);

      // API Call
      const response = await axios.post(
        "http://localhost:6471/api/profile/create",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("✅ Profile updated successfully:", response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("❌ Error updating profile:", error.response?.data || error);
      setError(error.response?.data?.message || "Profile update failed.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-950">
      <div className="max-w-lg w-full p-6 bg-gray-900 shadow-lg rounded-lg text-white">
        <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Bio</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Profile Picture URL</label>
            <input
              type="text"
              name="profilePicture"
              value={profile.profilePicture}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            />
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">Achievements</h3>
            {profile.achievements.map((ach, index) => (
              <div key={index} className="p-2 bg-gray-800 border border-gray-700 rounded-md mb-2">
                <p className="font-bold">{ach.title}</p>
                <p className="text-sm">{ach.description}</p>
                <p className="text-xs text-gray-400">{new Date(ach.date).toDateString()}</p>
              </div>
            ))}

            <div className="mt-2">
              <input
                type="text"
                name="achievementTitle"
                value={profile.achievementTitle}
                onChange={handleChange}
                placeholder="Title"
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white mb-2"
              />
              <textarea
                name="achievementDescription"
                value={profile.achievementDescription}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              />
              <button
                type="button"
                onClick={handleAddAchievement}
                className="mt-2 p-2 bg-blue-500 text-white rounded-md w-full"
              >
                Add Achievement
              </button>
            </div>
          </div>

          <button type="submit" className="w-full p-2 bg-green-500 text-white rounded-md">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
