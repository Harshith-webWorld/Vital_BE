import { check, query } from "express-validator";
import entomologicalLarvicalListController from "../controllers/entomologicalLarvicidalList.controller";
import bulkEntomologicalLarvicidalListController from "../controllers/entomologicalLarvicidalListBulk.controller";
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
	.post("/create", entomologicalLarvicalListController.create)
	.get("/list", entomologicalLarvicalListController.getEntomologicalLarvicidalList)
    .get(
		"/getone",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		entomologicalLarvicalListController.getEntomologicalLarvicidalList
	)
	.put(
		"/update",
		[check("id").exists().withMessage(label.DISTRICTID_REQUIRED)],
		entomologicalLarvicalListController.create
	)
	.delete(
		"/delete",
		[query("id").exists().withMessage(label.DISTRICTID_REQUIRED)],
		entomologicalLarvicalListController.deletEntomologicalLarvicidalList
	)
	.delete(
		"/deleteCounts",
		[query("id").exists().withMessage(label.DISTRICTID_REQUIRED)],
		entomologicalLarvicalListController.deletEntomologicalDataCounts
	)

	.post(
		"/bulkCreate",bulkEntomologicalLarvicidalListController.bulkCreate
	)
export default router;
