'use strict';

const
  express = require('express'),
  router =  express.Router();

const 
  place = require('./place.controller');

router.get('/', place.list);
// router.post('/', place.insert);
router.post('/place', place.add);
router.get('/place/:_id', place.get);
router.put('/place/:_id', place.edit);
router.delete('/place/:_id', place.del);


module.exports = router;
