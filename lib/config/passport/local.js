var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true,
        session: false
    },
      function(req, username, password, done) {
        console.log('in here');
        return done(null, 'bob');
      }
    ));

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, callback) {
      User.findById(id, function(err, user) {
        callback(err, user);
      });
    });

};