import { check, query } from "express-validator";
import verticalControlUnitsController from "../controllers/verticalControlUnits.controller";
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
	.get("/listVerticalControlUnits", verticalControlUnitsController.getverticalControlUnits)
	.post("/createverticalControlUnits", verticalControlUnitsController.createverticalControlUnits)
	.get("/createverticalControlFieldUnits", verticalControlUnitsController.createverticalControlFieldUnits)
	.get(
		"/getoneVerticalControlUnits",
		[query("id").exists(),
		query("unitType").exists()],
		verticalControlUnitsController.getverticalControlUnits
	)
	.get("/listVerticalControlFieldUnits", verticalControlUnitsController.getverticalControlFieldUnits)
	.get(
		"/getoneVerticalControlFieldUnits",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		verticalControlUnitsController.getverticalControlFieldUnits
	)
	.put(
		"/update",
		[check("id").exists().withMessage(label.MISSING_REQUIRED)],
		verticalControlUnitsController.createverticalControlUnits
	)
export default router;
