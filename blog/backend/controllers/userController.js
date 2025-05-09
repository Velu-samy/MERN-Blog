const User = require("../models/Users");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {

        
        const { username, password } = req.body;
        const user = await User.findOne({ username });


        if (!user || user.password !== password) {
            console.log("Invalid credentials.");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, username: user.username, userId: user._id });

    } catch (error) {
        console.error("Error during login:", error);
        res.status(400).json({ message: error.message });
    }
};