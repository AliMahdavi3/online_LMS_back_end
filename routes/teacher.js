const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacher');

// Courses Card
router.post('/teacher', teacherController.createTeacher);
router.get('/teachers', teacherController.getTeachers);
router.get('/teacher/:teacherId', teacherController.getTeacher);


module.exports = router;