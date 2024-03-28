const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const blog = require('../../models/blog/blog');
const config = require('../../config/config')
const path = require('path');

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
            const extension = path.extname(file.originalname);
            // cb(null, Date.now().toString()) // Use a unique key for each uploaded file
            cb(null, `${Date.now().toString()}${extension}`); // Include the file extension // Prefix the key with the folder name
        }
    })
});


const createBlog = (req, res) => {
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
                tagline: req.body.tagline,
                isActive: req.body.isActive
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
        if (getblog) {
            res.status(200).json(getblog)
            return
        }
        if (!getblog) {
            res.status(404).json({ message: 'No Blog Found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getblogid = async (req, res) => {
    try {
        const getblog = await blog.findById(req.params.id);
        if (getblog) {
            res.status(200).json(getblog)
            return
        }
        if (!getblog) {
            res.status(404).json({ message: 'No Blog Found' })
            return
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const deleteBlog = async (req, res) => {
    try {
        const blog = await blog.findById(req.params.id);
        if (blog) {
            await Blog.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Blog has been deleted' })
            return
        }
        if (!blog) {
            res.status(404).json({ message: 'Blog not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateBlog = async (req, res) => {
    try {
        const blog = await blog.findById(req.params.id);
        if (blog) {
            const updatedBlog = await blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.status(200).json(updatedBlog)
            return
        }
        if (!blog) {
            res.status(404).json({ message: 'Blog not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



module.exports = { createBlog, getBlog, getblogid }
