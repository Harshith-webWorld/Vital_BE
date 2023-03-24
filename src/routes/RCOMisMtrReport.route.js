import RCOMisMtrReportController from "../controllers/RCOMisMtrReportController";
import express from "express";
import SchemaValidator from "../validations/SchemaValidator";
const validateRequestBody = SchemaValidator("body");

const router = express.Router();
router
    .post("/getRCOMisMtrReport", validateRequestBody, RCOMisMtrReportController.getRCOMisMtrReportController)

export default router;
