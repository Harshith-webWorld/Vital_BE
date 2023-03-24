import { check, query } from "express-validator";
import MFReportController from "../controllers/MFReportController";
import express from "express";
import label from "../../config/resources";

const router = express.Router();
router
   
    .post("/get_AdditionalMFSurveyReportList", MFReportController.get_AdditionalMFSurveyReportList)
    .post("/get_MFBaseLineSurveyList", MFReportController.get_MFBaseLineSurveyList)

    .post("/get_DiseaseRateVillagewise", MFReportController.DiseaseRate_Villagewise)



export default router;
