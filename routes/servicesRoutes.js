const express = require('express');
const router = express.Router();
const serviceController = require('../controller/services/servicesController');
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth');

// Create
router.post('/post/yoga/servic',isAuthenticated,authorizeRoles, serviceController.CreateServices);


router.get('/get/yoga/services', serviceController.getServices);

module.exports = router;
