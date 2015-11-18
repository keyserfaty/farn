'use strict';

const 
	passport = require('passport'),
	express = require('express'),
	FacebookStrategy = require('passport-facebook').Strategy,
	router = express.Router();

router.use('/facebook', require('./facebook'));
router.use('/facebook/callback', require('./facebook'));

module.exports = router;
