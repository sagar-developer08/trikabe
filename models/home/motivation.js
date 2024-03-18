const mongoose = require('mongoose')

const motivationSchema = new mongoose.Schema({

        Attribbute:{
            type: String,
            // required: true
        },
        Image: {
            type: String,
            // required: true
        
        },
        Heading:{
            type: String,
            // required: true
        },
        content:{
            type: String,
            // required: true
        },
        bullet_one:{
            type: String,
        },
        bullet_two:{
            type: String,
        },
        bullet_three:{
            type: String,
        },
        isActive:{
            type: Boolean,
            default: true
        }
})

module.exports = mongoose.model('Motivation', motivationSchema)
