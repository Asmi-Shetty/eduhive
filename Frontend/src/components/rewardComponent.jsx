import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Timer from "./timer";

const CoinReward = () => {
  const [duration, setDuration] = useState(0); // Time in minutes
  const [showCoin, setShowCoin] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Visibility of coin

  // Handle close button click
  const handleCloseClick = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 60000); // Increment duration every 60 seconds (1 minute)

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
    if (duration >= 60) {
      setShowCoin(true); // Show coin after 60 minutes
    }
  }, [duration]);

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="relative min-h-screen flex justify-center bg-gray-900">
        <div className="absolute top-10">
          <Timer />
        </div>
      </div>

      {/* Coin component */}
      {showCoin && isVisible && (
        <div className="transform transition-all duration-500 ease-in-out z-20 mb-28 opacity-100 scale-100">
          <span className="absolute top-0 right-0 p-2 text-white cursor-pointer" onClick={handleCloseClick}>
            <FontAwesomeIcon icon={faXmark} />
          </span>
          <img
            src="/coin.png"
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
