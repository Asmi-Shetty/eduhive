import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ToggleButton = ({
  initialState = false,
  onToggle,
  labels = ["OFF", "ON"],
  icons = [],
}) => {
  const [isToggled, setIsToggled] = useState(initialState);

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
    if (onToggle) {
      onToggle(!isToggled);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative p-2 m-2 font-semibold rounded-lg shadow-md transition-transform transform duration-300 focus:outline-none text-sm ${isToggled
          ? "bg-gradient-to-r from-green-400 to-green-600 text-black"
          : "bg-gradient-to-r from-red-400 to-red-600 text-black"
        }`}
    >
      <span className="absolute inset-0 rounded-lg bg-opacity-20 bg-white blur"></span>
      <span className="relative">
        {isToggled ? labels[1] : labels[0]}
        <span className="p-2">
          {isToggled ? <FontAwesomeIcon icon={icons[0]} /> : <FontAwesomeIcon icon={icons[1]} />}
        </span>
      </span>
    </button>
  );
};

export default ToggleButton;
