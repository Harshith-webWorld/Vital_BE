"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = _interopRequireDefault(require("lodash"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _moment = _interopRequireDefault(require("moment"));

var _config = _interopRequireDefault(require("../../config/config"));

var _sequelize = _interopRequireDefault(require("../../config/sequelize"));

var saltRounds = 10;
var users = _sequelize["default"].users;
var _default = {
  dateDiff: function dateDiff(date, diffStr) {
    var currDate = (0, _moment["default"])();
    var createdDate = (0, _moment["default"])(date);
    return currDate.diff(createdDate, diffStr);
  },
  generateOTP: function generateOTP() {
    var min = 100000;
    var max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  validateEmail: function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },
  getReqValues: function getReqValues(req) {
    return _lodash["default"].extend(req.body, req.params, req.query);
  },
  password: function password(user) {
    var salt = _bcrypt["default"].genSaltSync(saltRounds);

    var hash = _bcrypt["default"].hashSync(user.password, salt);

    return hash;
  },
  updatePassword: function updatePassword(pass) {
    var salt = _bcrypt["default"].genSaltSync(saltRounds);

    var hash = _bcrypt["default"].hashSync(pass, salt);

    return hash;
  },
  comparePassword: function comparePassword(pw, hash) {
    var pass = _bcrypt["default"].compareSync(pw, hash);

    return pass;
  },
  unLinkFilePath: function unLinkFilePath(filePath) {
    return new Promise(function (resolve) {
      _fs["default"].unlink(filePath, function (err) {
        if (err) {
          resolve({
            status: false,
            message: err
          });
        } else {
          resolve({
            status: true
          });
        }
      });
    });
  },
  getActivityLogs: function getActivityLogs(notify) {
    return new Promise(function (resolve) {
      try {
        var filePath = _path["default"].join(__dirname, "../constant/activitylog.json");

        _fs["default"].readFile(filePath, "utf8", function (err, res) {
          if (err) {
            resolve({
              status: false,
              message: err
            });
          } else {
            var notifyInfo = JSON.parse(res);
            resolve({
              status: true,
              data: notifyInfo[notify]
            });
          }
        });
      } catch (error) {
        resolve({
          status: false,
          message: error
        });
      }
    });
  },
  ageCalculation: function ageCalculation(dob) {
    if (dob) {
      var diff_ms = Date.now() - dob.getTime();
      var age = new Date(diff_ms);
      return Math.abs(age.getUTCFullYear() - 1970);
    }

    return 0;
  },
  transporter: function transporter(mailOptions) {
    var transporter = _nodemailer["default"].createTransport({
      host: _config["default"].smtpHost,
      auth: {
        user: _config["default"].commonEmail,
        pass: _config["default"].commonEmailPwd
      }
    });

    var messageObject = {
      from: _config["default"].commonEmail,
      to: mailOptions.email,
      subject: mailOptions.subject,
      text: mailOptions.message
    };
    transporter.sendMail(messageObject, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    return transporter;
  },
  sendVerificationEmail: function sendVerificationEmail(mailData) {
    var mailTransport = this.transporter();

    var emailOtpTemplate = _path["default"].resolve("src/template/emailWithOTP.html");

    this.readHTMLFile(emailOtpTemplate, /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(err, html) {
        var template, replacements, htmlToSend, mailOptions, info;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!err) {
                  _context.next = 3;
                  break;
                }

                console.log(err);
                return _context.abrupt("return", false);

              case 3:
                template = _handlebars["default"].compile(html);
                replacements = {
                  otp: mailData.otp
                };
                htmlToSend = template(replacements);
                mailOptions = {
                  from: _config["default"].commonMail,
                  to: mailData.emailId,
                  subject: "Mocial Verification",
                  html: htmlToSend
                };
                _context.next = 9;
                return mailTransport.sendMail(mailOptions);

              case 9:
                info = _context.sent;

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }());
  },
  readHTMLFile: function readHTMLFile(path, callback) {
    _fs["default"].readFile(path, {
      encoding: "utf-8"
    }, function (err, html) {
      if (err) {
        console.log(err);
        callback(err);
      } else {
        console.log(html);
        callback(null, html);
      }
    });
  },
  generateToken: function generateToken(data) {
    var mobileResponse = {};
    var tokenObject = {};
    tokenObject.id = data._id;
    return new Promise(function (resolve, reject) {
      _jsonwebtoken["default"].sign(tokenObject, _config["default"].jwtSecret, {
        expiresIn: _config["default"].jwtTokenExpire
      }, function (err, token) {
        if (err) {
          console.log(err);
          mobileResponse.error = true;
          mobileResponse.errorMessage = err;
          resolve(mobileResponse);
        } else if (res.success === true) {
          mobileResponse.error = false;
          resolve(mobileResponse);
        } else {
          mobileResponse.error = true;
          resolve(mobileResponse);
        }
      });
    });
  },
  initialUserRecords: function initialUserRecords() {
    var _this = this;

    _fs["default"].readFile(_config["default"].uploadPath + "server/config/initialRecords.json", function (err, data) {
      if (data) {
        var initialRecords = JSON.parse(data);
        Object.keys(initialRecords).forEach( /*#__PURE__*/function () {
          var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(tableName) {
            return _regenerator["default"].wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    if (!(tableName == "users")) {
                      _context3.next = 4;
                      break;
                    }

                    _lodash["default"].forEach(initialRecords[tableName], /*#__PURE__*/function () {
                      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(records) {
                        return _regenerator["default"].wrap(function _callee2$(_context2) {
                          while (1) {
                            switch (_context2.prev = _context2.next) {
                              case 0:
                                _context2.prev = 0;
                                _context2.next = 3;
                                return _this.createInitialRecord(tableName, records);

                              case 3:
                                _context2.next = 8;
                                break;

                              case 5:
                                _context2.prev = 5;
                                _context2.t0 = _context2["catch"](0);
                                console.error("Initial Record Error", _context2.t0);

                              case 8:
                              case "end":
                                return _context2.stop();
                            }
                          }
                        }, _callee2, null, [[0, 5]]);
                      }));

                      return function (_x4) {
                        return _ref3.apply(this, arguments);
                      };
                    }());

                    _context3.next = 6;
                    break;

                  case 4:
                    _context3.next = 6;
                    return _this.createInitialRecord(tableName, initialRecords[tableName]);

                  case 6:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));

          return function (_x3) {
            return _ref2.apply(this, arguments);
          };
        }());
      }
    });
  },
  createInitialRecord: function createInitialRecord(tableName, records) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;

              if (!(tableName == "users")) {
                _context4.next = 4;
                break;
              }

              _context4.next = 4;
              return users.create(records);

            case 4:
              _context4.next = 9;
              break;

            case 6:
              _context4.prev = 6;
              _context4.t0 = _context4["catch"](0);
              console.log("err" + _context4.t0);

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 6]]);
    }))();
  },
  monthIdtoMonth: {
    1: "jan",
    2: "feb",
    3: "mar",
    4: "apr",
    5: "may",
    6: "jun",
    7: "jul",
    8: "aug",
    9: "sep",
    10: "oct",
    11: "nov",
    12: "dec"
  },
  monthDiff: function monthDiff(startYear, endYear, startMonth, endMonth) {
    var dateFrom = new Date(startYear, startMonth - 1);
    var dateTo = new Date(endYear, endMonth - 1);
    return dateTo.getMonth() - dateFrom.getMonth() + 12 * (dateTo.getFullYear() - dateFrom.getFullYear()) + 1;
  }
};
exports["default"] = _default;
//# sourceMappingURL=utils.service.js.map
