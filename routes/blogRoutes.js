const express = require('express');
const router = express.Router();

const blogController = require('../controller/blog/blogController');
const { isAuthenticated, authorizeRoles } = require('../middleware/Auth');

const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() }).single('file');

router.post('/createblog',upload,isAuthenticated,authorizeRoles('admin'),blogController.createBlog);

router.get('/blog', blogController.getBlog);

router.get('/blog/:id', blogController.getblogid);

router.put('/blog/:id',isAuthenticated,authorizeRoles('admin'), blogController.updateBlog);

router.delete('/blog/:id',isAuthenticated,authorizeRoles('admin'), blogController.deleteBlog);
module.exports = router;