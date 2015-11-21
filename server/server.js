'use strict';

const
  express = require('express'),
  app = express(),
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
  db = require('./db'),
  job = require('./job');

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static('client'));
app.use(/\.*/, function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.status(200)
      .send({
        options: true
      });
  } else {
    next();
  }
});
// required for passport
app.use(session({
  secret: 'test-secret',
  proxy: true,
  resave: true,
  saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


app.use('/', router);

// job that brings markers from mapbox
//job.getMap();

app.listen(config.site.port, function () {
  console.log('Basic API listening on port', config.site.port);
});
