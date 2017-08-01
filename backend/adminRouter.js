var express = require("express");
var mongoose = require("mongoose");
var assert = require("assert");
var bodyParser = require("body-parser");
var path = require("path");

var User = require("./models/user");

var config = require("./config");
var url = config.database;
var adminRouter = express.Router();

adminRouter.use(function(req, res, next) {
  var token = req.headers.token;
  if (token == "admin") {
    console.log("Authorized access: Admin");
    next();
  } else {
    res.send("Unauthorized access. Wrong Token.");
  }
});

// Get all users
adminRouter.get("/user", function(req, res){
  User.find({}, function(err, result){
    assert.equal(null, err);
    res.json(result);
  });
});

// Delete one user
adminRouter.delete("/user/:id", function(req, res){
  User.remove({"_id":req.body.user_id}, function(err){
      assert.equal(null, err);
      console.log("User with id "+ req.body.user_id + " has been removed");
      res.send("User with id "+ req.body.user_id + " has been removed");
  });
});

module.exports = adminRouter;
