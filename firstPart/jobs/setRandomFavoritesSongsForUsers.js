'use strict'

var mongoose = require('mongoose');
var Promise = require('bluebird');
var _ = require('lodash');

var database = require('../mongoose/configDB');
var Songs = Promise.promisifyAll(require('../mongoose/songs'));
var Users = Promise.promisifyAll(require('../mongoose/users'));

// We'll clean current favorite list on each user
// Then we'll get all the songs and all the users, and for each user, we'll
// pick a random number of favorites songs, and then we'll make that choice

Users.updateAsync({}, {favorites: []}, { multi: true })
	.then(function() {
		var promises = [];
		return Promise.join(Users.findAsync(), Songs.findAsync(), function(users, songs) {
			_.forEach(users, function(user) {
				var numberOfFavorites = _.random(0, 5);
				var newFavorites = [];
				while (numberOfFavorites != 0) {
					var songIndex = _.random(0, songs.length - 1);
					if (!_.find(user.favorites, {_id: songs[songIndex]._id})) {
						newFavorites.push({
							_id: songs[songIndex]._id, 
							title: songs[songIndex].title
						});
						numberOfFavorites--;
					}
				}
				promises.push(Users.updateAsync({_id: user._id}, {favorites: newFavorites}));
			});
			return promises;
		});
	})
	.then(function(promises){
		Promise.all(promises)
			.then(function() {
				console.log("processus fini");
				var db = mongoose.connections[0].db;
				db.close();		
			})
		;
	})
	.catch(function(err) {
		console.error(err);
	})
;
