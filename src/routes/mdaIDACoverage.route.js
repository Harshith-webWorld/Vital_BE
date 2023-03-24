import { check, param, query } from "express-validator";
import mdaIDACoverageController from "../controllers/mdaIDACoverage.controller";
import bulkMdaIDACoverageController from "../controllers/mdaIDACoverageBulk.controller"
import express from "express";
import label from "../../config/resources"

const router = express.Router();
router
    .post("/createAllMDACoverage", mdaIDACoverageController.createAllMdaIDACoverages)
	.post("/createMDACoverage", mdaIDACoverageController.createMdaIDACoverages)
    .put("/updateMDACoverage/:id", mdaIDACoverageController.createMdaIDACoverages)
	.get("/getOneMDACoverage/:id", mdaIDACoverageController.getMdaIDACoverages)
	.get("/getAllMdaIDACoverageList", mdaIDACoverageController.getMdaIDACoverages)
	.delete("/getMDACoverage/:id", mdaIDACoverageController.deleteMdaIDACoverages)

    .post("/createMdaIDACoverageRegularList", mdaIDACoverageController.createMdaIDACoverageRegularList)
    .put("/updateMdaIDACoverageRegularList/:id", mdaIDACoverageController.createMdaIDACoverageRegularList)
	.get("/getOneMdaIDACoverageRegularList/:id", mdaIDACoverageController.getMdaIDACoverageRegularLists)
    .delete("/deleteMdaIDACoverageRegularList/:id", mdaIDACoverageController.deletemdaIDACoverageRegularList)
    .get("/getAllMdaIDACoverageRegularLists/:id", mdaIDACoverageController.getAllMdaIDACoverageRegularLists)

    .post("/createMdaIDACoverageMopUpList", mdaIDACoverageController.createMdaIDACoverageMopUpList)
    .put("/updateMdaIDACoverageMopUpList/:id", mdaIDACoverageController.createMdaIDACoverageMopUpList)
	.delete("/deleteMdaIDACoverageMopUpList/:id", mdaIDACoverageController.deleteMdaIDACoverageMopUpList)
    .get("/getOneMdaIDACoverageMopUpList/:id", mdaIDACoverageController.getMdaIDACoverageMopUpLists)
    .get("/getAllMdaIDACoverageMopUpLists/:id", mdaIDACoverageController.getAllMdaIDACoverageMopUpLists)


    //offline Route
    .post("/bulkCreateMDACoverage", bulkMdaIDACoverageController.bulkCreateMdaIDACoverages)
    .post("/bulkCreateMdaIDACoverageRegularList", bulkMdaIDACoverageController.bulkCreateMdaIDACoverageRegularList)
    .post("/bulkCreateMdaIDACoverageMopUpList", bulkMdaIDACoverageController.bulkCreateMdaIDACoverageMopUpList)

export default router;
