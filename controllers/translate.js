const { validationResult } = require('express-validator');
const Translate = require('../models/translate');
const path = require('path');

exports.getTranslates = async (req, res, next) => {
    try {
        const translateList = await Translate.find()
        res.status(200).json({ message: 'Fetched Translates successfully!', translates: translateList });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.createTranslate = async (req, res, next) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const error = new Error('Validation Faild!, Your Entered Data is Invalid!');
            error.statusCode = 422;
            throw error;
        }


        const title = req.body.title;
        const author = req.body.author;

        const translate = new Translate({
            title: title,
            author: author,
        });
        const translateResult = await translate.save();

        res.status(201).json({
            message: 'Translate Created Successfully',
            translate: translateResult,
        });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

}

exports.getTranslate = async (req, res, next) => {
    try {
        

        const translateId = req.params.translateId;
        const translate = await Translate.findById(translateId);

        if (!translate) {
            const error = new Error('Could Not Find Translate!');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: 'Translate is Found!',
            translate: translate,
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}