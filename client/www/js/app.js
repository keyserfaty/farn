
angular.module('starter', [
  'ionic', 
  'ionic-material', 
  'ngStorage',
  'ngCordova',
  'restangular',
  'starter.controllers', 
  'main.services'
  ])

// TODO bower install restangular --save
// TODO bower install ngstorage --save

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

// Restangular setup
.config(['RestangularProvider', function (RestangularProvider) {
  RestangularProvider.setBaseUrl("/api")
}])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
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
});