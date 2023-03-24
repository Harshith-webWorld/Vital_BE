import { check,query } from "express-validator";
import userCtrl from "../controllers/user.controller";
import express from "express";
import label from "../../config/resources"
const router = express.Router();


router
	.post(
		"/create",
		userCtrl.create
	)
	.get("/list", userCtrl.getusers)
	.get(
		"/getone",
		[
			query("id")
				.exists()
				.withMessage(label.USERID_REQUIRED)
		],
		userCtrl.getusers
	)

	.put(
		"/update",
		[
			check("id")
				.exists()
				.withMessage(label.USERID_REQUIRED)
		],
		userCtrl.create
	)

	.delete(
		"/delete",
		[
			query("id")
				.exists()
				.withMessage(label.USERID_REQUIRED)
		],
		userCtrl.deleteUser
	);

export default router;
