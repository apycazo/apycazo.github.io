
var core = angular.module('core');

function SetupRoutes ($routeProvider, $locationProvider) {

    // avoid bad encoding of ng routes from 'href' tags
    $locationProvider.hashPrefix('');

    var defaultPath = "/home";

    $routeProvider
        .when('/', {
            redirectTo: defaultPath
        })
        .when('/home', {
            templateUrl: 'pages/home/home.html',
            // controller : 'HomeController'
        })
        .when('/angular/base', {
            templateUrl: 'pages/angularjs/angularjs-base.html',
            // controller : 'HomeController'
        })
        .otherwise({
            redirectTo: defaultPath
        });
}

core.config(['$routeProvider', '$locationProvider', SetupRoutes]);
