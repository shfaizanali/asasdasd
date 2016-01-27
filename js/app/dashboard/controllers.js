var dash = angular.module('dash.controllers', []);

dash.controller('DashboardCtrl', function ($scope, $rootScope) {
	$scope.userProgress = 80;
	$scope.cards = [];

	$scope.showDialog = function (ev) {
		// $('#card-overlay').show();
	};

	$scope.removeCard = function (request_id) {
		if ($scope.cards.length) {
			$scope.cards.forEach(function (item, i) {
				if (item.request_id == request_id) {
					$scope.cards.splice(i, 1);
					if (!$scope.cards.length) {
						$('#card-overlay').hide();
					}
				}
			})
		}
	}

	$scope.$on('socket_message', function (event, args) {
		if (event.name == 'socket_message') {
			console.log(args);
			if (args.event == 'send_stamps_nearby') {
				var card = {};
				card.request_id = args.request_id;
				card.name = args.consumer_user_data.first_name + ' ' + args.consumer_user_data.last_name;
				card.image = args.consumer_user_data.fb_image_url;
				if (args.card_detail.stamps && args.card_detail.total_stamps) {
					card.stamps = (args.card_detail.stamps / args.card_detail.total_stamps) * 100;
					card.stamps = card.stamps.toFixed(0);
				}
				else {
					card.stamps = 0;
				}
				$scope.$apply(function() {
					$scope.cards.push(card);
					$('#card-overlay').show();
				})
				console.log($scope.cards);
			}
			else if (args.event == 'notify_removal') {
				$scope.removeCard(args.request_id);
			}
		}
	})

});
