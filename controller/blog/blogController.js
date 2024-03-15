const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const blog = require('../../models/blog/blog');
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


const createBlog =  (req, res) => {
    try {
        upload.single('file')(req, res, async function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const about = new blog({
                image: req.file.location,
                heading: req.body.heading,
                description: req.body.description,
                date: req.body.date,
                tagline: req.body.tagline
            });
            const newAbout = await about.save();
            res.status(201).json(newAbout);
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getBlog = async (req, res) => {  
    try {
            const getblog = await blog.find();
            if(getblog){
                res.status(200).json(getblog)
            return
            }
            if(!getblog){
                res.status(404).json({message: 'No Blog Found'})
            }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {  createBlog, getBlog }