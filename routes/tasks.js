var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/to-do-list')
var Tasks = db.get('tasks')

router.get('/data', function (req, res, next){
  Tasks.find({}, function (err, tasks){
    res.json(tasks)
  })
})
module.exports = router;