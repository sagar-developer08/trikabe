// const Services = require('../../models/home/services');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Services = require('../../models/home/services');
const config = require('../../config/config');
// Create

// Create
exports.createService = async (req, res) => {
    
    try {
            const service = new Services(req.body);
            await service.save();
            res.status(200).json(service);
        
    } catch (err) {
        res.status(400).json(err);
    }
};

// Read
exports.getServices = async (req, res) => {
    try {
        const services = await Services.find({});
        res.send(services);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getService = async (req, res) => {
    try {
        const service = await Services.findById(req.params.id);
        if (!service) {
            return res.status(404).send();
        }
        res.send(service);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Update
exports.updateService = async (req, res) => {
    try {
        const service = await Services.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!service) {
            return res.status(404).send();
        }
        res.send(service);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Delete
exports.deleteService = async (req, res) => {
    try {
        const service = await Services.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(404).send();
        }
        res.send(service);
    } catch (err) {
        res.status(500).send(err);
    }
};