'use strict'

var mongoose = require('mongoose');

var mongolabStringConnexion = 'mongodb://formationEkino:formationEkino123@ds045679.mongolab.com:45679/mymusic';
//var mongolabStringConnexion = 'mongodb://localhost:27017/mymusic';

mongoose.connect(mongolabStringConnexion);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log('Connexion establish to ' + mongolabStringConnexion);
});
