"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _https = _interopRequireDefault(require("https"));

var _http = _interopRequireDefault(require("http"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _winston = require("winston");

var _config = _interopRequireDefault(require("./config/config"));

var _express = _interopRequireDefault(require("./config/express"));

var db = require('./config/sequelize');

var certOptions = {
  key: _fs["default"].readFileSync(_path["default"].resolve('./server.key')),
  cert: _fs["default"].readFileSync(_path["default"].resolve('./server.crt'))
}; // Get default logger

var logger = _winston.loggers.get(_config["default"].loggerName); // eslint-disable-line no-global-assign
// make bluebird default Promise


Promise = require("bluebird"); // eslint-disable-line no-global-assign
//module.parent check is required to support mocha watch

if (!module.parent) {
  var server = _https["default"].createServer(certOptions, _express["default"]).listen(_config["default"].port_https);

  _http["default"].createServer(_express["default"]).listen(_config["default"].port, function () {
    logger.info("The application has started on port ".concat(_config["default"].port, " (").concat(_config["default"].env, ")")); // eslint-disable-line no-console
  });
}

var _default = _express["default"];
exports["default"] = _default;
//# sourceMappingURL=index.js.map
