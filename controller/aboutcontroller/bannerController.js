const AWS = require('aws-sdk');
const Banner = require('../../models/About/banner');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require('../../config/config')


const uploadBanner = async (req, res) => {
   
        
        const banner = new Banner(req.body);

        try {
            await banner.save();
            res.status(200).json({ message: 'Banner uploaded successfully', banner });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
   
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
        if (banner) {
            await Banner.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Blog has been deleted' })
            return
        }
        if (!banner) {
            res.status(404).json({ message: 'Blog not found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    uploadBanner,getBanner,deleteBanner,updateBanner
};