var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017' || 'mongodb://formationEkino:formationEkino123@ds045679.mongolab.com:45679/mymusic';
var songList;
// Use connect method to connect to the Server

MongoClient.connect(url, function(err, db) {
  console.log("Connected correctly to server");

  var Songs = db.collection('songs');
  var newSong = {
    title: 'Title',
    artist: 'Artist',
    album: 'Album',
    year: 2000
  };

  Songs.insert(newSong, function(err, song) {
    console.log(song);
    console.log('song added');
    db.close();
  });
  
});