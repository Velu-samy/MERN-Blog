import React, { useEffect, useState } from "react";
import fallbackImage from "../assets/no.jpg"; // Fallback image
import { Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

function List() {
  const [posts, setPosts] = useState([]);

  // Fetch posts from the backend
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/posts"); // Public route (no auth needed)
      setPosts(response.data); // Store posts in state
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="overflow-hidden flex items-center flex-col">
      <h1 className="mt-20 text-4xl font-thin">Blogs</h1>
      <div className="list-container flex-wrap p-7 px-36 items-center flex justify-evenly gap-24">
        {posts.slice(0,3).map((item, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            key={index}
            className="list-box shadow-xl overflow-hidden hover:shadow-2xl transition duration-1000 py-3 flex flex-col w-80"
          >
            {/* Display Post Image */}
            <div className="img-container w-96 h-64 overflow-hidden">
              <img
             src={item.img ? `http://localhost:5000/${item.img.replace(/\\/g, "/")}` : fallbackImage}
                alt={item.title}
                className="w-full object-cover object-contain rounded-sm"
                onError={(e) => {
                  e.target.src = fallbackImage; // Fallback if image fails
                }}
              />
            </div>

            <div className="py-3 p-4">
              <p className="text-left text-sm font-extralight rounded-md border inline-flex border bg-purple-500 text-white px-1 py-0.5">
                {item.category}
              </p>
              <h1 className="lg:text-2xl text-xl  text-left mb-3 font-semibold font-serif my-1">
                {item.title.substr(0, 15)}...
              </h1>

              <div className="flex text-left justify-between mt-1">
                <p>by {item.username}</p>
                <p className="mb-5">
                  {item?.createdAt
                    ? new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })
                    : "Date not available"}
                </p>
              </div>

              {/* Visit Button */}
              <div className="flex justify-center">
                <Link
                  to={`/posts/${item._id}`}
                  className="px-7 py-2 bg-purple-600 mb-1 text-white rounded-md text-center hover:opacity-70"
                >
                  Visit
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Link
        className="px-4 py-2 mt-4 bg-purple-600 mb-10 text-white hover:opacity-80"
        to={"/blog"}
      >
        Show more
      </Link>
    </div>
  );
}

export default List;