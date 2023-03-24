"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _expressValidator = require("express-validator");

var _httpStatus = _interopRequireDefault(require("http-status"));

var _utils = _interopRequireDefault(require("../services/utils.service"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var _sequelize = _interopRequireDefault(require("../../config/sequelize"));

var _path = _interopRequireDefault(require("path"));

var websiteContentProgramInfos = _sequelize["default"].websiteContentProgramInfos,
    websiteContentProgramInfoLinks = _sequelize["default"].websiteContentProgramInfoLinks,
    websiteContentProgramInfoSections = _sequelize["default"].websiteContentProgramInfoSections;
var Op = _sequelize["default"].Sequelize.Op;
var filepath = _path["default"].join(__dirname, "../../../") + "src/uploads/website-programinfos/";

var websiteContentProgramInfosController = function websiteContentProgramInfosController() {
  var create = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, websiteContentProgramInfosData, NewsResult, whereCodn, imageDatas;
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
              websiteContentProgramInfosData = [], NewsResult = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (reqObj.programInfoHeader) {
                whereCodn["programInfoHeader"] = reqObj.programInfoHeader;
              }

              if (req.files && req.files.programInfos) {
                imageDatas = req.files.programInfos.filter(function (image) {
                  return image.filename;
                });
                reqObj.programInfoImage = imageDatas && imageDatas[0] ? imageDatas[0].filename : "";
              }

              if (!reqObj.id) {
                _context.next = 16;
                break;
              }

              _context.next = 13;
              return websiteContentProgramInfos.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 13:
              NewsResult = _context.sent;
              _context.next = 24;
              break;

            case 16:
              _context.next = 18;
              return websiteContentProgramInfos.findOne({
                where: whereCodn,
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                }
              });

            case 18:
              websiteContentProgramInfosData = _context.sent;

              if (!(websiteContentProgramInfosData && websiteContentProgramInfosData.isNewRecord === false)) {
                _context.next = 21;
                break;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].WEBSITE_BLOGS_ALREADY_EXISTS
              }));

            case 21:
              _context.next = 23;
              return websiteContentProgramInfos.create(reqObj);

            case 23:
              NewsResult = _context.sent;

            case 24:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].LABEL_SUCCESS,
                data: NewsResult,
                filepath: filepath
              }));

            case 27:
              _context.prev = 27;
              _context.t0 = _context["catch"](0);
              console.error(_context.t0);

              if (!_context.t0.statusCode) {
                _context.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context.t0
              }));

            case 32:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 27]]);
    }));

    return function create(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var getwebsiteContentProgramInfos = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var errors, reqObj, cond, _filepath, _yield$websiteContent, count, websiteContentProgramInfosData;

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
              _filepath = '';

              if (reqObj.id) {
                cond["id"] = reqObj.id;
                _filepath = req.protocol + '://' + req.get('host') + _path["default"].join(req.originalUrl, '../../') + 'blogs/';
              } else {
                _filepath = req.protocol + '://' + req.get('host') + _path["default"].join(req.originalUrl, '../') + 'blogs/';
              }

              cond["isActive"] = true;

              if (reqObj["searchTxt"]) {
                cond[Op.or] = [{
                  blogHeader: (0, _defineProperty2["default"])({}, Op.iLike, "%" + reqObj["searchTxt"] + "%")
                }];
              }

              _context2.next = 12;
              return websiteContentProgramInfos.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]],
                include: [{
                  model: websiteContentProgramInfoLinks,
                  order: [["displayOrder", "ASC"]]
                }, {
                  model: websiteContentProgramInfoSections,
                  order: [["displayOrder", "ASC"]]
                }]
              });

            case 12:
              _yield$websiteContent = _context2.sent;
              count = _yield$websiteContent.count;
              websiteContentProgramInfosData = _yield$websiteContent.rows;

              if (!(count <= 0)) {
                _context2.next = 17;
                break;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 17:
              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: websiteContentProgramInfosData,
                message: _resources["default"].LABEL_SUCCESS,
                filepath: _filepath
              }));

            case 20:
              _context2.prev = 20;
              _context2.t0 = _context2["catch"](0);
              console.error(_context2.t0);

              if (!_context2.t0.statusCode) {
                _context2.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context2.t0
              }));

            case 25:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 20]]);
    }));

    return function getwebsiteContentProgramInfos(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var deletewebsiteContentProgramInfos = /*#__PURE__*/function () {
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
              return websiteContentProgramInfos.update({
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

    return function deletewebsiteContentProgramInfos(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  var getFile = function getFile(req, res) {
    res.sendFile(_path["default"].join(filepath + req.params.fileName));
  };

  var getProgramInfoLinkFile = function getProgramInfoLinkFile(req, res) {
    res.sendFile(_path["default"].join(filepath + req.params.fileName));
  };

  var createProgramInfoLinks = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var reqObj, errors, NewsResult, whereCodn, imageDatas;
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
              NewsResult = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (req.files && req.files.programInfoLinks) {
                imageDatas = req.files.programInfoLinks.filter(function (image) {
                  return image.filename;
                });
                reqObj.linkFileName = imageDatas && imageDatas[0] ? imageDatas[0].filename : "";
              }

              if (!reqObj.id) {
                _context4.next = 15;
                break;
              }

              _context4.next = 12;
              return websiteContentProgramInfoLinks.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 12:
              NewsResult = _context4.sent;
              _context4.next = 18;
              break;

            case 15:
              _context4.next = 17;
              return websiteContentProgramInfoLinks.create(reqObj);

            case 17:
              NewsResult = _context4.sent;

            case 18:
              return _context4.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].LABEL_SUCCESS,
                data: NewsResult,
                filepath: filepath
              }));

            case 21:
              _context4.prev = 21;
              _context4.t0 = _context4["catch"](0);
              console.error(_context4.t0);

              if (!_context4.t0.statusCode) {
                _context4.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context4.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context4.t0
              }));

            case 26:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 21]]);
    }));

    return function createProgramInfoLinks(_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }();

  var getwebsiteContentProgramInfoLinks = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
      var errors, reqObj, cond, _filepath2, _yield$websiteContent2, count, websiteContentProgramInfoLinksData;

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
              _filepath2 = '';

              if (reqObj.id) {
                cond["id"] = reqObj.id;
                _filepath2 = req.protocol + '://' + req.get('host') + _path["default"].join(req.originalUrl, '../../') + 'programInfoLinks/';
              } else {
                _filepath2 = req.protocol + '://' + req.get('host') + _path["default"].join(req.originalUrl, '../') + 'programInfoLinks/';
              }

              if (reqObj.programInfoId) {
                cond["programInfoId"] = reqObj.programInfoId;
              }

              if (reqObj.id) {
                cond["id"] = reqObj.id;
              }

              cond["isActive"] = true;
              _context5.next = 13;
              return websiteContentProgramInfoLinks.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]],
                include: [{
                  model: websiteContentProgramInfoSections
                }]
              });

            case 13:
              _yield$websiteContent2 = _context5.sent;
              count = _yield$websiteContent2.count;
              websiteContentProgramInfoLinksData = _yield$websiteContent2.rows;

              if (!(count <= 0)) {
                _context5.next = 18;
                break;
              }

              return _context5.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 18:
              return _context5.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: websiteContentProgramInfoLinksData,
                message: _resources["default"].LABEL_SUCCESS,
                filepath: _filepath2
              }));

            case 21:
              _context5.prev = 21;
              _context5.t0 = _context5["catch"](0);
              console.error(_context5.t0);

              if (!_context5.t0.statusCode) {
                _context5.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context5.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context5.t0
              }));

            case 26:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 21]]);
    }));

    return function getwebsiteContentProgramInfoLinks(_x9, _x10) {
      return _ref5.apply(this, arguments);
    };
  }();

  var deletewebsiteContentProgramInfoLinks = /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
      var errors, reqObj;
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

              if (!reqObj.id) {
                _context6.next = 11;
                break;
              }

              _context6.next = 8;
              return websiteContentProgramInfoLinks.update({
                isActive: false
              }, {
                where: {
                  id: reqObj.id
                }
              });

            case 8:
              return _context6.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].DELETE_SUCCESS
              }));

            case 11:
              return _context6.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].SOMETHING_WRONG
              }));

            case 12:
              _context6.next = 19;
              break;

            case 14:
              _context6.prev = 14;
              _context6.t0 = _context6["catch"](0);
              console.error(_context6.t0);

              if (!_context6.t0.statusCode) {
                _context6.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context6.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context6.t0
              }));

            case 19:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 14]]);
    }));

    return function deletewebsiteContentProgramInfoLinks(_x11, _x12) {
      return _ref6.apply(this, arguments);
    };
  }();

  var createProgramInfoSections = /*#__PURE__*/function () {
    var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
      var reqObj, errors, websiteContentProgramInfoSectionsData, NewsResult, whereCodn;
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              reqObj = _utils["default"].getReqValues(req);
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context7.next = 5;
                break;
              }

              throw errors.array();

            case 5:
              websiteContentProgramInfoSectionsData = [], NewsResult = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (!reqObj.id) {
                _context7.next = 14;
                break;
              }

              _context7.next = 11;
              return websiteContentProgramInfoSections.update(reqObj, {
                where: {
                  id: reqObj["id"]
                }
              });

            case 11:
              NewsResult = _context7.sent;
              _context7.next = 20;
              break;

            case 14:
              _context7.next = 16;
              return websiteContentProgramInfoSections.findOne({
                where: whereCodn,
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                }
              });

            case 16:
              websiteContentProgramInfoSectionsData = _context7.sent;
              _context7.next = 19;
              return websiteContentProgramInfoSections.create(reqObj);

            case 19:
              NewsResult = _context7.sent;

            case 20:
              return _context7.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].LABEL_SUCCESS,
                data: NewsResult
              }));

            case 23:
              _context7.prev = 23;
              _context7.t0 = _context7["catch"](0);
              console.error(_context7.t0);

              if (!_context7.t0.statusCode) {
                _context7.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context7.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context7.t0
              }));

            case 28:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 23]]);
    }));

    return function createProgramInfoSections(_x13, _x14) {
      return _ref7.apply(this, arguments);
    };
  }();

  var getwebsiteContentProgramInfoSections = /*#__PURE__*/function () {
    var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
      var errors, reqObj, cond, _yield$websiteContent3, count, websiteContentProgramInfoSectionsData;

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

              if (reqObj.programInfoId) {
                cond["programInfoId"] = reqObj.programInfoId;
              }

              cond["isActive"] = true;
              _context8.next = 11;
              return websiteContentProgramInfoSections.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]]
              });

            case 11:
              _yield$websiteContent3 = _context8.sent;
              count = _yield$websiteContent3.count;
              websiteContentProgramInfoSectionsData = _yield$websiteContent3.rows;

              if (!(count <= 0)) {
                _context8.next = 16;
                break;
              }

              return _context8.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].EMPTY
              }));

            case 16:
              return _context8.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: websiteContentProgramInfoSectionsData,
                message: _resources["default"].LABEL_SUCCESS
              }));

            case 19:
              _context8.prev = 19;
              _context8.t0 = _context8["catch"](0);
              console.error(_context8.t0);

              if (!_context8.t0.statusCode) {
                _context8.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context8.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context8.t0
              }));

            case 24:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 19]]);
    }));

    return function getwebsiteContentProgramInfoSections(_x15, _x16) {
      return _ref8.apply(this, arguments);
    };
  }();

  var deletewebsiteContentProgramInfoSections = /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
      var errors, reqObj;
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

              if (!reqObj.id) {
                _context9.next = 11;
                break;
              }

              _context9.next = 8;
              return websiteContentProgramInfoSections.update({
                isActive: false
              }, {
                where: {
                  id: reqObj.id
                }
              });

            case 8:
              return _context9.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].DELETE_SUCCESS
              }));

            case 11:
              return _context9.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].SOMETHING_WRONG
              }));

            case 12:
              _context9.next = 19;
              break;

            case 14:
              _context9.prev = 14;
              _context9.t0 = _context9["catch"](0);
              console.error(_context9.t0);

              if (!_context9.t0.statusCode) {
                _context9.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context9.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context9.t0
              }));

            case 19:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 14]]);
    }));

    return function deletewebsiteContentProgramInfoSections(_x17, _x18) {
      return _ref9.apply(this, arguments);
    };
  }();

  return {
    create: create,
    getwebsiteContentProgramInfos: getwebsiteContentProgramInfos,
    deletewebsiteContentProgramInfos: deletewebsiteContentProgramInfos,
    createProgramInfoSections: createProgramInfoSections,
    getwebsiteContentProgramInfoSections: getwebsiteContentProgramInfoSections,
    deletewebsiteContentProgramInfoSections: deletewebsiteContentProgramInfoSections,
    createProgramInfoLinks: createProgramInfoLinks,
    getwebsiteContentProgramInfoLinks: getwebsiteContentProgramInfoLinks,
    deletewebsiteContentProgramInfoLinks: deletewebsiteContentProgramInfoLinks,
    getFile: getFile,
    getProgramInfoLinkFile: getProgramInfoLinkFile
  };
};

var _default = websiteContentProgramInfosController();

exports["default"] = _default;
//# sourceMappingURL=websitecontent-programinfos.controller.js.map
