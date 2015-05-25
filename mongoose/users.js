'use strict'

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    login: String,
    name: String,
    favorites: [{
    	_id:  {type: mongoose.Schema.Types.ObjectId},
    	title: String
    }]
});

module.exports = mongoose.model('user', userSchema);