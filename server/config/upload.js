// config/upload.js
import multer from 'multer';
import path from 'path';

// Set up storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Append timestamp to the original file name
  },
});

// Initialize upload
const upload = multer({ storage });

export default upload;
