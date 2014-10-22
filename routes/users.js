var express = require('express');
var router = express.Router();

/* get the controllers */
var users = require('../app/controllers/userController');

var loginUtil = require('../app/utils/loginUtil');
/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/:id/settings',loginUtil.isLoggedIn,loginUtil.selfLoggedIn,users.getSettings);
router.post('/:id/settings',loginUtil.isLoggedIn,loginUtil.selfLoggedIn,users.saveSettings);
router.post('/profile_pic/upload',users.uploadProfilePic);
/* API */
router.get('/api', function(req, res) {
  res.json({ message: 'hooray! welcome to our api!' });	
});


router.get('/create',users.create);

module.exports = router;
