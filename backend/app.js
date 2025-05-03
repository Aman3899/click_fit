const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../frontend')));

const uploadDir = path.join(__dirname, 'upload_images');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log(`Created directory: ${uploadDir}`);
} else {
    console.log(`Upload directory exists: ${uploadDir}`);
}


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload only images.'), false); // Reject file
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }
}).single('fitnessImage');


app.post('/upload', (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.error("Multer Error:", err.message);
            return res.status(400).json({ message: `Multer error: ${err.message}` });
        } else if (err) {
            console.error("Upload Error:", err.message);
            return res.status(400).json({ message: err.message || 'An unknown error occurred during upload.' });
        }

        if (!req.file) {
            console.log("No file received or file rejected by filter.");
            return res.status(400).json({ message: 'No file selected or file type not allowed.' });
        }

        console.log("File uploaded successfully:", req.file.filename);
        res.status(200).json({
            message: 'File uploaded successfully!',
            filename: req.file.filename
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Frontend available at http://localhost:${PORT}/index.html (or just http://localhost:${PORT})`);
});