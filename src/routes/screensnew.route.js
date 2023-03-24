import { check, query } from "express-validator";
import screensnewController from "../controllers/screensnew.controller";
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
    .post("/create", screensnewController.create)
	.get("/list", screensnewController.getScreens)
	.get(
		"/getone",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		screensnewController.getScreens
    )
export default router;
