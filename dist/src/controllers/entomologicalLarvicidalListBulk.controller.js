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
    entomologicalDataCounts = _sequelize["default"].entomologicalDataCounts;
var Op = _sequelize["default"].Sequelize.Op;

var bulkEntomologicalLarvicidalListController = function bulkEntomologicalLarvicidalListController() {
  var bulkCreate = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, entomologicalLarvicidalListData, whereCodn, obj, lastID, nextId, attributes;
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
              nextId = lastID && lastID.dataValues && lastID.dataValues.id ? +lastID.dataValues.id + 1 : 1;
              reqObj.entomologicalId.forEach(function (element) {
                element.srNo = "SR" + nextId++;
              });
              attributes = {
                exclude: ["createdAt", "updatedAt"]
              };
              _context.next = 24;
              return entomologicalLarvicidalList.bulkCreate(reqObj.entomologicalId, {
                include: [{
                  model: entomologicalDataCounts
                }],
                attributes: attributes
              }, {
                returning: true
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

    return function bulkCreate(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  return {
    bulkCreate: bulkCreate
  };
};

var _default = bulkEntomologicalLarvicidalListController();

exports["default"] = _default;
//# sourceMappingURL=entomologicalLarvicidalListBulk.controller.js.map
