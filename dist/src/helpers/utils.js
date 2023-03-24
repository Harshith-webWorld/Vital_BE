"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ = require("lodash");

var nodemailer = require("nodemailer");

var utils = function utils() {
  var getValuesByKey = function getValuesByKey(dataObj, index) {
    return _.map(dataObj, index);
  };

  var getReqValues = function getReqValues(req) {
    return _.pickBy(_.extend(req.body, req.params, req.query), _.identity);
  };

  var checkValidJSON = function checkValidJSON(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }

    return true;
  };

  var getRandomOTP = function getRandomOTP() {
    return Math.floor(1000 + Math.random() * 9000);
  };

  var mailOptions = function mailOptions() {
    return function (mails, message, subject) {
      var userAdminEmail = process.env.SMTP_EMAIL;
      var userAdminPassword = process.env.SMTP_PWD;
      var smtpTransport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
          user: userAdminEmail,
          pass: userAdminPassword
        }
      });
      var maillist = mails;
      var msg = {
        from: "******",
        subject: subject,
        // text: message,
        cc: "*******",
        html: message // html body

      };
      maillist.forEach(function (to, i, array) {
        msg.to = to;
        smtpTransport.sendMail(msg, function (err) {
          if (err) {
            console.log("Email error");
            console.log("Sending to ".concat(to, " failed: ").concat(err));
            return;
          }

          console.log("Sent to ".concat(to));

          if (i === maillist.length - 1) {
            msg.transport.close();
          }
        });
      });
    };
  };

  return {
    getValuesByKey: getValuesByKey,
    getReqValues: getReqValues,
    checkValidJSON: checkValidJSON,
    getRandomOTP: getRandomOTP,
    mailOptions: mailOptions
  };
};

var _default = utils;
exports["default"] = _default;
//# sourceMappingURL=utils.js.map
