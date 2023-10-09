const express = require('express');
const authController = require('../controllers/auth');
const User = require('../models/user');
const { body } = require('express-validator');
const router = express.Router();


router.post('/signup', [
    body('email').isEmail(),
    body('password').trim().isLength({ min: 4 }),
    body('name').trim().isLength({ min: 5 }).notEmpty(),
], authController.signup);

router.get('/signup', authController.getUser);

router.post('/login', authController.login);

module.exports = router;