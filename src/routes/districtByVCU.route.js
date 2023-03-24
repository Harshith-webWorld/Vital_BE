import { check, query } from "express-validator";
import districtByVCUController from "../controllers/districtByVCU.controller";
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
	.get("/getOne", 
    [check("unitId").exists().withMessage(label.UNITID_REQUIRED)],
    districtByVCUController.getDistrictByVCU)

    router
	.get("/fsu", 
    [check("unitId").exists().withMessage(label.UNITID_REQUIRED)],
    districtByVCUController.getDistrictByFSU)
export default router;
