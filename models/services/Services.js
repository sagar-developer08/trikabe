const mongoose = require('mongoose')

const blog = new mongoose.Schema({

    service_name:{
        type: String,
        required: true
    },
    heading:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    benfits:{
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    // asked_question[],  
})
module.exports = mongoose.model('Blog', blog)