var app = angular.module('Factories', []);

// UserFactory
app.factory('UserFactory', function($http) {
	
	var factory = {};
	var user = {};
	
	factory.login = function(userName, password) {
    return $http({
        method:"POST",
        url:"login",
        data:{"userName":userName,"password":password},
        headers:{"Content-Type":"application/json"}
    });
  }
	
  factory.register = function(firstName, lastName, email, pnumber, password) {
    return $http({
        method:"POST",
        url:"register",
        data:{
					"fistName":firstName,
					"lastName":lastName,
					"pnumber":email,
					"userName":pnumber,
					"password":password
				},
        headers:{"Content-Type":"application/json"}
    });
  }
	
	factory.editUser = function() {
	
	}
	
	factory.deleteUser = function() {
	
	}
	
	factory.getUser = function() {
		return user;
	}
	
	factory.setUser = function(u) {
		user = u;
	}
	
	return factory;
	
});

// ReservationFactory
app.factory('ReservationFactory', function($http, UserFactory) {
	
	var factory = {};
	
	factory.makeReservation = function(id, roomId, startTime, endTime){
		
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