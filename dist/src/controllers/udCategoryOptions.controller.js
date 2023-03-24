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

var udCategoryOptions = _sequelize["default"].udCategoryOptions;
var Op = _sequelize["default"].Sequelize.Op;

var udCategoryOptionsController = function udCategoryOptionsController() {
  var getUdCategoryOptions = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var errors, reqObj, cond, attributes, _yield$udCategoryOpti, count, stateData;

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

              if (reqObj.categoryCode) {
                cond["categoryCode"] = reqObj.categoryCode;
              }

              cond["isActive"] = true;
              _context.next = 11;
              return udCategoryOptions.findAndCountAll({
                where: cond,
                attributes: attributes,
                order: [["id", "ASC"]]
              });

            case 11:
              _yield$udCategoryOpti = _context.sent;
              count = _yield$udCategoryOpti.count;
              stateData = _yield$udCategoryOpti.rows;

              if (!(count <= 0)) {
                _context.next = 16;
                break;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 16:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: stateData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](0);
              console.error(_context.t0);

              if (!_context.t0.statusCode) {
                _context.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context.t0
              }));

            case 24:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 19]]);
    }));

    return function getUdCategoryOptions(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  return {
    getUdCategoryOptions: getUdCategoryOptions
  };
};

var _default = udCategoryOptionsController();

exports["default"] = _default;
//# sourceMappingURL=udCategoryOptions.controller.js.map
