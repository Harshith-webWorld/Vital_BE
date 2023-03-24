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

var _InventoryMisMtrReportDao = _interopRequireDefault(require("../dao/InventoryMisMtrReportDao"));

var InventoryMisMtrReportController = function InventoryMisMtrReportController() {
  var getInventoryMisMtrReportController = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, getInventoryMisMtrReportDao;
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
              return _InventoryMisMtrReportDao["default"].getInventoryMisMtrReportDao(req);

            case 7:
              getInventoryMisMtrReportDao = _context.sent;

              if (!getInventoryMisMtrReportDao.error) {
                _context.next = 10;
                break;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: "Something Went Wrong"
              }));

            case 10:
              if (getInventoryMisMtrReportDao.data.length) {
                getInventoryMisMtrReportDao.data.sort(function (a, b) {
                  return a.districtId - b.districtId;
                });
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: getInventoryMisMtrReportDao,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

              if (!_context.t0.statusCode) {
                _context.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context.t0
              }));

            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 14]]);
    }));

    return function getInventoryMisMtrReportController(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  return {
    getInventoryMisMtrReportController: getInventoryMisMtrReportController
  };
};

var _default = InventoryMisMtrReportController();

exports["default"] = _default;
//# sourceMappingURL=InventoryMisMtrReportController.js.map
