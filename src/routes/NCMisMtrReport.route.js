import NCMisMtrReportController from "../controllers/NCMisMtrReportController";
import express from "express";
import SchemaValidator from "../validations/SchemaValidator";
const validateRequestBody = SchemaValidator("body");

const router = express.Router();
router
    .post("/getNCMisMtrReport", validateRequestBody, NCMisMtrReportController.getNCMisMtrReportController)

export default router;
