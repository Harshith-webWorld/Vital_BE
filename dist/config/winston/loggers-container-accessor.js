"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _winston = _interopRequireDefault(require("winston"));

var _winstonFormatter = require("./winston-formatter");

var loggers = _winston["default"].loggers,
    format = _winston["default"].format,
    transports = _winston["default"].transports;
var printf = format.printf,
    timestamp = format.timestamp,
    combine = format.combine,
    colorize = format.colorize;
/*
 * We leverage Winston's built-in containers (loggers) to store and access your
 * custom loggers. Since this writes to a singleton reference, we won't be returning
 * anything in this function.
 */

var createLoggerWithOptions = function createLoggerWithOptions(options) {
  var loggerOptions = {
    transports: [new transports.Console()],
    level: options.logLevel,
    format: options.env === "production" ? combine(timestamp(), (0, _winstonFormatter.productionFormatter)(printf)) : combine(timestamp(), colorize(), (0, _winstonFormatter.developmentFormatter)(printf))
  };
  loggers.add(options.name, loggerOptions);
  /*
     * Now you can get your custom configured logger anywhere in the code by either:
     *    import winston from 'winston';
     *    logger = winston.loggers.get('my-custom-logger');
     * or
     *    import { loggers } from 'winston';
     *    logger = loggers.get('my-custom-logger');
     */
};

var _default = createLoggerWithOptions;
exports["default"] = _default;
//# sourceMappingURL=loggers-container-accessor.js.map
