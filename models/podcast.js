const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const podcastSchema = new Schema({
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


module.exports = mongoose.model('Podcast', podcastSchema);

