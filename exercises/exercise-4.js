'use strict'

var mongoose = require('mongoose');
var Promise = require('bluebird');
var _ = require('lodash');

var database = require('../mongoose/configDB');
var Songs = Promise.promisifyAll(require('../mongoose/songs'));
var Users = Promise.promisifyAll(require('../mongoose/users'));
var Ratings = Promise.promisifyAll(require('../mongoose/rating'));

// We'll clean current ratings, get all the songs and all the users, 
// then for each user, we'll pick a random number of songs to rate, and then we'll make that choice
// and we build an object rating to be saved
var promises = [];
Promise.join(Users.findAsync(), Songs.findAsync(), Ratings.removeAsync(), function(users, songs) {
		_.forEach(users, function(user) {
			var songsIndexes = [];
			var numberOfSongsToRate = _.random(0, 5);
			while (numberOfSongsToRate != 0) {
				var songIndex = _.random(0, songs.length - 1);
				while (_.find(songsIndexes, songIndex)) {
					songIndex = _.random(0, songs.length - 1);
				}
				songsIndexes.push(songIndex);

				var rating = {
					song_id: songs[songIndex]._id,
				    title: songs[songIndex].title,
	    			user_login: user.login,
	    			stars: _.random(0, 5)
				}
				numberOfSongsToRate--;
				promises.push(Ratings.createAsync(rating));
			}
		});
		return promises;
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
