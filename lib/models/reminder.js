var mongoose = require('mongoose');
var cronJob = require('../../lib/jobs/jobs');

module.exports = function(wagner) {
  var reminderSchema = {
    daysOfWeek: [{type: Number, required: true}],
    minutes: [{type: Number, required: true}],
    hours: [{type: Number, required: true}],
    prompt: {
      type: String,
      required: true
    }
  };

  var schema = new mongoose.Schema(reminderSchema);

  schema.methods.getAssociatedJournals = wagner.invoke(function(Journal) {
    return function(cb) {
      Journal.find({reminderDetails: {
                      reminderEnabled: true,
                      reminder: this
                    }})
             .populate('user')
             .exec(cb);
    };
  });
};
