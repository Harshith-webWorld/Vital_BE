import { check, query } from "express-validator";
import corporationController from "../controllers/corporation.controller";
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
	.post("/create", corporationController.create)
	.get("/list", corporationController.getCorporation)
	.get(
		"/get",
		[query("districtId").exists().withMessage(label.CORPORATIONID_REQUIRED)],
		corporationController.getCorporation
	)
	.put(
		"/update",
		[check("id").exists().withMessage(label.CORPORATIONID_REQUIRED)],
		corporationController.create
	)
	.delete(
		"/delete",
		[query("id").exists().withMessage(label.CORPORATIONID_REQUIRED)],
		corporationController.deleteCorporation
	);
export default router;
