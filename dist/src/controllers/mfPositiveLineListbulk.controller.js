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
    mfPositiveLineListBSFollowUps = _sequelize["default"].mfPositiveLineListBSFollowUps;
var Op = _sequelize["default"].Sequelize.Op;

var bulkmfPositiveController = function bulkmfPositiveController() {
  var bulkcreateMfPositiveLineList = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var reqObj, errors, mfPositiveLineData, mfPositiveLineListPatientsBulkDeleteData, mfPositiveLineListPatientsUpdatedData, step3PatientInfo, whereCodn, obj, patientID, nextId;
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
              mfPositiveLineData = [];
              step3PatientInfo = [];
              whereCodn = {};
              whereCodn["isActive"] = true;
              obj = {};

              if (!reqObj.id) {
                _context2.next = 16;
                break;
              }

              _context2.next = 13;
              return mfPositiveLineList.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 13:
              mfPositiveLineData = _context2.sent;
              _context2.next = 29;
              break;

            case 16:
              _context2.next = 18;
              return mfPositiveLineList.findOne({
                attributes: {
                  include: ["id"]
                },
                order: [["id", "DESC"]]
              });

            case 18:
              patientID = _context2.sent;
              nextId = patientID && patientID.dataValues && patientID.dataValues.id ? +patientID.dataValues.id + 1 : 1;
              reqObj && reqObj.mfPositiveLineList.forEach(function (element) {
                element.srNo = "SR" + nextId++;
              });
              reqObj && reqObj.mfPositiveLineList.forEach(function (element) {
                element.mfPositiveLineListPatients.forEach(function (patientObj) {
                  if (!(patientObj.id === 0)) {
                    step3PatientInfo.push(patientObj.id);
                  }
                });
              });
              _context2.next = 24;
              return mfPositiveLineListPatients.destroy({
                where: {
                  id: {
                    "$in": step3PatientInfo
                  }
                }
              });

            case 24:
              mfPositiveLineListPatientsBulkDeleteData = _context2.sent;
              _context2.next = 27;
              return mfPositiveLineList.bulkCreate(reqObj.mfPositiveLineList, {
                include: [{
                  model: mfPositiveLineListSurvey,
                  as: "mfPositiveLineListSurveys"
                }, {
                  model: mfPositiveLineListPatients,
                  as: "mfPositiveLineListPatients"
                }, {
                  model: mfPositiveLineListBSFollowUps,
                  as: "mfPositiveLineListBSFollowUps"
                }]
              });

            case 27:
              mfPositiveLineData = _context2.sent;
              mfPositiveLineData.forEach(function (element) {
                element.mfPositiveLineListPatients.forEach( /*#__PURE__*/function () {
                  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(object) {
                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (!(object["patientId"] === "" || object["patientId"] === null)) {
                              _context.next = 5;
                              break;
                            }

                            object.patientId = "MF" + "0000" + object.id;
                            _context.next = 4;
                            return mfPositiveLineListPatients.update({
                              patientId: object.patientId
                            }, {
                              where: {
                                id: object["id"]
                              }
                            });

                          case 4:
                            mfPositiveLineListPatientsUpdatedData = _context.sent;

                          case 5:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x3) {
                    return _ref2.apply(this, arguments);
                  };
                }());
              });

            case 29:
              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: mfPositiveLineData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 32:
              _context2.prev = 32;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);

              if (!_context2.t0.statusCode) {
                _context2.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context2.t0
              }));

            case 37:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 32]]);
    }));

    return function bulkcreateMfPositiveLineList(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var bulkcreateMfPositiveLineListSurvey = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var reqObj, errors, mfPositiveLineListSurveyData, whereCodn, attributes;
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
              mfPositiveLineListSurveyData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (!reqObj.id) {
                _context3.next = 12;
                break;
              }

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
              _context3.next = 16;
              break;

            case 12:
              attributes = {
                exclude: ["createdAt", "updatedAt"]
              };
              _context3.next = 15;
              return mfPositiveLineListSurvey.bulkCreate(reqObj.mfPositiveLineListSurvey, {
                returning: true
              }, {
                attributes: attributes
              });

            case 15:
              mfPositiveLineListSurveyData = _context3.sent;

            case 16:
              return _context3.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: mfPositiveLineListSurveyData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 19:
              _context3.prev = 19;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);

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

    return function bulkcreateMfPositiveLineListSurvey(_x4, _x5) {
      return _ref3.apply(this, arguments);
    };
  }();

  var bulkcreateMfPositiveLineListPatients = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var reqObj, errors, mfPositiveLineListPatientsData, whereCodn, obj, patientID, nextId;
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
              mfPositiveLineListPatientsData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;
              obj = {};

              if (!reqObj.id) {
                _context4.next = 15;
                break;
              }

              _context4.next = 12;
              return mfPositiveLineListPatients.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 12:
              mfPositiveLineListPatientsData = _context4.sent;
              _context4.next = 23;
              break;

            case 15:
              _context4.next = 17;
              return mfPositiveLineListPatients.findOne({
                attributes: {
                  include: ["id"]
                },
                order: [["id", "DESC"]]
              });

            case 17:
              patientID = _context4.sent;
              nextId = patientID && patientID.dataValues && patientID.dataValues.id ? +patientID.dataValues.id + 1 : 1;
              reqObj.patientId = "MF" + "0000" + nextId;
              _context4.next = 22;
              return mfPositiveLineListPatients.bulkCreate(reqObj.mfPositiveLineListPatients, {
                returning: true
              });

            case 22:
              mfPositiveLineListPatientsData = _context4.sent;

            case 23:
              return _context4.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: mfPositiveLineListPatientsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 26:
              _context4.prev = 26;
              _context4.t0 = _context4["catch"](0);
              console.log(_context4.t0);

              if (!_context4.t0.statusCode) {
                _context4.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context4.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context4.t0
              }));

            case 31:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 26]]);
    }));

    return function bulkcreateMfPositiveLineListPatients(_x6, _x7) {
      return _ref4.apply(this, arguments);
    };
  }();

  var bulkcreateMfPositiveLineListBSFollowUps = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var reqObj, errors, mfPositiveLineListBSFollowUpsData, whereCodn, obj;
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
              mfPositiveLineListBSFollowUpsData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;
              obj = {};

              if (!reqObj.id) {
                _context5.next = 15;
                break;
              }

              _context5.next = 12;
              return mfPositiveLineListBSFollowUps.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 12:
              mfPositiveLineListBSFollowUpsData = _context5.sent;
              _context5.next = 21;
              break;

            case 15:
              _context5.next = 17;
              return mfPositiveLineListBSFollowUps.findOne({
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                }
              });

            case 17:
              mfPositiveLineListBSFollowUpsData = _context5.sent;
              _context5.next = 20;
              return mfPositiveLineListBSFollowUps.bulkCreate(reqObj.mfPositiveLineListBSFollowUps, {
                returning: true
              });

            case 20:
              mfPositiveLineListBSFollowUpsData = _context5.sent;

            case 21:
              return _context5.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: mfPositiveLineListBSFollowUpsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 24:
              _context5.prev = 24;
              _context5.t0 = _context5["catch"](0);
              console.log(_context5.t0);

              if (!_context5.t0.statusCode) {
                _context5.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context5.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context5.t0
              }));

            case 29:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 24]]);
    }));

    return function bulkcreateMfPositiveLineListBSFollowUps(_x8, _x9) {
      return _ref5.apply(this, arguments);
    };
  }();

  return {
    bulkcreateMfPositiveLineList: bulkcreateMfPositiveLineList,
    bulkcreateMfPositiveLineListSurvey: bulkcreateMfPositiveLineListSurvey,
    bulkcreateMfPositiveLineListPatients: bulkcreateMfPositiveLineListPatients,
    bulkcreateMfPositiveLineListBSFollowUps: bulkcreateMfPositiveLineListBSFollowUps
  };
};

var _default = bulkmfPositiveController();

exports["default"] = _default;
//# sourceMappingURL=mfPositiveLineListbulk.controller.js.map
