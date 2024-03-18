const mongoose = require('mongoose')

const work = new mongoose.Schema({

    service_name:{
        type: String,
        // required: true
    },
    heading:{
        type: String,
        required: true
    },
    content:{
        type: String,
        // required: true
    },
    benfits_heading:{
        type: String,
        // required: true
    },
    benfits_content:{
        type: String,
        // required: true
    },
    image: {
        type: String,
        // required: true
    },
    // asked_question[],  
})
module.exports = mongoose.model('work', work)