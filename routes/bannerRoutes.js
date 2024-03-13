const express = require('express');
const router = express.Router();
const bannerController = require('../controller/aboutcontroller/bannerController');

router.post('/uploadBanner', bannerController.uploadBanner);

router.get('/banner',bannerController.getBanner);

// router.put('/banner/:id', bannerController.updateBanner);
// router.delete('/banner/:id', bannerController.deleteBanner);


module.exports = router;