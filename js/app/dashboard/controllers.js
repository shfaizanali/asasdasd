var dash = angular.module('dash.controllers', []);

dash.controller('DashboardCtrl', function ($scope, $rootScope, DashboardService) {
	$scope.userProgress = 80;
	$scope.cards = [];

	$scope.showDialog = function (ev) {
		// $('#card-overlay').show();
	};

	$scope.$on('socket_message', function (event, args) {
		if (event.name == 'socket_message') {
			console.log(args);
			if (args.event == 'send_stamps_nearby' || args.event == 'redeem_reward') {
				var card = {};
				card.request_id = args.request_id;
				card.name = args.consumer_user_data.first_name + ' ' + args.consumer_user_data.last_name;
				card.stamper_id = args.consumer_user_data.stampr_id;
				card.image = args.consumer_user_data.fb_image_url;
				if (args.event == 'send_stamps_nearby') {
					card.type = 'stamp';
				}
				else if (args.event == 'redeem_reward') {
					card.type = 'reward';
				}
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
				$('.dialog-top').html('Tap a card to select the user');
			}
		}
	})

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

	$scope.selectCard = function(request_id, type) {
		if (type == 'stamp') {
			$('#'+request_id).addClass('stamp-select');
			$('#'+request_id+' .username').addClass('text-white');
			$('.dialog-top').html('Tap again to give stamp (Double tap to give stamp without selecting)');
		}
		else if (type == 'reward') {
			$('.dialog-top').html('Tap again to give reward');
			$('#'+request_id).addClass('reward-select');
			$('#'+request_id+' .username').addClass('reward-username');
		}
	}

	$scope.performAction = function (request_id, stamper_id, type) {
		if (type == 'stamp') {
			var giveStampPacket = {
				request_id: request_id,
				stamper_id: stamper_id
			}
			DashboardService.giveStamp(giveStampPacket)
			.then(function (res) {
				console.log(res);
				$('#'+request_id).css('background', '#8bc34a');
				$('#'+request_id+' .username').addClass('text-white');
				$('#'+request_id+' button').hide();
			}, function (err) {
				console.log(err);
			})
		}
		else if (type == 'reward') {
			console.log('give reward');
		}
	}

	$scope.deselectCard = function (request_id) {
		$('#'+request_id).removeClass('stamp-select');
		$('#'+request_id).removeClass('reward-select');
		$('#'+request_id+' .username').removeClass('text-white');
		$('#'+request_id+' .username').removeClass('reward-username');
		$('.dialog-top').html('Tap a card to select the user');
	}

});
