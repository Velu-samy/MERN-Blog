const multer = require("multer");

// 🔹 Configure Storage Engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // ✅ Store images in "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // ✅ Generate unique filename
    }
});

const upload = multer({ storage });
module.exports = upload;