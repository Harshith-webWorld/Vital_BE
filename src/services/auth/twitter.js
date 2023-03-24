// var passport = require('passport');
// var TwitterStrategy = require('passport-twitter').Strategy;

// var User = require('../models/user');
// var config = require('./config');
// var init = require('./init');

import passport from "passport";
import { Strategy } from "passport-twitter";

var TwitterStrategy = Strategy;

// var User = require('../models/user');
var config = require('./config');
// var init = require('./init');

passport.use(new TwitterStrategy({
	consumerKey: config.twitter.clientID,
	consumerSecret: config.twitter.clientSecret,
	callbackURL: config.twitter.callbackURL,
	includeEmail: true
},
	function (accessToken, refreshToken, profile, done) {

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
		};

		// update the user if s/he exists or add a new user
		User.findOneAndUpdate(searchQuery, updates, options, function (err, user) {
			if (err) {
				return done(err);
			} else {
				return done(null, user);
			}
		});
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
