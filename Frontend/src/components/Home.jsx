import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FeatureGrid from "../components/FeatureCard";
import TestimonialFooter from "../components/Footer";
import Button from "./button";

const Home = () => {
  const navigate = useNavigate();
  const [meetingLink, setMeetingLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // Track focus state

  // Create New Meeting
  const handleCreateMeeting = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage

      if (!token) {
        alert("Please log in first.");
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:6471/api/create-meeting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setMeetingLink(data.meetingId);
        alert(`Meeting Created! Link: ${window.location.origin}/meet/${data.meetingId}`);
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error creating meeting:", error);
      alert("Something went wrong.");
    }
    setLoading(false);
  };

  // Join a meeting
  const handleJoinMeet = () => {
    if (meetingLink.trim()) {
      navigate(`/join/${meetingLink.trim()}`);
    } else {
      alert("Please enter a valid meeting link");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white w-full overflow-x-hidden">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 w-full mt-1">
        <h1 className="text-5xl font-bold mb-4 mt-2">Study Smarter, Together! 🚀</h1>
        
        {/* Meeting Input Field with Scale-Up Animation */}
        <motion.div
          animate={{ scale: isFocused ? 1.1 : 1 }} // Scale up when focused
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-80"
        >
          <input
            type="text"
            placeholder="Enter Meeting Link"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            onFocus={() => setIsFocused(true)} // Set focus state
            onBlur={() => setIsFocused(false)} // Reset focus state
            className="w-full p-3 mb-7 text-white rounded-lg border border-gray-300 bg-gray-800 focus:outline-none transition-all"
          />
        </motion.div>
        
        {/* Buttons Container */}
        <div className="flex space-x-4">
          {/* Create Meeting Button */}
            <Button label={loading ? "Creating..." : "Create New Meet +"} onClick={handleCreateMeeting} to={"/join"}/>
          {/* Join Meeting Button */}
            <Button label="Join" onClick={handleJoinMeet} to={"/videochat"}/>
        </div>
        
        {/* Features Section */}
        <FeatureGrid />
      </div>

      {/* Testimonials Section */}  
      <TestimonialFooter /> 
    </div>
  );
};

export default Home;
