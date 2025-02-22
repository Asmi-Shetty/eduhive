import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Button from "./button";
import { motion } from "framer-motion";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showText, setShowText] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const HandleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before new attempt

    try {
      const data = await loginUser(formData);
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/"); // Redirect to home
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-screen w-screen">
      {/* Left Side - Robot Image */}
      <div className="hidden md:flex w-1/2 flex-col items-center justify-center bg-gray-800 relative">
        {showText && (
          <motion.h1
            className="absolute top-12 right-16 text-white font-extrabold text-4xl md:text-5xl lg:text-6xl font-serif tracking-wide"
            style={{
              textShadow: "0px 0px 12px rgba(255,255,255,0.9), 0px 0px 20px rgba(255,255,255,0.6)", // Strong Glow Effect
            }}
            initial={{ opacity: 0, scale: 0.5, x: -20 }}
            animate={{ opacity: 1, scale: 1.05, x: 20 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to Study Bot
          </motion.h1>
        )}
        <motion.img
          src="/Chatbot image.png"
          alt="Robot"
          className="w-1/2 max-h-[80%] object-contain cursor-pointer"
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
          onMouseEnter={() => setShowText(true)}
          onMouseLeave={() => setShowText(false)}
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-800 p-8">
        <div className="w-full max-w-md">
          {/* <h2 className="text-white text-2xl font-bold text-center mb-4"> */}
            {/* Welcome Back */}
          {/* </h2> */}

          {error && <p className="text-red-500 text-center">{error}</p>}

          <form onSubmit={HandleLogin} className="space-y-4">
            <div>
              <input
                type="text"
                name="email"
                className="w-full p-3 border rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full p-3 border rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>

            <div>
              <Button label="Login" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;