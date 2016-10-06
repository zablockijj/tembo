var utils = require('./utils');
var config = require('../config');
var chai = require('chai');
var assert = chai.assert;
var Q = require('q');
var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
var wagner = require('wagner-core');
var _ = require('underscore');

describe('journal entry', function() {
  var Entry;
  var User;
  var Journal;
  var models;
  var testUser;
  var defaultJournal;

  before(function(done) {
    // increase default mocha timeout
    // this.timeout(15000);

    // setup node env for testing
    process.env.NODE_ENV = 'test';

    // connect to test db
    mongoose.connect(config.db.test);

    models = require('../lib/models/models')(wagner);

    Entry = models.Entry;
    User = models.User;
    Journal = models.Journal;

    Q.all([
      User.find({}).remove().exec(),
      Journal.find({}).remove().exec(),
      Entry.find({}).remove().exec()
    ])
     .then(function() {
       return setInitialUserAndJournal();
     })
     .then(function(user) {
       testUser = user;
       return Journal.create({
         title: 'weeklyrecap',
         user: user,
         reminderDetails: {reminderEnabled: false}
       });
     })
     .catch(function(err) {
       console.log('something went wrong', err);
       assert.ifError(err);
     })
     .done(function() {
       done();
     });

    function setInitialUserAndJournal() {
      return User.create({'_id': '+fakenumber'})
      .then(function(user) {
        return Journal.create({
          title: 'test',
          user: user._id,
          reminderDetails: {reminderEnabled: false}
        })
        .then(function(journal) {
          defaultJournal = journal;
          user.defaultJournal = journal._id;
          return user.save();
        });
      });
    }
  })

  it('should set entry correctly with all properties', function(done) {
    var sampleText = 'this is bllop beee sample text #test';
    Entry.create({ txt: sampleText, user: testUser._id })
      .then(function(newEntry) {
        return newEntry.returnJournalOrSet()
        .then(function(journal) {
           assert.property(newEntry, 'hashtag');
           assert.typeOf(newEntry.hashtag, 'String');
           assert.equal(newEntry.hashtag, 'test');
           assert.property(newEntry, 'journal');
           assert.isDefined(newEntry.journal);
           assert.property(newEntry, 'txt');
           assert.equal(newEntry.journal, defaultJournal.id);
           assert.typeOf(newEntry.txt, 'String');
           assert.equal(newEntry.txt, 'this is bllop beee sample text');
           assert.property(newEntry, 'user');
           assert.isDefined(newEntry.user);
           assert.equal(newEntry.user, testUser.id);
        })
      })
      .catch(function(err) {
       assert.ifError(err);
      })
      .done(function() {
       done();
      });
  });

  it('should set entry journal based on hashtag', function(done) {
    var sampleText = 'this is sample text #weeklyrecap';
    Entry.create({ txt: sampleText, user: testUser._id })
     .then(function(newEntry) {
       return newEntry.returnJournalOrSet()
       .then(function(journal) {
         assert.property(newEntry, 'hashtag');
         assert.property(newEntry, 'journal');
         assert.equal(newEntry.hashtag, 'weeklyrecap');
         assert.isDefined(newEntry.journal);
         return Journal.findOne({user: newEntry.user, title: newEntry.hashtag})
          .exec()
          .then(function(foundJournal) {
            assert.equal(newEntry.hashtag, foundJournal.title);
            assert.equal(newEntry.journal, foundJournal.id);
          })
       })
     })
     .catch(function(err) {
       assert.ifError(err);
     })
     .done(function() {
       done();
     });
  });

  it('should only set hashtag as first hashtag', function(done) {
    var sampleText = 'this is sample text #firsthash #secondhash';
    Entry.create({ txt: sampleText, user: testUser._id })
    .then(function(newEntry) {
      return newEntry.returnJournalOrSet()
      .then(function(journal) {
         assert.property(newEntry, 'hashtag');
         assert.property(newEntry, 'journal');
         assert.typeOf(newEntry.hashtag, 'String');
         assert.equal(newEntry.hashtag, 'firsthash');
         assert.notInclude(newEntry.hashtag, 'secondhash');
       })
     })
     .catch(function(err) {
       assert.ifError(err);
     })
     .done(function() {
       done();
     });
  });

  it('should set entry journal to defaultJournal when journal does not exist', function(done) {
    var sampleText = 'this is sample text #twelveteen';
    Entry.create({ txt: sampleText, user: testUser._id })
    .then(function(newEntry) {
      return newEntry.returnJournalOrSet()
      .then(function(journal) {
        assert.property(newEntry, 'hashtag');
        assert.property(newEntry, 'journal');
        assert.equal(newEntry.hashtag, 'twelveteen');
        assert.isDefined(newEntry.journal);
        assert.equal(newEntry.journal, defaultJournal.id);
      })
    })
    .catch(function(err) {
      assert.ifError(err);
    })
    .done(function() {
      done();
    });
  });

  it('should set entry journal to defaultJournal when no journal provided', function(done) {
    var sampleText = 'this is sample text';
    Entry.create({ txt: sampleText, user: testUser._id })
    .then(function(newEntry) {
      return newEntry.returnJournalOrSet()
      .then(function(journal) {
        assert.isUndefined(newEntry.hashtag);
        assert.property(newEntry, 'journal');
        assert.isDefined(newEntry.journal);
        assert.equal(newEntry.journal, defaultJournal.id);
      })
    })
    .catch(function(err) {
      assert.ifError(err);
    })
    .done(function() {
      done();
    });
  });

  it('should set entry text minus everything after hashtag', function(done) {
    var sampleText = 'this is sample text #ff #yy balogne';
    Entry.create({ txt: sampleText, user: testUser._id })
    .then(function(newEntry) {
      assert.isString(newEntry.txt);
      assert.equal(newEntry.txt, 'this is sample text');
    })
    .catch(function(err) {
      assert.ifError(err);
    })
    .done(function() {
      done();
    })
  });

  // test to make sure doesnt get saved as different users journal
});
