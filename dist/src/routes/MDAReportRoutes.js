"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressValidator = require("express-validator");

var _MDAReportController = _interopRequireDefault(require("../controllers/MDAReportController"));

var _express = _interopRequireDefault(require("express"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var router = _express["default"].Router();

router.post("/get_MDATrainingStatus1", _MDAReportController["default"].get_MDATrainingStatus1).post("/coverageReport1", _MDAReportController["default"].coverageReport1).post("/infrastructure", _MDAReportController["default"].infrastructure).post("/analysis1_postMDAEvaluation", _MDAReportController["default"].analysis1_postMDAEvaluation).post("/analysis2_postMDAEvaluation", _MDAReportController["default"].analysis2_postMDAEvaluation).post("/get_Co_ordinationCommitteReport", _MDAReportController["default"].get_Co_ordinationCommitteReport).post("/DrugRequirementMDA1", _MDAReportController["default"].DrugRequirementMDA1).post("/DrugRequirementMDA2", _MDAReportController["default"].DrugRequirementMDA2).post("/DrugStockAtPHC", _MDAReportController["default"].DrugStockAtPHC).post("/DrugAdminSupervisorAvailability", _MDAReportController["default"].DrugAdminSupervisorAvailability).post("/PhcHrAndTrainingStatus", _MDAReportController["default"].PhcHrAndTrainingStatus).post("/PHCwiseDrugConsumption", _MDAReportController["default"].PHCwiseDrugConsumption).post("/BifurcationOfRegularAndMopup", _MDAReportController["default"].BifurcationOfRegularAndMopup).post("/ExpenditureBalanceReceivedFunds", _MDAReportController["default"].ExpenditureBalanceReceivedFunds).post("/postMDAEvalList", _MDAReportController["default"].postMDAEvalListDropdown).post("/ProposalWithdrawalOfMDA", _MDAReportController["default"].ProposalWithdrawalOfMDA);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=MDAReportRoutes.js.map
