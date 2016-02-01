var services = angular.module('services');

services.factory('Authentication', function ($q, requestManager, API_URLS) {
	
	function login(data) {
		var deferred = $q.defer();
		var url = API_URLS.base + API_URLS.login;
		requestManager.post(url, data)
		.then(function (res) {
			deferred.resolve(res);
		}, function (err) {
			deferred.reject(err);
		})
		return deferred.promise;
	}

	function register(data) {
		var deferred = $q.defer();
		var url = API_URLS.base + API_URLS.register;
		requestManager.post(url, data)
		.then(function (res) {
			deferred.resolve(res);
		}, function (err) {
			deferred.reject(err);
		})
		return deferred.promise;
	}

	function resetPassword(data) {
		var deferred = $q.defer();
		var url = API_URLS.base + API_URLS.forgotPassword;
		requestManager.post(url, data)
		.then(function (res) {
			deferred.resolve(res);
		}, function (err) {
			deferred.reject(err);
		})
		return deferred.promise;
	}

	return {
		login: login,
		register: register,
		resetPassword: resetPassword
	}
})