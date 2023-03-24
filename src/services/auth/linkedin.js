import passport from "passport";
import { Strategy } from "passport-linkedin-oauth2";

var LinkedInStrategy = Strategy;

// var User = require('../models/user');
var config = require('./config');
var init = require('./init');

passport.use(new LinkedInStrategy({
	clientID: config.linkedin.clientID,
	clientSecret: config.linkedin.clientSecret,
	callbackURL: config.linkedin.callbackURL,
	scope: ['r_emailaddress', 'r_liteprofile'],
	state: true
},
	// linkedin sends back the tokens and progile info
	function (token, tokenSecret, profile, done) {


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
