import { useState, useEffect } from "react";
import axios from "axios";
import Button from "./button";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:6471/api/task")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleButtonClick = () => {
    navigate("/taskform");
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:6471/api/task/${id}`)
      .then(() => setTasks(tasks.filter((task) => task._id !== id)))
      .catch((error) => console.error("Error deleting task:", error));
  };

  // Correcting status colors (handling lowercase)
  const statusColors = {
    completed: "text-green-400",
    pursued: "text-orange-400",
    pending: "text-red-400",
  };

  return (
    <div className="bg-gray-900 p-4 text-center text-white rounded-lg shadow-lg">
      {/* Header Section with Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Your Tasks</h2>
        <Button label="+ Add New Task" onClick={handleButtonClick} />
      </div>

      {/* Table Container */}
      <div className="p-4 bg-gray-800 shadow-lg rounded-lg border border-gray-700">
        <table className="w-full border-collapse border border-gray-700 bg-gray-900 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-gray-300">
              <th className="border border-gray-600 p-3 text-left">Date</th>
              <th className="border border-gray-600 p-3 text-left">Status</th>
              <th className="border border-gray-600 p-3 text-left">Task Title</th>
              <th className="border border-gray-600 p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task._id}
                className="border border-gray-700 bg-gray-800 hover:bg-gray-700 transition duration-300"
              >
                <td className="border border-gray-600 p-3">
                  {new Date(task.createdAt).toLocaleDateString()} {/* Convert ISO Date */}
                </td>
                <td
                  className={`border border-gray-600 p-3 font-semibold ${
                    statusColors[task.status.toLowerCase()] || "text-gray-400"
                  }`}
                >
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)} {/* Capitalize */}
                </td>
                <td className="border border-gray-600 p-3">{task.title}</td>
                <td className="border border-gray-600 p-3">
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {tasks.length === 0 && <p className="text-gray-400 mt-4">No tasks found.</p>}
      </div>
    </div>
  );
};

export default TaskList;
