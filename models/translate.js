const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const translateSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});


module.exports = mongoose.model('Translate', translateSchema);

