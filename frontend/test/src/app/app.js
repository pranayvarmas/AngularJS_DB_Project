var app =
angular.module('test', ['ngCookies']);

app.controller('CookiesController', function(
$scope, $window, $cookies) {
$scope.SetCookies = function() {
    $cookies.put("username", $scope.username);
};

$scope.GetCookies = function() {
    $window.alert($cookies.get('username'));
};

$scope.ClearCookies = function() {
    $cookies.remove('username');
};

});
