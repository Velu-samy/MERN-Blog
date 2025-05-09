const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    desc: { type: String, required: true },
    category: { type: String, required: true },
    img: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
     // Add username field
});

module.exports = mongoose.model("Post", PostSchema);