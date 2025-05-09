import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // ✅ Correct for v4.0.0
import Createblog from "./Createblog";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function nDashboard() {
    const [admin, setAdmin] = useState({ username: "", userId: "" });
    const [posts, setPosts] = useState([]);
    const [editPost, setEditPost] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editFormData, setEditFormData] = useState({ title: "", desc: "", category: "" });

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("❌ No token found! Authentication required.");
            return;
        }

        try {
            const decodedToken = jwtDecode(token);
            console.log("✅ Decoded Token:", decodedToken);

            const userId = decodedToken.userId;
            const username = decodedToken.username;

            setAdmin({ username, userId });

            fetchUserPosts(token);
        } catch (error) {
            console.error("❌ Token decoding error:", error);
        }
    }, []);

    const fetchUserPosts = async (token) => {
        try {
            const response = await axios.get("http://localhost:5000/api/posts/user/posts", {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log("✅ Fetched Posts Response:", response.data);

            if (Array.isArray(response.data) && response.data.length > 0) {
                setPosts(response.data); // ✅ Correct state update
            } else {
                console.error("❌ No posts found!");
                setPosts([]); // ✅ Ensure `posts` is always an array to prevent UI crashes
            }
        } catch (error) {
            console.error("❌ Error fetching user posts:", error.response?.data || error.message);
        }
    };

    const handleDelete = async (postId) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            await axios.delete(`http://localhost:5000/api/posts/delete/${postId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPosts(posts.filter((post) => post._id !== postId));
        } catch (error) {
            console.error("❌ Error deleting post:", error.response?.data || error.message);
        }
    };

    const handleEdit = (post) => {
        setEditPost(post);
        setEditFormData({ title: post.title, desc: post.desc, category: post.category });
        setShowEditModal(true);
    };

    const handleEditChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            console.log("🔄 Updating Post:", editPost._id);

            const response = await axios.put(
                `http://localhost:5000/api/posts/update/${editPost._id}`,
                editFormData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setPosts(posts.map(post => post._id === editPost._id ? response.data : post));
            setEditPost(null);
            setShowEditModal(false);
        } catch (error) {
            console.error("❌ Error updating post:", error.response?.data || error.message);
        }
    };

    return (
        <>
        <Navbar/>
            <div className="flex flex-col items-center justify-center ">
                <div className="bg-white p-8 rounded-lg shadow md:w-full w-96 ">
                    <h2 className="text-3xl font-bold text-center mb-4">Post Owner Dashboard</h2>
                    <h3 className="text-xl font-bold mt-6 text-center">Your Posts</h3>

                    {posts.length === 0 ? (
                        <p className="text-center text-gray-600">You haven't created any posts yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3  lg:flex lg:justify-center gap-4  flex-wrap gap-6 mt-6">
                            {posts.map(post => (
                                <div key={post._id} className="bg-gray-200 p-4 rounded-lg shadow-md">
                                    <h4 className="font-bold text-lg">{post.title}</h4>
                                    <p className="text-sm text-gray-700 mb-3">{post.desc.slice(0,100)}...</p>
                                    <p className="text-sm text-gray-700">{post.category}</p>

                                    <div className="mt-4 flex justify-between">
                                        <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => handleEdit(post)}>Edit</button>
                                        <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(post._id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ✅ Edit Modal Popup */}
                {showEditModal && (
                    <div className="fixed  w-full inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white lg:p-6 rounded-md shadow-lg lg:w-1/2  w-full">
                            <h3 className="text-xl font-bold mb-4 text-center">Edit Post</h3>
                            <form onSubmit={(e) => { e.preventDefault(); handleEditSubmit(); }}>
                                <label className="block text-sm font-medium text-gray-700">Title</label>
                                <input type="text" name="title" value={editFormData.title} onChange={handleEditChange}
                                    className="w-full p-2 border border-gray-300 rounded-md mb-3" required />

                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea name="desc" value={editFormData.desc} onChange={handleEditChange}
                                    className="w-full  p-5 border border-gray-300 rounded-md mb-3" required></textarea>

                                <label className="block text-sm font-medium text-gray-700">Category</label>
                                <select name="category" value={editFormData.category} onChange={handleEditChange}
                                    className="w-full p-2 border border-gray-300 rounded-md mb-3" required>
                                    <option value="Technology">Technology</option>
                                    <option value="Health">Health</option>
                                    <option value="Lifestyle">Lifestyle</option>
                                </select>

                                <div className="flex justify-between mt-4">
                                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                                    <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowEditModal(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <Createblog />
            <Footer/>
        </>
    );
}