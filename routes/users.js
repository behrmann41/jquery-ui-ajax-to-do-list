var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/to-do-list')
var Users = db.get('users')
var bcrypt = require('bcrypt')


/* GET users listing. */
router.get('/register', function (req, res, next) {
  res.render('users/register', {  title: "Create an Account"});
});

router.post('/register', function (req, res, next) {
  var errors = [];
  var hash = bcrypt.hashSync(req.body.password, 11)
  if (!req.body.username.trim()){
    errors.push('Please enter a username')
  }
  if (!req.body.email.trim()){
    errors.push('Please enter an email')
  }
  if (!req.body.password.trim()){
    errors.push('Please enter a password')
  }
  if (req.body.password.length < 8){
    errors.push('Password needs to be at least 8 characters')
  }
  if (!req.body.email.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i)){
    errors.push('Invalid Email')
  }
  if (req.body.password !== req.body.pwconfirm){
    errors.push('Passwords need to match')
  }
  if (errors.length){
    res.render('users/register', {  title: "Create an Account", errors: errors})
  } else {
    Users.find({ email: req.body.email }, function (err, user){
      if (user.length > 0){
        errors.push('Email already in user')
        res.render('users/register', {  title: "Create an Account", errors: errors})
      } else {
        Users.insert({username: req.body.username,
                      email: req.body.email,
                      passwordDigest: hash
                      })
        req.session.user = req.body.username
        res.redirect('/tasks')
      }
    })
  }
})

router.get('/login', function (req, res, next){
  res.render('users/login', { title: 'Login to Account'})
});

router.post('/login', function (req, res, next) {
  var errors = []
  Users.findOne({ email: req.body.email }, function (err, user){
    if (user){
      if (bcrypt.compareSync(req.body.password, user.passwordDigest)){
        req.session.user = user.username
        res.redirect('/tasks')
      } else {
        errors.push('Invalid Email / Password')
        res.render('users/login', { title: "Login to Account", errors: errors})
      }
    } else {
      errors.push('Invalid Email / Password')
      res.render('users/login', { title: "Login to Account", errors: errors})
    }
  })
})

router.get('/logout', function (req, res, next){
  req.session = null;
  res.redirect('/')
})



module.exports = router;
