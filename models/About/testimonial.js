const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    image:{
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;