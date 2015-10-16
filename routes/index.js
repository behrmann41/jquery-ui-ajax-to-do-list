var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/to-do-list')
var Tasks = db.get('tasks')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
