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

var staffPosVerticalUnits = _sequelize["default"].staffPosVerticalUnits,
    staffPosVerticalUnitTrainingStatus = _sequelize["default"].staffPosVerticalUnitTrainingStatus,
    staffPosVerticalUnitStaffs = _sequelize["default"].staffPosVerticalUnitStaffs;
var Op = _sequelize["default"].Sequelize.Op;

var bulkstaffPosVerticalUnitsController = function bulkstaffPosVerticalUnitsController() {
  var bulkcreateStaffPosVerticalUnits = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, staffPosVerticalUnitsData, whereCodn, obj, lastID, nextId;
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
              staffPosVerticalUnitsData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;
              obj = {};

              if (!reqObj.id) {
                _context.next = 15;
                break;
              }

              _context.next = 12;
              return staffPosVerticalUnits.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 12:
              staffPosVerticalUnitsData = _context.sent;
              _context.next = 23;
              break;

            case 15:
              _context.next = 17;
              return staffPosVerticalUnits.findOne({
                attributes: {
                  include: ["id"]
                },
                order: [["id", "DESC"]]
              });

            case 17:
              lastID = _context.sent;
              nextId = lastID && lastID.dataValues && lastID.dataValues.id ? +lastID.dataValues.id + 1 : 1;
              reqObj.forEach(function (element) {
                element.srNo = "SR" + nextId++;
              });
              _context.next = 22;
              return staffPosVerticalUnits.bulkCreate(reqObj, {
                include: [{
                  model: staffPosVerticalUnitStaffs,
                  include: [{
                    model: staffPosVerticalUnitTrainingStatus
                  }]
                }]
              }, {
                returning: true
              });

            case 22:
              staffPosVerticalUnitsData = _context.sent;

            case 23:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: staffPosVerticalUnitsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 26:
              _context.prev = 26;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

              if (!_context.t0.statusCode) {
                _context.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context.t0
              }));

            case 31:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 26]]);
    }));

    return function bulkcreateStaffPosVerticalUnits(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var bulkcreateStaffPosVerticalUnitStaffs = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var reqObj, errors, staffPosVerticalUnitStaffsData, whereCodn;
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
              staffPosVerticalUnitStaffsData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (!reqObj.id) {
                _context2.next = 16;
                break;
              }

              console.log("reqObj:: ", reqObj);
              _context2.next = 12;
              return staffPosVerticalUnitStaffs.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 12:
              staffPosVerticalUnitStaffsData = _context2.sent;
              reqObj.staffPosVerticalUnitTrainingStatuses.forEach(function (element) {
                if (element["id"]) {
                  staffPosVerticalUnitStaffsData = staffPosVerticalUnitTrainingStatus.update(element, {
                    where: {
                      id: element["id"]
                    }
                  });
                } else if (!element["id"]) {
                  element.staffPosVerticalUnitStaffId = parseInt(reqObj.id);
                  console.log("element:: ", element);
                  staffPosVerticalUnitStaffsData = staffPosVerticalUnitTrainingStatus.create(element);
                }
              });
              _context2.next = 19;
              break;

            case 16:
              _context2.next = 18;
              return staffPosVerticalUnitStaffs.bulkCreate(reqObj.staffPosVerticalUnitStaffs, {
                include: [{
                  model: staffPosVerticalUnitTrainingStatus
                }]
              });

            case 18:
              staffPosVerticalUnitStaffsData = _context2.sent;

            case 19:
              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: staffPosVerticalUnitStaffsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 22:
              _context2.prev = 22;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);

              if (!_context2.t0.statusCode) {
                _context2.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context2.t0
              }));

            case 27:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 22]]);
    }));

    return function bulkcreateStaffPosVerticalUnitStaffs(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var bulkcreateStaffPosVerticalUnitTrainingStatus = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var reqObj, errors, staffPosVerticalUnitTrainingStatusData, whereCodn;
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
              staffPosVerticalUnitTrainingStatusData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (!reqObj.id) {
                _context3.next = 14;
                break;
              }

              _context3.next = 11;
              return staffPosVerticalUnitTrainingStatus.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 11:
              staffPosVerticalUnitTrainingStatusData = _context3.sent;
              _context3.next = 20;
              break;

            case 14:
              _context3.next = 16;
              return staffPosVerticalUnitTrainingStatus.findOne({
                where: whereCodn,
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                }
              });

            case 16:
              staffPosVerticalUnitTrainingStatusData = _context3.sent;
              _context3.next = 19;
              return staffPosVerticalUnitTrainingStatus.bulkCreate(reqObj.staffPosVerticalUnitTrainingStatus, {
                returning: true
              });

            case 19:
              staffPosVerticalUnitTrainingStatusData = _context3.sent;

            case 20:
              return _context3.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: staffPosVerticalUnitTrainingStatusData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 23:
              _context3.prev = 23;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);

              if (!_context3.t0.statusCode) {
                _context3.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context3.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context3.t0
              }));

            case 28:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 23]]);
    }));

    return function bulkcreateStaffPosVerticalUnitTrainingStatus(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  return {
    bulkcreateStaffPosVerticalUnits: bulkcreateStaffPosVerticalUnits,
    bulkcreateStaffPosVerticalUnitStaffs: bulkcreateStaffPosVerticalUnitStaffs,
    bulkcreateStaffPosVerticalUnitTrainingStatus: bulkcreateStaffPosVerticalUnitTrainingStatus
  };
};

var _default = bulkstaffPosVerticalUnitsController();

exports["default"] = _default;
//# sourceMappingURL=staffPosVerticalUnitsbulk.controller.js.map
