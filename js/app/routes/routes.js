var app = angular.module('app.routes', []);

app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

        .state('login', {
            url: "/login",
            controller:'LoginCtrl',
            templateUrl: "templates/auth/login.html"
        });



        $urlRouterProvider.otherwise('/login');
});