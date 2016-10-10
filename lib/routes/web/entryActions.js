'use strict'

var errors = require('../../config/errors');

var entry = function(wagner) {
  var entryActions = wagner.invoke(function(Entry){
    return {
      getAllByJournal: function(req, res) {
        Entry.find({journal: req.params.journalId})
          .then(function(entries) {
            res.json(entries);
          })
          .catch(function(e) {
            errors.systemError(res, e);
          });
      },
      getAll: function(req, res) {
        Entry.find({})
          .then(function(entries) {
            res.json(entries);
          })
          .catch(function(e) {
            errors.systemError(res, e);
          });
      },
      getOne: function(req, res) {
        Entry.findById(req.params.id)
          .then(function(entry) {
            res.json(entry);
          })
          .catch(function(e) {
            errors.systemError(res, e);
          });
      }
    }
  });

  return entryActions;
};

module.exports = entry;