const express = require('express');
const router = express.Router();

const aboutController = require('../controller/aboutcontroller/aboutController');

router.post('/upload/about',aboutController.createAbout);

router.get('/about', aboutController.getAbout);

module.exports = router;