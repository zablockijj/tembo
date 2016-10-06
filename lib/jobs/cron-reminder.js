var schedule = require('node-schedule');
var twilio = require('../twilio/send.js');
var _ = require('underscore');

module.exports = function(wagner) {
  return wagner.invoke(function(Reminder) {
    var cronReminder = {};
    // TODO: add in streams here?
    cronReminder.initialize = function() {
      Reminder.find({}, function(err, reminders) {
        if (err) console.log('error - lookin up reminders');
        _.each(reminders, function(reminder) {
          cronReminder.createCronJob(reminder);
        });
      });
    };

    cronReminder.createCronJob = function(reminder) {
      reminder.getAssociatedJournals(function(err, journals) {
        _.each(journals, function(journal) {
          var rule = cronReminder.createCronSchedule(reminder);
          // TODO: store the below where?
          // if no journals, dont store
          var j = schedule.scheduleJob(rule, function() {
            var textMessage = reminder.prompt + '#' + journal.title;
            twilio.sendSms(journal.user._id, textMessage);
          });
        });
      });
    };

    cronReminder.createCronSchedule = function(reminder) {
      var rule = new schedule.RecurrenceRule();
      rule.second = 0;
      rule.minute = reminder.minutes || 0;
      rule.hours = reminder.hour || 0;
      rule.dayOfWeek = reminder.daysOfWeek || 0;
      return rule
    };

    return cronReminder;
  });
};

// TODO: make it OOP, initialize cronReminder so can track open cron jobs, etc
// TODO: can chain each underscore
