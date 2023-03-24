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

var websiteContentNews = _sequelize["default"].websiteContentNews;
var Op = _sequelize["default"].Sequelize.Op;
var filepath = _path["default"].join(__dirname, "../../../") + "src/uploads/website-news/";

var websiteContentNewsController = function websiteContentNewsController() {
  var create = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var reqObj, errors, websiteContentNewsData, NewsResult, whereCodn, imageDatas;
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
              websiteContentNewsData = [], NewsResult = [];
              whereCodn = {};
              whereCodn["isActive"] = true;

              if (reqObj.newsHeader) {
                whereCodn["newsHeader"] = reqObj.newsHeader;
              }

              if (req.files && req.files.images) {
                imageDatas = req.files.images.filter(function (image) {
                  return image.filename;
                });
                reqObj.newsImageName = imageDatas && imageDatas[0] ? imageDatas[0].filename : "";
              }

              if (!reqObj.id) {
                _context.next = 16;
                break;
              }

              _context.next = 13;
              return websiteContentNews.update(reqObj, {
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
              return websiteContentNews.findOne({
                where: whereCodn,
                attributes: {
                  exclude: ["createdAt", "updatedAt"]
                }
              });

            case 18:
              websiteContentNewsData = _context.sent;

              if (!(websiteContentNewsData && websiteContentNewsData.isNewRecord === false)) {
                _context.next = 21;
                break;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].WEBSITE_NEWS_ALREADY_EXISTS
              }));

            case 21:
              _context.next = 23;
              return websiteContentNews.create(reqObj);

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

  var getwebsiteContentNews = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
      var errors, reqObj, cond, _filepath, _yield$websiteContent, count, websiteContentNewsData;

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
                _filepath = req.protocol + '://' + req.get('host') + _path["default"].join(req.originalUrl, '../../') + 'news/';
              } else {
                _filepath = req.protocol + '://' + req.get('host') + _path["default"].join(req.originalUrl, '../') + 'news/';
              }

              cond["isActive"] = true;

              if (reqObj["searchTxt"]) {
                cond[Op.or] = [{
                  newsHeader: (0, _defineProperty2["default"])({}, Op.iLike, "%" + reqObj["searchTxt"] + "%")
                }];
              }

              _context2.next = 12;
              return websiteContentNews.findAndCountAll({
                where: cond,
                order: [["id", "DESC"]]
              });

            case 12:
              _yield$websiteContent = _context2.sent;
              count = _yield$websiteContent.count;
              websiteContentNewsData = _yield$websiteContent.rows;

              if (!(count <= 0)) {
                _context2.next = 17;
                break;
              }

              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].WEBSITE_NEWS_EMPTY
              }));

            case 17:
              return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                data: websiteContentNewsData,
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

    return function getwebsiteContentNews(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var deletewebsiteContentNews = /*#__PURE__*/function () {
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
              return websiteContentNews.update({
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

    return function deletewebsiteContentNews(_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }();

  var getFile = function getFile(req, res) {
    res.sendFile(_path["default"].join(filepath + req.params.fileName));
  };

  return {
    create: create,
    getwebsiteContentNews: getwebsiteContentNews,
    deletewebsiteContentNews: deletewebsiteContentNews,
    getFile: getFile
  };
};

var _default = websiteContentNewsController();

exports["default"] = _default;
//# sourceMappingURL=websitecontent-news.controller.js.map
