const carouselController = require('../controller/homecontroller/carouselController');

const express = require('express');

const router = express.Router();
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth');


router.post('/addimage',isAuthenticated,authorizeRoles('admin'), carouselController.imageUpload);

router.get('/getimage', carouselController.getImages);

router.delete('/deleteimage/:id',isAuthenticated,authorizeRoles('admin'), carouselController.deleteImage);

module.exports = router;