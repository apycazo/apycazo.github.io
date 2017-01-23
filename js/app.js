// -----------------------------------------------------------------------------
// Angular module init
// -----------------------------------------------------------------------------
var core = angular.module('core',['hljs']);

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
