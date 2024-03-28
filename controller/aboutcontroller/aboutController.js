const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const About = require('../../models/About/about');
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


const createAbout =  (req, res) => {
try {
    upload.single('file')(req, res, async function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        const about = new About({
            image: req.file.location,
            heading: req.body.heading,
            description: req.body.description
        });
        const newAbout = await about.save();
        res.status(201).json(newAbout);
    });
 }catch (error) {
    res.status(400).json({ message: error.message });
 }
    
    
       
};

const getAbout = async (req, res) => {
    try {
        const about = await About.find();
        res.json(about);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteAbout = async (req, res) => {
    try {
        const about = await About.findByIdAndDelete(req.params.id);
        if (!about) {
            return res.status(404).json({ message: 'About not found' });
        }
        res.json({ message: 'About deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateAbout = async (req, res) => {
    upload.single('file')(req, res, async function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        try {
            let about = await About.findById(req.params.id);
            if (!about) {
                return res.status(404).json({ message: 'About not found' });
            }

            if (req.file) {
                about.image = req.file.location;
            }

            about.heading = req.body.heading;
            about.description = req.body.description;

            await about.save();

            res.json({ message: 'About updated successfully', about });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}



module.exports = {  createAbout, getAbout }