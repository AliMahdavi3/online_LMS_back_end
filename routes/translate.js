const express = require('express');
const router = express.Router();
const translateController = require('../controllers/translate');

// Courses Card
router.post('/translate', translateController.createTranslate);
router.get('/translates', translateController.getTranslates);
router.get('/translate/:translateId', translateController.getTranslate);

module.exports = router;