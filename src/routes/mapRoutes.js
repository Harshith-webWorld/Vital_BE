import { check, query } from "express-validator";
import mapContoller from "../controllers/mapContoller";
import express from "express";
import label from "../../config/resources";

const router = express.Router();
router

    .post("/GetEndemicityMapAllDistricts", mapContoller.GetEndemicityMapAllDistricts)
    .post("/GetEndemicityMapAllTaluksByDistrict", mapContoller.GetEndemicityMapAllTaluksByDistrict)
    .post("/GetEndemicityMapAllVillagesByTaluka", mapContoller.GetEndemicityMapAllVillagesByTaluka)
    .get("/GetDistrictsGeo", mapContoller.GetDistrictsGeo) 
    .get("/GetTalukasGeo", mapContoller.GetTalukasGeo) 
    .get("/GetVillagesGeo", mapContoller.GetVillagesGeo) 
    .get("/GetTownsGeo", mapContoller.GetTownsGeo) 
    .get("/GetEndemicityMapHome", mapContoller.GetEndemicityMapHome) 

export default router;
