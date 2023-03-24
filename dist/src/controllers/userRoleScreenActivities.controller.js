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

var userRoleScreenActivities = _sequelize["default"].userRoleScreenActivities,
    screens = _sequelize["default"].screens,
    users = _sequelize["default"].users,
    roles = _sequelize["default"].roles,
    activities = _sequelize["default"].activities;
var Op = _sequelize["default"].Sequelize.Op;

var userRoleScreenActivitiesController = function userRoleScreenActivitiesController() {
  var create = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, userRoleScreenActivitiesData, whereCodn;
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
              userRoleScreenActivitiesData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (reqObj.userId) {
                if (reqObj.screenId) {
                  reqObj.screenId.forEach(function (element) {
                    element.screenId = element.value ? element.value : 0;
                    element.userId = reqObj.userId ? reqObj.userId : 0;
                    element.createdBy = reqObj.createdBy ? reqObj.createdBy : 0;
                    element.lastModifiedBy = reqObj.lastModifiedBy ? reqObj.lastModifiedBy : 0;

                    if (element.id) {
                      element.id = null;
                      userRoleScreenActivitiesData = userRoleScreenActivities.create(element);
                    } else {
                      userRoleScreenActivitiesData = userRoleScreenActivities.create(element);
                    }
                  });
                }
              } else {
                if (reqObj.screenId) {
                  reqObj.screenId.forEach(function (element) {
                    element.screenId = element.value ? element.value : 0;
                    element.userId = reqObj.userId ? reqObj.userId : 0;
                    element.createdBy = reqObj.createdBy ? reqObj.createdBy : 0;
                    element.lastModifiedBy = reqObj.lastModifiedBy ? reqObj.lastModifiedBy : 0;
                    userRoleScreenActivitiesData = userRoleScreenActivities.create(element);
                  });
                }
              }

              return _context.abrupt("return", userRoleScreenActivitiesData);

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

              if (!_context.t0.statusCode) {
                _context.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context.t0
              }));

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 12]]);
    }));

    return function create(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var getUserRoleScreenActivities = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var errors, reqObj, cond, attributes, _yield$users$findAndC, count, userRoleScreenActivitiesData;

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
                cond["userId"] = reqObj.id;
              }

              if (reqObj.userId) {
                cond["userId"] = reqObj.userId;
              }

              cond["isActive"] = true;
              _context2.next = 12;
              return users.findAndCountAll({
                attributes: attributes,
                order: [["id", "ASC"]],
                include: [{
                  model: userRoleScreenActivities,
                  where: cond,
                  include: [{
                    model: screens
                  }, {
                    model: roles
                  }, {
                    model: activities
                  }]
                }]
              });

            case 12:
              _yield$users$findAndC = _context2.sent;
              count = _yield$users$findAndC.count;
              userRoleScreenActivitiesData = _yield$users$findAndC.rows;
              return _context2.abrupt("return", userRoleScreenActivitiesData);

            case 18:
              _context2.prev = 18;
              _context2.t0 = _context2["catch"](0);
              console.error(_context2.t0);

              if (!_context2.t0.statusCode) {
                _context2.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context2.t0
              }));

            case 23:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 18]]);
    }));

    return function getUserRoleScreenActivities(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var getUser = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var errors, reqObj, cond, attributes, _yield$userRoleScreen, count, userRoleScreenActivitiesData;

      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context3.next = 4;
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
                cond["userId"] = reqObj.id;
              }

              cond["isActive"] = true;
              _context3.next = 11;
              return userRoleScreenActivities.findAndCountAll({
                attributes: attributes,
                where: cond,
                include: [{
                  model: screens
                }, {
                  model: roles
                }, {
                  model: activities
                }]
              });

            case 11:
              _yield$userRoleScreen = _context3.sent;
              count = _yield$userRoleScreen.count;
              userRoleScreenActivitiesData = _yield$userRoleScreen.rows;

              if (!(count <= 0)) {
                _context3.next = 16;
                break;
              }

              return _context3.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: userRoleScreenActivitiesData,
                message: _resources["default"].EMPTY
              }));

            case 16:
              return _context3.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: userRoleScreenActivitiesData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 19:
              _context3.prev = 19;
              _context3.t0 = _context3["catch"](0);
              console.error(_context3.t0);

              if (!_context3.t0.statusCode) {
                _context3.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context3.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context3.t0
              }));

            case 24:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 19]]);
    }));

    return function getUser(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  return {
    create: create,
    getUserRoleScreenActivities: getUserRoleScreenActivities,
    getUser: getUser
  };
};

var _default = userRoleScreenActivitiesController();

exports["default"] = _default;
//# sourceMappingURL=userRoleScreenActivities.controller.js.map
