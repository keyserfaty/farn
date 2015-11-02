'use strict';

const
	express = require('express'),
	router =  express.Router();

router.get('/', function(req, res){
	res.status(200).send("GET to '/api/user'");
});
router.get('/user/:_id', user.get);
router.get('/user', user.list);
router.put('/user/:_id', user.edit);
router.post('/user', user.add);
router.delete('/user/:_id', user.del);


module.exports = router;
