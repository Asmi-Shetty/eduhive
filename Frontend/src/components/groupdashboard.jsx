import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "./button";
import GroupCalendar from "./GroupCalendar.jsx";
import Leaderboard from "./GroupLeaderBoard.jsx";

export default function GroupDashboard() {
  const [groupName] = useState("Study Group");

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-1/4 p-6 bg-gray-800 shadow-xl rounded-r-lg flex flex-col space-y-6 h-screen">
        <h2 className="text-xl font-semibold text-gray-200">📌 Group Features</h2>
        <div className="flex flex-col space-y-4">
          <Link to="/whiteboard">
            <Button label="📝 Whiteboard" color="orange" />
          </Link>
          <Link to="/poll">
            <Button label="📊 Live Polls" color="purple" />
          </Link>
          <Link to="/resources">
            <Button label="📁 Resources" color="green" />
          </Link>
          <Link to="/groupchat">
            <Button label="💬 Group Chat" color="indigo" />
          </Link>
        </div>

        {/* Calendar Component */}
        <div className="mt-auto">
          <GroupCalendar />
        </div>
      </div>

      {/* Main Content + Leaderboard */}
      <div className="flex-1 flex flex-col items-center p-10 space-y-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
          {groupName} Dashboard
        </h1>
        <p className="text-gray-300 text-lg text-center max-w-2xl">
          Welcome to the group dashboard! Engage with your peers, access shared resources, and collaborate effectively.
        </p>

        {/* Welcome Card */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-lg text-center">
          <p className="text-gray-300 text-md">
            Explore study sessions, participate in polls, and connect with your study group.
          </p>
        </div>

        {/* Content Wrapper to Align Leaderboard and Main Features */}
        <div className="flex w-full justify-center space-x-10 mt-6">
          {/* Leaderboard Section */}
          <div className="w-1/3">
            <Leaderboard />
          </div>
        </div>
      </div>
    </div>
  );
}
