import { check, query } from "express-validator";
import HydroceleOperationsReportController from "../controllers/HydroceleOperationsReportController";
import express from "express";
import label from "../../config/resources";
import SchemaValidator from "../validations/SchemaValidator";
const validateRequestBody = SchemaValidator("body");

const router = express.Router();
router
    .post("/getHydroceleOperationsReport", validateRequestBody, HydroceleOperationsReportController.getHydroceleOperationsReportController)

export default router;
