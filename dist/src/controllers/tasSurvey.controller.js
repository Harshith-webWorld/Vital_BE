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

var tasSurvey = _sequelize["default"].tasSurvey,
    tasSurveyChildrens = _sequelize["default"].tasSurveyChildrens,
    udCategoryOptions = _sequelize["default"].udCategoryOptions,
    villages = _sequelize["default"].villages,
    districts = _sequelize["default"].districts,
    talukas = _sequelize["default"].talukas,
    wards = _sequelize["default"].wards,
    states = _sequelize["default"].states;
var Op = _sequelize["default"].Sequelize.Op;

var surveyController = function surveyController() {
  var createAllTasSurvey = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, tasSurveyData, whereCodn, lastID, currentId;
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
              tasSurveyData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (!reqObj.id) {
                _context.next = 14;
                break;
              }

              _context.next = 11;
              return tasSurvey.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 11:
              tasSurveyData = _context.sent;
              _context.next = 22;
              break;

            case 14:
              _context.next = 16;
              return tasSurvey.findOne({
                attributes: {
                  include: ["id"]
                },
                order: [['id', 'DESC']]
              });

            case 16:
              lastID = _context.sent;
              currentId = lastID && lastID.dataValues && lastID.dataValues.id ? +lastID.dataValues.id + 1 : 1;
              reqObj.srNo = "SR" + currentId;
              _context.next = 21;
              return tasSurvey.create(reqObj, {
                include: [{
                  model: tasSurveyChildrens
                }]
              });

            case 21:
              tasSurveyData = _context.sent;

            case 22:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: tasSurveyData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 25:
              _context.prev = 25;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

              if (!_context.t0.statusCode) {
                _context.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context.t0
              }));

            case 30:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 25]]);
    }));

    return function createAllTasSurvey(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var create = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var reqObj, errors, tasSurveyData, whereCodn, lastID, currentId;
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
              tasSurveyData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (!reqObj.id) {
                _context2.next = 14;
                break;
              }

              _context2.next = 11;
              return tasSurvey.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 11:
              tasSurveyData = _context2.sent;
              _context2.next = 22;
              break;

            case 14:
              _context2.next = 16;
              return tasSurvey.findOne({
                attributes: {
                  include: ["id"]
                },
                order: [['createdAt', 'DESC']]
              });

            case 16:
              lastID = _context2.sent;
              currentId = lastID && lastID.dataValues && lastID.dataValues.id ? +lastID.dataValues.id + 1 : 1;
              reqObj.srNo = "SR" + currentId;
              _context2.next = 21;
              return tasSurvey.create(reqObj);

            case 21:
              tasSurveyData = _context2.sent;

            case 22:
              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: tasSurveyData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 25:
              _context2.prev = 25;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);

              if (!_context2.t0.statusCode) {
                _context2.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context2.t0
              }));

            case 30:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 25]]);
    }));

    return function create(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var getSurvey = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var errors, reqObj, cond, cond2, cond3, cond4, _yield$tasSurvey$find, count, tasSurveyData;

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

              cond["isActive"] = true;
              _context3.next = 14;
              return tasSurvey.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]],
                include: [{
                  model: udCategoryOptions,
                  as: "TypeOfSchool2",
                  attributes: ["categoryCode", "categoryName", "categoryOptionEnum", "categoryOptionName"],
                  required: false
                }, {
                  model: districts,
                  attributes: ["id", "districtName"],
                  required: false
                }, {
                  model: states,
                  attributes: ["id", "stateName"],
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
                }]
              });

            case 14:
              _yield$tasSurvey$find = _context3.sent;
              count = _yield$tasSurvey$find.count;
              tasSurveyData = _yield$tasSurvey$find.rows;

              if (!(count <= 0)) {
                _context3.next = 19;
                break;
              }

              return _context3.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 19:
              return _context3.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: tasSurveyData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 22:
              _context3.prev = 22;
              _context3.t0 = _context3["catch"](0);
              console.error(_context3.t0);

              if (!_context3.t0.statusCode) {
                _context3.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context3.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context3.t0
              }));

            case 27:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 22]]);
    }));

    return function getSurvey(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  var deleteSurvey = /*#__PURE__*/function () {
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
              return tasSurvey.update({
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

    return function deleteSurvey(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();

  var createTasSurveyChildrens = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var reqObj, errors, tasSurveyChildrensData, whereCodn;
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
              tasSurveyChildrensData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (!reqObj.id) {
                _context5.next = 14;
                break;
              }

              _context5.next = 11;
              return tasSurveyChildrens.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 11:
              tasSurveyChildrensData = _context5.sent;
              _context5.next = 17;
              break;

            case 14:
              _context5.next = 16;
              return tasSurveyChildrens.create(reqObj);

            case 16:
              tasSurveyChildrensData = _context5.sent;

            case 17:
              return _context5.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: tasSurveyChildrensData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 20:
              _context5.prev = 20;
              _context5.t0 = _context5["catch"](0);
              console.log(_context5.t0);

              if (!_context5.t0.statusCode) {
                _context5.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context5.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context5.t0
              }));

            case 25:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 20]]);
    }));

    return function createTasSurveyChildrens(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();

  var getTasSurveyChildrens = /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var errors, reqObj, cond, cond2, _yield$tasSurveyChild, count, tasSurveyChildrensData;

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

              if (reqObj.tasSurveyId) {
                cond["tasSurveyId"] = reqObj.tasSurveyId;
              }

              if (reqObj.sex) {
                cond2["sex"] = reqObj.sex;
              }

              cond["isActive"] = true;
              _context6.next = 13;
              return tasSurveyChildrens.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]],
                include: [{
                  where: cond2,
                  model: udCategoryOptions,
                  as: "Sex",
                  attributes: ["categoryCode", "categoryName", "categoryOptionEnum", "categoryOptionName"],
                  required: false
                }]
              });

            case 13:
              _yield$tasSurveyChild = _context6.sent;
              count = _yield$tasSurveyChild.count;
              tasSurveyChildrensData = _yield$tasSurveyChild.rows;

              if (!(count <= 0)) {
                _context6.next = 18;
                break;
              }

              return _context6.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 18:
              return _context6.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: tasSurveyChildrensData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 21:
              _context6.prev = 21;
              _context6.t0 = _context6["catch"](0);
              console.error(_context6.t0);

              if (!_context6.t0.statusCode) {
                _context6.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context6.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context6.t0
              }));

            case 26:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 21]]);
    }));

    return function getTasSurveyChildrens(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }();

  var deleteTasSurveyChildrens = /*#__PURE__*/function () {
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
              return tasSurveyChildrens.update({
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

    return function deleteTasSurveyChildrens(_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }();

  return {
    createAllTasSurvey: createAllTasSurvey,
    create: create,
    getSurvey: getSurvey,
    deleteSurvey: deleteSurvey,
    createTasSurveyChildrens: createTasSurveyChildrens,
    getTasSurveyChildrens: getTasSurveyChildrens,
    deleteTasSurveyChildrens: deleteTasSurveyChildrens
  };
};

var _default = surveyController();

exports["default"] = _default;
//# sourceMappingURL=tasSurvey.controller.js.map
