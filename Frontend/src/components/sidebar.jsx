import React from "react";
import { Users } from "lucide-react"; // Importing an icon for a better look

const Sidebar = () => {
  const GotoGroupDashboard = () => {
    // Redirect to the group dashboard page
    window.location.href = "/group";
  }
  return (
    <div className="w-96 bg-gray-900 bg-opacity-90 backdrop-blur-lg p-6 text-white rounded-xl shadow-lg h-auto border border-gray-800">
      <div className="flex flex-col space-y-4">
        {/* Sidebar Title with Icon */}
        <div className="flex items-center space-x-2">
          <Users className="text-blue-400" size={20} />
          <h2 className="text-lg font-semibold text-gray-200 tracking-wide">Study Groups</h2>
        </div>

        {/* Study Groups List */}
        <div className="space-y-2">
          {["Group 1", "Group 2", "Group 3", "Group 4", "Group 5"].map(
            (group, index) => (
              <div onClick={GotoGroupDashboard} // Add this line
                key={index}
                className="p-3 bg-gray-800 rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out cursor-pointer w-full text-center"
              >
                <span className="font-medium text-gray-300 group-hover:text-white">{group}</span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
