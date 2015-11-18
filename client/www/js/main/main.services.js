'use strict';

angular.module('main.services', [])

// TODO: add header to every request when there is a token present
.factory('HeaderRestangular', ['Restangular', '$localStorage', function (Restangular, $localStorage) {

  return Restangular.withConfig(function (RestangularConfigurer) {
    // TODO: save token to localStorage from cb end
    if ($localStorage.token !== undefined) {
      RestangularConfigurer.setDefaultHeaders({'Authorization': 'Bearer ' + $localStorage.token });
    }

  });
}])

.factory('api', ['HeaderRestangular', '$routeParams', function (HeaderRestangular, $routeParams) {

  return {
  	places: function () {
      // '/'
  		return HeaderRestangular.all('place');
  	},
  	place: function () {
      // '/place/:id'
  		return HeaderRestangular.one('place', $routeParams._id);
  	},
    users: function () {
      return HeaderRestangular.all('user');
    },
    user: function () {
      return HeaderRestangular.one('user', $routeParams._id);
    }
  }

}])