"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

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
    udCategoryOptions = _sequelize["default"].udCategoryOptions,
    verticalControlFieldUnits = _sequelize["default"].verticalControlFieldUnits,
    verticalControlUnits = _sequelize["default"].verticalControlUnits,
    states = _sequelize["default"].states,
    districts = _sequelize["default"].districts,
    corporations = _sequelize["default"].corporations,
    talukas = _sequelize["default"].talukas,
    zones = _sequelize["default"].zones,
    facilities = _sequelize["default"].facilities,
    subCenters = _sequelize["default"].subCenters,
    wards = _sequelize["default"].wards,
    villages = _sequelize["default"].villages;
var Op = _sequelize["default"].Sequelize.Op;

var lHLineListController = function lHLineListController() {
  var create = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, patientInfo, whereCodn, patientID, districtId, currentId, districtCode;
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
              _context.next = 37;
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
              currentId = patientID && patientID.dataValues && patientID.dataValues.id ? +patientID.dataValues.id + 1 : 1;
              districtCode = districtId && districtId.dataValues && districtId.dataValues.districtCode;
              reqObj.patientId = "IND" + "-MH" + "-" + districtCode + "-" + (!reqObj.year ? "YYYY" : reqObj.year) + "-LF" + "0000" + currentId;
              console.log("patientID Id", patientID);
              console.log("districtId Id", districtId);
              console.log("currentId Id", currentId);
              console.log("districtCode Id", districtCode);
              console.log("patient Id", reqObj.patientId);
              _context.next = 36;
              return lymphedemaLineList.create(reqObj, {
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

            case 36:
              patientInfo = _context.sent;

            case 37:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: patientInfo,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 40:
              _context.prev = 40;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

              if (!_context.t0.statusCode) {
                _context.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context.t0
              }));

            case 45:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 40]]);
    }));

    return function create(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var getLHLineList = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var errors, reqObj, cond, cond2, cond3, cond4, cond5, _yield$lymphedemaLine, count, patientInfo;

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
              cond2 = {};
              cond3 = {};
              cond4 = {};
              cond5 = {};

              if (reqObj.id) {
                cond["id"] = reqObj.id;
              }

              if (reqObj.patientId) {
                cond["patientId"] = (0, _defineProperty2["default"])({}, Op.iLike, "%" + reqObj["patientId"] + "%");
              }

              if (reqObj.patientName) {
                cond["nameOfPatient"] = (0, _defineProperty2["default"])({}, Op.iLike, "%" + reqObj["patientName"] + "%");
              }

              if (reqObj.districtId) {
                cond["districtId"] = reqObj.districtId;
              }

              if (reqObj.talukaId) {
                cond["talukaId"] = reqObj.talukaId;
              }

              if (reqObj.facilityId) {
                cond["facilityId"] = reqObj.facilityId;
              }

              if (reqObj.subCenterId) {
                cond["subCenterId"] = reqObj.subCenterId;
              }

              if (reqObj.villageId) {
                cond["villageId"] = reqObj.villageId;
              }

              cond["isActive"] = true;

              if (reqObj.grading) {
                cond["grading"] = reqObj.grading;
              }

              if (reqObj.gender) {
                cond["gender"] = reqObj.gender;
              }

              if (reqObj.patientMobileNumber) {
                cond["patientMobileNumber"] = (0, _defineProperty2["default"])({}, Op.iLike, "%" + reqObj["patientMobileNumber"] + "%");
              }

              if (reqObj.ashaMobileNumber) {
                cond["ashaMobileNumber"] = (0, _defineProperty2["default"])({}, Op.iLike, "%" + reqObj["ashaMobileNumber"] + "%");
              }

              if (reqObj.unitOfAction) {
                cond3["unitOfAction"] = reqObj.unitOfAction;
              }

              if (reqObj.nameOfUnit) {
                cond4["nameOfUnit"] = reqObj.nameOfUnit;
              }

              if (reqObj.nameOfFiledUnit) {
                cond5["nameOfFiledUnit"] = reqObj.nameOfFiledUnit;
              }

              _context2.next = 28;
              return lymphedemaLineList.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]],
                include: [{
                  model: lymphedemaLineListSurvey,
                  as: "LymphedemaLineListSurveys",
                  required: false
                }, {
                  model: lymphedemaLineListFollowUpsLF,
                  as: "LymphedemaLineListFollowUpsLFs",
                  required: false
                }, {
                  model: lymphedemaLineListFollowUpsHF,
                  as: "LymphedemaLineListFollowUpsHFs",
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
                  model: zones,
                  attributes: ["id", "zoneName"],
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
                  where: cond2,
                  model: udCategoryOptions,
                  as: "Grading",
                  required: false
                }, {
                  where: cond3,
                  model: udCategoryOptions,
                  as: "UnitOfAction",
                  required: false
                }, {
                  where: cond4,
                  model: verticalControlUnits,
                  required: false
                }, {
                  where: cond5,
                  model: verticalControlFieldUnits,
                  required: false
                }]
              });

            case 28:
              _yield$lymphedemaLine = _context2.sent;
              count = _yield$lymphedemaLine.count;
              patientInfo = _yield$lymphedemaLine.rows;

              if (!(count <= 0)) {
                _context2.next = 33;
                break;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 33:
              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: patientInfo,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 36:
              _context2.prev = 36;
              _context2.t0 = _context2["catch"](0);
              console.error(_context2.t0);

              if (!_context2.t0.statusCode) {
                _context2.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context2.t0
              }));

            case 41:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 36]]);
    }));

    return function getLHLineList(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var deleteLHLineList = /*#__PURE__*/function () {
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
              return lymphedemaLineList.update({
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

    return function deleteLHLineList(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  var postPatientInformation = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var reqObj, errors, lymphedemaLineListData, patientID, districtId, currentId, districtCode;
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
              lymphedemaLineListData = [];

              if (!reqObj.id) {
                _context4.next = 12;
                break;
              }

              _context4.next = 9;
              return lymphedemaLineList.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 9:
              lymphedemaLineListData = _context4.sent;
              _context4.next = 24;
              break;

            case 12:
              _context4.next = 14;
              return lymphedemaLineList.findOne({
                attributes: {
                  include: ["id"]
                },
                order: [["createdAt", "DESC"]]
              });

            case 14:
              patientID = _context4.sent;
              _context4.next = 17;
              return districts.findOne({
                where: reqObj.districtId,
                attributes: {
                  include: ["id", "districtCode"]
                },
                order: [["createdAt", "DESC"]]
              });

            case 17:
              districtId = _context4.sent;
              currentId = patientID && patientID.dataValues && patientID.dataValues.id ? +patientID.dataValues.id + 1 : 1;
              districtCode = districtId && districtId.dataValues && districtId.dataValues.districtCode;
              reqObj.patientId = "IND" + "-MH" + "-" + districtCode + "-" + (!reqObj.year ? "YYYY" : reqObj.year) + "-LF" + "0000" + currentId;
              _context4.next = 23;
              return lymphedemaLineList.create(reqObj);

            case 23:
              lymphedemaLineListData = _context4.sent;

            case 24:
              return _context4.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: lymphedemaLineListData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 27:
              _context4.prev = 27;
              _context4.t0 = _context4["catch"](0);
              console.log(_context4.t0);

              if (!_context4.t0.statusCode) {
                _context4.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context4.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context4.t0
              }));

            case 32:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 27]]);
    }));

    return function postPatientInformation(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();

  var postSurvey = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var reqObj, errors, lymphedemaLineListSurveyData;
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
              lymphedemaLineListSurveyData = [];

              if (!reqObj.id) {
                _context5.next = 12;
                break;
              }

              _context5.next = 9;
              return lymphedemaLineListSurvey.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 9:
              lymphedemaLineListSurveyData = _context5.sent;
              _context5.next = 15;
              break;

            case 12:
              _context5.next = 14;
              return lymphedemaLineListSurvey.create(reqObj);

            case 14:
              lymphedemaLineListSurveyData = _context5.sent;

            case 15:
              return _context5.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: lymphedemaLineListSurveyData,
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

    return function postSurvey(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();

  var getSurveyList = /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var errors, reqObj, cond, cond2, cond3, cond4, _yield$lymphedemaLine2, count, surveys;

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
              cond3 = {};
              cond4 = {};

              if (reqObj.id) {
                cond["id"] = reqObj.id;
              }

              if (reqObj.id) {
                cond[""] = reqObj.id;
              }

              if (reqObj.lymphedemaLineListId) {
                cond["lymphedemaLineListId"] = reqObj.lymphedemaLineListId;
              }

              if (reqObj.surveyDoneUnder) {
                cond2["surveyDoneUnder"] = reqObj.surveyDoneUnder;
              }

              cond["isActive"] = true;
              _context6.next = 16;
              return lymphedemaLineListSurvey.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]],
                include: [{
                  where: cond2,
                  model: udCategoryOptions,
                  required: false
                }]
              });

            case 16:
              _yield$lymphedemaLine2 = _context6.sent;
              count = _yield$lymphedemaLine2.count;
              surveys = _yield$lymphedemaLine2.rows;

              if (!(count <= 0)) {
                _context6.next = 21;
                break;
              }

              return _context6.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 21:
              return _context6.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: surveys,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 24:
              _context6.prev = 24;
              _context6.t0 = _context6["catch"](0);
              console.error(_context6.t0);

              if (!_context6.t0.statusCode) {
                _context6.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context6.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context6.t0
              }));

            case 29:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 24]]);
    }));

    return function getSurveyList(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }();

  var postLFFollowups = /*#__PURE__*/function () {
    var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
      var reqObj, errors, lymphedemaLineListFollowUpsLFData;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context7.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              lymphedemaLineListFollowUpsLFData = [];

              if (!reqObj.id) {
                _context7.next = 12;
                break;
              }

              _context7.next = 9;
              return lymphedemaLineListFollowUpsLF.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 9:
              lymphedemaLineListFollowUpsLFData = _context7.sent;
              _context7.next = 15;
              break;

            case 12:
              _context7.next = 14;
              return lymphedemaLineListFollowUpsLF.create(reqObj);

            case 14:
              lymphedemaLineListFollowUpsLFData = _context7.sent;

            case 15:
              return _context7.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: lymphedemaLineListFollowUpsLFData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 18:
              _context7.prev = 18;
              _context7.t0 = _context7["catch"](0);
              console.log(_context7.t0);

              if (!_context7.t0.statusCode) {
                _context7.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context7.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context7.t0
              }));

            case 23:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 18]]);
    }));

    return function postLFFollowups(_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }();

  var getLFFollowups = /*#__PURE__*/function () {
    var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
      var errors, reqObj, cond, cond1, _yield$lymphedemaLine3, count, surveys;

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
              cond = {};
              cond1 = {};
              console.log("reqObj", reqObj);

              if (reqObj.id) {
                cond["id"] = reqObj.id;
              }

              if (reqObj.lymphedemaLineListId) {
                cond["lymphedemaLineListId"] = reqObj.lymphedemaLineListId;
              }

              if (reqObj.followUpLostReasonsId) {
                cond1["followUpLostReasonsId"] = reqObj.followUpLostReasonsId;
              }

              cond["isActive"] = true;
              _context8.next = 14;
              return lymphedemaLineListFollowUpsLF.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]],
                include: [{
                  where: cond1,
                  model: udCategoryOptions,
                  as: "FollowUpLostReasonsId",
                  required: false
                }]
              });

            case 14:
              _yield$lymphedemaLine3 = _context8.sent;
              count = _yield$lymphedemaLine3.count;
              surveys = _yield$lymphedemaLine3.rows;

              if (!(count <= 0)) {
                _context8.next = 19;
                break;
              }

              return _context8.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 19:
              return _context8.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: surveys,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 22:
              _context8.prev = 22;
              _context8.t0 = _context8["catch"](0);
              console.error(_context8.t0);

              if (!_context8.t0.statusCode) {
                _context8.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context8.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context8.t0
              }));

            case 27:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 22]]);
    }));

    return function getLFFollowups(_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }();

  var postHFFollowups = /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
      var reqObj, errors, lymphedemaLineListFollowUpsHFData;
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
              lymphedemaLineListFollowUpsHFData = [];

              if (!reqObj.id) {
                _context9.next = 12;
                break;
              }

              _context9.next = 9;
              return lymphedemaLineListFollowUpsHF.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 9:
              lymphedemaLineListFollowUpsHFData = _context9.sent;
              _context9.next = 15;
              break;

            case 12:
              _context9.next = 14;
              return lymphedemaLineListFollowUpsHF.create(reqObj);

            case 14:
              lymphedemaLineListFollowUpsHFData = _context9.sent;

            case 15:
              return _context9.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: lymphedemaLineListFollowUpsHFData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 18:
              _context9.prev = 18;
              _context9.t0 = _context9["catch"](0);
              console.log(_context9.t0);

              if (!_context9.t0.statusCode) {
                _context9.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context9.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context9.t0
              }));

            case 23:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 18]]);
    }));

    return function postHFFollowups(_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }();

  var getHFFollowups = /*#__PURE__*/function () {
    var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
      var errors, reqObj, cond, cond2, cond3, _yield$lymphedemaLine4, count, surveys;

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
              cond2 = {};
              cond3 = {};

              if (reqObj.id) {
                cond["id"] = reqObj.id;
              }

              if (reqObj.lymphedemaLineListId) {
                cond["lymphedemaLineListId"] = reqObj.lymphedemaLineListId;
              }

              if (reqObj.surgeryNotPossibleReasonsId) {
                cond2["surgeryNotPossibleReasonsId"] = reqObj.surgeryNotPossibleReasonsId;
              }

              if (reqObj.nameOfHospitalSurgeryDoneId) {
                cond3["nameOfHospitalSurgeryDoneId"] = reqObj.nameOfHospitalSurgeryDoneId;
              }

              cond["isActive"] = true;
              _context10.next = 15;
              return lymphedemaLineListFollowUpsHF.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]],
                include: [{
                  where: cond2,
                  model: udCategoryOptions,
                  as: "SurgeryNotPossibleReasonsId",
                  required: false
                }, {
                  where: cond3,
                  model: facilities,
                  as: "NameOfHospitalSurgeryDoneId",
                  required: false
                }]
              });

            case 15:
              _yield$lymphedemaLine4 = _context10.sent;
              count = _yield$lymphedemaLine4.count;
              surveys = _yield$lymphedemaLine4.rows;

              if (!(count <= 0)) {
                _context10.next = 20;
                break;
              }

              return _context10.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 20:
              return _context10.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: surveys,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 23:
              _context10.prev = 23;
              _context10.t0 = _context10["catch"](0);
              console.error(_context10.t0);

              if (!_context10.t0.statusCode) {
                _context10.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context10.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context10.t0
              }));

            case 28:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[0, 23]]);
    }));

    return function getHFFollowups(_x19, _x20) {
      return _ref10.apply(this, arguments);
    };
  }();

  var getPatientInfo = /*#__PURE__*/function () {
    var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
      var errors, reqObj, cond, _yield$lymphedemaLine5, count, surveys;

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
              console.log("reqObj", reqObj);

              if (reqObj.id) {
                cond["id"] = reqObj.id;
              }

              cond["isActive"] = true;
              _context11.next = 11;
              return lymphedemaLineList.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]]
              });

            case 11:
              _yield$lymphedemaLine5 = _context11.sent;
              count = _yield$lymphedemaLine5.count;
              surveys = _yield$lymphedemaLine5.rows;

              if (!(count <= 0)) {
                _context11.next = 16;
                break;
              }

              return _context11.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 16:
              return _context11.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: surveys,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 19:
              _context11.prev = 19;
              _context11.t0 = _context11["catch"](0);
              console.error(_context11.t0);

              if (!_context11.t0.statusCode) {
                _context11.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context11.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context11.t0
              }));

            case 24:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, null, [[0, 19]]);
    }));

    return function getPatientInfo(_x21, _x22) {
      return _ref11.apply(this, arguments);
    };
  }();

  var deleteHFFollowup = /*#__PURE__*/function () {
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
              return lymphedemaLineListFollowUpsHF.update({
                isActive: false
              }, {
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

    return function deleteHFFollowup(_x23, _x24) {
      return _ref12.apply(this, arguments);
    };
  }();

  var deleteLFFollowup = /*#__PURE__*/function () {
    var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
      var errors, reqObj;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.prev = 0;
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context13.next = 4;
                break;
              }

              throw errors.array();

            case 4:
              reqObj = _utils["default"].getReqValues(req);

              if (!reqObj.id) {
                _context13.next = 11;
                break;
              }

              _context13.next = 8;
              return lymphedemaLineListFollowUpsLF.update({
                isActive: false
              }, {
                where: {
                  id: reqObj.id
                }
              });

            case 8:
              return _context13.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].DELETE_SUCCESS
              }));

            case 11:
              return _context13.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].SOMETHING_WRONG
              }));

            case 12:
              _context13.next = 19;
              break;

            case 14:
              _context13.prev = 14;
              _context13.t0 = _context13["catch"](0);
              console.error(_context13.t0);

              if (!_context13.t0.statusCode) {
                _context13.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context13.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context13.t0
              }));

            case 19:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, null, [[0, 14]]);
    }));

    return function deleteLFFollowup(_x25, _x26) {
      return _ref13.apply(this, arguments);
    };
  }();

  var deleteSurvey = /*#__PURE__*/function () {
    var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
      var errors, reqObj;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.prev = 0;
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context14.next = 4;
                break;
              }

              throw errors.array();

            case 4:
              reqObj = _utils["default"].getReqValues(req);

              if (!reqObj.id) {
                _context14.next = 11;
                break;
              }

              _context14.next = 8;
              return lymphedemaLineListSurvey.update({
                isActive: false
              }, {
                where: {
                  id: reqObj.id
                }
              });

            case 8:
              return _context14.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].DELETE_SUCCESS
              }));

            case 11:
              return _context14.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].SOMETHING_WRONG
              }));

            case 12:
              _context14.next = 19;
              break;

            case 14:
              _context14.prev = 14;
              _context14.t0 = _context14["catch"](0);
              console.error(_context14.t0);

              if (!_context14.t0.statusCode) {
                _context14.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context14.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context14.t0
              }));

            case 19:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, null, [[0, 14]]);
    }));

    return function deleteSurvey(_x27, _x28) {
      return _ref14.apply(this, arguments);
    };
  }();

  return {
    postPatientInformation: postPatientInformation,
    postSurvey: postSurvey,
    getSurveyList: getSurveyList,
    getLFFollowups: getLFFollowups,
    postLFFollowups: postLFFollowups,
    getHFFollowups: getHFFollowups,
    postHFFollowups: postHFFollowups,
    create: create,
    getLHLineList: getLHLineList,
    deleteLHLineList: deleteLHLineList,
    getPatientInfo: getPatientInfo,
    deleteHFFollowup: deleteHFFollowup,
    deleteLFFollowup: deleteLFFollowup,
    deleteSurvey: deleteSurvey
  };
};

var _default = lHLineListController();

exports["default"] = _default;
//# sourceMappingURL=Lymphedema-LHLineList.controller.js.map
