const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const blog = require('../../models/blog/blog');
const config = require('../../config/config')
const path = require('path');



const createBlog = async (req, res) => {
    try {
     
            const about = new blog(req.body)
            const newAbout = await about.save();
            res.status(201).json(newAbout);
   
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
        const Blog = await blog.findById(req.params.id);
        if (Blog) {
            const updatedBlog = await blog.findByIdAndUpdate(req.params.id, req.body, { new: true })
            res.status(200).json(updatedBlog)
            return
        }
        if (!Blog) {
            res.status(404).json({ message: 'Blog not found' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}



module.exports = { createBlog, getBlog, getblogid,updateBlog,deleteBlog }
