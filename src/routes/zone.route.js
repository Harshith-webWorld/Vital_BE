import { check, query } from "express-validator";
import zoneController from "../controllers/zone.controller";
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
	.post("/create", zoneController.create)
	.get("/list", zoneController.getZone)
	.get("/get", 
		[check("districtId").exists().withMessage(label.ZONEID_REQUIRED)], 
		zoneController.getZone)
	.put(
		"/update",
		[check("id").exists().withMessage(label.ZONEID_REQUIRED)],
		zoneController.create
	)
	.delete(
		"/delete",
		[query("id").exists().withMessage(label.ZONEID_REQUIRED)],
		zoneController.deleteZone
	);
export default router;
