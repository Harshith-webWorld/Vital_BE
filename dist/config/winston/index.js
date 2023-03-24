"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createLoggerWithOptions", {
  enumerable: true,
  get: function get() {
    return _loggersContainerAccessor["default"];
  }
});
Object.defineProperty(exports, "winstonFormatter", {
  enumerable: true,
  get: function get() {
    return _winstonFormatter.productionFormatter;
  }
});

var _loggersContainerAccessor = _interopRequireDefault(require("./loggers-container-accessor"));

var _winstonFormatter = require("./winston-formatter");
//# sourceMappingURL=index.js.map
