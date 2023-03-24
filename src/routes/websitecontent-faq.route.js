import { check, query } from "express-validator";
import websiteContentFaqController from "../controllers/websitecontent-faq.controller";
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
	.post("/create", websiteContentFaqController.create)
	.get("/list", websiteContentFaqController.getFaq)
	.get(
		"/getone",
		[
			query("id")
				.exists()
				.withMessage(label.FAQID_REQUIRED),
		],
		websiteContentFaqController.getFaq
	)
	.put(
		"/update",
		[check("id").exists().withMessage(label.FAQID_REQUIRED)],
		websiteContentFaqController.create
	)
	.delete(
		"/delete",
		[query("id").exists().withMessage(label.FAQID_REQUIRED)],
		websiteContentFaqController.deleteFaq
	);
export default router;
