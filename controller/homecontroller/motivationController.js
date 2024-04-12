const Motivation = require('../../models/home/motivation');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
// Create
const config = require('../../config/config')
// Configure AWS SDK

// Configure multer to handle file uploads


const createMotivation = async (req, res) => {
    try {
       
            const document = new Motivation({
                Attribbute:req.body.Attribbute,
                Image: req.body.Image,
                Heading:req.body.Heading,
                content:req.body.content,
                bullet_one:req.body.bullet_one,
                bullet_three:req.body.bullet_three,
                bullet_two:req.body.bullet_two,
                isActive:req.body.isActive
            });
            console.log(document)
            const savedDocument = await document.save();
            res.status(200).json({ message: 'File uploaded and document saved successfully', document: savedDocument });
        
    } catch (err) {
        console.log(err);
    }
};

// Read
const getMotivations = async (req, res) => {
    try {
        const motivations = await Motivation.find({});
        res.send(motivations);
    } catch (err) {
        res.status(500).send(err);
    }
};

const getMotivation = async (req, res) => {
    try {
        const motivation = await Motivation.findById(req.params.id);
        if (!motivation) {
            return res.status(404).send();
        }
        res.send(motivation);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Update
const updateMotivation = async (req, res) => {
    try {
        const motivation = await Motivation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!motivation) {
            return res.status(404).send();
        }
        res.send(motivation);
    } catch (err) {
        res.status(400).send(err);
    }
};

// Delete
const deleteMotivation = async (req, res) => {
    try {
        const motivation = await Motivation.findByIdAndDelete(req.params.id);
        if (!motivation) {
            return res.status(404).send();
        }
        res.send(motivation);
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports={
    createMotivation,
    getMotivations,
    updateMotivation,
    deleteMotivation
}