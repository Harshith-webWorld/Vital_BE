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

var preMDAActivities = _sequelize["default"].preMDAActivities,
    preMDAActivityDrugLogistics = _sequelize["default"].preMDAActivityDrugLogistics,
    preMDAActivityDrugAdministrators = _sequelize["default"].preMDAActivityDrugAdministrators,
    preMDAActivitySupervisors = _sequelize["default"].preMDAActivitySupervisors;
var Op = _sequelize["default"].Sequelize.Op;

var bulkpreMDAActivitiesController = function bulkpreMDAActivitiesController() {
  var bulkCreate = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, preMDAActivitiesData, whereCodn, lastID, nextId;
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
              preMDAActivitiesData = [];
              whereCodn = {};
              whereCodn["isActive"] = true; // var obj = {}

              if (!reqObj.id) {
                _context.next = 14;
                break;
              }

              _context.next = 11;
              return preMDAActivities.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 11:
              preMDAActivitiesData = _context.sent;
              _context.next = 22;
              break;

            case 14:
              _context.next = 16;
              return preMDAActivities.findOne({
                attributes: {
                  include: ["id"]
                },
                order: [['id', 'DESC']]
              });

            case 16:
              lastID = _context.sent;
              nextId = lastID && lastID.dataValues && lastID.dataValues.id ? +lastID.dataValues.id + 1 : 1;
              reqObj.forEach(function (element) {
                element.srNo = "SR" + nextId++;
              });
              _context.next = 21;
              return preMDAActivities.bulkCreate(reqObj, {
                include: [{
                  model: preMDAActivityDrugLogistics,
                  as: "preMDAActivityDrugLogistics"
                }, {
                  model: preMDAActivityDrugAdministrators,
                  as: "preMDAActivityDrugAdministrators"
                }, {
                  model: preMDAActivitySupervisors,
                  as: "preMDAActivitySupervisors"
                }]
              }, {
                returning: true
              });

            case 21:
              preMDAActivitiesData = _context.sent;

            case 22:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: preMDAActivitiesData,
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

var _default = bulkpreMDAActivitiesController();

exports["default"] = _default;
//# sourceMappingURL=preMDAActivitiesBulk.controller.js.map
