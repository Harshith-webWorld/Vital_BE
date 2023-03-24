import { check, query } from "express-validator";
import mdaIECActivitiesController from "../controllers/mdaIECActivities.controller";
import bulkMdaIECActivitiesController from "../controllers/mdalECActivitiesBulk.controller";
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
	.post("/create", mdaIECActivitiesController.create)
	.post("/bulkcreate", mdaIECActivitiesController.bulkCreate)
	.get("/list", mdaIECActivitiesController.getMdaIECActivities)
    .get(
		"/getone",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		mdaIECActivitiesController.getMdaIECActivities
	)
	.put(
		"/update",
		[check("id").exists().withMessage(label.MISSING_REQUIRED)],
		mdaIECActivitiesController.create
	)
	.delete(
		"/delete",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		mdaIECActivitiesController.deleteMdaIECActivities
	)

	.post(
		"/bulkCreate",bulkMdaIECActivitiesController.bulkCreate
	)
export default router;
