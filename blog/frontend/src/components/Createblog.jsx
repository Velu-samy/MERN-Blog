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

    const [loading, setLoading] = useState(false); // ✅ Loader state

    // ✅ Retrieve user details safely
    const userId = localStorage.getItem("userId") || "";
    const author = localStorage.getItem("username") || "Guest";
    const token = localStorage.getItem("token");

    // ✅ Handle input changes dynamically
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Handle image selection & preview
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

    // ✅ Handle form submission with loader
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const postData = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value) postData.append(key, value);
        });
        postData.append("userId", userId);
        postData.append("author", author);

        try {
            await axios.post("https://mern-blog-vz8i.onrender.com/api/posts/create", postData, {
                headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
            });

            alert("✅ Blog created successfully!");
            setFormData({ title: "", desc: "", category: "Technology", image: null, imagePreview: null });
        } catch (error) {
            alert("❌ Failed to create blog post.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center mb-20 p-4">
                <motion.div className="bg-white shadow-2xl w-full max-w-2xl p-6 rounded-lg">
                    <h1 className="text-3xl font-bold text-center">Create a Blog</h1>
                    {loading && <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="mx-auto mt-4 w-10 h-10 rounded-full border-4 border-purple-600 border-t-transparent"></motion.div>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded" required />
                        <textarea name="desc" value={formData.desc} onChange={handleChange} placeholder="Description" rows="4" className="w-full p-2 border rounded" required></textarea>
                        <input type="file" name="image" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded" />
                        {formData.imagePreview && <img src={formData.imagePreview} alt="Preview" className="w-full h-32 object-cover rounded-lg mt-2" />}
                        <button type="submit" disabled={loading} className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
                            {loading ? "Uploading..." : "Create Post"}
                        </button>
                    </form>
                </motion.div>
            </div>
            <Footer />
        </>
    );
}

export default CreateBlog;