import { check, query } from "express-validator";
import subCenterController from "../controllers/subcenter.controller";
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
	.post("/create", subCenterController.create)
	.get("/list", subCenterController.getSubcenter)
	.get(
		"/get", 
		[check("facilityId").exists().withMessage(label.SUBCENTERID_REQUIRED)],
		subCenterController.getSubcenter)
	.put(
		"/update",
		[check("id").exists().withMessage(label.SUBCENTERID_REQUIRED)],
		subCenterController.create
	)
	.delete(
		"/delete",
		[query("id").exists().withMessage(label.SUBCENTERID_REQUIRED)],
		subCenterController.deleteSubcenter
	);
export default router;
