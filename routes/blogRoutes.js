const express = require('express');
const router = express.Router();

const blogController = require('../controller/blog/blogController');
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth');



router.post('/createblog',isAuthenticated,authorizeRoles('admin'),blogController.createBlog);

router.get('/blog', blogController.getBlog);

router.get('/blog/:id', blogController.getblogid);

router.put('/blog/:id',isAuthenticated,authorizeRoles('admin'), blogController.updateBlog);

router.delete('/blog/:id',isAuthenticated,authorizeRoles('admin'), blogController.deleteBlog);
module.exports = router;