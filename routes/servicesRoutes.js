const express = require('express');
const router = express.Router();
const serviceController = require('../controller/services/servicesController');
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth');
const { route } = require('./motivatioRoutes');

// Create
router.post('/post/work',isAuthenticated,authorizeRoles('admin'),serviceController.CreateServices);


router.get('/get/work', serviceController.getServices);

router.put('/update/work/:id',isAuthenticated,authorizeRoles('admin'), serviceController.updateService);

router.delete('/delete/work/:id',isAuthenticated,authorizeRoles('admin'), serviceController.deleteService);
module.exports = router;
