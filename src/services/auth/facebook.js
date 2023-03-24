import passport from "passport";
import { Strategy } from "passport-facebook";

var FacebookTokenStrategy = Strategy;

// var User = require('../models/user');
var config = require('./config');
// var init = require('./init');

passport.use(new FacebookTokenStrategy({
	clientID: config.facebook.clientID,
	clientSecret: config.facebook.clientSecret,
	callbackURL: config.facebook.callbackURL,
	profileFields: ['id', 'displayName', 'photos', 'email', "first_name", "last_name"]
}, function (accessToken, refreshToken, profile, done) {

	console.log("profileprofileprofile", JSON.stringify(profile._json));
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
});

export default passport;
