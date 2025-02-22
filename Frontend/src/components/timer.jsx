import { useState, useEffect } from "react";
import { FiDollarSign } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
  const [isRunning, setIsRunning] = useState(true);
  const [coins, setCoins] = useState(() => {
    return parseInt(localStorage.getItem("coins")) || 0;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    const coinInterval = setInterval(() => {
      setCoins((prevCoins) => {
        const newCoins = prevCoins + 1;
        localStorage.setItem("coins", newCoins);
        return newCoins;
      });
      navigate("/reward");
    }, 30);

    return () => clearInterval(coinInterval);
  }, [navigate]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="text-center text-white bg-gray-600 p-4 rounded-lg">
      <h1 className="text-2xl font-bold">Timer</h1>
      <p className="text-xl mt-2">{formatTime(timeLeft)}</p>
      <button
        onClick={() => setIsRunning((prev) => !prev)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        {isRunning ? "Pause" : "Resume"}
      </button>
      <div className="mt-4 flex items-center justify-center gap-2">
        <FiDollarSign className="text-yellow-400 text-2xl" />
        <span className="text-lg font-bold">{coins}</span>
      </div>
    </div>
  );
};

export default Timer;
