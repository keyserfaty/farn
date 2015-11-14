'use strict';

const 
	express = require('express'),
	router = express.Router();

router.use('/facebook', require('./facebook'));

module.exports = router;
