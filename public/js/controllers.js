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
app.controller('ReservationController', function($scope, UserFactory, ReservationFactory){

	$scope.makeReservation = function(){
		ReservationFactory.makeReservation(/*this needs roomId*/ $scope.selectedRoom,
																			$scope.user, $scope.startTime, $scope.endTime)
			.then(function(data) {
				console.log(data.data);
			},function(reason) {
				console.log(reason.data);
			});
	}

	$scope.findReservationsByRoom = function(roomId){

	}

	$scope.findReservationsByUser = function(userId){

	}

	$scope.findReservationsByTime = function(){
		ReservationFactory.findReservationsByTime($scope.startTime, $scope.endTime)
			.then(function(data) {
				console.log(data.data);
			},function(reason) {
				console.log(reason.data);
			});
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
