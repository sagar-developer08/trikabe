const express = require('express');
const router = express.Router();
const bannerController = require('../controller/aboutcontroller/bannerController');
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth');



router.post('/uploadBanner',isAuthenticated,authorizeRoles('admin'), bannerController.uploadBanner);

router.get('/banner',bannerController.getBanner);

// router.put('/banner/:id', bannerController.updateBanner);
router.delete('/banner/:id',isAuthenticated,authorizeRoles('admin'), bannerController.deleteBanner);


module.exports = router;