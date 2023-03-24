"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _SAEReportController = _interopRequireDefault(require("../controllers/SAEReportController"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/saereport", _SAEReportController["default"].saereport);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=SAEReport.js.map
