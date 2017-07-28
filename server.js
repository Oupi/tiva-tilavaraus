var http        = require("http");
var express     = require("express");
var session     = require("express-session");
var mongo       = require("mongodb").MongoClient;
var assert      = require("assert");
var bodyParser  = require("body-parser");
var multer      = require("multer");
var path        = require("path");

var userRouter  = require("./backend/userRouter");

var User        = require("./backend/models/user");
var Room        = require("./backend/models/room");
var Reservation = require("./backend/models/reservation");

var url         = "mongodb://localhost:27017/tiva";

mongo.connect(url, function(err, db) {
  if (err) {
    return console.dir(err);
  }
  db.close();
});

var app = express();
var upload = multer(); // for parsing multipart/form-data

app.use(session({
  // Session config here
}));

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  console.log("GET req");
  res.sendFile(__dirname + "/views/index.html");
});

// User login
app.post("/login", function(req,res){

});

// User logout
app.post("/logout", function(req,res){

});

// User register
// TODO:crypt, hash and salt password
app.post("/register", function(req, res){
  var role = 1; // 0 = admin, 1 = user, 2 = contactPerson
  User.find().exec(function(err, items){
    assert.equal(null,err);
    var count = items.length;
    // If there is no users registered
    if(count == 0){
      // Set user role to be admin
      role = 0;
    } else {
      // Set it be regular user
      role = 1;
    }

    var fullName    = req.body.lastName + " " + req.body.firstName;
    var email       = req.body.email;
    var phoneNumber = req.body.pnumber;
    var password    = req.body.password; //TODO: crypt, hash and salt password

    User.find({"email":email}).exec(function(err, items){
      var tempCount = items.length;
      if(tempCount > 0){
        res.status(403).send("Email address already in use");
        return;
      }
      var newUser = new User({
        name: fullName,
        password: password,
        email: email,
        phonenumber: phoneNumber,
        role: role
      });
      console.log(newUser);
      newUser.save(function(err){
        assert.equal(null, err);

      });
      res.send("New user registered");
    });
  });
});

app.get("/get-reservation", function(req, res, next) {
  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Reservations required");
    var collection = db.collection("reservations");
    collection.find().toArray(function(err, docs) {
      console.log("retrieved records:");
      console.log(docs);
      res.send(JSON.stringify(docs));
      db.close();
    });
  });
});

app.use("/api", userRouter);

app.listen(8080, function() {
  console.log("Listening port 8080...");
});
