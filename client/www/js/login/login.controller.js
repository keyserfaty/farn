'use strict';

angular.module('login.controller', [])
.controller('LoginCtrl', ['$scope', 'loginService',
	function ($scope, loginService) {
	
	$scope.login = loginService.login;

}]);