import FSUZoneReportController from "../controllers/FSUZoneReportController";
import express from "express";
import SchemaValidator from "../validations/SchemaValidator";
const validateRequestBody = SchemaValidator("body");

const router = express.Router();
router
    .post("/getFSUZoneReport", validateRequestBody, FSUZoneReportController.getFSUZoneReportController)

export default router;
