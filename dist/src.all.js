// -----------------------------------------------------------------------------
// Angular module init
// -----------------------------------------------------------------------------
var core = angular.module('core',['ngRoute','hljs']);

var masterController = function ($rootScope, $scope, $window) {

    angular.extend($scope, {
        goToGithub: function () {
            $window.open('https://github.com/apycazo/codex/tree/master/codex-angularjs-base/ecma6', '_blank');
        }
    });

    return {}
}

// Configure system
core.config(function(hljsServiceProvider) {

    // Configure angular-highlightjs provider
    hljsServiceProvider.setOptions({
        // replace tab with 4 spaces
        tabReplace: '    '
    });
});

// core.run([ '$rootScope', '$window', sharedFunctions ]);

core.controller('masterController', [ '$rootScope', '$scope', '$window', masterController ]);


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

var core = angular.module('core');

function HomeCtrl ($scope) {

}

core.controller('HomeCtrl', ['$scope', HomeCtrl]);
