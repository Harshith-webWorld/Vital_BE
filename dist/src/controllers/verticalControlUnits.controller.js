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

var verticalControlUnits = _sequelize["default"].verticalControlUnits,
    verticalControlFieldUnits = _sequelize["default"].verticalControlFieldUnits;
var Op = _sequelize["default"].Sequelize.Op;

var verticalControlUnitsController = function verticalControlUnitsController() {
  var getverticalControlUnits = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var errors, reqObj, cond, attributes, _yield$verticalContro, count, verticalControlUnitsData;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context.next = 4;
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

              if (reqObj.unitType) {
                cond["unitType"] = reqObj.unitType;
              }

              cond["isActive"] = true;
              _context.next = 12;
              return verticalControlUnits.findAndCountAll({
                where: cond,
                attributes: attributes,
                order: [["id", "ASC"]]
              });

            case 12:
              _yield$verticalContro = _context.sent;
              count = _yield$verticalContro.count;
              verticalControlUnitsData = _yield$verticalContro.rows;

              if (!(count <= 0)) {
                _context.next = 17;
                break;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: verticalControlUnitsData,
                message: _resources["default"].EMPTY
              }));

            case 17:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: verticalControlUnitsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 20:
              _context.prev = 20;
              _context.t0 = _context["catch"](0);
              console.error(_context.t0);

              if (!_context.t0.statusCode) {
                _context.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context.t0
              }));

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 20]]);
    }));

    return function getverticalControlUnits(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var getverticalControlFieldUnits = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var errors, reqObj, cond, attributes, _yield$verticalContro2, count, verticalControlFieldUnitData;

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
                cond["verticalControlUnitId"] = reqObj.id;
              }

              cond["isActive"] = true;
              _context2.next = 11;
              return verticalControlFieldUnits.findAndCountAll({
                where: cond,
                attributes: attributes,
                order: [["id", "ASC"]]
              });

            case 11:
              _yield$verticalContro2 = _context2.sent;
              count = _yield$verticalContro2.count;
              verticalControlFieldUnitData = _yield$verticalContro2.rows;

              if (!(count <= 0)) {
                _context2.next = 16;
                break;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: verticalControlFieldUnitData,
                message: _resources["default"].EMPTY
              }));

            case 16:
              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: verticalControlFieldUnitData,
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

    return function getverticalControlFieldUnits(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var createverticalControlUnits = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var reqObj, errors, verticalControlUnitsData, whereCodn;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context3.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              verticalControlUnitsData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (!reqObj.nameOfControlUnit) {
                _context3.next = 12;
                break;
              }

              whereCodn["nameOfControlUnit"] = reqObj.nameOfControlUnit;
              _context3.next = 13;
              break;

            case 12:
              return _context3.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].NAMEOFCONTROLUNIT_REQUIRED
              }));

            case 13:
              if (!reqObj.id) {
                _context3.next = 19;
                break;
              }

              _context3.next = 16;
              return verticalControlUnits.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 16:
              verticalControlUnitsData = _context3.sent;
              _context3.next = 24;
              break;

            case 19:
              /*verticalControlUnitsData = await verticalControlUnits.findOne({
              	where: whereCodn,
              	attributes: {
              		exclude: ["createdAt", "updatedAt"],
              	},
              });
              if (
              	verticalControlUnitsData &&
              	verticalControlUnitsData.isNewRecord === false
              ) {
              	return res.status(httpStatus.OK).json({
              		status: httpStatus.OK,
              		message: label.VILLAGE_ALREADY_EXISTS,
              	});
              }*/
              console.log("123 sure");
              console.log(reqObj);
              _context3.next = 23;
              return verticalControlUnits.create(reqObj);

            case 23:
              verticalControlUnitsData = _context3.sent;

            case 24:
              return _context3.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: verticalControlUnitsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 27:
              _context3.prev = 27;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);

              if (!_context3.t0.statusCode) {
                _context3.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context3.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context3.t0
              }));

            case 32:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 27]]);
    }));

    return function createverticalControlUnits(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  var createverticalControlFieldUnits = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var reqObj, errors, verticalControlUnitsData, whereCodn;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context4.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              verticalControlUnitsData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (!reqObj.fieldUnitName) {
                _context4.next = 12;
                break;
              }

              whereCodn["fieldUnitName"] = reqObj.fieldUnitName;
              _context4.next = 13;
              break;

            case 12:
              return _context4.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].FIELDUNITNAME_REQUIRED
              }));

            case 13:
              if (!reqObj.id) {
                _context4.next = 19;
                break;
              }

              _context4.next = 16;
              return verticalControlFieldUnits.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 16:
              verticalControlUnitsData = _context4.sent;
              _context4.next = 27;
              break;

            case 19:
              _context4.next = 21;
              return verticalControlFieldUnits.findOne({
                where: whereCodn,
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                }
              });

            case 21:
              verticalControlUnitsData = _context4.sent;

              if (!(verticalControlUnitsData && verticalControlUnitsData.isNewRecord === false)) {
                _context4.next = 24;
                break;
              }

              return _context4.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].VILLAGE_ALREADY_EXISTS
              }));

            case 24:
              _context4.next = 26;
              return verticalControlFieldUnits.create(reqObj);

            case 26:
              verticalControlUnitsData = _context4.sent;

            case 27:
              return _context4.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: verticalControlUnitsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 30:
              _context4.prev = 30;
              _context4.t0 = _context4["catch"](0);
              console.log(_context4.t0);

              if (!_context4.t0.statusCode) {
                _context4.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context4.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context4.t0
              }));

            case 35:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 30]]);
    }));

    return function createverticalControlFieldUnits(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();

  return {
    getverticalControlUnits: getverticalControlUnits,
    getverticalControlFieldUnits: getverticalControlFieldUnits,
    createverticalControlFieldUnits: createverticalControlFieldUnits,
    createverticalControlUnits: createverticalControlUnits
  };
};

var _default = verticalControlUnitsController();

exports["default"] = _default;
//# sourceMappingURL=verticalControlUnits.controller.js.map
