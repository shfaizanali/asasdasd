var services = angular.module('services');

services.factory('requestManager', function ($q, $http, $httpParamSerializer) {

	function get (url, data) {
		var deferred = $q.defer();
		var req = {
			method: 'GET',
			url: url,
			data: data
		}
		$http(req)
		.success(function (response) {
			deferred.resolve(response);
		})
		.error(function (err) {
			deferred.reject(err);
		});
		return deferred.promise;
	}

	function post (url, data) {
		var deferred = $q.defer();
		var req = {
			method: 'POST',
			url: url,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: $.param(data)
		}
		$http(req)
		.success(function (response) {
			deferred.resolve(response);
		})
		.error(function (err) {
			deferred.reject(err);
		});
		return deferred.promise;
	}

	return {
		get: get,
		post: post
	}
});
