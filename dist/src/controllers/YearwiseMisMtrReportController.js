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

var _YearwiseMisMtrReportDao = _interopRequireDefault(require("../dao/YearwiseMisMtrReportDao"));

var YearwiseMisMtrReportController = function YearwiseMisMtrReportController() {
  var getYearwiseMisMtrReportController = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, getYearwiseMisMtrReportDao;
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
              getYearwiseMisMtrReportDao = {};

              if (!(req.body.yearType === "calender")) {
                _context.next = 12;
                break;
              }

              _context.next = 9;
              return _YearwiseMisMtrReportDao["default"].getYearwiseMisMtrReportDao(req);

            case 9:
              getYearwiseMisMtrReportDao = _context.sent;
              _context.next = 15;
              break;

            case 12:
              _context.next = 14;
              return _YearwiseMisMtrReportDao["default"].getFinancialYearwiseMisMtrReportDao(req);

            case 14:
              getYearwiseMisMtrReportDao = _context.sent;

            case 15:
              if (!getYearwiseMisMtrReportDao.error) {
                _context.next = 17;
                break;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 17:
              if (getYearwiseMisMtrReportDao.data.length) {
                getYearwiseMisMtrReportDao.data.sort(function (a, b) {
                  return a.districtId - b.districtId;
                });
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: getYearwiseMisMtrReportDao,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

              if (!_context.t0.statusCode) {
                _context.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context.t0
              }));

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 21]]);
    }));

    return function getYearwiseMisMtrReportController(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  return {
    getYearwiseMisMtrReportController: getYearwiseMisMtrReportController
  };
};

var _default = YearwiseMisMtrReportController();

exports["default"] = _default;
//# sourceMappingURL=YearwiseMisMtrReportController.js.map
