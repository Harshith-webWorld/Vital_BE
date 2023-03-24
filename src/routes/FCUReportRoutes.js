import { check, query } from "express-validator";
import FCUReportController from "../controllers/FCUReportController";
import express from "express";
import label from "../../config/resources";

const router = express.Router();
router
   
    .post("/get_FCUAnalysis1", FCUReportController.get_FCUAnalysis1List)
    .post("/get_FCUAnalysis2", FCUReportController.get_FCUAnalysis2List)
    .post("/get_FCUAnalysis4", FCUReportController.get_FCUAnalysis4List)
    .post("/get_FCUAnalysis5", FCUReportController.get_FCUAnalysis5List)
    .post("/get_FCUAnalysis6", FCUReportController.get_FCUAnalysis6List)
    .post("/get_FCUAnalysis10", FCUReportController.get_FCUAnalysis10List)
    .post("/get_FCUAnalysis7", FCUReportController.get_FCUAnalysis7List)
    .post("/get_FCUAnalysis8", FCUReportController.get_FCUAnalysis8List)


  



export default router;
