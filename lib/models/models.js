var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner) {
  mongoose.connect('mongodb://localhost:27017/tembo');

  var Entry = mongoose.model('Entry', require('./entry'), 'entries');
  var Journal = mongoose.model('Journal', require('./journal'), 'journals');
  var User = mongoose.model('User', require('./user'), 'users');

  var models = {
    Entry: Entry,
    Journal: Journal,
    User: User

  };

  _.each(models, function(value, key) {
    wagner.factory(key, function() {
      return value;
    });
  });

  // Journal is a dependency of the Reminder model
  var Reminder = mongoose.model('Reminder', require('./reminder')(wagner), 'reminders');
  models.Reminder = Reminder;

  wagner.factory('Reminder', function() {
    return Reminder;
  });

  return models;
};
