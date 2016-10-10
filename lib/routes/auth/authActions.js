'use strict'

var jwt = require('jsonwebtoken');
var config = require('../../../config');
var errors = require('../../config/errors');

function genToken(user) {
  var expires = expiresIn(14);
  var payload = {
    exp: expires,
    id: user.id
  };
  var token = jwt.sign(payload, config.secret);

  return {
    token: token,
    expires: expires,
    authenticated: true
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

var auth = function(wagner) {
  return wagner.invoke(function(User) {
    var validate = function(username, password) {
      return User.findOne({username: username})
        .then(function(user) {
          if(!user) {
            return null;
          }

          if(user.validPassword(password)) {
            return user;
          } else {
            return null;
          }
        })
      .catch(function() {
        errors.invalidUser(res);
      });
    };
    var login = function(req, res) {
      var username = req.body.username || '';
      var password = req.body.password || '';

      if (username == '' || password == '') {
        errors.invalidUser(res);
      }

      validate(username, password).then(function(user){
        if (!user) {
          errors.invalidUser(res);
        } else {
          res.json(genToken(user));
        }
      })
    };

    var signup = function(req, res) {
      var username = req.body.username || '';
      var password = req.body.password || '';
      var number = req.body.number || '';

      if (!password || !number) {
        res.json('nope');
      }

      User.findOne({username: username})
        .then(function(user) {
          if (!user) {
            return User.create({
              phone: number,
              username: username,
              password: password
            })
          }
        })
        .then(function(user) {
          res.json(user);
        })
        .catch(function(e) {
          res.json(e);
        });
    };

    return {
      login: login,
      validate: validate,
      signup: signup
    }
  });
};

module.exports = auth;