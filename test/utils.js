// 'use strict';
//
// // Modified from http://www.scotchmedia.com/tutorials/express/authentication/1/06
// // which was modified from https://github.com/elliotf/mocha-mongoose
//
//
// var config = require('../config');
// var mongoose = require('mongoose');
//
// process.env.NODE_ENV = 'test';
//
// beforeEach(function (done) {
//   function clearDB() {
//     for (var i in mongoose.connection.collections) {
//       mongoose.connection.collections[i].remove(function(err) {
//         if (err) {console.log('error when removing mongoose collection');}
//       });
//     }
//     return done();
//   }
//
//   if (mongoose.connection.readyState === 0) {
//     console.log('connecting to test db');
//     mongoose.connect(config.db.test, function (err) {
//       if (err) {
//         throw err;
//       }
//       return clearDB();
//     });
//   } else {
//     return clearDB();
//   }
// });
//
//
// afterEach(function (done) {
//   mongoose.disconnect();
//   return done();
// });
