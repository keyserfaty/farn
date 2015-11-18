'use strict';

const
  express = require('express'),
  app =  express(),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  passport = require('passport'),
  morgan = require('morgan'),
  flash = require('connect-flash');

const
  config = require('./config'),
  router = require('./routes'),
  middleware = require('./middleware'),
  db = require('./db.js');

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(express.static('client'));
// required for passport
app.use(session({ secret: 'test-secret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


app.use('/', router);

app.listen(config.site.port, function() {
  console.log('Basic API listening on port', config.site.port);
});