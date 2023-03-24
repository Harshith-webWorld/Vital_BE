"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _TASReportController = _interopRequireDefault(require("../controllers/TASReportController"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/get_TASReport1", _TASReportController["default"].get_TASReport1List).post("/get_TASReport2", _TASReportController["default"].get_TASReport2List);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=TASReportRoutes.js.map
