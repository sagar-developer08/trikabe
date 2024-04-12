const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Document = require('../../models/home/carousel');
const config = require('../../config/config');

// Configure AWS SDK
AWS.config.update({
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
    region: 'ap-south-1'
});

// Create an instance of the S3 service
const s3 = new AWS.S3();

// Function to generate a pre-signed URL for S3 upload
const getSignedUrl = (fileName) => {
    const params = {
        Bucket: 'trika-prod',
        Key: fileName,
        ACL: 'public-read',
    };
    return s3.getSignedUrl('putObject', params);
};


// Logic to handle file upload
const imageUpload = async (req, res) => {
    console.log(req.file)
    try {
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }

        // Generate pre-signed URL dynamically
    console.log(getSignedUrl)

        const preSignedUrl = getSignedUrl(req.file.originalname);

        console.log(preSignedUrl)
        // Upload file to S3 using the pre-signed URL
        const uploadParams = {
            Bucket: 'trika-prod',
            Key: req.file.originalname,
            ACL: 'public-read',
            ContentType: req.file.mimetype,
            Body: req.file.buffer 
        };
        const uploadResult = await s3.upload(uploadParams).promise();

        // Save the file URL in the database
        const document = new Document({
            name: req.body.name,
            carouselImages: uploadResult.Location,
            isActive: req.body.isActive
        });
        const savedDocument = await document.save();

        // Send success response to the client
        res.status(200).json({ message: 'File uploaded and document saved successfully', document: savedDocument });
    } catch (err) {
        console.error(err);
        // Handle any unexpected errors
        res.status(500).send('Internal Server Error');
    }
}

// module.exports = imageUpload;


// const imageUpload = async (req, res) => {
//     console.log(req)
//     try {
//         if (!req.file) {
//             console.error('No file uploaded');
//             return res.status(400).send('No file uploaded');
//         }
        
//         const { name, isActive } = req.body;
//         const preSignedUrl = getSignedUrl(req.file.originalname);

//         // Logic to save file information in the database

//         const document = new Document({
//             name,
//             carouselImages: preSignedUrl, // Store pre-signed URL instead of location
//             isActive,
//         });
//         const savedDocument = await document.save();

//         res.status(200).json({ message: 'Pre-signed URL generated and document saved successfully', document: savedDocument });
//     } catch (err) {
//         console.log(err);
//         res.status(500).send('Failed to upload document');
//     }
// };
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
    // upload,
    getImages,
    imageUpload,
    deleteImage
}