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

var fsuTargetAchivements = _sequelize["default"].fsuTargetAchivements,
    fsuTargetAchievementsSurveys = _sequelize["default"].fsuTargetAchievementsSurveys,
    districts = _sequelize["default"].districts,
    facilities = _sequelize["default"].facilities,
    villages = _sequelize["default"].villages,
    verticalControlFieldUnits = _sequelize["default"].verticalControlFieldUnits,
    verticalControlUnits = _sequelize["default"].verticalControlUnits;
var Op = _sequelize["default"].Sequelize.Op;

var fsuTargetAchivementsController = function fsuTargetAchivementsController() {
  var createFsuTargetAchivements = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, fsuTargetAchivementsData, whereCodn, lastID, currentId;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              console.log(req.body, "req");
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context.next = 6;
                break;
              }

              throw errors.array();

            case 6:
              fsuTargetAchivementsData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (!reqObj.id) {
                _context.next = 15;
                break;
              }

              _context.next = 12;
              return fsuTargetAchivements.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 12:
              fsuTargetAchivementsData = _context.sent;
              _context.next = 23;
              break;

            case 15:
              _context.next = 17;
              return fsuTargetAchivements.findOne({
                attributes: {
                  include: ["id"]
                },
                order: [['id', 'DESC']]
              });

            case 17:
              lastID = _context.sent;
              currentId = lastID && lastID.dataValues && lastID.dataValues.id ? +lastID.dataValues.id + 1 : 1;
              reqObj.srNo = "SR" + currentId;
              _context.next = 22;
              return fsuTargetAchivements.create(reqObj, {
                include: [{
                  model: fsuTargetAchievementsSurveys
                }]
              });

            case 22:
              fsuTargetAchivementsData = _context.sent;

            case 23:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: fsuTargetAchivementsData,
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

    return function createFsuTargetAchivements(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var getFsuTargetAchivements = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var errors, reqObj, cond, cond2, _yield$fsuTargetAchiv, count, fsuTargetAchivementsData;

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

              if (reqObj.id) {
                cond["id"] = reqObj.id;
              }

              if (reqObj.districtId) {
                cond["districtId"] = reqObj.districtId;
              }

              if (reqObj.nameOfFilariaSurveyUnit) {
                cond2["nameOfControlUnit"] = reqObj.nameOfFilariaSurveyUnit;
              }

              cond["isActive"] = true;
              _context2.next = 13;
              return fsuTargetAchivements.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]],
                include: [{
                  model: districts,
                  attributes: ["id", "districtName"],
                  required: false
                }, {
                  model: facilities,
                  attributes: ["id", "facilityName"],
                  required: false
                }, // {
                // 	where: cond2,
                // 	model: verticalControlFieldUnits,
                // 	required: false
                // },
                {
                  where: cond2,
                  model: verticalControlUnits,
                  required: false
                }]
              });

            case 13:
              _yield$fsuTargetAchiv = _context2.sent;
              count = _yield$fsuTargetAchiv.count;
              fsuTargetAchivementsData = _yield$fsuTargetAchiv.rows;

              if (!(count <= 0)) {
                _context2.next = 18;
                break;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 18:
              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: fsuTargetAchivementsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 21:
              _context2.prev = 21;
              _context2.t0 = _context2["catch"](0);
              console.error(_context2.t0);

              if (!_context2.t0.statusCode) {
                _context2.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context2.t0
              }));

            case 26:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 21]]);
    }));

    return function getFsuTargetAchivements(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var deleteFsuTargetAchivements = /*#__PURE__*/function () {
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
              return fsuTargetAchivements.update({
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

    return function deleteFsuTargetAchivements(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  var createFsuTargetAchievementsSurveys = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var reqObj, errors, fsuTargetAchievementsSurveysData, whereCodn;
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
              fsuTargetAchievementsSurveysData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (!reqObj.id) {
                _context4.next = 14;
                break;
              }

              _context4.next = 11;
              return fsuTargetAchievementsSurveys.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 11:
              fsuTargetAchievementsSurveysData = _context4.sent;
              _context4.next = 17;
              break;

            case 14:
              _context4.next = 16;
              return fsuTargetAchievementsSurveys.create(reqObj);

            case 16:
              fsuTargetAchievementsSurveysData = _context4.sent;

            case 17:
              return _context4.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: fsuTargetAchievementsSurveysData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 20:
              _context4.prev = 20;
              _context4.t0 = _context4["catch"](0);
              console.log(_context4.t0);

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

    return function createFsuTargetAchievementsSurveys(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();

  var getFsuTargetAchievementsSurveys = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var errors, reqObj, cond, _yield$fsuTargetAchie, count, fsuTargetAchievementsSurveysData;

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

              if (reqObj.fsuTargetAchievementId) {
                cond["fsuTargetAchievementId"] = reqObj.fsuTargetAchievementId;
              }

              if (reqObj.id) {
                cond["id"] = reqObj.id;
              }

              cond["isActive"] = true;
              _context5.next = 11;
              return fsuTargetAchievementsSurveys.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]],
                include: [{
                  model: fsuTargetAchivements
                }]
              });

            case 11:
              _yield$fsuTargetAchie = _context5.sent;
              count = _yield$fsuTargetAchie.count;
              fsuTargetAchievementsSurveysData = _yield$fsuTargetAchie.rows;

              if (!(count <= 0)) {
                _context5.next = 16;
                break;
              }

              return _context5.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 16:
              return _context5.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: fsuTargetAchievementsSurveysData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 19:
              _context5.prev = 19;
              _context5.t0 = _context5["catch"](0);
              console.error(_context5.t0);

              if (!_context5.t0.statusCode) {
                _context5.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context5.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context5.t0
              }));

            case 24:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 19]]);
    }));

    return function getFsuTargetAchievementsSurveys(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();

  var deletefsuTargetAchievementsSurveys = /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var errors, reqObj;
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

              if (!reqObj.id) {
                _context6.next = 11;
                break;
              }

              _context6.next = 8;
              return fsuTargetAchievementsSurveys.update({
                isActive: false
              }, {
                where: {
                  id: reqObj.id
                }
              });

            case 8:
              return _context6.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].DELETE_SUCCESS
              }));

            case 11:
              return _context6.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].SOMETHING_WRONG
              }));

            case 12:
              _context6.next = 19;
              break;

            case 14:
              _context6.prev = 14;
              _context6.t0 = _context6["catch"](0);
              console.error(_context6.t0);

              if (!_context6.t0.statusCode) {
                _context6.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context6.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context6.t0
              }));

            case 19:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 14]]);
    }));

    return function deletefsuTargetAchievementsSurveys(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }();

  return {
    createFsuTargetAchivements: createFsuTargetAchivements,
    getFsuTargetAchivements: getFsuTargetAchivements,
    deleteFsuTargetAchivements: deleteFsuTargetAchivements,
    createFsuTargetAchievementsSurveys: createFsuTargetAchievementsSurveys,
    getFsuTargetAchievementsSurveys: getFsuTargetAchievementsSurveys,
    deletefsuTargetAchievementsSurveys: deletefsuTargetAchievementsSurveys
  };
};

var _default = fsuTargetAchivementsController();

exports["default"] = _default;
//# sourceMappingURL=fsuTargetAchievements.controller.js.map
