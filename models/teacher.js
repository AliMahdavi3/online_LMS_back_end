const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    course: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    resume: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    telegram: {
        type: String,
        required: false
    },
    instagram: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});


module.exports = mongoose.model('Teacher', teacherSchema);

