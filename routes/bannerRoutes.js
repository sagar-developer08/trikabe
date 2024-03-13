const express = require('express');
const router = express.Router();
const bannerController = require('../controller/aboutcontroller/aboutController');

router.post('/uploadBanner', bannerController.createAbout);

router.get('/banner',bannerController.getAbout);

// router.put('/banner/:id', bannerController.updateBanner);
// router.delete('/banner/:id', bannerController.deleteBanner);


module.exports = router;