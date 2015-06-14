var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var Songs = Promise.promisifyAll(require('../database/songs'));

router.get('/', function(req, res) {
	var query = {};
	if (req.query) {
		query = req.query;
	}

	Songs.findAsync(query)
		.then(function(songs) {
			res.send(songs);			
		})
	;  
});

router.get('/artist/:artistName', function(req, res) {
	var query = {artist: req.params.artistName};
	Songs.findAsync(query)
		.then(function(songs) {
			res.send(songs);			
		})
	;  
});

module.exports = router;
