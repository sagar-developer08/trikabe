const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const work = require('../../models/services/Services');
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
        bucket: 'trika-prod',
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
            const works = new work({
                image: req.file.location,
                heading: req.body.heading,
                service_name: req.body.service_name,
                content: req.body.content,
                benfits_heading: req.body.benfits_heading,
                benfits_content: req.body.benfits_content,

                
            });
            const newservice = await works.save();
            res.status(201).json(newservice);
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getServices = async (req, res) => {
    try {
        const getServices = await work.find();
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


const updateService = async (req, res) => {
    const id = req.params.id;
    try {
        const updateService = await work.findById(id);
        if (!updateService) {
            res.status(404).json({ message: 'Service not found' });
            return;
        }
        const updatedService = await work.findByIdAndUpdate(id, req.body, { new: true });
        if(!updatedService){
            res.status(404).json({ message: 'Service not updated' });
            return
        }
        res.status(200).json(updatedService);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteService = async (req, res) => {
    const id = req.params.id;
    try {
        const service = await work.findById(id);
        if (!service) {
            res.status(404).json({ message: 'Service not found' });
            return;
        }
        await work.findByIdAndDelete(id);
        res.status(200).json({ message: 'Service has been deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}







module.exports = { CreateServices, getServices }