"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _HydroceleOperationsReportController = _interopRequireDefault(require("../controllers/HydroceleOperationsReportController"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var _SchemaValidator = _interopRequireDefault(require("../validations/SchemaValidator"));

var validateRequestBody = (0, _SchemaValidator["default"])("body");

var router = _express["default"].Router();

router.post("/getHydroceleOperationsReport", validateRequestBody, _HydroceleOperationsReportController["default"].getHydroceleOperationsReportController);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=HydrocelectomyOperationsReport.route.js.map
