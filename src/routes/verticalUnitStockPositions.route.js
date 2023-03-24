import { check, query } from "express-validator";
import verticalUnitController from "../controllers/verticalUnitStockPositions.controller";
import bulkVerticalUnitController from "../controllers/verticalUnitStockPositionsbulk.controller";
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
	.post("/create", verticalUnitController.create)
	.post("/bulkcreate", verticalUnitController.bulkCreate)
	.get("/list", verticalUnitController.getVerticalUnit)
	.get(
		"/getone",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		verticalUnitController.getVerticalUnit
	)
	.put(
		"/update",
		[check("id").exists().withMessage(label.MISSING_REQUIRED)],
		verticalUnitController.create
	)
	.delete(
		"/delete",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		verticalUnitController.deleteVerticalUnit
	)

	.post(
		"/bulkcreates",bulkVerticalUnitController.bulkCreate
	)
export default router;
