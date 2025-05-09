const express = require("express");
const { createPost, getUserPosts, deletePost, updatePost, getpost, getsinglepost, Createdetails } = require("../controllers/postController");
const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/upload"); // Image upload middleware
const router = express.Router();

// Routes
router.post("/create", verifyToken, upload.single("img"), createPost);
router.put("/update/:id", verifyToken, upload.single("img"), updatePost);
router.delete("/delete/:id", verifyToken, deletePost);
router.get("/:id",getsinglepost);
router.get("/user/posts", verifyToken, getUserPosts);
router.get("/", getpost);
router.post("/query",Createdetails);




module.exports = router;