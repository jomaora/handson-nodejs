var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var Users = Promise.promisifyAll(require('../database/users'));

/* GET users listing. */
router.get('/', function(req, res, next) {
	Users.findAsync({})
		.then(function(users) {
			res.send(users);			
		})
		.catch(next)
	;  
});

module.exports = router;
