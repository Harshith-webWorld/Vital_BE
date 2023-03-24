import { check, query } from "express-validator";
import activitiesController from "../controllers/activities.controller";
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
    .post("/create", activitiesController.create)
	.get("/list", activitiesController.getActivities)
	.get(
		"/getone",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		activitiesController.getActivities
    )
export default router;
