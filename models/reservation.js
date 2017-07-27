var mongoose = require('mongoose');


var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports = mongoose.model("Reservation", new Schema({
  room_id: {type: ObjectId},
  room: {type: String},
  user: {
    user_id: {type: ObjectId},
    name: {type: String},
    email: {type: String},
    phonenumber: {type: String}
  },
  time_start: {type: Date},
  time_end: {type: Date}
  time_cancel: {type: Date}
}));
