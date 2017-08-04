var app = angular.module('Controllers', ['Factories']);

// MainController, available in entire app
app.controller('MainController', function($scope, UserFactory){
	$scope.currentDate = new Date(Date.now());
	
	$scope.isLogged = function() {
    return UserFactory.isLogged();
  }

  $scope.logOut = function() {
    UserFactory.logOut().then(function(data) {
			UserFactory.setLogged(false);
      $location.url("/login");
    }, function(reason) {
      console.log(reason.data);
    });
  }
});

// UserController
app.controller('UserController', function($scope, $location, UserFactory){

	$scope.login = function(){
		UserFactory.login($scope.userName, $scope.password)
			.then(function(data) {
				console.log(data.data);
				var token = data.data.token;
				UserFactory.setToken(token);
				var user = data.data.user;
				UserFactory.setUser(user);

				UserFactory.setUserId(data.data.id);
				UserFactory.setToken(data.data.token);
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
	$scope.reservationList = [];
	/*
	$scope.reservableTimes = [
		{"time":"17:00", "reservee":"Varaaja 1"},
		{"time":"18:30", "reservee":"Varaaja 2"},
		{"time":"20:00", "reservee":"Varaaja 3"}
	];
	*/
	
	// Get list of rooms for select dropdown
	$scope.initRooms = function(){
		RoomFactory.getRooms().then(function(data){
			$scope.roomList = data.data;
			$scope.selectedRoom = $scope.roomList[0];
		},function(reason){
			console.log(reason.data);
		});
	};

	$scope.makeReservation = function(){
		UserFactory.getUserById(UserFactory.getUserId()).then(
			function(data) {
				var userInfo = {
					user_id:data.data._id,
					name:data.data.name,
					email:data.data.email,
					phonenumber:data.data.phonenumber
				};
				
				ReservationFactory.makeReservation($scope.selectedRoom._id, $scope.selectedRoom.name,
																					userInfo, $scope.startTime, $scope.endTime)
					.then(function(data) {
						//console.log("Reservation made");
						//console.log(data.data);
					},function(reason) {
						console.log(reason.data);
					});
				
			},function(reason) {
				console.log(reason.data);
			});
	};

	$scope.findReservationsByRoom = function(roomId){
		ReservationFactory.findReservationsByRoom($scope.selectedRoom._id)
			.then(function(data) {
				//console.log(data.data);
				var list = data.data;
				for(var i = 0; i < list.length; i++) {
					list[i].time_start = new Date(list[i].time_start).getHours() + ":" +
																new Date(list[i].time_start).getFullMinutes();
					list[i].time_end = new Date(list[i].time_end).getHours() + ":" +
																new Date(list[i].time_end).getFullMinutes();
				}
				$scope.reservationList = list;
			},function(reason) {
				console.log(reason.data);
			});
	};

	$scope.findReservationsByUser = function(userId){

	};

	$scope.findReservationsByRoomAndTime = function(){
		ReservationFactory.findReservationsByRoomAndTime(
					$scope.selectedRoom._id, $scope.currentDate, $scope.currentDate)
			.then(function(data) {
				console.log(data.data);
				reservationList = data.data;
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
