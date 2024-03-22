var express = require('express');
var router = express.Router();

const User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Get by Id
router.get('/details/:userId', (req, res, next) => {

  User.findById(req.params.userId)
    .then((foundUser) => {
      console.log("Found user ===>", foundUser)
      res.json(foundUser)
    })
    .catch((err) => {
      console.log(err)
      res.json(err)
    })

})

module.exports = router;
