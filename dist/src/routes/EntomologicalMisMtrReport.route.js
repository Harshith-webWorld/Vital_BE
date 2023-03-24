"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _EntomologicalMisMtrReportController = _interopRequireDefault(require("../controllers/EntomologicalMisMtrReportController"));

var _express = _interopRequireDefault(require("express"));

var _SchemaValidator = _interopRequireDefault(require("../validations/SchemaValidator"));

var validateRequestBody = (0, _SchemaValidator["default"])("body");

var router = _express["default"].Router();

router.post("/getEntomologicalMisMtrReport", validateRequestBody, _EntomologicalMisMtrReportController["default"].getEntologicalMisMtrReportController);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=EntomologicalMisMtrReport.route.js.map
