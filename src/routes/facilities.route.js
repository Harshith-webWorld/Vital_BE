import { check, query } from "express-validator";
import facilityController from "../controllers/facilities.controller";
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
	.post("/create", facilityController.create)
	.get("/list", facilityController.getFacility)
	.post("/list", facilityController.getFacility)
	.get(
		"/get",
		[query("districtId").exists().withMessage(label.FACILITYID_REQUIRED)],
		facilityController.getFacility)
	.get(
		"/getone",
		[query("id").exists().withMessage(label.FACILITYID_REQUIRED)],
		facilityController.getFacility)
	.get(
		"/filter",
		[query("facilityType").exists().withMessage(label.FACILITYID_REQUIRED)],
		facilityController.getFacility)
	.put(
		"/update",
		[check("id").exists().withMessage(label.FACILITYID_REQUIRED)],
		facilityController.create
	)
	.delete(
		"/delete",
		[query("id").exists().withMessage(label.FACILITYID_REQUIRED)],
		facilityController.deleteFacility
	);
export default router;
