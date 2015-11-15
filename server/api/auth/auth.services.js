// services to handle user login
const
  mongoose = require('mongoose'),
  passport = require('passport'),
  jwt = require('jsonwebtoken'),
  expressJwt = require('express-jwt');

const 
  config = require('../../config');

const  
  validateJwt = expressJwt({ secret: config.secrets.session });


// creates token to store user
exports.signToken = function (userData) {
  return jwt.sign(userData, config.secrets.session, { expiresIn: 60*60*8 });
}

// exchange user token for user data
exports.isAuthenticated = function () {
  return compose()
    // Validate jwt
    .use(function(req, res, next) {
      // allow access_token to be passed through query parameter as well
      if(req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = 'Bearer ' + req.query.access_token;
      }
      validateJwt(req, res, next);
    })
    // Attach user to request
    .use(function(req, res, next) {
      User.findOne({ 'facebookID': req.user.facebookID }, function (err, user) {
        if (err) return next(err);
        if (!user) return res.status(401).send('Unauthorized');

        req.user = user;
        next();
      });
    });
}