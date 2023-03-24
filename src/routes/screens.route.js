import { check, query } from "express-validator";
import screensController from "../controllers/screens.controller";
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
    .post("/create", screensController.create)
	.get("/list", screensController.getScreens)
	.get(
		"/getone",
		[query("id").exists().withMessage(label.MISSING_REQUIRED)],
		screensController.getScreens
    )
export default router;
