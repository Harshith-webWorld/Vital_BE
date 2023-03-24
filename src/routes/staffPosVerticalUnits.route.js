import { check, param, query } from "express-validator";
import staffPosVerticalUnits from "../controllers/staffPosVerticalUnits.controller";
import bulkstaffPosVerticalUnits from "../controllers/staffPosVerticalUnitsbulk.controller";
import express from "express";
import label from "../../config/resources";

const router = express.Router();
router
	.post(
		"/createStaffPosVerticalUnits",
		staffPosVerticalUnits.createStaffPosVerticalUnits
	)
	.post(
		"/createAllStaffPosVerticalUnits" ,staffPosVerticalUnits.createAllStaffPosVerticalUnits
	)
	.get(
		"/listStaffPosVerticalUnits",
		staffPosVerticalUnits.getStaffPosVerticalUnits
	)
	.get(
		"/getoneStaffPosVerticalUnits",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		staffPosVerticalUnits.getStaffPosVerticalUnits
	)
	.put(
		"/updateStaffPosVerticalUnits",
		[check("id").exists().withMessage(label.MISSING_REQUIRED)],
		staffPosVerticalUnits.createStaffPosVerticalUnits
	)
	.delete(
		"/deleteStaffPosVerticalUnits",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		staffPosVerticalUnits.deleteStaffPosVerticalUnits
	)
	.post(
		"/createStaffPosVerticalTraining",
		staffPosVerticalUnits.createStaffPosVerticalUnitStaffs
	)
	.get(
		"/listStaffPosVerticalTraining/:id",
		staffPosVerticalUnits.getStaffPosVerticalUnitStaffs
	)
	.get(
		"/listStaffPosVerticalTraining",
		staffPosVerticalUnits.getStaffPosVerticalUnitStaffs
	)
	.get(
		"/getoneStaffPosVerticalTraining",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		staffPosVerticalUnits.getStaffPosVerticalUnitStaffs
	)
	.put(
		"/updateStaffPosVerticalTraining",
		[check("id").exists().withMessage(label.MISSING_REQUIRED)],
		staffPosVerticalUnits.createStaffPosVerticalUnitStaffs
	)
	.delete(
		"/deleteStaffPosVerticalTraining",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		staffPosVerticalUnits.deleteStaffPosVerticalUnitStaffs
	)
	.post(
		"/createStaffPosVerticalUnitTrainingStatus",
		staffPosVerticalUnits.createStaffPosVerticalUnitTrainingStatus
	)
	.get(
		"/listStaffPosVerticalUnitTrainingStatus",
		staffPosVerticalUnits.getAllStaffPosVerticalUnitTrainingStatus
	)
	.get(
		"/listStaffPosVerticalUnitTrainingStatus/:id",
		staffPosVerticalUnits.getStaffPosVerticalUnitTrainingStatus
	)
	.get(
		"/getoneStaffPosVerticalUnitTrainingStatus",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		staffPosVerticalUnits.getStaffPosVerticalUnitTrainingStatus
	)
	.put(
		"/updateStaffPosVerticalUnitTrainingStatus",
		[check("id").exists().withMessage(label.MISSING_REQUIRED)],
		staffPosVerticalUnits.createStaffPosVerticalUnitTrainingStatus
	)
	.delete(
		"/deleteStaffPosVerticalUnitTrainingStatus",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		staffPosVerticalUnits.deleteStaffPosVerticalUnitTrainingStatus
	)

	///offline bulk createStaffPosVerticalUnitTrainingStatus

	.post(
		"/bulkCreateStaffPosition",
		bulkstaffPosVerticalUnits.bulkcreateStaffPosVerticalUnits
	)
	.post(
		"/bulkcreateStaffPosVerticalTraining",
		bulkstaffPosVerticalUnits.bulkcreateStaffPosVerticalUnitStaffs
	)
	.post(
		"/bulkcreateStaffPosVerticalUnitTrainingStatus",
		bulkstaffPosVerticalUnits.bulkcreateStaffPosVerticalUnitTrainingStatus
	);
export default router;
