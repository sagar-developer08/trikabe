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
const getSignedUrl = (fileName) => {
    const params = {
        Bucket: 'trika-prod',
        Key: fileName,
        ACL: 'public-read',
    };
    return s3.getSignedUrl('putObject', params);
};


// const createBlog = (req, res) => {
//     try {
//         upload.single('file')(req, res, async function (err) {
//             if (err) {
//                 return res.status(500).json({ error: err.message });
//             }
//             const about = new blog({
//                 image: req.file.location,
//                 heading: req.body.heading,
//                 description: req.body.description,
//                 date: req.body.date,
//                 tagline: req.body.tagline,
//                 isActive: req.body.isActive
//             });
//             const newAbout = await about.save();
//             res.status(201).json(newAbout);
//         });
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// }

const createBlog = async (req, res) => {
    try {
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Generate pre-signed URL dynamically
        const preSignedUrl = getSignedUrl(req.file.originalname);

        // Upload file to S3 using the pre-signed URL
        const uploadParams = {
            Bucket: 'your-bucket-name',
            Key: req.file.originalname,
            ACL: 'public-read',
            ContentType: req.file.mimetype,
            Body: req.file.buffer 
        };
        const uploadResult = await s3.upload(uploadParams).promise();

        // Create a new blog post with the uploaded image URL
        const newBlog = new blog({
            image: uploadResult.Location,
            heading: req.body.heading,
            description: req.body.description,
            date: req.body.date,
            tagline: req.body.tagline,
            isActive: req.body.isActive
        });

        // Save the new blog post to the database
        const savedBlog = await newBlog.save();

        // Send success response to the client
        res.status(201).json(savedBlog);
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
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
        const Blog = await blog.findById(req.params.id);
        if (Blog) {
            await blog.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Blog has been deleted' })
            return
        }
        if (!Blog) {
            res.status(404).json({ message: 'Blog not found' })
        }
    } catch (error) {
        console.log(error)
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



module.exports = { createBlog, getBlog, getblogid,updateBlog,deleteBlog }
