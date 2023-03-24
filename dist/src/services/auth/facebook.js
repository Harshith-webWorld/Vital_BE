"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _passport = _interopRequireDefault(require("passport"));

var _passportFacebook = require("passport-facebook");

var FacebookTokenStrategy = _passportFacebook.Strategy; // var User = require('../models/user');

var config = require('./config'); // var init = require('./init');


_passport["default"].use(new FacebookTokenStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL,
  profileFields: ['id', 'displayName', 'photos', 'email', "first_name", "last_name"]
}, function (accessToken, refreshToken, profile, done) {
  console.log("profileprofileprofile", JSON.stringify(profile._json));
  console.log("profileprofileprofile", profile);
  done(null, profile);
})); // serialize user into the session


_passport["default"].serializeUser(function (user, done) {
  done(null, user);
});

_passport["default"].deserializeUser(function (obj, done) {
  done(null, obj);
});

var _default = _passport["default"];
exports["default"] = _default;
//# sourceMappingURL=facebook.js.map
