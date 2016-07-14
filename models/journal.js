var mongoose = require('mongoose');

// TODO: what else will I query for? range of entries (date)? number of entries?
// how to do reminders - possible add here once figure out
// maybe dont need lastEntry or timestamp

var journalSchema = {
  _id: {
    type: String,
    required: true
  },
  lastEntry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Entry'
  }
}

var schema = new mongoose.Schema(journalSchema, { timestamps: true });
// TODO: add index by id?
module.exports = schema;
