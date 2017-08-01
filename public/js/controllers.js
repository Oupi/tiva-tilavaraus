var app = angular.module('Controllers', ['Factories']);

// MainController, available in entire app
app.controller('MainController', function($scope){

});

// UserController
app.controller('UserController', function($scope, $location, UserFactory){

	$scope.login = function(){
		UserFactory.login($scope.userName, $scope.password)
			.then(function(data) {
				console.log(data.data);

				UserFactory.setLogged(true);

        $location.url("/reservation");
			},function(reason) {
				console.log(reason.data);
			});
	};

	$scope.register = function(){
		$("#reg-user-info").removeClass("alert alert-success alert-danger");
		UserFactory.register($scope.firstName, $scope.lastName, $scope.email,
													$scope.pnumber, $scope.password)
			.then(function(data) {
				console.log(data.data);
				// If registering is successful, show this message to user.
				$("#reg-user-info").text("Käyttäjätunnus luotu onnistuneesti.");
				$("#reg-user-info").addClass("alert alert-success");
			},function(reason) {
				console.log(reason.data);
				// If registering fails, show this message to user.
				$("#reg-user-info").text("Sähköpostiosoite on jo käytössä.");
				$("#reg-user-info").addClass("alert alert-danger");
			});
	};

	$scope.editUser = function(){

	};

	$scope.deleteUser = function(userId){

	};

});

// ReservationController
app.controller('ReservationController', function(
	$scope, UserFactory, ReservationFactory, RoomFactory){

	$scope.roomList = [];
	$scope.reservableTimes = [
		{"time":"17:00", "reservee":"Varaaja 1"},
		{"time":"18:30", "reservee":"Varaaja 2"},
		{"time":"20:00", "reservee":"Varaaja 3"}
	];

	// Get list of rooms for select dropdown
	var init = function(){
		RoomFactory.getRooms().then(function(data){
			roomList = data.data;
			console.log(roomList);
		},function(reason){
			console.log(reason.data);
		});
	};

	$scope.makeReservation = function(){
		ReservationFactory.makeReservation(/*this needs roomId*/ $scope.selectedRoom,
																			$scope.user, $scope.startTime, $scope.endTime)
			.then(function(data) {
				console.log(data.data);
			},function(reason) {
				console.log(reason.data);
			});
	};

	$scope.findReservationsByRoom = function(roomId){

	};

	$scope.findReservationsByUser = function(userId){

	};

	$scope.findReservationsByTime = function(){
		ReservationFactory.findReservationsByTime($scope.startTime, $scope.endTime)
			.then(function(data) {
				console.log(data.data);
			},function(reason) {
				console.log(reason.data);
			});
	};

	$scope.removeReservation = function(reservationId){

	};

	// Uncomment once getRooms() is implemented
	// init();

});

// RoomController
app.controller('RoomController', function($scope, RoomFactory){

	$scope.createRoom = function(){

	};

	$scope.editRoom = function(){

	};

	$scope.deleteRoom = function(){

	};

});

app.controller('UiController', function($scope, $location, UserFactory) {
  $scope.isLogged = function() {
    return UserFactory.isLogged();
  }

  $scope.logOut = function() {
    //UserFactory.logOut(UserFactory.getUser()).then(function(data) {
			UserFactory.setLogged(false);
      $location.url("/login");
    //}, function(reason) {
      //console.log(reason.data);
    //});
  }
});
