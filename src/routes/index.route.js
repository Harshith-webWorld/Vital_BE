import express from "express";
import moment from "moment";
import _ from "lodash";
import authService from "../services/auth.service";
import authRoutes from "./auth.route";
import userRoutes from "./user.route";
import roleRoutes from "./role.route";
import websiteContentNewsRoutes from "./websitecontent-news.route";
import websiteContentProgramInfosRoutes from "./websitecontent-programinfos.route";
import websiteContentImagesRoutes from "./websitecontent-images.route";
import websiteContentOthersRoutes from "./websitecontent-others.route";
import websiteContentVideosRoutes from "./websitecontent-videos.route";
import websiteContentRoutes from "./websitecontent.route";
import websiteContentAlertRoutes from "./websitecontent-alert.route";
import websiteContentFaqRoutes from "./websitecontent-faq.route";
import stateRoutes from "./state.route";
import districtRoutes from "./district.route";
import districtByVCU from "./districtByVCU.route";
import talukaRoutes from "./taluka.route";
import villageRoutes from "./village.route";
import corporationRoutes from "./corporation.route";
import zoneRoutes from "./zone.route"
import wardRoutes from "./ward.route"
import facilityRoutes from "./facilities.route"
import subcenterRoutes from "./subcenter.route"
import lymphedemaLineListRoutes from "./Lymphedema-LHLineList.route"
import tasSurveyRoutes from "./tasSurvey.route"
import PostMDAEvalListRoutes from "./postMDAEvalList.route"
import fsuTargetRoutes from "./fsuTargetAchievements.route";
import mdaIECActivitiesRoutes from "./mdaIECActivities.route";
import preMDAActivitiesRoutes from "./preMDAActivities.route";
import verticalUnitRoutes from "./verticalUnitStockPositions.route";
import mappingofOTRoutes from "./mappingOfOT.route";
import staffPosVerticalUnitsRoutes from "./staffPosVerticalUnits.route";
import udCategoryOptionsRoutes from "./udCategoryOptions.route";
import entomologicalLarvicalListRoutes from "./entomologicalLarvicidalList.route";
import mfPositiveLineListRoutes from './mfPositiveLineList.route';
import designationsRoutes from './designations.route';
import institutionTypesRoutes from './institutionTypes.route';
import activitiesRoutes from './activities.route';
import screensRoutes from './screens.route';
import userRoleScreenActivitiesRoutes from './userRoleScreenActivities.route';
import mdaIdaCoverageReportsRoutes from './mdaIDACoverage.route';
import verticalControlRoutes from './verticalControlUnits.route';
import LFReportRoutes from './LFReportRoute';
import MFReportRoutes from './MFReportRoute';
import FSURepotRoutes from './FSURepotRoutes';
import FCUReportRoutes from './FCUReportRoutes';
import TASReportRoutes from './TASReportRoutes';
import MDAReportRoutes from './MDAReportRoutes';
import SAEReportRoutes from "./SAEReport";
import entomologyReportRoutes from "./entomologyReportRoutes";
import VerticalStockReportRoutes from "./VerticalStockReportRoutes";
import GraphRoutes from "./GraphRoutes";
import mapRoutes from "./mapRoutes";
import sitesettingsRoutes from './sitesettings.route'
import dashboardRoutes from "./dashboardRoutes";
import hydrocelectomyOperations from "./hydrocelectomyOperations.route";
import HydrocelectomyOperationsReport from "./HydrocelectomyOperationsReport.route";
import MMDPKitsReport from "./MMDPKitsReport.route";
import FSUZoneReport from "./FSUZoneReport.route";
import FCUMisMtrReport from "./FCUMisMtrReport.route";
import NCMisMtrReport from "./NCMisMtrReport.route";
import RCOMisMtrReport from "./RCOMisMtrReport.route";
import YearwiseMisMtrReport from "./YearwiseMisMtrReport.route";
import InventoryMisMtrReport from "./InventoryMisMtrReport.route";
import EntomologicalMisMtrReport from "./EntomologicalMisMtrReport.route";
import HydroceleOpsMisMtrReport from "./HydroceleOpsMisMtrReport.route";




const router = express.Router();

function _validateToken(token) {
	var token = token.replace("Bearer ", "");
	console.log("_validateToken", token);

	return new Promise(async (resolve, reject) => {
		const decoded = await authService.decode(token);
		const currentTime = moment().unix();
		if (decoded && currentTime < decoded.exp) {
			resolve({
				status: "true",
				msg: "Successful Authorization!",
				decoded,
			});
		} else {
			console.log("TOKEN EXPIREDDDDD");
			reject({ status: false, msg: "Invalid Token" });
		}
	});
}

