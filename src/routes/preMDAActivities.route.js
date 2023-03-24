import { check, query } from "express-validator";
import preMDAActivitiesController from "../controllers/preMDAActivites.controller";
import bulkpreMDAActivitiesController from "../controllers/preMDAActivitiesBulk.controller";
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
    .post("/createAllPreMDAActivities", preMDAActivitiesController.createAllPreMDAActivity)
	.post("/createPreMDAActivities", preMDAActivitiesController.createPreMDAActivities)
	.get("/listPreMDAActivities", preMDAActivitiesController.getPreMDAActivities)
	.get(
		"/getonePreMDAActivities/:id",
		preMDAActivitiesController.getPreMDAActivities
	)
	.put(
		"/updatePreMDAActivities",
		[check("id").exists().withMessage(label.MISSING_REQUIRED)],
		preMDAActivitiesController.createPreMDAActivities
	)
	.delete(
		"/deletePreMDAActivityDrugAdministrators",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		preMDAActivitiesController.deletepreMDAActivityDrugAdministrators
	)
	.delete(
		"/deletePreMDAActivitySupervisors",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		preMDAActivitiesController.deletepreMDAActivitySupervisors
	)
	.delete(
		"/deletePreMDAActivities",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		preMDAActivitiesController.deletePreMDAActivities
	)
	.post("/createPreMDAActivityDrugLogistics", preMDAActivitiesController.createPreMDAActivityDrugLogistics)
	.get("/listPreMDAActivityDrugLogistics/:preMDAActivityId", preMDAActivitiesController.getAllPreMDAActivityDrugLogistics)
	.get("/listPreMDAActivityDrugLogistics", preMDAActivitiesController.getPreMDAActivityDrugLogistics)
	.get(
		"/getonePreMDAActivityDrugLogistics/:id", preMDAActivitiesController.getPreMDAActivityDrugLogistics
	)
	.put(
		"/updatePreMDAActivityDrugLogistics",
		[check("id").exists().withMessage(label.MISSING_REQUIRED)],
		preMDAActivitiesController.createPreMDAActivityDrugLogistics
	)
	.delete(
		"/deletePreMDAActivityDrugLogistics",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		preMDAActivitiesController.deletePreMDAActivityDrugLogistics
	)

	.post("/bulkCreate", bulkpreMDAActivitiesController.bulkCreate)
	//.post("/bulkCreatePreMDAActivityDrugLogistics", bulkpreMDAActivitiesController.bulkCreatePreMDAActivityDrugLogistics)

export default router;
