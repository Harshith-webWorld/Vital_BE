"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcrypt = _interopRequireWildcard(require("bcrypt"));

var _lodash = require("lodash");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var saltRounds = 10;

var bcryptService = function bcryptService() {
  var password = function password(pass) {
    var salt = _bcrypt["default"].genSaltSync(saltRounds);

    var hash = _bcrypt["default"].hashSync(pass, salt);

    return hash;
  };

  var comparePassword = function comparePassword(pw, hash) {
    return _bcrypt["default"].compareSync(pw, hash);
  };

  var updatePassword = function updatePassword(pass) {
    var salt = _bcrypt["default"].genSaltSync(saltRounds);

    var hash = _bcrypt["default"].hashSync(pass, salt);

    return hash;
  };

  return {
    password: password,
    comparePassword: comparePassword,
    updatePassword: updatePassword
  };
};

var _default = bcryptService;
exports["default"] = _default;
//# sourceMappingURL=bcrypt.service.js.map
