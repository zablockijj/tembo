var mongoose = require('mongoose');

var userSchema = {
  _id: {
    type: String,
    required: true
  },
  defaultJournal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Journal'
  }
};

var schema = new mongoose.Schema(userSchema);

module.exports = schema;
