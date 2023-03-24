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

var districts = _sequelize["default"].districts;
var Op = _sequelize["default"].Sequelize.Op;

var districtController = function districtController() {
  var create = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, districtData, whereCodn;
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
              districtData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (!reqObj.districtCode) {
                _context.next = 12;
                break;
              }

              whereCodn["districtCode"] = reqObj.districtCode;
              _context.next = 13;
              break;

            case 12:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].DISTRICT_REQUIRED
              }));

            case 13:
              if (!reqObj.id) {
                _context.next = 19;
                break;
              }

              _context.next = 16;
              return districts.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 16:
              districtData = _context.sent;
              _context.next = 27;
              break;

            case 19:
              _context.next = 21;
              return districts.findOne({
                where: whereCodn,
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                }
              });

            case 21:
              districtData = _context.sent;

              if (!(districtData && districtData.isNewRecord === false)) {
                _context.next = 24;
                break;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].DISTRICT_ALREADY_EXISTS
              }));

            case 24:
              _context.next = 26;
              return districts.create(reqObj);

            case 26:
              districtData = _context.sent;

            case 27:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: districtData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 30:
              _context.prev = 30;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

              if (!_context.t0.statusCode) {
                _context.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context.t0
              }));

            case 35:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 30]]);
    }));

    return function create(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var getDistrict = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var errors, reqObj, cond, attributes, _yield$districts$find, count, districtData;

      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context2.next = 4;
                break;
              }

              throw errors.array();

            case 4:
              reqObj = _utils["default"].getReqValues(req);
              cond = {};
              attributes = {
                exclude: ["createdAt", "updatedAt"]
              };

              if (reqObj.stateId) {
                cond["stateId"] = reqObj.stateId;
              }

              if (reqObj.id) {
                cond["id"] = reqObj.id;
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

    return function getDistrict(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var deleteDistrict = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var errors, reqObj;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context3.next = 4;
                break;
              }

              throw errors.array();

            case 4:
              reqObj = _utils["default"].getReqValues(req);

              if (!reqObj.id) {
                _context3.next = 11;
                break;
              }

              _context3.next = 8;
              return districts.update({
                isActive: false
              }, {
                where: {
                  id: reqObj.id
                }
              });

            case 8:
              return _context3.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].DELETE_SUCCESS
              }));

            case 11:
              return _context3.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].SOMETHING_WRONG
              }));

            case 12:
              _context3.next = 19;
              break;

            case 14:
              _context3.prev = 14;
              _context3.t0 = _context3["catch"](0);
              console.error(_context3.t0);

              if (!_context3.t0.statusCode) {
                _context3.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context3.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context3.t0
              }));

            case 19:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 14]]);
    }));

    return function deleteDistrict(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  return {
    create: create,
    getDistrict: getDistrict,
    deleteDistrict: deleteDistrict
  };
};

var _default = districtController();

exports["default"] = _default;
//# sourceMappingURL=district.controller.js.map
