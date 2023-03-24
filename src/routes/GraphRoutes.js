import { check, query } from "express-validator";
import GraphContoller from "../controllers/GraphContoller";
import express from "express";
import label from "../../config/resources";

const router = express.Router();
router
    
    .post("/GetMMDPDetailsInPercentage", GraphContoller.GetMMDPDetailsInPercentage)
    .post("/GetEndemicityGraphAllDistricts", GraphContoller.GetEndemicityGraphAllDistricts)
    .post("/GetEndemicityGraphAllTaluksByDistrict", GraphContoller.GetEndemicityGraphAllTaluksByDistrict)
    .post("/GetMFEndemicityGraphAllDistricts", GraphContoller.GetMFEndemicityGraphAllDistricts)
   
    .post("/GetMFEndemicityGraphMFPosetive", GraphContoller.GetMFEndemicityGraphMFPosetive)
    .post("/GetMFEndemicityGraphBSCollected", GraphContoller.GetMFEndemicityGraphBSCollected)
    .post("/GetMFEndemicityGraphBSExamined", GraphContoller.GetMFEndemicityGraphBSExamined)
    .post("/GetMFEndemicityGraphMfRate", GraphContoller.GetMFEndemicityGraphMfRate)

    .post("/GetEndemicityTrendGraphAllDistricts", GraphContoller.GetEndemicityTrendGraphAllDistricts)
    .post("/GetEndemicityTrendGraphByDistrict", GraphContoller.GetEndemicityTrendGraphByDistrict)
    

    .post("/GetEndemicityTrendGraphAllDistrictsNoOfLFCases", GraphContoller.GetEndemicityTrendGraphAllDistrictsNoOfLFCases)
    .post("/GetEndemicityTrendGraphAllDistrictsNoOfHydroceleCases", GraphContoller.GetEndemicityTrendGraphAllDistrictsNoOfHydroceleCases)
    .post("/GetEndemicityTrendGraphAllDistrictsNoOfPersons", GraphContoller.GetEndemicityTrendGraphAllDistrictsnoOfPersons)


    .post("/GetEndemicityTrendGraphByDistrictNoOfLFCases", GraphContoller.GetEndemicityTrendGraphByDistrictNoOfLFCases)
    .post("/GetEndemicityTrendGraphByDistrictNoOfHydroceleCases", GraphContoller.GetEndemicityTrendGraphByDistrictNoOfHydroceleCases)
    .post("/GetEndemicityTrendGraphByDistrictNoOfPersons", GraphContoller.GetEndemicityTrendGraphByDistrictNoOfPersons)


    .post("/GetLFCasesGraphDistwise", GraphContoller.GetLFCasesDistwise)
    .post("/GetHydroceleCasesGraphDistwise", GraphContoller.GetHydroceleCasesDistwise)
    .post("/GetHydroceleOperatedGraphDistwise", GraphContoller.GetHydroceleOperated)
    .post("/GetPendingApprovalMOGraphDistwise", GraphContoller.GetPendingApprovalMODistwise)

    

export default router;
