const { validationResult } = require('express-validator');
const Teacher = require('../models/teacher');
const path = require('path');

exports.getTeachers = async (req, res, next) => {
    try {
        const teacherList = await Teacher.find()
        res.status(200).json({ message: 'Fetched Teacher successfully!', teachers: teacherList });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.createTeacher = async (req, res, next) => {

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

        const name = req.body.name;
        const course = req.body.course;
        const resume = req.body.resume;
        const email = req.body.email;
        const telegram = req.body.telegram;
        const instagram = req.body.instagram;

        const teacher = new Teacher({
            name: name,
            course: course,
            imageUrl: req.file.path.replace(/\\/g, "/"),
            resume: resume,
            email: email,
            telegram: telegram,
            instagram: instagram,
        });
        const teacherResult = await teacher.save();

        res.status(201).json({
            message: 'Teacher Created Successfully',
            teacher: teacherResult,
        });

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }

}

exports.getTeacher = async (req, res, next) => {
    try {

        const teacherId = req.params.teacherId;
        const teacher = await Teacher.findById(teacherId);

        if (!teacher) {
            const error = new Error('Could Not Find Teacher!');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            message: 'Teacher is Found!',
            teacher: teacher,
        })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}