"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _passport = _interopRequireDefault(require("passport"));

module.exports = function () {
  _passport["default"].serializeUser(function (user, done) {
    done(null, user);
  });

  _passport["default"].deserializeUser(function (obj, done) {
    done(null, obj); // User.findById(id, function (err, user) {
    // 	done(err, user);
    // });
  });
};
//# sourceMappingURL=init.js.map
