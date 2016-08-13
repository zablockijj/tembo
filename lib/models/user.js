var mongoose = require('mongoose');

var userSchema = {
  _id: {
    type: String,
    required: true,
    unique: true
  },
  defaultJournal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Journal'
  }
};

// TODO; need new logic for default journal - what happens if not selected, or
// automatically set default as a new journal created when user is created

var schema = new mongoose.Schema(userSchema);

module.exports = schema;
