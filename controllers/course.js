const { validationResult } = require('express-validator');
const Course = require('../models/course');
const path = require('path');

exports.getCourses = async (req, res, next) => {
    try {
        const courseList = await Course.find()
        res.status(200).json({ message: 'Fetched course successfully!', courses: courseList });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.createCourse = async (req, res, next) => {

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

        const course = new Course({
            title: title,
            teacher: teacher,
            imageUrl: req.file.path.replace(/\\/g, "/"),
            price: price,
        });
        const courseResult = await course.save();

        res.status(201).json({
            message: 'Course Created Successfully',
            course: courseResult,
        });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

}

exports.getCourse = async (req, res, next) => {
    try {

        const courseId = req.params.courseId;
        const course = await Course.findById(courseId);

        if (!course) {
            const error = new Error('Could Not Find Course!');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: 'Course is Found!',
            course: course,
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}