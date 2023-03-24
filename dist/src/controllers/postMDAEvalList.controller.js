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

var postMDAEvalList = _sequelize["default"].postMDAEvalList,
    postMDAEvalListPersons = _sequelize["default"].postMDAEvalListPersons,
    postMDAEvalListFMembers = _sequelize["default"].postMDAEvalListFMembers,
    districts = _sequelize["default"].districts,
    talukas = _sequelize["default"].talukas,
    wards = _sequelize["default"].wards,
    facilities = _sequelize["default"].facilities,
    villages = _sequelize["default"].villages,
    subCenters = _sequelize["default"].subCenters,
    corporations = _sequelize["default"].corporations,
    states = _sequelize["default"].states;
var Op = _sequelize["default"].Sequelize.Op;

var evalListController = function evalListController() {
  var create = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, postMDAEvalListData, whereCodn, obj, evalID, currentId, personID, fmemberID;
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
              postMDAEvalListData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;
              obj = {};

              if (!reqObj.id) {
                _context.next = 17;
                break;
              }

              _context.next = 12;
              return postMDAEvalList.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 12:
              postMDAEvalListData = _context.sent;
              reqObj.postMDAEvalListPersons.forEach(function (element) {
                if (element["id"]) {
                  postMDAEvalListData = postMDAEvalListPersons.update(element, {
                    where: {
                      id: element["id"]
                    }
                  });
                } else if (!element["id"]) {
                  element.postMDAEvalListId = reqObj.id;
                  postMDAEvalListData = postMDAEvalListPersons.create(element);
                }
              });
              reqObj.postMDAEvalListFMembers.forEach(function (element) {
                if (element["id"]) {
                  postMDAEvalListData = postMDAEvalListFMembers.update(element, {
                    where: {
                      id: element["id"]
                    }
                  });
                } else if (!element["id"]) {
                  element.postMDAEvalListId = reqObj.id;
                  postMDAEvalListData = postMDAEvalListFMembers.create(element);
                }
              });
              _context.next = 34;
              break;

            case 17:
              _context.next = 19;
              return postMDAEvalList.findOne({
                attributes: {
                  include: ["id"]
                },
                order: [["id", "DESC"]]
              });

            case 19:
              evalID = _context.sent;
              currentId = evalID && evalID.dataValues && evalID.dataValues.id ? +evalID.dataValues.id + 1 : 1;
              reqObj.srNo = "SR" + currentId;
              _context.next = 24;
              return postMDAEvalListPersons.findOne({
                attributes: ["id"],
                order: [["id", "DESC"]]
              });

            case 24:
              personID = _context.sent;
              console.log("element", personID);
              reqObj.postMDAEvalListPersons.forEach(function (element) {
                var currentId = personID && personID.dataValues && personID.dataValues.id ? +personID.dataValues.id + 1 : 1;
                element.srNo = "SR" + currentId;
              });
              _context.next = 29;
              return postMDAEvalListFMembers.findOne({
                attributes: ["id"],
                order: [["id", "ASC"]]
              });

            case 29:
              fmemberID = _context.sent;
              reqObj.postMDAEvalListFMembers.forEach(function (element) {
                var currentId = fmemberID && fmemberID.dataValues && fmemberID.dataValues.id ? +fmemberID.dataValues.id + 1 : 1;
                element.srNo = "SR" + currentId;
              });
              _context.next = 33;
              return postMDAEvalList.create(reqObj, {
                include: [{
                  model: postMDAEvalListPersons
                }, {
                  model: postMDAEvalListFMembers
                }],
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                }
              });

            case 33:
              postMDAEvalListData = _context.sent;

            case 34:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: postMDAEvalListData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 37:
              _context.prev = 37;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

              if (!_context.t0.statusCode) {
                _context.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context.t0
              }));

            case 42:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 37]]);
    }));

    return function create(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var getEvalList = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var errors, reqObj, cond, _yield$postMDAEvalLis, count, postMDAEvalListData;

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

              if (reqObj.id) {
                cond["id"] = reqObj.id;
              }

              if (reqObj.districtId) {
                cond["districtId"] = reqObj.districtId;
              }

              cond["isActive"] = true;
              _context2.next = 11;
              return postMDAEvalList.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]],
                include: [{
                  model: postMDAEvalListPersons,
                  required: false,
                  order: [["createdAt", "ASC"]]
                }, {
                  model: postMDAEvalListFMembers,
                  required: false,
                  order: [["createdAt", "ASC"]]
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
                  model: subCenters,
                  attributes: ["id", "subCenterName"],
                  required: false
                }, {
                  model: corporations,
                  attributes: ["id", "corporationName"],
                  required: false
                }, {
                  model: states,
                  attributes: ["id", "stateName"],
                  required: false
                }]
              });

            case 11:
              _yield$postMDAEvalLis = _context2.sent;
              count = _yield$postMDAEvalLis.count;
              postMDAEvalListData = _yield$postMDAEvalLis.rows;

              if (!(count <= 0)) {
                _context2.next = 16;
                break;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 16:
              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: postMDAEvalListData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 19:
              _context2.prev = 19;
              _context2.t0 = _context2["catch"](0);
              console.error(_context2.t0);

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

    return function getEvalList(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var deleteEvalList = /*#__PURE__*/function () {
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
              return postMDAEvalList.update({
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

    return function deleteEvalList(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  var deletePostMDAEvalListPersons = /*#__PURE__*/function () {
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
              return postMDAEvalListPersons.destroy({
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

    return function deletePostMDAEvalListPersons(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();

  var deletePostMDAEvalListFMembers = /*#__PURE__*/function () {
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
              return postMDAEvalListFMembers.destroy({
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

    return function deletePostMDAEvalListFMembers(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();

  return {
    create: create,
    getEvalList: getEvalList,
    deleteEvalList: deleteEvalList,
    deletePostMDAEvalListPersons: deletePostMDAEvalListPersons,
    deletePostMDAEvalListFMembers: deletePostMDAEvalListFMembers
  };
};

var _default = evalListController();

exports["default"] = _default;
//# sourceMappingURL=postMDAEvalList.controller.js.map
