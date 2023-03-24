"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.postValidation = void 0;

var _joi = _interopRequireDefault(require("joi"));

var postValidation = _joi["default"].object({
  year: _joi["default"].number().integer().required()
});

exports.postValidation = postValidation;
//# sourceMappingURL=mmdpKitsReports.validations.js.map
