"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _winston = require("winston");

var _config = _interopRequireDefault(require("../config"));

var _loggersContainerAccessor = _interopRequireDefault(require("./loggers-container-accessor"));

var loggerOptions = {
  name: _config["default"].loggerName,
  env: _config["default"].env,
  logLevel: _config["default"].logLevel
};
(0, _loggersContainerAccessor["default"])(loggerOptions);

var logger = _winston.loggers.get(_config["default"].loggerName);

var _default = logger;
exports["default"] = _default;
//# sourceMappingURL=get-default-logger.js.map
