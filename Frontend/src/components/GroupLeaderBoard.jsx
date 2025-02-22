import { motion } from "framer-motion";

const Leaderboard = () => {
  const winners = [
    { name: "Alice", score: 95, color: "gold" }, 
    { name: "Bob", score: 88, color: "silver" }, 
    { name: "Charlie", score: 85, color: "bronze" } 
  ];

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-xl font-semibold text-gray-300 mb-4">🏆 Leaderboard</h2>

      <div className="flex justify-center items-end space-x-6">
        
        <motion.div
          className="w-24 h-32 bg-gray-700 rounded-t-lg flex flex-col justify-end items-center pb-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg font-bold text-gray-200">{winners[1].name}</p>
          <p className="text-sm text-gray-400">🥈 {winners[1].score} pts</p>
        </motion.div>

        
        <motion.div
          className="w-28 h-40 bg-yellow-500 rounded-t-lg flex flex-col justify-end items-center pb-3 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg font-bold text-white">{winners[0].name}</p>
          <p className="text-sm text-gray-100">🥇 {winners[0].score} pts</p>
        </motion.div>

        
        <motion.div
          className="w-24 h-28 bg-gray-600 rounded-t-lg flex flex-col justify-end items-center pb-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg font-bold text-gray-200">{winners[2].name}</p>
          <p className="text-sm text-gray-400">🥉 {winners[2].score} pts</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;
