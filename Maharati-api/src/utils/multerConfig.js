const multer = require("multer");
const path = require("path");

// Configure multer storage (store files on disk instead of memory)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save videos to the 'uploads' folder (ensure this folder exists)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename with timestamp
  },
});

// Set limits for file uploads (e.g., 100MB max size)
const upload = multer({
  storage,
limits: {
    fileSize: 500 * 1024 * 1024, // 500 MB file size limit
    fieldSize: 5000 * 1024 * 1024, // 50 MB limit for non-file form fields
    fields: 100000000, // Max number of fields
    files: 10000000, // Max number of files
  },});

module.exports = upload;
