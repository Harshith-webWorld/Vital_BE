"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _FCUMisMtrReportController = _interopRequireDefault(require("../controllers/FCUMisMtrReportController"));

var _express = _interopRequireDefault(require("express"));

var _SchemaValidator = _interopRequireDefault(require("../validations/SchemaValidator"));

var validateRequestBody = (0, _SchemaValidator["default"])("body");

var router = _express["default"].Router();

router.post("/getFCUMisMtrReport", validateRequestBody, _FCUMisMtrReportController["default"].getFCUMisMtrReportController);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=FCUMisMtrReport.route.js.map
