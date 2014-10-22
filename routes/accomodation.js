var express = require('express');
var router = express.Router();

/* get the controllers */
var accomodation = require('../app/controllers/accomodationController');
router.get('/',accomodation.getAll);

module.exports = router;