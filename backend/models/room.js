var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

module.exports = mongoose.model("Room", new Schema({
  name: {type: String},
  contact_person: {
    user_id: {type: ObjectId},
    name: {type: String},
    email: {type: String},
    phonenumber: {type: String}
  },
  description: {type: String},
  timebeforecancel: {type: Number},
  max_capacity: {type: Number}
}));
