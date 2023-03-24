import { check, query } from "express-validator";
import lHLineListController from "../controllers/Lymphedema-LHLineList.controller";
import bulklHLineListController from "../controllers/Lymphedemabulk-LHLineLis.controller";

import express from "express";
import label from "../../config/resources";

const router = express.Router();
router
	.post("/create", lHLineListController.create)
	.get("/list", lHLineListController.getLHLineList)
	.get(
		"/getone",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		lHLineListController.getLHLineList
	)
	.put(
		"/update",
		[check("id").exists().withMessage(label.MISSING_REQUIRED)],
		lHLineListController.create
	)
	.delete(
		"/delete",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		lHLineListController.deleteLHLineList
	)

	.post(
		"/savePatientInformation",
		lHLineListController.postPatientInformation
	)
	.put(
		"/updatePatientInformation/:id",
		lHLineListController.postPatientInformation
	)
	.get("/getPatientInfo/:id", lHLineListController.getPatientInfo)
	.post("/saveSurvey", lHLineListController.postSurvey)
	.get(
		"/getSurveyList/:lymphedemaLineListId",
		lHLineListController.getSurveyList
	)
	.post("/saveLfFollowup", lHLineListController.postLFFollowups)
	.get(
		"/getLFFollowups/:lymphedemaLineListId",
		lHLineListController.getLFFollowups
	)
	.post("/saveHFFollowup", lHLineListController.postHFFollowups)
	.get(
		"/getHFFollowups/:lymphedemaLineListId",
		lHLineListController.getHFFollowups
	)
	.delete("/deleteHFFollowup/:id", lHLineListController.deleteHFFollowup)
	.delete("/deleteLFFollowup/:id", lHLineListController.deleteLFFollowup)
	.delete("/deleteSurvey/:id", lHLineListController.deleteSurvey)
	.post("/bulkcreate", bulklHLineListController.bulkcreate);

export default router;
