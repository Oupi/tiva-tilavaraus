var app = angular.module('Factories', []);

// UserFactory
app.factory('UserFactory', function($http) {

	var factory = {};
	var userId = "";
	var logged = false;
	var token = "";

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
	
	factory.logOut = function(){
    return $http({
      method:"POST",
      url:"logout",
      headers:{"Content-Type":"application/json"}
    });
  };

	factory.getUserById = function(id) {
		return $http({
      method:"GET",
      url:"api/user/:id",
      headers:{
				"Content-Type":"application/json",
				"_id": id,
				"token": factory.getToken()
			}
    });
	};
	
	factory.editUser = function() {

	};

	factory.deleteUser = function() {
	};

	factory.setUserId = function(id) {
		userId = id;
	};
	
	factory.getUserId = function() {
		return userId;
	};

	factory.setLogged = function(u) {
    logged = u;
  };

  factory.isLogged = function() {
    return logged;
  };
	
	factory.setToken = function(t) {
		token = t;
	};
	
	factory.getToken = function() {
		return token;
	};

	factory.setToken = function(t){
		token = t;
	};

	factory.getToken = function(){
		return token;
	};

	return factory;

});

// ReservationFactory
app.factory('ReservationFactory', function($http, UserFactory) {

	var factory = {};

	factory.makeReservation = function(roomId, roomName, user, startTime, endTime){
		return $http({
			method:"POST",
			url:"api/reservation",
			data:{
				"room_id":roomId,
				"room":roomName,
				"user":user,
				"time_start":startTime,
				"time_end":endTime,
				"time_cancel":null
			},
			headers:{
				"Content-Type":"application/json",
				"token": UserFactory.getToken()
			}
    });
	};
	factory.findReservationsByRoom = function(roomId){
		return $http({
			method:"GET",
			url:"api//reservation/:id?id_type=room",
			headers:{
				"Content-Type":"application/json",
				"token": UserFactory.getToken(),
				"_id": roomId
			}
    });
	};

	factory.findReservationsByUser = function(userId){

	};

	factory.findReservationsByRoomAndTime = function(roomId, startTime, endTime){
		return $http({
			method:"GET",
			url:"api/reservation/rooms/:roomId?time_start=" + startTime + "&time_end=" + endTime,
			headers:{
				"Content-Type":"application/json",
				"token": UserFactory.getToken(),
				"room_id": roomId
			}
    });
	};

	factory.removeReservation = function(reservationId){

	};

	return factory;

});

// RoomFactory
app.factory('RoomFactory', function($http) {

	var factory = {};

	factory.getRooms = function(){
		return $http({
			method:"GET",
			url:"room",
			headers:{"Content-Type":"application/json"}
    });
	};

	factory.createRoom = function(){

	};

	factory.editRoom = function(){

	};

	factory.deleteRoom = function(){

	};

	return factory;

});
