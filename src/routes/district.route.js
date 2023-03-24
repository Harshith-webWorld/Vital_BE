import { check, query } from "express-validator";
import districtController from "../controllers/district.controller";
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
	.post("/create", districtController.create)
	.get("/list", districtController.getDistrict)
	.get(
		"/get",
		[check("stateId").exists().withMessage(label.DISTRICTID_REQUIRED)],
		districtController.getDistrict
	)
	.put(
		"/update",
		[check("id").exists().withMessage(label.DISTRICTID_REQUIRED)],
		districtController.create
	)
	.delete(
		"/delete",
		[query("id").exists().withMessage(label.DISTRICTID_REQUIRED)],
		districtController.deleteDistrict
	);
export default router;
