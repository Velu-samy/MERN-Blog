import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import fallbackImage from "../assets/no.jpg"; // Fallback image
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Reviewpost() {
    const { id } = useParams(); // ✅ Get post ID from URL
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/api/posts/${id}`);
                setPost(response.data);
            } catch (err) {
                setError("❌ Post not found or server error.");
            } finally {
                setLoading(false); // ✅ Ensures loading state updates
            }
        };

        fetchPost();
    }, [id]);

    if (loading) return <p className="text-center mt-20 text-lg font-semibold">Loading post...</p>;
    if (error) return <p className="text-center text-red-500 mt-20 font-semibold">{error}</p>;

    return (
        <>
        <Navbar/>
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            {post ? (
                <>
                    {/* Post Title */}
                    <h1 className="text-3xl font-bold text-center mb-4">{post.title}</h1>

                    {/* Post Image */}
                    <div className="w-full h-96 overflow-hidden rounded-md">
                        <img
                                       src={post.img ? `http://localhost:5000/${post.img.replace(/\\/, "/")}` : fallbackImage}
                          
                            alt={post.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.src = fallbackImage;
                            }}
                        />
                    </div>

                    {/* Author and Date */}
                    <div className="text-gray-600 text-sm mt-3 flex justify-between">
                        <p>By <span className="font-medium">{post.username || "Unknown Author"}</span></p>
                        <p>{post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "Date not available"}</p>
                    </div>

                    {/* Post Content */}
                    <p className="mt-6 mb-2 text-lg text-gray-700 leading-relaxed">{post.category || "No content available."}</p>
                    <p>{post.desc}</p> {/* ✅ Changed "description" to "desc" */}

                    {/* Back to Blogs Button */}
                    <div className="text-center mt-6">
                        <Link to="/blog" className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                            ⬅ Back to Blogs
                        </Link>
                    </div>
                </>
            ) : (
                <p className="text-center text-gray-600 mt-10">Post data unavailable.</p>
            )}
        </div>
        <Footer/>  
        </>
      
    );
}

export default Reviewpost;