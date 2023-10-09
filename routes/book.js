const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');


// Books Card
router.post('/book', bookController.createBook);
router.get('/books', bookController.getBooks);
router.get('/book/:bookId', bookController.getBook);


module.exports = router;