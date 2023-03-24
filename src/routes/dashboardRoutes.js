import { check, query } from "express-validator";
import dashboardController from "../controllers/dashboardController";
import express from "express";
import label from "../../config/resources";

const router = express.Router();
router
   
    .post("/get_EndemicityTotalAllDistricts", dashboardController.get_EndemicityTotalAllDistricts)
    .post("/get_DashboardTodayEntry", dashboardController.get_DashboardTodayEntry)
    .post("/DashboardBSCollectedToday", dashboardController.DashboardBSCollectedToday)
    .post("/DashboardLFThisMonth", dashboardController.DashboardLFThisMonth)
    .post("/DashboardMFPositive12Months", dashboardController.DashboardMFPositive12Months)
    .post("/DashboardLFCases12Months", dashboardController.DashboardLFCases12Months)
    .post("/DashboardMONotVerified", dashboardController.DashboardMONotVerified)
    .post("/DashboardFSUTargets", dashboardController.DashboardFSUTargets)
    .post("/DashboardMFRates", dashboardController.DashboardMFRates)
    .post("/DashboardDrugConsumption", dashboardController.DashboardDrugConsumption)
    .post("/GetMFRateTimeTrend", dashboardController.GetMFRateTimeTrend)
    .post("/GetMFRateTimeTrendList", dashboardController.GetMFRateTimeTrendList)    
    .post("/GetLymphedemaCasesDistricts", dashboardController.GetLymphedemaCasesDistricts)
    .post("/GetHydroceleCasesDistricts", dashboardController.GetHydroceleCasesDistricts)
    .post("/GetHydroceleSurgeriesDistricts", dashboardController.GetHydroceleSurgeriesDistricts)
    .post("/GetMFPositiveCasesDistricts", dashboardController.GetMFPositiveCasesDistricts) 
    .post("/GetMDAIDACoverageAndConsumption", dashboardController.GetMDAIDACoverageAndConsumption) 
    .post("/GetMdaTasActivityStatus", dashboardController.GetMdaTasActivityStatus) 
    .post("/GetMMDPGraph", dashboardController.GetMMDPGraph) 
    .post("/GetFilariaUnitPerformance", dashboardController.GetFilariaUnitPerformance) 
    .post("/GetAlertsForUser", dashboardController.GetAlertsForUser) 
    
    
export default router;
