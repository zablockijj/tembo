var express = require('express');
var wagner = require('wagner-core');
var bodyParser = require('body-parser');
var entriesRouter = require('./routes/sms')

require('dotenv').load();
require('./models/models')(wagner);

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// app.use(twilio.testSend);
var medsMessage = "Hello Katherine, this Tembo speaking. Please send me short response asap for testing purposes."

// app.get('/', function(req, res) {
//   twilioApp.sendSms('+12027668640', medsMessage);
//   res.send(medsMessage);
// });
app.use('/entries', entriesRouter(wagner));

app.post('/love', function(req, res) {
  console.log(req);
  console.log(req.body.Body);
  res.type('text/xml');
  res.send('<Response><Message>Goodnight my love!</Message></Response>')
});

var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
rule.minute = 45;

var j = schedule.scheduleJob(rule, function(){
  console.log('The answer to life, the universe, and everything!');
});
// app.get('/love', function(req, res) {
//   twilioApp.sendSms('+12027668640', 'goodnight my love');
//   res.send('goodnight my love');
// });

app.listen(3000);
console.log('listening on port 3000');


// to get number - body.From
// to get message - body.Body
// to get message id? - body.MessageSid
