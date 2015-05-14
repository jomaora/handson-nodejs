var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://formationEkino:formationEkino123@ds045679.mongolab.com:45679/mymusic';
var songList;
// Use connect method to connect to the Server

MongoClient.connect(url, function(err, db) {
  console.log("Connected correctly to server");

  var Songs = db.collection('songs');
  
  Songs.find({year: {$gt: 2010}}).toArray(function(err, songs) {
    console.log(songs);
    console.log(songs.length + ' songs found');
    db.close();
  });
  
});