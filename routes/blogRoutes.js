const express = require('express');
const router = express.Router();

const blogController = require('../controller/blog/blogController');

router.post('/createblog',blogController.createBlog);

router.get('/blog', blogController.getBlog);

router.get('/blog/:id', blogController.getblogid);
module.exports = router;