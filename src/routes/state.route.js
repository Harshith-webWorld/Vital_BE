import { check, query } from "express-validator";
import stateController from "../controllers/states.controller";
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
	.post("/create", stateController.create)
	.get("/list", stateController.getState)
	.get("/getOne/:id", stateController.getState)
	.put(
		"/update",
		[check("id").exists().withMessage(label.STATEID_REQUIRED)],
		stateController.create
	)
	.delete(
		"/delete",
		[query("id").exists().withMessage(label.STATEID_REQUIRED)],
		stateController.deleteState
	);
export default router;
