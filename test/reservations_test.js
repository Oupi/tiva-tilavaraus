const assert = require('assert');
const Reservation = require('../models/reservation');


// Describe tests
describe('Tests for reservations', function(){

  var reservation01 = new Reservation({
    room: "Saunatila",
    time_start: new Date("2017-07-23T18:00"),
    time_end: new Date("2017-07-23T19:00")
  });

  var reservation02 = new Reservation({
    room: "Saunatila",
    time_start: new Date("2017-07-23T19:15"),
    time_end: new Date("2017-07-23T20:00")
  });

  var reservation03 = new Reservation({
    room: "Saunatila",
    time_start: new Date("2017-07-23T20:15"),
    time_end: new Date("2017-07-23T21:00")
  });

  var reservations = [reservation01, reservation02, reservation03];

  // Before each test we insert data to reservations collection
  beforeEach(function(done){
    // Save the reservations to the database
    Reservation.insertMany(reservations).then(function(err, docs){
      // Tell mocha that the test is done and move on to the tests
      done();
    });
  });
  // Create tests
  it('Saves a reservation to the database', function(done){
    var reservationToSave = new Reservation({
      room: "Saunatila",
      time_start: new Date("2017-07-23T19:00"),
      time_end: new Date("2017-07-23T20:00")
    });
    reservationToSave.save().then(function(){
      // Check if the reservation has been saved
      assert(reservationToSave.isNew === false);

      // Find all the reservations and check number of them
      Reservation.find({}).then(function(result){
        assert(result.length === 4);
        done();
      });
  });
});

  it('Finds a reservation by id from database', function(done){
    Reservation.findOne({_id: reservations[0]._id}).then(function(result){
      assert(result._id.toString() === reservations[0]._id.toString());
      done();
    });
  });

  it('Deletes a reservation from database by id', function(done){
    Reservation.findOneAndRemove({_id: reservations[1]._id}).then(function(){
      Reservation.findOne({_id: reservations[1]._id}).then(function(result){
        assert(result === null);
        done();
      });
    });
  });

  it('updates a record in database', function(done){
    Reservation.findOneAndUpdate({_id: reservations[2]._id}, {time_start: new Date("2017-07-23T20:45"), time_end: new Date("2017-07-23T22:00")}).then(function(){
      Reservation.findOne({_id: reservations[2]._id}).then(function(result){
        assert(result.time_start !== reservations[2].time_start);
        assert(result.time_end !== reservations[2].time_end);
        done();
      });
    });
  });

});
