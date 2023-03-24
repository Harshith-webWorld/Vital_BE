"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _VerticalStockReportController = _interopRequireDefault(require("../controllers/VerticalStockReportController"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/VerticalStockAnalysis", _VerticalStockReportController["default"].VerticalStockAnalysis).post("/vspMonthlyVacancyStatus", _VerticalStockReportController["default"].vspMonthlyVacancyStatus).post("/vspTrainingStatus", _VerticalStockReportController["default"].vspTrainingStatus).post("/vspAvailabilityConsumptionLabmaterials", _VerticalStockReportController["default"].vspAvailabilityConsumptionLabmaterials);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=VerticalStockReportRoutes.js.map
