const mongoose = require('mongoose');

// Because mongooses promise library is deprecated, we use ES6 promises
mongoose.Promise = global.Promise;

// Connect to the database before tests run
before(function(done){
  // Connect to mongodb
  mongoose.connect('mongodb://localhost:27017/tiva-testing', {
    useMongoClient: true,
  });

  // Listen once when the connection to db has been made
  // and listen for the connection errors.
  mongoose.connection.once('open', function(){
    console.log('Connection to db has been established');
    // Connection has been made and we can move on
    done();
  }).on('err', function(err){
    console.log('Connection error: ', err);
  });
});

// Drop reservations collestion before each test
beforeEach(function(done){
  // Drop the collestion to ensure "blank" db for tests
  // drop is asynchronous
  mongoose.connection.collections.reservations.drop(function(){
    // After dropping the collection tell mocha to move on to tests
    done();
  });
});
