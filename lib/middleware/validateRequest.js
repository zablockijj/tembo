'use strict'

var jwt = require('jsonwebtoken');
var config = require('../../config');
var errors = require('../config/errors');
var mongoose = require('mongoose');

module.exports = function(wagner){
  return wagner.invoke(function(User) {
    return function (req, res, next) {
      var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

      var decodeToken = function(token) {
        try {
          return jwt.verify(token, config.secret);
        } catch (err) {
          errors.systemError(res, err);
        }
      };

      if (token) {
        var decoded = decodeToken(token);
        console.log('decoded', decoded);

        if (decoded.exp <= Date.now()) {
          errors.tokenExpired(res);
        }

        User.findOne({_id: mongoose.Types.ObjectId(decoded.id)})
          .then(function (user) {
            if (user) {
              req.user = user;
              next();
            } else {
              errors.invalidUser(res);
            }
          });
      }
    }
  })
};