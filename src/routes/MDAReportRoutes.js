import { check, query } from "express-validator";
import MDAReportController from "../controllers/MDAReportController";
import express from "express";
import label from "../../config/resources";

const router = express.Router();
router

    .post("/get_MDATrainingStatus1", MDAReportController.get_MDATrainingStatus1)
    .post("/coverageReport1", MDAReportController.coverageReport1)
    .post("/infrastructure", MDAReportController.infrastructure)
    .post("/analysis1_postMDAEvaluation", MDAReportController.analysis1_postMDAEvaluation)
    .post("/analysis2_postMDAEvaluation", MDAReportController.analysis2_postMDAEvaluation)
    .post("/get_Co_ordinationCommitteReport", MDAReportController.get_Co_ordinationCommitteReport)
    .post("/DrugRequirementMDA1", MDAReportController.DrugRequirementMDA1)
    .post("/DrugRequirementMDA2", MDAReportController.DrugRequirementMDA2)
    .post("/DrugStockAtPHC", MDAReportController.DrugStockAtPHC)
    .post("/DrugAdminSupervisorAvailability", MDAReportController.DrugAdminSupervisorAvailability)
    .post("/PhcHrAndTrainingStatus", MDAReportController.PhcHrAndTrainingStatus)
    .post("/PHCwiseDrugConsumption", MDAReportController.PHCwiseDrugConsumption)
    .post("/BifurcationOfRegularAndMopup", MDAReportController.BifurcationOfRegularAndMopup)
    .post("/ExpenditureBalanceReceivedFunds", MDAReportController.ExpenditureBalanceReceivedFunds)
    .post("/postMDAEvalList", MDAReportController.postMDAEvalListDropdown)
    .post("/ProposalWithdrawalOfMDA", MDAReportController.ProposalWithdrawalOfMDA)






export default router;
