var app = angular.module('app.routes', []);

app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider

		.state('login', {
			url: "/login",
			controller:'LoginCtrl',
			templateUrl: "templates/auth/login.html"
		})

		.state('starbucks', {
			url: "/starbucks",
			controller:'starbucksCtrl',
			templateUrl: "templates/dashboard/starbucks.html"
		})

		.state('forgotPassword', {
			url: "/forgotPassword",
			controller:'forgotPasswordCtrl',
			templateUrl: "templates/auth/forgotPassword.html"
		});

		$urlRouterProvider.otherwise('/login');
});