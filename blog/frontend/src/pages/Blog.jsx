import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { Link } from 'react-router';
import { blogData } from '../assets/list';
import axios from 'axios';
import { motion } from 'framer-motion';
import m from '../assets/no.jpg'
import Footer from '../components/Footer';
import Banner2 from '../components/Banner2';
import Banner4 from '../components/Banner4';
import fallbackImage from '../assets/c.jpg'

function Blog() {
  const [posts, setPosts] = useState([]);

  // Fetch posts from the backend
  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://mern-blog-vz8i.onrender.com/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
 
 
 
  return (
      <>
          <Navbar/>
          <Banner4/>
            <div className="overflow-hidden flex mx-10 items-center flex-col">
               <motion.h1    whileInView={{opacity:1,y:0}} initial={{opacity:0,y:-20}}  transition={{duration:1,delaay:0.2}} className="mt-20 text-4xl font-thin">Blogs</motion.h1>
               <div className="list-container flex-wrap p-7 px-36 items-center flex justify-between gap-10">
                 {posts.map((item, index) => (
                   <motion.div whileInView={{opacity:1}} initial={{opacity:0}}  transition={{duration:1,delaay:0.2}}
                     key={index}
                     className="list-box shadow-xl  overflow-hidden  hover:shadow-2xl transition duration-1000 py-3 flex flex-col w-80 "
                   >
                  <div className="img-container w-96 h-64 overflow-hidden">
           <img
            src={item.image}
             alt={item.title}
             className="w-full object-cover object-contain    rounded-sm"
           />
         </div>
                     <div className="py-3 p-4">
                     <p className="text-left text-sm font-extralight rounded-md border inline-flex border bg-purple-500 text-white px-1 py-0.5">
                {item.category}
              </p>                       <h1 className="lg:text-2xl text-xl  text-left mb-3 font-semibold font-serif my-1">
                         {item.title.substr(0, 15)}...
                       </h1>
                       <div className="flex text-left justify-between mt-3">
                         <p>By {item.username}</p>
                         <p className="mb-5">
                  {item?.createdAt
                    ? new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })
                    : "Date not available"}
                </p>
         {/* Display the formatted date */}
                       </div>
                     <div className='flex justify-center'>
                     <Link
                         to={`/posts/${item._id}`}
                         className="bg-purple-500 text-white   p-2 rounded-md text-center hover:opacity-70"
                       >
                         Show more
                       </Link>
                     </div>
                     </div>
                   </motion.div>
                 ))}
               </div>
             </div>
             <Banner2/>

         <Footer/>
      </>
     
    );
}

export default Blog

