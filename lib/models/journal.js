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
    type: String,
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

// TODO: add index by id?
module.exports = schema;
