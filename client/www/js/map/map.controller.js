'use strict';

angular.module('map.controller', ['ionic'])

.controller('GeoCtrl', ['api', '$http', '$rootScope', '$scope', '$ionicModal',
  function (api, $http, $rootScope, $scope, $ionicModal) {

    // Modal handler
    $ionicModal.fromTemplateUrl('../../templates/modalmarker.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function(placeID) {
      api.place(placeID).get()
      .then(function (place) {
        // TODO: should bring placeID from map html
        // $scope.name = place.properties.title;
        // $scope.description = place.properties.description;
        // $scope.images = place.images[0];

        $scope.name = 'title';
        $scope.description = 'description';
        $scope.images = 'images';
        $scope.button = 'Add new post on this place';
        // brings modal
        $scope.modal.show();
      });
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    // Event handlers
    $scope.$on("$ionicView.enter", function(event) {
      $rootScope.mapEnabled = 1;
    });

    $scope.$on("$ionicView.leave", function(event) {
      $rootScope.mapEnabled = 0;
    });

    L.mapbox.mapid = 'okbel.o5mboocj';
    L.mapbox.accessToken = 'pk.eyJ1Ijoib2tiZWwiLCJhIjoiY2lnbWNjbzQ3MDIxMHVubHp3dGVwbXVnaSJ9.SjPEGzzlgpvcmR_OaziFmw';

    var map = L.mapbox.map('map', 'mapbox.streets', {
      center: [-34.606852, -58.352873],
      zoom: 13
    });

    var myLayer = L.mapbox.featureLayer().addTo(map);

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    // No tocar
    $http.get('https://api.mapbox.com/v4/' + L.mapbox.mapid + '/features.json?access_token=' + L.mapbox.accessToken)
    .then(function(res){
      var geojsonFeature = res.data;
      myLayer.setGeoJSON(geojsonFeature).on('click', function(elem){
        $scope.openModal();
      })
    }, function(err){
      console.log('Error getting markers', err);
    });

    function onLocationFound(e) {
      var radius = e.accuracy / 2;
      L.marker(e.latlng).addTo(map).bindPopup("Estás a " + radius + " metros de este punto").openPopup();
      L.circle(e.latlng, radius).addTo(map);
    }

    function onLocationError(e) {
      console.log(e.message);
    }

    
    map.locate({setView: false, maxZoom: 16});

  }]);
