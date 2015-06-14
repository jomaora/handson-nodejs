'use strict'

var http = require('http');
var querystring = require('querystring');

var postData = querystring.stringify({
  name: "Restaurant TEST",
  placeType: "Fast Food",
  stars: 5,
});

var options = {
  hostname: 'jomaora-restapi.herokuapp.com',
  path: '/reviews',
  method: 'POST',
  headers: {
    'accept': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  }
};

var req = http.request(options, function(res) {
	console.log('STATUS: ' + res.statusCode);
	console.log('HEADERS: ' + JSON.stringify(res.headers));
	res.setEncoding('utf8');
	res.on('data', function (chunk) {
		console.log('BODY: ' + chunk);
	});
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write(postData);
req.end();