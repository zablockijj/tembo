var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner) {
  var Journal = mongoose.model('Journal', require('./journal'), 'journals');
  var User = mongoose.model('User', require('./user'), 'users');

  var models = {
    Journal: Journal,
    User: User

  };

  _.each(models, function(value, key) {
    wagner.factory(key, function() {
      return value;
    });
  });

  // Journal is a dependency of the Reminder model and Entry model
  var Reminder = mongoose.model('Reminder', require('./reminder')(wagner), 'reminders');
  models.Reminder = Reminder;

  var Entry = mongoose.model('Entry', require('./entry')(wagner), 'entries');
  models.Entry = Entry;

  wagner.factory('Reminder', function() {
    return Reminder;
  });

  wagner.factory('Entry', function() {
    return Entry;
  });

  return models;
};
