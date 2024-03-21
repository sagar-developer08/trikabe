const express = require('express');
const router = express.Router();
const serviceController = require('../controller/homecontroller/serviceController');
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth');
// Create
router.post('/post/services',isAuthenticated,authorizeRoles('admin'), serviceController.createService);

// Read
router.get('/get/services', serviceController.getServices);
router.get('/services/:id', serviceController.getService);

// Update
router.put('/services/:id',isAuthenticated,authorizeRoles('admin'), serviceController.updateService);

// Delete
router.delete('/services/:id',isAuthenticated,authorizeRoles('admin'), serviceController.deleteService);

module.exports = router;