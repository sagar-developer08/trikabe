const express = require('express');
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth');

const aboutController = require('../controller/aboutcontroller/aboutController');

router.post('/createabout',isAuthenticated,authorizeRoles('admin'),aboutController.createAbout);

router.get('/about', aboutController.getAbout);

module.exports = router;