import { check, query } from "express-validator";
import LFReportController from "../controllers/LFReportController";
import express from "express";
import label from "../../config/resources";

const router = express.Router();
router
    .post("/get_LF_Analysis1", LFReportController.getLfAnalysis1)
    .post("/get_LF_Analysis2", LFReportController.getLfAnalysis2)
    .post("/get_LF_DieseaseCasesList", LFReportController.get_LF_DieseaseCasesList1)
    .post("/get_LF_HydroceleOPLineList", LFReportController.get_LF_HydroceleOPLineList)
    .post("/get_LF_PendingHydroceleCases", LFReportController.get_LF_PendingHydroceleCasesList)
    .post("/get_GradingOfLFPatients", LFReportController.get_GradingOfLFPatients)
    .post("/get_LF_Analysis3List", LFReportController.getLfAnalysis3)
    .post("/get_LF_MMDPActivityReporting", LFReportController.LF_MMDPActivityReporting)
    .post("/get_LF_PatientsineligibleForSurgery", LFReportController.get_LF_PatientsineligibleForSurgery)
    .post("/VerifiedbyMO", LFReportController.VerifiedbyMO)
    .post("/LF_PerformanceOfInstitutes", LFReportController.LF_PerformanceOfInstitutes)
    .post("/LF_PerformanceOfSurgeons", LFReportController.LF_PerformanceOfSurgeons)
    .post("/PlanningForOT", LFReportController.PlanningForOT)
    .post("/get_FollowUpservicesToLFpatients", LFReportController.get_FollowUpservicesToLFpatients)

    .post("/get_FollowUpservicesToHydrocelePatients", LFReportController.get_FollowUpservicesToHydrocelePatients)








    



export default router;
