
import RoleController from "../controllers/role.controller";
import { check, query, } from "express-validator";
import label from "../../config/resources";
import express from "express";
const router = express.Router();


router
	.post(
		"/create",
		RoleController.create
	)
	.get("/list", RoleController.getRole)

	.put(
		"/update",
		[
			check("id")
				.exists()
				.withMessage(label.ROLEID_REQUIRED)
		],
		RoleController.create
	)
    .delete("/delete",
	[
		query("id")
			.exists()
			.withMessage(label.ROLEID_REQUIRED)
	],RoleController.deleteRole)
    export default router;

