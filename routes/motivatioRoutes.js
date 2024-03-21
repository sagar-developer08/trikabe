motivationController = require('../controller/homecontroller/motivationController'); 

const express = require('express');

const router = express.Router();
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth');


router.post('/create/motivation',isAuthenticated,authorizeRoles('admin'), motivationController.createMotivation);

router.get('/get/motivations',motivationController.getMotivations);

 

module.exports = router;
