var app = angular.module('Routes', ['ngRoute', 'Controllers']);

app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

app.config(function($routeProvider) {

	$routeProvider.when("/", {
			controller:"MainController"

	}).when("/login", {
			controller:"UserController",
			templateUrl:"views/loginView.html"

	}).when("/register", {
			controller:"UserController",
			templateUrl:"views/registerView.html"

	}).when("/account", {
			controller:"UserController",
			templateUrl:"views/accountView.html"

	}).when("/reservation", {
			controller:"ReservationController",
			templateUrl:"views/reservationView.html"

  }).
	otherwise({redirectTo:"/reservation"});

});
