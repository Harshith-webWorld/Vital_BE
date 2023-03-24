import { check, query } from "express-validator";
import userRoleScreenActivitiesController from "../controllers/userRoleScreenActivities.controller";
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
    .post("/create", userRoleScreenActivitiesController.create)
	.get("/list", userRoleScreenActivitiesController.getUserRoleScreenActivities)
	.get(
		"/getone/:id",
		userRoleScreenActivitiesController.getUserRoleScreenActivities
    )
	.get(
		"/getuser/:id",
		userRoleScreenActivitiesController.getUser
    )
export default router;
