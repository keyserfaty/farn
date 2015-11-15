'use strict';

angular.module('activity.controller', [])
.controller('ActivityCtrl', function ($scope) {
	$scope.posts = [
		{
			user: 'Hola',
			date: 'November 15, 2015',
			thumb: 'img/ionic.png',
			fullimage: 'img/ionic.png',
			description: 'description',
			likes: 12,
			comments: 12
		},
		{
			user: '2do post',
			date: 'November 15, 2015',
			thumb: 'img/ionic.png',
			fullimage: 'img/ionic.png',
			description: 'description',
			likes: 12,
			comments: 12
		}
	];
	console.log('hola');
});