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

var _FCUReportDao = _interopRequireDefault(require("./../dao/FCUReportDao"));

var lymphedemaLineList = _sequelize["default"].lymphedemaLineList,
    lymphedemaLineListSurvey = _sequelize["default"].lymphedemaLineListSurvey,
    lymphedemaLineListFollowUpsLF = _sequelize["default"].lymphedemaLineListFollowUpsLF,
    lymphedemaLineListFollowUpsHF = _sequelize["default"].lymphedemaLineListFollowUpsHF,
    udCategoryOptions = _sequelize["default"].udCategoryOptions,
    verticalControlFieldUnits = _sequelize["default"].verticalControlFieldUnits,
    verticalControlUnits = _sequelize["default"].verticalControlUnits,
    states = _sequelize["default"].states,
    districts = _sequelize["default"].districts,
    corporations = _sequelize["default"].corporations,
    talukas = _sequelize["default"].talukas,
    zones = _sequelize["default"].zones,
    facilities = _sequelize["default"].facilities,
    subCenters = _sequelize["default"].subCenters,
    wards = _sequelize["default"].wards,
    villages = _sequelize["default"].villages;
var Op = _sequelize["default"].Sequelize.Op;
var sqDB = _sequelize["default"].Sequelize.sqDb;

var FCUReportController = function FCUReportController() {
  var get_FCUAnalysis1List = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, get_FCUAnalysis1Dao;
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
              _context.next = 7;
              return _FCUReportDao["default"].get_FCUAnalysis1Dao(req);

            case 7:
              get_FCUAnalysis1Dao = _context.sent;

              if (!get_FCUAnalysis1Dao.error) {
                _context.next = 12;
                break;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: get_FCUAnalysis1Dao.data,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 13:
              _context.next = 20;
              break;

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

              if (!_context.t0.statusCode) {
                _context.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context.t0
              }));

            case 20:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 15]]);
    }));

    return function get_FCUAnalysis1List(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var get_FCUAnalysis2List = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var reqObj, errors, get_FCUAnalysis2Dao;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context2.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              _context2.next = 7;
              return _FCUReportDao["default"].get_FCUAnalysis2Dao(req);

            case 7:
              get_FCUAnalysis2Dao = _context2.sent;

              if (!get_FCUAnalysis2Dao.error) {
                _context2.next = 12;
                break;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: get_FCUAnalysis2Dao.data,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 13:
              _context2.next = 20;
              break;

            case 15:
              _context2.prev = 15;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);

              if (!_context2.t0.statusCode) {
                _context2.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context2.t0
              }));

            case 20:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 15]]);
    }));

    return function get_FCUAnalysis2List(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var get_FCUAnalysis4List = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var reqObj, errors, obj, UnitLevelDao, SubUnitLevelDao;
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
              obj = {};
              _context3.next = 8;
              return _FCUReportDao["default"].UnitLevelDao(req);

            case 8:
              UnitLevelDao = _context3.sent;

              if (!UnitLevelDao.error) {
                _context3.next = 13;
                break;
              }

              return _context3.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 13:
              obj.UnitLevel = UnitLevelDao.data;
              _context3.next = 16;
              return _FCUReportDao["default"].SubUnitLevelDao(req);

            case 16:
              SubUnitLevelDao = _context3.sent;

              if (!SubUnitLevelDao.error) {
                _context3.next = 21;
                break;
              }

              return _context3.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 21:
              obj.SubUnitLevel = SubUnitLevelDao.data;
              return _context3.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: obj,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 23:
              _context3.next = 30;
              break;

            case 25:
              _context3.prev = 25;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);

              if (!_context3.t0.statusCode) {
                _context3.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context3.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context3.t0
              }));

            case 30:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 25]]);
    }));

    return function get_FCUAnalysis4List(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  var get_FCUAnalysis5List = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var reqObj, errors, vNoCasesDetectedDuringMonthDao;
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
              _context4.next = 7;
              return _FCUReportDao["default"].vNoCasesDetectedDuringMonthDao(req);

            case 7:
              vNoCasesDetectedDuringMonthDao = _context4.sent;

              if (!vNoCasesDetectedDuringMonthDao.error) {
                _context4.next = 12;
                break;
              }

              return _context4.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context4.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: vNoCasesDetectedDuringMonthDao.data,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 13:
              _context4.next = 20;
              break;

            case 15:
              _context4.prev = 15;
              _context4.t0 = _context4["catch"](0);
              console.log(_context4.t0);

              if (!_context4.t0.statusCode) {
                _context4.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context4.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context4.t0
              }));

            case 20:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 15]]);
    }));

    return function get_FCUAnalysis5List(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();

  var get_FCUAnalysis6List = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var reqObj, errors, get_FCUAnalysis6Dao;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context5.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              _context5.next = 7;
              return _FCUReportDao["default"].get_FCUAnalysis6Dao(req);

            case 7:
              get_FCUAnalysis6Dao = _context5.sent;

              if (!get_FCUAnalysis6Dao.error) {
                _context5.next = 12;
                break;
              }

              return _context5.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context5.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: get_FCUAnalysis6Dao.data,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 13:
              _context5.next = 20;
              break;

            case 15:
              _context5.prev = 15;
              _context5.t0 = _context5["catch"](0);
              console.log(_context5.t0);

              if (!_context5.t0.statusCode) {
                _context5.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context5.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context5.t0
              }));

            case 20:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 15]]);
    }));

    return function get_FCUAnalysis6List(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();

  var get_FCUAnalysis10List = /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var reqObj, errors, get_FCUAnalysis10ListDao;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context6.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              _context6.next = 7;
              return _FCUReportDao["default"].get_FCUAnalysis10ListDao(req);

            case 7:
              get_FCUAnalysis10ListDao = _context6.sent;

              if (!get_FCUAnalysis10ListDao.error) {
                _context6.next = 12;
                break;
              }

              return _context6.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context6.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: get_FCUAnalysis10ListDao.data,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 13:
              _context6.next = 20;
              break;

            case 15:
              _context6.prev = 15;
              _context6.t0 = _context6["catch"](0);
              console.log(_context6.t0);

              if (!_context6.t0.statusCode) {
                _context6.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context6.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context6.t0
              }));

            case 20:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 15]]);
    }));

    return function get_FCUAnalysis10List(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }();

  var get_FCUAnalysis7List = /*#__PURE__*/function () {
    var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
      var reqObj, errors, get_FCUAnalysis7ListDao;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context7.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              _context7.next = 7;
              return _FCUReportDao["default"].get_FCUAnalysis7ListDao(req);

            case 7:
              get_FCUAnalysis7ListDao = _context7.sent;

              if (!get_FCUAnalysis7ListDao.error) {
                _context7.next = 12;
                break;
              }

              return _context7.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context7.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: get_FCUAnalysis7ListDao.data,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 13:
              _context7.next = 20;
              break;

            case 15:
              _context7.prev = 15;
              _context7.t0 = _context7["catch"](0);
              console.log(_context7.t0);

              if (!_context7.t0.statusCode) {
                _context7.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context7.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context7.t0
              }));

            case 20:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 15]]);
    }));

    return function get_FCUAnalysis7List(_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }();

  var get_FCUAnalysis8List = /*#__PURE__*/function () {
    var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
      var reqObj, errors, get_FCUAnalysis8ListDao;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context8.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              _context8.next = 7;
              return _FCUReportDao["default"].get_FCUAnalysis8ListDao(req);

            case 7:
              get_FCUAnalysis8ListDao = _context8.sent;
              console.log("get_FCUAnalysis8ListDao", get_FCUAnalysis8ListDao);

              if (!get_FCUAnalysis8ListDao.error) {
                _context8.next = 13;
                break;
              }

              return _context8.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 13:
              return _context8.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: get_FCUAnalysis8ListDao.data,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 14:
              _context8.next = 21;
              break;

            case 16:
              _context8.prev = 16;
              _context8.t0 = _context8["catch"](0);
              console.log(_context8.t0);

              if (!_context8.t0.statusCode) {
                _context8.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context8.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context8.t0
              }));

            case 21:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 16]]);
    }));

    return function get_FCUAnalysis8List(_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }();

  return {
    get_FCUAnalysis1List: get_FCUAnalysis1List,
    get_FCUAnalysis2List: get_FCUAnalysis2List,
    get_FCUAnalysis5List: get_FCUAnalysis5List,
    get_FCUAnalysis6List: get_FCUAnalysis6List,
    get_FCUAnalysis4List: get_FCUAnalysis4List,
    get_FCUAnalysis10List: get_FCUAnalysis10List,
    get_FCUAnalysis7List: get_FCUAnalysis7List,
    get_FCUAnalysis8List: get_FCUAnalysis8List
  };
};

var _default = FCUReportController();

exports["default"] = _default;
//# sourceMappingURL=FCUReportController.js.map
