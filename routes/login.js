var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');

router.get('/', function(request, response, next){
  response.sendFile(path.resolve(__dirname, '../views/login.html'));
});

// router.get('/', function(request, response, next) {
//   response.json(request.isAuthenticated());
// });

router.post('/',
  passport.authenticate('local'), function(request, response) {
    response.sendStatus(200);
});

module.exports = router;