function checkAuth(req, res, next) {
	const allowedUrls = [
		"/auth/login",
		"/auth/forgotPassword",
		"/auth/verifyOtp",
		"/auth/resetPassword",
		"/users/create",
	];

	if ((req.method === "GET" && ( (req.url.split("?")[0].indexOf("/websitecontent") >= 0) 
	|| (req.url.split("?")[0].indexOf("/sitesettings") >= 0) || (req.url.split("?")[0].indexOf("/map") >= 0)))
	){
		next();
	} else {
		if (
			req.method !== "OPTIONS" &&
			!_.includes(allowedUrls, req.url.split("?")[0])
		) {
			const token = req.headers["Authorization"] || req.headers["authorization"];
			if (token) {
				_validateToken(token).then(
					(res) => {
						console.log("_validateToken", res);
						next();
					},
					(err) => {
						res.status(403).send({
							status: "false",
							msg: "Failed to authenticate user - USER",
							err,
						});
					}
				);
			} else {
				res.status(403).send({
					status: "false",
					msg: "Failed to authenticate user - USER"
				});
			}
		} else {
			next();
		}
	}

}

router.get("/health-check", (req, res) => res.send("OK!!!"));

router.use(checkAuth);

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/role", roleRoutes);
router.use("/websitecontent-news", websiteContentNewsRoutes);
router.use("/websitecontent-programinfos", websiteContentProgramInfosRoutes);
router.use("/websitecontent-images", websiteContentImagesRoutes);
router.use("/websitecontent-others", websiteContentOthersRoutes);
router.use("/websitecontent-videos", websiteContentVideosRoutes);
router.use("/websitecontent", websiteContentRoutes);
router.use("/websitecontent-alert", websiteContentAlertRoutes);
router.use("/websitecontent-faq", websiteContentFaqRoutes);
router.use("/state", stateRoutes);
router.use("/sitesettings", sitesettingsRoutes);
router.use("/district", districtRoutes);
router.use("/getDistrictByVerticalControlUnit", districtByVCU);
router.use("/taluka", talukaRoutes);
router.use("/village", villageRoutes);
router.use("/corporation", corporationRoutes);
router.use("/zone", zoneRoutes);
router.use("/ward", wardRoutes);
router.use("/facilities", facilityRoutes);
router.use("/subCenters", subcenterRoutes);
router.use("/lymphedemaLineList", lymphedemaLineListRoutes);
router.use("/tasSurvey", tasSurveyRoutes)
router.use("/PostMDAEvalList", PostMDAEvalListRoutes)
router.use("/fsuTarget", fsuTargetRoutes)
router.use("/mdaActivity", mdaIECActivitiesRoutes)
router.use("/preMDAActivity", preMDAActivitiesRoutes)
router.use("/verticalUnit", verticalUnitRoutes)
router.use("/mappingOfOT", mappingofOTRoutes)
router.use("/staffPosVerticalUnits", staffPosVerticalUnitsRoutes)
router.use("/udCategoryOptions", udCategoryOptionsRoutes)
router.use("/entomologicalLarvical", entomologicalLarvicalListRoutes)
router.use("/mfPositive", mfPositiveLineListRoutes)
router.use("/designations", designationsRoutes)
router.use("/institutionTypes", institutionTypesRoutes)
router.use("/activities", activitiesRoutes)
router.use("/screens", screensRoutes)
router.use("/userRoleScreenActivities", userRoleScreenActivitiesRoutes)
router.use("/mdaIdaCoverageReport", mdaIdaCoverageReportsRoutes)
router.use("/verticalControl", verticalControlRoutes)
router.use("/LFReport", LFReportRoutes)
router.use("/MFReport", MFReportRoutes)
router.use("/FSUReport", FSURepotRoutes)
router.use("/FCUReport", FCUReportRoutes)
router.use("/TASReport", TASReportRoutes)
router.use("/MDAReport", MDAReportRoutes)
router.use("/SAEReport", SAEReportRoutes)
router.use("/EntomologyReport", entomologyReportRoutes)
router.use("/VerticalStockReport", VerticalStockReportRoutes)
router.use("/Graph", GraphRoutes)
router.use("/map", mapRoutes)
router.use("/dashboard", dashboardRoutes)
router.use("/hydrocelectomyOperations", hydrocelectomyOperations)
router.use("/hydrocelectomyOperationsReport", HydrocelectomyOperationsReport)
router.use("/mmdpKitsReport", MMDPKitsReport)
router.use("/fsuZoneReport", FSUZoneReport)
router.use("/fcuMisMtrReport", FCUMisMtrReport)
router.use("/ncMisMtrReport", NCMisMtrReport)
router.use("/rcoMisMtrReport", RCOMisMtrReport)
router.use("/yearwiseMisMtrReport", YearwiseMisMtrReport)
router.use("/inventoryMisMtrReport", InventoryMisMtrReport)
router.use("/entomologicalMisMtrReport", EntomologicalMisMtrReport)
router.use("/hydroceleOpsMisMtrReport", HydroceleOpsMisMtrReport)
export default router;
