"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _expressValidator = require("express-validator");

var _httpStatus = _interopRequireDefault(require("http-status"));

var _utils = _interopRequireDefault(require("../services/utils.service"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var _sequelize = _interopRequireDefault(require("../../config/sequelize"));

var _MDAReportDao = _interopRequireDefault(require("../dao/MDAReportDao"));

var postMDAEvalList = _sequelize["default"].postMDAEvalList;
var Op = _sequelize["default"].Sequelize.Op;

var MDAReportController = function MDAReportController() {
  var get_MDATrainingStatus1 = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, obj, StateLvlDao, CHCLvlDao, subCenterLvlDao;
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
              obj = {};
              _context.next = 8;
              return _MDAReportDao["default"].StateLvlDao(req);

            case 8:
              StateLvlDao = _context.sent;

              if (!StateLvlDao.error) {
                _context.next = 13;
                break;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 13:
              obj.StateLvl = StateLvlDao.data;
              _context.next = 16;
              return _MDAReportDao["default"].CHCLvlDao(req);

            case 16:
              CHCLvlDao = _context.sent;

              if (!CHCLvlDao.error) {
                _context.next = 21;
                break;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 21:
              obj.CHCLvl = CHCLvlDao.data;
              _context.next = 24;
              return _MDAReportDao["default"].subCenterLvlDao(req);

            case 24:
              subCenterLvlDao = _context.sent;

              if (!subCenterLvlDao.error) {
                _context.next = 29;
                break;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 29:
              obj.subCenterLvl = subCenterLvlDao.data;
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: obj,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 31:
              _context.next = 38;
              break;

            case 33:
              _context.prev = 33;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

              if (!_context.t0.statusCode) {
                _context.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context.t0
              }));

            case 38:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 33]]);
    }));

    return function get_MDATrainingStatus1(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var coverageReport1 = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var reqObj, errors, coverageReport1Dao;
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
              return _MDAReportDao["default"].coverageReport1Dao(req);

            case 7:
              coverageReport1Dao = _context2.sent;

              if (!coverageReport1Dao.error) {
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
                data: coverageReport1Dao.data,
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

    return function coverageReport1(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var infrastructure = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var reqObj, errors, infrastructureDao;
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
              return _MDAReportDao["default"].infrastructureDao(req);

            case 7:
              infrastructureDao = _context3.sent;

              if (!infrastructureDao.error) {
                _context3.next = 12;
                break;
              }

              return _context3.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                error: infrastructureDao.error,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context3.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: infrastructureDao.data,
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

    return function infrastructure(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  var analysis1_postMDAEvaluation = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var reqObj, errors, analysis1_postMDAEvaluation;
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
              return _MDAReportDao["default"].analysis1_postMDAEvaluationDao(reqObj);

            case 7:
              analysis1_postMDAEvaluation = _context4.sent;

              if (!analysis1_postMDAEvaluation.error) {
                _context4.next = 12;
                break;
              }

              return _context4.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                error: analysis1_postMDAEvaluation.error,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context4.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: analysis1_postMDAEvaluation.data,
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

    return function analysis1_postMDAEvaluation(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();

  var analysis2_postMDAEvaluation = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var reqObj, errors, analysis2_postMDAEvaluation;
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
              return _MDAReportDao["default"].analysis2_postMDAEvaluationDao(reqObj);

            case 7:
              analysis2_postMDAEvaluation = _context5.sent;

              if (!analysis2_postMDAEvaluation.error) {
                _context5.next = 12;
                break;
              }

              return _context5.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                error: analysis2_postMDAEvaluation.error,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context5.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: analysis2_postMDAEvaluation.data,
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

    return function analysis2_postMDAEvaluation(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();

  var get_Co_ordinationCommitteReport = /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var reqObj, errors, Co_ordinationCommitteReportDao;
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
              return _MDAReportDao["default"].Co_ordinationCommitteReportDao(req);

            case 7:
              Co_ordinationCommitteReportDao = _context6.sent;
              console.log(Co_ordinationCommitteReportDao, 'MMMM');

              if (!Co_ordinationCommitteReportDao.error) {
                _context6.next = 13;
                break;
              }

              return _context6.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                error: Co_ordinationCommitteReportDao.error,
                message: "Something Went Wrong"
              }));

            case 13:
              return _context6.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: Co_ordinationCommitteReportDao.data,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 14:
              _context6.next = 21;
              break;

            case 16:
              _context6.prev = 16;
              _context6.t0 = _context6["catch"](0);
              console.log(_context6.t0);

              if (!_context6.t0.statusCode) {
                _context6.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context6.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context6.t0
              }));

            case 21:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 16]]);
    }));

    return function get_Co_ordinationCommitteReport(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }();

  var DrugRequirementMDA1 = /*#__PURE__*/function () {
    var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
      var reqObj, errors, obj, DEC100MgDao, AlbendazoleDao, MactizinDao;
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
              obj = {};
              _context7.next = 8;
              return _MDAReportDao["default"].DEC100MgDao(req);

            case 8:
              DEC100MgDao = _context7.sent;

              if (!DEC100MgDao.error) {
                _context7.next = 13;
                break;
              }

              return _context7.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                error: DEC100MgDao.error,
                message: "Something Went Wrong"
              }));

            case 13:
              obj.DEC100Mg = DEC100MgDao.data;
              _context7.next = 16;
              return _MDAReportDao["default"].AlbendazoleDao(req);

            case 16:
              AlbendazoleDao = _context7.sent;

              if (!AlbendazoleDao.error) {
                _context7.next = 21;
                break;
              }

              return _context7.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                error: AlbendazoleDao.error,
                message: "Something Went Wrong"
              }));

            case 21:
              obj.Albendazole = AlbendazoleDao.data;
              _context7.next = 24;
              return _MDAReportDao["default"].MactizinDao(req);

            case 24:
              MactizinDao = _context7.sent;

              if (!MactizinDao.error) {
                _context7.next = 29;
                break;
              }

              return _context7.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                error: MactizinDao.error,
                message: "Something Went Wrong"
              }));

            case 29:
              obj.Mactizin = MactizinDao.data;
              return _context7.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: obj,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 31:
              _context7.next = 38;
              break;

            case 33:
              _context7.prev = 33;
              _context7.t0 = _context7["catch"](0);
              console.log(_context7.t0);

              if (!_context7.t0.statusCode) {
                _context7.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context7.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context7.t0
              }));

            case 38:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 33]]);
    }));

    return function DrugRequirementMDA1(_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }();

  var DrugRequirementMDA2 = /*#__PURE__*/function () {
    var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
      var reqObj, errors, obj, DrugRequirementMDA2StateDao, DrugRequirementMDA2RdDao;
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
              obj = {};
              _context8.next = 8;
              return _MDAReportDao["default"].DrugRequirementMDA2StateDao(req);

            case 8:
              DrugRequirementMDA2StateDao = _context8.sent;

              if (!DrugRequirementMDA2StateDao.error) {
                _context8.next = 13;
                break;
              }

              return _context8.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                error: DrugRequirementMDA2StateDao.error,
                message: "Something Went Wrong"
              }));

            case 13:
              obj.state = DrugRequirementMDA2StateDao.data;
              _context8.next = 16;
              return _MDAReportDao["default"].DrugRequirementMDA2RdDao(req);

            case 16:
              DrugRequirementMDA2RdDao = _context8.sent;

              if (!DrugRequirementMDA2RdDao.error) {
                _context8.next = 21;
                break;
              }

              return _context8.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                error: DrugRequirementMDA2RdDao.error,
                message: "Something Went Wrong"
              }));

            case 21:
              obj.RD = DrugRequirementMDA2RdDao.data;
              return _context8.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: obj,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 23:
              _context8.next = 30;
              break;

            case 25:
              _context8.prev = 25;
              _context8.t0 = _context8["catch"](0);
              console.log(_context8.t0);

              if (!_context8.t0.statusCode) {
                _context8.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context8.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context8.t0
              }));

            case 30:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 25]]);
    }));

    return function DrugRequirementMDA2(_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }();

  var DrugStockAtPHC = /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
      var reqObj, errors, DrugStockAtPHCDao;
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
              return _MDAReportDao["default"].DrugStockAtPHCDao(req);

            case 7:
              DrugStockAtPHCDao = _context9.sent;

              if (!DrugStockAtPHCDao.error) {
                _context9.next = 12;
                break;
              }

              return _context9.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                error: DrugStockAtPHCDao.error,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context9.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: DrugStockAtPHCDao.data,
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

    return function DrugStockAtPHC(_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }();

  var DrugAdminSupervisorAvailability = /*#__PURE__*/function () {
    var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
      var reqObj, errors, DrugAdminSupervisorAvailabilityDao;
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
              return _MDAReportDao["default"].DrugAdminSupervisorAvailabilityDao(req);

            case 7:
              DrugAdminSupervisorAvailabilityDao = _context10.sent;

              if (!DrugAdminSupervisorAvailabilityDao.error) {
                _context10.next = 12;
                break;
              }

              return _context10.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                error: DrugStockAtPHCDao.error,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context10.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: DrugAdminSupervisorAvailabilityDao.data,
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

    return function DrugAdminSupervisorAvailability(_x19, _x20) {
      return _ref10.apply(this, arguments);
    };
  }();

  var PhcHrAndTrainingStatus = /*#__PURE__*/function () {
    var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
      var reqObj, errors, PhcHrAndTrainingStatusDao;
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
              return _MDAReportDao["default"].PhcHrAndTrainingStatusDao(req);

            case 7:
              PhcHrAndTrainingStatusDao = _context11.sent;

              if (!PhcHrAndTrainingStatusDao.error) {
                _context11.next = 12;
                break;
              }

              return _context11.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                error: DrugStockAtPHCDao.error,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context11.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: PhcHrAndTrainingStatusDao.data,
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

    return function PhcHrAndTrainingStatus(_x21, _x22) {
      return _ref11.apply(this, arguments);
    };
  }();

  var PHCwiseDrugConsumption = /*#__PURE__*/function () {
    var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
      var reqObj, errors, PHCwiseDrugConsumptionDao;
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
              return _MDAReportDao["default"].PHCwiseDrugConsumptionDao(req);

            case 7:
              PHCwiseDrugConsumptionDao = _context12.sent;

              if (!PHCwiseDrugConsumptionDao.error) {
                _context12.next = 12;
                break;
              }

              return _context12.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                error: PHCwiseDrugConsumptionDao.error,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context12.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: PHCwiseDrugConsumptionDao.data,
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

    return function PHCwiseDrugConsumption(_x23, _x24) {
      return _ref12.apply(this, arguments);
    };
  }();

  var BifurcationOfRegularAndMopup = /*#__PURE__*/function () {
    var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
      var reqObj, errors, BifurcationOfRegularAndMopupDao;
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
              return _MDAReportDao["default"].BifurcationOfRegularAndMopupDao(req);

            case 7:
              BifurcationOfRegularAndMopupDao = _context13.sent;

              if (!BifurcationOfRegularAndMopupDao.error) {
                _context13.next = 12;
                break;
              }

              return _context13.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                error: BifurcationOfRegularAndMopupDao.error,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context13.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: BifurcationOfRegularAndMopupDao.data,
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

    return function BifurcationOfRegularAndMopup(_x25, _x26) {
      return _ref13.apply(this, arguments);
    };
  }();

  var ExpenditureBalanceReceivedFunds = /*#__PURE__*/function () {
    var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
      var reqObj, errors, ExpenditureBalanceReceivedFundsDao;
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
              return _MDAReportDao["default"].ExpenditureBalanceReceivedFundsDao(req);

            case 7:
              ExpenditureBalanceReceivedFundsDao = _context14.sent;

              if (!ExpenditureBalanceReceivedFundsDao.error) {
                _context14.next = 12;
                break;
              }

              return _context14.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                error: ExpenditureBalanceReceivedFundsDao.error,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context14.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: ExpenditureBalanceReceivedFundsDao.data,
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

    return function ExpenditureBalanceReceivedFunds(_x27, _x28) {
      return _ref14.apply(this, arguments);
    };
  }();

  var postMDAEvalListDropdown = /*#__PURE__*/function () {
    var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(req, res) {
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.prev = 0;

              _sequelize["default"].sequelize.query("SELECT * FROM public.\"postMDAEvalLists\" where \"isActive\"=true and \"nameOfInvestigator\" IS NOT NULL ORDER BY id ASC ").then(function (_ref16) {
                var _ref17 = (0, _slicedToArray2["default"])(_ref16, 2),
                    results = _ref17[0],
                    metadata = _ref17[1];

                var notUndefined = function notUndefined(anyValue) {
                  return typeof anyValue !== 'undefined';
                };

                var resdropdown = results.map(function (item, i) {
                  if (item.nameOfInvestigator !== '') return {
                    label: item.nameOfInvestigator,
                    value: item.id
                  };else return;
                }).filter(notUndefined);
                console.log(resdropdown);
                return res.status(_httpStatus["default"].OK).json({
                  status: _httpStatus["default"].OK,
                  data: resdropdown,
                  message: _resources["default"].LABEL_SUCCESS
                });
              })["catch"](function (error) {
                return res.status(_httpStatus["default"].BAD_REQUEST).json({
                  status: _httpStatus["default"].BAD_REQUEST,
                  message: error
                });
              });

              _context15.next = 9;
              break;

            case 4:
              _context15.prev = 4;
              _context15.t0 = _context15["catch"](0);
              console.log(_context15.t0, 'err');

              if (!_context15.t0.statusCode) {
                _context15.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context15.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context15.t0
              }));

            case 9:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, null, [[0, 4]]);
    }));

    return function postMDAEvalListDropdown(_x29, _x30) {
      return _ref15.apply(this, arguments);
    };
  }();

  var ProposalWithdrawalOfMDA = /*#__PURE__*/function () {
    var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req, res) {
      var reqObj, errors, ProposalWithdrawalOfMDADao;
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
              return _MDAReportDao["default"].ProposalWithdrawalOfMDADao(req);

            case 7:
              ProposalWithdrawalOfMDADao = _context16.sent;

              if (!ProposalWithdrawalOfMDADao.error) {
                _context16.next = 12;
                break;
              }

              return _context16.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                error: ProposalWithdrawalOfMDADao.error,
                message: "Something Went Wrong"
              }));

            case 12:
              return _context16.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: ProposalWithdrawalOfMDADao.data,
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

    return function ProposalWithdrawalOfMDA(_x31, _x32) {
      return _ref18.apply(this, arguments);
    };
  }();

  return {
    postMDAEvalListDropdown: postMDAEvalListDropdown,
    get_MDATrainingStatus1: get_MDATrainingStatus1,
    coverageReport1: coverageReport1,
    infrastructure: infrastructure,
    analysis1_postMDAEvaluation: analysis1_postMDAEvaluation,
    analysis2_postMDAEvaluation: analysis2_postMDAEvaluation,
    get_Co_ordinationCommitteReport: get_Co_ordinationCommitteReport,
    DrugRequirementMDA1: DrugRequirementMDA1,
    DrugRequirementMDA2: DrugRequirementMDA2,
    DrugStockAtPHC: DrugStockAtPHC,
    DrugAdminSupervisorAvailability: DrugAdminSupervisorAvailability,
    PhcHrAndTrainingStatus: PhcHrAndTrainingStatus,
    PHCwiseDrugConsumption: PHCwiseDrugConsumption,
    BifurcationOfRegularAndMopup: BifurcationOfRegularAndMopup,
    ExpenditureBalanceReceivedFunds: ExpenditureBalanceReceivedFunds,
    ProposalWithdrawalOfMDA: ProposalWithdrawalOfMDA
  };
};

var _default = MDAReportController();

exports["default"] = _default;
//# sourceMappingURL=MDAReportController.js.map
