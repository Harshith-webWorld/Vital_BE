import { check, query } from "express-validator";
import wardController from "../controllers/ward.controller";
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
	.post("/create", wardController.create)
	.get("/list", wardController.getWard)
	.get("/get", 
		[query("districtId").exists(),
		query("corporationId")],
		wardController.getWard)
	.put(
		"/update",
		[check("id").exists().withMessage(label.WARDID_REQUIRED)],
		wardController.create
	)
	.delete(
		"/delete",
		[query("id").exists().withMessage(label.WARDID_REQUIRED)],
		wardController.deleteWard
	);
export default router;
