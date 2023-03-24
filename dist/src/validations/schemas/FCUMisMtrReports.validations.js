"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postValidation = void 0;

var _joi = _interopRequireDefault(require("joi"));

var postValidation = _joi["default"].object({
  startYear: _joi["default"].number().integer().required().min(1950).max(new Date().getFullYear()),
  endYear: _joi["default"].number().integer().required().min(1950).max(new Date().getFullYear()),
  startMonth: _joi["default"].number().integer().required().min(1).max(12),
  endMonth: _joi["default"].number().integer().required().min(1).max(12) // test: customJOI.string().sanitize()

});

exports.postValidation = postValidation;
//# sourceMappingURL=FCUMisMtrReports.validations.js.map
