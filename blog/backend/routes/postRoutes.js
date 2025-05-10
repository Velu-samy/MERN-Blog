const express = require("express");
const { 
    createPost, 
    getUserPosts, 
    deletePost, 
    updatePost, 
    getpost, 
    getsinglepost, 
    Createdetails 
} = require("../controllers/postController");

const verifyToken = require("../middleware/authMiddleware");
const multer = require("multer"); // Multer for handling image uploads
const router = express.Router();

// 🔹 Configure Multer to store files in memory (no local storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// API Routes
router.post("/create", verifyToken, upload.single("image"), createPost);  // ✅ Image upload optimized
router.put("/update/:id", verifyToken, upload.single("image"), updatePost);
router.delete("/delete/:id", verifyToken, deletePost);
router.get("/:id", getsinglepost);
router.get("/user/posts", verifyToken, getUserPosts);
router.get("/", getpost);
router.post("/query", Createdetails);

module.exports = router;