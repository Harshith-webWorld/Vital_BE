"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fcmNode = _interopRequireDefault(require("fcm-node"));

var _config = _interopRequireDefault(require("../../config/config"));

var _db = db,
    Notifications = _db.Notifications;

var notificationService = function notificationService() {
  var androidPushNotification = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(userInput, notificationdata) {
      var serverKey, fcm_a, message;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              serverKey = _config["default"].API_KEY;
              fcm_a = new _fcmNode["default"](serverKey);
              message = {
                // to: 'e3O9UcPA3NM:APA91bGPphbb_1q6xUxLWv5lLQo78TBAGIuOcGFK1rcaV2eK-LvQUe9CuFoIOsGk7tpu1VYHOlHeRnxkLEoPoM214mfdKlsnTn4Mkd4R_MLamF49v2ax1W93eys7kVhJ5ir8VEliSyjE', // required fill with device token or topics
                to: userInput.accessToken,
                collapse_key: "your_collapse_key",
                data: {
                  title: notificationdata.title,
                  body: notificationdata.message,
                  type: "Notification",
                  userId: notificationdata.userId
                }
              };
              fcm_a.send(message, /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(err, response) {
                  var notifyObj;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          if (!err) {
                            _context.next = 4;
                            break;
                          }

                          console.log("Something has gone wrong!", err);
                          _context.next = 8;
                          break;

                        case 4:
                          notifyObj = {
                            userId: "2",
                            title: "title",
                            description: "message",
                            notificationType: "Notification"
                          };
                          _context.next = 7;
                          return Notifications.create(notifyObj);

                        case 7:
                          console.log("Successfully sent with response: ", response);

                        case 8:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x3, _x4) {
                  return _ref2.apply(this, arguments);
                };
              }());

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function androidPushNotification(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  return {
    androidPushNotification: androidPushNotification
  };
};

var _default = notificationService();

exports["default"] = _default;
//# sourceMappingURL=notification.service.js.map
