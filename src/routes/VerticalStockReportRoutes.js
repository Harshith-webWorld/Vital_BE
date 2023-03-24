import { check, query } from "express-validator";
import VerticalStockReportController from "../controllers/VerticalStockReportController";
import express from "express";
import label from "../../config/resources";

const router = express.Router();
router

    .post("/VerticalStockAnalysis", VerticalStockReportController.VerticalStockAnalysis)
    .post("/vspMonthlyVacancyStatus", VerticalStockReportController.vspMonthlyVacancyStatus)

    .post("/vspTrainingStatus", VerticalStockReportController.vspTrainingStatus)
    .post("/vspAvailabilityConsumptionLabmaterials", VerticalStockReportController.vspAvailabilityConsumptionLabmaterials)
   
    


export default router;
