var app = angular.module('Controllers', ['Factories']);

// MainController, available in entire app
app.controller('MainController', function($scope){
	
});

// UserController
app.controller('UserController', function($scope, UserFactory){
	
	$scope.login = function(){
		UserFactory.login($scope.userName, $scope.password)
			.then(function(data) {
				console.log(data.data);
			},function(reason) {
				console.log(reason.data);
			});
	}
	
	$scope.register = function(){
		UserFactory.register($scope.firstName, $scope.lastName, $scope.email,
													$scope.pnumber, $scope.password)
			.then(function(data) {
				console.log(data.data);
			},function(reason) {
				console.log(reason.data);
			});
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