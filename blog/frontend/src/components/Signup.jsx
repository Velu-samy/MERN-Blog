import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => setUserData({ ...userData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, password } = userData;

        if (!username || !password) {
            setError("Both fields are required!");
            return;
        }

        try {
            const { data } = await axios.post("https://mern-blog-vz8i.onrender.com/api/users/login", { username, password });
            console.log("🔎 Backend Response:", data);

            const { token, userId } = data;

            if (token && userId) {
                localStorage.setItem("token", token);
                localStorage.setItem("userId", userId);
                localStorage.setItem("username", data.username);
                navigate("/");
            } else {
                setError("Login failed. Please try again.");
            }
        } catch (err) {
            console.error("❌ Login error:", err.response?.data || err.message);
            setError(err.response?.status === 401 ? "Invalid username or password." : "Login failed! Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {["username", "password"].map((field) => (
                        <input
                            key={field}
                            type={field === "password" ? "password" : "text"}
                            name={field}
                            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                            value={userData[field]}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            
                        />
                    ))}
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">
                        Sign In
                    </button>
                    <p className="text-center text-gray-600">
                        Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignIn;