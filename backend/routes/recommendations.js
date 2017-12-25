var express = require('express');
var router = express.Router();

var Post = require('../models/post');
var User = require('../models/user');

router.get('/', function(req, res, next) {
  Post.find()
  .then((allPosts)=>{
    res.json(allPosts);
  })
  .catch((err)=>{
    res.status(404);
    res.send(err);
  })
});

router.get('/tag/:_id', function(req, res, next) {
  var id = req.params._id;
  var query = {_id: id};

  Post.find(query)
  .then((post)=>{
    res.json(post);
  })
  .catch((err)=>{
    res.status(404);
    res.send(err);
  })
});

module.exports = router;