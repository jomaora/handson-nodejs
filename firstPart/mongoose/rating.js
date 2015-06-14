'use strict'

var mongoose = require('mongoose');

var ratingSchema = mongoose.Schema({
    song_id:  {type: mongoose.Schema.Types.ObjectId},
    title: String,
    user_login: String,
    stars: {type: Number, max: 5, min: 0, required: true}
});

module.exports = mongoose.model('rating', ratingSchema);