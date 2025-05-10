import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logoutbutton = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setIsLoggedIn(false); // Update login status
        navigate("/login"); // Redirect to sign-in page
    };

    return isLoggedIn ? (
        <button onClick={handleLogout} className=" text-black px-3 py-1 border border-black rounded hover:bg-purple-500 transition duration-200">
            Logout
        </button>
    ) : null; // Hide button after logout
};

export default Logoutbutton;