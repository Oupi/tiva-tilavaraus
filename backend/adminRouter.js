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
  //Verify token
  jwt.verify(req.headers.token, config.secret, function(err, decoded){
    assert.equal(null, err);
    console.log(decoded._doc);
    if (decoded._doc.role === 0) {
      console.log("Authorized access: Admin");
      // console.log(req.headers);
      next();
    } else {
      res.send("Unauthorized access. Wrong Token.");
    }
  });
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
  User.findById(req.body.user_id, function(err, result){
    assert.equal(null, err);
    if(result._id == req.headers.id){
      res.send("Cannot delete yourself you silly admin");
    } else {
      User.remove({"_id":req.body.user_id}, function(err){
          assert.equal(null, err);
          console.log("User with id "+ req.body.user_id + " has been removed");
          res.send("User with id "+ req.body.user_id + " has been removed");
      });
    }
  });
});

module.exports = adminRouter;
