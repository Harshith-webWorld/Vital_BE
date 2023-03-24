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

var _FSURepotDao = _interopRequireDefault(require("./../dao/FSURepotDao"));

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

var FSUReportController = function FSUReportController() {
  var get_FSUAnalysis1List = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, get_FSUAnalysis1List;
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
              return _FSURepotDao["default"].get_FSUAnalysis1Dao(req);

            case 7:
              get_FSUAnalysis1List = _context.sent;

              if (!get_FSUAnalysis1List.error) {
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
                data: get_FSUAnalysis1List.data,
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

    return function get_FSUAnalysis1List(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var get_FSUAnalysis2List = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var reqObj, errors, get_FSUAnalysis2List;
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
              return _FSURepotDao["default"].get_FSUAnalysis2ListDao(req);

            case 7:
              get_FSUAnalysis2List = _context2.sent;

              if (!get_FSUAnalysis2List.error) {
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
                data: get_FSUAnalysis2List.data,
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

    return function get_FSUAnalysis2List(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var get_FSUAnalysis3List = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var reqObj, errors, get_FSUAnalysis3ListDao;
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
              return _FSURepotDao["default"].get_FSUAnalysis3ListDao(req);

            case 7:
              get_FSUAnalysis3ListDao = _context3.sent;

              if (!get_FSUAnalysis3ListDao.error) {
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
                data: get_FSUAnalysis3ListDao.data,
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

    return function get_FSUAnalysis3List(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  var get_FSUAnalysis4List = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var reqObj, errors, obj, NPSDao, NBSEDao, NPMFDao, No_positive_DiseaseDao, NPLFMFDao, Total_MF_RateDao, Total_Disease_RateDao;
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
              obj = {};
              _context4.next = 8;
              return _FSURepotDao["default"].NPSDao(req);

            case 8:
              NPSDao = _context4.sent;

              if (!NPSDao.error) {
                _context4.next = 13;
                break;
              }

              return _context4.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 13:
              obj.NPS = NPSDao.data;
              _context4.next = 16;
              return _FSURepotDao["default"].NBSEDao(req);

            case 16:
              NBSEDao = _context4.sent;

              if (!NBSEDao.error) {
                _context4.next = 21;
                break;
              }

              return _context4.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 21:
              obj.NBSE = NBSEDao.data;
              _context4.next = 24;
              return _FSURepotDao["default"].NPMFDao(req);

            case 24:
              NPMFDao = _context4.sent;

              if (!NPMFDao.error) {
                _context4.next = 29;
                break;
              }

              return _context4.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 29:
              obj.NPMF = NPMFDao.data;
              _context4.next = 32;
              return _FSURepotDao["default"].No_positive_DiseaseDao(req);

            case 32:
              No_positive_DiseaseDao = _context4.sent;

              if (!No_positive_DiseaseDao.error) {
                _context4.next = 37;
                break;
              }

              return _context4.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 37:
              obj.No_Of_Positive_Disease = No_positive_DiseaseDao.data;
              _context4.next = 40;
              return _FSURepotDao["default"].NPLFMFDao(req);

            case 40:
              NPLFMFDao = _context4.sent;

              if (!NPLFMFDao.error) {
                _context4.next = 45;
                break;
              }

              return _context4.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 45:
              obj.NPLFMF = NPLFMFDao.data;
              _context4.next = 48;
              return _FSURepotDao["default"].Total_MF_RateDao(req);

            case 48:
              Total_MF_RateDao = _context4.sent;

              if (!Total_MF_RateDao.error) {
                _context4.next = 53;
                break;
              }

              return _context4.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 53:
              obj.Total_MF_Rate = Total_MF_RateDao.data;
              _context4.next = 56;
              return _FSURepotDao["default"].Total_Disease_RateDao(req);

            case 56:
              Total_Disease_RateDao = _context4.sent;

              if (!Total_Disease_RateDao.error) {
                _context4.next = 61;
                break;
              }

              return _context4.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 61:
              obj.Total_Disease_Rate = Total_Disease_RateDao.data;
              return _context4.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: obj,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 63:
              _context4.next = 70;
              break;

            case 65:
              _context4.prev = 65;
              _context4.t0 = _context4["catch"](0);
              console.log(_context4.t0);

              if (!_context4.t0.statusCode) {
                _context4.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context4.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context4.t0
              }));

            case 70:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 65]]);
    }));

    return function get_FSUAnalysis4List(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();

  var get_FSUAnalysis5List = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var reqObj, errors, get_FSUAnalysis5ListDao;
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
              return _FSURepotDao["default"].get_FSUAnalysis5ListDao(req);

            case 7:
              get_FSUAnalysis5ListDao = _context5.sent;

              if (!get_FSUAnalysis5ListDao.error) {
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
                data: get_FSUAnalysis5ListDao.data,
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

    return function get_FSUAnalysis5List(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();

  var fsuPercentageTargetCompleted = /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var reqObj, errors, fsuPercentageTargetCompletedDao;
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
              return _FSURepotDao["default"].fsuPercentageTargetCompletedDao(req);

            case 7:
              fsuPercentageTargetCompletedDao = _context6.sent;

              if (!fsuPercentageTargetCompletedDao.error) {
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
                data: fsuPercentageTargetCompletedDao.data,
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

    return function fsuPercentageTargetCompleted(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }();

  return {
    get_FSUAnalysis1List: get_FSUAnalysis1List,
    get_FSUAnalysis2List: get_FSUAnalysis2List,
    get_FSUAnalysis3List: get_FSUAnalysis3List,
    get_FSUAnalysis4List: get_FSUAnalysis4List,
    get_FSUAnalysis5List: get_FSUAnalysis5List,
    fsuPercentageTargetCompleted: fsuPercentageTargetCompleted
  };
};

var _default = FSUReportController();

exports["default"] = _default;
//# sourceMappingURL=FSURepotController.js.map
