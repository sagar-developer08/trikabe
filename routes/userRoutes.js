const express = require('express');

const router = express.Router();

const userController = require('../controller/userController');
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth');


router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

// router.put('/update', userController.);

router.get('/me', userController.viewDetails);

router.get('/all', userController.viewAllDetails);

// router.get('/all', userController.viewAllDetails);


module.exports = router;
