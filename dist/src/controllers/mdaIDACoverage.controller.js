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
    mdaIDACoverages = _sequelize["default"].mdaIDACoverages,
    districts = _sequelize["default"].districts,
    talukas = _sequelize["default"].talukas,
    villages = _sequelize["default"].villages,
    facilities = _sequelize["default"].facilities,
    zones = _sequelize["default"].zones,
    subCenters = _sequelize["default"].subCenters,
    corporations = _sequelize["default"].corporations,
    wards = _sequelize["default"].wards;
var Op = _sequelize["default"].Sequelize.Op;

var mdaIDACoverageController = function mdaIDACoverageController() {
  var createAllMdaIDACoverages = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, mdaIDACoveragesData, whereCodn, lastID, currentId;
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
                _context.next = 14;
                break;
              }

              _context.next = 11;
              return mdaIDACoverages.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 11:
              mdaIDACoveragesData = _context.sent;
              _context.next = 22;
              break;

            case 14:
              _context.next = 16;
              return mdaIDACoverages.findOne({
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
              return mdaIDACoverages.create(reqObj, {
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
                }]
              });

            case 21:
              mdaIDACoveragesData = _context.sent;

            case 22:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: mdaIDACoveragesData,
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

    return function createAllMdaIDACoverages(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var createMdaIDACoverageRegularList = /*#__PURE__*/function () {
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
                _context2.next = 16;
                break;
              }

              _context2.next = 12;
              return mdaIDACoverageRegularList.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 12:
              mdaIDACoverageRegularListData = _context2.sent;
              reqObj.mdaIDACoverageOthersLists.forEach(function (element) {
                if (!element["id"]) {
                  element.mdaIDACoverageRegularListId = reqObj.id;
                  mdaIDACoverageRegularListData = mdaIDACoverageOthersList.create(element);
                } else if (element["id"]) {
                  mdaIDACoverageRegularListData = mdaIDACoverageOthersList.update(element, {
                    where: {
                      id: element.id
                    }
                  });
                }
              });
              _context2.next = 20;
              break;

            case 16:
              attributes = {
                exclude: ["createdAt", "updatedAt"]
              };
              _context2.next = 19;
              return mdaIDACoverageRegularList.create(reqObj, {
                include: [{
                  model: mdaIDACoverageOthersList,
                  as: "mdaIDACoverageOthersLists"
                }],
                attributes: attributes
              });

            case 19:
              mdaIDACoverageRegularListData = _context2.sent;

            case 20:
              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: mdaIDACoverageRegularListData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 23:
              _context2.prev = 23;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);

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

    return function createMdaIDACoverageRegularList(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var createMdaIDACoverageMopUpList = /*#__PURE__*/function () {
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
                _context3.next = 15;
                break;
              }

              _context3.next = 11;
              return mdaIDACoverageMopUpList.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 11:
              mdaIDACoverageMopUpListData = _context3.sent;
              reqObj.mdaIDACoverageOthersLists.forEach(function (element) {
                if (!element["id"]) {
                  element.mdaIDACoverageMopUpListId = reqObj.id;
                  mdaIDACoverageMopUpListData = mdaIDACoverageOthersList.create(element);
                } else if (element["id"]) {
                  mdaIDACoverageMopUpListData = mdaIDACoverageOthersList.update(element, {
                    where: {
                      id: element.id
                    }
                  });
                }
              });
              _context3.next = 19;
              break;

            case 15:
              attributes = {
                exclude: ["createdAt", "updatedAt"]
              };
              _context3.next = 18;
              return mdaIDACoverageMopUpList.create(reqObj, {
                include: [{
                  model: mdaIDACoverageOthersList,
                  as: "mdaIDACoverageOthersLists"
                }],
                attributes: attributes
              });

            case 18:
              mdaIDACoverageMopUpListData = _context3.sent;

            case 19:
              return _context3.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: mdaIDACoverageMopUpListData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 22:
              _context3.prev = 22;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);

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

    return function createMdaIDACoverageMopUpList(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  var createMdaIDACoverages = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var reqObj, errors, mdaIDACoveragesData, whereCodn, lastID, currentId;
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
              mdaIDACoveragesData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (!reqObj.id) {
                _context4.next = 14;
                break;
              }

              _context4.next = 11;
              return mdaIDACoverages.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 11:
              mdaIDACoveragesData = _context4.sent;
              _context4.next = 22;
              break;

            case 14:
              _context4.next = 16;
              return mdaIDACoverages.findOne({
                attributes: {
                  include: ["id"]
                },
                order: [['id', 'DESC']]
              });

            case 16:
              lastID = _context4.sent;
              currentId = lastID && lastID.dataValues && lastID.dataValues.id ? +lastID.dataValues.id + 1 : 1;
              reqObj.srNo = "SR" + currentId;
              _context4.next = 21;
              return mdaIDACoverages.create(reqObj);

            case 21:
              mdaIDACoveragesData = _context4.sent;

            case 22:
              return _context4.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: mdaIDACoveragesData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 25:
              _context4.prev = 25;
              _context4.t0 = _context4["catch"](0);
              console.log(_context4.t0);

              if (!_context4.t0.statusCode) {
                _context4.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context4.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context4.t0
              }));

            case 30:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 25]]);
    }));

    return function createMdaIDACoverages(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();

  var getAllMdaIDACoverageMopUpLists = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var errors, reqObj, cond, _yield$mdaIDACoverage, count, mdaIDACoverageMopUpListData;

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

              if (reqObj.id) {
                cond["mdaIDACoverageId"] = reqObj.id;
              }

              cond["isActive"] = true;
              _context5.next = 10;
              return mdaIDACoverageMopUpList.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]],
                include: [{
                  model: mdaIDACoverageOthersList,
                  as: "mdaIDACoverageOthersLists",
                  required: false
                }, {
                  model: mdaIDACoverages,
                  required: false
                }]
              });

            case 10:
              _yield$mdaIDACoverage = _context5.sent;
              count = _yield$mdaIDACoverage.count;
              mdaIDACoverageMopUpListData = _yield$mdaIDACoverage.rows;

              if (!(count <= 0)) {
                _context5.next = 15;
                break;
              }

              return _context5.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 15:
              return _context5.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: mdaIDACoverageMopUpListData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 18:
              _context5.prev = 18;
              _context5.t0 = _context5["catch"](0);
              console.error(_context5.t0);

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

    return function getAllMdaIDACoverageMopUpLists(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();

  var getAllMdaIDACoverageRegularLists = /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var errors, reqObj, cond, _yield$mdaIDACoverage2, count, mdaIDACoverageRegularListData;

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

              if (reqObj.id) {
                cond["mdaIDACoverageId"] = reqObj.id;
              }

              cond["isActive"] = true;
              _context6.next = 10;
              return mdaIDACoverageRegularList.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]],
                include: [{
                  model: mdaIDACoverageOthersList,
                  as: "mdaIDACoverageOthersLists",
                  required: false
                }, {
                  model: mdaIDACoverages,
                  required: false
                }]
              });

            case 10:
              _yield$mdaIDACoverage2 = _context6.sent;
              count = _yield$mdaIDACoverage2.count;
              mdaIDACoverageRegularListData = _yield$mdaIDACoverage2.rows;

              if (!(count <= 0)) {
                _context6.next = 15;
                break;
              }

              return _context6.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 15:
              return _context6.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: mdaIDACoverageRegularListData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 18:
              _context6.prev = 18;
              _context6.t0 = _context6["catch"](0);
              console.error(_context6.t0);

              if (!_context6.t0.statusCode) {
                _context6.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context6.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context6.t0
              }));

            case 23:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 18]]);
    }));

    return function getAllMdaIDACoverageRegularLists(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }();

  var getMdaIDACoverageRegularLists = /*#__PURE__*/function () {
    var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
      var errors, reqObj, cond, _yield$mdaIDACoverage3, count, mdaIDACoverageRegularListData;

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

              if (reqObj.id) {
                cond["id"] = reqObj.id;
              }

              cond["isActive"] = true;
              _context7.next = 10;
              return mdaIDACoverageRegularList.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]],
                include: [{
                  model: mdaIDACoverageOthersList,
                  as: "mdaIDACoverageOthersLists",
                  required: false
                }, {
                  model: mdaIDACoverages,
                  required: false
                }]
              });

            case 10:
              _yield$mdaIDACoverage3 = _context7.sent;
              count = _yield$mdaIDACoverage3.count;
              mdaIDACoverageRegularListData = _yield$mdaIDACoverage3.rows;

              if (!(count <= 0)) {
                _context7.next = 15;
                break;
              }

              return _context7.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 15:
              return _context7.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: mdaIDACoverageRegularListData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 18:
              _context7.prev = 18;
              _context7.t0 = _context7["catch"](0);
              console.error(_context7.t0);

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

    return function getMdaIDACoverageRegularLists(_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }();

  var getMdaIDACoverageMopUpLists = /*#__PURE__*/function () {
    var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
      var errors, reqObj, cond, _yield$mdaIDACoverage4, count, mdaIDACoverageRegularListData;

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

              if (reqObj.id) {
                cond["id"] = reqObj.id;
              }

              cond["isActive"] = true;
              _context8.next = 10;
              return mdaIDACoverageMopUpList.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]],
                include: [{
                  model: mdaIDACoverageOthersList,
                  as: "mdaIDACoverageOthersLists",
                  required: false
                }, {
                  model: mdaIDACoverages,
                  required: false
                }]
              });

            case 10:
              _yield$mdaIDACoverage4 = _context8.sent;
              count = _yield$mdaIDACoverage4.count;
              mdaIDACoverageRegularListData = _yield$mdaIDACoverage4.rows;

              if (!(count <= 0)) {
                _context8.next = 15;
                break;
              }

              return _context8.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 15:
              return _context8.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: mdaIDACoverageRegularListData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 18:
              _context8.prev = 18;
              _context8.t0 = _context8["catch"](0);
              console.error(_context8.t0);

              if (!_context8.t0.statusCode) {
                _context8.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context8.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context8.t0
              }));

            case 23:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 18]]);
    }));

    return function getMdaIDACoverageMopUpLists(_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }();

  var getMdaIDACoverages = /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
      var errors, reqObj, cond, _yield$mdaIDACoverage5, count, mdaIDACoveragesData;

      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context9.next = 4;
                break;
              }

              throw errors.array();

            case 4:
              reqObj = _utils["default"].getReqValues(req);
              cond = {};

              if (reqObj.id) {
                cond["id"] = reqObj.id;
              }

              if (reqObj.districtId) {
                cond["districtId"] = reqObj.districtId;
              }

              cond["isActive"] = true;
              _context9.next = 11;
              return mdaIDACoverages.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]],
                include: [{
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
                  model: wards,
                  attributes: ["id", "wardName"],
                  required: false
                }]
              });

            case 11:
              _yield$mdaIDACoverage5 = _context9.sent;
              count = _yield$mdaIDACoverage5.count;
              mdaIDACoveragesData = _yield$mdaIDACoverage5.rows;

              if (!(count <= 0)) {
                _context9.next = 16;
                break;
              }

              return _context9.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 16:
              return _context9.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: mdaIDACoveragesData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 19:
              _context9.prev = 19;
              _context9.t0 = _context9["catch"](0);
              console.error(_context9.t0);

              if (!_context9.t0.statusCode) {
                _context9.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context9.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context9.t0
              }));

            case 24:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 19]]);
    }));

    return function getMdaIDACoverages(_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }();

  var deletemdaIDACoverageRegularList = /*#__PURE__*/function () {
    var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
      var errors, reqObj;
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

              if (!reqObj.id) {
                _context10.next = 11;
                break;
              }

              _context10.next = 8;
              return mdaIDACoverageRegularList.update({
                isActive: false
              }, {
                where: {
                  id: reqObj.id
                }
              });

            case 8:
              return _context10.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].DELETE_SUCCESS
              }));

            case 11:
              return _context10.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].SOMETHING_WRONG
              }));

            case 12:
              _context10.next = 19;
              break;

            case 14:
              _context10.prev = 14;
              _context10.t0 = _context10["catch"](0);
              console.error(_context10.t0);

              if (!_context10.t0.statusCode) {
                _context10.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context10.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context10.t0
              }));

            case 19:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[0, 14]]);
    }));

    return function deletemdaIDACoverageRegularList(_x19, _x20) {
      return _ref10.apply(this, arguments);
    };
  }();

  var deleteMdaIDACoverageMopUpList = /*#__PURE__*/function () {
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
              return mdaIDACoverageMopUpList.update({
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

    return function deleteMdaIDACoverageMopUpList(_x21, _x22) {
      return _ref11.apply(this, arguments);
    };
  }();

  var deleteMdaIDACoverages = /*#__PURE__*/function () {
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
              return mdaIDACoverages.update({
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

    return function deleteMdaIDACoverages(_x23, _x24) {
      return _ref12.apply(this, arguments);
    };
  }();

  return {
    createAllMdaIDACoverages: createAllMdaIDACoverages,
    createMdaIDACoverageMopUpList: createMdaIDACoverageMopUpList,
    createMdaIDACoverageRegularList: createMdaIDACoverageRegularList,
    createMdaIDACoverages: createMdaIDACoverages,
    getMdaIDACoverageRegularLists: getMdaIDACoverageRegularLists,
    getMdaIDACoverageMopUpLists: getMdaIDACoverageMopUpLists,
    getMdaIDACoverages: getMdaIDACoverages,
    deletemdaIDACoverageRegularList: deletemdaIDACoverageRegularList,
    deleteMdaIDACoverageMopUpList: deleteMdaIDACoverageMopUpList,
    deleteMdaIDACoverages: deleteMdaIDACoverages,
    getAllMdaIDACoverageMopUpLists: getAllMdaIDACoverageMopUpLists,
    getAllMdaIDACoverageRegularLists: getAllMdaIDACoverageRegularLists
  };
};

var _default = mdaIDACoverageController();

exports["default"] = _default;
//# sourceMappingURL=mdaIDACoverage.controller.js.map
