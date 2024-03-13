const AWS = require('aws-sdk');
const Testimonial = require('../../models/About/testimonial');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../../config/config')
const express = require('express');
const router = express.Router();
// Configure AWS SDK
AWS.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region: 'ap-south-1'
});

// Create an instance of the S3 service
const s3 = new AWS.S3();

// Configure multer to handle file uploads
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'easytender',
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, Date.now().toString()) // Use a unique key for each uploaded file
        }
    })
});






// Import the necessary models and middleware

// Create a testimonial
router.post('/uploadtestimonal', upload.single('file'), async (req, res) => {
    const testimonial = new Testimonial({
        image: req.file.location,
        name: req.body.name,
        message: req.body.message,
        rating: req.body.rating,
    });

    try {
        const savedTestimonial = await testimonial.save();
        res.status(201).json(savedTestimonial);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all testimonials
router.get('/get/testimonal', async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;