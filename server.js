const HTTP = require("http");
const EXPRESS = require("express");
const MONGO = require("mongodb").MongoClient;
const ASSERT = require("assert");
const BODY_PARSER = require("body-parser");
const MULTER = require("multer");
const PATH = require("path");

const URL = "mongodb://localhost:27017/tiva";

MONGO.connect(URL, function(err, db) {
  if (err) {
    return console.dir(err);
  }
});

var app = EXPRESS();
var userRouter = EXPRESS.Router();
var upload = MULTER(); // for parsing multipart/form-data

app.use(EXPRESS.static(PATH.join(__dirname, "public")));
app.use(BODY_PARSER.json({ extended: true }));
app.use(BODY_PARSER.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  console.log("GET req");
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/get-reservation", function(req, res, next) {
  MONGO.connect(URL, function(err, db) {
    ASSERT.equal(null, err);
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

/////////////////////////////
// User router starts here //
/////////////////////////////
userRouter.use(function(req, res, next) {
  var token = req.headers.token;
  if (token == "user") {
    console.log("Authorized access");
    console.log(req.headers);
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
  MONGO.connect(URL, function(err, db) {
    ASSERT.equal(null, err);
    db.collection("reservations").insertOne(reservation, function(err, result) {
      ASSERT.equal(null, err);
      console.log("Reservation inserted");
      db.close();
    });
  });
});

// Update reservation
userRouter.put("/reservation/:reservationId", function(req, res) {
  var reservation = req.body;
  console.log(req.body);
  MONGO.connect(URL, function(err, db) {
    ASSERT.equal(null, err);
    db.collection("reservations").updateOne({_id: req.body.reservationId},{reservation}, function(err, result) {
      ASSERT.equal(null, err);
      console.log("Reservation updated");
      db.close();
    });
  });
});

// Delete reservation
userRouter.delete("/reservation/:reservationId", function(req, res) {
  console.log(req.body);
  MONGO.connect(URL, function(err, db) {
    ASSERT.equal(null, err);
    db.collection("reservations").deleteOne({_id: req.body.reservationId}, function(err, result) {
      ASSERT.equal(null, err);
      console.log("Reservation deleted");
      db.close();
    });
  });
});

// Get all reservations for user
userRouter.get("/reservation/:userId", function(req, res) {
  var reservations = [];

  // Open database connection
  MONGO.connect(URL, function(err, db) {
    ASSERT.equal(null, err);
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
    } else {
      res.send("No reservations found for userId: " + req.body.userId);
    }
    // Close database connection
    db.close();
  });
  // Return reservations list as json-object
  res.json(reservations);
});

// Get all reservations for room
userRouter.get("/reservation/:roomId", function(req, res) {
  var reservations = [];

  var roomId = req.body.roomId;
  var timeStart = req.body.time_start;
  var timeEnd = req.body.time_end;

  // Open database connection
  MONGO.connect(URL, function(err, db) {
    ASSERT.equal(null, err);

    var searchParam = {};

    if (
      (timeStart == null && timeEnd == null) ||
      (timeStart == "" && timeEnd == "")
    ) {
      if (timeEnd != null || timeEnd != "") {
        searchParam = {
          room_id: roomId,
          time_end: { $lte: timeEnd }
        };
      } else if (timeStart != null || timeStart != "") {
        searchParam = {
          room_id: roomId,
          time_start: { $gte: timeStart }
        };
      } else {
        searchParam = {
          room_id: roomId
        };
      }
    } else {
      searchParam = {
        room_id: roomId,
        time_start: { $gte: timeStart },
        time_end: { $lte: timeEnd }
      };
    }

    var cursor = db.collection("reservations").find(searchParam);

    // If there are reservations, push them to reservations list
    // If not, send message.
    if (cursor.length > 0) {
      cursor.forEach(function(reservation) {
        reservations.push(reservation);
      });
    } else {
      res.send("No reservations found for roomId: " + req.body.roomId);
    }
    // Close database connection
    db.close();
  });
  // Return reservations list as json-object
  res.json(reservations);
});

app.use("/api", userRouter);

app.listen(8080, function() {
  console.log("Listening port 8080...");
});
