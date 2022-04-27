var myApp = angular.module('test', ['ngCookies']);

myApp.controller('CookieCtrl', function ($scope, $rootScope, $cookieStore) {
    $scope.bump = function () {
        var lastVal = $cookieStore.get('lastValue');
        if (!lastVal) {
            $rootScope.lastVal = 1;
        } else {
            $rootScope.lastVal = lastVal + 1;
        }
        $cookieStore.put('lastValue', $rootScope.lastVal);
    }
});

myApp.controller('ShowerCtrl', function () {
});
