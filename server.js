//============
// Packages ==
//============
var http        = require("http");
var express     = require("express");
var session     = require("express-session");
var mongoStore  = require("connect-mongo")(session);
var mongoose		= require("mongoose");
var assert      = require("assert");
var bodyParser  = require("body-parser");
var path        = require("path");
var bcrypt      = require("bcrypt");
var jwt         = require("jsonwebtoken");

//=================
// Configuration ==
//=================
var config			= require("./backend/config");
var userRouter  = require("./backend/userRouter");
var ownerRouter = require("./backend/ownerRouter");
var adminRouter = require("./backend/adminRouter");

//==========
// Models ==
//==========
var User        = require("./backend/models/user");
var Room        = require("./backend/models/room");
var Reservation = require("./backend/models/reservation");

var app = express();

app.use(session({
  secret:config.secret,
  saveUninitialized:false,
	resave:true,
	cookie:{maxAge:1000*60*60*24},
	store:new mongoStore({
		collection:"session",
		url:config.sessionDB,
		ttl:24*60*60
	})
}));

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
mongoose.connect(config.database, {useMongoClient:true});

app.get("/", function(req, res) {
  console.log("GET req");
  res.sendFile(__dirname + "/views/index.html");
});


//TODO: Add token things
// User login
app.post("/login", function(req,res){

  // find the user
  User.findOne({email:req.body.email}, function(err, user){
		assert.equal(null,err);

    if(user){
      // check if password matches
      bcrypt.compare(req.body.password, user.password, function(err, response) {
        assert.equal(null, err);

        // if user is found
        if(response){

          jwt.sign(user, config.secret, {
            expiresIn: 60*60*24, // expires in 24 hours
          }, function(err, token){
            assert.equal(null, err);
            res.json({
              success: true,
              message: "Here's your token!",
              token: token
            });
            req.session.token = token;
          });
        } else {
          res.status(403).send("Wrong password.");
        }
      });
		}
	});
});

// User logout
app.post("/logout", function(req,res){
  if(req.session){
		req.session.destroy();
	}
	res.send("Logged out");
});

// User register
app.post("/register", function(req, res){
  var role = 1; // 0 = admin, 1 = user, 2 = owner
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
    var password    = req.body.password;

    bcrypt.hash(password, config.saltRounds).then(function(hash){
      User.find({"email":email}).exec(function(err, items){
        var tempCount = items.length;
        if(tempCount > 0){
          res.status(403).send("Email address already in use");
          return;
        }
        var newUser = new User({
          name: fullName,
          password: hash,
          email: email,
          phonenumber: phoneNumber,
          role: role
        });
        console.log(newUser);
        newUser.save(function(err){
          assert.equal(null, err);
          res.send("New user registered");
        });
      });
    });
  });
});

app.get("/room", function(req, res){
  if(req.query.room_id){
    var room_id = req.query.room_id;
    Room.find({_id:room_id}, function(err,result){
      assert.equal(null,err);
      res.json(result);
      //console.log("Result: " + result);
    });
  } else {
    Room.find({}, function(err, result){
      assert.equal(null, err);
      res.json(result);
      //console.log("Result: " + result);
    });
  }
});

app.get("/get-reservation", function(req, res, next) {
  mongoose.connect(config.database, function(err, db) {
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
app.use("/api/owner", ownerRouter);
app.use("/api/admin", adminRouter);

app.listen(8080, function() {
  console.log("Listening port 8080...");
});
