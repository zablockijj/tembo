var mongoose = require('mongoose');
var moment = require('moment');

var entrySchema = {
  text: {
    type: String,
    required: true,
    // adjust maxlength to appropriate amount
    maxlength: 500,
    // determine journals from text for when entry via phone
    //TODO: rethink logic below, what if want in specialty journal and primary?
    set: function(txt) {
      var hashtags = txt.match(/#(\S+)/g);
      if (hashtags) {
        this.journals = hashtags.map(function(tag) {
          return tag.slice(1).toLowerCase();
        });
      } else {
        this.journals = ['primary'];
      }

      // TODO: remove hashtags from txt?
      return txt;
    }
  },
  // TODO: should users be able to add same entry to multiple journals?
  journals: [{
    type: String,
    ref: 'Journal'
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // in case want to keep track of where the entry was added from
  details: {
    device: {
      type: String,
      enum: ['web', 'mobile']
    }
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
