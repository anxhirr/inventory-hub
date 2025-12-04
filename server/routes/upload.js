const express = require('express');
const router = express.Router();
const upload = require('../config/upload');
const path = require('path');

// Upload image for component
router.post('/component-image', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Return the file path relative to the uploads directory
    const filePath = `/uploads/${req.file.filename}`;
    res.json({ 
      message: 'Image uploaded successfully',
      imagePath: filePath,
      filename: req.file.filename
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

