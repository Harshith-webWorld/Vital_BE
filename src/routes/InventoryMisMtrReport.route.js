import InventoryMisMtrController from "../controllers/InventoryMisMtrReportController";
import express from "express";
import SchemaValidator from "../validations/SchemaValidator";
const validateRequestBody = SchemaValidator("body");

const router = express.Router();
router
    .post("/getInventoryMisMtrReport", validateRequestBody, InventoryMisMtrController.getInventoryMisMtrReportController)

export default router;
