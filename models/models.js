var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner) {
  mongoose.connect('mongodb://localhost:27017/tembo');

  var Entry = mongoose.model('Entry', require('./entry'), 'entries');
  var Journal = mongoose.model('Journal', require('./journal'), 'journals');

  var models = {
    Entry: Entry,
    Journal: Journal
  };

  _.each(models, function(value, key) {
    wagner.factory(key, function() {
      return value;
    });
  });

  return models;
};
