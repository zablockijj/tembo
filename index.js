// TODO: maaybe rearrange file and move into other folder
// TODO: add use strict to all files

var express = require('express');
var wagner = require('wagner-core');
var bodyParser = require('body-parser');
var smsRouter = require('./lib/routes/sms/routes.js');

require('dotenv').load();
require('./lib/models/models')(wagner);

var cronReminder = require('./lib/jobs/cron-reminder.js')(wagner);

var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// routes for using app via text message
app.use('/sms', smsRouter(wagner));

// app.get('/', function(req, res) {
//   wagner.invoke(function(Journal){
//     Journal.findOne({normalizedTitle: 'meds'}, function(err, doc) {
//       if (err) {console.log('cant due the virt')}
//       console.log('journal retrieved', doc);
//     });
//   })
// });

// app.post('/love', function(req, res) {
//   console.log(req);
//   console.log(req.body.Body);
//   res.type('text/xml');
//   res.send('<Response><Message>Goodnight my love!</Message></Response>')
// });

// app.get('/love', function(req, res) {
//   twilioApp.sendSms('+12027668640', 'goodnight my love');
//   res.send('goodnight my love');
// });
cronReminder.initialize();

app.listen(3000);
console.log('listening on port 3000');


// to get number - body.From
// to get message - body.Body
// to get message id? - body.MessageSid
