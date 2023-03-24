import { check, param, query } from "express-validator";
import hydrocelectomyOperations from "../controllers/hydrocelectomyOperations.controller";
import express from "express";
import label from "../../config/resources"
import SchemaValidator from "../validations/SchemaValidator";
const validateRequestBody = SchemaValidator("body");
const validateRequestQuery = SchemaValidator("query");

const router = express.Router();
router
	.post("/create",
		validateRequestBody,
		hydrocelectomyOperations.create)
	.post(
		"/bulkCreate",
		validateRequestBody,
		hydrocelectomyOperations.bulkCreate
	)
	.get("/list", 
	hydrocelectomyOperations.get)
	.get(
		"/getone",
		validateRequestQuery,
		// [query("id").exists().withMessage(label.MISSING_REQUIRED)],
		hydrocelectomyOperations.get
	)
	.put(
		"/update",
		validateRequestBody,
		// [check("id").exists().withMessage(label.MISSING_REQUIRED)],
		hydrocelectomyOperations.update
	)
	.delete(
		"/delete",
		validateRequestQuery,
		// [query("id").exists().withMessage(label.MISSING_REQUIRED)],
		hydrocelectomyOperations.deleteEntry
	)

export default router;
