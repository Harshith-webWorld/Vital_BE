import EntomologicalMisMtrReportController from "../controllers/EntomologicalMisMtrReportController";
import express from "express";
import SchemaValidator from "../validations/SchemaValidator";
const validateRequestBody = SchemaValidator("body");

const router = express.Router();
router
    .post("/getEntomologicalMisMtrReport", validateRequestBody, EntomologicalMisMtrReportController.getEntologicalMisMtrReportController)

export default router;
