import { check, query } from "express-validator";
import entomologyReportController from "../controllers/entomologyReportController";
import express from "express";
import label from "../../config/resources";

const router = express.Router();
router

    .post("/LarvicidalReport1", entomologyReportController.LarvicidalReport1)
    .post("/NFCUReportEntomology1", entomologyReportController.NFCUReportEntomology1)
    .post("/AdditionalEntomologicalReport", entomologyReportController.AdditionalEntomologicalReport)
    .post("/BaselineEntomoligicalReport", entomologyReportController.BaselineEntomoligicalReport)
    .post("/LarvalDensityReport", entomologyReportController.LarvalDensityReport )
    .post("/NFCUMosquitoDisectionReport", entomologyReportController.NFCUMosquitoDisectionReport )



   



export default router;
