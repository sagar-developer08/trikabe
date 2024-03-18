const express = require('express');
const router = express.Router();
const serviceController = require('../controller/services/servicesController');
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth');

// Create
router.post('/post/work',serviceController.CreateServices);


router.get('/get/work', serviceController.getServices);

module.exports = router;
