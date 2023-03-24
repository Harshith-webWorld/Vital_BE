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

var staffPosVerticalUnits = _sequelize["default"].staffPosVerticalUnits,
    staffPosVerticalUnitTrainingStatus = _sequelize["default"].staffPosVerticalUnitTrainingStatus,
    staffPosVerticalUnitStaffs = _sequelize["default"].staffPosVerticalUnitStaffs,
    states = _sequelize["default"].states,
    districts = _sequelize["default"].districts,
    designations = _sequelize["default"].designations,
    udCategoryOptions = _sequelize["default"].udCategoryOptions,
    verticalControlUnits = _sequelize["default"].verticalControlUnits;
var Op = _sequelize["default"].Sequelize.Op;

var staffPosVerticalUnitsController = function staffPosVerticalUnitsController() {
  var createStaffPosVerticalUnits = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, staffPosVerticalUnitsData, whereCodn, obj, lastID, currentId, staffPosVerticalUnitId, _iterator, _step, staff, _iterator2, _step2, status;

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
              _context.next = 44;
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
              currentId = lastID && lastID.dataValues && lastID.dataValues.id ? +lastID.dataValues.id + 1 : 1;
              reqObj.srNo = "SR" + currentId;
              _context.next = 22;
              return staffPosVerticalUnits.create(reqObj);

            case 22:
              staffPosVerticalUnitsData = _context.sent;

              if (!(reqObj.staffPosVerticalUnitStaffs && reqObj.staffPosVerticalUnitStaffs.length)) {
                _context.next = 44;
                break;
              }

              staffPosVerticalUnitId = staffPosVerticalUnitsData.dataValues.id;
              _iterator = _createForOfIteratorHelper(reqObj.staffPosVerticalUnitStaffs);
              _context.prev = 26;

              _iterator.s();

            case 28:
              if ((_step = _iterator.n()).done) {
                _context.next = 36;
                break;
              }

              staff = _step.value;
              staff.staffPosVerticalUnitId = staffPosVerticalUnitId;

              if (staff.staffPosVerticalUnitTrainingStatuses && staff.staffPosVerticalUnitTrainingStatuses.length) {
                _iterator2 = _createForOfIteratorHelper(staff.staffPosVerticalUnitTrainingStatuses);

                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    status = _step2.value;
                    status.staffPosVerticalUnitId = staffPosVerticalUnitId;
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }
              }

              _context.next = 34;
              return staffPosVerticalUnitStaffs.create(staff, {
                include: [{
                  model: staffPosVerticalUnitTrainingStatus
                }]
              });

            case 34:
              _context.next = 28;
              break;

            case 36:
              _context.next = 41;
              break;

            case 38:
              _context.prev = 38;
              _context.t0 = _context["catch"](26);

              _iterator.e(_context.t0);

            case 41:
              _context.prev = 41;

              _iterator.f();

              return _context.finish(41);

            case 44:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: staffPosVerticalUnitsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 47:
              _context.prev = 47;
              _context.t1 = _context["catch"](0);
              console.log(_context.t1);

              if (!_context.t1.statusCode) {
                _context.t1.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context.t1
              }));

            case 52:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 47], [26, 38, 41, 44]]);
    }));

    return function createStaffPosVerticalUnits(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var createAllStaffPosVerticalUnits = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var reqObj, errors, staffPosVerticalUnitsData, whereCodn, obj, lastID, currentId;
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
              staffPosVerticalUnitsData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;
              obj = {};

              if (!reqObj.id) {
                _context2.next = 15;
                break;
              }

              _context2.next = 12;
              return staffPosVerticalUnits.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 12:
              staffPosVerticalUnitsData = _context2.sent;
              _context2.next = 23;
              break;

            case 15:
              _context2.next = 17;
              return staffPosVerticalUnits.findOne({
                attributes: {
                  include: ["id"]
                },
                order: [["id", "DESC"]]
              });

            case 17:
              lastID = _context2.sent;
              currentId = lastID && lastID.dataValues && lastID.dataValues.id ? +lastID.dataValues.id + 1 : 1;
              reqObj.srNo = "SR" + currentId;
              _context2.next = 22;
              return staffPosVerticalUnits.create(reqObj, {
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
              staffPosVerticalUnitsData = _context2.sent;

            case 23:
              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: staffPosVerticalUnitsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 26:
              _context2.prev = 26;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);

              if (!_context2.t0.statusCode) {
                _context2.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context2.t0
              }));

            case 31:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 26]]);
    }));

    return function createAllStaffPosVerticalUnits(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var getStaffPosVerticalUnits = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var errors, reqObj, cond, cond2, cond3, cond4, _yield$staffPosVertic, count, staffPosVerticalUnitsData;

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

              if (reqObj.typeOfUnit) {
                cond2["typeOfUnit"] = reqObj.typeOfUnit;
              }

              if (reqObj.nameOfUnit) {
                cond3["nameOfUnit"] = reqObj.nameOfUnit;
              }

              if (reqObj.cadre) {
                cond4["cadre"] = reqObj.cadre;
              }

              cond["isActive"] = true;
              _context3.next = 17;
              return staffPosVerticalUnits.findAndCountAll({
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
                  as: "TypeOfUnit2",
                  required: false
                }, {
                  where: cond4,
                  model: udCategoryOptions,
                  as: "Cadre2",
                  required: false
                }, {
                  where: cond3,
                  model: verticalControlUnits,
                  required: false
                }]
              });

            case 17:
              _yield$staffPosVertic = _context3.sent;
              count = _yield$staffPosVertic.count;
              staffPosVerticalUnitsData = _yield$staffPosVertic.rows;

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
                data: staffPosVerticalUnitsData,
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

    return function getStaffPosVerticalUnits(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  var deleteStaffPosVerticalUnits = /*#__PURE__*/function () {
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
              return staffPosVerticalUnits.update({
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

    return function deleteStaffPosVerticalUnits(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();

  var createStaffPosVerticalUnitStaffs = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var reqObj, errors, staffPosVerticalUnitStaffsData, whereCodn;
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context5.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              staffPosVerticalUnitStaffsData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (!reqObj.id) {
                _context5.next = 16;
                break;
              }

              console.log("reqObj:: ", reqObj);
              _context5.next = 12;
              return staffPosVerticalUnitStaffs.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 12:
              staffPosVerticalUnitStaffsData = _context5.sent;
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
              _context5.next = 19;
              break;

            case 16:
              _context5.next = 18;
              return staffPosVerticalUnitStaffs.create(reqObj, {
                include: [{
                  model: staffPosVerticalUnitTrainingStatus
                }]
              });

            case 18:
              staffPosVerticalUnitStaffsData = _context5.sent;

            case 19:
              return _context5.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: staffPosVerticalUnitStaffsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 22:
              _context5.prev = 22;
              _context5.t0 = _context5["catch"](0);
              console.log(_context5.t0);

              if (!_context5.t0.statusCode) {
                _context5.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context5.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context5.t0
              }));

            case 27:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 22]]);
    }));

    return function createStaffPosVerticalUnitStaffs(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();

  var getAllStaffPosVerticalUnitStaffs = /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var errors, reqObj, cond, cond2, _yield$staffPosVertic2, count, staffPosVerticalUnitStaffsData;

      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context6.next = 4;
                break;
              }

              throw errors.array();

            case 4:
              reqObj = _utils["default"].getReqValues(req);
              cond = {};
              cond2 = {};

              if (reqObj.id) {
                cond["id"] = reqObj.id;
              }

              console.log("staffPosVerticalUnitId1111:: ", reqObj.id);
              cond["isActive"] = true;
              _context6.next = 12;
              return staffPosVerticalUnitStaffs.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]],
                include: [{
                  model: staffPosVerticalUnitTrainingStatus
                }]
              });

            case 12:
              _yield$staffPosVertic2 = _context6.sent;
              count = _yield$staffPosVertic2.count;
              staffPosVerticalUnitStaffsData = _yield$staffPosVertic2.rows;

              if (!(count <= 0)) {
                _context6.next = 17;
                break;
              }

              return _context6.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 17:
              return _context6.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: staffPosVerticalUnitStaffsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 20:
              _context6.prev = 20;
              _context6.t0 = _context6["catch"](0);
              console.error(_context6.t0);

              if (!_context6.t0.statusCode) {
                _context6.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context6.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context6.t0
              }));

            case 25:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 20]]);
    }));

    return function getAllStaffPosVerticalUnitStaffs(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }();

  var getStaffPosVerticalUnitStaffs = /*#__PURE__*/function () {
    var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
      var errors, reqObj, cond, cond2, cond3, _yield$staffPosVertic3, count, staffPosVerticalUnitStaffsData;

      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context7.next = 4;
                break;
              }

              throw errors.array();

            case 4:
              reqObj = _utils["default"].getReqValues(req);
              cond = {};
              cond2 = {};
              cond3 = {};
              console.log("staffPosVerticalUnitId2222:: ", reqObj.id);

              if (reqObj.id) {
                cond["staffPosVerticalUnitId"] = reqObj.id;
              }

              if (reqObj.typeOfUnit) {
                cond2["typeOfUnit"] = reqObj.typeOfUnit;
              }

              if (reqObj.nameOfUnit) {
                cond3["nameOfUnit"] = reqObj.nameOfUnit;
              }

              cond["isActive"] = true;
              _context7.next = 15;
              return staffPosVerticalUnitStaffs.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]],
                include: [{
                  model: staffPosVerticalUnits,
                  include: [{
                    where: cond2,
                    model: udCategoryOptions,
                    as: "TypeOfUnit2",
                    required: false
                  }, {
                    where: cond3,
                    model: verticalControlUnits,
                    required: false
                  }]
                }, {
                  model: designations,
                  as: "Designation",
                  required: false
                }, {
                  model: staffPosVerticalUnitTrainingStatus,
                  // where: cond,
                  required: false
                }]
              });

            case 15:
              _yield$staffPosVertic3 = _context7.sent;
              count = _yield$staffPosVertic3.count;
              staffPosVerticalUnitStaffsData = _yield$staffPosVertic3.rows;

              if (!(count <= 0)) {
                _context7.next = 20;
                break;
              }

              return _context7.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 20:
              return _context7.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: staffPosVerticalUnitStaffsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 23:
              _context7.prev = 23;
              _context7.t0 = _context7["catch"](0);
              console.error(_context7.t0);

              if (!_context7.t0.statusCode) {
                _context7.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context7.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context7.t0
              }));

            case 28:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 23]]);
    }));

    return function getStaffPosVerticalUnitStaffs(_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }();

  var deleteStaffPosVerticalUnitStaffs = /*#__PURE__*/function () {
    var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
      var errors, reqObj;
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context8.next = 4;
                break;
              }

              throw errors.array();

            case 4:
              reqObj = _utils["default"].getReqValues(req);

              if (!reqObj.id) {
                _context8.next = 11;
                break;
              }

              _context8.next = 8;
              return staffPosVerticalUnitStaffs.update({
                isActive: false
              }, {
                where: {
                  id: reqObj.id
                }
              });

            case 8:
              return _context8.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].DELETE_SUCCESS
              }));

            case 11:
              return _context8.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].SOMETHING_WRONG
              }));

            case 12:
              _context8.next = 19;
              break;

            case 14:
              _context8.prev = 14;
              _context8.t0 = _context8["catch"](0);
              console.error(_context8.t0);

              if (!_context8.t0.statusCode) {
                _context8.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context8.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context8.t0
              }));

            case 19:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 14]]);
    }));

    return function deleteStaffPosVerticalUnitStaffs(_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }();

  var createStaffPosVerticalUnitTrainingStatus = /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
      var reqObj, errors, staffPosVerticalUnitTrainingStatusData, whereCodn;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context9.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              staffPosVerticalUnitTrainingStatusData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (!reqObj.id) {
                _context9.next = 14;
                break;
              }

              _context9.next = 11;
              return staffPosVerticalUnitTrainingStatus.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 11:
              staffPosVerticalUnitTrainingStatusData = _context9.sent;
              _context9.next = 20;
              break;

            case 14:
              _context9.next = 16;
              return staffPosVerticalUnitTrainingStatus.findOne({
                where: whereCodn,
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                }
              });

            case 16:
              staffPosVerticalUnitTrainingStatusData = _context9.sent;
              _context9.next = 19;
              return staffPosVerticalUnitTrainingStatus.create(reqObj);

            case 19:
              staffPosVerticalUnitTrainingStatusData = _context9.sent;

            case 20:
              return _context9.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: staffPosVerticalUnitTrainingStatusData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 23:
              _context9.prev = 23;
              _context9.t0 = _context9["catch"](0);
              console.log(_context9.t0);

              if (!_context9.t0.statusCode) {
                _context9.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context9.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context9.t0
              }));

            case 28:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 23]]);
    }));

    return function createStaffPosVerticalUnitTrainingStatus(_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }();

  var getAllStaffPosVerticalUnitTrainingStatus = /*#__PURE__*/function () {
    var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
      var errors, reqObj, cond, _yield$staffPosVertic4, count, staffPosVerticalUnitTrainingStatusData;

      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context10.next = 4;
                break;
              }

              throw errors.array();

            case 4:
              reqObj = _utils["default"].getReqValues(req);
              cond = {};

              if (reqObj.id) {
                cond["id"] = reqObj.id;
              }

              cond["isActive"] = true;
              _context10.next = 10;
              return staffPosVerticalUnitTrainingStatus.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]]
              });

            case 10:
              _yield$staffPosVertic4 = _context10.sent;
              count = _yield$staffPosVertic4.count;
              staffPosVerticalUnitTrainingStatusData = _yield$staffPosVertic4.rows;

              if (!(count <= 0)) {
                _context10.next = 15;
                break;
              }

              return _context10.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 15:
              return _context10.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: staffPosVerticalUnitTrainingStatusData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 18:
              _context10.prev = 18;
              _context10.t0 = _context10["catch"](0);
              console.error(_context10.t0);

              if (!_context10.t0.statusCode) {
                _context10.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context10.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context10.t0
              }));

            case 23:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[0, 18]]);
    }));

    return function getAllStaffPosVerticalUnitTrainingStatus(_x19, _x20) {
      return _ref10.apply(this, arguments);
    };
  }();

  var getStaffPosVerticalUnitTrainingStatus = /*#__PURE__*/function () {
    var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
      var errors, reqObj, cond, _yield$staffPosVertic5, count, staffPosVerticalUnitTrainingStatusData;

      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.prev = 0;
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context11.next = 4;
                break;
              }

              throw errors.array();

            case 4:
              reqObj = _utils["default"].getReqValues(req);
              cond = {};

              if (reqObj.id) {
                cond["staffPosVerticalUnitId"] = reqObj.id;
              }

              cond["isActive"] = true;
              _context11.next = 10;
              return staffPosVerticalUnitTrainingStatus.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]]
              });

            case 10:
              _yield$staffPosVertic5 = _context11.sent;
              count = _yield$staffPosVertic5.count;
              staffPosVerticalUnitTrainingStatusData = _yield$staffPosVertic5.rows;

              if (!(count <= 0)) {
                _context11.next = 15;
                break;
              }

              return _context11.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 15:
              return _context11.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: staffPosVerticalUnitTrainingStatusData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 18:
              _context11.prev = 18;
              _context11.t0 = _context11["catch"](0);
              console.error(_context11.t0);

              if (!_context11.t0.statusCode) {
                _context11.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context11.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context11.t0
              }));

            case 23:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, null, [[0, 18]]);
    }));

    return function getStaffPosVerticalUnitTrainingStatus(_x21, _x22) {
      return _ref11.apply(this, arguments);
    };
  }();

  var deleteStaffPosVerticalUnitTrainingStatus = /*#__PURE__*/function () {
    var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
      var errors, reqObj;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.prev = 0;
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context12.next = 4;
                break;
              }

              throw errors.array();

            case 4:
              reqObj = _utils["default"].getReqValues(req);

              if (!reqObj.id) {
                _context12.next = 11;
                break;
              }

              _context12.next = 8;
              return staffPosVerticalUnitTrainingStatus.destroy({
                where: {
                  id: reqObj.id
                }
              });

            case 8:
              return _context12.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].DELETE_SUCCESS
              }));

            case 11:
              return _context12.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].SOMETHING_WRONG
              }));

            case 12:
              _context12.next = 19;
              break;

            case 14:
              _context12.prev = 14;
              _context12.t0 = _context12["catch"](0);
              console.error(_context12.t0);

              if (!_context12.t0.statusCode) {
                _context12.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context12.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context12.t0
              }));

            case 19:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, null, [[0, 14]]);
    }));

    return function deleteStaffPosVerticalUnitTrainingStatus(_x23, _x24) {
      return _ref12.apply(this, arguments);
    };
  }();

  return {
    createStaffPosVerticalUnits: createStaffPosVerticalUnits,
    createAllStaffPosVerticalUnits: createAllStaffPosVerticalUnits,
    getStaffPosVerticalUnits: getStaffPosVerticalUnits,
    deleteStaffPosVerticalUnits: deleteStaffPosVerticalUnits,
    createStaffPosVerticalUnitTrainingStatus: createStaffPosVerticalUnitTrainingStatus,
    getStaffPosVerticalUnitTrainingStatus: getStaffPosVerticalUnitTrainingStatus,
    deleteStaffPosVerticalUnitTrainingStatus: deleteStaffPosVerticalUnitTrainingStatus,
    createStaffPosVerticalUnitStaffs: createStaffPosVerticalUnitStaffs,
    getStaffPosVerticalUnitStaffs: getStaffPosVerticalUnitStaffs,
    deleteStaffPosVerticalUnitStaffs: deleteStaffPosVerticalUnitStaffs,
    getAllStaffPosVerticalUnitStaffs: getAllStaffPosVerticalUnitStaffs,
    getAllStaffPosVerticalUnitTrainingStatus: getAllStaffPosVerticalUnitTrainingStatus
  };
};

var _default = staffPosVerticalUnitsController();

exports["default"] = _default;
//# sourceMappingURL=staffPosVerticalUnits.controller.js.map
