import HydroceleOpsMisMtrReportController from "../controllers/HydroceleOpsMisMtrReportController";
import express from "express";
import SchemaValidator from "../validations/SchemaValidator";
const validateRequestBody = SchemaValidator("body");

const router = express.Router();
router
    .post("/getHydroceleOpsMisMtrReport", validateRequestBody, HydroceleOpsMisMtrReportController.getHydroceleOpsMisMtrReportController)

export default router;
