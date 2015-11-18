'use strict';

const
  express = require('express'),
  router =  express.Router();

const 
  auth = require('../auth/auth.services');

router.get('/', function(req, res){
  res.status(200).send("GET to '/api/place'");
});
router.get('/', place.list);
router.post('/', place.post);
router.post('/place', place.add);
router.get('/place/:_id', place.get);
router.put('/place/:_id', place.edit);
router.delete('/place/:_id', place.del);


module.exports = router;
