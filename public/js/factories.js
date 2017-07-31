var app = angular.module('Factories', []);

// UserFactory
app.factory('UserFactory', function($http) {

	var factory = {};
	var user = {};

	factory.login = function(userName, password) {
    return $http({
        method:"POST",
        url:"login",
        data:{"email":userName,"password":password},
        headers:{"Content-Type":"application/json"}
    });
  };

  factory.register = function(firstName, lastName, email, pnumber, password) {
    return $http({
        method:"POST",
        url:"register",
        data:{
					"firstName":firstName,
					"lastName":lastName,
					"email":email,
					"pnumber":pnumber,
					"password":password
				},
        headers:{"Content-Type":"application/json"}
    });
  };

	factory.editUser = function() {

	};

	factory.deleteUser = function() {
	};

	factory.getUser = function() {
		return user;
	};

	factory.setUser = function(u) {
		user = u;
	};

	return factory;

});

// ReservationFactory
app.factory('ReservationFactory', function($http, UserFactory) {

	var factory = {};

	factory.makeReservation = function(roomId, roomName, user, startTime, endTime){
		return $http({
			method:"POST",
			url:"reservation",
			data:{
				"room_id":roomId,
				"room":roomName,
				"user":user,
				"time_start":startTime,
				"time_end":endTime,
				"time_cancel":null
			},
			headers:{"Content-Type":"application/json"}
    });
	};
	factory.findReservationsByRoom = function(roomId){

	};

	factory.findReservationsByUser = function(userId){

	};

	factory.findReservationsByTime = function(startTime, endTime){
		return $http({
			method:"GET",
			url:"reservation?time_start=" + startTime + "&time_end=" + endTime,
			headers:{"Content-Type":"application/json"}
    });
	};

	factory.removeReservation = function(reservationId){

	};

	return factory;

});

// RoomFactory
app.factory('RoomFactory', function($http) {

	var factory = {};

	factory.createRoom = function(){

	};

	factory.editRoom = function(){

	};

	factory.deleteRoom = function(){

	};

	return factory;

});
