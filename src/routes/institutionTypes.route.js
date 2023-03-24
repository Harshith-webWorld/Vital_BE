import { check, query } from "express-validator";
import institutionTypesController from "../controllers/institutionTypes.controller";
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
    .post("/create", institutionTypesController.create)
	.get("/list", institutionTypesController.getInstitutionTypes)
	.get(
		"/getone",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		institutionTypesController.getInstitutionTypes
    )
export default router;
