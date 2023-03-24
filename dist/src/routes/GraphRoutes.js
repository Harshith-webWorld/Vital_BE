"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _GraphContoller = _interopRequireDefault(require("../controllers/GraphContoller"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/GetMMDPDetailsInPercentage", _GraphContoller["default"].GetMMDPDetailsInPercentage).post("/GetEndemicityGraphAllDistricts", _GraphContoller["default"].GetEndemicityGraphAllDistricts).post("/GetEndemicityGraphAllTaluksByDistrict", _GraphContoller["default"].GetEndemicityGraphAllTaluksByDistrict).post("/GetMFEndemicityGraphAllDistricts", _GraphContoller["default"].GetMFEndemicityGraphAllDistricts).post("/GetMFEndemicityGraphMFPosetive", _GraphContoller["default"].GetMFEndemicityGraphMFPosetive).post("/GetMFEndemicityGraphBSCollected", _GraphContoller["default"].GetMFEndemicityGraphBSCollected).post("/GetMFEndemicityGraphBSExamined", _GraphContoller["default"].GetMFEndemicityGraphBSExamined).post("/GetMFEndemicityGraphMfRate", _GraphContoller["default"].GetMFEndemicityGraphMfRate).post("/GetEndemicityTrendGraphAllDistricts", _GraphContoller["default"].GetEndemicityTrendGraphAllDistricts).post("/GetEndemicityTrendGraphByDistrict", _GraphContoller["default"].GetEndemicityTrendGraphByDistrict).post("/GetEndemicityTrendGraphAllDistrictsNoOfLFCases", _GraphContoller["default"].GetEndemicityTrendGraphAllDistrictsNoOfLFCases).post("/GetEndemicityTrendGraphAllDistrictsNoOfHydroceleCases", _GraphContoller["default"].GetEndemicityTrendGraphAllDistrictsNoOfHydroceleCases).post("/GetEndemicityTrendGraphAllDistrictsNoOfPersons", _GraphContoller["default"].GetEndemicityTrendGraphAllDistrictsnoOfPersons).post("/GetEndemicityTrendGraphByDistrictNoOfLFCases", _GraphContoller["default"].GetEndemicityTrendGraphByDistrictNoOfLFCases).post("/GetEndemicityTrendGraphByDistrictNoOfHydroceleCases", _GraphContoller["default"].GetEndemicityTrendGraphByDistrictNoOfHydroceleCases).post("/GetEndemicityTrendGraphByDistrictNoOfPersons", _GraphContoller["default"].GetEndemicityTrendGraphByDistrictNoOfPersons).post("/GetLFCasesGraphDistwise", _GraphContoller["default"].GetLFCasesDistwise).post("/GetHydroceleCasesGraphDistwise", _GraphContoller["default"].GetHydroceleCasesDistwise).post("/GetHydroceleOperatedGraphDistwise", _GraphContoller["default"].GetHydroceleOperated).post("/GetPendingApprovalMOGraphDistwise", _GraphContoller["default"].GetPendingApprovalMODistwise);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=GraphRoutes.js.map
