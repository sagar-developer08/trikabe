const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const service = require('../../models/services/Services');
const config = require('../../config/config')
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

const CreateServices =  (req, res) => {
    try {
        upload.single('file')(req, res, async function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const Services = new service({
                image: req.file.location,
                heading: req.body.heading,
                service_name: req.body.service_name,
                content: req.body.content,
                benfits_heading: req.body.benfits_heading,
                benfits_content: req.body.benfits_content,

                
            });
            const newservice = await Services.save();
            res.status(201).json(newservice);
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getServices = async (req, res) => {
    try {
        const getServices = await service.find();
        if(!getServices){
            res.status(404).json({message: 'No Services Found'})
            return
        }
        if(getServices)
        {
            res.status(200).json(getServices)
            return
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = { CreateServices, getServices }