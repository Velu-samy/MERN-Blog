import React, { useState, useEffect } from "react";
import { FaSearch, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Navbar.css";
import LogoutButton from "./Logoutbutton";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthChange = () => {
      const newUsername = localStorage.getItem("username") || "";
      setUsername(newUsername);

      if (newUsername && window.location.pathname === "/register") {
        navigate("/dashboard");
      }
    };

    window.addEventListener("storage", handleAuthChange);
    return () => {
      window.removeEventListener("storage", handleAuthChange);
    };
  }, [navigate]);

  return (
    <>
      {/* Navbar Container */}
      <div className="flex justify-center mb-5">
        <div className="pt-5 py-1 px-5 text-xl border-b border-gray-500 lg:w-3/4 w-4/5 font-title mt-4 gap-5 text-black flex justify-between items-center">

          {/* Logo */}
          <motion.h1 initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="font-semibold text-purple-500 lg:text-5xl text-3xl">
            Blog
          </motion.h1>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-purple-500 text-3xl">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Desktop Navigation Menu */}
          <motion.ul animate={{ y: 0, opacity: 1 }} initial={{ y: -10, opacity: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="hidden lg:flex items-center p-5 gap-24 font-serif">
            <li><Link className="hover:text-purple-400"    to="/">Home</Link></li>
            <li><Link className="hover:text-purple-400" to="/blog">Blog</Link></li>
            {username && <li><Link className="hover:text-purple-400" to="/dashboard">Write Blog</Link></li>}
            <li><Link className="hover:text-purple-400"  to="/contact">Contact</Link></li>
          </motion.ul>

          {/* Desktop Profile Section */}
          <div className="relative hidden lg:flex   items-center  gap-5">
            {username ? (
              <motion.div animate={{ y: 0, opacity: 1 }} initial={{ y: -10, opacity: 0 }} transition={{ duration: 0.6, delay: 1 }} className="flex items-center gap-3">
                <p className="text-purple-500 font-medium">{username}</p>
                <LogoutButton />
              </motion.div>
            ) : (
            <motion.div animate={{ y: 0, opacity: 1 }} initial={{ y: -10, opacity: 0 }} transition={{ duration: 0.8, delay: 1 }} >
                <Link to="/register">
                <FaUser className="hover:text-purple-400 transition duration-700 text-2xl cursor-pointer" />
              </Link>
            </motion.div>
            )}
           
          </div>
        </div>

        {/* Mobile Menu with Left-to-Right Slide Animation */}
        <motion.div 
          initial={{ x: "-100vw" }} 
          animate={isOpen ? { x: 0 } : { x: "-100vw" }} 
          transition={{ duration: 0.7, ease: "easeOut" }} 
          className="forphone   lg:hidden bg-purple-500 shadow-lg rounded-sm absolute left-0 w-1/2   z-10 p-5"
        >
          <ul className="flex flex-col items-center mt-7 gap-11 font-serif text-white">
            <li><Link      to="/">Home</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            {username && <li><Link to="/dashboard">Write Blog</Link></li>}
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          
          {/* Mobile Profile Section */}
          <div className="relative lg:hidden flex flex-col gap-8 items-center mt-8 ml-4">
            {username ? (
              <div className="flex items-center gap-3">
                <p className="text-white font-medium">{username}</p>
                <LogoutButton />
              </div>
            ) : (
              <Link to="/register">
                <FaUser className="hover:text-white transition duration-700 text-2xl cursor-pointer" />
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Navbar;