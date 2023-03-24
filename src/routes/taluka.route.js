import { check, query } from "express-validator";
import talukaController from "../controllers/taluka.controller";
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
	.post("/create", talukaController.create)
	.get("/list", talukaController.getTaluka)
	.get(
		"/get",
		[query("districtId").exists().withMessage(label.TALUKAID_REQUIRED)],
		talukaController.getTaluka
	)
	.put(
		"/update",
		[check("id").exists().withMessage(label.TALUKAID_REQUIRED)],
		talukaController.create
	)
	.delete(
		"/delete",
		[query("id").exists().withMessage(label.TALUKAID_REQUIRED)],
		talukaController.deleteTaluka
	);
export default router;
