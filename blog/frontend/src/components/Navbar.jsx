import React, { useState, useEffect } from "react";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import './Navbar.css';
function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("username");
        setUsername("");
        navigate("/");
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
            <div className="flex items-center justify-center mb-5">
                <motion.div 
                    initial={{ x: -100, opacity: 0 }} 
                    animate={{ x: 0, opacity: 1 }} 
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="pt-5 py-1 px-5 text-xl border-b border-gray-500 lg:w-3/4 w-4/5 font-title mt-4 gap-5 text-black flex justify-between items-center"
                >
                    <motion.h1 
                        initial={{ x: -50, opacity: 0 }} 
                        animate={{ x: 0, opacity: 1 }} 
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="font-semibold text-purple-500 lg:text-5xl text-3xl"
                    >
                        Blog
                    </motion.h1>

                    <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-purple-500 text-3xl">
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>

                    <motion.ul 
                        initial={{ x: -50, opacity: 0 }} 
                        animate={{ x: 0, opacity: 1 }} 
                        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        className="hidden lg:flex items-center p-5 gap-24 font-serif"
                    >
                        <li><Link className="hover:text-purple-400" to="/">Home</Link></li>
                        <li><Link className="hover:text-purple-400" to="/blog">Blog</Link></li>
                        {username && <li><Link className="hover:text-purple-400" to="/dashboard">Write Blog</Link></li>}
                        <li><Link className="hover:text-purple-400" to="/contact">Contact</Link></li>
                    </motion.ul>

                    <motion.div 
                        initial={{ x: -50, opacity: 0 }} 
                        animate={{ x: 0, opacity: 1 }} 
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                        className="relative hidden lg:flex items-center gap-5"
                    >
                        {username ? (
                            <div className="flex items-center gap-3">
                                <p className="text-purple-500 font-medium">{username}</p>
                                <button onClick={handleLogout} className="text-red-500 border-purple-500 border hover:bg-purple-500 hover:text-white px-2 py-1">Logout</button>
                            </div>
                        ) : (
                            <Link to="/register">
                                <FaUser className="hover:text-purple-400 transition duration-700 text-2xl cursor-pointer" />
                            </Link>
                        )}
                    </motion.div>
                </motion.div>
            </div>

            {isOpen && (
                <motion.div 
                    initial={{ x: -100, opacity: 0 }} 
                    animate={{ x: 0, opacity: 1 }} 
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="forphone   z-10  lg:hidden flex flex-col  w-64 bg-purple-500 absolute top-0 left-0 py-4"
                >
                    <ul className="flex flex-col items-center gap-16 mt-10 font-serif">
                        <li><Link className="hover:text-purple-400" to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
                        <li><Link className="hover:text-purple-400" to="/blog" onClick={() => setIsOpen(false)}>Blog</Link></li>
                        {username && <li><Link className="hover:text-purple-400" to="/dashboard" onClick={() => setIsOpen(false)}>Write Blog</Link></li>}
                        <li><Link className="hover:text-purple-400" to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
                    </ul>

                    <div className="flex justify-center lg:mt-0 mt-16">
                        {username ? (
                            <div className="flex flex-col items-center gap-3">
                                <p className="lg:text-purple-500  text-white   font-medium">{username}</p>
                                <button onClick={handleLogout} className="lg:text-red-400 text-black lg:border-purple-500  border-white  border hover:bg-purple-500 hover:text-white px-3 py-1">Logout</button>
                            </div>
                        ) : (
                            <Link to="/register" onClick={() => setIsOpen(false)}>
                                <FaUser className="hover:text-purple-400 transition duration-700 text-2xl cursor-pointer" />
                            </Link>
                        )}
                    </div>
                </motion.div>
            )}
        </>
    );
}

export default Navbar;