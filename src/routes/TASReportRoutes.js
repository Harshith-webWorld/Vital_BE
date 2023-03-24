import { check, query } from "express-validator";
import TASReportController from "../controllers/TASReportController";
import express from "express";
import label from "../../config/resources";

const router = express.Router();
router
   
    .post("/get_TASReport1", TASReportController.get_TASReport1List)
    .post("/get_TASReport2", TASReportController.get_TASReport2List)
   
  



export default router;
