// TODO: maaybe rearrange file and move into other folder
// TODO: add use strict to all files

var express = require('express');
var wagner = require('wagner-core');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require("express-session");
var MongoStore = require('connect-mongo')(session);
var smsRouter = require('./lib/routes/sms/routes.js');
var webRouter = require('./lib/routes/web/routes.js');
var authRouter = require('./lib/routes/auth/routes.js');

require('dotenv').load();
var models = require('./lib/models/models')(wagner);

var cronReminder = require('./lib/jobs/cron-reminder.js')(wagner);
cronReminder.initialize();

var app = express();
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

app.all('/api/v1/*', [require('./lib/middleware/validateRequest')(wagner)]);

app.use('/sms', smsRouter(wagner));
app.use('/api/v1', webRouter(wagner));
app.use('/', authRouter(wagner));

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  console.log('Server listening on port ' + server.address().port);
});
