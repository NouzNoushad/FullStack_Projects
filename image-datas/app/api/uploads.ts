// lib/uploads.ts
import multer from "multer";
import path from "path";

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads"); // Destination directory for file uploads
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename based on timestamp
    }
});

const upload = multer({ storage: storage });

// Export the middleware for handling a single image upload
export const uploadMiddleware = upload.single('image'); // 'image' is the field name in the form
