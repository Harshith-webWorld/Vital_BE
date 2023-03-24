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

var _dashboardDao = _interopRequireDefault(require("./../dao/dashboardDao"));

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

var dashboardController = function dashboardController() {
  var get_EndemicityTotalAllDistricts = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, get_EndemicityTotalAllDistrictsDao;
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
              return _dashboardDao["default"].GetEndemicityTotalAllDistrictsDao(req);

            case 7:
              get_EndemicityTotalAllDistrictsDao = _context.sent;

              if (!get_EndemicityTotalAllDistrictsDao.error) {
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
                data: get_EndemicityTotalAllDistrictsDao.data,
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

    return function get_EndemicityTotalAllDistricts(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var get_DashboardTodayEntry = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var reqObj, errors, get_DashboardTodayEntryDao;
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
              return _dashboardDao["default"].get_DashboardTodayEntryDao(req);

            case 7:
              get_DashboardTodayEntryDao = _context2.sent;

              if (!get_DashboardTodayEntryDao.error) {
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
                data: get_DashboardTodayEntryDao.data,
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

    return function get_DashboardTodayEntry(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var DashboardBSCollectedToday = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var reqObj, errors, DashboardBSCollectedTodayDao;
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
              _context3.next = 7;
              return _dashboardDao["default"].DashboardBSCollectedTodayDao(req);

            case 7:
              DashboardBSCollectedTodayDao = _context3.sent;

              if (!DashboardBSCollectedTodayDao.error) {
                _context3.next = 12;
                break;
              }

              return _context3.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context3.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: DashboardBSCollectedTodayDao.data,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 13:
              _context3.next = 20;
              break;

            case 15:
              _context3.prev = 15;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);

              if (!_context3.t0.statusCode) {
                _context3.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context3.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context3.t0
              }));

            case 20:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 15]]);
    }));

    return function DashboardBSCollectedToday(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  var DashboardLFThisMonth = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var reqObj, errors, DashboardLFThisMonthDao;
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
              return _dashboardDao["default"].DashboardLFThisMonthDao(req);

            case 7:
              DashboardLFThisMonthDao = _context4.sent;

              if (!DashboardLFThisMonthDao.error) {
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
                data: DashboardLFThisMonthDao.data,
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

    return function DashboardLFThisMonth(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();

  var DashboardMFPositive12Months = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var reqObj, errors, DashboardMFPositive12MonthsDao;
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
              return _dashboardDao["default"].DashboardMFPositive12MonthsDao(req);

            case 7:
              DashboardMFPositive12MonthsDao = _context5.sent;

              if (!DashboardMFPositive12MonthsDao.error) {
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
                data: DashboardMFPositive12MonthsDao.data,
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

    return function DashboardMFPositive12Months(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();

  var DashboardLFCases12Months = /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var reqObj, errors, DashboardLFCases12MonthsDao;
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
              return _dashboardDao["default"].DashboardLFCases12MonthsDao(req);

            case 7:
              DashboardLFCases12MonthsDao = _context6.sent;

              if (!DashboardLFCases12MonthsDao.error) {
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
                data: DashboardLFCases12MonthsDao.data,
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

    return function DashboardLFCases12Months(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }();

  var DashboardMONotVerified = /*#__PURE__*/function () {
    var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
      var reqObj, errors, DashboardMONotVerifiedDao;
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
              return _dashboardDao["default"].DashboardMONotVerifiedDao(req);

            case 7:
              DashboardMONotVerifiedDao = _context7.sent;

              if (!DashboardMONotVerifiedDao.error) {
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
                data: DashboardMONotVerifiedDao.data,
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

    return function DashboardMONotVerified(_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }();

  var DashboardFSUTargets = /*#__PURE__*/function () {
    var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
      var reqObj, errors, DashboardFSUTargetsDao;
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
              return _dashboardDao["default"].DashboardFSUTargetsDao(req);

            case 7:
              DashboardFSUTargetsDao = _context8.sent;

              if (!DashboardFSUTargetsDao.error) {
                _context8.next = 12;
                break;
              }

              return _context8.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context8.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: DashboardFSUTargetsDao.data,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 13:
              _context8.next = 20;
              break;

            case 15:
              _context8.prev = 15;
              _context8.t0 = _context8["catch"](0);
              console.log(_context8.t0);

              if (!_context8.t0.statusCode) {
                _context8.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context8.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context8.t0
              }));

            case 20:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 15]]);
    }));

    return function DashboardFSUTargets(_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }();

  var DashboardMFRates = /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
      var reqObj, errors, DashboardMFRatesDao;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context9.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              _context9.next = 7;
              return _dashboardDao["default"].DashboardMFRatesDao(req);

            case 7:
              DashboardMFRatesDao = _context9.sent;

              if (!DashboardMFRatesDao.error) {
                _context9.next = 12;
                break;
              }

              return _context9.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context9.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: DashboardMFRatesDao.data,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 13:
              _context9.next = 20;
              break;

            case 15:
              _context9.prev = 15;
              _context9.t0 = _context9["catch"](0);
              console.log(_context9.t0);

              if (!_context9.t0.statusCode) {
                _context9.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context9.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context9.t0
              }));

            case 20:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 15]]);
    }));

    return function DashboardMFRates(_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }();

  var DashboardDrugConsumption = /*#__PURE__*/function () {
    var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
      var reqObj, errors, DashboardDrugConsumptionDao;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context10.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              _context10.next = 7;
              return _dashboardDao["default"].DashboardDrugConsumptionDao(req);

            case 7:
              DashboardDrugConsumptionDao = _context10.sent;

              if (!DashboardDrugConsumptionDao.error) {
                _context10.next = 12;
                break;
              }

              return _context10.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context10.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: DashboardDrugConsumptionDao.data,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 13:
              _context10.next = 20;
              break;

            case 15:
              _context10.prev = 15;
              _context10.t0 = _context10["catch"](0);
              console.log(_context10.t0);

              if (!_context10.t0.statusCode) {
                _context10.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context10.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context10.t0
              }));

            case 20:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[0, 15]]);
    }));

    return function DashboardDrugConsumption(_x19, _x20) {
      return _ref10.apply(this, arguments);
    };
  }();

  var GetMFRateTimeTrend = /*#__PURE__*/function () {
    var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
      var reqObj, errors, GetMFRateTimeTrendDao;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context11.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              _context11.next = 7;
              return _dashboardDao["default"].GetMFRateTimeTrendDao(req);

            case 7:
              GetMFRateTimeTrendDao = _context11.sent;

              if (!GetMFRateTimeTrendDao.error) {
                _context11.next = 12;
                break;
              }

              return _context11.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context11.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: GetMFRateTimeTrendDao.data,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 13:
              _context11.next = 20;
              break;

            case 15:
              _context11.prev = 15;
              _context11.t0 = _context11["catch"](0);
              console.log(_context11.t0);

              if (!_context11.t0.statusCode) {
                _context11.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context11.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context11.t0
              }));

            case 20:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, null, [[0, 15]]);
    }));

    return function GetMFRateTimeTrend(_x21, _x22) {
      return _ref11.apply(this, arguments);
    };
  }();

  var GetMFRateTimeTrendList = /*#__PURE__*/function () {
    var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
      var reqObj, errors, GetMFRateTimeTrendListDao;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context12.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              _context12.next = 7;
              return _dashboardDao["default"].GetMFRateTimeTrendListDao(req);

            case 7:
              GetMFRateTimeTrendListDao = _context12.sent;

              if (!GetMFRateTimeTrendListDao.error) {
                _context12.next = 12;
                break;
              }

              return _context12.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context12.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: GetMFRateTimeTrendListDao.data,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 13:
              _context12.next = 20;
              break;

            case 15:
              _context12.prev = 15;
              _context12.t0 = _context12["catch"](0);
              console.log(_context12.t0);

              if (!_context12.t0.statusCode) {
                _context12.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context12.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context12.t0
              }));

            case 20:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, null, [[0, 15]]);
    }));

    return function GetMFRateTimeTrendList(_x23, _x24) {
      return _ref12.apply(this, arguments);
    };
  }();

  var GetLymphedemaCasesDistricts = /*#__PURE__*/function () {
    var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
      var reqObj, errors, GetLymphedemaCasesDistrictsDao;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context13.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              _context13.next = 7;
              return _dashboardDao["default"].GetLymphedemaCasesDistrictsDao(req);

            case 7:
              GetLymphedemaCasesDistrictsDao = _context13.sent;

              if (!GetLymphedemaCasesDistrictsDao.error) {
                _context13.next = 12;
                break;
              }

              return _context13.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context13.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: GetLymphedemaCasesDistrictsDao.data,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 13:
              _context13.next = 20;
              break;

            case 15:
              _context13.prev = 15;
              _context13.t0 = _context13["catch"](0);
              console.log(_context13.t0);

              if (!_context13.t0.statusCode) {
                _context13.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context13.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context13.t0
              }));

            case 20:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, null, [[0, 15]]);
    }));

    return function GetLymphedemaCasesDistricts(_x25, _x26) {
      return _ref13.apply(this, arguments);
    };
  }();

  var GetHydroceleCasesDistricts = /*#__PURE__*/function () {
    var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
      var reqObj, errors, GetHydroceleCasesDistrictsDao;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context14.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              _context14.next = 7;
              return _dashboardDao["default"].GetHydroceleCasesDistrictsDao(req);

            case 7:
              GetHydroceleCasesDistrictsDao = _context14.sent;

              if (!GetHydroceleCasesDistrictsDao.error) {
                _context14.next = 12;
                break;
              }

              return _context14.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context14.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: GetHydroceleCasesDistrictsDao.data,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 13:
              _context14.next = 20;
              break;

            case 15:
              _context14.prev = 15;
              _context14.t0 = _context14["catch"](0);
              console.log(_context14.t0);

              if (!_context14.t0.statusCode) {
                _context14.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context14.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context14.t0
              }));

            case 20:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, null, [[0, 15]]);
    }));

    return function GetHydroceleCasesDistricts(_x27, _x28) {
      return _ref14.apply(this, arguments);
    };
  }();

  var GetHydroceleSurgeriesDistricts = /*#__PURE__*/function () {
    var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(req, res) {
      var reqObj, errors, GetHydroceleSurgeriesDistrictsDao;
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context15.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              _context15.next = 7;
              return _dashboardDao["default"].GetHydroceleSurgeriesDistrictsDao(req);

            case 7:
              GetHydroceleSurgeriesDistrictsDao = _context15.sent;

              if (!GetHydroceleSurgeriesDistrictsDao.error) {
                _context15.next = 12;
                break;
              }

              return _context15.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context15.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: GetHydroceleSurgeriesDistrictsDao.data,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 13:
              _context15.next = 20;
              break;

            case 15:
              _context15.prev = 15;
              _context15.t0 = _context15["catch"](0);
              console.log(_context15.t0);

              if (!_context15.t0.statusCode) {
                _context15.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context15.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context15.t0
              }));

            case 20:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, null, [[0, 15]]);
    }));

    return function GetHydroceleSurgeriesDistricts(_x29, _x30) {
      return _ref15.apply(this, arguments);
    };
  }();

  var GetMFPositiveCasesDistricts = /*#__PURE__*/function () {
    var _ref16 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req, res) {
      var reqObj, errors, GetMFPositiveCasesDistrictsDao;
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context16.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              _context16.next = 7;
              return _dashboardDao["default"].GetMFPositiveCasesDistrictsDao(req);

            case 7:
              GetMFPositiveCasesDistrictsDao = _context16.sent;

              if (!GetMFPositiveCasesDistrictsDao.error) {
                _context16.next = 12;
                break;
              }

              return _context16.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context16.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: GetMFPositiveCasesDistrictsDao.data,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 13:
              _context16.next = 20;
              break;

            case 15:
              _context16.prev = 15;
              _context16.t0 = _context16["catch"](0);
              console.log(_context16.t0);

              if (!_context16.t0.statusCode) {
                _context16.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context16.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context16.t0
              }));

            case 20:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16, null, [[0, 15]]);
    }));

    return function GetMFPositiveCasesDistricts(_x31, _x32) {
      return _ref16.apply(this, arguments);
    };
  }();

  var GetMDAIDACoverageAndConsumption = /*#__PURE__*/function () {
    var _ref17 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(req, res) {
      var reqObj, errors, GetMDAIDACoverageAndConsumptionDao;
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context17.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              _context17.next = 7;
              return _dashboardDao["default"].GetMDAIDACoverageAndConsumptionDao(req);

            case 7:
              GetMDAIDACoverageAndConsumptionDao = _context17.sent;

              if (!GetMDAIDACoverageAndConsumptionDao.error) {
                _context17.next = 12;
                break;
              }

              return _context17.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context17.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: GetMDAIDACoverageAndConsumptionDao.data,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 13:
              _context17.next = 20;
              break;

            case 15:
              _context17.prev = 15;
              _context17.t0 = _context17["catch"](0);
              console.log(_context17.t0);

              if (!_context17.t0.statusCode) {
                _context17.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context17.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context17.t0
              }));

            case 20:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17, null, [[0, 15]]);
    }));

    return function GetMDAIDACoverageAndConsumption(_x33, _x34) {
      return _ref17.apply(this, arguments);
    };
  }();

  var GetMdaTasActivityStatus = /*#__PURE__*/function () {
    var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(req, res) {
      var reqObj, errors, GetMdaTasActivityStatusDao;
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context18.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              _context18.next = 7;
              return _dashboardDao["default"].GetMdaTasActivityStatusDao(req);

            case 7:
              GetMdaTasActivityStatusDao = _context18.sent;

              if (!GetMdaTasActivityStatusDao.error) {
                _context18.next = 12;
                break;
              }

              return _context18.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context18.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: GetMdaTasActivityStatusDao.data,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 13:
              _context18.next = 20;
              break;

            case 15:
              _context18.prev = 15;
              _context18.t0 = _context18["catch"](0);
              console.log(_context18.t0);

              if (!_context18.t0.statusCode) {
                _context18.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context18.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context18.t0
              }));

            case 20:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18, null, [[0, 15]]);
    }));

    return function GetMdaTasActivityStatus(_x35, _x36) {
      return _ref18.apply(this, arguments);
    };
  }();

  var GetMMDPGraph = /*#__PURE__*/function () {
    var _ref19 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(req, res) {
      var reqObj, errors, GetMMDPGraphDao;
      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context19.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              _context19.next = 7;
              return _dashboardDao["default"].GetMMDPGraphDao(req);

            case 7:
              GetMMDPGraphDao = _context19.sent;

              if (!GetMMDPGraphDao.error) {
                _context19.next = 12;
                break;
              }

              return _context19.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context19.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: GetMMDPGraphDao.data,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 13:
              _context19.next = 20;
              break;

            case 15:
              _context19.prev = 15;
              _context19.t0 = _context19["catch"](0);
              console.log(_context19.t0);

              if (!_context19.t0.statusCode) {
                _context19.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context19.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context19.t0
              }));

            case 20:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19, null, [[0, 15]]);
    }));

    return function GetMMDPGraph(_x37, _x38) {
      return _ref19.apply(this, arguments);
    };
  }();

  var GetFilariaUnitPerformance = /*#__PURE__*/function () {
    var _ref20 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20(req, res) {
      var reqObj, errors, GetFilariaUnitPerformanceDao;
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context20.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              _context20.next = 7;
              return _dashboardDao["default"].GetFilariaUnitPerformanceDao(req);

            case 7:
              GetFilariaUnitPerformanceDao = _context20.sent;

              if (!GetFilariaUnitPerformanceDao.error) {
                _context20.next = 12;
                break;
              }

              return _context20.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context20.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: GetFilariaUnitPerformanceDao.data,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 13:
              _context20.next = 20;
              break;

            case 15:
              _context20.prev = 15;
              _context20.t0 = _context20["catch"](0);
              console.log(_context20.t0);

              if (!_context20.t0.statusCode) {
                _context20.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context20.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context20.t0
              }));

            case 20:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20, null, [[0, 15]]);
    }));

    return function GetFilariaUnitPerformance(_x39, _x40) {
      return _ref20.apply(this, arguments);
    };
  }();

  var GetAlertsForUser = /*#__PURE__*/function () {
    var _ref21 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21(req, res) {
      var reqObj, errors, GetAlertsForUserDao;
      return _regenerator["default"].wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _context21.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context21.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              _context21.next = 7;
              return _dashboardDao["default"].GetAlertsForUserDao(req);

            case 7:
              GetAlertsForUserDao = _context21.sent;

              if (!GetAlertsForUserDao.error) {
                _context21.next = 12;
                break;
              }

              return _context21.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context21.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: GetAlertsForUserDao.data,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 13:
              _context21.next = 20;
              break;

            case 15:
              _context21.prev = 15;
              _context21.t0 = _context21["catch"](0);
              console.log(_context21.t0);

              if (!_context21.t0.statusCode) {
                _context21.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context21.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context21.t0
              }));

            case 20:
            case "end":
              return _context21.stop();
          }
        }
      }, _callee21, null, [[0, 15]]);
    }));

    return function GetAlertsForUser(_x41, _x42) {
      return _ref21.apply(this, arguments);
    };
  }();

  return {
    get_EndemicityTotalAllDistricts: get_EndemicityTotalAllDistricts,
    get_DashboardTodayEntry: get_DashboardTodayEntry,
    DashboardBSCollectedToday: DashboardBSCollectedToday,
    DashboardLFThisMonth: DashboardLFThisMonth,
    DashboardMFPositive12Months: DashboardMFPositive12Months,
    DashboardLFCases12Months: DashboardLFCases12Months,
    DashboardMONotVerified: DashboardMONotVerified,
    DashboardFSUTargets: DashboardFSUTargets,
    DashboardMFRates: DashboardMFRates,
    DashboardDrugConsumption: DashboardDrugConsumption,
    GetMFRateTimeTrend: GetMFRateTimeTrend,
    GetMFRateTimeTrendList: GetMFRateTimeTrendList,
    GetLymphedemaCasesDistricts: GetLymphedemaCasesDistricts,
    GetHydroceleCasesDistricts: GetHydroceleCasesDistricts,
    GetHydroceleSurgeriesDistricts: GetHydroceleSurgeriesDistricts,
    GetMFPositiveCasesDistricts: GetMFPositiveCasesDistricts,
    GetMDAIDACoverageAndConsumption: GetMDAIDACoverageAndConsumption,
    GetMdaTasActivityStatus: GetMdaTasActivityStatus,
    GetMMDPGraph: GetMMDPGraph,
    GetFilariaUnitPerformance: GetFilariaUnitPerformance,
    GetAlertsForUser: GetAlertsForUser
  };
};

var _default = dashboardController();

exports["default"] = _default;
//# sourceMappingURL=dashboardController.js.map
