// var passport = require('passport');
// var GitHubStrategy = require('passport-github2').Strategy;

// var User = require('../models/user');
// var config = require('./config');
// var init = require('./init');

import passport from "passport";
import { Strategy } from "passport-github2";

var GitHubStrategy = Strategy;

// var User = require('../models/user');
var config = require('./config');
// var init = require('./init');

passport.use(new GitHubStrategy({
	clientID: config.github.clientID,
	clientSecret: config.github.clientSecret,
	callbackURL: config.github.callbackURL,
	scope: ['user:email']
},
	function (accessToken, refreshToken, profile, done) {


		console.log("profile--->", profile);
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

