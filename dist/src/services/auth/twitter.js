"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _passportTwitter = require("passport-twitter");

// var passport = require('passport');
// var TwitterStrategy = require('passport-twitter').Strategy;
// var User = require('../models/user');
// var config = require('./config');
// var init = require('./init');
var TwitterStrategy = _passportTwitter.Strategy; // var User = require('../models/user');

var config = require('./config'); // var init = require('./init');


_passport["default"].use(new TwitterStrategy({
  consumerKey: config.twitter.clientID,
  consumerSecret: config.twitter.clientSecret,
  callbackURL: config.twitter.callbackURL,
  includeEmail: true
}, function (accessToken, refreshToken, profile, done) {
  console.log("profileprofileprofile", profile);
  return done(null, profile);
  var searchQuery = {
    name: profile.displayName
  };
  var updates = {
    name: profile.displayName,
    someID: profile.id
  };
  var options = {
    upsert: true
  }; // update the user if s/he exists or add a new user

  User.findOneAndUpdate(searchQuery, updates, options, function (err, user) {
    if (err) {
      return done(err);
    } else {
      return done(null, user);
    }
  });
})); // serialize user into the session


_passport["default"].serializeUser(function (user, done) {
  done(null, user);
});

_passport["default"].deserializeUser(function (obj, done) {
  done(null, obj); // User.findById(id, function (err, user) {
  // 	done(err, user);
  // });
});

var _default = _passport["default"];
exports["default"] = _default;
//# sourceMappingURL=twitter.js.map
