const mongoose = require('mongoose')

const servicesSchema = new mongoose.Schema({

    serviceName:{
        type: String,
        // required: true
    },
    serviceDescription: {
        type: String,
        // required: true
    
    },
    serviceImage: {
        type: String,
        // required: true
    },
    isActive:{
        type: Boolean,
        default: true
    }


})

module.exports = mongoose.model('services', servicesSchema)