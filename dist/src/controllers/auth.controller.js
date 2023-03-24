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

var _uuid = require("uuid");

var _popupTools = _interopRequireDefault(require("popup-tools"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _uniqueNamesGenerator = require("unique-names-generator");

var _stringSanitizer = _interopRequireDefault(require("string-sanitizer"));

var _utils = _interopRequireDefault(require("../services/utils.service"));

var _bcrypt = _interopRequireDefault(require("../services/bcrypt.service"));

var _auth = _interopRequireDefault(require("../services/auth.service"));

var _config = _interopRequireDefault(require("../../config/config"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var _sequelize = _interopRequireDefault(require("../../config/sequelize"));

var _userRoleScreenActivities = _interopRequireDefault(require("./userRoleScreenActivities.controller"));

var _joi = require("@hapi/joi");

var users = _sequelize["default"].users;
var loginHistory = _sequelize["default"].loginHistory;
var Op = _sequelize["default"].Sequelize.Op;
var attr = ["id", "userName", "email", "mobile", "roleId", "isActive", "createdBy", "lastModifiedBy"];

var AuthController = function AuthController() {
  var login = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
      var errors, reqObj, whereCodn, userData, auth, token, userResult, userScreens, historyObj;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              errors = (0, _expressValidator.validationResult)(req);

              if (errors.isEmpty()) {
                _context.next = 4;
                break;
              }

              throw errors.array();

            case 4:
              reqObj = _utils["default"].getReqValues(req);
              whereCodn = {};

              if (reqObj.userName) {
                whereCodn["userName"] = reqObj.userName;
              }

              whereCodn["isActive"] = true;
              _context.next = 10;
              return users.findOne({
                where: whereCodn
              });

            case 10:
              userData = _context.sent;
              auth = false;
              console.log("ggg:: ", userData);

              if (!(userData && userData.password)) {
                _context.next = 19;
                break;
              }

              _context.next = 16;
              return (0, _bcrypt["default"])().comparePassword(reqObj.password, userData.password);

            case 16:
              auth = _context.sent;
              _context.next = 20;
              break;

            case 19:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: false,
                message: _resources["default"].USER_NOTFOUND
              }));

            case 20:
              if (!auth) {
                _context.next = 43;
                break;
              }

              _context.next = 23;
              return _auth["default"].issue(userData.email, userData.id);

            case 23:
              token = _context.sent;
              userData.token = token;
              _context.next = 27;
              return userData.save();

            case 27:
              userResult = _context.sent;
              req.body.userId = userResult.id;
              _context.next = 31;
              return _userRoleScreenActivities["default"].getUserRoleScreenActivities(req, res);

            case 31:
              userScreens = _context.sent;

              if (!reqObj.ip) {
                _context.next = 36;
                break;
              }

              historyObj = {
                userId: userData.id,
                loginTime: new Date(),
                logoutTime: null,
                loginIP: reqObj.ip,
                createdBy: userData.id
              };
              _context.next = 36;
              return loginHistory.create(historyObj);

            case 36:
              if (!(userScreens.length > 0)) {
                _context.next = 40;
                break;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].LOGIN_SUCCESS,
                data: userScreens[0],
                token: token
              }));

            case 40:
              return _context.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].LOGIN_SUCCESS,
                data: userResult,
                token: token
              }));

            case 41:
              _context.next = 44;
              break;

            case 43:
              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: false,
                message: _resources["default"].LOGIN_FAILED
              }));

            case 44:
              _context.next = 51;
              break;

            case 46:
              _context.prev = 46;
              _context.t0 = _context["catch"](0);
              console.log("err: ", _context.t0);

              if (!_context.t0.statusCode) {
                _context.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context.t0
              }));

            case 51:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 46]]);
    }));

    return function login(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }();

  var forgotPassword = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
      var errors, userInput, otp, whereCodn, otpEmail, userData, smtpTransport, mailOptions;
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
              userInput = _utils["default"].getReqValues(req);
              otp = _utils["default"].generateOTP();
              whereCodn = {};
              whereCodn["isActive"] = true;
              otpEmail = true;

              if (userInput.email) {
                whereCodn["email"] = userInput.email;
              }

              if (userInput.mobile) {
                otpEmail = false;
                whereCodn["mobile"] = userInput.mobile;
              }

              if (otp) {
                userInput.userOtp = otp;
              }

              _context3.next = 14;
              return users.findOne({
                where: whereCodn
              });

            case 14:
              userData = _context3.sent;
              console.log("userData:: ", userData);

              if (userData) {
                _context3.next = 18;
                break;
              }

              return _context3.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].USER_NOTFOUND
              }));

            case 18:
              if (otpEmail && userData) {
                smtpTransport = _nodemailer["default"].createTransport({
                  service: _config["default"].smtpService,
                  host: _config["default"].smtpHost,
                  auth: {
                    user: _config["default"].commonEmail,
                    // generated ethereal user
                    pass: _config["default"].commonEmailPwd // generated ethereal password

                  }
                });
                smtpTransport.verify(function (error, success) {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("Server is ready to take our messages");
                  }
                });
                mailOptions = {
                  to: userInput.email,
                  from: "******",
                  subject: "APP - Forgot Password:",
                  cc: "*******",
                  text: "Hello " + userData.fullName + "," + "\n\n" + "Please Use this OTP to Reset :" + otp
                };
                smtpTransport.sendMail(mailOptions, /*#__PURE__*/function () {
                  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(err) {
                    return _regenerator["default"].wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            if (!err) {
                              _context2.next = 5;
                              break;
                            }

                            console.log("errrrr");
                            return _context2.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                              status: false,
                              message: _resources["default"].EMAIL_SENT_FAILED
                            }));

                          case 5:
                            console.log("success");
                            _context2.next = 8;
                            return users.update(userInput, {
                              where: {
                                email: userInput.email
                              }
                            });

                          case 8:
                            userData = _context2.sent;
                            return _context2.abrupt("return", res.status(_httpStatus["default"].OK).json({
                              status: true,
                              data: userData,
                              message: _resources["default"].OTP_SUCCESS
                            }));

                          case 10:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function (_x7) {
                    return _ref3.apply(this, arguments);
                  };
                }());
              }

              if (!otpEmail) {// Send OTP to Mobile
              }

              _context3.next = 25;
              break;

            case 22:
              _context3.prev = 22;
              _context3.t0 = _context3["catch"](0);
              console.log("err" + _context3.t0);

            case 25:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 22]]);
    }));

    return function forgotPassword(_x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    };
  }();

  var resetPassword = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
      var errors, userInput, newpassword, email, otp, id, whereCodn;
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
              userInput = _utils["default"].getReqValues(req);
              newpassword = userInput.newpassword, email = userInput.email, otp = userInput.otp, id = userInput.id;
              whereCodn = {};
              whereCodn["email"] = email;
              whereCodn["userOtp"] = otp;
              whereCodn["id"] = id;
              _context5.next = 12;
              return users.findOne({
                where: whereCodn
              }).then( /*#__PURE__*/function () {
                var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(response, err) {
                  return _regenerator["default"].wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          if (!response) {
                            _context4.next = 6;
                            break;
                          }

                          _context4.next = 3;
                          return users.update({
                            password: newpassword,
                            userOtp: null
                          }, {
                            where: whereCodn
                          });

                        case 3:
                          return _context4.abrupt("return", res.status(_httpStatus["default"].OK).json({
                            status: true,
                            message: _resources["default"].PASS_RESET_SUCCESS
                          }));

                        case 6:
                          return _context4.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                            status: false,
                            message: _resources["default"].PASS_RESET_FAILED
                          }));

                        case 7:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4);
                }));

                return function (_x11, _x12) {
                  return _ref5.apply(this, arguments);
                };
              }())["catch"](function (err) {
                return res.status(_httpStatus["default"].BAD_REQUEST).json({
                  status: false,
                  message: _resources["default"].PASS_RESET_FAILED
                });
              });

            case 12:
              _context5.next = 17;
              break;

            case 14:
              _context5.prev = 14;
              _context5.t0 = _context5["catch"](0);
              console.log("err" + _context5.t0);

            case 17:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 14]]);
    }));

    return function resetPassword(_x8, _x9, _x10) {
      return _ref4.apply(this, arguments);
    };
  }();

  var updatePassword = /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res, next) {
      var errors, userInput, newpassword, id, oldpassword, whereCodn, auth;
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
              userInput = _utils["default"].getReqValues(req);
              newpassword = userInput.newpassword, id = userInput.id, oldpassword = userInput.oldpassword;
              whereCodn = {};
              whereCodn["id"] = id;
              auth = false;
              _context7.next = 11;
              return users.findOne({
                where: whereCodn
              }).then( /*#__PURE__*/function () {
                var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(response, err) {
                  return _regenerator["default"].wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          if (!(response && response.password)) {
                            _context6.next = 6;
                            break;
                          }

                          _context6.next = 3;
                          return (0, _bcrypt["default"])().comparePassword(oldpassword, response.password);

                        case 3:
                          auth = _context6.sent;
                          _context6.next = 7;
                          break;

                        case 6:
                          return _context6.abrupt("return", res.status(_httpStatus["default"].OK).json({
                            status: false,
                            message: _resources["default"].USER_NOTFOUND
                          }));

                        case 7:
                          if (auth) {
                            _context6.next = 9;
                            break;
                          }

                          return _context6.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                            status: false,
                            message: _resources["default"].INCORRECT_OLD_PASSWORD
                          }));

                        case 9:
                          if (!(auth && oldpassword == newpassword)) {
                            _context6.next = 11;
                            break;
                          }

                          return _context6.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                            status: false,
                            message: _resources["default"].SAME_AS_OLD_PASSWORD
                          }));

                        case 11:
                          if (!response) {
                            _context6.next = 17;
                            break;
                          }

                          _context6.next = 14;
                          return users.update({
                            password: newpassword
                          }, {
                            where: whereCodn
                          });

                        case 14:
                          return _context6.abrupt("return", res.status(_httpStatus["default"].OK).json({
                            status: true,
                            message: _resources["default"].PASS_UPDATE_SUCCESS
                          }));

                        case 17:
                          return _context6.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                            status: false,
                            message: _resources["default"].PASS_UPDATE_FAILED
                          }));

                        case 18:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _callee6);
                }));

                return function (_x16, _x17) {
                  return _ref7.apply(this, arguments);
                };
              }())["catch"](function (err) {
                return res.status(_httpStatus["default"].BAD_REQUEST).json({
                  status: false,
                  message: _resources["default"].PASS_UPDATE_FAILED
                });
              });

            case 11:
              _context7.next = 16;
              break;

            case 13:
              _context7.prev = 13;
              _context7.t0 = _context7["catch"](0);
              console.log("err" + _context7.t0);

            case 16:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 13]]);
    }));

    return function updatePassword(_x13, _x14, _x15) {
      return _ref6.apply(this, arguments);
    };
  }();

  var verifyOtp = /*#__PURE__*/function () {
    var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res, next) {
      var errors, userInput, email, otp, whereCodn;
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
              userInput = _utils["default"].getReqValues(req);
              email = userInput.email, otp = userInput.otp;
              whereCodn = {};
              whereCodn["email"] = email;
              whereCodn["userOtp"] = otp;
              _context9.next = 11;
              return users.findOne({
                where: whereCodn
              }).then( /*#__PURE__*/function () {
                var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(response) {
                  return _regenerator["default"].wrap(function _callee8$(_context8) {
                    while (1) {
                      switch (_context8.prev = _context8.next) {
                        case 0:
                          if (!response) {
                            _context8.next = 4;
                            break;
                          }

                          return _context8.abrupt("return", res.status(_httpStatus["default"].OK).json({
                            status: true,
                            data: response,
                            message: _resources["default"].OTP_VRIFY_SUCCESS
                          }));

                        case 4:
                          return _context8.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                            status: false,
                            message: _resources["default"].OTP_VRIFY_FAILED
                          }));

                        case 5:
                        case "end":
                          return _context8.stop();
                      }
                    }
                  }, _callee8);
                }));

                return function (_x21) {
                  return _ref9.apply(this, arguments);
                };
              }())["catch"](function (err) {
                console.log(err);
              });

            case 11:
              _context9.next = 16;
              break;

            case 13:
              _context9.prev = 13;
              _context9.t0 = _context9["catch"](0);
              console.log("err" + _context9.t0);

            case 16:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 13]]);
    }));

    return function verifyOtp(_x18, _x19, _x20) {
      return _ref8.apply(this, arguments);
    };
  }();

  var socialCallback = /*#__PURE__*/function () {
    var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res, next) {
      var _req$user, provider, photos, id, name, displayName, username, emails, numberDictionary, providerId, first_name, last_name, userName, email, profilePic, usrObj, whereCodn, userData, cond, authData, authObj, loggedUser, udid, token, sessions;

      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _req$user = req.user, provider = _req$user.provider, photos = _req$user.photos, id = _req$user.id, name = _req$user.name, displayName = _req$user.displayName, username = _req$user.username, emails = _req$user.emails;
              numberDictionary = _uniqueNamesGenerator.NumberDictionary.generate({
                min: 100,
                max: 999
              });
              providerId = id;
              first_name = name && name.givenName ? name.givenName : null;
              last_name = name && name.familyName ? name.familyName : null;
              userName = username ? username : (0, _uniqueNamesGenerator.uniqueNamesGenerator)({
                dictionaries: [[_stringSanitizer["default"].sanitize(displayName)], numberDictionary],
                length: 2,
                separator: "",
                style: "lowerCase"
              });
              email = emails ? emails[0].value : null;
              profilePic = photos ? photos[0].value : null;
              usrObj = {};

              if (!(!providerId || !email)) {
                _context10.next = 12;
                break;
              }

              throw "Invalid user";

            case 12:
              console.log("req.session.passport: ".concat(JSON.stringify(req.session.passport)));
              console.log("req.session.passport - 1 : ".concat(JSON.stringify(req.session)));
              whereCodn = {};
              whereCodn["email"] = email;
              _context10.next = 18;
              return users.findOne({
                where: whereCodn,
                attributes: attr
              });

            case 18:
              userData = _context10.sent;
              console.log("userData", userData);

              if (!userData) {
                _context10.next = 45;
                break;
              }

              console.log("userData", userData.firstName);
              cond = {};
              cond["userId"] = userData.id;
              cond["provider"] = provider;
              cond["providerId"] = id;
              _context10.next = 28;
              return SocialAuth.findOne({
                where: cond,
                attributes: ["id"]
              });

            case 28:
              authData = _context10.sent;
              console.log("authDataauthDataauthData", authData);
              authObj = {
                userId: userData.id,
                provider: provider,
                providerId: providerId,
                providerData: req.user
              };

              if (authData) {
                _context10.next = 36;
                break;
              }

              _context10.next = 34;
              return SocialAuth.create(authObj);

            case 34:
              _context10.next = 43;
              break;

            case 36:
              authData.id = authData.id;
              authData.userId = userData.id;
              authData.provider = provider;
              authData.providerId = providerId;
              authData.providerData = req.user;
              _context10.next = 43;
              return authData.save();

            case 43:
              _context10.next = 58;
              break;

            case 45:
              usrObj["email"] = email;
              usrObj["displayName"] = displayName;
              usrObj["userName"] = userName;
              usrObj["password"] = "123456";
              usrObj["firstName"] = first_name;
              usrObj["lastName"] = last_name;
              usrObj["profileImg"] = profilePic;
              console.log("usrObjusrObj", usrObj);
              _context10.next = 55;
              return users.create(usrObj);

            case 55:
              userData = _context10.sent;
              _context10.next = 58;
              return SocialAuth.create({
                userId: userData.id,
                provider: provider,
                providerId: providerId,
                providerData: req.user
              });

            case 58:
              loggedUser = _lodash["default"].pick(userData, attr);
              udid = (0, _uuid.v1)();
              _context10.next = 62;
              return _auth["default"].issue({
                userId: userData.id,
                provider: provider,
                udid: udid
              });

            case 62:
              token = _context10.sent;
              _context10.next = 65;
              return usersessions.create({
                userId: userData.id,
                udid: udid,
                token: token,
                deviceInfo: {
                  provider: provider,
                  device: "web"
                }
              });

            case 65:
              sessions = _context10.sent;
              loggedUser.sessionData = _lodash["default"].pick(sessions, ["udid", "token"]);
              console.log("reqObjreqObjreqObjreqObj", loggedUser);
              res.send(_popupTools["default"].popupResponse(loggedUser));
              _context10.next = 76;
              break;

            case 71:
              _context10.prev = 71;
              _context10.t0 = _context10["catch"](0);
              console.log("errr===>", _context10.t0);

              if (!_context10.t0.statusCode) {
                _context10.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              res.send(_popupTools["default"].popupResponse(_context10.t0));

            case 76:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[0, 71]]);
    }));

    return function socialCallback(_x22, _x23, _x24) {
      return _ref10.apply(this, arguments);
    };
  }();

  var logout = /*#__PURE__*/function () {
    var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res, next) {
      var errors, reqObj, whereCodn, historyData;
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
              whereCodn = {};

              if (reqObj.clientIp) {
                whereCodn["loginIP"] = reqObj.clientIp;
              }

              _context11.next = 9;
              return loginHistory.findOne({
                where: whereCodn,
                order: [["loginTime", "DESC"]]
              });

            case 9:
              historyData = _context11.sent;

              if (!historyData) {
                _context11.next = 17;
                break;
              }

              historyData.logoutTime = new Date();
              _context11.next = 14;
              return historyData.save();

            case 14:
              return _context11.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].LOGOUT_SUCCESS,
                data: historyData
              }));

            case 17:
              return _context11.abrupt("return", res.status(_httpStatus["default"].OK).json({
                status: _httpStatus["default"].OK,
                message: _resources["default"].LOGOUT_SUCCESS,
                data: historyData
              }));

            case 18:
              _context11.next = 25;
              break;

            case 20:
              _context11.prev = 20;
              _context11.t0 = _context11["catch"](0);
              console.log("err :", _context11.t0);

              if (!_context11.t0.statusCode) {
                _context11.t0.statusCode = _httpStatus["default"].BAD_REQUEST;
              }

              return _context11.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
                status: _httpStatus["default"].BAD_REQUEST,
                message: _context11.t0
              }));

            case 25:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, null, [[0, 20]]);
    }));

    return function logout(_x25, _x26, _x27) {
      return _ref11.apply(this, arguments);
    };
  }();

  return {
    login: login,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
    verifyOtp: verifyOtp,
    socialCallback: socialCallback,
    updatePassword: updatePassword,
    logout: logout
  };
};

var _default = AuthController();

exports["default"] = _default;
//# sourceMappingURL=auth.controller.js.map
