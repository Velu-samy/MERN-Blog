import React, { useState } from 'react';
import img from '../assets/c.jpg'
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios'
import { motion } from 'framer-motion';
import { useEffect } from 'react';
function Contact() {
  const [formData, setFormData] = useState({
    username: '',
    query: '',
    mail: ''
  });


  const[res,setres]=useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Query Submitted:', formData);
    addedquery();

    setFormData({
      username : '',
      query:'',
      email:''
    });

    // Add your API logic here to handle contact form submissions
  };


  const addedquery = async () => {
  try {
    const res = await axios.post("https://mern-blog-vz8i.onrender.com/api/posts/query", formData);
    console.log("Query saved:", res.data);
    if(res){
      
      setres(true);
      setTimeout(()=>{
        setres(!true);

      },5000);
    }



  } catch (error) {
    console.error("Error submitting query:", error);
  }
};



  return (
  <>
 <Navbar/>
 {
   res &&   <p className='text-base lg:left-1/3 mt-14 lg:mt-10    z-10 p-2 lg:top-60 top-96    lg:p-2  p-1 font-serif text-center  absolute text-purple-400'>Thank you for reaching out! Your message has been submitted :) </p>
      }  
<motion.div animate={{y:0,opacity:1}}  initial={{y:-10,opacity:0}} transition={{duration:0.5,delay:0.3}}    className='flex justify-center'>
             <p className='text-center lg:w-3/4  p-4  mt-10'>If you have any questions, concerns, or would like to report an issue related to our blog, feel free to reach out to us. Whether it's a suggestion, feedback, or a request for updates, we are here to assist you. Simply fill out the contact form with your details and query, and we will get back to you as soon as possible. Your input helps us improve and provide better content. We appreciate your time and look forward to helping you!  </p>

</motion.div>
  <div className='flex  flex-col-reverse    lg:flex-row   lg:px-28 py-10     justify-evenly bg-white  lg:gap-16 gap-5 items-center'  >
 
  <motion.div  animate={{opacity:1,x:0}} initial={{opacity:0,x:-100}}  transition={{duration:0.5,delaay:0.2}} className="lg:w-1/2 lg:mx-auto lg:p-6 shadow-lg w-full px-10 pb-10 rounded-lg">
      <h1 className="text-4xl  mb-6 text-center">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Author Name/Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Author Name/Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter author name or username"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Query Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Query</label>
          <textarea
            name="query"
            value={formData.query}
            onChange={handleChange}
            placeholder="Describe what you want to update or delete"
            rows="4"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        {/* Action Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Mail</label>
          <input
            name="email"
            type='mail'
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Time Input */}
      
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-purple-500 hover:bg-blue-600 rounded-md shadow focus:outline-none"
          >
            Submit Query
          </button>
        </div>
      </form>
    </motion.div>
    <motion.div       animate={{opacity:1,x:0}} initial={{opacity:0,x:100}}  transition={{duration:0.5,delaay:0.2}} className='lg:w-1/2 w-full p-10'>
    <img alt=""  src={img} />
    </motion.div>

  </div>
  <Footer/>
  </>
  );
}

export default Contact;