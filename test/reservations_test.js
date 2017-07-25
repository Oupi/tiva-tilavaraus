const assert = require("assert");
const Reservation = require("../models/reservation");

// Describe tests
describe("Tests for reservations", function() {
  var reservation01 = new Reservation({
    room: "Saunatila",
    time_start: new Date("2017-07-20T18:00"),
    time_end: new Date("2017-07-20T19:00")
  });

  var reservation02 = new Reservation({
    room: "Saunatila",
    time_start: new Date("2017-07-21T19:15"),
    time_end: new Date("2017-07-213T20:00")
  });

  var reservation03 = new Reservation({
    room: "Saunatila",
    time_start: new Date("2017-07-22T20:15"),
    time_end: new Date("2017-07-223T21:00")
  });

  var reservation04 = new Reservation({
    room_id: 1,
    room: "Saunatila",
    time_start: new Date("2017-07-23T20:15"),
    time_end: new Date("2017-07-23T21:00")
  });

  var reservation05 = new Reservation({
    room_id: 1,
    room: "Saunatila",
    time_start: new Date("2017-07-24T22:00"),
    time_end: new Date("2017-07-24T23:00")
  });

  var reservations = [
    reservation01,
    reservation02,
    reservation03,
    reservation04,
    reservation05
  ];

  // Before each test we insert data to reservations collection
  beforeEach(function(done) {
    // Save the reservations to the database
    Reservation.insertMany(reservations).then(function(err, docs) {
      // Tell mocha that the test is done and move on to the tests
      done();
    });
  });
  // Create tests
  it("Saves a reservation to the database", function(done) {
    var reservationToSave = new Reservation({
      room: "Saunatila",
      time_start: new Date("2017-07-23T19:00"),
      time_end: new Date("2017-07-23T20:00")
    });
    reservationToSave.save().then(function() {
      // Check if the reservation has been saved
      assert(reservationToSave.isNew === false);

      // Find all the reservations and check number of them
      Reservation.find({}).then(function(result) {
        assert(result.length === reservations.length + 1);
        done();
      });
    });
  });

  it("Finds a reservation by id from database", function(done) {
    Reservation.findOne({ _id: reservations[0]._id }).then(function(result) {
      assert(result._id.toString() === reservations[0]._id.toString());
      done();
    });
  });

  it("Deletes a reservation from database by id", function(done) {
    Reservation.findOneAndRemove({ _id: reservations[1]._id }).then(function() {
      Reservation.findOne({ _id: reservations[1]._id }).then(function(result) {
        assert(result === null);
        done();
      });
    });
  });

  it("updates a record in database", function(done) {
    Reservation.findOneAndUpdate(
      { _id: reservations[2]._id },
      {
        time_start: new Date("2017-07-23T20:45"),
        time_end: new Date("2017-07-23T22:00")
      }
    ).then(function() {
      Reservation.findOne({ _id: reservations[2]._id }).then(function(result) {
        assert(result.time_start !== reservations[2].time_start);
        assert(result.time_end !== reservations[2].time_end);
        done();
      });
    });
  });

  it("finds reservations by room_id", function(done) {
    Reservation.find({ room_id: 1 }).then(function(result) {
      assert(result.length !== 0);
      done();
    });
  });

  it("finds all reservations that start before given time", function(done) {
    Reservation.find({
      time_start: { $lte: new Date("2017-07-22T20:15") }
    }).then(function(result) {
      assert(result.length === 3);
      done();
    });
  });

  it("finds all reservations that start before given time and have certain roomId", function(
    done
  ) {
    Reservation.find({
      room_id: 1,
      time_start: { $lte: new Date("2017-07-23T20:15") }
    }).then(function(result) {
      assert(result.length === 1);
      done();
    });
  });
});
