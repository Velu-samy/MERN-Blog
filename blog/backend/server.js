const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

// ✅ Load environment variables
dotenv.config();

// ✅ Connect to Database
connectDB();

const app = express();

// ✅ Middleware Configuration
app.use(express.json()); // Parses JSON requests
app.use(express.urlencoded({ extended: true })); // Parses form data



const allowedOrigins = [
    "https://mern-blog-f.onrender.com",
    "https://mern-blog-vz8i.onrender.com",
    "http://localhost:5173"
];

app.use(cors({
    origin: allowedOrigins, // ✅ Allows requests from multiple origins
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// ✅ Multer Setup for File Uploads
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

// ✅ Serve Static Files for Uploaded Images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// ✅ Global Error Handling
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err.message);
    res.status(500).json({ success: false, error: err.message });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));