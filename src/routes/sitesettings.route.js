import { check, query } from "express-validator";
import sitesettingsController from "../controllers/siteSettings.controller";
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
	.post("/create", sitesettingsController.create)
	.get("/list", sitesettingsController.getsiteSettings)
	.get("/getOne/:id", sitesettingsController.getsiteSettings)
	.put(
		"/update",
		[check("id").exists().withMessage(label.SETTINGS_REQUIRED)],
		sitesettingsController.create
	)
	.delete(
		"/delete",
		[query("id").exists().withMessage(label.SETTINGS_REQUIRED)],
		sitesettingsController.deletesiteSettings
	);
export default router;
