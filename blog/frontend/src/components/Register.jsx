import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Ensure Axios is installed (`npm install axios`)

function Register() {
    const navigate = useNavigate(); // Redirect after registration
    const [userData, setUserData] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userData.username || !userData.email || !userData.password) {
            setError("All fields are required!");
            return;
        }
        if (userData.password.length < 8) {
            setError("Password must be at least 8 characters!");
            return;
        }

        try {
            const response = await axios.post("https://mern-blog-vz8i.onrender.com/api/users/register", userData);
            setSuccess(response.data.message);
            setError("");
            setTimeout(() => navigate("/signin"), 2000); // Redirect after success
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={userData.username}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={userData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                     
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={userData.password}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                       
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Register
                    </button>
                    <p className="text-center text-gray-600">
                        Already have an account? <Link to="/login" className="text-blue-500">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;