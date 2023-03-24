import { check, query } from "express-validator";
import MMDPKitsReportController from "../controllers/MMDPKitsReportController";
import express from "express";
import label from "../../config/resources";
import SchemaValidator from "../validations/SchemaValidator";
const validateRequestBody = SchemaValidator("body");

const router = express.Router();
router
    .post("/getMMDPKitsReport", validateRequestBody, MMDPKitsReportController.getMMDPKitsReportController)

export default router;
