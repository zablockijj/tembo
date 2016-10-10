'use strict';

var express = require('express');
var _ =  require('underscore');

module.exports = function(wagner) {
  var router = express.Router();
  var auth = require('./authActions')(wagner);

  router.post('/login', auth.login);
  router.post('/signup', auth.signup);

  return router;
};
