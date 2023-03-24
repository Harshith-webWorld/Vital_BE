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

var _MFReportDao = _interopRequireDefault(require("./../dao/MFReportDao"));

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

var MFReportController = function MFReportController() {
  var get_AdditionalMFSurveyReportList = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, get_AdditionalMFSurveyReport;
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
              return _MFReportDao["default"].get_AdditionalMFSurveyReportDao(req);

            case 7:
              get_AdditionalMFSurveyReport = _context.sent;
              console.log("get_AdditionalMFSurveyReport", get_AdditionalMFSurveyReport);

              if (!get_AdditionalMFSurveyReport.error) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 13:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: get_AdditionalMFSurveyReport.data,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 14:
              _context.next = 21;
              break;

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

              if (!_context.t0.statusCode) {
                _context.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context.t0
              }));

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 16]]);
    }));

    return function get_AdditionalMFSurveyReportList(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var get_MFBaseLineSurveyList = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var reqObj, errors, get_MFBaseLineSurveyListDao;
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
              console.log("get_AdditionalMFSurveyReport");
              _context2.next = 8;
              return _MFReportDao["default"].get_MFBaseLineSurveyListDao(req);

            case 8:
              get_MFBaseLineSurveyListDao = _context2.sent;
              console.log("get_AdditionalMFSurveyReport", get_MFBaseLineSurveyListDao);

              if (!get_MFBaseLineSurveyListDao.error) {
                _context2.next = 14;
                break;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 14:
              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: get_MFBaseLineSurveyListDao.data,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 15:
              _context2.next = 22;
              break;

            case 17:
              _context2.prev = 17;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);

              if (!_context2.t0.statusCode) {
                _context2.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context2.t0
              }));

            case 22:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 17]]);
    }));

    return function get_MFBaseLineSurveyList(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var DiseaseRate_Villagewise = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var reqObj, errors, DiseaseRate_VillagewiseDao;
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
              return _MFReportDao["default"].DiseaseRate_VillagewiseDao(req);

            case 7:
              DiseaseRate_VillagewiseDao = _context3.sent;

              if (!DiseaseRate_VillagewiseDao.error) {
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
                data: DiseaseRate_VillagewiseDao.data,
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

    return function DiseaseRate_Villagewise(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  return {
    get_AdditionalMFSurveyReportList: get_AdditionalMFSurveyReportList,
    get_MFBaseLineSurveyList: get_MFBaseLineSurveyList,
    DiseaseRate_Villagewise: DiseaseRate_Villagewise
  };
};

var _default = MFReportController();

exports["default"] = _default;
//# sourceMappingURL=MFReportController.js.map
