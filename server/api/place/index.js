'use strict';

const
  express = require('express'),
  router =  express.Router();

router.get('/', function(req, res){
  res.status(200).send("GET to '/api/place'");
});
router.get('/place', place.list);
router.get('/place/:_id', place.get);
router.post('/place', place.add);
router.put('/place/:_id', place.edit);
router.delete('/place/:_id', place.del);


module.exports = router;
