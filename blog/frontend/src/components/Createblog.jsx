import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";

function CreateBlog() {
    const [formData, setFormData] = useState({
        title: "",
        desc: "",
        category: "Technology",
        image: null,
        imagePreview: null,
    });
    const [loading, setLoading] = useState(false); // 🟣 Loader state

    const userId = localStorage.getItem("userId") || "";
    const author = localStorage.getItem("username") || "Guest";
    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({
                ...formData,
                image: file,
                imagePreview: URL.createObjectURL(file),
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token || !userId || !formData.title.trim() || !formData.desc.trim()) {
            alert("❌ Missing required fields!");
            return;
        }

        setLoading(true); // 🟣 Start loader

        const postData = new FormData();
        postData.append("title", formData.title);
        postData.append("desc", formData.desc);
        postData.append("category", formData.category);
        postData.append("userId", userId);
        postData.append("author", author);

        if (formData.image) {
            postData.append("image", formData.image);
        }

        try {
            const response = await axios.post(
                "https://mern-blog-vz8i.onrender.com/api/posts/create",
                postData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("✅ Blog created successfully!");
            console.log(response.data);

            setFormData({
                title: "",
                desc: "",
                category: "Technology",
                image: null,
                imagePreview: null,
            });

        } catch (error) {
            console.error("❌ Error creating post:", error.response?.data || error.message);
            alert("❌ Failed to create blog post.");
        } finally {
            setLoading(false); // 🟣 Stop loader
        }
    };

    return (
        <>
            <div className="flex justify-center items-center mb-20">
                <div className="lg:px-11 py-20 bg-white shadow-2xl lg:w-3/5 w-full p-4 rounded-lg">
                    <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }}>
                        <h1 className="text-4xl font-bold mb-6 text-center">Create a Blog</h1>
                    </motion.div>

                    <motion.div animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: -50 }} transition={{ duration: 0.5, delay: 0.8 }}>
                        <p className="my-10 text-center">Start sharing your thoughts and ideas with the world!</p>
                    </motion.div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Title</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange}
                                placeholder="Enter post title" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea name="desc" value={formData.desc} onChange={handleChange}
                                placeholder="Enter post description" rows="4"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select name="category" value={formData.category} onChange={handleChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" required>
                                <option value="Technology">Technology</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                            <input type="file" name="image" accept="image/*" onChange={handleImageChange}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                            {formData.imagePreview && (
                                <img src={formData.imagePreview} alt="Preview" className="mt-2 max-w-full h-32 rounded-md shadow-md" />
                            )}
                        </div>

                        <div className="relative">
                            {loading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="loader border-t-4 border-purple-600 border-solid rounded-full w-8 h-8 animate-spin"></div>
                                </div>
                            )}
                            <button type="submit" className="w-full px-4 py-2 text-white bg-purple-600 hover:bg-purple-700 rounded-md shadow">
                                {loading ? "Creating Post..." : "Create Post"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default CreateBlog;