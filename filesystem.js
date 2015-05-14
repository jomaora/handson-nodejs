'use strict'

var fs = require('fs');

fs.watch('.', {persistent: true, recursive: true}, function (event, filename) {
  console.log('event is: ' + event);
  if (filename) {
    console.log('filename provided: ' + filename);
  } else {
    console.log('filename not provided');
  }
});