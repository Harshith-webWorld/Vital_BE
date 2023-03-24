"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOneValidation = exports.deleteValidation = exports.updateValidation = exports.bulkCreateValidation = exports.createValidation = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _joi = _interopRequireDefault(require("joi"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
var monthValidator = {};
months.forEach(function (month) {
  return monthValidator[month] = _joi["default"].number().integer().allow(null);
});

var createValidation = _joi["default"].object(_objectSpread({
  year: _joi["default"].number().integer().required(),
  districtId: _joi["default"].number().integer().min(1).required(),
  createdBy: _joi["default"].number().integer().required(),
  lastModifiedBy: _joi["default"].number().integer().required(),
  isActive: _joi["default"]["boolean"]().required()
}, monthValidator));

exports.createValidation = createValidation;

var updateValidation = _joi["default"].object(_objectSpread({
  id: _joi["default"].number().integer().min(1).required(),
  srNo: _joi["default"].string().alphanum().regex(/^SR/).required(),
  year: _joi["default"].number().integer().required(),
  districtId: _joi["default"].number().integer().min(1).required(),
  createdBy: _joi["default"].number().integer().required(),
  lastModifiedBy: _joi["default"].number().integer().required(),
  isActive: _joi["default"]["boolean"]().required()
}, monthValidator));

exports.updateValidation = updateValidation;

var bulkCreateValidation = _joi["default"].object({
  hydrocelectomyOperations: _joi["default"].array().items(createValidation).required()
});

exports.bulkCreateValidation = bulkCreateValidation;

var deleteValidation = _joi["default"].object({
  id: _joi["default"].number().integer().min(1).required()
});

exports.deleteValidation = deleteValidation;

var getOneValidation = _joi["default"].object({
  id: _joi["default"].number().integer().min(1).required()
});

exports.getOneValidation = getOneValidation;
//# sourceMappingURL=hydrocelectomyOperations.validations.js.map
