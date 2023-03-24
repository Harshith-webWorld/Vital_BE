"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _LFReportController = _interopRequireDefault(require("../controllers/LFReportController"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/get_LF_Analysis1", _LFReportController["default"].getLfAnalysis1).post("/get_LF_Analysis2", _LFReportController["default"].getLfAnalysis2).post("/get_LF_DieseaseCasesList", _LFReportController["default"].get_LF_DieseaseCasesList1).post("/get_LF_HydroceleOPLineList", _LFReportController["default"].get_LF_HydroceleOPLineList).post("/get_LF_PendingHydroceleCases", _LFReportController["default"].get_LF_PendingHydroceleCasesList).post("/get_GradingOfLFPatients", _LFReportController["default"].get_GradingOfLFPatients).post("/get_LF_Analysis3List", _LFReportController["default"].getLfAnalysis3).post("/get_LF_MMDPActivityReporting", _LFReportController["default"].LF_MMDPActivityReporting).post("/get_LF_PatientsineligibleForSurgery", _LFReportController["default"].get_LF_PatientsineligibleForSurgery).post("/VerifiedbyMO", _LFReportController["default"].VerifiedbyMO).post("/LF_PerformanceOfInstitutes", _LFReportController["default"].LF_PerformanceOfInstitutes).post("/LF_PerformanceOfSurgeons", _LFReportController["default"].LF_PerformanceOfSurgeons).post("/PlanningForOT", _LFReportController["default"].PlanningForOT).post("/get_FollowUpservicesToLFpatients", _LFReportController["default"].get_FollowUpservicesToLFpatients).post("/get_FollowUpservicesToHydrocelePatients", _LFReportController["default"].get_FollowUpservicesToHydrocelePatients);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=LFReportRoute.js.map
