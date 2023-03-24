import YearwiseMisMtrReportController from "../controllers/YearwiseMisMtrReportController";
import express from "express";
import SchemaValidator from "../validations/SchemaValidator";
const validateRequestBody = SchemaValidator("body");

const router = express.Router();
router
    .post("/getYearwiseMisMtrReport", validateRequestBody, YearwiseMisMtrReportController.getYearwiseMisMtrReportController)

export default router;
