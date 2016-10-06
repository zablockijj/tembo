var dotenv = require('dotenv');
var cfg = {};

// if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
dotenv.config({path: '.env'});
// } else {
//   dotenv.config({path: '.env.test', silent: true});
// }

// HTTP Port to run our web application
cfg.port = process.env.PORT || 3000;

// A random string that will help generate secure one-time passwords and
// HTTP sessions
cfg.secret = process.env.APP_SECRET || 'keyboard cat';
cfg.accountSid = process.env.TWILIO_ACCOUNT_SID;
cfg.authToken = process.env.TWILIO_AUTH_TOKEN;
cfg.sendingNumber = process.env.TWILIO_NUMBER;

// setup db config
cfg.db = {};
cfg.db.dev = process.env.DB_DEV;
cfg.db.test = process.env.DB_TEST;

var requiredConfig = [cfg.accountSid, cfg.authToken, cfg.sendingNumber];
var isConfigured = requiredConfig.every(function(configValue) {
  return configValue || false;
});

if (!isConfigured) {
  var errorMessage =
    'TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_NUMBER must be set.';

  throw new Error(errorMessage);
}

// Export configuration object
module.exports = cfg;
