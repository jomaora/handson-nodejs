'use strict'

var mongoose = require('mongoose');

var songSchema = mongoose.Schema({
    title: {type: String, required: true},
    album: {type: String, required: true},
    artist: {type: String, required: true},
    year: Number
});

songSchema.index(
    {
        title: 1,
        artist: 1
    }
);

module.exports = mongoose.model('song', songSchema);