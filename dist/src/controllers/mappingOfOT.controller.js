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

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var mappingOfOT = _sequelize["default"].mappingOfOT,
    mappingOfOTSurgeons = _sequelize["default"].mappingOfOTSurgeons,
    facilities = _sequelize["default"].facilities,
    districts = _sequelize["default"].districts,
    corporations = _sequelize["default"].corporations,
    talukas = _sequelize["default"].talukas,
    mappingOfOTPhcAttachedToTheaters = _sequelize["default"].mappingOfOTPhcAttachedToTheaters;
var Op = _sequelize["default"].Sequelize.Op;

var mappingOfOTController = function mappingOfOTController() {
  var create = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, mappingOfOTData, whereCodn, obj, _iterator, _step, element, payLoad, lastID, currentId, attributes;

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
              mappingOfOTData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;
              obj = {};

              if (!reqObj.id) {
                _context.next = 38;
                break;
              }

              _context.next = 12;
              return mappingOfOTPhcAttachedToTheaters.destroy({
                where: {
                  mappingOfOTId: reqObj["id"]
                }
              });

            case 12:
              _context.next = 14;
              return mappingOfOT.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 14:
              mappingOfOTData = _context.sent;
              reqObj.mappingOfOTSurgeons.forEach(function (element) {
                if (element["id"]) {
                  mappingOfOTData = mappingOfOTSurgeons.update(element, {
                    where: {
                      id: element["id"]
                    }
                  });
                } else if (!element["id"]) {
                  element.mappingOfOTId = reqObj.id;
                  mappingOfOTData = mappingOfOTSurgeons.create(element);
                }
              }); // await mappingOfOTPhcAttachedToTheaters.destroy(
              // 	{
              // 		where: { mappingOfOTId: reqObj["id"] }
              // 	}
              // );

              reqObj.mappingOfOTPhcAttachedToTheaters ? reqObj.mappingOfOTPhcAttachedToTheaters : [];
              _iterator = _createForOfIteratorHelper(reqObj.mappingOfOTPhcAttachedToTheaters);
              _context.prev = 18;

              _iterator.s();

            case 20:
              if ((_step = _iterator.n()).done) {
                _context.next = 28;
                break;
              }

              element = _step.value;
              payLoad = {
                mappingOfOTId: reqObj.id,
                facilityId: element.facilityId,
                createdBy: element.createdBy,
                lastModifiedBy: element.lastModifiedBy
              };
              _context.next = 25;
              return mappingOfOTPhcAttachedToTheaters.create(payLoad);

            case 25:
              mappingOfOTData = _context.sent;

            case 26:
              _context.next = 20;
              break;

            case 28:
              _context.next = 33;
              break;

            case 30:
              _context.prev = 30;
              _context.t0 = _context["catch"](18);

              _iterator.e(_context.t0);

            case 33:
              _context.prev = 33;

              _iterator.f();

              return _context.finish(33);

            case 36:
              _context.next = 47;
              break;

            case 38:
              _context.next = 40;
              return mappingOfOT.findOne({
                attributes: ["id"],
                order: [['id', 'DESC']]
              });

            case 40:
              lastID = _context.sent;
              currentId = lastID && lastID.dataValues && lastID.dataValues.id ? +lastID.dataValues.id + 1 : 1;
              reqObj.srNo = "SR" + currentId;
              attributes = {
                exclude: ["createdAt", "updatedAt"]
              };
              _context.next = 46;
              return mappingOfOT.create(reqObj, {
                include: [{
                  model: mappingOfOTSurgeons
                }, {
                  model: mappingOfOTPhcAttachedToTheaters
                }],
                attributes: attributes
              });

            case 46:
              mappingOfOTData = _context.sent;

            case 47:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: mappingOfOTData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 50:
              _context.prev = 50;
              _context.t1 = _context["catch"](0);
              console.log(_context.t1);

              if (!_context.t1.statusCode) {
                _context.t1.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context.t1
              }));

            case 55:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 50], [18, 30, 33, 36]]);
    }));

    return function create(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var getmappingOfOT = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var errors, reqObj, cond, _yield$mappingOfOT$fi, count, mappingOfOTData;

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

              if (reqObj.id) {
                cond["id"] = reqObj.id;
              }

              if (reqObj.districtId) {
                cond["districtId"] = reqObj.districtId;
              }

              cond["isActive"] = true;
              _context2.next = 11;
              return mappingOfOT.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]],
                include: [{
                  model: mappingOfOTSurgeons,
                  required: false
                }, {
                  model: mappingOfOTPhcAttachedToTheaters,
                  attributes: ["id", "facilityId"],
                  required: false,
                  raw: true,
                  include: [{
                    model: facilities,
                    attributes: ["id", "facilityName"],
                    required: false,
                    raw: true
                  }]
                }, {
                  model: districts,
                  attributes: ["id", "districtName"],
                  required: false
                }, {
                  model: corporations,
                  attributes: ["id", "corporationName"],
                  required: false
                }, {
                  model: talukas,
                  attributes: ["id", "talukaName"],
                  required: false
                }]
              });

            case 11:
              _yield$mappingOfOT$fi = _context2.sent;
              count = _yield$mappingOfOT$fi.count;
              mappingOfOTData = _yield$mappingOfOT$fi.rows;

              if (!(count <= 0)) {
                _context2.next = 16;
                break;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 16:
              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: mappingOfOTData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 19:
              _context2.prev = 19;
              _context2.t0 = _context2["catch"](0);
              console.error(_context2.t0);

              if (!_context2.t0.statusCode) {
                _context2.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context2.t0
              }));

            case 24:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 19]]);
    }));

    return function getmappingOfOT(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var deletemappingOfOT = /*#__PURE__*/function () {
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
              return mappingOfOT.update({
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

    return function deletemappingOfOT(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  var deletemappingOfOTSurg = /*#__PURE__*/function () {
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
              return mappingOfOTSurgeons.destroy({
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

    return function deletemappingOfOTSurg(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();

  return {
    create: create,
    getmappingOfOT: getmappingOfOT,
    deletemappingOfOT: deletemappingOfOT,
    deletemappingOfOTSurg: deletemappingOfOTSurg
  };
};

var _default = mappingOfOTController();

exports["default"] = _default;
//# sourceMappingURL=mappingOfOT.controller.js.map
