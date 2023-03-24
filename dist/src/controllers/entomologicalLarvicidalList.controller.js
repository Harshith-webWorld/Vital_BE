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

var entomologicalLarvicidalList = _sequelize["default"].entomologicalLarvicidalList,
    entomologicalDataCounts = _sequelize["default"].entomologicalDataCounts,
    districts = _sequelize["default"].districts,
    talukas = _sequelize["default"].talukas,
    villages = _sequelize["default"].villages,
    subCenters = _sequelize["default"].subCenters,
    udCategoryOptions = _sequelize["default"].udCategoryOptions,
    verticalControlUnits = _sequelize["default"].verticalControlUnits,
    facilities = _sequelize["default"].facilities;
var Op = _sequelize["default"].Sequelize.Op;

var entomologicalLarvicidalListController = function entomologicalLarvicidalListController() {
  var create = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, entomologicalLarvicidalListData, whereCodn, obj, lastID, currentId, attributes;
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
              entomologicalLarvicidalListData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;
              obj = {};

              if (!reqObj.id) {
                _context.next = 16;
                break;
              }

              _context.next = 12;
              return entomologicalLarvicidalList.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 12:
              entomologicalLarvicidalListData = _context.sent;
              reqObj.entomologicalDataCounts.forEach(function (element) {
                if (element["id"]) {
                  entomologicalLarvicidalListData = entomologicalDataCounts.update(element, {
                    where: {
                      id: element["id"]
                    }
                  });
                } else if (!element["id"]) {
                  element.entomologicalLarvicidalListId = reqObj.id;
                  entomologicalLarvicidalListData = entomologicalDataCounts.create(element);
                }
              });
              _context.next = 25;
              break;

            case 16:
              _context.next = 18;
              return entomologicalDataCounts.findOne({
                attributes: {
                  include: ["id"]
                },
                order: [['id', 'DESC']]
              });

            case 18:
              lastID = _context.sent;
              currentId = lastID && lastID.dataValues && lastID.dataValues.id ? +lastID.dataValues.id + 1 : 1;
              reqObj.srNo = "SR" + currentId;
              attributes = {
                exclude: ["createdAt", "updatedAt"]
              };
              _context.next = 24;
              return entomologicalLarvicidalList.create(reqObj, {
                include: [{
                  model: entomologicalDataCounts
                }],
                attributes: attributes
              });

            case 24:
              entomologicalLarvicidalListData = _context.sent;

            case 25:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: entomologicalLarvicidalListData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 28:
              _context.prev = 28;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

              if (!_context.t0.statusCode) {
                _context.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context.t0
              }));

            case 33:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 28]]);
    }));

    return function create(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var getEntomologicalLarvicidalList = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var errors, reqObj, cond, cond2, cond3, _yield$entomologicalL, count, entomologicalLarvicidalListData;

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

              cond["isActive"] = true;
              _context2.next = 15;
              return entomologicalLarvicidalList.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]],
                include: [{
                  model: entomologicalDataCounts,
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
                  model: subCenters,
                  attributes: ["id", "subCenterName"],
                  required: false
                }, {
                  model: facilities,
                  attributes: ["id", "facilityName"],
                  required: false
                }, {
                  where: cond2,
                  model: udCategoryOptions,
                  as: "TypeOfUnit",
                  required: false
                }, {
                  where: cond3,
                  model: verticalControlUnits,
                  required: false
                }]
              });

            case 15:
              _yield$entomologicalL = _context2.sent;
              count = _yield$entomologicalL.count;
              entomologicalLarvicidalListData = _yield$entomologicalL.rows;

              if (!(count <= 0)) {
                _context2.next = 20;
                break;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 20:
              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: entomologicalLarvicidalListData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 23:
              _context2.prev = 23;
              _context2.t0 = _context2["catch"](0);
              console.error(_context2.t0);

              if (!_context2.t0.statusCode) {
                _context2.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context2.t0
              }));

            case 28:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 23]]);
    }));

    return function getEntomologicalLarvicidalList(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var deletEntomologicalLarvicidalList = /*#__PURE__*/function () {
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
              return entomologicalLarvicidalList.update({
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

    return function deletEntomologicalLarvicidalList(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  var deletEntomologicalDataCounts = /*#__PURE__*/function () {
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
              return entomologicalDataCounts.destroy({
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

    return function deletEntomologicalDataCounts(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();

  return {
    create: create,
    getEntomologicalLarvicidalList: getEntomologicalLarvicidalList,
    deletEntomologicalLarvicidalList: deletEntomologicalLarvicidalList,
    deletEntomologicalDataCounts: deletEntomologicalDataCounts
  };
};

var _default = entomologicalLarvicidalListController();

exports["default"] = _default;
//# sourceMappingURL=entomologicalLarvicidalList.controller.js.map
