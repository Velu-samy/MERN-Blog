const Post = require("../models/Post");
const Contact = require("../models/Contact");
const multer = require("multer");

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Ensure images are stored in the correct folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Unique file names
    }
});

exports.getsinglepost = async (req, res) => {
    try {


        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid post ID format" });
        }

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found!" });
        }

        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.Createdetails = async(req,res) =>{
    try {
        const {username,query,email} = req.body;
        const newconatct = new Contact({
            username,
            email,
            query
        });
     await newconatct.save();
     res.json(newconatct);

    } catch (error) {
     res.status(404).json({message:error.message});
    }
};

const upload = multer({ storage });
exports.createPost = async (req, res) => {
    try {

        const { title, desc, category } = req.body;
        const img = req.file && req.file.path ? req.file.path : "uploads/default.jpg";

        const newPost = new Post({
            title,
            desc,
            category,
            img,
            userId: req.user.userId,
            username: req.user.username
        });

        await newPost.save();
      
        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error Creating Post:", error);
        res.status(400).json({ message: error.message });
    }
};


exports.getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.user.userId });
        res.json(posts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const mongoose = require("mongoose");

exports.deletePost = async (req, res) => {
    try {
        const postId = new mongoose.Types.ObjectId(req.params.id);
        await Post.findByIdAndDelete(postId);
        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getpost =  async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updatePost = async (req, res) => {
    try {
      
        // Validate ObjectId format *before* using it in queries
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            console.error("Invalid post ID format:", req.params.id);
            return res.status(400).json({ message: "Invalid post ID format" });
        }

        // Ensure the request body contains valid data
        if (!req.body || Object.keys(req.body).length === 0) {
            console.error("Empty update payload received.");
            return res.status(400).json({ message: "Update data is missing!" });
        }

        console.log("Finding and updating post...");

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: req.body }, // Ensures fields are explicitly set
            { new: true, runValidators: true } // Returns updated post and enforces validation
        );

        if (!updatedPost) {
            console.error("Post not found for update:", req.params.id);
            return res.status(404).json({ message: "Post not found!" });
        }

        res.json(updatedPost);
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(400).json({ message: error.message });
    }
};