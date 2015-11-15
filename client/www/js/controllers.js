angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $http, $ionicPopover) {

})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {

})

.controller('GeoCtrl', function($http) {
  var map = L.map('map');

  var config = {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    mapid: 'okbel.o5mboocj',
    accesstoken: 'pk.eyJ1Ijoib2tiZWwiLCJhIjoiY2lnbWNjbzQ3MDIxMHVubHp3dGVwbXVnaSJ9.SjPEGzzlgpvcmR_OaziFmw',
  };

  L.tileLayer('https://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={accesstoken}', config).addTo(map);

  // Markers
  $http.get('https://api.mapbox.com/v4/' + config.mapid + '/features.json?access_token=' + config.accesstoken)
  .then(function(res){
    var geojsonFeature = res.data.features;
    L.geoJson(geojsonFeature).addTo(map);
  }, function(){
    console.log('error getting markers');
  });

  // random red circle
  var circle = L.circle([-34.605519, -58.37413699999999], 187, {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5
    }).addTo(map);

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
});
