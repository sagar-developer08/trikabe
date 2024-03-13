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


exports.createAbout = upload.single('file'), async (req, res) => {
    const about = new About({
        image: req.file.location,
        heading: req.body.heading,
        description: req.body.description
    });

    try {
        const newAbout = await about.save();
        res.status(201).json(newAbout);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAbout = async (req, res) => {
    try {
        const about = await About.find();
        res.json(about);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}