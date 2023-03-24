import { check, query } from "express-validator";
import FSURepotController from "../controllers/FSURepotController";
import express from "express";
import label from "../../config/resources";

const router = express.Router();
router
   
    .post("/get_FSUAnalysis1", FSURepotController.get_FSUAnalysis1List)
    .post("/get_FSUAnalysis2", FSURepotController.get_FSUAnalysis2List)
    .post("/get_FSUAnalysis3", FSURepotController.get_FSUAnalysis3List)
    .post("/get_FSUAnalysis4", FSURepotController.get_FSUAnalysis4List)
    .post("/get_FSUAnalysis5", FSURepotController.get_FSUAnalysis5List)
    .post("/FSUPercentageTargetCompleted", FSURepotController.fsuPercentageTargetCompleted)





export default router;
