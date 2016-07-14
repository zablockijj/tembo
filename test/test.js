var chai = require('chai');
var assert = chai.assert;
var mongoose = require('mongoose');
var wagner = require('wagner-core');

describe('journal entry', function() {
  var Entry;
  var models;

  before(function() {
    models = require('../models/models')(wagner);
    Entry = models.Entry;
  });

  it('should set entry properly', function() {
    var sampleText = 'this is sample text #test #sample #text';
    var newEntry = new Entry({ text: sampleText, user: 1 });
    assert.property(newEntry, 'journals');
    assert.equal(newEntry.journals, ['test', 'sample', 'text']);
    assert.equal(newEntry.text, sampleText);
    var anotherEntry = new Entry({ text: '3432 dsfds' });
    console.log(anotherEntry);
  });
});
