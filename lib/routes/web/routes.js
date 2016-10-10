'use strict';

var express = require('express');
var _ =  require('underscore');
var errors = require('../../config/errors');

module.exports = function(wagner) {
  var router = express.Router();
  var journal = require('./journalActions')(wagner);
  var entry = require('./entryActions')(wagner);
  var reminder = require('./reminderActions')(wagner);


  router.get('/journals/index', journal.getAll);
  router.get('/journals/:id', journal.getOne);
  router.post('/journals', journal.createOne);
  router.put('/journals/:id', journal.update);

  router.get('/journals/:journalId/entries', entry.getAllByJournal);
  router.get('/entries/index', entry.getAll);
  router.get('/entries/:id', entry.getOne);

  router.get('/reminders/index', reminder.getAll);
  router.get('/reminders/:id', reminder.getOne);
  router.post('/reminders', reminder.createOne);

  return router;
};


// to get number - body.From
// to get message - body.Body
// to get message id? - body.MessageSid
