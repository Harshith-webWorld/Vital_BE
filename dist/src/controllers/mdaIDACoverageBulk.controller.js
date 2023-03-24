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

var mdaIDACoverageRegularList = _sequelize["default"].mdaIDACoverageRegularList,
    mdaIDACoverageMopUpList = _sequelize["default"].mdaIDACoverageMopUpList,
    mdaIDACoverageOthersList = _sequelize["default"].mdaIDACoverageOthersList,
    mdaIDACoverages = _sequelize["default"].mdaIDACoverages;
var Op = _sequelize["default"].Sequelize.Op;

var bulkMdaIDACoverageController = function bulkMdaIDACoverageController() {
  var bulkCreateMdaIDACoverages = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, mdaIDACoveragesData, whereCodn, lastID, nextId;
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
              mdaIDACoveragesData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (!reqObj.id) {
                _context.next = 11;
                break;
              }

              _context.next = 19;
              break;

            case 11:
              _context.next = 13;
              return mdaIDACoverages.findOne({
                attributes: {
                  include: ["id"]
                },
                order: [['id', 'DESC']]
              });

            case 13:
              lastID = _context.sent;
              nextId = lastID && lastID.dataValues && lastID.dataValues.id ? +lastID.dataValues.id + 1 : 1;
              reqObj.forEach(function (element) {
                element.srNo = "SR" + nextId++;
              });
              _context.next = 18;
              return mdaIDACoverages.bulkCreate(reqObj, {
                include: [{
                  model: mdaIDACoverageRegularList,
                  include: [{
                    model: mdaIDACoverageOthersList
                  }]
                }, {
                  model: mdaIDACoverageMopUpList,
                  include: [{
                    model: mdaIDACoverageOthersList
                  }]
                } // {model:mdaIDACoverageOthersList}
                ]
              }, {
                returning: true
              });

            case 18:
              mdaIDACoveragesData = _context.sent;

            case 19:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: mdaIDACoveragesData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 22:
              _context.prev = 22;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

              if (!_context.t0.statusCode) {
                _context.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context.t0
              }));

            case 27:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 22]]);
    }));

    return function bulkCreateMdaIDACoverages(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var bulkCreateMdaIDACoverageRegularList = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var reqObj, errors, mdaIDACoverageRegularListData, whereCodn, obj, attributes;
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
              mdaIDACoverageRegularListData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;
              obj = {};

              if (!reqObj.id) {
                _context2.next = 12;
                break;
              }

              _context2.next = 16;
              break;

            case 12:
              attributes = {
                exclude: ["createdAt", "updatedAt"]
              };
              _context2.next = 15;
              return mdaIDACoverageRegularList.bulkCreate(reqObj.mdaIDACoverageRegularList, {
                include: [{
                  model: mdaIDACoverageOthersList,
                  as: "mdaIDACoverageOthersLists",
                  required: false
                }],
                attributes: attributes
              }, {
                returning: true
              });

            case 15:
              mdaIDACoverageRegularListData = _context2.sent;

            case 16:
              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: mdaIDACoverageRegularListData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 19:
              _context2.prev = 19;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);

              if (!_context2.t0.statusCode) {
                _context2.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context2.t0
              }));

            case 24:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 19]]);
    }));

    return function bulkCreateMdaIDACoverageRegularList(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var bulkCreateMdaIDACoverageMopUpList = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
      var reqObj, errors, mdaIDACoverageMopUpListData, whereCodn, attributes;
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
              mdaIDACoverageMopUpListData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (!reqObj.id) {
                _context3.next = 11;
                break;
              }

              _context3.next = 15;
              break;

            case 11:
              attributes = {
                exclude: ["createdAt", "updatedAt"]
              };
              _context3.next = 14;
              return mdaIDACoverageMopUpList.bulkCreate(reqObj.mdaIDACoverageMopUpList, {
                include: [{
                  model: mdaIDACoverageOthersList,
                  as: "mdaIDACoverageOthersLists",
                  required: false
                }],
                attributes: attributes
              }, {
                returning: true
              });

            case 14:
              mdaIDACoverageMopUpListData = _context3.sent;

            case 15:
              return _context3.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: mdaIDACoverageMopUpListData,
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

    return function bulkCreateMdaIDACoverageMopUpList(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  return {
    bulkCreateMdaIDACoverages: bulkCreateMdaIDACoverages,
    bulkCreateMdaIDACoverageRegularList: bulkCreateMdaIDACoverageRegularList,
    bulkCreateMdaIDACoverageMopUpList: bulkCreateMdaIDACoverageMopUpList
  };
};

var _default = bulkMdaIDACoverageController();

exports["default"] = _default;
//# sourceMappingURL=mdaIDACoverageBulk.controller.js.map
