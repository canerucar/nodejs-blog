const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController')

router.get('/',blogController.blog_index)
//Yazı detay
router.get('//:id',blogController.blog_content)

module.exports = router