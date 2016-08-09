var config = require('../../config');
var client = require('twilio')(config.accountSid, config.authToken);

module.exports.sendSms = function(to, message) {
  console.log('to', to, 'message', message);
  client.sendMessage({
    body: message,
    to: to,
    from: config.sendingNumber
  }, function(err, data) {
    if (err) {
      console.log('didnt work');
      console.log(data);
    } else {
      console.log('worked yay');
    }
  });
};
