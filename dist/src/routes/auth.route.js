"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressValidator = require("express-validator");

var _auth = _interopRequireDefault(require("../controllers/auth.controller"));

var _linkedin = _interopRequireDefault(require("../services/auth/linkedin"));

var _github = _interopRequireDefault(require("../services/auth/github"));

var _twitter = _interopRequireDefault(require("../services/auth/twitter"));

var _facebook = _interopRequireDefault(require("../services/auth/facebook"));

var _google = _interopRequireDefault(require("../services/auth/google"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/login", [(0, _expressValidator.check)("password").exists().withMessage(_resources["default"].PASSWORD_REQUIRED), (0, _expressValidator.check)("userName").exists().withMessage(_resources["default"].USERNAME_REQUIRED)], _auth["default"].login).post("/logout", _auth["default"].logout).post("/forgotPassword", [(0, _expressValidator.check)("email").exists().withMessage("Email is required")], _auth["default"].forgotPassword).put("/resetPassword/:id", [(0, _expressValidator.check)("email").exists().withMessage("Email is required"), (0, _expressValidator.check)("otp").exists().withMessage("OTP is required"), (0, _expressValidator.check)("newpassword").exists().withMessage("OTP is required")], _auth["default"].resetPassword).post("/verifyOtp", [(0, _expressValidator.check)("email").exists().withMessage("Email is required"), (0, _expressValidator.check)("otp").exists().withMessage("OTP is required")], _auth["default"].verifyOtp).post("/updatePassword/:id", [(0, _expressValidator.check)("newpassword").exists().withMessage("Password is required")], _auth["default"].updatePassword).get('/linkedin', _linkedin["default"].authenticate('linkedin')).get('/linkedin/callback', _linkedin["default"].authenticate('linkedin', {
  failureRedirect: '/'
}), _auth["default"].socialCallback).get('/google', _google["default"].authenticate('google', {
  scope: ['email', 'profile']
})).get('/google/callback', _google["default"].authenticate('google', {
  failureRedirect: '/'
}), _auth["default"].socialCallback).get('/github', _github["default"].authenticate('github', {
  scope: ['user:email']
})).get('/github/callback', _github["default"].authenticate('github', {
  failureRedirect: '/'
}), _auth["default"].socialCallback).get('/twitter', _twitter["default"].authenticate('twitter')).get('/twitter/callback', _twitter["default"].authenticate('twitter', {
  failureRedirect: '/'
}), _auth["default"].socialCallback).get('/facebook', _facebook["default"].authenticate('facebook')).get('/facebook/callback', _facebook["default"].authenticate('facebook', {
  failureRedirect: '/'
}), _auth["default"].socialCallback);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=auth.route.js.map
