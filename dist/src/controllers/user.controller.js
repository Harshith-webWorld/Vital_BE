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

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = _interopRequireDefault(require("../services/utils.service"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var _sequelize = _interopRequireDefault(require("../../config/sequelize"));

var _userRoleScreenActivities = _interopRequireDefault(require("./userRoleScreenActivities.controller"));

var users = _sequelize["default"].users,
    userRoleScreenActivities = _sequelize["default"].userRoleScreenActivities,
    institutionTypes = _sequelize["default"].institutionTypes,
    designations = _sequelize["default"].designations,
    facilities = _sequelize["default"].facilities,
    districts = _sequelize["default"].districts,
    roles = _sequelize["default"].roles;
var Op = _sequelize["default"].Sequelize.Op;

var UserController = function UserController() {
  var create = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, userData, whereCodn, screenResponse, destroyExistingScreens, userID, institutionTypeId, institutionId, distId, currentId, institutionTypeShortName, distCode, mailOptions;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);
              console.log("reqObj", reqObj);

              if (errors.isEmpty()) {
                _context.next = 6;
                break;
              }

              throw errors.array();

            case 6:
              userData = [];
              whereCodn = {};
              screenResponse = [];
              destroyExistingScreens = [];
              whereCodn["isActive"] = true;

              if (reqObj.email) {
                whereCodn["email"] = reqObj.email;
              }

              if (!reqObj.id) {
                _context.next = 31;
                break;
              }

              delete reqObj.password;
              _context.next = 16;
              return users.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 16:
              userData = _context.sent;
              _context.next = 19;
              return userRoleScreenActivities.destroy({
                where: {
                  userId: reqObj["id"]
                }
              });

            case 19:
              destroyExistingScreens = _context.sent;
              req.body.roleId = reqObj.roleId;
              req.body.userId = reqObj.id; // req.body.activitiId = reqObj.activitiId;

              req.body.screenId = reqObj.screenId;
              req.body.isActive = true;
              req.body.createdBy = reqObj.createdBy;
              req.body.lastModifiedBy = reqObj.lastModifiedBy;
              _context.next = 28;
              return _userRoleScreenActivities["default"].create(req, res);

            case 28:
              screenResponse = _context.sent;
              _context.next = 63;
              break;

            case 31:
              _context.next = 33;
              return users.findOne({
                attributes: ["id"],
                order: [['createdAt', 'DESC']]
              });

            case 33:
              userID = _context.sent;
              _context.next = 36;
              return institutionTypes.findOne({
                where: reqObj.institutionTypeId,
                attributes: ["id", "institutionTypeShortName"],
                order: [['createdAt', 'DESC']]
              });

            case 36:
              institutionTypeId = _context.sent;
              _context.next = 39;
              return facilities.findOne({
                where: reqObj.institutionId,
                attributes: ["id", "facilityType", "districtId"],
                order: [['createdAt', 'DESC']]
              });

            case 39:
              institutionId = _context.sent;
              _context.next = 42;
              return districts.findOne({
                where: reqObj.districtId,
                attributes: ["id", "districtCode"],
                order: [['createdAt', 'DESC']]
              });

            case 42:
              distId = _context.sent;
              currentId = userID && userID.dataValues && userID.dataValues.id ? +userID.dataValues.id + 1 : 1;
              institutionTypeShortName = institutionTypeId && institutionTypeId.dataValues && institutionTypeId.dataValues.institutionTypeShortName; // let designationShortName =
              // designationId && designationId.dataValues && designationId.dataValues.designationShortName;

              distCode = distId && distId.dataValues && distId.dataValues.districtCode;

              if (!(userData && userData.isNewRecord === false)) {
                _context.next = 48;
                break;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].USER_ALREADY_EXISTS
              }));

            case 48:
              reqObj.password = 'Welcome@123';
              reqObj.userName = distCode + "_" + institutionTypeShortName + "_" + currentId;
              _context.next = 52;
              return users.create(reqObj);

            case 52:
              userData = _context.sent;
              req.body.roleId = reqObj.roleId;
              req.body.userId = userData.id; // req.body.activitiId = reqObj.activitiId;

              req.body.screenId = reqObj.screenId;
              req.body.isActive = true;
              req.body.createdBy = reqObj.createdBy;
              req.body.lastModifiedBy = reqObj.lastModifiedBy;
              _context.next = 61;
              return _userRoleScreenActivities["default"].create(req, res);

            case 61:
              screenResponse = _context.sent;

              if (screenResponse) {
                mailOptions = {
                  subject: "User Creation Notification",
                  message: "Hi ".concat(reqObj.fullName, ", welcome to our app\n Your Login Information \n Email:\t ").concat(reqObj.email, " \n Password:\t ").concat(reqObj.password, " \n Login URL: ").concat(req.protocol + '://' + req.get('host'), " \n Username:").concat(reqObj.userName),
                  email: reqObj.email
                };

                _utils["default"].transporter(mailOptions);
              }

            case 63:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: screenResponse,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 66:
              _context.prev = 66;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);

              if (!_context.t0.statusCode) {
                _context.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context.t0
              }));

            case 71:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 66]]);
    }));

    return function create(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var getusers = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var errors, reqObj, cond, attributes, _yield$users$findAndC, count, userData;

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
              attributes = {
                exclude: ["createdAt", "updatedAt", "password"]
              };

              if (reqObj.id) {
                cond["id"] = reqObj.id;
                attributes = "";
              }

              cond["isActive"] = true;
              _context2.next = 11;
              return users.findAndCountAll({
                where: cond,
                attributes: attributes,
                order: [["id", "DESC"]],
                include: [{
                  model: institutionTypes,
                  attributes: ["id", "institutionTypeName"],
                  required: false
                }, {
                  model: roles,
                  attributes: ["id", "roleName"],
                  required: false
                } // {
                // 	model:designations,
                // 	attributes: ["id", "designationName"],
                // 	required:false
                // }
                ]
              });

            case 11:
              _yield$users$findAndC = _context2.sent;
              count = _yield$users$findAndC.count;
              userData = _yield$users$findAndC.rows;

              if (!(count <= 0)) {
                _context2.next = 16;
                break;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].USER_EMPTY
              }));

            case 16:
              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: userData,
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

    return function getusers(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var deleteUser = /*#__PURE__*/function () {
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
                _context3.next = 13;
                break;
              }

              _context3.next = 8;
              return users.update({
                isActive: false
              }, {
                where: {
                  id: reqObj.id
                }
              });

            case 8:
              _context3.next = 10;
              return userRoleScreenActivities.update({
                isActive: false
              }, {
                where: {
                  userId: reqObj.id
                }
              });

            case 10:
              return _context3.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].DELETE_SUCCESS
              }));

            case 13:
              return _context3.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].SOMETHING_WRONG
              }));

            case 14:
              _context3.next = 21;
              break;

            case 16:
              _context3.prev = 16;
              _context3.t0 = _context3["catch"](0);
              console.error(_context3.t0);

              if (!_context3.t0.statusCode) {
                _context3.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context3.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context3.t0
              }));

            case 21:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 16]]);
    }));

    return function deleteUser(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  return {
    create: create,
    getusers: getusers,
    deleteUser: deleteUser
  };
};

var _default = UserController();

exports["default"] = _default;
//# sourceMappingURL=user.controller.js.map
