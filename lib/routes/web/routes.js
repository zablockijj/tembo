'use strict';

var express = require('express');
var _ =  require('underscore');

module.exports = function(passport) {
  var router = express.Router();

  router.get('/', function(req,res){
    res.send('win');
  });

  router.get('/login', function(req,res){
    console.log('in there');
    res.send('poop');
  });

  // router.get('/entries', wagner.invoke(function(Entry) {
  //   return function(req, res) {
  //     res.render('index.html');
  //   };
  // }));

  router.post('/signup', passport.authenticate('local-signup', {
      failureFlash: false
    }),
    function(req, res) {
      res.send('yipped');
    });

  return router;
};


// to get number - body.From
// to get message - body.Body
// to get message id? - body.MessageSid
