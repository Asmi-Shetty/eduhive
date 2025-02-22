import React, { useState } from "react";
import Button from "./button";
import { motion } from "framer-motion";

const TaskForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Completed",
  });

  const [message, setMessage] = useState(null); // For success/error messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.date && formData.name) {
      try {
        const response = await fetch("http://localhost:6471/api/task/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to add task");
        }

        const data = await response.json();
        console.log("Task added successfully:", data);
        setMessage({ type: "success", text: "Task added successfully!" });

        // Reset form after submission
        setFormData({ title: "", description: "", status: "Completed" });
        onSubmit(data); // Pass data to parent component
      } catch (error) {
        console.error("Error submitting task:", error.message);
        setMessage({ type: "error", text: "Failed to add task. Try again!" });
      }
    } else {
      setMessage({ type: "error", text: "Please fill all required fields!" });
    }
  };

  return (
    <div className="fixed inset-0 flex">
      {/* Left Side - Form Section */}
      <div className="w-1/2 flex justify-center items-center bg-black bg-opacity-50">
        <motion.form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 w-4/5 h-4/5 flex flex-col justify-center"
        >
          {message && (
            <div
              className={`mb-4 p-3 text-center rounded ${
                message.type === "success"
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="flex flex-col items-center">
            <label className="block text-white text-left w-3/4">
              Date:
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full mt-1 p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
                required
              />
            </label>

            <label className="block text-white text-left w-3/4 mt-3">
              Task Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
                required
              />
            </label>

            <label className="block text-white text-left w-3/4 mt-3">
              Status:
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full mt-1 p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
              >
                <option value="Pending">Pending</option>
                <option value="Pursued">Pursued</option>
                <option value="Completed">Completed</option>
              </select>
            </label>
          </div>

          <div className="mt-5 flex justify-center">
            <Button label="Add Task" type="submit" />
          </div>
        </motion.form>
      </div>

      {/* Right Side - Image Section */}
      <div className="w-1/2 flex justify-center items-center bg-gray-900">
        <motion.img
          src="/task image.jpg"
          alt="Task Illustration"
          className="max-w-full max-h-full rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.5,
            ease: "easeInOut",
          }}
          whileHover={{
            rotateX: [0, 15, -15, 10, -10, 0],
            rotateY: [0, 10, -10, 5, -5, 0],
            scale: 1.1,
            filter: "drop-shadow(0px 0px 15px rgba(255,255,255,0.6))",
          }}
        />
      </div>
    </div>
  );
};

export default TaskForm;
