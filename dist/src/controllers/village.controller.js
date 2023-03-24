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

var villages = _sequelize["default"].villages;
var Op = _sequelize["default"].Sequelize.Op;

var villageController = function villageController() {
  var create = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, villageData, whereCodn;
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
              villageData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (!reqObj.villageName) {
                _context.next = 12;
                break;
              }

              whereCodn["villageName"] = reqObj.villageName;
              _context.next = 13;
              break;

            case 12:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].VILLAGE_REQUIRED
              }));

            case 13:
              if (!reqObj.id) {
                _context.next = 19;
                break;
              }

              _context.next = 16;
              return villages.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 16:
              villageData = _context.sent;
              _context.next = 27;
              break;

            case 19:
              _context.next = 21;
              return villages.findOne({
                where: whereCodn,
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                }
              });

            case 21:
              villageData = _context.sent;

              if (!(villageData && villageData.isNewRecord === false)) {
                _context.next = 24;
                break;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].VILLAGE_ALREADY_EXISTS
              }));

            case 24:
              _context.next = 26;
              return villages.create(reqObj);

            case 26:
              villageData = _context.sent;

            case 27:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: villageData,
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

  var getVillage = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var errors, reqObj, cond, attributes, _yield$villages$findA, count, villageData;

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

              if (reqObj.districtId) {
                cond["districtId"] = reqObj.districtId;
              }

              if (reqObj.facilityId) {
                cond["facilityId"] = reqObj.facilityId;
              }

              if (reqObj.talukaId) {
                cond["talukaId"] = reqObj.talukaId;
              }

              if (reqObj.subCenterId) {
                cond["subCenterId"] = reqObj.subCenterId;
              } // if(reqObj.zoneId){
              // 	cond["zoneId"] = reqObj.zoneId;
              // }


              cond["isActive"] = true; // old one
              // let cond = [{ districtId: '0' }, { talukaId: '0' }, { facilityId: '0' }, { subCenterId: '0' }];
              // let attributes = {
              // 	exclude: ["createdAt", "updatedAt"],
              // };
              // if (reqObj.districtId && reqObj.districtId !== '' && reqObj.districtId !== 'null') {
              // 	cond[0].districtId = reqObj.districtId;
              // }
              // if (reqObj.talukaId && reqObj.talukaId !== '' && reqObj.talukaId !== 'null') {
              // 	cond[1].talukaId = reqObj.talukaId
              // }
              // if (reqObj.facilityId && reqObj.facilityId !== '' && reqObj.facilityId !== 'null') {
              // 	cond[2].facilityId = reqObj.facilityId
              // }
              // if (reqObj.subCenterId && reqObj.subCenterId !== '' && reqObj.subCenterId !== 'null') {
              // 	cond[3].subCenterId = reqObj.subCenterId
              // }

              _context2.next = 14;
              return villages.findAndCountAll({
                where: cond,
                attributes: attributes,
                order: [["id", "ASC"]]
              });

            case 14:
              _yield$villages$findA = _context2.sent;
              count = _yield$villages$findA.count;
              villageData = _yield$villages$findA.rows;

              if (!(count <= 0)) {
                _context2.next = 19;
                break;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].VILLAGE_EMPTY
              }));

            case 19:
              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: villageData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 22:
              _context2.prev = 22;
              _context2.t0 = _context2["catch"](0);
              console.error(_context2.t0);

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

    return function getVillage(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var getVillagebyDistrict = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var errors, reqObj, cond, attributes, _yield$villages$findA2, count, villageData;

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
              attributes = {
                exclude: ["createdAt", "updatedAt"]
              };

              if (reqObj.districtId && reqObj.facilityId) {
                cond["districtId"] = reqObj.districtId;
                cond["facilityId"] = reqObj.facilityId;
              } else if (reqObj.districtId && reqObj.talukaId) {
                cond["districtId"] = reqObj.districtId;
              }

              cond["isActive"] = true;
              _context3.next = 11;
              return villages.findAndCountAll({
                where: cond,
                attributes: attributes,
                order: [["id", "ASC"]]
              });

            case 11:
              _yield$villages$findA2 = _context3.sent;
              count = _yield$villages$findA2.count;
              villageData = _yield$villages$findA2.rows;

              if (!(count <= 0)) {
                _context3.next = 16;
                break;
              }

              return _context3.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].VILLAGE_EMPTY
              }));

            case 16:
              return _context3.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: villageData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 19:
              _context3.prev = 19;
              _context3.t0 = _context3["catch"](0);
              console.error(_context3.t0);

              if (!_context3.t0.statusCode) {
                _context3.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context3.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context3.t0
              }));

            case 24:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 19]]);
    }));

    return function getVillagebyDistrict(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  var getVillageBySubCenter = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var errors, reqObj, cond, attributes, _yield$villages$findA3, count, villageData;

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
              attributes = {
                exclude: ["createdAt", "updatedAt"]
              };

              if (reqObj.districtId && reqObj.facilityId && reqObj.subCenterId) {
                cond["districtId"] = reqObj.districtId;
                cond["facilityId"] = reqObj.facilityId;
                cond["subCenterId"] = reqObj.subCenterId;
              }

              cond["isActive"] = true;
              _context4.next = 11;
              return villages.findAndCountAll({
                where: cond,
                attributes: attributes,
                order: [["id", "ASC"]]
              });

            case 11:
              _yield$villages$findA3 = _context4.sent;
              count = _yield$villages$findA3.count;
              villageData = _yield$villages$findA3.rows;

              if (!(count <= 0)) {
                _context4.next = 16;
                break;
              }

              return _context4.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].VILLAGE_EMPTY
              }));

            case 16:
              return _context4.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: villageData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 19:
              _context4.prev = 19;
              _context4.t0 = _context4["catch"](0);
              console.error(_context4.t0);

              if (!_context4.t0.statusCode) {
                _context4.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context4.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context4.t0
              }));

            case 24:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 19]]);
    }));

    return function getVillageBySubCenter(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();

  var deleteVillage = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var errors, reqObj;
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

              if (!reqObj.id) {
                _context5.next = 11;
                break;
              }

              _context5.next = 8;
              return villages.update({
                isActive: false
              }, {
                where: {
                  id: reqObj.id
                }
              });

            case 8:
              return _context5.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].DELETE_SUCCESS
              }));

            case 11:
              return _context5.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].SOMETHING_WRONG
              }));

            case 12:
              _context5.next = 19;
              break;

            case 14:
              _context5.prev = 14;
              _context5.t0 = _context5["catch"](0);
              console.error(_context5.t0);

              if (!_context5.t0.statusCode) {
                _context5.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context5.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context5.t0
              }));

            case 19:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 14]]);
    }));

    return function deleteVillage(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();

  return {
    create: create,
    getVillage: getVillage,
    deleteVillage: deleteVillage,
    getVillagebyDistrict: getVillagebyDistrict,
    getVillageBySubCenter: getVillageBySubCenter
  };
};

var _default = villageController();

exports["default"] = _default;
//# sourceMappingURL=village.controller.js.map
