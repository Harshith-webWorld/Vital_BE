"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _jestFetchMock = _interopRequireDefault(require("jest-fetch-mock"));

var _config = _interopRequireDefault(require("./config/config"));

var _winston = require("./config/winston");

// eslint-disable-line import/no-extraneous-dependencies, import/newline-after-import

/**
 * Some tests make use of supertest which sets up the app straight from root index.js
 * The overwhelming majority of the rest don't do this, however, and so we must create
 * our default logger here so files we test that make use of it can access it.
 */
var loggerOptions = {
  name: _config["default"].loggerName,
  env: _config["default"].env,
  logLevel: _config["default"].logLevel
};
(0, _winston.createLoggerWithOptions)(loggerOptions);
global.fetch = _jestFetchMock["default"];
//# sourceMappingURL=jest-setup.js.map
