const express = require('express');
const router = express.Router();
const serviceController = require('../controller/services/servicesController');

// Create
router.post('/post/yoga/servic', serviceController.CreateServices);


router.get('/get/yoga/services', serviceController.getServices);

module.exports = router;
