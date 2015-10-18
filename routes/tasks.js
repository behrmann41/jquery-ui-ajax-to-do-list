var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/to-do-list')
var Tasks = db.get('tasks')
var Users = db.get('users')

router.get('/data', function (req, res, next){
  Tasks.find({}, function (err, tasks){
    res.json(tasks)
  })
})

router.get('/', function (req, res, next){
  var username = req.session.user
  res.render('tasks', { title: 'Tasks', user: username})
})
module.exports = router;