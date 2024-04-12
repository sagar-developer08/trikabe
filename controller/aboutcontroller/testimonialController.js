const AWS = require('aws-sdk');
const Testimonial = require('../../models/About/testimonial');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../../config/config')
const express = require('express');
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require('../../middleware/Auth');




// Import the necessary models and middleware

// Create a testimonial
router.post('/uploadtestimonal', async(req, res) => {
    const testimonial = new Testimonial(req.body);

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

// Delete a testimonial
router.delete('/delete/testimonal/:id',isAuthenticated,authorizeRoles('admin'), async (req, res) => {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.json({ message: 'Testimonial deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.put('/update/testimonal/:id', async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        if (req.file) {
            testimonial.image = req.file.location;
        }
        testimonial.name = req.body.name;
        testimonial.message = req.body.message;
        testimonial.rating = req.body.rating;
        const updatedTestimonial = await testimonial.save();
        res.json(updatedTestimonial);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;