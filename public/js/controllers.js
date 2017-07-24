var app = angular.module('Controllers', ['Factories']);

// UserController
app.controller('UserController', function($scope, UserFactory){
	
	$scope.login = function(userName, password){
		UserFactory.login(userName, password)
			.then(function(data) {
			
			},function(reason) {
				
			});
	}
	
	$scope.register = function(){
		
	}
	
	$scope.editUser = function(){
		
	}
	
	$scope.deleteUser = function(userId){
		
	}
	
});

// ReservationController
app.controller('ReservationController', function($scope, ReservationFactory){
	
	$scope.makeReservation = function(userId, roomId, starTime, endTime){
		
	}
	
	$scope.findReservationsByRoom = function(roomId){
		
	}
	
	$scope.findReservationsByUser = function(userId){
		
	}
	
	$scope.findReservationsByTime = function(startTime, endTime){
		
	}
	
	$scope.removeReservation = function(reservationId){
		
	}
	
});

// RoomController
app.controller('RoomController', function($scope, RoomFactory){
	
	$scope.createRoom = function(){
		
	}
	
	$scope.editRoom = function(){
		
	}
	
	$scope.deleteRoom = function(){
		
	}
	
});