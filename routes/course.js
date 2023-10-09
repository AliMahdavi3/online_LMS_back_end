const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course');

// Courses Card
router.post('/course', courseController.createCourse);
router.get('/courses', courseController.getCourses);
router.get('/course/:courseId', courseController.getCourse);


module.exports = router;