var services = angular.module('services');

services.factory('socket', function ($rootScope, WS_URL, $log) {
		
	var socket = null;
	var ping_interval = null;
	var reconect_timeout = null;
	var reconect_interval = 2;

	var model = {
		getConnectedSocket: function() {
			return socket;
		},

		clear_interval_timeout: function() {
			clearInterval(ping_interval);
			clearTimeout(reconect_timeout);
			if (socket) {
				socket.close();
			}
		},

		start_ping: function() {
			ping_interval = setInterval(function () {
				if(!socket || !localStorage.getItem('userToken')) {
					return model.clear_interval_timeout();
				}
				socket.send(JSON.stringify(
					{command: 'authenticate',
					 ping: "ping"}
				));
			}, 5 * 1000);
		},

		connect: function() {
			socket = new WebSocket(WS_URL);
			
			socket.onopen = function() {
				reconect_interval = 2;
				$log.debug("Socket Connected! Sending token to authenticate.");
				socket.send(JSON.stringify({
					command: 'authenticate',
					token: localStorage.getItem('userToken')
				}));
			};
			
			socket.onmessage = function (event) {
				var data;
				data = JSON.parse(event.data);

				if (data.type == "event" && data.event == "authenticated") {
					$log.debug("User Authenticated by Websocket!");
					model.start_ping();
				}
				$rootScope.$broadcast('socket_message', data);
			};

			socket.onclose = function(e) {
				$log.debug("socket connection getting closed.");
				if (localStorage.getItem('userToken')) {
					$log.debug('reconnecting after ' + reconect_interval + ' seconds');
					// reconecct after 5 seconds
					reconect_timeout = setTimeout(function() {model.connect();}, reconect_interval * 1000);
					reconect_interval += 2;
				}
				else {
					$log.debug("no need to reconnect socket since user has logged out.")
					clearInterval(ping_interval);
					clearTimeout(reconect_timeout);
					socket = null;
				}
			};
			return socket;
		}
	};
	return model;
});