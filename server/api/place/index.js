'use strict';

const
  express = require('express'),
  router =  express.Router();

const 
  auth = require('../auth/auth.services');

router.get('/', function(req, res){
  res.status(200).send("GET to '/api/place'");
});
router.get('/', auth.isAuthenticated(), place.list);
router.post('/place', auth.isAuthenticated(), place.add);
router.get('/place/:_id', auth.isAuthenticated(), place.get);
router.put('/place/:_id', auth.isAuthenticated(), place.edit);
router.delete('/place/:_id', auth.isAuthenticated(), place.del);


module.exports = router;
