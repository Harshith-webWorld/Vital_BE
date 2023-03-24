import { check, query } from "express-validator";
import evalListController from "../controllers/postMDAEvalList.controller";
import bulkevalListController from "../controllers/postMDAEvalListbulk.controller";

import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
	.post("/create", evalListController.create)
	.get("/list", evalListController.getEvalList)
	.get(
		"/getone",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		evalListController.getEvalList
	)
	.put(
		"/update",
		[check("id").exists().withMessage(label.MISSING_REQUIRED)],
		evalListController.create
	)
	.delete(
		"/delete",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		evalListController.deleteEvalList
	)
	.delete(
		"/deleteEvalListPersons",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		evalListController.deletePostMDAEvalListPersons
	)
	.delete(
		"/deleteEvalListFmembers",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		evalListController.deletePostMDAEvalListFMembers
	)


	
	///bulk create 
	.post("/bulkcreate", bulkevalListController.bulkCreate);

export default router;
