// passport service
'use strict';

const 
	express = require('express'),
	router =  express.Router(),
	passport = require('passport'),
	util = require('util'),
	FacebookStrategy = require('passport-facebook').Strategy,
	logger = require('morgan'),
	session = require('express-session'),
	bodyParser = require("body-parser"),
	cookieParser = require("cookie-parser"),
	methodOverride = require('method-override');

const 
  User = require('../../user/user.model');

const 
	FACEBOOK_APP_ID = '409108149284869',
	FACEBOOK_APP_SECRET = '7959adbbf45ae3e612496765c7bd544f';


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/api/auth/facebook/callback",
    enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {

    let userProfile = User({
      facebookID: profile.id,
      displayName: profile.displayName,
      name: profile.name,
      gender: profile.gender,
      profileUrl: profile.profileUrl,
      provider: profile.provider
    });

    User.findOneAndUpdate({ facebookID: userProfile.facebookID }, {}, userProfile, 
    function (err, user) {
      if (!user) { console.log('Creating user:', userProfile.displayName); userProfile.save(done); return; }
      user.save(done); console.log('Updating user:', userProfile.displayName); return;
    });
  }
));

// authentication
router.get('/',
  passport.authenticate('facebook'));

router.get('/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

module.exports = router;