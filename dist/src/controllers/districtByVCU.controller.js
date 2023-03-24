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

var verticalControlUnits = _sequelize["default"].verticalControlUnits,
    districts = _sequelize["default"].districts;
var Op = _sequelize["default"].Sequelize.Op;

var districtByVCUController = function districtByVCUController() {
  var getDistrictByVCU = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var errors, reqObj, cond, attributes, districtData;
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

              if (reqObj.unitId) {
                cond["id"] = reqObj.unitId;
              }

              cond["isActive"] = true;
              _context.next = 11;
              return verticalControlUnits.findOne({
                where: cond,
                attributes: attributes,
                include: [{
                  model: districts,
                  required: false
                }]
              });

            case 11:
              districtData = _context.sent;
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: districtData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 15:
              _context.prev = 15;
              _context.t0 = _context["catch"](0);
              console.error(_context.t0);

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

    return function getDistrictByVCU(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var getDistrictByFSU = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var errors, reqObj, cond, attributes, _yield$districts$find, count, districtData;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              console.log("fsu came");
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context2.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              reqObj = _utils["default"].getReqValues(req);
              cond = {};
              attributes = {
                exclude: ["createdAt", "updatedAt"]
              };

              if (reqObj.unitId) {
                cond["fsuId"] = reqObj.unitId;
              }

              cond["isActive"] = true;
              _context2.next = 12;
              return districts.findAndCountAll({
                where: cond,
                attributes: attributes,
                order: [["districtName", "ASC"]]
              });

            case 12:
              _yield$districts$find = _context2.sent;
              count = _yield$districts$find.count;
              districtData = _yield$districts$find.rows;

              if (!(count <= 0)) {
                _context2.next = 17;
                break;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: districtData,
                message: _resources["default"].DISTRICT_EMPTY
              }));

            case 17:
              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: districtData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 20:
              _context2.prev = 20;
              _context2.t0 = _context2["catch"](0);
              console.error(_context2.t0);

              if (!_context2.t0.statusCode) {
                _context2.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context2.t0
              }));

            case 25:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 20]]);
    }));

    return function getDistrictByFSU(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  return {
    getDistrictByVCU: getDistrictByVCU,
    getDistrictByFSU: getDistrictByFSU
  };
};

var _default = districtByVCUController();

exports["default"] = _default;
//# sourceMappingURL=districtByVCU.controller.js.map
