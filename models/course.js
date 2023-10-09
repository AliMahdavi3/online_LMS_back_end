const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    teacher: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: false,
    },
    price: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});


module.exports = mongoose.model('Course', courseSchema);

