import  { useState } from "react";
import { motion } from "framer-motion";

const Poll = () => {
  const [votes, setVotes] = useState([
    { option: "Option 1", count: 120 },
    { option: "Option 2", count: 90 },
    { option: "Option 3", count: 60 },
    { option: "Option 4", count: 30 },
  ]);

  const totalVotes = votes.reduce((sum, vote) => sum + vote.count, 0);

  const handleVote = (index) => {
    setVotes((prevVotes) => {
      const updatedVotes = [...prevVotes];
      updatedVotes[index] = {
        ...updatedVotes[index],
        count: updatedVotes[index].count + 1,
      };
      return updatedVotes;
    });
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-6">
      {/* Wider & Shorter Poll Card with Bottom Margin */}
      <div className="bg-gray-900 shadow-xl rounded-lg p-4 w-full max-w-3xl mb-8">
        <h2 className="text-2xl font-bold text-white mb-3 text-center">
          Vote for Your Favorite Option
        </h2>
        <ul className="space-y-2">
          {votes.map((vote, index) => (
            <li
              key={index}
              className="flex flex-col bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-lg cursor-pointer transition duration-300"
              onClick={() => handleVote(index)}
            >
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-500 cursor-pointer"
                  onChange={() => handleVote(index)}
                />
                <span className="text-white font-medium">{vote.option}</span>
              </div>
              <motion.div
                className="text-sm text-gray-400 mt-1 font-semibold flex items-center"
                animate={{ opacity: [0, 1], scale: [0.8, 1] }}
                transition={{ duration: 0.5 }}
              >
                <motion.span
                  className="bg-blue-500 text-white px-2 py-1 rounded-full mr-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                >
                  {vote.count}
                </motion.span>
                votes ({((vote.count / totalVotes) * 100).toFixed(1)}%)
              </motion.div>
              <motion.div
                className="bg-blue-500 h-1 mt-1 rounded"
                initial={{ width: "0%" }}
                animate={{ width: `${(vote.count / totalVotes) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Poll;