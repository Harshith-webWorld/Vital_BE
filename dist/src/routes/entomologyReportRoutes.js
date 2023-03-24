"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _entomologyReportController = _interopRequireDefault(require("../controllers/entomologyReportController"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/LarvicidalReport1", _entomologyReportController["default"].LarvicidalReport1).post("/NFCUReportEntomology1", _entomologyReportController["default"].NFCUReportEntomology1).post("/AdditionalEntomologicalReport", _entomologyReportController["default"].AdditionalEntomologicalReport).post("/BaselineEntomoligicalReport", _entomologyReportController["default"].BaselineEntomoligicalReport).post("/LarvalDensityReport", _entomologyReportController["default"].LarvalDensityReport).post("/NFCUMosquitoDisectionReport", _entomologyReportController["default"].NFCUMosquitoDisectionReport);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=entomologyReportRoutes.js.map
