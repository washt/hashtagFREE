var express = require('express');
var app = express();
var mongodb = require('mongodb');
var request = require('request');
var _ = require('underscore');
var bodyParser = require('body-parser');
var MongoClient = mongodb.MongoClient;
var password = process.env.MONGO_PASSWORD;
var mongoUrl = 'mongodb://hacku:' + password + '@ds055525.mongolab.com:55525/hacku2016-freehash';
var gcmKey = 'AIzaSyDnaXqaIQl_-lkyawReIBkBndic8Ipr3j8';
app.locals._ = require('underscore');
MongoClient.connect(mongoUrl, function(err, db) {
  if (err) {
    throw err;
  }

  var events = db.collection('events');
  var listeners = db.collection('listeners');

  app.set('view engine', 'ejs');
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.get('/', function (req, res) {
    events.find({}).toArray(function(err, events) {
      res.render('index', {events: events});
    });
  });

  app.get('/map', function (req, res) {
    events.find({}).toArray(function(err, events) {
      res.render('map', {events: events});
    });
  });

  app.get('/event', function (req, res) {
	  res.render('form');
  });

  app.post('/createEvent', function (req, res) {
    var event = req.body;
    event.location = buildingToCoords(event.location);
    events.insert(event, function(err) {
      if(err) {
        res.send(err);
      }
      notify();
      res.send("event posted");
    });
  });

  app.post('/addListener', function (req, res) {
    listeners.insert({_id: req.body.listener}, function() {
      res.send("event posted");
    });
  });

  app.get('/notify', function (req, res) {
    notify();
    res.send('Notified');
  });

  app.use(express.static('public'));

  app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
    if (process.send) {
      process.send('online');
    }
  });

  process.on('message', function(message) {
    if (message === 'shutdown') {
      process.exit(0);
    }
  });

  function notify() {
    listeners.find({}).toArray(function(err, listeners) {
      request.post(
        'https://android.googleapis.com/gcm/send',
        {
          body:{registration_ids:_.pluck(listeners, '_id')},
          json: true,
          headers: {Authorization: 'key=' + gcmKey}
        }
      );
    });
  }

  function buildingToCoords(buildingName) {
    var buildings = {
      'dragas' : {
        long: 36.887468,
        lat:-76.303726
      },
      'webb' : {
        long: 36.886534,
        lat: -76.306525
      },
      'kaufman' : {
        long: 36.885824,
        lat: -76.305077
      }
    };

    return buildings[buildingName] || null;
  }
});
