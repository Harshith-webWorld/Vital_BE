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
  yearType: customJOI.string().sanitize().valid('calender', 'financial').required()
});

exports.postValidation = postValidation;
//# sourceMappingURL=YearwiseMisMtrReports.validations.js.map
