'use strict'

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    login: String,
    name: String,
    favorites: [String]
});

module.exports = mongoose.model('user', userSchema);