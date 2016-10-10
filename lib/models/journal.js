'use strict'

var mongoose = require('mongoose');

// TODO: what else will I query for? range of entries (date)? number of entries?
// maybe dont need lastEntry or timestamp

var journalSchema = {
  title: {
    type: String,
    required: true
  },
  lastEntry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Entry'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reminderDetails: {
    reminderEnabled: {type: Boolean, required: true},
    reminder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reminder'
    }
  }
}

var schema = new mongoose.Schema(journalSchema, { timestamps: true });

// make it unique by user and title
schema.index({ title: 1, user: 1}, { unique: true});
module.exports = schema;
