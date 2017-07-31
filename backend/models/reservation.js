var mongoose = require('mongoose');


var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


//TODO: Change id numbers to ObjectIds when in production
module.exports = mongoose.model("Reservation", new Schema({
  _id: {type:Number},
  room_id: {type: Number},
  room: {type: String},
  user: {
    user_id: {type: Number},
    name: {type: String},
    email: {type: String},
    phonenumber: {type: String}
  },
  time_start: {type: Date},
  time_end: {type: Date},
  time_cancel: {type: Date}
}));
