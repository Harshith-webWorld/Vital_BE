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

var preMDAActivities = _sequelize["default"].preMDAActivities,
    preMDAActivityDrugLogistics = _sequelize["default"].preMDAActivityDrugLogistics,
    preMDAActivityDrugAdministrators = _sequelize["default"].preMDAActivityDrugAdministrators,
    preMDAActivitySupervisors = _sequelize["default"].preMDAActivitySupervisors,
    districts = _sequelize["default"].districts,
    talukas = _sequelize["default"].talukas,
    wards = _sequelize["default"].wards,
    facilities = _sequelize["default"].facilities,
    villages = _sequelize["default"].villages,
    subCenters = _sequelize["default"].subCenters,
    corporations = _sequelize["default"].corporations,
    zones = _sequelize["default"].zones;
var Op = _sequelize["default"].Sequelize.Op;

var preMDAActivitiesController = function preMDAActivitiesController() {
  var createAllPreMDAActivity = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, preMDAActivityData, whereCodn, lastID, attributes, currentId;
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
              preMDAActivityData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (!reqObj.id) {
                _context.next = 14;
                break;
              }

              _context.next = 11;
              return preMDAActivities.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 11:
              preMDAActivityData = _context.sent;
              _context.next = 23;
              break;

            case 14:
              _context.next = 16;
              return preMDAActivities.findOne({
                attributes: {
                  include: ["id"]
                },
                order: [['id', 'DESC']]
              });

            case 16:
              lastID = _context.sent;
              attributes = {
                exclude: ["createdAt", "updatedAt"]
              };
              currentId = lastID && lastID.dataValues && lastID.dataValues.id ? +lastID.dataValues.id + 1 : 1;
              reqObj.srNo = "SR" + currentId;
              _context.next = 22;
              return preMDAActivities.create(reqObj, {
                include: [{
                  model: preMDAActivityDrugLogistics,
                  as: "preMDAActivityDrugLogistics"
                }, {
                  model: preMDAActivityDrugAdministrators,
                  as: "preMDAActivityDrugAdministrators"
                }, {
                  model: preMDAActivitySupervisors,
                  as: "preMDAActivitySupervisors"
                }]
              });

            case 22:
              preMDAActivityData = _context.sent;

            case 23:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: preMDAActivityData,
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

    return function createAllPreMDAActivity(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var createPreMDAActivities = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var reqObj, errors, preMDAActivitiesData, whereCodn, obj, lastID, attributes, currentId;
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
              preMDAActivitiesData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;
              obj = {};

              if (!reqObj.id) {
                _context2.next = 18;
                break;
              }

              _context2.next = 12;
              return preMDAActivities.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 12:
              preMDAActivitiesData = _context2.sent;
              reqObj.preMDAActivityDrugLogistics.forEach(function (element) {
                if (element["id"]) {
                  preMDAActivitiesData = preMDAActivityDrugLogistics.update(element, {
                    where: {
                      id: element["id"]
                    }
                  });
                } else if (!element["id"]) {
                  element = reqObj.id;
                  preMDAActivitiesData = preMDAActivityDrugLogistics.create(element);
                }
              });
              reqObj.preMDAActivityDrugAdministrators.forEach(function (element) {
                if (element["id"]) {
                  preMDAActivitiesData = preMDAActivityDrugAdministrators.update(element, {
                    where: {
                      id: element["id"]
                    }
                  });
                } else if (!element["id"]) {
                  element.preMDAActivityId = reqObj.id;
                  preMDAActivitiesData = preMDAActivityDrugAdministrators.create(element);
                }
              });
              reqObj.preMDAActivitySupervisors.forEach(function (element) {
                if (element["id"]) {
                  preMDAActivitiesData = preMDAActivitySupervisors.update(element, {
                    where: {
                      id: element["id"]
                    }
                  });
                } else if (!element["id"]) {
                  element.preMDAActivityId = reqObj.id;
                  preMDAActivitiesData = preMDAActivitySupervisors.create(element);
                }
              });
              _context2.next = 27;
              break;

            case 18:
              _context2.next = 20;
              return preMDAActivities.findOne({
                attributes: {
                  include: ["id"]
                },
                order: [['createdAt', 'DESC']]
              });

            case 20:
              lastID = _context2.sent;
              attributes = {
                exclude: ["createdAt", "updatedAt"]
              };
              currentId = lastID && lastID.dataValues && lastID.dataValues.id ? +lastID.dataValues.id + 1 : 1;
              reqObj.srNo = "SR" + currentId;
              _context2.next = 26;
              return preMDAActivities.create(reqObj, {
                include: [{
                  model: preMDAActivityDrugLogistics,
                  as: "preMDAActivityDrugLogistics"
                }, {
                  model: preMDAActivityDrugAdministrators,
                  as: "preMDAActivityDrugAdministrators"
                }, {
                  model: preMDAActivitySupervisors,
                  as: "preMDAActivitySupervisors"
                }],
                attributes: attributes
              });

            case 26:
              preMDAActivitiesData = _context2.sent;

            case 27:
              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: preMDAActivitiesData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 30:
              _context2.prev = 30;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);

              if (!_context2.t0.statusCode) {
                _context2.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context2.t0
              }));

            case 35:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 30]]);
    }));

    return function createPreMDAActivities(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var createPreMDAActivityDrugLogistics = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var reqObj, errors, preMDAActivityDrugLogisticsData, whereCodn;
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
              preMDAActivityDrugLogisticsData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (!reqObj.id) {
                _context3.next = 14;
                break;
              }

              _context3.next = 11;
              return preMDAActivityDrugLogistics.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 11:
              preMDAActivityDrugLogisticsData = _context3.sent;
              _context3.next = 17;
              break;

            case 14:
              _context3.next = 16;
              return preMDAActivityDrugLogistics.create(reqObj);

            case 16:
              preMDAActivityDrugLogisticsData = _context3.sent;

            case 17:
              return _context3.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: preMDAActivityDrugLogisticsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 20:
              _context3.prev = 20;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);

              if (!_context3.t0.statusCode) {
                _context3.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context3.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context3.t0
              }));

            case 25:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 20]]);
    }));

    return function createPreMDAActivityDrugLogistics(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  var getPreMDAActivities = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var errors, reqObj, cond, subCond, _yield$preMDAActiviti, count, preMDAActivitiesData;

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
              cond = {};

              if (reqObj.id) {
                cond["id"] = reqObj.id;
              }

              if (reqObj.districtId) {
                cond["districtId"] = reqObj.districtId;
              }

              cond["isActive"] = true;
              subCond = {
                isActive: true
              };
              _context4.next = 12;
              return preMDAActivities.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]],
                required: false,
                include: [{
                  model: preMDAActivityDrugLogistics,
                  as: "preMDAActivityDrugLogistics",
                  required: false
                }, {
                  model: preMDAActivityDrugAdministrators,
                  as: "preMDAActivityDrugAdministrators",
                  where: subCond,
                  required: false
                }, {
                  model: preMDAActivitySupervisors,
                  as: "preMDAActivitySupervisors",
                  where: subCond,
                  required: false
                }, {
                  model: districts,
                  attributes: ["id", "districtName"],
                  required: false
                }, {
                  model: talukas,
                  attributes: ["id", "talukaName"],
                  required: false
                }, {
                  model: wards,
                  attributes: ["id", "wardName"],
                  required: false
                }, {
                  model: villages,
                  attributes: ["id", "villageName"],
                  required: false
                }, {
                  model: facilities,
                  attributes: ["id", "facilityName"],
                  required: false
                }, {
                  model: subCenters,
                  attributes: ["id", "subCenterName"],
                  required: false
                }, {
                  model: corporations,
                  attributes: ["id", "corporationName"],
                  required: false
                }, {
                  model: zones,
                  attributes: ["id", "zoneName"],
                  required: false
                }]
              });

            case 12:
              _yield$preMDAActiviti = _context4.sent;
              count = _yield$preMDAActiviti.count;
              preMDAActivitiesData = _yield$preMDAActiviti.rows;

              if (!(count <= 0)) {
                _context4.next = 17;
                break;
              }

              return _context4.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 17:
              return _context4.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: preMDAActivitiesData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 20:
              _context4.prev = 20;
              _context4.t0 = _context4["catch"](0);
              console.error(_context4.t0);

              if (!_context4.t0.statusCode) {
                _context4.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context4.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context4.t0
              }));

            case 25:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 20]]);
    }));

    return function getPreMDAActivities(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();

  var getAllPreMDAActivityDrugLogistics = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var errors, reqObj, cond, _yield$preMDAActivity, count, preMDAActivityDrugLogisticsData;

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
              reqObj = _utils["default"].getReqValues(req);
              cond = {};

              if (reqObj.preMDAActivityId) {
                cond["preMDAActivityId"] = reqObj.preMDAActivityId;
              }

              cond["isActive"] = true;
              _context5.next = 10;
              return preMDAActivityDrugLogistics.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]],
                include: [{
                  model: preMDAActivities,
                  attributes: ["srNo"],
                  required: false
                }]
              });

            case 10:
              _yield$preMDAActivity = _context5.sent;
              count = _yield$preMDAActivity.count;
              preMDAActivityDrugLogisticsData = _yield$preMDAActivity.rows;

              if (!(count <= 0)) {
                _context5.next = 15;
                break;
              }

              return _context5.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 15:
              return _context5.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: preMDAActivityDrugLogisticsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 18:
              _context5.prev = 18;
              _context5.t0 = _context5["catch"](0);
              console.error(_context5.t0);

              if (!_context5.t0.statusCode) {
                _context5.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context5.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context5.t0
              }));

            case 23:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 18]]);
    }));

    return function getAllPreMDAActivityDrugLogistics(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();

  var getPreMDAActivityDrugLogistics = /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var errors, reqObj, cond, _yield$preMDAActivity2, count, preMDAActivityDrugLogisticsData;

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

              if (reqObj.id) {
                cond["id"] = reqObj.id;
              }

              cond["isActive"] = true;
              _context6.next = 10;
              return preMDAActivityDrugLogistics.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]]
              });

            case 10:
              _yield$preMDAActivity2 = _context6.sent;
              count = _yield$preMDAActivity2.count;
              preMDAActivityDrugLogisticsData = _yield$preMDAActivity2.rows;

              if (!(count <= 0)) {
                _context6.next = 15;
                break;
              }

              return _context6.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 15:
              return _context6.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: preMDAActivityDrugLogisticsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 18:
              _context6.prev = 18;
              _context6.t0 = _context6["catch"](0);
              console.error(_context6.t0);

              if (!_context6.t0.statusCode) {
                _context6.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context6.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context6.t0
              }));

            case 23:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 18]]);
    }));

    return function getPreMDAActivityDrugLogistics(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }();

  var deletePreMDAActivities = /*#__PURE__*/function () {
    var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
      var errors, reqObj;
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

              if (!reqObj.id) {
                _context7.next = 11;
                break;
              }

              _context7.next = 8;
              return preMDAActivities.update({
                isActive: false
              }, {
                where: {
                  id: reqObj.id
                }
              });

            case 8:
              return _context7.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].DELETE_SUCCESS
              }));

            case 11:
              return _context7.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].SOMETHING_WRONG
              }));

            case 12:
              _context7.next = 19;
              break;

            case 14:
              _context7.prev = 14;
              _context7.t0 = _context7["catch"](0);
              console.error(_context7.t0);

              if (!_context7.t0.statusCode) {
                _context7.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context7.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context7.t0
              }));

            case 19:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 14]]);
    }));

    return function deletePreMDAActivities(_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }();

  var deletepreMDAActivityDrugAdministrators = /*#__PURE__*/function () {
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
              return preMDAActivityDrugAdministrators.update({
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

    return function deletepreMDAActivityDrugAdministrators(_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }();

  var deletepreMDAActivitySupervisors = /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
      var errors, reqObj;
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context9.next = 4;
                break;
              }

              throw errors.array();

            case 4:
              reqObj = _utils["default"].getReqValues(req);

              if (!reqObj.id) {
                _context9.next = 11;
                break;
              }

              _context9.next = 8;
              return preMDAActivitySupervisors.update({
                isActive: false
              }, {
                where: {
                  id: reqObj.id
                }
              });

            case 8:
              return _context9.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].DELETE_SUCCESS
              }));

            case 11:
              return _context9.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].SOMETHING_WRONG
              }));

            case 12:
              _context9.next = 19;
              break;

            case 14:
              _context9.prev = 14;
              _context9.t0 = _context9["catch"](0);
              console.error(_context9.t0);

              if (!_context9.t0.statusCode) {
                _context9.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context9.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context9.t0
              }));

            case 19:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 14]]);
    }));

    return function deletepreMDAActivitySupervisors(_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }();

  var deletePreMDAActivityDrugLogistics = /*#__PURE__*/function () {
    var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
      var errors, reqObj;
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

              if (!reqObj.id) {
                _context10.next = 11;
                break;
              }

              _context10.next = 8;
              return preMDAActivityDrugLogistics.update({
                isActive: false
              }, {
                where: {
                  id: reqObj.id
                }
              });

            case 8:
              return _context10.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].DELETE_SUCCESS
              }));

            case 11:
              return _context10.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].SOMETHING_WRONG
              }));

            case 12:
              _context10.next = 19;
              break;

            case 14:
              _context10.prev = 14;
              _context10.t0 = _context10["catch"](0);
              console.error(_context10.t0);

              if (!_context10.t0.statusCode) {
                _context10.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context10.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context10.t0
              }));

            case 19:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[0, 14]]);
    }));

    return function deletePreMDAActivityDrugLogistics(_x19, _x20) {
      return _ref10.apply(this, arguments);
    };
  }();

  return {
    createAllPreMDAActivity: createAllPreMDAActivity,
    createPreMDAActivities: createPreMDAActivities,
    createPreMDAActivityDrugLogistics: createPreMDAActivityDrugLogistics,
    getPreMDAActivities: getPreMDAActivities,
    getPreMDAActivityDrugLogistics: getPreMDAActivityDrugLogistics,
    deletePreMDAActivities: deletePreMDAActivities,
    deletePreMDAActivityDrugLogistics: deletePreMDAActivityDrugLogistics,
    deletepreMDAActivitySupervisors: deletepreMDAActivitySupervisors,
    deletepreMDAActivityDrugAdministrators: deletepreMDAActivityDrugAdministrators,
    getAllPreMDAActivityDrugLogistics: getAllPreMDAActivityDrugLogistics
  };
};

var _default = preMDAActivitiesController();

exports["default"] = _default;
//# sourceMappingURL=preMDAActivites.controller.js.map
