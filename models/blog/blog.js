const mongoose = require('mongoose')

const blog = new mongoose.Schema({

        heading:{
            type: String,
            // required: true
        },
        image: {
            type: String,
            // required: true
        
        },
        description:{
            type: String,
            // required: true
        },
        date:{
            type: String,
            // required: true
        },
        tagline:{
            type: String,
            // required: true
        },
})

module.exports = mongoose.model('Blog', blog)
