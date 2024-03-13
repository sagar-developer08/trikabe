const AWS = require('aws-sdk');
const Banner = require('../../models/About/banner');
const multer = require('multer');
const multerS3 = require('multer-s3');
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

const uploadBanner = (req, res) => {
    upload.single('file')(req, res, async function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        console.log(req.body)
        const banner = new Banner({
            imageUrl: req.file.location
        });

        try {
            await banner.save();
            res.status(200).json({ message: 'Banner uploaded successfully', banner });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
};


const getBanner = async (req, res) => {
    try {
        const banner = await Banner.find();
        if (!banner) {
            return res.status(404).json({ message: 'Banner not found' });
        }
        res.status(200).json({ banner });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const updateBanner = async (req, res) => {
    upload.single('image')(req, res, async function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        try {
            let banner = await Banner.findById(req.params.id);
            if (!banner) {
                return res.status(404).json({ message: 'Banner not found' });
            }

            banner.imageUrl = req.file.location;
            await banner.save();

            res.status(200).json({ message: 'Banner updated successfully', banner });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}

const deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ message: 'Banner not found' });
        }

        await banner.remove();
        res.status(200).json({ message: 'Banner deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    uploadBanner,getBanner,deleteBanner,updateBanner
};