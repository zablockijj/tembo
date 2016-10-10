'use strict'

var mongoose = require('mongoose');
var bcrypt = require("bcrypt-nodejs");

var userSchema = {
  phone: {
    type: String,
    required: true,
    unique: true
  },
  defaultJournal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Journal'
  },
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true,
    set: function(pw) {
      return this.encrypt(pw);
    }
  }
};

// TODO; need new logic for default journal - what happens if not selected, or
// automatically set default as a new journal created when user is created

var schema = new mongoose.Schema(userSchema);

schema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

schema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = schema;
