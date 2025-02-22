import React from "react";
import { useNavigate } from "react-router-dom";

const Button = ({ label, onClick, type = "button", to }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (to) {
            navigate(to);  // Navigate if 'to' prop is provided
        } else if (onClick) {
            onClick(); // Otherwise, trigger the provided onClick function
        }
    };

    return (
        <div className="relative inline-flex group">
            <div
                className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"
            ></div>
            <button
                type={type}
                onClick={handleClick}
                className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
                {label}
            </button>
        </div>
    );
};

export default Button;
