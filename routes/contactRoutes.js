const contactController = require('../controller/contact/contactController');

const express = require('express');

const router = express.Router();


router.post('/addcontact', contactController.createContact);

router.get('/getcontact', contactController.getAllContacts);

// router.delete('/deleteimage/:id', carouselController.deleteImage);

module.exports = router;