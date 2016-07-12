var mongoose = require('mongoose');
var moment = require('moment');

var entrySchema = {
  _id: { type: String, required: true },
  text: {
    type: String,
    required: true,
    // adjust maxlength to appropriate amount
    maxlength: 500,
    // determine journals from text for when entry via phone
    set: function(txt) {
      var hashtags = txt.match(/#(\S+)/g);
      this.journals = hashtags.map(function(tag) {
        return tag.slice(1).toLowerCase();
      });
      // TODO: remove hashtags from txt?
      return txt;
    }
  },
  journals: [{
    type: String,
    default: 'general',
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
