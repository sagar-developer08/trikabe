const contactController = require('../controller/contact/contactController');

const express = require('express');

const router = express.Router();


router.post('/addimage', contactController.createContact);

router.get('/getimage', contactController.getAllContacts);

// router.delete('/deleteimage/:id', carouselController.deleteImage);

module.exports = router;