var express = require("express");
var mongoose = require("mongoose");
var assert = require("assert");
var bodyParser = require("body-parser");
var path = require("path");

var config = require("./config");
var url = config.database;
var ownerRouter = express.Router();

ownerRouter.use(function(req, res, next) {
  var token = req.headers.token;
  if (token == "owner") {
    console.log("Authorized access: Owner");
    next();
  } else {
    res.send("Unauthorized access. Wrong Token.");
  }
});

module.exports = ownerRouter;
