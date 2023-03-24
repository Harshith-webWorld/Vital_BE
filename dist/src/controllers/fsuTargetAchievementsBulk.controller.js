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
    fsuTargetAchievementsSurveys = _sequelize["default"].fsuTargetAchievementsSurveys;
var Op = _sequelize["default"].Sequelize.Op;

var bulkFsuTargetAchivementsController = function bulkFsuTargetAchivementsController() {
  var bulkCreateFsuTargetAchivements = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, fsuTargetAchivementsData, whereCodn, lastID, nextId, attributes;
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
              _context.next = 24;
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
              nextId = lastID && lastID.dataValues && lastID.dataValues.id ? +lastID.dataValues.id + 1 : 1;
              reqObj.forEach(function (element) {
                element.srNo = "SR" + nextId++;
              });
              attributes = {
                exclude: ["createdAt", "updatedAt"]
              };
              _context.next = 23;
              return fsuTargetAchivements.bulkCreate(reqObj, {
                include: [{
                  model: fsuTargetAchievementsSurveys
                }],
                attributes: attributes
              }, {
                returning: true
              });

            case 23:
              fsuTargetAchivementsData = _context.sent;

            case 24:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: fsuTargetAchivementsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 27:
              _context.prev = 27;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

              if (!_context.t0.statusCode) {
                _context.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context.t0
              }));

            case 32:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 27]]);
    }));

    return function bulkCreateFsuTargetAchivements(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var bulkCreateFsuTargetAchievementsSurveys = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var reqObj, errors, fsuTargetAchievementsSurveysData, whereCodn;
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
              fsuTargetAchievementsSurveysData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (!reqObj.id) {
                _context2.next = 14;
                break;
              }

              _context2.next = 11;
              return fsuTargetAchievementsSurveys.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 11:
              fsuTargetAchievementsSurveysData = _context2.sent;
              _context2.next = 17;
              break;

            case 14:
              _context2.next = 16;
              return fsuTargetAchievementsSurveys.bulkCreate(reqObj.fsuTargetAchievementsSurveys);

            case 16:
              fsuTargetAchievementsSurveysData = _context2.sent;

            case 17:
              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: fsuTargetAchievementsSurveysData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 20:
              _context2.prev = 20;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);

              if (!_context2.t0.statusCode) {
                _context2.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context2.t0
              }));

            case 25:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 20]]);
    }));

    return function bulkCreateFsuTargetAchievementsSurveys(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  return {
    bulkCreateFsuTargetAchivements: bulkCreateFsuTargetAchivements,
    bulkCreateFsuTargetAchievementsSurveys: bulkCreateFsuTargetAchievementsSurveys
  };
};

var _default = bulkFsuTargetAchivementsController();

exports["default"] = _default;
//# sourceMappingURL=fsuTargetAchievementsBulk.controller.js.map
