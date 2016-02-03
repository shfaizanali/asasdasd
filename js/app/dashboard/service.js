var services = angular.module('services');

services.factory('DashboardService', function ($q, requestManager, API_URLS) {
	function giveStamp(data) {
		var deferred = $q.defer();
		var url = API_URLS.base + API_URLS.giveStamp;
		requestManager.postWithAuthorization(url, data)
		.then(function (res) {
			deferred.resolve(res);
		}, function (err) {
			deferred.reject(err);
		})
		return deferred.promise;
	}

	function giveReward(data) {
		var deferred = $q.defer();
		var url = API_URLS.base + API_URLS.giveReward;
		requestManager.postWithAuthorization(url, data)
		.then(function (res) {
			deferred.resolve(res);
		}, function (err) {
			deferred.reject(err);
		})
		return deferred.promise;
	}

	function getQuote() {
		var deferred = $q.defer();
		var url = API_URLS.base + API_URLS.quotes;
		requestManager.getWithAuthorization(url, {})
		.then(function (res) {
			deferred.resolve(res);
		}, function (err) {
			deferred.reject(err);
		})
		return deferred.promise;
	}

	return {
		giveStamp: giveStamp,
		giveReward: giveReward,
		getQuote: getQuote
	}
})