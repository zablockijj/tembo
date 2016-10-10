'use strict'

var errors = require('../../config/errors');

var journal = function(wagner) {
  var journalActions = wagner.invoke(function(Journal){
    return {
      getAll: function(req, res) {
        Journal.find({user: req.user.id})
          .then(function(journals) {
            res.json(journals);
          })
          .catch(function(e) {
            errors.systemError(res, e);
          });
      },
      getOne: function(req, res) {
        Journal.findById(req.params.id)
          .then(function(journal) {
            res.json(journal);
          })
          .catch(function(e) {
            errors.systemError(res, e);
          });
      },
      createOne: function(req, res) {
        Journal.create({
          title: req.body.title,
          user: req.user.id,
          reminderDetails: {
            reminderEnabled: req.body.reminderEnabled || false,
            reminder: mongoose.Types.ObjectId(req.body.reminderId)
          }})
          .then(function(journal) {
            res.json(journal);
          })
          .catch(function(e) {
            errors.systemError(res, e);
          });
      },
      update: function(req, res) {
        Journal.findById(req.params.id)
          .then(function(journal) {
            if (req.body.reminderDetails) {
              journal.reminderDetails = req.body.reminderDetails;
            }
            if (req.body.title) {
              journal.title = req.body.title;
            }

            return journal.save();
          })
          .then(function(updatedJournal) {
            res.json(updatedJournal);
          })
          .catch(function(e) {
            errors.systemError(res, e);
          });
      }
    }
  })

  return journalActions;
};

module.exports = journal;