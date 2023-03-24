import FCUMisMtrReportController from "../controllers/FCUMisMtrReportController";
import express from "express";
import SchemaValidator from "../validations/SchemaValidator";
const validateRequestBody = SchemaValidator("body");

const router = express.Router();
router
    .post("/getFCUMisMtrReport", validateRequestBody, FCUMisMtrReportController.getFCUMisMtrReportController)

export default router;
