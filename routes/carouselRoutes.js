const carouselController = require('../controller/homecontroller/carouselController');

const express = require('express');
const multer = require('multer');

const router = express.Router();
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth');

const upload = multer({ storage: multer.memoryStorage() }).single('file');

router.post('/addimage',upload, carouselController.imageUpload);

router.get('/getimage', carouselController.getImages);

router.delete('/deleteimage/:id',isAuthenticated,authorizeRoles('admin'), carouselController.deleteImage);

module.exports = router;