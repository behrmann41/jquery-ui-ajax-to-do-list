var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/to-do-list')
var Users = db.get('users')


/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('users/register', {  title: "Create an Account"});
});

module.exports = router;
