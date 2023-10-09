const { validationResult } = require('express-validator');
const Podcast = require('../models/podcast');
const path = require('path');

exports.getPodcasts = async (req, res, next) => {
    try {
        const podcastList = await Podcast.find()
        res.status(200).json({ message: 'Fetched podcast successfully!', podcasts: podcastList });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.createPodcast = async (req, res, next) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const error = new Error('Validation Faild!, Your Entered Data is Invalid!');
            error.statusCode = 422;
            throw error;
        }

        // if (!req.file) {
        //     const error = new Error('please upload a file');
        //     error.statusCode = 422;
        //     throw error;
        // }

        const title = req.body.title;
        const author = req.body.author;

        const podcast = new Podcast({
            title: title,
            author: author,
            // imageUrl: req.file.path.replace(/\\/g, "/"),
        });
        const podcastResult = await podcast.save();

        res.status(201).json({
            message: 'Podcast Created Successfully',
            podcast: podcastResult,
        });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

}

exports.getPodcast = async (req, res, next) => {
    try {

        const podcastId = req.params.podcastId;
        const podcast = await Podcast.findById(podcastId);

        if (!podcast) {
            const error = new Error('Could Not Find Podcast!');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: 'Podcast is Found!',
            podcast: podcast,
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}