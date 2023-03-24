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

var _entomologyReportDao = _interopRequireDefault(require("./../dao/entomologyReportDao"));

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

var entomologyReportController = function entomologyReportController() {
  var LarvicidalReport1 = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, LarvicidalReport1Dao;
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
              return _entomologyReportDao["default"].LarvicidalReport1Dao(req);

            case 7:
              LarvicidalReport1Dao = _context.sent;

              if (!LarvicidalReport1Dao.error) {
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
                data: LarvicidalReport1Dao.data,
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

    return function LarvicidalReport1(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var NFCUReportEntomology1 = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var reqObj, errors, NFCUReportEntomology1Dao;
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
              return _entomologyReportDao["default"].NFCUReportEntomology1Dao(req);

            case 7:
              NFCUReportEntomology1Dao = _context2.sent;

              if (!NFCUReportEntomology1Dao.error) {
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
                data: NFCUReportEntomology1Dao.data,
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

    return function NFCUReportEntomology1(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var AdditionalEntomologicalReport = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var reqObj, errors, AdditionalEntomologicalReportDao;
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
              return _entomologyReportDao["default"].AdditionalEntomologicalReportDao(req);

            case 7:
              AdditionalEntomologicalReportDao = _context3.sent;

              if (!AdditionalEntomologicalReportDao.error) {
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
                data: AdditionalEntomologicalReportDao.data,
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

    return function AdditionalEntomologicalReport(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  var BaselineEntomoligicalReport = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var reqObj, errors, BaselineEntomoligicalReportDao;
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
              return _entomologyReportDao["default"].BaselineEntomoligicalReportDao(req);

            case 7:
              BaselineEntomoligicalReportDao = _context4.sent;

              if (!BaselineEntomoligicalReportDao.error) {
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
                data: BaselineEntomoligicalReportDao.data,
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

    return function BaselineEntomoligicalReport(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();

  var LarvalDensityReport = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var reqObj, errors, obj, LarvalDensityReportUnitDao, LarvalDensityReportRuralDao;
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
              obj = {};
              _context5.next = 8;
              return _entomologyReportDao["default"].LarvalDensityReportUnitDao(req);

            case 8:
              LarvalDensityReportUnitDao = _context5.sent;

              if (!LarvalDensityReportUnitDao.error) {
                _context5.next = 13;
                break;
              }

              return _context5.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 13:
              obj.Unit = LarvalDensityReportUnitDao.data;
              _context5.next = 16;
              return _entomologyReportDao["default"].LarvalDensityReportRuralDao(req);

            case 16:
              LarvalDensityReportRuralDao = _context5.sent;

              if (!LarvalDensityReportRuralDao.error) {
                _context5.next = 21;
                break;
              }

              return _context5.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 21:
              obj.Rural = LarvalDensityReportRuralDao.data;
              return _context5.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: obj,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 23:
              _context5.next = 30;
              break;

            case 25:
              _context5.prev = 25;
              _context5.t0 = _context5["catch"](0);
              console.log(_context5.t0);

              if (!_context5.t0.statusCode) {
                _context5.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context5.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context5.t0
              }));

            case 30:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 25]]);
    }));

    return function LarvalDensityReport(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();

  var NFCUMosquitoDisectionReport = /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var reqObj, errors, obj, NFCUMosquitoDisectionReportUnitDao, NFCUMosquitoDisectionReportRuralDao;
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
              obj = {};
              _context6.next = 8;
              return _entomologyReportDao["default"].NFCUMosquitoDisectionReportUnitDao(req);

            case 8:
              NFCUMosquitoDisectionReportUnitDao = _context6.sent;

              if (!NFCUMosquitoDisectionReportUnitDao.error) {
                _context6.next = 13;
                break;
              }

              return _context6.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 13:
              obj.Unit = NFCUMosquitoDisectionReportUnitDao.data;
              _context6.next = 16;
              return _entomologyReportDao["default"].NFCUMosquitoDisectionReportRuralDao(req);

            case 16:
              NFCUMosquitoDisectionReportRuralDao = _context6.sent;

              if (!NFCUMosquitoDisectionReportRuralDao.error) {
                _context6.next = 21;
                break;
              }

              return _context6.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 21:
              obj.Rural = NFCUMosquitoDisectionReportRuralDao.data;
              return _context6.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: obj,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 23:
              _context6.next = 30;
              break;

            case 25:
              _context6.prev = 25;
              _context6.t0 = _context6["catch"](0);
              console.log(_context6.t0);

              if (!_context6.t0.statusCode) {
                _context6.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context6.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context6.t0
              }));

            case 30:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 25]]);
    }));

    return function NFCUMosquitoDisectionReport(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }();

  return {
    LarvicidalReport1: LarvicidalReport1,
    NFCUReportEntomology1: NFCUReportEntomology1,
    AdditionalEntomologicalReport: AdditionalEntomologicalReport,
    BaselineEntomoligicalReport: BaselineEntomoligicalReport,
    LarvalDensityReport: LarvalDensityReport,
    NFCUMosquitoDisectionReport: NFCUMosquitoDisectionReport
  };
};

var _default = entomologyReportController();

exports["default"] = _default;
//# sourceMappingURL=entomologyReportController.js.map
