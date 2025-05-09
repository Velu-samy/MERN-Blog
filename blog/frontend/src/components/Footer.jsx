import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <div   whileInView={{opacity:1}} initial={{opacity:0}}  transition={{duration:0.9,delaay:0.2}} className="footer-container gap-10 bg-purple-700 p-8 lg:p-10 lg:h-72 text-white border-black border-dashed lg:flex justify-around flex lg:flex-row  flex-col lg:items-center">
        <motion.div whileInView={{opacity:1}} initial={{opacity:0}}  transition={{duration:0.9,delaay:0.2}}  className="lg:w-2/5 w-full">
          <h1 className="text-5xl font-bold font-tittle mb-2">Blog</h1>
          <p>Thank you for visiting my blog page! 🌟 I hope you enjoyed exploring the world of technology.</p>
          <p>Follow me for more updates and insights.</p>

          {/* Scroll to Top Button */}
          <button 
            className="py-1 mt-3 rounded-sm text-black px-3 bg-white cursor-pointer"
            onClick={scrollToTop}
          >
            Go To Top
          </button>
        </motion.div>

        <motion.div whileInView={{opacity:1}} initial={{opacity:0}}  transition={{duration:0.9,delaay:0.2}} className="contact">
          <h1 className="mb-4 mt-5   font-tittle text-xl border-b lg:w-14">Contact</h1>
          <p>+91 8072624556</p>
          <p>Blog@gmail.com</p>
        </motion.div>

        <motion.div whileInView={{opacity:1}} initial={{opacity:0}}  transition={{duration:0.9,delaay:0.2}} className="quicklinks">
          <h2 className="text-xl mb-4 font-tittle border-b w-18">Quick Links</h2>
          <ul className="flex flex-col gap-2">
            <li><Link className="hover:underline transition-all duration-1000" to="/">Home</Link></li>
            <li><Link className="hover:underline" to="/blog">Blog</Link></li>
            <li><Link className="hover:underline" to="/contact">Contact</Link></li>
          </ul>
        </motion.div>

       
      </div>
    </div>
  );
}

export default Footer;