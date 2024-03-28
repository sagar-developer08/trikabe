const contactController = require('../controller/contact/contactController');

const express = require('express');

const router = express.Router();
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth');


router.post('/addcontact', contactController.createContact);

router.get('/getcontact', contactController.getAllContacts);

router.delete('/deletecontact',isAuthenticated,authorizeRoles('admin'),  contactController.deleteContactById);

module.exports = router;