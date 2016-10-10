'use strict'

var errors = require('../../config/errors');

var reminder = function(wagner) {
  var reminderActions = wagner.invoke(function(Reminder){
    return {
      getAll: function(req, res) {
        Reminder.find({})
          .then(function(reminders) {
            res.json(reminders);
          })
          .catch(function(e) {
            errors.systemError(res, e);
          });
      },
      getOne: function(req, res) {
        Reminder.findById(req.params.id)
          .then(function(reminder) {
            res.json(reminder);
          })
          .catch(function(e) {
            errors.systemError(res, e);
          });
      },
      createOne: function(req, res) {
        Reminder.create({
          daysOfWeek: parseInt(req.body.daysOfWeek),
          minutes: parseInt(req.body.minutes),
          hours: parseInt(req.body.hours),
          prompt: req.body.prompt
        }).then(function(reminder) {
          res.json(reminder);
        }).catch(function(e) {
          errors.systemError(res, e);
        });
      }
    }
  });

  return reminderActions;
};

module.exports = reminder;