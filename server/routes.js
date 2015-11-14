'use strict';

const
  express = require('express'),
  router =  express.Router(),
  passport = require('passport'),
  FacebookStrategy = require('passport-facebook').Strategy;

router.use('/api/auth', require('./api/auth'));

// router.use('/api/place', require('./api/place'));
// router.use('/api/user', require('./api/user'));


// All undefined asset or api routes should return a 404
// router.route('/:url(api|auth|components|router|bower_components|assets)/*')
// .get(errors[404]);

// All other routes should redirect to the index.html
// router.route('*')
// .get(function(req, res) {
//   res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
// });

module.exports = router;
