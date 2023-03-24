"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _dashboardController = _interopRequireDefault(require("../controllers/dashboardController"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/get_EndemicityTotalAllDistricts", _dashboardController["default"].get_EndemicityTotalAllDistricts).post("/get_DashboardTodayEntry", _dashboardController["default"].get_DashboardTodayEntry).post("/DashboardBSCollectedToday", _dashboardController["default"].DashboardBSCollectedToday).post("/DashboardLFThisMonth", _dashboardController["default"].DashboardLFThisMonth).post("/DashboardMFPositive12Months", _dashboardController["default"].DashboardMFPositive12Months).post("/DashboardLFCases12Months", _dashboardController["default"].DashboardLFCases12Months).post("/DashboardMONotVerified", _dashboardController["default"].DashboardMONotVerified).post("/DashboardFSUTargets", _dashboardController["default"].DashboardFSUTargets).post("/DashboardMFRates", _dashboardController["default"].DashboardMFRates).post("/DashboardDrugConsumption", _dashboardController["default"].DashboardDrugConsumption).post("/GetMFRateTimeTrend", _dashboardController["default"].GetMFRateTimeTrend).post("/GetMFRateTimeTrendList", _dashboardController["default"].GetMFRateTimeTrendList).post("/GetLymphedemaCasesDistricts", _dashboardController["default"].GetLymphedemaCasesDistricts).post("/GetHydroceleCasesDistricts", _dashboardController["default"].GetHydroceleCasesDistricts).post("/GetHydroceleSurgeriesDistricts", _dashboardController["default"].GetHydroceleSurgeriesDistricts).post("/GetMFPositiveCasesDistricts", _dashboardController["default"].GetMFPositiveCasesDistricts).post("/GetMDAIDACoverageAndConsumption", _dashboardController["default"].GetMDAIDACoverageAndConsumption).post("/GetMdaTasActivityStatus", _dashboardController["default"].GetMdaTasActivityStatus).post("/GetMMDPGraph", _dashboardController["default"].GetMMDPGraph).post("/GetFilariaUnitPerformance", _dashboardController["default"].GetFilariaUnitPerformance).post("/GetAlertsForUser", _dashboardController["default"].GetAlertsForUser);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=dashboardRoutes.js.map
