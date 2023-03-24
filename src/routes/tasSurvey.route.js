import { check, query } from "express-validator";
import surveyController from "../controllers/tasSurvey.controller";
import bulkSurveyController from "../controllers/tasSurveyBulk.controller";
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
    .post("/createAllTasSurvey", surveyController.createAllTasSurvey)
	.post("/create", surveyController.create)
	.get("/list", surveyController.getSurvey)
	.get(
		"/getone",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		surveyController.getSurvey
	)
	.put(
		"/update",
		[check("id").exists().withMessage(label.MISSING_REQUIRED)],
		surveyController.create
	)
	.delete(
		"/delete",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		surveyController.deleteSurvey
	)
	.post("/createTasSurveyChildrens", surveyController.createTasSurveyChildrens)
	.get("/listTasSurveyChildrens", surveyController.getTasSurveyChildrens)
	.get(
		"/getoneTasSurveyChildrens",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)||(query("tasSurveyId").exists().withMessage(label.MISSING_REQUIRED))],
		surveyController.getTasSurveyChildrens
	)
	.put(
		"/updateTasSurveyChildrens",
		[check("id").exists().withMessage(label.MISSING_REQUIRED)],
		surveyController.createTasSurveyChildrens
	)
	.delete(
		"/deleteTasSurveyChildrens",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		surveyController.deleteTasSurveyChildrens
	)


	.post(
		"/bulkCreate",bulkSurveyController.bulkCreate
	)
export default router;
