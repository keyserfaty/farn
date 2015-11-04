'use strict';

const
  mongoose = require('mongoose');

const
  User = mongoose.model('User');

mongoose.Promise = global.Promise; // ES6 mongoose implementation


exports.list = function (req, res){
  let criteria = {showHidden: 0};
  criteria = req.query;

  User.list(criteria).then(function(user) {
    res.status(200).send(user);
  })
  .catch(function(err) {
    res.status(200).send({ error: 'No data', details: 'No user Found ', message: err.message });
  });

};

exports.add = function (req, res){
  let user = new User(),
      attributes = JSON.parse(JSON.stringify(req.body));

  user.set(attributes);

  User.add(user)
    .then(function(user) {
      console.log('New User Created:', user);
      res.status(201).send(user);
    })
    .catch(function(err) {
      res.status(422).send({ error: 'Bad Request', details: 'User cannot be added.', message: err.message });
    }); 
};

exports.get = function (req, res){
  let userID = req.params._id;

  User.get(userID)
  .then(function (user) {
    res.send(user);
  })
  .catch(function(err) {
    res.status(404).send({ error: 'Bad Request', details: 'user Not Found.', message: err.message });
  });
};

exports.edit = function (req, res){
  let userID = req.params._id,
    attributes = JSON.parse(JSON.stringify(req.body));

  User.edit(userID, attributes)
    .then(function(user) {
      User.get(userID)
      .then(function(user) {
          res.send(user);
      })
      .catch(function(err) {
          res.status(404).send({ error: 'Bad Request', details: 'user Not Found.', message: err.message });
      });
    })
    .catch(function(err) {
        res.status(400).send({ error: 'Bad Request', details: 'user cannot be edited, ' + err.message });
    }); 
};

exports.del = function (req, res){
  let userID = req.params._id;

  User.del(userID)
    .then(function(id) {
    res.status(204).end();
    })
    .catch(function(err) {
        res.status(400).send({ error: 'Bad Request', details: 'user cannot be deleted, ' + err.message });
    }); 
};
