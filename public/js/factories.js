var app = angular.module('Factories', []);

// UserFactory
app.factory('UserFactory', function($http) {
	
	var factory = {};
	
	factory.login = function(userName, password) {
    return $http({
        method:"POST",
        url:"login",
        data:{"userName":userName,"password":password},
        headers:{"Content-Type":"application/json"}
    });
  }
	
  factory.register = function(userName, password) {
    return $http({
        method:"POST",
        url:"register",
        data:{"userName":userName,"password":password},
        headers:{"Content-Type":"application/json"}
    });
  }
	
	factory.editUser = function() {
	
	}
	
	factory.deleteUser = function() {
	
	}
	
	return factory;
	
});

// ReservationFactory
app.factory('ReservationFactory', function($http) {
	
	var factory = {};
	
	factory.makeReservation = function(userId, roomId, starTime, endTime){
		
	}
	
	factory.findReservationsByRoom = function(roomId){
		
	}
	
	factory.findReservationsByUser = function(userId){
		
	}
	
	factory.findReservationsByTime = function(startTime, endTime){
		
	}
	
	factory.removeReservation = function(reservationId){
		
	}
	
	return factory;
	
});

// RoomFactory
app.factory('RoomFactory', function($http) {
	
	var factory = {};
	
	factory.createRoom = function(){
		
	}
	
	factory.editRoom = function(){
		
	}
	
	factory.deleteRoom = function(){
		
	}
	
	return factory;
	
});