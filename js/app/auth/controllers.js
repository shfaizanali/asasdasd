var auth = angular.module('auth.controllers', []);

auth.controller('LoginCtrl', function ($scope) {
	$scope.registerData = {};
	$scope.loginData = {};

	$scope.doRegister = function () {
		console.log($scope.registerData);
		console.log('function: doRegister');
	}

	$scope.doLogin = function () {
		console.log($scope.loginData);
		console.log('function: doLogin');
	}
});

auth.controller('forgotPasswordCtrl', function ($scope) {
	$scope.passwordData = {};

	$scope.doRequestNewPassword = function () {
		console.log($scope.passwordData);
		console.log('function: doRequestNewPassword');
	}
});