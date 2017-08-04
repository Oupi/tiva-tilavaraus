var express = require("express");
var mongoose = require("mongoose");
var assert = require("assert");
var bodyParser = require("body-parser");
var path = require("path");

var config = require("./config");
var url = config.database;
var ownerRouter = express.Router();

ownerRouter.use(function(req, res, next) {
  //Verify token
  jwt.verify(req.headers.token, config.secret, function(err, decoded){
    assert.equal(null, err);
    console.log(decoded._doc);
    if (decoded._doc_role === 2) {
      console.log("Authorized access: Owner");
      // console.log(req.headers);
      next();
    } else {
      res.send("Unauthorized access. Wrong Token.");
    }
  });
});

module.exports = ownerRouter;
