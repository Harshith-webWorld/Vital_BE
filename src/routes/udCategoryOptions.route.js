import { check, query } from "express-validator";
import udCategoryOptionsController from "../controllers/udCategoryOptions.controller";
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
	.get("/list", udCategoryOptionsController.getUdCategoryOptions)
	.get(
		"/list",
		[query("categoryCode").exists().withMessage(label.MISSING_REQUIRED)],
		udCategoryOptionsController.getUdCategoryOptions
    )
export default router;
