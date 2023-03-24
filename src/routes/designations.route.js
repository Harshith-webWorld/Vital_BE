import { check, query } from "express-validator";
import designationsController from "../controllers/designations.controller";
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
    .post("/create", designationsController.create)
	.get("/list", designationsController.getDesignations)
	.get(
		"/getone",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		designationsController.getDesignations
    )
export default router;
