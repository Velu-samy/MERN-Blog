const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer"); // ✅ Ensure Multer is imported
const path = require("path");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

// Load environment variables
dotenv.config();
connectDB();

const app = express();

// ✅ Middleware for parsing request body
app.use(express.json()); // Parses JSON requests
app.use(express.urlencoded({ extended: true })); // Parses form data
app.use(cors({ origin: "https://mern-blog-f.onrender.com" }));


// ✅ Multer Configuration (Ensure correct field name)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// ✅ Serve static files for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ API Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// ✅ Apply Multer in post routes (Ensure field name matches frontend)


// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
