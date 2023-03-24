import { check, query } from "express-validator";
import villageController from "../controllers/village.controller";
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
	.post("/create", villageController.create)
	.get("/list", villageController.getVillage)
	.get(
		"/get",
		[query("districtId").exists(),
		query("facilityId").exists()],
		villageController.getVillage
	)
	.get(
		"/getByTalukaId",
		[query("districtId").exists(),
		query("talukaId").exists()],
		villageController.getVillage
	)
	.get('/getbydistrict', villageController.getVillagebyDistrict)
	.get(
		"/getBySubCenterId",
		[query("districtId").exists(),
		query("facilityId").exists(),
		query("subCenterId").exists()],
		villageController.getVillageBySubCenter
	)
	.put(
		"/update",
		[check("id").exists().withMessage(label.VILLAGEID_REQUIRED)],
		villageController.create
	)
	.delete(
		"/delete",
		[query("id").exists().withMessage(label.VILLAGEID_REQUIRED)],
		villageController.deleteVillage
	);
export default router;
