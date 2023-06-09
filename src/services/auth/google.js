// var passport = require('passport');
// var GoogleStrategy = require('passport-google-oauth20').Strategy;

// // var GoogleStrategy = require('passport-google-oauth2').Strategy;


// var User = require('../models/user');
// var config = require('./config');
// var init = require('./init');

import passport from "passport";
import { Strategy } from "passport-google-oauth20";

var GoogleStrategy = Strategy;

// var User = require('../models/user');
var config = require('./config');

passport.use(new GoogleStrategy({
	clientID: config.google.clientID,
	clientSecret: config.google.clientSecret,
	callbackURL: config.google.callbackURL,
	scope: ['id', 'displayName', 'photos', 'email'],
	accessType: 'offline'
}, function (accessToken, refreshToken, profile, done) {

	console.log("profileprofileprofile", profile);
	done(null, profile);
}
));

// serialize user into the session
passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (obj, done) {
	done(null, obj);
	// User.findById(id, function (err, user) {
	// 	done(err, user);
	// });
});


export default passport;
