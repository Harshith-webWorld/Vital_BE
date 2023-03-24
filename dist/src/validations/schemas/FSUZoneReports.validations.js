"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postValidation = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _sqlstring = _interopRequireDefault(require("sqlstring"));

var customJOI = _joi["default"].extend({
  type: 'string',
  base: _joi["default"].string(),
  messages: {
    'string.sanitize': '{{#label}} must be a valid string'
  },
  rules: {
    sanitize: {
      validate: function validate(value, helpers) {
        return _sqlstring["default"].escape(value);
      }
    }
  }
});

var postValidation = _joi["default"].object({
  startYear: _joi["default"].number().integer().required().min(1950).max(new Date().getFullYear()),
  endYear: _joi["default"].number().integer().required().min(1950).max(new Date().getFullYear()),
  startMonth: _joi["default"].number().integer().required().min(1).max(12),
  endMonth: _joi["default"].number().integer().required().min(1).max(12) // test: customJOI.string().sanitize()

});

exports.postValidation = postValidation;
//# sourceMappingURL=FSUZoneReports.validations.js.map
