const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema and Model
// Schema with expected fields and datatypes
const ReservationSchema = new Schema({
  room: String,
  time_start: Date,
  time_end: Date
});

// Every time new Reservation is made, it is made to reservation(s) collection
// and is based to ReservationSchema
const Reservation = mongoose.model('reservation', ReservationSchema);

// Export this and we can use this elsewhere
module.exports = Reservation;
