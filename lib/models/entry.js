var mongoose = require('mongoose');
var moment = require('moment');
var Q = require('q');

module.exports = function(wagner) {
  var entrySchema = {
    txt: {
      type: String,
      required: true,
      // adjust maxlength to appropriate amount
      maxlength: 500,
      set: function(txt) {
        var hashtag = (/#(\S+)/).exec(txt);
        if (hashtag) { this.hashtag = hashtag[1];}
        return txt.replace(/#(\S+)/, '').trim();
      }
    },
    hashtag: {
      type: String,
      set: function(tag) {
        var self = this;
        this.getJournalFromTag(tag)
        .then(function(journal) {
          if(journal) {
            self.journal = journal._id;
          }
        })
        .catch(function(err) {
          console.error(err);
        })
        .done();
        return tag;
      }
    },
    journal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Journal'
    },
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

  // TODO: make sure callbacks work below
  // TODO: refactor it is ugly
  schema.methods.getJournalFromTag = function(tag) {
    var self = this;

    return wagner.invoke(function(Journal) {
      return Journal.findOne({title: tag, user: self.user}).exec();
    });
  };

  schema.methods.isJournalSet = function() {
    return Boolean(this.journal);
  };

  schema.methods.setJournalToDefault = function() {
    var self = this;
    return wagner.invoke(function(User) {
      return User.findOne({_id: self.user})
        .exec()
        .then(function(user) {
          self.journal = user.defaultJournal;
          return self.save();
        })
        .catch(function(err) {
          console.error(err);
        });
    })
  };

  schema.methods.returnJournalOrSet = function() {
    var deferred = Q.defer();

    if (this.isJournalSet()) {
      deferred.resolve(this.journal);
    } else {
      this.setJournalToDefault()
        .then(function(entry) {
          deferred.resolve(entry.journal);
        })
        .catch(function(err) {
          deferred.reject(new Error(err));
        })
    }

    return deferred.promise;
  };

  return schema;
};
// TODO: timestampls not showing up? why extra id?
