'use strict';

angular.module('starter', [
  'ionic', 
  'ionic-material', 
  'ui.router',
  'ngStorage',
  'ngCordova',
  'ngRoute',
  'restangular', 
  'main.services',
  'modal.controller',
  'modal.services',
  'slider.controller',
  'slider.services',
  'map.controller',
  'news.controller',
  'login.controller',
  'login.services',
  'activity.controller'
  ])

.run(['$ionicPlatform', '$rootScope', 'api',
  function($ionicPlatform, $rootScope, api) {
  
  window.all = $rootScope; // Expose
  $rootScope.mapEnabled = 0;

  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  // // Create Map
  // let map = L.map('map');

  // // Config Map
  // let config = {
  //     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
  //     '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
  //     'Imagery © <a href="http://mapbox.com">Mapbox</a>',
  //     mapid: 'okbel.o5mboocj',
  //     accesstoken: 'pk.eyJ1Ijoib2tiZWwiLCJhIjoiY2lnbWNjbzQ3MDIxMHVubHp3dGVwbXVnaSJ9.SjPEGzzlgpvcmR_OaziFmw',
  // };

  // L.tileLayer('https://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={accesstoken}', config).addTo(map);
  
  // // Markers
  // $http.get('https://api.mapbox.com/v4/' + config.mapid + '/features.json?access_token=' + config.accesstoken)
  // .then(function (res) {
  //     let geojsonFeature = res.data.features;
  //     L.geoJson(geojsonFeature).addTo(map);

  //     // Make POST to places
  //     // api.places().getList()
  //     // .then(function (places) {
  //     //   places.post(geojsonFeature);
  //     // });

  // }, function(){
  //     console.log('error getting markers');
  // });

}])

// Restangular setup
.config(['RestangularProvider', function (RestangularProvider) {
  RestangularProvider.setBaseUrl("/api")
}])

.config(['$stateProvider', '$urlRouterProvider',  
  function($stateProvider, $urlRouterProvider) {

  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })
  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html'
      }
    }
  })
  .state('app.activity', {
      url: '/activity',
      views: {
          'menuContent': {
              templateUrl: 'templates/activity.html',
              controller: 'ActivityCtrl'
          }
      }
  })
  .state('app.login', {
      url: '/login',
      views: {
          'menuContent': {
              templateUrl: 'templates/login.html',
              controller: 'LoginCtrl'
          }
      }
  })
  .state('app.geolocal', {
      url: '/geolocal',
      views: {
        'menuContent': {
          templateUrl: 'templates/geolocal.html',
          controller: 'GeoCtrl'
        }
      }
  });
  
  $urlRouterProvider.otherwise('/app/home');
}]);