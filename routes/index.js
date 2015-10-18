var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/to-do-list')
var Tasks = db.get('tasks')

/* GET home page. */
router.get('/', function(req, res, next) {
  var username = req.session.user
  res.render('index', { title: 'Express - Task List', user: username });
});

module.exports = router;
