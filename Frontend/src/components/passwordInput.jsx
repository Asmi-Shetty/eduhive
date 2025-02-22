import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const PasswordInput = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisible = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <>
            <div className="relative flex items-center  m-auto mb-3 w-56">
                <input
                    type={passwordVisible ? "text" : "password"}
                    className="p-3  rounded-md border border-gray-300 w-full"
                    placeholder="Password"
                />
                <button
                    type="button"
                    className="absolute right-3"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                >
                    <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
                </button>
            </div>
        </>
    );
};
export default PasswordInput;
