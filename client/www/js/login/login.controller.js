'use strict';

angular.module('login.controller', [])
.controller('LoginCtrl', ['loginService', function (loginService) {
	$scope.login = loginService.login;
}]);