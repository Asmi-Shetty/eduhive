import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import Button from "./button";
import {motion} from "framer-motion";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default navigation behavior
    try {
      const data = await registerUser(formData);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/login"); // Redirect after successful signup
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      {/* right side robot image */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-900">
        <motion.img
          src="/Chatbot image.png"
          alt="Robot"
          className="w-1/2 max-h-[80%] object-contain"
          whileHover={{
            rotateX: [0, 15, -15, 10, -10, 0], // Tilt forward & backward
            rotateY: [0, 10, -10, 5, -5, 0], // Rotate side to side
            scale: 1.1, // Slight scale-up
            filter: "drop-shadow(0px 0px 15px rgba(255,255,255,0.6))",
          }}
          transition={{
            duration: 1.5, // Smooth looping effect
            ease: "easeInOut",
            repeat: Infinity, // Keep moving continuously while hovered
          }}
        />
      </div>
      {/* sign up form */}
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md animate-fadeIn backdrop-filter backdrop-blur-sm">
        {error && <p className="text-red-500">{error}</p>}
        <h2 className="text-3xl font-bold text-center text-white mb-6">Sign Up</h2>

        {/* ✅ No `onSubmit` on <form>, handled inside <Button> */}
        <form className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
          />

          {/* ✅ `to="#"` prevents unwanted navigation, `onClick` handles the form submission */}
          <Button label="Create Account" to="/login" onClick={handleSubmit} />
        </form>

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
