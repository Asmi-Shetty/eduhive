import { motion } from "framer-motion";
import { FaUsers, FaChalkboardTeacher, FaTrophy, FaRocket } from "react-icons/fa";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.5)" 
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col items-center text-center space-y-4 transition-all"
    >
      <div className="text-4xl text-blue-500">{icon}</div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
};

const FeatureGrid = () => {
  return (
    <div className="mt-16 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-none px-4">
      <FeatureCard icon={<FaUsers />} title="Real-Time Collaboration" description="Work together with live whiteboards and discussions." />
      <FeatureCard icon={<FaChalkboardTeacher />} title="Interactive Learning" description="Use polls, quizzes, and shared notes to enhance learning." />
      <FeatureCard icon={<FaTrophy />} title="Rewards & Streaks" description="Stay motivated with daily streaks and achievements." />
      <FeatureCard icon={<FaRocket />} title="AI Study Assistant" description="Get personalized task suggestions and study reminders." />
    </div>
  );
};

export default FeatureGrid;
