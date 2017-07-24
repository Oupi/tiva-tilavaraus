const HTTP        = require("http");
const EXPRESS     = require("express");
const MONGO       = require("mongodb").MongoClient;
const ASSERT      = require("assert");
const BODY_PARSER = require('body-parser');
const MULTER      = require('multer');

const URL = 'mongodb://localhost:27017/tiva';

MONGO.connect(URL, function(err, db) {
  if(err) {
    return console.dir(err);
  }
});

var app = EXPRESS();
var router = EXPRESS.Router();
var upload = MULTER(); // for parsing multipart/form-data

app.use(EXPRESS.static("public"));
app.use(BODY_PARSER.json());
app.use(BODY_PARSER.urlencoded({ extended: true }));

app.get('/', function(req, res){
  console.log("GET req");
  res.sendFile(__dirname + "/views/index.html");
});

app.post('/insert-reservation', upload.array(), function(req, res, next){
  var reservation = {
    room: req.body.room,
    time_start: req.body.time_start,
    time_end: req.body.time_end
  };
  console.log(req.body);
  MONGO.connect(URL, function(err, db) {
    ASSERT.equal(null, err);
    db.collection("myCollection").insertOne(reservation,  function(err, result){
      ASSERT.equal(null, err);
      console.log("Reservation inserted");
      db.close();
    });
  });
  res.redirect('/');
});

app.get('/get-reservation', function(req, res, next){
  MONGO.connect(URL, function(err, db) {
    ASSERT.equal(null, err);
    console.log("Reservations required");
    var collection = db.collection('myCollection');
    collection.find().toArray(function(err, docs){
      console.log("retrieved records:");
      console.log(docs);
      res.send(JSON.stringify(docs));
      db.close();
    });
  });
});

app.listen(8080, function() {
  console.log("Listening port 8080...");
});
