'use strict'

var mongoose = require('mongoose');
var database = require('./configDB');
var Songs = require('./songs');

Songs.find({}, function(err, songs){
	console.log(songs);
	console.log(songs.length + ' songs found');

	var db = mongoose.connections[0].db;
	db.close();
});
