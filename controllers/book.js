const { validationResult } = require('express-validator');
const Book = require('../models/book');
const path = require('path');

exports.getBooks = async (req, res, next) => {
    try {
        const bookList = await Book.find()
        res.status(200).json({ message: 'Fetched Books successfully!', books: bookList });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.createBook = async (req, res, next) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const error = new Error('Validation Faild!, Your Entered Data is Invalid!');
            error.statusCode = 422;
            throw error;
        }

        if (!req.file) {
            const error = new Error('please upload a file');
            error.statusCode = 422;
            throw error;
        }

        const title = req.body.title;
        const teacher = req.body.teacher;
        const price = req.body.price;

        const book = new Book({
            title: title,
            teacher: teacher,
            imageUrl: req.file.path.replace(/\\/g, "/"),
            price: price,
        });
        const bookResult = await book.save();

        res.status(201).json({
            message: 'Book Created Successfully',
            book: bookResult,
        });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

}

exports.getBook = async (req, res, next) => {
    try {

        const bookId = req.params.bookId;
        const book = await Book.findById(bookId);

        if (!book) {
            const error = new Error('Could Not Find Book!');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: 'Book is Found!',
            book: book,
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}