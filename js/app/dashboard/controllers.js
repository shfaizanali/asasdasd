var dash = angular.module('dash.controllers', []);

dash.controller('starbucksCtrl', function ($scope, $mdDialog, $mdMedia) {
	$scope.showDialog = function (ev) {
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
		
		$mdDialog.show({
			controller: DialogController,
			templateUrl: 'templates/dialogs/userStamp.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: true,
			fullscreen: useFullScreen
		})
		.then(function (answer) {
			console.log(answer);
			$scope.status = 'You said the information was "' + answer + '".';
		}, function() {
			$scope.status = 'You cancelled the dialog.';
		});
		
		$scope.$watch(function() {
			return $mdMedia('xs') || $mdMedia('sm');
		}, function(wantsFullScreen) {
			$scope.customFullscreen = (wantsFullScreen === true);
		});
	};

	function DialogController($scope, $mdDialog) {
		$scope.userProgress = 70;

		$scope.hide = function() {
			$mdDialog.hide();
		};
		
		$scope.cancel = function() {
			$mdDialog.cancel();
		};
		
		$scope.answer = function(answer) {
			$mdDialog.hide(answer);
		};
	}
});
