"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HydroceleOpsMisMtrReportController = _interopRequireDefault(require("../controllers/HydroceleOpsMisMtrReportController"));

var _express = _interopRequireDefault(require("express"));

var _SchemaValidator = _interopRequireDefault(require("../validations/SchemaValidator"));

var validateRequestBody = (0, _SchemaValidator["default"])("body");

var router = _express["default"].Router();

router.post("/getHydroceleOpsMisMtrReport", validateRequestBody, _HydroceleOpsMisMtrReportController["default"].getHydroceleOpsMisMtrReportController);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=HydroceleOpsMisMtrReport.route.js.map
