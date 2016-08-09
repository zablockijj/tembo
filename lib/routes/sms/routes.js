'use strict';

var express = require('express')
var _ =  require('underscore')
// var userFinder = require('../lib/twilio/user-finder')

module.exports = function(wagner) {
  var router = express.Router()

  router.post('/entries/new', wagner.invoke(function(Entry) {
    return function(req, res) {
      var entryText = req.body.Body;
      Entry.create({text: entryText}, function(err, entry) {
        // below is for debugging, implement proper error handling when ready
        if (err) console.log('error - entrytext', entryText);
        console.log('it worked - post here is model', entry);
        // callback here??
        entry.setJournal(wagner);
        Entry.find({}, function(err, docs) {
          if (err) console.log('errorfinding');
          console.log('here are all entries:', docs);
        });
      });
    };
  }));

  return router;
};


// to get number - body.From
// to get message - body.Body
// to get message id? - body.MessageSid
