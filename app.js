var express = require('express');
var app = express();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var password = process.env.MONGO_PASSWORD;
var mongoUrl = 'mongodb://hacku:' + password + '@ds055525.mongolab.com:55525/hacku2016-freehash';
MongoClient.connect(mongoUrl, function(err, db) {
  if (err) {
    throw err;
  }

  var events = db.collection('events');
  
  app.set('view engine', 'ejs');

  app.get('/', function (req, res) {
    events.insert({name: 'Pizza!!!'}, function() {
      events.find({}).toArray(function(err, events) {
        res.render('index', {events: events});
      });
    });
  });

  app.get('/reset', function (req, res) {
      events.deleteMany({},function (err,result){
	      if (err) throw err;
	      res.send("db cleared");
      });
  });

  app.use(express.static('public'));

  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });
});
