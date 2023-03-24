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

var verticalUnitStockPositions = _sequelize["default"].verticalUnitStockPositions,
    states = _sequelize["default"].states,
    districts = _sequelize["default"].districts,
    udCategoryOptions = _sequelize["default"].udCategoryOptions,
    verticalControlUnits = _sequelize["default"].verticalControlUnits;
var Op = _sequelize["default"].Sequelize.Op;

var verticalUnitController = function verticalUnitController() {
  var create = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, verticalUnitStockPositionsData, whereCodn, lastID, currentId;
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
              verticalUnitStockPositionsData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (!reqObj.id) {
                _context.next = 14;
                break;
              }

              _context.next = 11;
              return verticalUnitStockPositions.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 11:
              verticalUnitStockPositionsData = _context.sent;
              _context.next = 22;
              break;

            case 14:
              _context.next = 16;
              return verticalUnitStockPositions.findOne({
                attributes: {
                  include: ["id"]
                },
                order: [['id', 'DESC']]
              });

            case 16:
              lastID = _context.sent;
              currentId = lastID && lastID.dataValues && lastID.dataValues.id ? +lastID.dataValues.id + 1 : 1;
              reqObj.srNo = "SR" + currentId;
              _context.next = 21;
              return verticalUnitStockPositions.create(reqObj);

            case 21:
              verticalUnitStockPositionsData = _context.sent;

            case 22:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: verticalUnitStockPositionsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 25:
              _context.prev = 25;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

              if (!_context.t0.statusCode) {
                _context.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context.t0
              }));

            case 30:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 25]]);
    }));

    return function create(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var bulkCreate = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var reqObj, errors, verticalUnitStockPositionsData, whereCodn, lastID, currentId;
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
              verticalUnitStockPositionsData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (!reqObj.id) {
                _context2.next = 14;
                break;
              }

              _context2.next = 11;
              return verticalUnitStockPositions.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 11:
              verticalUnitStockPositionsData = _context2.sent;
              _context2.next = 22;
              break;

            case 14:
              _context2.next = 16;
              return verticalUnitStockPositions.findOne({
                attributes: {
                  include: ["id"]
                },
                order: [['id', 'DESC']]
              });

            case 16:
              lastID = _context2.sent;
              currentId = lastID && lastID.dataValues && lastID.dataValues.id ? +lastID.dataValues.id + 1 : 1;
              reqObj.verticalStockid.forEach(function (element) {
                element.srNo = "SR" + currentId++;
              });
              _context2.next = 21;
              return verticalUnitStockPositions.bulkCreate(reqObj.verticalStockid, {
                returning: true
              });

            case 21:
              verticalUnitStockPositionsData = _context2.sent;

            case 22:
              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: verticalUnitStockPositionsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 25:
              _context2.prev = 25;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);

              if (!_context2.t0.statusCode) {
                _context2.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context2.t0
              }));

            case 30:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 25]]);
    }));

    return function bulkCreate(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var getVerticalUnit = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var errors, reqObj, cond, cond2, cond3, cond4, _yield$verticalUnitSt, count, verticalUnitStockPositionsData;

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
              cond = {};
              cond2 = {};
              cond3 = {};
              cond4 = {};

              if (reqObj.id) {
                cond["id"] = reqObj.id;
              }

              if (reqObj.districtId) {
                cond["districtId"] = reqObj.districtId;
              }

              if (reqObj.unitType) {
                cond2["unitType"] = reqObj.unitType;
              }

              if (reqObj.items) {
                cond4["items"] = reqObj.items;
              }

              if (reqObj.unitName) {
                cond3["unitName"] = reqObj.unitName;
              }

              cond["isActive"] = true;
              _context3.next = 17;
              return verticalUnitStockPositions.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]],
                include: [{
                  model: states,
                  attributes: ["id", "stateName"],
                  required: false
                }, {
                  model: districts,
                  attributes: ["id", "districtName"],
                  required: false
                }, {
                  where: cond2,
                  model: udCategoryOptions,
                  as: "UnitType",
                  required: false
                }, {
                  where: cond4,
                  model: udCategoryOptions,
                  as: "tabletName",
                  required: false
                }, {
                  where: cond3,
                  model: verticalControlUnits,
                  required: false
                }]
              });

            case 17:
              _yield$verticalUnitSt = _context3.sent;
              count = _yield$verticalUnitSt.count;
              verticalUnitStockPositionsData = _yield$verticalUnitSt.rows;

              if (!(count <= 0)) {
                _context3.next = 22;
                break;
              }

              return _context3.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 22:
              return _context3.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: verticalUnitStockPositionsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 25:
              _context3.prev = 25;
              _context3.t0 = _context3["catch"](0);
              console.error(_context3.t0);

              if (!_context3.t0.statusCode) {
                _context3.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context3.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context3.t0
              }));

            case 30:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 25]]);
    }));

    return function getVerticalUnit(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  var deleteVerticalUnit = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var errors, reqObj;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context4.next = 4;
                break;
              }

              throw errors.array();

            case 4:
              reqObj = _utils["default"].getReqValues(req);

              if (!reqObj.id) {
                _context4.next = 11;
                break;
              }

              _context4.next = 8;
              return verticalUnitStockPositions.update({
                isActive: false
              }, {
                where: {
                  id: reqObj.id
                }
              });

            case 8:
              return _context4.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].DELETE_SUCCESS
              }));

            case 11:
              return _context4.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].SOMETHING_WRONG
              }));

            case 12:
              _context4.next = 19;
              break;

            case 14:
              _context4.prev = 14;
              _context4.t0 = _context4["catch"](0);
              console.error(_context4.t0);

              if (!_context4.t0.statusCode) {
                _context4.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context4.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context4.t0
              }));

            case 19:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 14]]);
    }));

    return function deleteVerticalUnit(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();

  return {
    create: create,
    getVerticalUnit: getVerticalUnit,
    deleteVerticalUnit: deleteVerticalUnit,
    bulkCreate: bulkCreate
  };
};

var _default = verticalUnitController();

exports["default"] = _default;
//# sourceMappingURL=verticalUnitStockPositions.controller.js.map
