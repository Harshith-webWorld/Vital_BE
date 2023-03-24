"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productionFormatter = exports.developmentFormatter = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _os = _interopRequireDefault(require("os"));

var _package = _interopRequireDefault(require("../../package.json"));

var developmentFormatter = function developmentFormatter(printf) {
  return printf(function (info) {
    return "".concat(info.timestamp, " ").concat(info.level, ": ").concat(info.message);
  });
};

exports.developmentFormatter = developmentFormatter;

var productionFormatter = function productionFormatter(printf) {
  return printf(function (info) {
    /**
     * @param infoObj
     */
    function parseInfo(infoObj) {
      return _lodash["default"].omit(infoObj, ["err", "hostname", "level", "logger", "message", "meta", "service", "stack", "timestamp"]);
    }

    return JSON.stringify({
      service: _package["default"].name,
      logger: "application_logger",
      hostname: _os["default"].hostname(),
      level: info.level,
      msg: info.message,
      meta: {
        service: {
          version: _package["default"].version
        },
        logger: {
          time: info.timestamp
        },
        event: parseInfo(info)
      },
      err: {
        err: info.err,
        stack: info.stack
      }
    });
  });
};

exports.productionFormatter = productionFormatter;
//# sourceMappingURL=winston-formatter.js.map
