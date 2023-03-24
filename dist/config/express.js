"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _compression = _interopRequireDefault(require("compression"));

var _methodOverride = _interopRequireDefault(require("method-override"));

var _cors = _interopRequireDefault(require("cors"));

var _httpStatus = _interopRequireDefault(require("http-status"));

var _expressWinston = _interopRequireDefault(require("express-winston"));

var _expressValidation = _interopRequireDefault(require("express-validation"));

var _helmet = _interopRequireDefault(require("helmet"));

var _path = _interopRequireDefault(require("path"));

var _passport = _interopRequireDefault(require("passport"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _config = _interopRequireDefault(require("./config"));

var _getDefaultLogger = _interopRequireDefault(require("./winston/get-default-logger"));

var _index = _interopRequireDefault(require("../src/routes/index.route"));

var _APIError = _interopRequireDefault(require("../src/helpers/APIError"));

var _swagger = require("../src/swagger");

// import userCtrl from "../src/controllers/user.controller";
var pathToSwaggerUi = (0, _swagger.absolutePath)(); // console.log("DDdDdDDddDD 2", pathToSwaggerUi);
// Define default HTTP logger instance (use default logger instance)

var winstonInstance = _getDefaultLogger["default"];
var app = (0, _express["default"])(); // parse body params and attache them to req.body

app.use(_express["default"].json());
app.use(_bodyParser["default"].urlencoded({
  limit: '50mb',
  extended: true
}));
app.use(_bodyParser["default"].json({
  limit: '50mb'
}));
var staticResource = _config["default"].uploadPath + "/";
app.use(_express["default"]["static"](_path["default"].join(staticResource, "/")));
app.use(_express["default"]["static"](pathToSwaggerUi));
app.use((0, _cookieParser["default"])());
app.use((0, _compression["default"])());
app.use((0, _methodOverride["default"])());
app.use((0, _helmet["default"])());
app.use((0, _cors["default"])());
app.use((0, _expressSession["default"])({
  secret: _config["default"].SECURITY_SALT,
  resave: true,
  saveUninitialized: true
}));
app.use(_passport["default"].initialize());
app.use(_passport["default"].session()); // This is really just a test output and should be the first thing you see

winstonInstance.info("The application is starting..."); // enable detailed API logging in dev env

if (_config["default"].env === "development") {
  _expressWinston["default"].requestWhitelist.push("body");

  _expressWinston["default"].responseWhitelist.push("body");

  app.use(_expressWinston["default"].logger({
    winstonInstance: winstonInstance,
    meta: true,
    // optional: log meta data about request (defaults to true)
    message: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
    colorStatus: "green" // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).

  }));
}

console.log("DDdDdDDddDD");
console.log(__dirname);
var baseUrl = "/v".concat(_config["default"].apiVersion);
console.log("baseUrl", baseUrl); // app.use(`${baseUrl}`, routes);

app.use("/", _index["default"]);
app.use(function (err, req, res, next) {
  if (err instanceof _expressValidation["default"].ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    var unifiedErrorMessage = err.errors.map(function (error) {
      return error.messages.join(". ");
    }).join(" and ");
    var error = new _APIError["default"](unifiedErrorMessage, err.status, true);
    return next(error);
  }

  if (!(err instanceof _APIError["default"])) {
    var apiError = new _APIError["default"](err.message, err.status, err.isPublic);
    return next(apiError);
  }

  return next(err);
}); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  var err = new _APIError["default"]("API not found", _httpStatus["default"].NOT_FOUND);
  return next(err);
}); // log error in winston transports except when executing test suite

if (_config["default"].env !== "test") {
  app.use(_expressWinston["default"].errorLogger({
    winstonInstance: winstonInstance
  }));
} // error handler, send stacktrace only during development


app.use(function (err, req, res, next) {
  return res.status(err.status).json({
    // eslint-disable-line no-unused-vars
    message: err.isPublic ? err.message : _httpStatus["default"][err.status],
    stack: _config["default"].env === "development" ? err.stack : {}
  });
});
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=express.js.map
