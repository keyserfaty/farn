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
        $scope.name = place.properties.title;
        $scope.description = place.properties.description;
        $scope.images = place.images[0];
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

    api.places().getList()
    .then(function (places) {
        let 
            map = L.map('map'),
            config = {
              attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
              '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
              'Imagery © <a href="http://mapbox.com">Mapbox</a>',
              mapid: 'okbel.o5mboocj',
              accesstoken: 'pk.eyJ1Ijoib2tiZWwiLCJhIjoiY2lnbWNjbzQ3MDIxMHVubHp3dGVwbXVnaSJ9.SjPEGzzlgpvcmR_OaziFmw',
              };

        L.tileLayer('https://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={accesstoken}', config).addTo(map);
        L.geoJson(places).addTo(map); 

        function onLocationFound(e) {
            var radius = e.accuracy / 2;
            L.marker(e.latlng).addTo(map).bindPopup("Estás a " + radius + " metros de este punto").openPopup();
            L.circle(e.latlng, radius).addTo(map);
        }

        function onLocationError(e) {
            console.log(e.message);
        }

        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);

        map.locate({setView: true, maxZoom: 16});
        
    })

}]);
