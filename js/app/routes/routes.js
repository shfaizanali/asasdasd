var app = angular.module('app.routes', []);

app.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider

		.state('login', {
			url: "/login",
			controller:'LoginCtrl',
			templateUrl: "templates/auth/login.html"
		})

		.state('dashboard', {
			url: "/dashboard",
			controller:'DashboardCtrl',
			templateUrl: "templates/dashboard/dashboard.html",
			resolve: {
				quote: function (DashboardService) {
					return DashboardService.getQuote();
				}
			}
		})

		.state('forgotPassword', {
			url: "/forgotPassword",
			controller:'forgotPasswordCtrl',
			templateUrl: "templates/auth/forgotPassword.html"
		});

		if (localStorage.getItem('userToken')) {
			$urlRouterProvider.otherwise('/dashboard');
		}
		else {
			$urlRouterProvider.otherwise('/login');
		}
});