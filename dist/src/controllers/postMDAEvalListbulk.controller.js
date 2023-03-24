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
    postMDAEvalListFMembers = _sequelize["default"].postMDAEvalListFMembers;
var Op = _sequelize["default"].Sequelize.Op;

var bulckevalListController = function bulckevalListController() {
  var bulkCreate = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, postMDAEvalListData, whereCodn, obj, evalID, nextId, personID, fmemberID;
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
                _context.next = 15;
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
              _context.next = 32;
              break;

            case 15:
              _context.next = 17;
              return postMDAEvalList.findOne({
                attributes: {
                  include: ["id"]
                },
                order: [["id", "DESC"]]
              });

            case 17:
              evalID = _context.sent;
              nextId = evalID && evalID.dataValues && evalID.dataValues.id ? +evalID.dataValues.id + 1 : 1;
              reqObj.postMdaEvaId.forEach(function (element) {
                element.srNo = "SR" + nextId++;
              });
              _context.next = 22;
              return postMDAEvalListPersons.findOne({
                attributes: ["id"],
                order: [["createdAt", "DESC"]]
              });

            case 22:
              personID = _context.sent;
              console.log("element", personID);
              reqObj.postMdaEvaId.forEach(function (element) {
                element.postMDAEvalListPersons.forEach(function (element) {
                  var nextId = personID && personID.dataValues && personID.dataValues.id ? +personID.dataValues.id + 1 : 1;
                  element.srNo = "SR" + nextId++;
                });
              });
              _context.next = 27;
              return postMDAEvalListFMembers.findOne({
                attributes: ["id"],
                order: [["createdAt", "DESC"]]
              });

            case 27:
              fmemberID = _context.sent;
              reqObj.postMdaEvaId.forEach(function (element) {
                element.postMDAEvalListFMembers.forEach(function (element) {
                  var nextId = fmemberID && fmemberID.dataValues && fmemberID.dataValues.id ? +fmemberID.dataValues.id + 1 : 1;
                  element.srNo = "SR" + nextId++;
                });
              });
              _context.next = 31;
              return postMDAEvalList.bulkCreate(reqObj.postMdaEvaId, {
                include: [{
                  model: postMDAEvalListPersons
                }, {
                  model: postMDAEvalListFMembers
                }],
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                }
              });

            case 31:
              postMDAEvalListData = _context.sent;

            case 32:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: postMDAEvalListData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 35:
              _context.prev = 35;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

              if (!_context.t0.statusCode) {
                _context.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context.t0
              }));

            case 40:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 35]]);
    }));

    return function bulkCreate(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  return {
    bulkCreate: bulkCreate
  };
};

var _default = bulckevalListController();

exports["default"] = _default;
//# sourceMappingURL=postMDAEvalListbulk.controller.js.map
