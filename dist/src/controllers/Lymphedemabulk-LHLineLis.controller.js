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

var lymphedemaLineList = _sequelize["default"].lymphedemaLineList,
    lymphedemaLineListSurvey = _sequelize["default"].lymphedemaLineListSurvey,
    lymphedemaLineListFollowUpsLF = _sequelize["default"].lymphedemaLineListFollowUpsLF,
    lymphedemaLineListFollowUpsHF = _sequelize["default"].lymphedemaLineListFollowUpsHF,
    districts = _sequelize["default"].districts;

var bulklHLineListController = function bulklHLineListController() {
  var bulkcreate = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, patientInfo, whereCodn, patientID, districtId, nextId, districtCode;
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
              patientInfo = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (!reqObj.id) {
                _context.next = 17;
                break;
              }

              _context.next = 11;
              return lymphedemaLineList.update(reqObj.LymphedemaLineLists, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 11:
              patientInfo = _context.sent;
              reqObj.LymphedemaLineLists.LymphedemaLineListSurveys.forEach(function (element) {
                if (element["id"]) {
                  patientInfo = lymphedemaLineListSurvey.update(element, {
                    where: {
                      id: element["id"]
                    }
                  });
                } else if (!element["id"]) {
                  element.lymphedemaLineListId = reqObj.id;
                  patientInfo = lymphedemaLineListSurvey.create(element);
                }
              });
              reqObj.LymphedemaLineLists.LymphedemaLineListFollowUpsLFs.forEach(function (element) {
                if (element["id"]) {
                  patientInfo = lymphedemaLineListFollowUpsLF.update(element, {
                    where: {
                      id: element["id"]
                    }
                  });
                } else if (!element["id"]) {
                  element.lymphedemaLineListId = reqObj.id;
                  patientInfo = lymphedemaLineListFollowUpsLF.create(element);
                }
              });
              reqObj.LymphedemaLineLists.LymphedemaLineListFollowUpsHFs.forEach(function (element) {
                if (element["id"]) {
                  patientInfo = lymphedemaLineListFollowUpsHF.update(element, {
                    where: {
                      id: element["id"]
                    }
                  });
                } else if (!element["id"]) {
                  element.lymphedemaLineListId = reqObj.id;
                  patientInfo = lymphedemaLineListFollowUpsHF.create(element);
                }
              });
              _context.next = 32;
              break;

            case 17:
              _context.next = 19;
              return lymphedemaLineList.findOne({
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                },
                include: [{
                  model: lymphedemaLineListSurvey,
                  as: "LymphedemaLineListSurveys"
                }, {
                  model: lymphedemaLineListFollowUpsLF,
                  as: "LymphedemaLineListFollowUpsLFs"
                }, {
                  model: lymphedemaLineListFollowUpsHF,
                  as: "LymphedemaLineListFollowUpsHFs"
                }]
              });

            case 19:
              patientInfo = _context.sent;
              _context.next = 22;
              return lymphedemaLineList.findOne({
                attributes: {
                  include: ["id"]
                },
                order: [["id", "DESC"]]
              });

            case 22:
              patientID = _context.sent;
              _context.next = 25;
              return districts.findOne({
                where: reqObj.districtId,
                attributes: {
                  include: ["id", "districtCode"]
                },
                order: [["createdAt", "DESC"]]
              });

            case 25:
              districtId = _context.sent;
              nextId = patientID && patientID.dataValues && patientID.dataValues.id ? +patientID.dataValues.id + 1 : 1;
              districtCode = districtId && districtId.dataValues && districtId.dataValues.districtCode;
              reqObj.LymphedemaLineList.forEach(function (element) {
                element.patientId = "IND" + "-MH" + "-" + districtCode + "-" + (!element.year ? "YYYY" : element.year) + "-LF" + "0000" + nextId++;
              });
              _context.next = 31;
              return lymphedemaLineList.bulkCreate(reqObj.LymphedemaLineList, {
                include: [{
                  model: lymphedemaLineListSurvey,
                  as: "LymphedemaLineListSurveys"
                }, {
                  model: lymphedemaLineListFollowUpsLF,
                  as: "LymphedemaLineListFollowUpsLFs"
                }, {
                  model: lymphedemaLineListFollowUpsHF,
                  as: "LymphedemaLineListFollowUpsHFs"
                }],
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                }
              });

            case 31:
              patientInfo = _context.sent;

            case 32:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: patientInfo,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 35:
              _context.prev = 35;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

              if (!_context.t0.statusCode) {
                _context.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context.t0
              }));

            case 40:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 35]]);
    }));

    return function bulkcreate(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var bulkpostPatientInformation = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var reqObj, errors, lymphedemaLineListData, patientID, districtId, nextId, districtCode;
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
              lymphedemaLineListData = [];

              if (!reqObj.id) {
                _context2.next = 12;
                break;
              }

              _context2.next = 9;
              return lymphedemaLineList.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 9:
              lymphedemaLineListData = _context2.sent;
              _context2.next = 24;
              break;

            case 12:
              _context2.next = 14;
              return lymphedemaLineList.findOne({
                attributes: {
                  include: ["id"]
                },
                order: [["createdAt", "DESC"]]
              });

            case 14:
              patientID = _context2.sent;
              _context2.next = 17;
              return districts.findOne({
                where: reqObj.districtId,
                attributes: {
                  include: ["id", "districtCode"]
                },
                order: [["createdAt", "DESC"]]
              });

            case 17:
              districtId = _context2.sent;
              nextId = patientID && patientID.dataValues && patientID.dataValues.id ? +patientID.dataValues.id + 1 : 1;
              districtCode = districtId && districtId.dataValues && districtId.dataValues.districtCode;
              reqObj.patientId = "IND" + "-MH" + "-" + districtCode + "-" + (!reqObj.year ? "YYYY" : reqObj.year) + "-LF" + "0000" + nextId;
              _context2.next = 23;
              return lymphedemaLineList.bulkcreate(reqObj.lymphedemaLineList, {
                returning: true
              });

            case 23:
              lymphedemaLineListData = _context2.sent;

            case 24:
              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: lymphedemaLineListData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 27:
              _context2.prev = 27;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);

              if (!_context2.t0.statusCode) {
                _context2.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context2.t0
              }));

            case 32:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 27]]);
    }));

    return function bulkpostPatientInformation(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var bulkpostSurvey = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var reqObj, errors, lymphedemaLineListSurveyData;
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
              lymphedemaLineListSurveyData = [];

              if (!reqObj.id) {
                _context3.next = 12;
                break;
              }

              _context3.next = 9;
              return lymphedemaLineListSurvey.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 9:
              lymphedemaLineListSurveyData = _context3.sent;
              _context3.next = 15;
              break;

            case 12:
              _context3.next = 14;
              return lymphedemaLineListSurvey.bulkcreate(reqObj.lymphedemaLineListSurvey);

            case 14:
              lymphedemaLineListSurveyData = _context3.sent;

            case 15:
              return _context3.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: lymphedemaLineListSurveyData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 18:
              _context3.prev = 18;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);

              if (!_context3.t0.statusCode) {
                _context3.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context3.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context3.t0
              }));

            case 23:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 18]]);
    }));

    return function bulkpostSurvey(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  var bulkpostLFFollowups = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var reqObj, errors, lymphedemaLineListFollowUpsLFData;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context4.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              lymphedemaLineListFollowUpsLFData = [];

              if (!reqObj.id) {
                _context4.next = 12;
                break;
              }

              _context4.next = 9;
              return lymphedemaLineListFollowUpsLF.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 9:
              lymphedemaLineListFollowUpsLFData = _context4.sent;
              _context4.next = 15;
              break;

            case 12:
              _context4.next = 14;
              return lymphedemaLineListFollowUpsLF.bulkcreate(reqObj.lymphedemaLineListFollowUpsLF);

            case 14:
              lymphedemaLineListFollowUpsLFData = _context4.sent;

            case 15:
              return _context4.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: lymphedemaLineListFollowUpsLFData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 18:
              _context4.prev = 18;
              _context4.t0 = _context4["catch"](0);
              console.log(_context4.t0);

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

    return function bulkpostLFFollowups(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();

  var bulkpostHFFollowups = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var reqObj, errors, lymphedemaLineListFollowUpsHFData;
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
              lymphedemaLineListFollowUpsHFData = [];

              if (!reqObj.id) {
                _context5.next = 12;
                break;
              }

              _context5.next = 9;
              return lymphedemaLineListFollowUpsHF.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 9:
              lymphedemaLineListFollowUpsHFData = _context5.sent;
              _context5.next = 15;
              break;

            case 12:
              _context5.next = 14;
              return lymphedemaLineListFollowUpsHF.create(reqObj);

            case 14:
              lymphedemaLineListFollowUpsHFData = _context5.sent;

            case 15:
              return _context5.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: lymphedemaLineListFollowUpsHFData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 18:
              _context5.prev = 18;
              _context5.t0 = _context5["catch"](0);
              console.log(_context5.t0);

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

    return function bulkpostHFFollowups(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();

  return {
    bulkcreate: bulkcreate,
    bulkpostPatientInformation: bulkpostPatientInformation,
    bulkpostSurvey: bulkpostSurvey,
    bulkpostHFFollowups: bulkpostHFFollowups,
    bulkpostLFFollowups: bulkpostLFFollowups
  };
};

var _default = bulklHLineListController();

exports["default"] = _default;
//# sourceMappingURL=Lymphedemabulk-LHLineLis.controller.js.map
