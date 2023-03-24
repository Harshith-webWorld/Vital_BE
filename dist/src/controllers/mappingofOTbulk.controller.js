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
    mappingOfOTPhcAttachedToTheaters = _sequelize["default"].mappingOfOTPhcAttachedToTheaters;
var Op = _sequelize["default"].Sequelize.Op;

var bulkMappingOfOTController = function bulkMappingOfOTController() {
  var bulkCreate = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, mappingOfOTData, whereCodn, obj, _iterator, _step, element, payLoad, lastID, nextId, attributes;

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
                _context.next = 37;
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
              });
              _iterator = _createForOfIteratorHelper(reqObj.nameOfPHCAttachedToOT);
              _context.prev = 17;

              _iterator.s();

            case 19:
              if ((_step = _iterator.n()).done) {
                _context.next = 27;
                break;
              }

              element = _step.value;
              payLoad = {
                mappingOfOTId: reqObj.id,
                facilityId: element.value
              };
              _context.next = 24;
              return mappingOfOTPhcAttachedToTheaters.create(payLoad);

            case 24:
              mappingOfOTData = _context.sent;

            case 25:
              _context.next = 19;
              break;

            case 27:
              _context.next = 32;
              break;

            case 29:
              _context.prev = 29;
              _context.t0 = _context["catch"](17);

              _iterator.e(_context.t0);

            case 32:
              _context.prev = 32;

              _iterator.f();

              return _context.finish(32);

            case 35:
              _context.next = 46;
              break;

            case 37:
              _context.next = 39;
              return mappingOfOT.findOne({
                attributes: ["id"],
                order: [['id', 'DESC']]
              });

            case 39:
              lastID = _context.sent;
              nextId = lastID && lastID.dataValues && lastID.dataValues.id ? +lastID.dataValues.id + 1 : 1;
              reqObj.mappingOfOT.forEach(function (element) {
                element.srNo = "SR" + nextId++;
              });
              attributes = {
                exclude: ["createdAt", "updatedAt"]
              };
              _context.next = 45;
              return mappingOfOT.bulkCreate(reqObj.mappingOfOT, {
                include: [{
                  model: mappingOfOTSurgeons
                }, {
                  model: mappingOfOTPhcAttachedToTheaters
                }],
                attributes: attributes
              }, {
                returning: true
              });

            case 45:
              mappingOfOTData = _context.sent;

            case 46:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: mappingOfOTData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 49:
              _context.prev = 49;
              _context.t1 = _context["catch"](0);
              console.log(_context.t1);

              if (!_context.t1.statusCode) {
                _context.t1.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context.t1
              }));

            case 54:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 49], [17, 29, 32, 35]]);
    }));

    return function bulkCreate(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  return {
    bulkCreate: bulkCreate
  };
};

var _default = bulkMappingOfOTController();

exports["default"] = _default;
//# sourceMappingURL=mappingofOTbulk.controller.js.map
