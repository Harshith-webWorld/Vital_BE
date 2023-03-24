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

var _LFReportDao = _interopRequireDefault(require("../dao/LFReportDao"));

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

var LFReportController = function LFReportController() {
  var getLfAnalysis1 = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, getLfAnalysis1Dao;
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
              return _LFReportDao["default"].getLfAnalysis1Dao(req);

            case 7:
              getLfAnalysis1Dao = _context.sent;

              if (!getLfAnalysis1Dao.error) {
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
                data: getLfAnalysis1Dao.data,
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

    return function getLfAnalysis1(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var getLfAnalysis2 = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var reqObj, errors, getLfAnalysis2Dao;
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
              return _LFReportDao["default"].getLfAnalysis2Dao(req);

            case 7:
              getLfAnalysis2Dao = _context2.sent;

              if (!getLfAnalysis2Dao.error) {
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
                data: getLfAnalysis2Dao.data,
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

    return function getLfAnalysis2(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var get_LF_DieseaseCasesList1 = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var reqObj, errors, get_LF_DieseaseCasesListDao;
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
              return _LFReportDao["default"].get_LF_DieseaseCasesListDao(req);

            case 7:
              get_LF_DieseaseCasesListDao = _context3.sent;

              if (!get_LF_DieseaseCasesListDao.error) {
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
                data: get_LF_DieseaseCasesListDao.data,
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

    return function get_LF_DieseaseCasesList1(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  var get_LF_HydroceleOPLineList = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var reqObj, errors, get_LF_HydroceleOPLineListDao;
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
              return _LFReportDao["default"].get_LF_HydroceleOPLineListDao(req);

            case 7:
              get_LF_HydroceleOPLineListDao = _context4.sent;

              if (!get_LF_HydroceleOPLineListDao.error) {
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
                data: get_LF_HydroceleOPLineListDao.data,
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

    return function get_LF_HydroceleOPLineList(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();

  var get_LF_PendingHydroceleCasesList = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var reqObj, errors, get_LF_HydroceleOPLineListDao;
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
              return _LFReportDao["default"].get_LF_PendingHydroceleCasesListDao(req);

            case 7:
              get_LF_HydroceleOPLineListDao = _context5.sent;

              if (!get_LF_HydroceleOPLineListDao.error) {
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
                data: get_LF_HydroceleOPLineListDao.data,
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

    return function get_LF_PendingHydroceleCasesList(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();

  var getLfAnalysis3 = /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var reqObj, errors, districtId, start_year, end_year, d, current_year, page, itemsPerPage, offset;
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
              districtId = "and  L.\"districtId\" = ".concat(req.body.districtId);
              start_year = "".concat(req.body.startYear);
              end_year = " ".concat(req.body.endYear); // var month = `and  L."month" = ${req.body.month}`

              if (req.body.districtId.length == 0) {
                districtId = "";
              }

              if (req.body.startYear.length == 0) {
                start_year = "1900";
              }

              if (req.body.endYear.length == 0) {
                d = new Date();
                current_year = d.getFullYear();
                end_year = current_year;
              } // if (req.body.month.length == 0) {
              // 	month = ""
              // }


              page = reqObj.page ? reqObj.page : 1;
              itemsPerPage = reqObj.itemsPerPage ? reqObj.itemsPerPage : 10;
              offset = (page - 1) * itemsPerPage;

              _sequelize["default"].sequelize.query("\nSelect A1.*,COALESCE(A2.\"NoLFCasesTrainedMM\",0) \"NoLFCasesTrainedMM\", \nCOALESCE(A3.\"NoBalanceToBeTrained\",0) \"NoBalanceToBeTrained\",\nCOALESCE(A4.\"NoTrainedLFCasesFollowingMM\",0) \"NoTrainedLFCasesFollowingMM\", \nCOALESCE(A5.\"NoOfHydroceleCases\",0) \"NoOfHydroceleCases\",\nCOALESCE(A6.\"NoIneligibleForSurgery\",0) \"NoIneligibleForSurgery\",\nCOALESCE(A7.\"NoOfHydroceleOperated\",0) \"NoOfHydroceleOperated\",\nCOALESCE(A8.\"BalanceToBeOperated\",0) \"BalanceToBeOperated\"\nfrom (select L.Year,D.\"districtName\", L.\"districtId\",Count(L.\"patientId\") as \"NoLFCases\"\n\tfrom public.\"lymphedemaLineLists\" L\n\tleft join public.districts D on D.id = L.\"districtId\"\n\twhere L.\"diseaseType\" like '%Lymphedema%'and L.\"isActive\"=true\n\t".concat(districtId, " and L.\"year\" BETWEEN ").concat(start_year, " AND ").concat(end_year, "\n\tgroup by L.Year,D.\"districtName\", L.\"districtId\") A1\nLeft Join\n(select L.Year,D.\"districtName\", L.\"districtId\",Count(L.\"patientId\") as \"NoLFCasesTrainedMM\"\n\tfrom public.\"lymphedemaLineLists\" L\n\tleft join public.districts D on D.id = L.\"districtId\"\n    left join (select LF1.\"lymphedemaLineListId\",LF1.\"isServiceMMDPTrainingGiven\" from public.\"lymphedemaLineListFollowUpsLves\" LF1\n    where LF1.\"isServiceMMDPTrainingGiven\"=true ) LF\n    on LF.\"lymphedemaLineListId\" = L.id \n \twhere L.\"isActive\"=true\n    ").concat(districtId, " and L.\"year\" BETWEEN ").concat(start_year, " AND ").concat(end_year, "\n    group by L.year,D.\"districtName\", L.\"districtId\") A2\nON A1.\"districtId\"=A2.\"districtId\" and A1.\"year\"=A2.\"year\"\nLeft Join\n(select L.Year,D.\"districtName\", L.\"districtId\",Count(L.\"patientId\") as \"NoBalanceToBeTrained\"\n\tfrom public.\"lymphedemaLineLists\" L\n\tleft join public.districts D on D.id = L.\"districtId\"\n    left join(select LF1.\"lymphedemaLineListId\",LF1.\"isServiceMMDPTrainingGiven\" from public.\"lymphedemaLineListFollowUpsLves\" LF1\n\twhere LF1.\"isServiceMMDPTrainingGiven\"=false) LF\n\tON LF.\"lymphedemaLineListId\" = L.id\n    where L.\"isActive\"=true\n    ").concat(districtId, " and L.\"year\" BETWEEN ").concat(start_year, " AND ").concat(end_year, "\n\tgroup by L.Year,D.\"districtName\", L.\"districtId\")A3\nON A1.\"districtId\"=A3.\"districtId\" and A1.\"year\"=A3.\"year\"\nLeft Join\n(select L.Year,D.\"districtName\",L.\"districtId\",Count(L.\"patientId\") as \"NoTrainedLFCasesFollowingMM\"\n\tfrom public.\"lymphedemaLineLists\" L\n\tleft join public.districts D on D.id = L.\"districtId\"\n    left join (select LF1.\"lymphedemaLineListId\",LF1.\"isServicePatientFollowingMM\" from public.\"lymphedemaLineListFollowUpsLves\" LF1\n\twhere LF1.\"isServicePatientFollowingMM\"=true) LF\n    ON LF.\"lymphedemaLineListId\" = L.id\n\twhere L.\"isActive\"=true \n \t").concat(districtId, " and L.\"year\" BETWEEN ").concat(start_year, " AND ").concat(end_year, "\n    group by L.Year,D.\"districtName\",L.\"districtId\") A4\nON A1.\"districtId\"=A4.\"districtId\" and A1.\"year\"=A4.\"year\"\nLeft Join\n\t(select L.Year,D.\"districtName\",L.\"districtId\",Count(L.\"patientId\") as \"NoOfHydroceleCases\"\n\tfrom public.\"lymphedemaLineLists\" L\n\tleft join public.districts D on D.id = L.\"districtId\"\n\twhere L.\"diseaseType\" like '%\"Hydrocele\"%' and L.\"isActive\"=true\n\t").concat(districtId, " and L.\"year\" BETWEEN ").concat(start_year, " AND ").concat(end_year, "\n\tgroup by L.Year,D.\"districtName\",L.\"districtId\")A5\nON A1.\"districtId\"=A5.\"districtId\" and A1.\"year\"=A5.\"year\"\nLeft Join\n\t(select L.Year,D.\"districtName\",L.\"districtId\",Count(L.\"patientId\") as \"NoIneligibleForSurgery\"\n\tfrom public.\"lymphedemaLineLists\" L\n\tleft join public.districts D on D.id = L.\"districtId\"\n\tleft join (select HF1.\"lymphedemaLineListId\",HF1.\"surgeryNotPossibleReasonsId\" from public.\"lymphedemaLineListFollowUpsHFs\" HF1\n\twhere HF1.\"surgeryNotPossibleReasonsId\" is null) HF\n\tON  HF.\"lymphedemaLineListId\" = L.id\n\twhere L.\"isActive\"=true \n\t").concat(districtId, " and L.\"year\" BETWEEN ").concat(start_year, " AND ").concat(end_year, "\n\tgroup by L.Year,D.\"districtName\",L.\"districtId\")A6\nON A1.\"districtId\"=A6.\"districtId\" and A1.\"year\"=A6.\"year\"\nLeft Join\n\t(select L.Year,D.\"districtName\",L.\"districtId\",Count(L.\"patientId\") as \"NoOfHydroceleOperated\"\n\tfrom public.\"lymphedemaLineLists\" L\n\tleft join public.districts D on D.id = L.\"districtId\"\n\tleft join (select HF1.\"lymphedemaLineListId\",HF1.\"isSurgeryDone\" from public.\"lymphedemaLineListFollowUpsHFs\" HF1\n\twhere HF1.\"isSurgeryDone\" =true) HF\n\tON HF.\"lymphedemaLineListId\" = L.id\n\twhere L.\"isActive\"=true\n\t").concat(districtId, " and L.\"year\" BETWEEN ").concat(start_year, " AND ").concat(end_year, "\ngroup by L.Year,D.\"districtName\",L.\"districtId\")A7\nON A1.\"districtId\"=A7.\"districtId\" and A1.\"year\"=A7.\"year\"\nLeft Join \n\t(select L.Year,D.\"districtName\",L.\"districtId\",Count(L.\"patientId\") as \"BalanceToBeOperated\"\n\tfrom public.\"lymphedemaLineLists\" L\n\tleft join public.districts D on D.id = L.\"districtId\"\n\tLEFT   JOIN LATERAL (select HF1.\"lymphedemaLineListId\",HF1.\"isSurgeryDone\" from public.\"lymphedemaLineListFollowUpsHFs\" HF1\n\twhere HF1.\"isSurgeryDone\" =false) HF\n\tON true where HF.\"lymphedemaLineListId\" = L.id\n\tand L.\"isActive\"=true \n\t").concat(districtId, " and L.\"year\" BETWEEN ").concat(start_year, " AND ").concat(end_year, "\n\tgroup by L.Year,D.\"districtName\",L.\"districtId\") A8\n\tON A1.\"districtId\"=A8.\"districtId\" and A1.\"year\"=A8.\"year\"\n\t\t\toffset ").concat(offset, " \n\t\t\tlimit ").concat(itemsPerPage, "\n\t\t\t")).then(function (_ref7) {
                var _ref8 = (0, _slicedToArray2["default"])(_ref7, 2),
                    results = _ref8[0],
                    metadata = _ref8[1];

                return res.status(_httpStatus["default"].OK).json({
                  status: _httpStatus["default"].OK,
                  data: results,
                  message: _resources["default"].LABEL_SUCCESS
                });
              });

              _context6.next = 22;
              break;

            case 17:
              _context6.prev = 17;
              _context6.t0 = _context6["catch"](0);
              console.log(_context6.t0);

              if (!_context6.t0.statusCode) {
                _context6.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context6.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context6.t0
              }));

            case 22:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 17]]);
    }));

    return function getLfAnalysis3(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }();

  var LF_MMDPActivityReporting = /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
      var reqObj, errors, LF_MMDPActivityReportingDao;
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
              return _LFReportDao["default"].LF_MMDPActivityReportingDao(req);

            case 7:
              LF_MMDPActivityReportingDao = _context7.sent;

              if (!LF_MMDPActivityReportingDao.error) {
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
                data: LF_MMDPActivityReportingDao.data,
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

    return function LF_MMDPActivityReporting(_x13, _x14) {
      return _ref9.apply(this, arguments);
    };
  }();

  var getLF_PerformanceOfSurgeons = /*#__PURE__*/function () {
    var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
      var reqObj, errors, page, itemsPerPage, offset;
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
              page = reqObj.page ? reqObj.page : 1;
              itemsPerPage = reqObj.itemsPerPage ? reqObj.itemsPerPage : 10;
              offset = (page - 1) * itemsPerPage;

              _sequelize["default"].sequelize.query("\n\t\t\tselect LH.\"nameOfSurgeon\",LH.\"surgeonPhone\",F.\"facilityName\",\nF1.\"facilityName\" as nameOfHospitalSurgeryDone,Count(LH.id) As \"NoOfOperations\"\nfrom public.\"lymphedemaLineListFollowUpsHFs\" LH\nleft Join public.\"lymphedemaLineLists\" L on L.id=LH.\"lymphedemaLineListId\"\nleft join public.districts D on D.id = L.\"districtId\"\nleft join public.facilities F on F.id = L.\"facilityId\"\nleft join public.facilities F1 on F1.id = LH.\"nameOfHospitalSurgeryDoneId\"\nwhere LH.\"isSurgeryDone\" = true\ngroup by L.Year,D.\"districtName\" ,LH.\"nameOfSurgeon\",LH.\"surgeonPhone\",\nF.\"facilityName\",F1.\"facilityName\"").then(function (_ref11) {
                var _ref12 = (0, _slicedToArray2["default"])(_ref11, 2),
                    results = _ref12[0],
                    metadata = _ref12[1];

                // Results will be an empty array and metadata will contain the number of affected rows.
                return res.status(_httpStatus["default"].OK).json({
                  status: _httpStatus["default"].OK,
                  data: results,
                  message: _resources["default"].LABEL_SUCCESS
                });
              });

              _context8.next = 16;
              break;

            case 11:
              _context8.prev = 11;
              _context8.t0 = _context8["catch"](0);
              console.log(_context8.t0);

              if (!_context8.t0.statusCode) {
                _context8.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context8.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context8.t0
              }));

            case 16:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 11]]);
    }));

    return function getLF_PerformanceOfSurgeons(_x15, _x16) {
      return _ref10.apply(this, arguments);
    };
  }();

  var getLF_PerformanceOfInstitutes = /*#__PURE__*/function () {
    var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
      var reqObj, errors, page, itemsPerPage, offset;
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
              page = reqObj.page ? reqObj.page : 1;
              itemsPerPage = reqObj.itemsPerPage ? reqObj.itemsPerPage : 10;
              offset = (page - 1) * itemsPerPage;

              _sequelize["default"].sequelize.query("\n\t\t\tselect S1.\"facilityName\",sum(S1.\"NoOfOperations\") \"NoOfOperations\",count(S1.\"nameOfSurgeon\") AS \"NoOfSurgeon\"\nfrom (select F.\"facilityName\",Count(LH.id) As \"NoOfOperations\",LH.\"nameOfSurgeon\",\n L.Year,D.\"districtName\"\nfrom public.\"lymphedemaLineListFollowUpsHFs\" LH\nleft Join public.\"lymphedemaLineLists\" L on L.id=LH.\"lymphedemaLineListId\"\nleft join public.districts D on D.id = L.\"districtId\"\nleft join public.facilities F on F.id = L.\"facilityId\"\nleft join public.facilities F1 on F1.id = LH.\"nameOfHospitalSurgeryDoneId\"\nwhere LH.\"isSurgeryDone\" = true\ngroup by L.Year,D.\"districtName\" ,LH.\"nameOfSurgeon\",F.\"facilityName\") S1\ngroup by S1.Year,S1.\"districtName\" ,S1.\"nameOfSurgeon\",S1.\"facilityName\"").then(function (_ref14) {
                var _ref15 = (0, _slicedToArray2["default"])(_ref14, 2),
                    results = _ref15[0],
                    metadata = _ref15[1];

                // Results will be an empty array and metadata will contain the number of affected rows.
                return res.status(_httpStatus["default"].OK).json({
                  status: _httpStatus["default"].OK,
                  data: results,
                  message: _resources["default"].LABEL_SUCCESS
                });
              });

              _context9.next = 16;
              break;

            case 11:
              _context9.prev = 11;
              _context9.t0 = _context9["catch"](0);
              console.log(_context9.t0);

              if (!_context9.t0.statusCode) {
                _context9.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context9.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context9.t0
              }));

            case 16:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 11]]);
    }));

    return function getLF_PerformanceOfInstitutes(_x17, _x18) {
      return _ref13.apply(this, arguments);
    };
  }();

  var get_LF_PatientsineligibleForSurgery = /*#__PURE__*/function () {
    var _ref16 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
      var reqObj, errors, get_LF_PatientsineligibleForSurgery;
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
              return _LFReportDao["default"].get_LF_PatientsineligibleForSurgery(req);

            case 7:
              get_LF_PatientsineligibleForSurgery = _context10.sent;

              if (!get_LF_PatientsineligibleForSurgery.error) {
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
                data: get_LF_PatientsineligibleForSurgery.data,
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

    return function get_LF_PatientsineligibleForSurgery(_x19, _x20) {
      return _ref16.apply(this, arguments);
    };
  }();

  var VerifiedbyMO = /*#__PURE__*/function () {
    var _ref17 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
      var reqObj, errors, VerifiedbyMODao;
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
              return _LFReportDao["default"].VerifiedbyMODao(req);

            case 7:
              VerifiedbyMODao = _context11.sent;

              if (!VerifiedbyMODao.error) {
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
                data: VerifiedbyMODao.data,
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

    return function VerifiedbyMO(_x21, _x22) {
      return _ref17.apply(this, arguments);
    };
  }();

  var LF_PerformanceOfInstitutes = /*#__PURE__*/function () {
    var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
      var reqObj, errors, LF_PerformanceOfInstitutesDao;
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
              return _LFReportDao["default"].LF_PerformanceOfInstitutesDao(req);

            case 7:
              LF_PerformanceOfInstitutesDao = _context12.sent;

              if (!LF_PerformanceOfInstitutesDao.error) {
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
                data: LF_PerformanceOfInstitutesDao.data,
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

    return function LF_PerformanceOfInstitutes(_x23, _x24) {
      return _ref18.apply(this, arguments);
    };
  }();

  var LF_PerformanceOfSurgeons = /*#__PURE__*/function () {
    var _ref19 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
      var reqObj, errors, LF_PerformanceOfSurgeonsDao;
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
              return _LFReportDao["default"].LF_PerformanceOfSurgeonsDao(req);

            case 7:
              LF_PerformanceOfSurgeonsDao = _context13.sent;

              if (!LF_PerformanceOfSurgeonsDao.error) {
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
                data: LF_PerformanceOfSurgeonsDao.data,
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

    return function LF_PerformanceOfSurgeons(_x25, _x26) {
      return _ref19.apply(this, arguments);
    };
  }();

  var PlanningForOT = /*#__PURE__*/function () {
    var _ref20 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
      var reqObj, errors, PlanningForOTDao;
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
              return _LFReportDao["default"].PlanningForOTDao(req);

            case 7:
              PlanningForOTDao = _context14.sent;

              if (!PlanningForOTDao.error) {
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
                data: PlanningForOTDao.data,
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

    return function PlanningForOT(_x27, _x28) {
      return _ref20.apply(this, arguments);
    };
  }();

  var get_FollowUpservicesToLFpatients = /*#__PURE__*/function () {
    var _ref21 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(req, res) {
      var reqObj, errors, FollowUpServicesLymphedemaDao;
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
              return _LFReportDao["default"].FollowUpServicesLymphedemaDao(req);

            case 7:
              FollowUpServicesLymphedemaDao = _context15.sent;
              console.log("get_AdditionalMFSurveyReport", FollowUpServicesLymphedemaDao);

              if (!FollowUpServicesLymphedemaDao.error) {
                _context15.next = 13;
                break;
              }

              return _context15.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 13:
              return _context15.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: FollowUpServicesLymphedemaDao.data,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 14:
              _context15.next = 21;
              break;

            case 16:
              _context15.prev = 16;
              _context15.t0 = _context15["catch"](0);
              console.log(_context15.t0);

              if (!_context15.t0.statusCode) {
                _context15.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context15.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context15.t0
              }));

            case 21:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15, null, [[0, 16]]);
    }));

    return function get_FollowUpservicesToLFpatients(_x29, _x30) {
      return _ref21.apply(this, arguments);
    };
  }();

  var get_FollowUpservicesToHydrocelePatients = /*#__PURE__*/function () {
    var _ref22 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req, res) {
      var reqObj, errors, FollowUpServicesHydroceleDao;
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
              return _LFReportDao["default"].FollowUpServicesHydroceleDao(req);

            case 7:
              FollowUpServicesHydroceleDao = _context16.sent;

              if (!FollowUpServicesHydroceleDao.error) {
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
                data: FollowUpServicesHydroceleDao.data,
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

    return function get_FollowUpservicesToHydrocelePatients(_x31, _x32) {
      return _ref22.apply(this, arguments);
    };
  }();

  var get_GradingOfLFPatients = /*#__PURE__*/function () {
    var _ref23 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(req, res) {
      var reqObj, errors, get_LF_HydroceleOPLineListDao;
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
              return _LFReportDao["default"].get_GradingOfLFPatientsDao(req);

            case 7:
              get_LF_HydroceleOPLineListDao = _context17.sent;

              if (!get_LF_HydroceleOPLineListDao.error) {
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
                data: get_LF_HydroceleOPLineListDao.data,
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

    return function get_GradingOfLFPatients(_x33, _x34) {
      return _ref23.apply(this, arguments);
    };
  }();

  return {
    getLfAnalysis1: getLfAnalysis1,
    getLfAnalysis2: getLfAnalysis2,
    get_LF_DieseaseCasesList1: get_LF_DieseaseCasesList1,
    get_LF_HydroceleOPLineList: get_LF_HydroceleOPLineList,
    get_LF_PendingHydroceleCasesList: get_LF_PendingHydroceleCasesList,
    get_GradingOfLFPatients: get_GradingOfLFPatients,
    getLfAnalysis3: getLfAnalysis3,
    LF_MMDPActivityReporting: LF_MMDPActivityReporting,
    getLF_PerformanceOfSurgeons: getLF_PerformanceOfSurgeons,
    getLF_PerformanceOfInstitutes: getLF_PerformanceOfInstitutes,
    get_LF_PatientsineligibleForSurgery: get_LF_PatientsineligibleForSurgery,
    VerifiedbyMO: VerifiedbyMO,
    LF_PerformanceOfInstitutes: LF_PerformanceOfInstitutes,
    LF_PerformanceOfSurgeons: LF_PerformanceOfSurgeons,
    PlanningForOT: PlanningForOT,
    get_FollowUpservicesToLFpatients: get_FollowUpservicesToLFpatients,
    get_FollowUpservicesToHydrocelePatients: get_FollowUpservicesToHydrocelePatients
  };
};

var _default = LFReportController();

exports["default"] = _default;
//# sourceMappingURL=LFReportController.js.map
