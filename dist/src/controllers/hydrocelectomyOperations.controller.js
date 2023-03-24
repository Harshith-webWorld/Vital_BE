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

var _joi = _interopRequireDefault(require("joi"));

var _utils = _interopRequireDefault(require("../services/utils.service"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var _sequelize = _interopRequireDefault(require("../../config/sequelize"));

var hydrocelectomyOperations = _sequelize["default"].hydrocelectomyOperations,
    districts = _sequelize["default"].districts;
var Op = _sequelize["default"].Sequelize.Op;

var hydrocelectomyOperationsController = function hydrocelectomyOperationsController() {
  var create = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var errors, hydrocelectomyOperationsData, lastID, currentId;
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
              hydrocelectomyOperationsData = [];
              _context.next = 7;
              return hydrocelectomyOperations.findOne({
                attributes: ["id"],
                order: [['id', 'DESC']]
              });

            case 7:
              lastID = _context.sent;
              currentId = lastID && lastID.dataValues && lastID.dataValues.id ? +lastID.dataValues.id + 1 : 1;
              req.body.srNo = "SR" + currentId;
              _context.next = 12;
              return hydrocelectomyOperations.create(req.body);

            case 12:
              hydrocelectomyOperationsData = _context.sent;
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: hydrocelectomyOperationsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

              if (!_context.t0.statusCode) {
                _context.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                data: _context.t0,
                message: _resources["default"].LABEL_FAILED
              }));

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 16]]);
    }));

    return function create(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var update = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var errors, hydrocelectomyOperationsData;
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
              hydrocelectomyOperationsData = [];

              if (!req.body.id) {
                _context2.next = 9;
                break;
              }

              _context2.next = 8;
              return hydrocelectomyOperations.update(req.body, {
                where: {
                  id: req.body.id
                }
              });

            case 8:
              hydrocelectomyOperationsData = _context2.sent;

            case 9:
              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: hydrocelectomyOperationsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 12:
              _context2.prev = 12;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);

              if (!_context2.t0.statusCode) {
                _context2.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                data: _context2.t0,
                message: _resources["default"].LABEL_FAILED
              }));

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 12]]);
    }));

    return function update(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var bulkCreate = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var errors, hydrocelectomyOperationsData, lastID, currentId;
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
              hydrocelectomyOperationsData = [];
              _context3.next = 7;
              return hydrocelectomyOperations.findOne({
                attributes: ["id"],
                order: [['id', 'DESC']]
              });

            case 7:
              lastID = _context3.sent;
              currentId = lastID && lastID.dataValues && lastID.dataValues.id ? +lastID.dataValues.id + 1 : 1;
              req.body.hydrocelectomyOperations.forEach(function (element) {
                element.srNo = "SR" + currentId++;
              });
              _context3.next = 12;
              return hydrocelectomyOperations.bulkCreate(req.body.hydrocelectomyOperations, {
                returning: true
              });

            case 12:
              hydrocelectomyOperationsData = _context3.sent;
              return _context3.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: hydrocelectomyOperationsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 16:
              _context3.prev = 16;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);

              if (!_context3.t0.statusCode) {
                _context3.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context3.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                data: _context3.t0,
                message: _resources["default"].LABEL_FAILED
              }));

            case 21:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 16]]);
    }));

    return function bulkCreate(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  var get = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var errors, cond, _yield$hydrocelectomy, count, hydrocelectomyOperationsData;

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
              cond = {};

              if (req.query.id) {
                cond["id"] = req.query.id;
              }

              if (req.query.districtId) {
                cond["districtId"] = req.query.districtId;
              }

              cond["isActive"] = true;
              _context4.next = 10;
              return hydrocelectomyOperations.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]],
                include: [{
                  model: districts,
                  attributes: ["id", "districtName"],
                  required: false
                }]
              });

            case 10:
              _yield$hydrocelectomy = _context4.sent;
              count = _yield$hydrocelectomy.count;
              hydrocelectomyOperationsData = _yield$hydrocelectomy.rows;

              if (!(count <= 0)) {
                _context4.next = 15;
                break;
              }

              return _context4.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 15:
              return _context4.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: hydrocelectomyOperationsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 18:
              _context4.prev = 18;
              _context4.t0 = _context4["catch"](0);
              console.error(_context4.t0);

              if (!_context4.t0.statusCode) {
                _context4.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context4.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context4.t0
              }));

            case 23:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 18]]);
    }));

    return function get(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();

  var deleteEntry = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var errors;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context5.next = 4;
                break;
              }

              throw errors.array();

            case 4:
              if (!req.query.id) {
                _context5.next = 10;
                break;
              }

              _context5.next = 7;
              return hydrocelectomyOperations.update({
                isActive: false
              }, {
                where: {
                  id: req.query.id
                }
              });

            case 7:
              return _context5.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].DELETE_SUCCESS
              }));

            case 10:
              return _context5.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].SOMETHING_WRONG
              }));

            case 11:
              _context5.next = 18;
              break;

            case 13:
              _context5.prev = 13;
              _context5.t0 = _context5["catch"](0);
              console.error(_context5.t0);

              if (!_context5.t0.statusCode) {
                _context5.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context5.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context5.t0
              }));

            case 18:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 13]]);
    }));

    return function deleteEntry(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();

  return {
    create: create,
    bulkCreate: bulkCreate,
    update: update,
    get: get,
    deleteEntry: deleteEntry
  };
};

var _default = hydrocelectomyOperationsController();

exports["default"] = _default;
//# sourceMappingURL=hydrocelectomyOperations.controller.js.map
