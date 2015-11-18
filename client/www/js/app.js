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

    // TODO this is a test to check if post collection is working 

    let json = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
            "id": "marker-igzmcwv11",
            "title": "Reserva Ecológica Costanera Sur",
            "description": "Lorem Ipsum ",
            "marker-size": "medium",
            "marker-color": "#9c89cc",
            "marker-symbol": "park2"
          },
          "geometry": {
            "coordinates": [
              -58.353023,
              -34.606084
            ],
            "type": "Point"
          },
          "id": "4e7f954986b8ee3cf78e408622658b0e"
        },
        {
          "type": "Feature",
          "properties": {
            "title": "",
            "description": "",
            "stroke": "#1087bf",
            "stroke-width": 4,
            "stroke-opacity": 1,
            "fill": "#1087bf",
            "fill-opacity": 0.20000000298023224
          },
          "geometry": {
            "coordinates": [
              [
                [
                  -58.378772,
                  -34.5969
                ],
                [
                  -58.378429,
                  -34.60898
                ],
                [
                  -58.351564,
                  -34.608839
                ],
                [
                  -58.353624,
                  -34.598595
                ],
                [
                  -58.379287,
                  -34.596617
                ],
                [
                  -58.378772,
                  -34.5969
                ]
              ]
            ],
            "type": "Polygon"
          },
          "id": "50a4f06e3ccbfd61ce8f86daf01bb86a"
        },
        {
          "type": "Feature",
          "properties": {
            "id": "marker-igzq0ap11",
            "title": "",
            "description": "",
            "marker-size": "medium",
            "marker-color": "#fa946e",
            "marker-symbol": ""
          },
          "geometry": {
            "coordinates": [
              -58.372249,
              -34.614844
            ],
            "type": "Point"
          },
          "id": "53631f984ea56b07a636f02894bda01b"
        },
        {
          "type": "Feature",
          "properties": {
            "id": "marker-ih0qloc40",
            "title": "asdasd",
            "description": "sdasdsdsa",
            "marker-size": "medium",
            "marker-color": "#1087bf",
            "marker-symbol": ""
          },
          "geometry": {
            "coordinates": [
              -58.385467,
              -34.598171
            ],
            "type": "Point"
          },
          "id": "6a6c6025a921d463ee9147d1a61a88df"
        },
        {
          "type": "Feature",
          "properties": {
            "id": "marker-igzpitnq0",
            "title": "another",
            "description": "",
            "marker-size": "medium",
            "marker-color": "#1087bf",
            "marker-symbol": ""
          },
          "geometry": {
            "coordinates": [
              -58.374136,
              -34.605519
            ],
            "type": "Point"
          },
          "id": "6d8d87732eded198feb4be41abff230d"
        }
      ],
      "id": "okbel.o5mboocj"
    };
    api.places().post(json.features);
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



  // }, function(){
  //     console.log('error getting markers');
  // });
  


}])

// Restangular setup
.config(['RestangularProvider', function (RestangularProvider) {
  RestangularProvider.setBaseUrl("http://localhost:3000/api")
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