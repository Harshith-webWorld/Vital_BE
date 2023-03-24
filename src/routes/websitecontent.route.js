import { check/*  */ } from "express-validator";
import websiteContentController from "../controllers/websitecontent.controller";
import express from "express";
import label from "../../config/resources";
const router = express.Router();
router
.post(
    "/create",
    websiteContentController.create
)
.get("/list", websiteContentController.getWebsiteContent)
.put("/update",[
    check("id")
        .exists()
        .withMessage(label.WEBSITEID_REQUIRED)
],websiteContentController.create)
export default router;

