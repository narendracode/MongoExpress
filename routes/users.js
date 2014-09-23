var express = require('express');
var router = express.Router();

/* get the controllers */
var users = require('../app/controllers/userController');


/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/create',users.create);

module.exports = router;
