var express = require("express");
var mongoose = require("mongoose");
var assert = require("assert");
var bodyParser = require("body-parser");
var path = require("path");

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

module.exports = adminRouter;
