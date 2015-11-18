'use strict';

const 
  request = require('request');

const
  Place = require('./api/place/place.model');

// config params from mapbox
let config = {
    mapid: 'okbel.o5mboocj',
    accesstoken: 'pk.eyJ1Ijoib2tiZWwiLCJhIjoiY2lnbWNjbzQ3MDIxMHVubHp3dGVwbXVnaSJ9.SjPEGzzlgpvcmR_OaziFmw'
};

exports.getMap = function () {
  request('https://api.mapbox.com/v4/' + config.mapid + '/features.json?access_token=' + config.accesstoken, 
    function (error, response, collection) {
    
    if (!error && response.statusCode == 200) {
      Place.insert(JSON.parse(collection).features);
      console.log('Collection added to db successfully');
      return;
    }

    console.log('There has been an error');
    
  });
};
