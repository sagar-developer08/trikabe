const express = require('express');
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth');

const aboutController = require('../controller/aboutcontroller/aboutController');

router.post('/createabout',isAuthenticated,authorizeRoles('admin'),aboutController.createAbout);

router.get('/about', aboutController.getAbout);

router.put('/about/:id',isAuthenticated,authorizeRoles('admin'), aboutController.updateAbout);

router.delete('/about/:id',isAuthenticated,authorizeRoles('admin'), aboutController.deleteAbout);
module.exports = router;