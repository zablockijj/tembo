var mongoose = require('mongoose');
var moment = require('moment');

var entrySchema = {
  text: {
    type: String,
    required: true,
    // adjust maxlength to appropriate amount
    maxlength: 500,
    // determine journals from text for when entry via phone
    // TODO: maybe make all this happen outside schema
    // TODO: create journal if doesn't already exist
    set: function(txt) {
      var hashtag = txt.match(/#(\S+)/);
      this.journal = hashtag;
      return txt.replace(/#(\S+)/g, '').trim();
    }
  },
  // TODO: should users be able to add same entry to multiple journals?
  journal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Journal'
  },
  // TODO: better way to set deafult journal
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    // required: true
  },
  // in case want to keep track of where the entry was added from
  details: {
    device: {
      type: String,
      enum: ['web', 'mobile']
    },
    messageId: { type: String }
  }
};

var schema = new mongoose.Schema(entrySchema, { timestamps: true });

// TODO: add indexes for what?
// TODO: update when choose formating
schema.virtual('displayDate').get(function() {
  return moment(this.createdAt).format('MMMM Do YYYY');
});

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

module.exports = schema;

// TODO: timestampls not showing up? why extra id?

// save array of hastags in document
// have instance method that creates journals of finds journals based on these hashtags?
