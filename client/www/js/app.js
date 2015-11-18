
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

.run(function($ionicPlatform, $rootScope) {
  
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
});