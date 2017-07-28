var express = require("express");
var mongo = require("mongodb").MongoClient;
var assert = require("assert");
var bodyParser = require("body-parser");
var multer = require("multer");
var path = require("path");

var url = "mongodb://localhost:27017/tiva";
var userRouter = express.Router();

userRouter.use(function(req, res, next) {
  var token = req.headers.token;
  if (token == "user") {
    console.log("Authorized access");
    // console.log(req.headers);
    next();
  } else {
    res.send("Unauthorized access. Wrong Token.");
  }
});

// Make reservation
userRouter.post("/reservation", function(req, res) {
  var reservation = {
    room: req.body.room,
    time_start: req.body.time_start,
    time_end: req.body.time_end
  };
  console.log(req.body);
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection("reservations").insertOne(reservation, function(err, result) {
      assert.equal(null, err);
      console.log("Reservation inserted");
      db.close();
    });
  });
});

// Update reservation
userRouter.put("/reservation/:reservationId", function(req, res, next) {
  var reservation = req.body;
  var reservationId = req.headers._id;
  // Establish connection to db
  mongo.connect(url, function(err, db) {
    console.log("Connected");
    assert.equal(null, err);
    db.collection("reservations").updateOne({_id: req.body.reservationId},{reservation}, function(err, result) {
      assert.equal(null, err);

      // Update reservation
      collection.update({
        _id: parseInt(reservationId)
      },{
        $set: {name: req.body.name}
      }, function(err, result) {
        assert.equal(null, err);

        // Fetch the updated document
        collection.findOne({_id: parseInt(reservationId)}, function(err, item){
          assert.equal(null, err);
          assert.equal(req.body.name, item.name);
          db.close(function(){
            console.log("Db closed");
            return;
          });
        });
      });
    });
    return;
  });
});

// Delete reservation
userRouter.delete("/reservation/:reservationId", function(req, res) {
  console.log(req.body);
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection("reservations").deleteOne({_id: req.body.reservationId}, function(err, result) {
      assert.equal(null, err);
      console.log("Reservation deleted");
      db.close();
    });
  });
});

// Get all reservations for user
userRouter.get("/reservation/:userId", function(req, res) {
  var reservations = [];

  // Open database connection
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    // Find all reservations ffor userId
    var cursor = db
      .collection("userCollection")
      .find({ userId: req.body.userId });
    // If there are reservations, push them to reservations list
    // If not, send message.
    if (cursor.length > 0) {
      cursor.forEach(function(reservation) {
        reservations.push(reservation);
      });
      // Return reservations list as json-object
      res.json(reservations);
    } else {
      res.send("No reservations found for userId: " + req.body.userId);
    }
    // Close database connection
    db.close();
  });

});

// Get all reservations for room
userRouter.get("/reservation/room/:roomId", function(req, res) {
  var reservations = [];
  var reservationId = req.headers._id;
  var roomId = req.headers.room_id;

  // Open database connection
  mongo.connect(url, function(err, db) {
    console.log("Connected");
    assert.equal(null, err);

    var collection = db.collection("reservations");
    var cursor = collection.find({room_id: roomId});

    cursor.toArray(function(err, docs){
      assert.equal(null, err);
      if(docs.length > 0){
        docs.forEach(function(doc){
          reservations.push(doc);
        });
        res.json(reservations);
      } else {
        res.send("No records found");
      }
      db.close();
    });
  });
});

// TODO: make this function work
// Get all reservations for room with date params
userRouter.get("/reservation/rooms/?room_id&time_start&time_end", function(req, res) {
  var reservations = [];
  var reservationId = req.headers._id;
  var roomId = req.headers.room_id;
  var timeStart = req.headers.time_start;
  var timeEnd = req.headers.time_end;

  console.log(timeStart);
  console.log(timeEnd);
  // Open database connection
  mongo.connect(url, function(err, db) {
    console.log("Connected");
    assert.equal(null, err);
    var searchParam = {};

    if (
      (timeStart === null || timeStart === "" || timeStart === undefined) &&
      (timeEnd === null || timeEnd === "" || timeEnd === undefined)
    ) {
      if (
        (timeEnd !== null || timeEnd !== "" || timeEnd !== undefined) &&
        (timeStart === null || timeStart === "" || timeStart === undefined)
        ) {
        searchParam = {
          room_id: roomId,
          time_end: { $lte: timeEnd }
        };
      } else if (
        (timeStart !== null || timeStart !== "" || timeStart !== undefined) &&
        (timeEnd === null || timeEnd === "" || timeEnd === undefined)
      ) {
        searchParam = {
          room_id: parseInt(roomId),
          time_start: { $gte: timeStart }
        };
      } else {
        searchParam = {
          _id: parseInt(reservationId),
          room_id: parseInt(roomId)
        };
      }
    } else {
      searchParam = {
        room_id: roomId,
        time_start: { $gte: timeStart },
        time_end: { $lte: timeEnd }
      };
    }

    var collection = db.collection("reservations");
    var cursor = collection.find(searchParam);

    cursor.toArray(function(err, docs){
      assert.equal(null, err);
      if(docs.length > 0){
        docs.forEach(function(doc){
          reservations.push(doc);
        });
        res.json(reservations);
      } else {
        res.send("No records found");
      }
      db.close();
    });
  });
});

module.exports = userRouter;
