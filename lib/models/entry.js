var mongoose = require('mongoose');
var moment = require('moment');

var entrySchema = {
  text: {
    type: String,
    required: true,
    // adjust maxlength to appropriate amount
    maxlength: 500,
    set: function(txt) {
      var hashtag = txt.match(/#(\S+)/);
      if (hashtag) { this.hashtag = hashtag;}
      return txt.replace(/#(\S+)/g, '').trim();
    }
  },
  hashtag: {type: String},
  journal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Journal'
  },
  // TODO: better way to set deafult journal
  user: {
    type: String,
    ref: 'User',
    required: true
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

schema.methods.setJournal = function(wagner) {
  wagner.invoke(function(Journal) {
    if (this.hashtag) {
      Journal.findOne({user: this.user, title: this.hashtag}, function(err, journal) {
        if (err) {console.log('error setting journal, hastag is', this.hashtag)}
        if (journal) {
          this.journal = journal._id;
          return;
        }
      });
    }
    // if not, set journal to default
    this.setJournalToDefault(wagner);
  });
};

schema.methods.setJournalToDefault = function(wagner) {
  wagner.invoke(function(User) {
    User.findOne({_id: this.user}, function(err, user) {
      if (err) {console.log('error setting default journal, user', user)}
      this.journal = user.defaultJournal;
    });
  });
};

module.exports = schema;

// TODO: timestampls not showing up? why extra id?
