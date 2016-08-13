require('dotenv').load();
var wagner = require('wagner-core');
var models = require('./lib/models/models')(wagner);
var _ = require('underscore');
var seedsUser;

_.each(models, function(value, key) {
  models[key].find({}).remove(function(err) {
    if (err) {console.log('error deleting', key);}
    console.log('successful deleting', key);
  });
});

models.User.create({_id: '+12487399185'}, function(err, user) {
  if (err) {console.log('error creating user');}
  console.log('succes user', user);
  seedsUser = user;
});

models.Reminder.create({
  daysOfWeek: [0,1,2,3,4,5,6],
  minutes: [30, 35],
  hours: [8,9,10,18,19,20,21,22,23,24],
  prompt: 'how are you feeling?'
}, function(err, reminder) {
  if (err) {console.log('error creating reminder');}
  console.log('this reminder was created', reminder);
  models.Journal.create({
    title: 'meds',
    reminderDetails: {
      reminderEnabled: true,
      reminder: reminder._id
    },
    user: seedsUser._id
  }, function(err, journal) {
    if (err) {console.log('error creating journal');}
    console.log('this journal was created', journal);
    seedsUser.defaultJournal = journal._id;
    seedsUser.save(function(err, user) {
      if (err) {console.log('error setting defaultJournal');}
      console.log('updated user', user);
    });
  });
});

models.Reminder.create({
  daysOfWeek: [0,1,2,3,4,5,6],
  minutes: 0,
  hours: [8,9,10,11,12,18,19,20,21,22,23,24],
  prompt: 'what time is it Mr. fox?'
}, function(err, reminder) {
  if (err) {console.log('error creating reminder');}
  console.log('this reminder was created', reminder);
  models.Journal.create({
    title: 'nonsense',
    reminderDetails: {
      reminderEnabled: true,
      reminder: reminder._id
    },
    user: seedsUser._id
  }, function(err, journal) {
    if (err) {console.log('error creating journal');}
    console.log('this journal was created', journal);
  });
});
