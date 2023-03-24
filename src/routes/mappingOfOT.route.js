import { check, param, query } from "express-validator";
import mappingOfOT from "../controllers/mappingOfOT.controller";
import bulkMappingOfOTController from "../controllers/mappingofOTbulk.controller";
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
	.post("/create", mappingOfOT.create)
	.get("/list", mappingOfOT.getmappingOfOT)
	.get(
		"/getone",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		mappingOfOT.getmappingOfOT
	)
	.put(
		"/update",
		[check("id").exists().withMessage(label.MISSING_REQUIRED)],
		mappingOfOT.create
	)
	.delete(
		"/delete",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		mappingOfOT.deletemappingOfOT
	)
	.delete(
		"/deletesurgeon",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		mappingOfOT.deletemappingOfOTSurg
	)

	.post(
		"/bulkCreate",bulkMappingOfOTController.bulkCreate
	)
export default router;
