import { check, query } from "express-validator";
import fsuTargetAchivementsController from "../controllers/fsuTargetAchievements.controller";
import bulkFsuTargetAchivementsController from "../controllers/fsuTargetAchievementsBulk.controller";
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
	.post("/createFsuTargetAchivements", fsuTargetAchivementsController.createFsuTargetAchivements)
	.get("/listFsuTargetAchivements", fsuTargetAchivementsController.getFsuTargetAchivements)
	.get(
		"/getoneFsuTargetAchivements",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		fsuTargetAchivementsController.getFsuTargetAchivements
	)
	.put(
		"/updateFsuTargetAchivements",
		[check("id").exists().withMessage(label.MISSING_REQUIRED)],
		fsuTargetAchivementsController.createFsuTargetAchivements
	)
	.delete(
		"/deleteFsuTargetAchivements",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		fsuTargetAchivementsController.deleteFsuTargetAchivements
	)
	.post("/createFsuTargetAchievementsSurveys", fsuTargetAchivementsController.createFsuTargetAchievementsSurveys)
	.get("/listFsuTargetAchievementsSurveys", fsuTargetAchivementsController.getFsuTargetAchievementsSurveys)
	.get(
		"/getoneFsuTargetAchievementsSurveys",
		[query("fsuTargetAchievementId").exists().withMessage(label.MISSING_REQUIRED)],
		fsuTargetAchivementsController.getFsuTargetAchievementsSurveys
	)
	.put(
		"/updateFsuTargetAchievementsSurveys",
		[check("fsuTargetAchievementId").exists().withMessage(label.MISSING_REQUIRED)],
		fsuTargetAchivementsController.createFsuTargetAchievementsSurveys
	)
	.delete(
		"/deleteFsuTargetAchievementsSurveys",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		fsuTargetAchivementsController.deletefsuTargetAchievementsSurveys
	)



	.post(
		"/bulkCreateFsuTargetAchivements",bulkFsuTargetAchivementsController.bulkCreateFsuTargetAchivements
	)

	.post(
		"/bulkCreateFsuTargetAchievementsSurveys",bulkFsuTargetAchivementsController.bulkCreateFsuTargetAchievementsSurveys
	)
export default router;
