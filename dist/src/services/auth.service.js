"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../../config/config"));

var secret = _config["default"].jwtSecret;

var authService = function authService() {
  var issue = function issue(payload, id) {
    return _jsonwebtoken["default"].sign({
      data: {
        payload: payload,
        id: id
      }
    }, secret, {
      expiresIn: _config["default"].jwtTokenExpire
    });
  };

  var verify = function verify(token, cb) {
    return _jsonwebtoken["default"].verify(token, secret, cb);
  };

  var decode = function decode(token) {
    return _jsonwebtoken["default"].decode(token);
  };

  return {
    issue: issue,
    verify: verify,
    decode: decode
  };
};

var _default = authService();

exports["default"] = _default;
//# sourceMappingURL=auth.service.js.map
