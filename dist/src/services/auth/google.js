"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _passportGoogleOauth = require("passport-google-oauth20");

// var passport = require('passport');
// var GoogleStrategy = require('passport-google-oauth20').Strategy;
// // var GoogleStrategy = require('passport-google-oauth2').Strategy;
// var User = require('../models/user');
// var config = require('./config');
// var init = require('./init');
var GoogleStrategy = _passportGoogleOauth.Strategy; // var User = require('../models/user');

var config = require('./config');

_passport["default"].use(new GoogleStrategy({
  clientID: config.google.clientID,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackURL,
  scope: ['id', 'displayName', 'photos', 'email'],
  accessType: 'offline'
}, function (accessToken, refreshToken, profile, done) {
  console.log("profileprofileprofile", profile);
  done(null, profile);
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
//# sourceMappingURL=google.js.map
