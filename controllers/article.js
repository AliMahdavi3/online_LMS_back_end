const { validationResult } = require('express-validator');
const Article = require('../models/article');
const path = require('path');

exports.getArticles = async (req, res, next) => {
    try {
        const articleList = await Article.find()
        res.status(200).json({ message: 'Fetched Article successfully!', articles: articleList });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

// hello

exports.createArticle = async (req, res, next) => {

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
        const author = req.body.author;

        const article = new Article({
            title: title,
            author: author,
            imageUrl: req.file.path.replace(/\\/g, "/"),
        });
        const articleResult = await article.save();

        res.status(201).json({
            message: 'Article Created Successfully',
            article: articleResult,
        });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

}

exports.getArticle = async (req, res, next) => {
    try {

        const articleId = req.params.articleId;
        const article = await Article.findById(articleId);

        if (!article) {
            const error = new Error('Could Not Find Article!');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: 'Article is Found!',
            article: article,
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}