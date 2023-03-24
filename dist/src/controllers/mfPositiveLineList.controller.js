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

var mfPositiveLineList = _sequelize["default"].mfPositiveLineList,
    mfPositiveLineListSurvey = _sequelize["default"].mfPositiveLineListSurvey,
    mfPositiveLineListPatients = _sequelize["default"].mfPositiveLineListPatients,
    mfPositiveLineListBSFollowUps = _sequelize["default"].mfPositiveLineListBSFollowUps,
    verticalControlUnits = _sequelize["default"].verticalControlUnits,
    udCategoryOptions = _sequelize["default"].udCategoryOptions,
    verticalControlFieldUnits = _sequelize["default"].verticalControlFieldUnits,
    districts = _sequelize["default"].districts,
    talukas = _sequelize["default"].talukas,
    facilities = _sequelize["default"].facilities,
    villages = _sequelize["default"].villages,
    zones = _sequelize["default"].zones,
    subCenters = _sequelize["default"].subCenters,
    corporations = _sequelize["default"].corporations;
var Op = _sequelize["default"].Sequelize.Op;

var mfPositiveController = function mfPositiveController() {
  var createMfPositiveLineList = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, mfPositiveLineData, whereCodn, obj, patientID, currentId;
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
              mfPositiveLineData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;
              obj = {};

              if (!reqObj.id) {
                _context.next = 15;
                break;
              }

              _context.next = 12;
              return mfPositiveLineList.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 12:
              mfPositiveLineData = _context.sent;
              _context.next = 23;
              break;

            case 15:
              _context.next = 17;
              return mfPositiveLineList.findOne({
                attributes: {
                  include: ["id"]
                },
                order: [["id", "DESC"]]
              });

            case 17:
              patientID = _context.sent;
              currentId = patientID && patientID.dataValues && patientID.dataValues.id ? +patientID.dataValues.id + 1 : 1;
              reqObj.srNo = "SR" + currentId;
              _context.next = 22;
              return mfPositiveLineList.create(reqObj);

            case 22:
              mfPositiveLineData = _context.sent;

            case 23:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: mfPositiveLineData,
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

    return function createMfPositiveLineList(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var createAllMfPositiveLineList = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var reqObj, errors, mfPositiveLineData, mfPositiveLineListPatientsData, incomingMfPositiveLineListPatientsData, mfPositiveLineListPatientsUpdatedData, whereCodn, patientID, currentId;
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
              mfPositiveLineData = [];
              mfPositiveLineListPatientsData = [];
              incomingMfPositiveLineListPatientsData = reqObj && reqObj.mfPositiveLineListPatients && reqObj.mfPositiveLineListPatients.length ? reqObj.mfPositiveLineListPatients : [];
              mfPositiveLineListPatientsUpdatedData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (!reqObj.id) {
                _context3.next = 17;
                break;
              }

              _context3.next = 14;
              return mfPositiveLineList.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 14:
              mfPositiveLineData = _context3.sent;
              _context3.next = 26;
              break;

            case 17:
              _context3.next = 19;
              return mfPositiveLineList.findOne({
                attributes: {
                  include: ["id"]
                },
                order: [["id", "DESC"]]
              });

            case 19:
              patientID = _context3.sent;
              currentId = patientID && patientID.dataValues && patientID.dataValues.id ? +patientID.dataValues.id + 1 : 1;
              reqObj.srNo = "SR" + currentId;
              _context3.next = 24;
              return mfPositiveLineList.create(reqObj, {
                include: [{
                  model: mfPositiveLineListSurvey,
                  as: "mfPositiveLineListSurveys"
                }, {
                  model: mfPositiveLineListBSFollowUps,
                  as: "mfPositiveLineListBSFollowUps"
                }]
              });

            case 24:
              mfPositiveLineData = _context3.sent;
              incomingMfPositiveLineListPatientsData.forEach( /*#__PURE__*/function () {
                var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(element) {
                  return _regenerator["default"].wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          if (!(mfPositiveLineData && mfPositiveLineData.id)) {
                            _context2.next = 15;
                            break;
                          }

                          if (!element["id"]) {
                            _context2.next = 6;
                            break;
                          }

                          element.mfPositiveLineListId = mfPositiveLineData.id;
                          mfPositiveLineListPatientsData = mfPositiveLineListPatients.update(element, {
                            where: {
                              id: element["id"]
                            }
                          });
                          _context2.next = 15;
                          break;

                        case 6:
                          if (element["id"]) {
                            _context2.next = 15;
                            break;
                          }

                          element.mfPositiveLineListId = mfPositiveLineData.id;
                          _context2.next = 10;
                          return mfPositiveLineListPatients.create(element);

                        case 10:
                          mfPositiveLineListPatientsData = _context2.sent;
                          mfPositiveLineListPatientsData.patientId = "MF" + "0000" + mfPositiveLineListPatientsData.id;
                          _context2.next = 14;
                          return mfPositiveLineListPatients.update({
                            patientId: mfPositiveLineListPatientsData.patientId
                          }, {
                            where: {
                              id: mfPositiveLineListPatientsData["id"]
                            }
                          });

                        case 14:
                          mfPositiveLineListPatientsUpdatedData = _context2.sent;

                        case 15:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                return function (_x5) {
                  return _ref3.apply(this, arguments);
                };
              }());

            case 26:
              return _context3.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: mfPositiveLineData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 29:
              _context3.prev = 29;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);

              if (!_context3.t0.statusCode) {
                _context3.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context3.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context3.t0
              }));

            case 34:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 29]]);
    }));

    return function createAllMfPositiveLineList(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var getMFPositiveLineList = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var errors, reqObj, cond, cond1, cond2, _yield$mfPositiveLine, count, mfPositiveLineData;

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
              cond1 = {};
              cond2 = {};

              if (reqObj.id) {
                cond["id"] = reqObj.id;
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

              if (reqObj.bsCollectionAntigenTest) {
                cond1["bsCollectionAntigenTest"] = reqObj.bsCollectionAntigenTest;
              }

              if (reqObj.unitOfAction) {
                cond1["unitOfAction"] = reqObj.unitOfAction;
              }

              cond["isActive"] = true;
              _context4.next = 19;
              return mfPositiveLineList.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]],
                include: [{
                  model: mfPositiveLineListSurvey,
                  required: false
                }, {
                  model: mfPositiveLineListPatients,
                  required: false
                }, {
                  model: mfPositiveLineListBSFollowUps,
                  required: false
                }, {
                  model: verticalControlUnits,
                  required: false
                }, {
                  model: verticalControlFieldUnits,
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
                  where: cond1,
                  model: udCategoryOptions,
                  as: "BsCollectionAntigenTest",
                  attributes: ["categoryCode", "categoryName", "categoryOptionEnum", "categoryOptionName"],
                  required: false
                }, {
                  where: cond2,
                  model: udCategoryOptions,
                  as: "UnitOfAction2",
                  attributes: ["categoryCode", "categoryName", "categoryOptionEnum", "categoryOptionName"],
                  required: false
                }]
              });

            case 19:
              _yield$mfPositiveLine = _context4.sent;
              count = _yield$mfPositiveLine.count;
              mfPositiveLineData = _yield$mfPositiveLine.rows;

              if (!(count <= 0)) {
                _context4.next = 24;
                break;
              }

              return _context4.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 24:
              return _context4.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: mfPositiveLineData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 27:
              _context4.prev = 27;
              _context4.t0 = _context4["catch"](0);
              console.error(_context4.t0);

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

    return function getMFPositiveLineList(_x6, _x7) {
      return _ref4.apply(this, arguments);
    };
  }();

  var deleteMFPositiveLineList = /*#__PURE__*/function () {
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
              return mfPositiveLineList.update({
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

    return function deleteMFPositiveLineList(_x8, _x9) {
      return _ref5.apply(this, arguments);
    };
  }();

  var createMfPositiveLineListSurvey = /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var reqObj, errors, mfPositiveLineListSurveyData, whereCodn;
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context6.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              if (!(reqObj.noOfBSFoundPositive && reqObj["fieldUnitId"])) {
                _context6.next = 8;
                break;
              }

              _context6.next = 8;
              return mfPositiveLineList.update(reqObj, {
                where: {
                  id: reqObj["fieldUnitId"]
                }
              });

            case 8:
              mfPositiveLineListSurveyData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (reqObj.fieldUnitId) {
                reqObj.surveyInfo.forEach(function (element) {
                  if (element["id"]) {
                    element.mfPositiveLineListId = reqObj.fieldUnitId;

                    if (!element.dateOfAction) {
                      element.dateOfAction = new Date();
                    } else {
                      element.dateOfAction = element.dateOfAction;
                    }

                    mfPositiveLineListSurveyData = mfPositiveLineListSurvey.update(element, {
                      where: {
                        id: element["id"]
                      }
                    });
                  } else if (!element["id"]) {
                    element.mfPositiveLineListId = reqObj.fieldUnitId;

                    if (!element.dateOfAction) {
                      element.dateOfAction = new Date();
                    } else {
                      element.dateOfAction = element.dateOfAction;
                    }

                    mfPositiveLineListSurveyData = mfPositiveLineListSurvey.create(element);
                  }
                });
              }

              return _context6.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: mfPositiveLineListSurveyData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 15:
              _context6.prev = 15;
              _context6.t0 = _context6["catch"](0);
              console.log(_context6.t0);

              if (!_context6.t0.statusCode) {
                _context6.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context6.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context6.t0
              }));

            case 20:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 15]]);
    }));

    return function createMfPositiveLineListSurvey(_x10, _x11) {
      return _ref6.apply(this, arguments);
    };
  }();

  var getMfPositiveLineListSurvey = /*#__PURE__*/function () {
    var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
      var errors, reqObj, cond, _yield$mfPositiveLine2, count, mfPositiveLineListSurveyData, responseData;

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

              if (reqObj.fieldUnitId) {
                cond["mfPositiveLineListId"] = reqObj.fieldUnitId;
              }

              cond["isActive"] = true;
              _context7.next = 10;
              return mfPositiveLineListSurvey.findAndCountAll({
                where: cond,
                order: [["id", "ASC"]]
              });

            case 10:
              _yield$mfPositiveLine2 = _context7.sent;
              count = _yield$mfPositiveLine2.count;
              mfPositiveLineListSurveyData = _yield$mfPositiveLine2.rows;

              if (!(count <= 0)) {
                _context7.next = 15;
                break;
              }

              return _context7.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 15:
              responseData = {};
              responseData.surveyInfo = mfPositiveLineListSurveyData;
              return _context7.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: responseData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 20:
              _context7.prev = 20;
              _context7.t0 = _context7["catch"](0);
              console.error(_context7.t0);

              if (!_context7.t0.statusCode) {
                _context7.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context7.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context7.t0
              }));

            case 25:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 20]]);
    }));

    return function getMfPositiveLineListSurvey(_x12, _x13) {
      return _ref7.apply(this, arguments);
    };
  }();

  var deleteMfPositiveLineListSurvey = /*#__PURE__*/function () {
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
              return mfPositiveLineListSurvey.update({
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

    return function deleteMfPositiveLineListSurvey(_x14, _x15) {
      return _ref8.apply(this, arguments);
    };
  }();

  var createMfPositiveLineListPatients = /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
      var reqObj, errors, mfPositiveLineListPatientsData, whereCodn, obj, patientID, currentId;
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
              mfPositiveLineListPatientsData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;
              obj = {};

              if (!reqObj.id) {
                _context9.next = 15;
                break;
              }

              _context9.next = 12;
              return mfPositiveLineListPatients.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 12:
              mfPositiveLineListPatientsData = _context9.sent;
              _context9.next = 23;
              break;

            case 15:
              _context9.next = 17;
              return mfPositiveLineListPatients.findOne({
                attributes: {
                  include: ["id"]
                },
                order: [["id", "DESC"]]
              });

            case 17:
              patientID = _context9.sent;
              currentId = patientID && patientID.dataValues && patientID.dataValues.id ? +patientID.dataValues.id + 1 : 1;
              reqObj.patientId = "MF" + "0000" + currentId;
              _context9.next = 22;
              return mfPositiveLineListPatients.create(reqObj);

            case 22:
              mfPositiveLineListPatientsData = _context9.sent;

            case 23:
              return _context9.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: mfPositiveLineListPatientsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 26:
              _context9.prev = 26;
              _context9.t0 = _context9["catch"](0);
              console.log(_context9.t0);

              if (!_context9.t0.statusCode) {
                _context9.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context9.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context9.t0
              }));

            case 31:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 26]]);
    }));

    return function createMfPositiveLineListPatients(_x16, _x17) {
      return _ref9.apply(this, arguments);
    };
  }();

  var getMfPositiveLineListPatients = /*#__PURE__*/function () {
    var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
      var errors, reqObj, cond, cond1, cond2, _yield$mfPositiveLine3, count, mfPositiveLineListPatientsData;

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
              cond1 = {};
              cond2 = {};

              if (reqObj.id) {
                cond["id"] = reqObj.id;
              }

              if (reqObj.fieldUnitId) {
                cond["mfPositiveLineListId"] = reqObj.fieldUnitId;
              }

              if (reqObj.gender) {
                cond["gender"] = reqObj.gender;
              }

              if (reqObj.nameOfFiledUnit) {
                cond1["nameOfFiledUnit"] = reqObj.nameOfFiledUnit;
              }

              if (reqObj.reasonsForNonTreating) {
                cond2["reasonsForNonTreating"] = reqObj.reasonsForNonTreating;
              }

              cond["isActive"] = true;
              _context10.next = 16;
              return mfPositiveLineListPatients.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]],
                include: [{
                  model: mfPositiveLineList,
                  required: false
                }, {
                  where: cond1,
                  model: udCategoryOptions,
                  as: "Gender",
                  required: false
                }, {
                  where: cond2,
                  model: udCategoryOptions,
                  as: "ReasonsForNonTreating",
                  required: false
                }]
              });

            case 16:
              _yield$mfPositiveLine3 = _context10.sent;
              count = _yield$mfPositiveLine3.count;
              mfPositiveLineListPatientsData = _yield$mfPositiveLine3.rows;

              if (!(count <= 0)) {
                _context10.next = 21;
                break;
              }

              return _context10.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 21:
              return _context10.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: mfPositiveLineListPatientsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 24:
              _context10.prev = 24;
              _context10.t0 = _context10["catch"](0);
              console.error(_context10.t0);

              if (!_context10.t0.statusCode) {
                _context10.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context10.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context10.t0
              }));

            case 29:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[0, 24]]);
    }));

    return function getMfPositiveLineListPatients(_x18, _x19) {
      return _ref10.apply(this, arguments);
    };
  }();

  var deleteMfPositiveLineListPatients = /*#__PURE__*/function () {
    var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
      var errors, reqObj;
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

              if (!reqObj.id) {
                _context11.next = 11;
                break;
              }

              _context11.next = 8;
              return mfPositiveLineListPatients.update({
                isActive: false
              }, {
                where: {
                  id: reqObj.id
                }
              });

            case 8:
              return _context11.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].DELETE_SUCCESS
              }));

            case 11:
              return _context11.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].SOMETHING_WRONG
              }));

            case 12:
              _context11.next = 19;
              break;

            case 14:
              _context11.prev = 14;
              _context11.t0 = _context11["catch"](0);
              console.error(_context11.t0);

              if (!_context11.t0.statusCode) {
                _context11.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context11.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context11.t0
              }));

            case 19:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, null, [[0, 14]]);
    }));

    return function deleteMfPositiveLineListPatients(_x20, _x21) {
      return _ref11.apply(this, arguments);
    };
  }();

  var createMfPositiveLineListBSFollowUps = /*#__PURE__*/function () {
    var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
      var reqObj, errors, mfPositiveLineListBSFollowUpsData, whereCodn, obj;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context12.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              mfPositiveLineListBSFollowUpsData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;
              obj = {};

              if (!reqObj.id) {
                _context12.next = 15;
                break;
              }

              _context12.next = 12;
              return mfPositiveLineListBSFollowUps.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 12:
              mfPositiveLineListBSFollowUpsData = _context12.sent;
              _context12.next = 21;
              break;

            case 15:
              _context12.next = 17;
              return mfPositiveLineListBSFollowUps.findOne({
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                }
              });

            case 17:
              mfPositiveLineListBSFollowUpsData = _context12.sent;
              _context12.next = 20;
              return mfPositiveLineListBSFollowUps.create(reqObj);

            case 20:
              mfPositiveLineListBSFollowUpsData = _context12.sent;

            case 21:
              return _context12.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: mfPositiveLineListBSFollowUpsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 24:
              _context12.prev = 24;
              _context12.t0 = _context12["catch"](0);
              console.log(_context12.t0);

              if (!_context12.t0.statusCode) {
                _context12.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context12.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context12.t0
              }));

            case 29:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, null, [[0, 24]]);
    }));

    return function createMfPositiveLineListBSFollowUps(_x22, _x23) {
      return _ref12.apply(this, arguments);
    };
  }();

  var getMfPositiveLineListBSFollowUps = /*#__PURE__*/function () {
    var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
      var errors, reqObj, cond, _yield$mfPositiveLine4, count, mfPositiveLineListBSFollowUpsData;

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
              cond = {};

              if (reqObj.id) {
                cond["id"] = reqObj.id;
              }

              if (reqObj.fieldUnitId) {
                cond["mfPositiveLineListId"] = reqObj.fieldUnitId;
              }

              cond["isActive"] = true;
              _context13.next = 11;
              return mfPositiveLineListBSFollowUps.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]],
                include: [{
                  model: mfPositiveLineListPatients,
                  required: false
                }]
              });

            case 11:
              _yield$mfPositiveLine4 = _context13.sent;
              count = _yield$mfPositiveLine4.count;
              mfPositiveLineListBSFollowUpsData = _yield$mfPositiveLine4.rows;

              if (!(count <= 0)) {
                _context13.next = 16;
                break;
              }

              return _context13.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 16:
              return _context13.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: mfPositiveLineListBSFollowUpsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 19:
              _context13.prev = 19;
              _context13.t0 = _context13["catch"](0);
              console.error(_context13.t0);

              if (!_context13.t0.statusCode) {
                _context13.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context13.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context13.t0
              }));

            case 24:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13, null, [[0, 19]]);
    }));

    return function getMfPositiveLineListBSFollowUps(_x24, _x25) {
      return _ref13.apply(this, arguments);
    };
  }();

  var deleteMfPositiveLineListBSFollowUps = /*#__PURE__*/function () {
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
              return mfPositiveLineListBSFollowUps.update({
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

    return function deleteMfPositiveLineListBSFollowUps(_x26, _x27) {
      return _ref14.apply(this, arguments);
    };
  }();

  return {
    createMfPositiveLineList: createMfPositiveLineList,
    createAllMfPositiveLineList: createAllMfPositiveLineList,
    getMFPositiveLineList: getMFPositiveLineList,
    deleteMFPositiveLineList: deleteMFPositiveLineList,
    createMfPositiveLineListSurvey: createMfPositiveLineListSurvey,
    getMfPositiveLineListSurvey: getMfPositiveLineListSurvey,
    deleteMfPositiveLineListSurvey: deleteMfPositiveLineListSurvey,
    createMfPositiveLineListPatients: createMfPositiveLineListPatients,
    getMfPositiveLineListPatients: getMfPositiveLineListPatients,
    deleteMfPositiveLineListPatients: deleteMfPositiveLineListPatients,
    createMfPositiveLineListBSFollowUps: createMfPositiveLineListBSFollowUps,
    getMfPositiveLineListBSFollowUps: getMfPositiveLineListBSFollowUps,
    deleteMfPositiveLineListBSFollowUps: deleteMfPositiveLineListBSFollowUps
  };
};

var _default = mfPositiveController();

exports["default"] = _default;
//# sourceMappingURL=mfPositiveLineList.controller.js.map
