const assert = require('assert');
const Reservation = require('../models/reservation');


// Describe tests
describe('Tests for reservations', function(){

  var reservation;
  // Before each test we insert data to reservations collection
  beforeEach(function(done){
    // Create a new reservation from the reservation model,
    // so that there is data in the db.
      reservation = new Reservation({
      room: "Saunatila",
      time_start: new Date("2017-07-23T18:00"),
      time_end: new Date("2017-07-23T19:00")
    });
    // Save the reservation to the database
    // save() is asynchronous
    reservation.save().then(function(){
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
      done();
    });
  });

  it('Finds a reservation by id from database', function(done){
    Reservation.findOne({_id: reservation._id}).then(function(result){
      assert(result._id.toString() === result._id.toString());
      done();
    });
  });

  it('Deletes a reservation from database by id', function(done){
    Reservation.findOneAndRemove({_id: reservation._id}).then(function(){
      Reservation.findOne({_id: reservation._id}).then(function(result){
        assert(result === null);
        done();
      });
    });
  });

  it('updates a record in database', function(done){
    Reservation.findOneAndUpdate({_id: reservation._id}, {time_start: new Date("2017-07-23T19:00"), time_end: new Date("2017-07-23T20:00")}).then(function(){
      Reservation.findOne({_id: reservation._id}).then(function(result){
        assert(result.time_start !== reservation.time_start);
        assert(result.time_end !== reservation.time_end);
        done();
      });
    });
  });

});
