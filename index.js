// TODO: maaybe rearrange file and move into other folder
// TODO: add use strict to all files

var express = require('express');
var wagner = require('wagner-core');
var bodyParser = require('body-parser');
var passport = require("passport");
var session = require("express-session");
var MongoStore = require('connect-mongo')(session);
var smsRouter = require('./lib/routes/sms/routes.js');
var webRouter = require('./lib/routes/web/routes.js');

require('dotenv').load();
var models = require('./lib/models/models')(wagner);
var connection = models.connection;

var cronReminder = require('./lib/jobs/cron-reminder.js')(wagner);
cronReminder.initialize();

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./lib/config/passport/local.js')(passport);

app.use(session({
  secret : 'chowCH0W',
  store: new MongoStore({
    mongooseConnection: connection
  }),
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// routes for using app via text message
app.use('/sms', smsRouter(wagner));
app.use('/', webRouter(passport));


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
//   twilioApp.sendSms('+', 'goodnight my love');
//   res.send('goodnight my love');
// });


app.listen(3000);
console.log('listening on port 3000');


// to get number - body.From
// to get message - body.Body
// to get message id? - body.MessageSid
