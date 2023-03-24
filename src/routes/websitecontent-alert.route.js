import { check, query } from "express-validator";
import websiteContentAlertController from "../controllers/websitecontent-alert.controller";
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
	.post("/create", websiteContentAlertController.create)
	.get("/list", websiteContentAlertController.getAlert)
	.put(
		"/update",
		[check("id").exists().withMessage(label.ALERTID_REQUIRED)],
		websiteContentAlertController.create
	)
	.delete(
		"/delete",
		[query("id").exists().withMessage(label.ALERTID_REQUIRED)],
		websiteContentAlertController.deleteAlert
	);
export default router;
