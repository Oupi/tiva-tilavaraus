const HTTP = require("http");
const EXPRESS = require("express");
const MONGO = require("mongodb").MongoClient;

MONGO.connect("mongodb://localhost:27017", function(err, db) {
  if(err) {
    return console.dir(err);
  }
});

var app = EXPRESS();
app.use(EXPRESS.static(__dirname + "/public"));

app.get('/', function(req, res){
  console.log("GET req");
  res.sendFile(__dirname + "/views/index.html");
});

app.listen(8080, function() {
  console.log("Listening port 8080...");
});
