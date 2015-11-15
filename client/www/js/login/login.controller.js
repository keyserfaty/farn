'use strict';

angular.module('login.controller', [])
.controller('LoginCtrl', ['loginService', '$scope', 
	function (loginService, $scope) {
	$scope.login = loginService.login;
}]);