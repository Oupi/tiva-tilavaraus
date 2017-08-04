var express = require("express");
var mongoose = require("mongoose");
var assert = require("assert");
var bodyParser = require("body-parser");
var path = require("path");

var Reservation = require("./models/reservation");
var Room = require("./models/room");
var User = require("./models/user");

var config = require("./config");
var url = config.database;
var userRouter = express.Router();

userRouter.use(function(req, res, next) {
  var token = req.headers.token;
  if (token == "user" || token == "admin") {
    console.log("Authorized access");
    // console.log(req.headers);
    next();
  } else {
    res.send("Unauthorized access. Wrong Token.");
  }
});

// Make reservation
userRouter.post("/reservation", function(req, res) {
  var newReservation = new Reservation(req.body);

  newReservation.save(function(err, result) {
    assert.equal(null, err);
    res.send("Reservation inserted");
  });
});

// Update reservation
userRouter.put("/reservation/:reservationId", function(req, res) {
  var newReservation = req.body;
  var tempId = req.headers._id;

  Reservation.update({_id:tempId},{$set:newReservation}, function(err, result){
    assert.equal(null, err);
    res.send("Reservation updated");
  });
});

// Delete reservation
userRouter.delete("/reservation/:reservationId", function(req, res) {
  var tempId = req.headers._id;

  Reservation.findOneAndRemove({_id:tempId}, function(err, result){
    assert.equal(null, err);
    res.send("Reservation with id: " + tempId + " deleted");
  });
});


/*
** Get all reservations by user or room id. Id must be defined,
** Otherwise will not return anything
*/
userRouter.get("/reservation/:id", function(req, res) {
  var reservations = [];
  var i;

  // Checking id_type for user and then returning array of reservations if there
  // is reservations
  // TODO check that user can only search for own reservations
  if(req.query.id_type == "user"){
    Reservation.find({"user.user_id":req.headers._id}, function(err, items){
      if (items.length > 0) {
        for(i = 0; i < items.length; i++) {
          reservations.push(items[i]);
        }
        // Return reservations list as json-object
        res.json(reservations);
      } else {
        res.send("No reservations found for userId: " + req.headers._id);
      }
    });
  }
  // Checking id_type for room and then returning array of reservations if there
  // is reservations
   else if(req.query.id_type == "room") {
    Reservation.find({room_id: req.headers._id}, function(err, items){
      assert.equal(null, err);
      if(items.length > 0){
        for (i = 0; i < items.length; i++) {
          reservations.push(items[i]);
        }
        res.json(reservations);
      } else {
        res.send("No reservations found for this roomId: " + req.headers._id);
      }
    });
  } else {
    res.send("There is no reservations");
  }
});


// Get all reservations for room with date params
userRouter.get("/reservation/rooms/:roomId", function(req, res){
  var roomId = req.headers.room_id;
  var timeStart = req.query.time_start;
  var timeEnd = req.query.time_end;
  var searchParams = {};

  // Check if date values are set and not undefined
  if(!timeStart || !timeEnd) {
      if(timeStart){
      // end is undefined
      console.log("end undefined");
      searchParams = {
        room_id: roomId,
        time_start: {$gte: timeStart}
      };
      Reservation.find(searchParams, function(err, result){
        assert.equal(null, err);
        res.json(result);
        console.log("reservations: " + result);
      });

    } else if (timeEnd){
      // start is undefined
      console.log("start undefined");
      searchParams = {
        room_id: roomId,
        time_end: {$lte: timeEnd}
      };
      Reservation.find(searchParams, function(err, result){
        assert.equal(null, err);
        res.json(result);
        console.log("reservations: " + result);
      });
    } else {
      // both dates are undefined, get all with roomId
      console.log("both undefined");
      searchParams = {
        room_id: roomId
      };
      Reservation.find(searchParams, function(err, result){
        assert.equal(null, err);
        res.json(result);
        console.log("reservations: " + result);
      });
    }
  } else {
    // dates are set
    console.log("dates are set");
    searchParams = {
      room_id: roomId,
      time_start: {$gte: timeStart},
      time_end: {$lte: timeEnd}
    };
    Reservation.find(searchParams, function(err, result){
      assert.equal(null, err);
      res.json(result);
      console.log("reservations: " + result);
    });
  }
});

// Get rooms. Accepts parameter "room_id" and if used,
// will return one room with the given id number.
// Otherwise returns all rooms from db.
userRouter.get("/room", function(req, res){
  if(req.query.room_id){
    var room_id = req.query.room_id;
    Room.find({_id:room_id}, function(err,result){
      assert.equal(null,err);
      res.json(result);
      console.log("Result: " + result);
    });
  } else {
    Room.find({}, function(err, result){
      assert.equal(null, err);
      res.json(result);
      console.log("Result: " + result);
    });
  }
});

// Get user information by given id
userRouter.get("/user/:userId", function(req, res){
  var userId = req.headers._id;

  User.findById(userId, function(err, user){
    assert.equal(null, err);
    res.json(user);
  });
});

// Update user information
userRouter.put("/user/:userId", function(req, res) {
  var updatedInformation = req.body;
  var tempId = req.headers._id;

  User.update({_id:tempId},{$set:updatedInformation}, function(err, result){
    assert.equal(null, err);
    res.send("Users information updated");
  });
});

// Delete user by id
userRouter.delete("/user/:userId", function(req, res ){
  var tempId = req.headers._id;

  User.findByIdAndRemove(tempId, function(err, result){
    assert.equal(null, err);
    res.send("User with id: " + tempId + " deleted");
  });
});

module.exports = userRouter;
