'use strict'

var request = require('request');
var _ = require('lodash');

var options = {
  uri: 'http://jomaora-restapi.herokuapp.com/reviews',
  method: 'GET',
  headers: {
    accept: 'application/json'
  }
};

request(options, function(err, res, body) {
	console.log(JSON.parse(body));
  console.log('5 stars: ', _.filter(JSON.parse(body), {stars: 5}));
  console.log('5 stars: ', _.groupBy(JSON.parse(body), 'placeType'));
});
