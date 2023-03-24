import { check, query } from "express-validator";
import SAEReportController from "../controllers/SAEReportController";
import express from "express";
import label from "../../config/resources";

const router = express.Router();
router

    .post("/saereport", SAEReportController.saereport)



export default router;
