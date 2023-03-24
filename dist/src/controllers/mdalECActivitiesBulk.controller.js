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

var mdaIECActivities = _sequelize["default"].mdaIECActivities;
var Op = _sequelize["default"].Sequelize.Op;

var bulkMdaIECActivitiesController = function bulkMdaIECActivitiesController() {
  var bulkCreate = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, mdaIECActivitiesData, whereCodn, lastID, nextId;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              reqObj = _utils["default"].getReqValues(req); // reqObj.srNo = "SR" + reqObj.id

              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              mdaIECActivitiesData = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (!reqObj.id) {
                _context.next = 14;
                break;
              }

              _context.next = 11;
              return mdaIECActivities.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 11:
              mdaIECActivitiesData = _context.sent;
              _context.next = 22;
              break;

            case 14:
              _context.next = 16;
              return mdaIECActivities.findOne({
                attributes: ['id'],
                order: [['id', 'DESC']]
              });

            case 16:
              lastID = _context.sent;
              nextId = lastID && lastID.dataValues && lastID.dataValues.id ? +lastID.dataValues.id + 1 : 1;
              reqObj.mdaIecActivityid.forEach(function (element) {
                element.srNo = "SR" + nextId++;
              });
              _context.next = 21;
              return mdaIECActivities.bulkCreate(reqObj.mdaIecActivityid, {
                returning: true
              });

            case 21:
              mdaIECActivitiesData = _context.sent;

            case 22:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: mdaIECActivitiesData,
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

    return function bulkCreate(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  return {
    bulkCreate: bulkCreate
  };
};

var _default = bulkMdaIECActivitiesController();

exports["default"] = _default;
//# sourceMappingURL=mdalECActivitiesBulk.controller.js.map
