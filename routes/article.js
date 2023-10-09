const express = require('express');
const router = express.Router();
const articleController = require('../controllers/article');

// Courses Card
router.post('/article', articleController.createArticle);
router.get('/articles', articleController.getArticles);
router.get('/article/:articleId', articleController.getArticle);


module.exports = router;