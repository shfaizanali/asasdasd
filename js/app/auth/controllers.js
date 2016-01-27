var auth = angular.module('auth.controllers', []);

auth.controller('LoginCtrl', function ($scope, $state, Authentication) {
	$scope.registerData = {};
	$scope.loginData = {};
	$scope.registerMessage = "";
	$scope.loginMessage = "";
	$scope.loading = false;

	$scope.doRegister = function () {
		$scope.loading = true;
		Authentication.register($scope.registerData)
		.then(function (res) {
			$scope.loading = false;
			if (!res.success) {
				$scope.registerMessage = res.message;
			}
			else {
				$scope.registerMessage = "";
				localStorage.setItem('userToken', res.token);
				localStorage.setItem('userId', res.user.id);
				localStorage.setItem('userEmail', res.user.email);
				localStorage.setItem('businessName', res.user.business_name);
				$state.go('dashboard');
			}
		}, function (err) {
			$scope.loading = false;
			console.log(err);
			$scope.registerMessage = err;
		});
	}

	$scope.doLogin = function () {
		$scope.loading = true;
		Authentication.login($scope.loginData)
		.then(function (res) {
			$scope.loading = false;
			if (!res.token) {
				$scope.loginMessage = "No user exists with the given combination of email and password";
			}
			else {
				$scope.loginMessage = "";
				localStorage.setItem('userToken', res.token);
				$state.go('dashboard');
			}
		}, function (err) {
			$scope.loading = false;
			console.log(err);
			$scope.loginMessage = err;
		});
	}
});

auth.controller('forgotPasswordCtrl', function ($scope) {
	$scope.passwordData = {};

	$scope.doRequestNewPassword = function () {
		console.log($scope.passwordData);
		console.log('function: doRequestNewPassword');
	}
});