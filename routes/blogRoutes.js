const express = require('express');
const router = express.Router();

const blogController = require('../controller/blog/blogController');

router.post('/createblog',blogController.createBlog);

router.get('/blog', blogController.getBlog);

module.exports = router;