'use strict';

const
  mongoose = require('mongoose');

const
  Place = require('./place.model');

mongoose.Promise = global.Promise; // ES6 mongoose implementation


exports.list = function (req, res){
  let criteria = {showHidden: 0};
  criteria = req.query;

  Place.list(criteria).then(function(place) {
    res.status(200).send(place);
  })
  .catch(function(err) {
    res.status(200).send({ error: 'No data', details: 'No place Found ', message: err.message });
  });

};

// TODO: no error handling
exports.insert = function (collection){
  Place.insert(collection, function(collection) {
    res.status(200).send({ details: 'Collection added to db', collection: collection});
  });
};

exports.add = function (req, res){
  let place = new Place(),
      attributes = JSON.parse(JSON.stringify(req.body));

  place.set(attributes);

  Place.add(place)
    .then(function(place) {
      console.log('New place Created:', place);
      res.status(201).send(place);
    })
    .catch(function(err) {
      res.status(422).send({ error: 'Bad Request', details: 'Place cannot be added.', message: err.message });
    }); 
};

exports.get = function (req, res){
  let placeID = req.params._id;

  Place.get(placeID)
  .then(function (place) {
    res.send(place);
  })
  .catch(function(err) {
    res.status(404).send({ error: 'Bad Request', details: 'place Not Found.', message: err.message });
  });
};

exports.edit = function (req, res){
  let placeID = req.params._id,
    attributes = JSON.parse(JSON.stringify(req.body));

  Place.edit(placeID, attributes)
    .then(function(place) {
      Place.get(placeID)
      .then(function(place) {
          res.send(place);
      })
      .catch(function(err) {
          res.status(404).send({ error: 'Bad Request', details: 'place Not Found.', message: err.message });
      });
    })
    .catch(function(err) {
        res.status(400).send({ error: 'Bad Request', details: 'place cannot be edited, ' + err.message });
    }); 
};

exports.del = function (req, res){
  let placeID = req.params._id;

  Place.del(placeID)
    .then(function(id) {
    res.status(204).end();
    })
    .catch(function(err) {
        res.status(400).send({ error: 'Bad Request', details: 'place cannot be deleted, ' + err.message });
    }); 
};
