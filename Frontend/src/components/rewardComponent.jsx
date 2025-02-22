import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const CoinReward = () => {
  const [duration, setDuration] = useState(0);
  const [showCoin, setShowCoin] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleCloseClick = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("Duration:", duration); // Debugging
    if (duration >= 0) { // Changed from 1 to 0 for testing
      setShowCoin(true);
    }
  }, [duration]);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {showCoin && isVisible && (
        <div className="transform transition-all duration-500 ease-in-out z-20 mb-28 opacity-100 scale-100">
          <span className="absolute top-0 right-0 p-2 text-white cursor-pointer" onClick={handleCloseClick}>
            <FontAwesomeIcon icon={faXmark} />
          </span>
          <img
            src="/coin.png" // Change the path as needed
            alt="Coin"
            className="w-96 h-96 mx-auto spinY"
          />
          <p className="text-center text-white text-3xl mt-3">Coin Reward</p>
        </div>
      )}
    </div>
  );
};

export default CoinReward;
