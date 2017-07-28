var mongoose = require("mongoose");

var Schema = mongoose.Schema;

module.exports = mongoose.model("User", new Schema({
  name: {type: String},
  password: {type: String},
  email: {type: String},
  address: {type: String},
  phonenumber: {type: String},
  role: {type: Number}
}));
