var express = require("express");
// var mongo = require("mongodb").MongoClient;
var mongoose = require("mongoose");
var assert = require("assert");
var bodyParser = require("body-parser");
var path = require("path");

var Reservation = require("./models/reservation");

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
  var newReservation = {
    room: req.body.room,
    time_start: req.body.time_start,
    time_end: req.body.time_end
  };

  Reservation.insertOne(newReservation, function(err, result) {
    assert.equal(null, err);
    res.send("Reservation inserted");
  });
});

// Update reservation
userRouter.put("/reservation/:reservationId", function(req, res, next) {
  var reservation = new Reservation(req.body);

  Reservation.update({_id:reservation._id},{
    $set:{
      room:reservation.room,
      time_start:reservation.time_start,
      time_end:reservation.time_end
    }
  }, function(err, result){
    assert.equal(null, err);
    res.send("Reservation updated");
  });
});

// Delete reservation
userRouter.delete("/reservation/:reservationId", function(req, res) {
  var reservation = new Reservation(req.body);

  Reservation.findOneAndRemove({_id:reservation._id}, function(err, result){
    assert.equal(null, err);
    res.send("Reservation with id: " + reservation._id + " deleted");
  });
});


// Get all reservations for user
userRouter.get("/reservation/:id", function(req, res) {
  var reservations = [];

  if(req.query.id_type == "user"){

  } else if(req.query.id_type == "room") {

  } else {

  }
  Reservation.find({"user.user_id":req.headers.user_id}, function(err, items){
    if (items.length > 0) {
      items.forEach(function(reservation) {
        reservations.push(reservation);
      });
      // Return reservations list as json-object
      res.json(reservations);
    } else {
      res.send("No reservations found for userId: " + req.headers.user_id);
    }
  });
});


// Get all reservations for room with id
userRouter.get("/reservation/:roomId", function(req, res) {
  var reservations = [];

  Reservation.find({room_id: req.query.room_id}, function(err, items){
    assert.equal(null, err);
    if(items.length > 0){
      for (var i = 0; i < items.length; i++) {
        reservations.push(items[i]);
      }
      res.json(reservations);
    } else {
      res.send("No records found");
    }
  });
});

/**
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

*/
module.exports = userRouter;
