import { useState, useEffect } from "react";

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
  const [isRunning, setIsRunning] = useState(true); // Track if timer is running

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]); // Depend only on isRunning to avoid unnecessary resets

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
    </div>
  );
};

export default Timer;
