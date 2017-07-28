var http        = require("http");
var express     = require("express");
var mongo       = require("mongodb").MongoClient;
var assert      = require("assert");
var bodyParser  = require("body-parser");
var multer      = require("multer");
var path        = require("path");

var userRouter  = require("./backend/userRouter");

var url         = "mongodb://localhost:27017/tiva";

mongo.connect(url, function(err, db) {
  if (err) {
    return console.dir(err);
  }
  db.close();
});

var app = express();
var upload = multer(); // for parsing multipart/form-data

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  console.log("GET req");
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/get-reservation", function(req, res, next) {
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Reservations required");
    var collection = db.collection("reservations");
    collection.find().toArray(function(err, docs) {
      console.log("retrieved records:");
      console.log(docs);
      res.send(JSON.stringify(docs));
      db.close();
    });
  });
});

app.use("/api", userRouter);

app.listen(8080, function() {
  console.log("Listening port 8080...");
});
