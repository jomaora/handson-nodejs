var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var _ = require('lodash');
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

var verifyBody = function(req, res, next) {
	var errors = '';
	if (!req.body) {
		errors += 'Body should not be empty.'; 
	}
	if (!_.has(req.body, 'title')) {
		errors += ' Body should contain a title.'; 
	}
	if (!req.body.album) {
		errors += ' Body should contain an album.';	
	}
	var otherMandatoryData = ['artist', 'year'];
	console.log(_.omit(req.body, ['title', 'album']));
	console.log(_.keys(_.omit(req.body, ['title', 'album'])));
	var missingData = _.difference(otherMandatoryData, _.keys(_.omit(req.body, ['title', 'album'])));
	if (missingData.length !== 0) {
        errors += ' body should have ' + missingData;
    }

    if (errors) {
    	res.send(400, errors);
    };

    next();
}

router.post('/', verifyBody, function(req, res) {
	Songs.createAsync(req.body)
		.then(function(song) {
			res.status(201).send(song);			
		})
	;  
});

module.exports = router;
