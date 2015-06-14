'use strict'

var mongoose = require('mongoose');
var Promise = require('bluebird');
var _ = require('lodash');

var database = require('../mongoose/configDB');
var Songs = Promise.promisifyAll(require('../mongoose/songs'));
var Users = Promise.promisifyAll(require('../mongoose/users'));

Songs.findAsync({year: {$lt: 2000}})
	.then(function(songs) {
		return _.map(songs, 'title');
	})
	.then(function(titles) {
		return Users.findAsync({'favorites.title': {$in: titles}});
	})
	.then(function(users) {
		_.forEach(users, function(user) {
			var favorites = _.map(user.favorites, 'title');
			console.log(user.login, favorites);
		});
	})
;
