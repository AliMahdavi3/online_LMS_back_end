const { validationResult } = require('express-validator')
const User = require('../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

exports.signup = async (req, res, next) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(422).json({
                message: 'Validation Faild, Your entred data is invalid!',
                errors: errors.array()
            });
        }

        const email = req.body.email;
        const name = req.body.name;
        const password = req.body.password;
        const hashPassword = await bcrypt.hash(password, 12);

        const user = new User({
            email: email,
            password: hashPassword,
            name: name,
        });

        const result = user.save();

        return res.status(201).json({
            message: 'User Saved Successfully!',
            userId: result._id,
        })

    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}


exports.login = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ email: email });

        if (!user) {
            const error = new Error('User with this email not Found!');
            error.statusCode = 401;
            throw error;
        }

        isEqual = await bcrypt.compare(password, user.password);

        if (!isEqual) {
            const error = new Error('Wrong Password!');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({
            email: user.email,
            userId: user._id.toString()
        }, 'alimahdavi', {
            expiresIn: '365d'
        });

        res.status(200).json({
            message: 'Login Was successfully!',
            token: token,
            userId: user._id.toString(),
        })
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message || 'Internal Server Error!'
        });
    }
} 


exports.getUser = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(201).json({
            message: 'User Find Successfully!',
            users: users,
        });
    } catch (error) {
        res.status(500).json('Unable to find User!');
    }
}
