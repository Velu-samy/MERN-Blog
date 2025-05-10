import React, { useState, useEffect } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logoutbutton from "./Logoutbuuton";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const navigate = useNavigate();

    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem("username"); // ✅ Remove user from localStorage
        setUsername(""); // ✅ Update state instantly
        navigate("/login"); // ✅ Redirect after logout
    };

    useEffect(() => {
        const handleAuthChange = () => {
            setUsername(localStorage.getItem("username") || "");
        };

        window.addEventListener("storage", handleAuthChange);
        return () => {
            window.removeEventListener("storage", handleAuthChange);
        };
    }, []);

    return (
        <>
            <div className="flex justify-center mb-5">
                <div className="pt-5 py-1 px-5 text-xl border-b border-gray-500 lg:w-3/4 w-4/5 font-title mt-4 gap-5 text-black flex justify-between items-center">
                    
                    <motion.h1 initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="font-semibold text-purple-500 lg:text-5xl text-3xl">
                        Blog
                    </motion.h1>

                    <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-purple-500 text-3xl">
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>

                    <motion.ul animate={{ y: 0, opacity: 1 }} initial={{ y: -10, opacity: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="hidden lg:flex items-center p-5 gap-24 font-serif">
                        <li><Link className="hover:text-purple-400" to="/">Home</Link></li>
                        <li><Link className="hover:text-purple-400" to="/blog">Blog</Link></li>
                        {username && <li><Link className="hover:text-purple-400" to="/dashboard">Write Blog</Link></li>}
                        <li><Link className="hover:text-purple-400" to="/contact">Contact</Link></li>
                    </motion.ul>

                    <div className="relative hidden lg:flex items-center gap-5">
                        {username ? (
                            <motion.div animate={{ y: 0, opacity: 1 }} initial={{ y: -10, opacity: 0 }} transition={{ duration: 0.6, delay: 1 }} className="flex items-center gap-3">
                                <p className="text-purple-500 font-medium">{username}</p>
                                <button onClick={handleLogout} className="text-red-500">Logout</button>
                            </motion.div>
                        ) : (
                            <motion.div animate={{ y: 0, opacity: 1 }} initial={{ y: -10, opacity: 0 }} transition={{ duration: 0.8, delay: 1 }}>
                                <Link to="/register">
                                    <FaUser className="hover:text-purple-400 transition duration-700 text-2xl cursor-pointer" />
                                </Link>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;