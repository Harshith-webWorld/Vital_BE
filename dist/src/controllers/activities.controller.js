"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _expressValidator = require("express-validator");

var _httpStatus = _interopRequireDefault(require("http-status"));

var _utils = _interopRequireDefault(require("../services/utils.service"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var _sequelize = _interopRequireDefault(require("../../config/sequelize"));

var activities = _sequelize["default"].activities;
var Op = _sequelize["default"].Sequelize.Op;

var activitiesController = function activitiesController() {
  var create = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, activitiesData, whereCodn;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              activitiesData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (!reqObj.id) {
                _context.next = 14;
                break;
              }

              _context.next = 11;
              return activities.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 11:
              activitiesData = _context.sent;
              _context.next = 20;
              break;

            case 14:
              _context.next = 16;
              return activities.findOne({
                where: whereCodn,
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                }
              });

            case 16:
              activitiesData = _context.sent;
              _context.next = 19;
              return activities.create(reqObj);

            case 19:
              activitiesData = _context.sent;

            case 20:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: activitiesData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

              if (!_context.t0.statusCode) {
                _context.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context.t0
              }));

            case 28:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 23]]);
    }));

    return function create(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var getActivities = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var errors, reqObj, cond, attributes, _yield$activities$fin, count, activitiesData;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context2.next = 4;
                break;
              }

              throw errors.array();

            case 4:
              reqObj = _utils["default"].getReqValues(req);
              cond = {};
              attributes = {
                exclude: ["createdAt", "updatedAt"]
              };

              if (reqObj.id) {
                cond["id"] = reqObj.id;
              }

              cond["isActive"] = true;
              _context2.next = 11;
              return activities.findAndCountAll({
                where: cond,
                attributes: attributes,
                order: [["id", "ASC"]]
              });

            case 11:
              _yield$activities$fin = _context2.sent;
              count = _yield$activities$fin.count;
              activitiesData = _yield$activities$fin.rows;

              if (!(count <= 0)) {
                _context2.next = 16;
                break;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 16:
              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: activitiesData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 19:
              _context2.prev = 19;
              _context2.t0 = _context2["catch"](0);
              console.error(_context2.t0);

              if (!_context2.t0.statusCode) {
                _context2.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context2.t0
              }));

            case 24:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 19]]);
    }));

    return function getActivities(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  return {
    create: create,
    getActivities: getActivities
  };
};

var _default = activitiesController();

exports["default"] = _default;
//# sourceMappingURL=activities.controller.js.map
