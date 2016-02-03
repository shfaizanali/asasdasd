var module;

module = angular.module('manager', [
	'ui.router',
	'ngMaterial',
	'app.routes',
	'ngMessages',
	'ngMdIcons',
	'auth.controllers',
	'dash.controllers',
	'services'
]);

module.constant('WS_URL', 'ws://staging.api.stamprapp.com:8500');

module.constant('API_URLS', {
	// base: 'http://0.0.0.0:8000/',
	base: 'http://staging.api.stamprapp.com/',
	login: 'login/business/',
	register: 'accounts/register/manager/',
	forgotPassword: 'accounts/forget_password/',
	giveStamp: 'api-give/stamp/',
	giveReward: 'api-give/reward/',
	quotes: 'quotes/'
});

module.run(function (socket) {
	if (localStorage.getItem('userToken')) {
		var connected_socket = socket.connect();
	}
});

module.config( function ($httpProvider, $sceDelegateProvider, $mdThemingProvider, $stateProvider, $urlRouterProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];

	$mdThemingProvider.definePalette('stamprPink', {
		'50': 'ffebee',
		'100': 'ffcdd2',
		'200': 'ef9a9a',
		'300': 'e57373',
		'400': 'ef5350',
		'500': 'e91e63',
		'600': 'e53935',
		'700': 'd32f2f',
		'800': 'c62828',
		'900': 'b71c1c',
		'A100': 'ff8a80',
		'A200': 'ff5252',
		'A400': 'ffffff',
		'A700': 'ffffff',
		'contrastDefaultColor': 'light',    // whether, by default, text (contrast)
		// on this palette should be dark or light
		'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
			'200', '300', '400', 'A100'],
		'contrastLightColors': undefined
	});

	$mdThemingProvider.theme('default').primaryPalette('stamprPink')
	$sceDelegateProvider.resourceUrlWhitelist([
		'self',
		'http://api.stamprapp.com/**'
	]);
});

var services = angular.module('services', []);
