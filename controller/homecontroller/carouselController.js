const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
// const mongoose = require('mongoose');
const Document = require('../../models/home/carousel');
const config = require('../../config/config')
const path = require('path');
// Import necessary libraries


// Configure AWS SDK
// AWS.config.update({
//     accessKeyId: config.accessKeyId,
//     secretAccessKey: config.secretAccessKey,
//     region: 'ap-south-1'
// });

// // Create an instance of the S3 service
// const s3 = new AWS.S3();

// Configure multer to handle file uploads
// const upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: 'trika-prod',
//         acl: 'public-read',
//         key: function (req, file, cb) {
//             const extension = path.extname(file.originalname);
//             // cb(null, Date.now().toString()) // Use a unique key for each uploaded file
//             cb(null, `${Date.now().toString()}${extension}`); // Include the file extension // Prefix the key with the folder name
//                 }
//         // key: function (req, file, cb) {
//         //     const extension = path.extname(file.originalname);
//         //     // cb(null, Date.now().toString()) // Use a unique key for each uploaded file
//         //     cb(null, `${Date.now().toString()}${extension}`); // Include the file extension // Prefix the key with the folder name
//         //     cb(null, Date.now().toString()) // Use a unique key for each uploaded file
//         // }
//     })
// });

// const presignued=xyz
//create a logic to upload a file to s3 bucket and save in db
const imageUpload = async (req, res) => {
    try {
        console.log(config.accessKeyId,config.secretAccessKey)
       
            const { name,carouselImages,isActive } = req.body;      
            // Check and convert image size
            const document = new Document({
                    name,
                    carouselImages,
                    isActive
            });
            const savedDocument = await document.save();
            res.status(200).json({ message: 'File uploaded and document saved successfully', document: savedDocument });
        ;
    } catch (err) {
        console.log(err);
    }
}
    


const getImages = async (req, res) => {
    try {
        const documents = await Document.find();
        res.status(200).json(documents);
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to retrieve documents');
    }
}

const deleteImage = async(req, res) => {
    try{
        const { id } = req.params;
        const document = await Document.findByIdAndDelete(id);
        res.status(200).json({ message: 'Document deleted successfully', document });
    }catch(err){
        console.log(err)
    }
}

module.exports ={
    getImages,
    imageUpload,
    deleteImage
}