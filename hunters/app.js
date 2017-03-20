
var core = angular.module('hunters',[]);

function MasterCtrl ($scope)
{
    $scope.text = 'sample text';
}

core.controller('MasterCtrl', ['$scope', MasterCtrl]);

core.run(['$rootScope', '$window', '$location', function ($rootScope, $window, $location) {


    $rootScope.configureCarousel = function (interval) {

        if (typeof interval === 'undefined') {
            interval = 5000;
        }

        $('.carousel').carousel({
            interval: interval
        })
    }

    $rootScope.openLink = function (target) {
        $window.open(target, $location.absUrl());
    }

    // Added a -50 pixel elem position fix to accomodate navbar gap
    $rootScope.navigateTo = function (eID) {

        // $location.hash(eID)
        var navbarGap = 50;

        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }

        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

        var startY = currentYPosition();
        var stopY = elmYPosition(eID) - navbarGap;
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 100);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 25);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }

    }

}]);
