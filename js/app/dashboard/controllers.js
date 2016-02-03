var dash = angular.module('dash.controllers', []);

dash.controller('DashboardCtrl', function ($scope, $rootScope, DashboardService, quote) {
	$scope.userProgress = 80;
	$scope.cards = [];
	$scope.quote = "No quote for today";
	console.log(quote);
	if (quote.results.length) {
		$scope.quote = quote.results[0].description;
	}

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
				card.product = args.card_detail.product;
				card.singleClickAction = false;
				card.doubleClickAction = false;
				card.selected = false;
				card.imageShadow = false;
				card.imageIcon = false;
				card.imageIconName = 'local_drink';
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
				$scope.$apply( function() {
					$scope.cards.push(card);
					$('#card-overlay').show();
				})
				console.log($scope.cards);
			}
			else if (args.event == 'notify_removal') {
				if ($scope.cards.length) {
					$scope.cards.forEach(function (item, i) {
						if (item.request_id == args.request_id) {
							$scope.$apply( function() {
								$scope.cards.splice(i, 1);
							})
						}
					})
				}
				$('.dialog-top').html('Tap a card to select the user');
				if (!$scope.cards.length) {
					$('#card-overlay').hide();
				}
			}
		}
	})

	$scope.removeCardAt = function (index) {
		$scope.cards.splice(index, 1);
		if (!$scope.cards.length) {
			$('#card-overlay').hide();
		}
	}

	$scope.selectCard = function(index) {
		if (!$scope.cards[index].selected) {
			$scope.cards[index].selected = true;
			$scope.cards[index].imageShadow = true;
			$scope.cards[index].imageIcon = true;
			if ($scope.cards[index].type == 'stamp') {
				$('#'+$scope.cards[index].request_id).addClass('stamp-select');
				$('#'+$scope.cards[index].request_id+' .username').addClass('text-white');
				$('.dialog-top').html('Tap again to give stamp (Double tap to give stamp without selecting)');
			}
			else if ($scope.cards[index].type == 'reward') {
				$('.dialog-top').html('Tap again to give reward');
				$('#'+$scope.cards[index].request_id).addClass('reward-select');
				$('#'+$scope.cards[index].request_id+' .username').addClass('reward-username');
			}
		}
		else {
			$scope.performAction(index);
		}
	}

	$scope.performAction = function (index) {
		var requestPacket = {
			request_id: $scope.cards[index].request_id,
			stamper_id: $scope.cards[index].stamper_id
		}
		if ($scope.cards[index].type == 'stamp') {
			DashboardService.giveStamp(requestPacket)
			.then(function (res) {
				console.log(res);
				$('#'+$scope.cards[index].request_id).addClass('action-performed');
				$('#'+$scope.cards[index].request_id+' .username').addClass('text-white');
				$('#'+$scope.cards[index].request_id+' button').hide();
				$scope.cards[index].singleClickAction = true;
				$scope.cards[index].doubleClickAction = true;
				$scope.cards[index].imageIconName = 'done';
				$('.dialog-top').html($scope.cards[index].product + ' stamp was given');
			}, function (err) {
				console.log(err);
			})
		}
		else if ($scope.cards[index].type == 'reward') {
			DashboardService.giveReward(requestPacket)
			.then(function (res) {
				console.log(res);
				$('#'+$scope.cards[index].request_id).addClass('action-performed');
				$('#'+$scope.cards[index].request_id+' .username').removeClass('reward-username');
				$('#'+$scope.cards[index].request_id+' .username').addClass('text-white');
				$('#'+$scope.cards[index].request_id+' button').hide();
				$scope.cards[index].singleClickAction = true;
				$scope.cards[index].doubleClickAction = true;
				$scope.cards[index].imageIconName = 'done';
				$('.dialog-top').html('Free ' + $scope.cards[index].product + ' is now available');
			}, function (err) {
				console.log(err);
			})
		}
	}

	$scope.deselectCard = function (request_id, index) {
		$scope.cards[index].selected = false;
		$scope.cards[index].imageShadow = false;
		$scope.cards[index].imageIcon = false;
		$('#'+request_id).removeClass('stamp-select');
		$('#'+request_id).removeClass('reward-select');
		$('#'+request_id+' .username').removeClass('text-white');
		$('#'+request_id+' .username').removeClass('reward-username');
	}

});
