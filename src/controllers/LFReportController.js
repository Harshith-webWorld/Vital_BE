import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
import LFReportDao from "../dao/LFReportDao";

const {
	lymphedemaLineList,
	lymphedemaLineListSurvey,
	lymphedemaLineListFollowUpsLF,
	lymphedemaLineListFollowUpsHF,
	udCategoryOptions,
	verticalControlFieldUnits,
	verticalControlUnits,
	states,
	districts,
	corporations,
	talukas,
	zones,
	facilities,
	subCenters,
	wards,
	villages,
} = db;
const Op = db.Sequelize.Op;
const LFReportController = () => {
	const getLfAnalysis1 = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			var getLfAnalysis1Dao = await LFReportDao.getLfAnalysis1Dao(req);
			// console.log("get_AdditionalMFSurveyReport", LF_MMDPActivityReportingDao)

			if (getLfAnalysis1Dao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong",
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: getLfAnalysis1Dao.data,
					message: label.LABEL_SUCCESS,
				});
			}
		} catch (err) {
			console.log(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err,
			});
		}
	};

	const getLfAnalysis2 = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			var getLfAnalysis2Dao = await LFReportDao.getLfAnalysis2Dao(req);
			// console.log("get_AdditionalMFSurveyReport", LF_MMDPActivityReportingDao)

			if (getLfAnalysis2Dao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong",
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: getLfAnalysis2Dao.data,
					message: label.LABEL_SUCCESS,
				});
			}
		} catch (err) {
			console.log(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err,
			});
		}
	};

	const get_LF_DieseaseCasesList1 = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			var get_LF_DieseaseCasesListDao =
				await LFReportDao.get_LF_DieseaseCasesListDao(req);
			// console.log("get_AdditionalMFSurveyReport", LF_MMDPActivityReportingDao)

			if (get_LF_DieseaseCasesListDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong",
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: get_LF_DieseaseCasesListDao.data,
					message: label.LABEL_SUCCESS,
				});
			}
		} catch (err) {
			console.log(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err,
			});
		}
	};

	const get_LF_HydroceleOPLineList = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			var get_LF_HydroceleOPLineListDao =
				await LFReportDao.get_LF_HydroceleOPLineListDao(req);
			// console.log("get_AdditionalMFSurveyReport", LF_MMDPActivityReportingDao)

			if (get_LF_HydroceleOPLineListDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong",
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: get_LF_HydroceleOPLineListDao.data,
					message: label.LABEL_SUCCESS,
				});
			}
		} catch (err) {
			console.log(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err,
			});
		}
	};

	const get_LF_PendingHydroceleCasesList = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			var get_LF_HydroceleOPLineListDao =
				await LFReportDao.get_LF_PendingHydroceleCasesListDao(req);
			// console.log("get_AdditionalMFSurveyReport", LF_MMDPActivityReportingDao)

			if (get_LF_HydroceleOPLineListDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong",
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: get_LF_HydroceleOPLineListDao.data,
					message: label.LABEL_SUCCESS,
				});
			}
		} catch (err) {
			console.log(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err,
			});
		}
	};

	const getLfAnalysis3 = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			var districtId = `and  L."districtId" = ${req.body.districtId}`;

			var start_year = `${req.body.startYear}`;
			var end_year = ` ${req.body.endYear}`;

			// var month = `and  L."month" = ${req.body.month}`

			if (req.body.districtId.length == 0) {
				districtId = "";
			}
			if (req.body.startYear.length == 0) {
				start_year = "1900";
			}
			if (req.body.endYear.length == 0) {
				const d = new Date();
				var current_year = d.getFullYear();
				end_year = current_year;
			}
			// if (req.body.month.length == 0) {
			// 	month = ""
			// }

			const page = reqObj.page ? reqObj.page : 1;
			const itemsPerPage = reqObj.itemsPerPage ? reqObj.itemsPerPage : 10;
			const offset = (page - 1) * itemsPerPage;

			db.sequelize
			.query(`
Select A1.*,COALESCE(A2."NoLFCasesTrainedMM",0) "NoLFCasesTrainedMM", 
COALESCE(A3."NoBalanceToBeTrained",0) "NoBalanceToBeTrained",
COALESCE(A4."NoTrainedLFCasesFollowingMM",0) "NoTrainedLFCasesFollowingMM", 
COALESCE(A5."NoOfHydroceleCases",0) "NoOfHydroceleCases",
COALESCE(A6."NoIneligibleForSurgery",0) "NoIneligibleForSurgery",
COALESCE(A7."NoOfHydroceleOperated",0) "NoOfHydroceleOperated",
COALESCE(A8."BalanceToBeOperated",0) "BalanceToBeOperated"
from (select L.Year,D."districtName", L."districtId",Count(L."patientId") as "NoLFCases"
	from public."lymphedemaLineLists" L
	left join public.districts D on D.id = L."districtId"
	where L."diseaseType" like '%Lymphedema%'and L."isActive"=true
	${districtId} and L."year" BETWEEN ${start_year} AND ${end_year}
	group by L.Year,D."districtName", L."districtId") A1
Left Join
(select L.Year,D."districtName", L."districtId",Count(L."patientId") as "NoLFCasesTrainedMM"
	from public."lymphedemaLineLists" L
	left join public.districts D on D.id = L."districtId"
    left join (select LF1."lymphedemaLineListId",LF1."isServiceMMDPTrainingGiven" from public."lymphedemaLineListFollowUpsLves" LF1
    where LF1."isServiceMMDPTrainingGiven"=true ) LF
    on LF."lymphedemaLineListId" = L.id 
 	where L."isActive"=true
    ${districtId} and L."year" BETWEEN ${start_year} AND ${end_year}
    group by L.year,D."districtName", L."districtId") A2
ON A1."districtId"=A2."districtId" and A1."year"=A2."year"
Left Join
(select L.Year,D."districtName", L."districtId",Count(L."patientId") as "NoBalanceToBeTrained"
	from public."lymphedemaLineLists" L
	left join public.districts D on D.id = L."districtId"
    left join(select LF1."lymphedemaLineListId",LF1."isServiceMMDPTrainingGiven" from public."lymphedemaLineListFollowUpsLves" LF1
	where LF1."isServiceMMDPTrainingGiven"=false) LF
	ON LF."lymphedemaLineListId" = L.id
    where L."isActive"=true
    ${districtId} and L."year" BETWEEN ${start_year} AND ${end_year}
	group by L.Year,D."districtName", L."districtId")A3
ON A1."districtId"=A3."districtId" and A1."year"=A3."year"
Left Join
(select L.Year,D."districtName",L."districtId",Count(L."patientId") as "NoTrainedLFCasesFollowingMM"
	from public."lymphedemaLineLists" L
	left join public.districts D on D.id = L."districtId"
    left join (select LF1."lymphedemaLineListId",LF1."isServicePatientFollowingMM" from public."lymphedemaLineListFollowUpsLves" LF1
	where LF1."isServicePatientFollowingMM"=true) LF
    ON LF."lymphedemaLineListId" = L.id
	where L."isActive"=true 
 	${districtId} and L."year" BETWEEN ${start_year} AND ${end_year}
    group by L.Year,D."districtName",L."districtId") A4
ON A1."districtId"=A4."districtId" and A1."year"=A4."year"
Left Join
	(select L.Year,D."districtName",L."districtId",Count(L."patientId") as "NoOfHydroceleCases"
	from public."lymphedemaLineLists" L
	left join public.districts D on D.id = L."districtId"
	where L."diseaseType" like '%"Hydrocele"%' and L."isActive"=true
	${districtId} and L."year" BETWEEN ${start_year} AND ${end_year}
	group by L.Year,D."districtName",L."districtId")A5
ON A1."districtId"=A5."districtId" and A1."year"=A5."year"
Left Join
	(select L.Year,D."districtName",L."districtId",Count(L."patientId") as "NoIneligibleForSurgery"
	from public."lymphedemaLineLists" L
	left join public.districts D on D.id = L."districtId"
	left join (select HF1."lymphedemaLineListId",HF1."surgeryNotPossibleReasonsId" from public."lymphedemaLineListFollowUpsHFs" HF1
	where HF1."surgeryNotPossibleReasonsId" is null) HF
	ON  HF."lymphedemaLineListId" = L.id
	where L."isActive"=true 
	${districtId} and L."year" BETWEEN ${start_year} AND ${end_year}
	group by L.Year,D."districtName",L."districtId")A6
ON A1."districtId"=A6."districtId" and A1."year"=A6."year"
Left Join
	(select L.Year,D."districtName",L."districtId",Count(L."patientId") as "NoOfHydroceleOperated"
	from public."lymphedemaLineLists" L
	left join public.districts D on D.id = L."districtId"
	left join (select HF1."lymphedemaLineListId",HF1."isSurgeryDone" from public."lymphedemaLineListFollowUpsHFs" HF1
	where HF1."isSurgeryDone" =true) HF
	ON HF."lymphedemaLineListId" = L.id
	where L."isActive"=true
	${districtId} and L."year" BETWEEN ${start_year} AND ${end_year}
group by L.Year,D."districtName",L."districtId")A7
ON A1."districtId"=A7."districtId" and A1."year"=A7."year"
Left Join 
	(select L.Year,D."districtName",L."districtId",Count(L."patientId") as "BalanceToBeOperated"
	from public."lymphedemaLineLists" L
	left join public.districts D on D.id = L."districtId"
	LEFT   JOIN LATERAL (select HF1."lymphedemaLineListId",HF1."isSurgeryDone" from public."lymphedemaLineListFollowUpsHFs" HF1
	where HF1."isSurgeryDone" =false) HF
	ON true where HF."lymphedemaLineListId" = L.id
	and L."isActive"=true 
	${districtId} and L."year" BETWEEN ${start_year} AND ${end_year}
	group by L.Year,D."districtName",L."districtId") A8
	ON A1."districtId"=A8."districtId" and A1."year"=A8."year"
			offset ${offset} 
			limit ${itemsPerPage}
			`)
				.then(([results, metadata]) => {
					return res.status(httpStatus.OK).json({
						status: httpStatus.OK,
						data: results,
						message: label.LABEL_SUCCESS,
					});
				});
		} catch (err) {
			console.log(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err,
			});
		}
	};

	const LF_MMDPActivityReporting = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			var LF_MMDPActivityReportingDao =
				await LFReportDao.LF_MMDPActivityReportingDao(req);
			// console.log("get_AdditionalMFSurveyReport", LF_MMDPActivityReportingDao)

			if (LF_MMDPActivityReportingDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong",
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: LF_MMDPActivityReportingDao.data,
					message: label.LABEL_SUCCESS,
				});
			}
		} catch (err) {
			console.log(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err,
			});
		}
	};

	const getLF_PerformanceOfSurgeons = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			const page = reqObj.page ? reqObj.page : 1;
			const itemsPerPage = reqObj.itemsPerPage ? reqObj.itemsPerPage : 10;
			const offset = (page - 1) * itemsPerPage;

			db.sequelize
				.query(
					`
			select LH."nameOfSurgeon",LH."surgeonPhone",F."facilityName",
F1."facilityName" as nameOfHospitalSurgeryDone,Count(LH.id) As "NoOfOperations"
from public."lymphedemaLineListFollowUpsHFs" LH
left Join public."lymphedemaLineLists" L on L.id=LH."lymphedemaLineListId"
left join public.districts D on D.id = L."districtId"
left join public.facilities F on F.id = L."facilityId"
left join public.facilities F1 on F1.id = LH."nameOfHospitalSurgeryDoneId"
where LH."isSurgeryDone" = true
group by L.Year,D."districtName" ,LH."nameOfSurgeon",LH."surgeonPhone",
F."facilityName",F1."facilityName"`
				)
				.then(([results, metadata]) => {
					// Results will be an empty array and metadata will contain the number of affected rows.
					return res.status(httpStatus.OK).json({
						status: httpStatus.OK,
						data: results,
						message: label.LABEL_SUCCESS,
					});
				});
		} catch (err) {
			console.log(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err,
			});
		}
	};

	const getLF_PerformanceOfInstitutes = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			const page = reqObj.page ? reqObj.page : 1;
			const itemsPerPage = reqObj.itemsPerPage ? reqObj.itemsPerPage : 10;
			const offset = (page - 1) * itemsPerPage;

			db.sequelize
				.query(
					`
			select S1."facilityName",sum(S1."NoOfOperations") "NoOfOperations",count(S1."nameOfSurgeon") AS "NoOfSurgeon"
from (select F."facilityName",Count(LH.id) As "NoOfOperations",LH."nameOfSurgeon",
 L.Year,D."districtName"
from public."lymphedemaLineListFollowUpsHFs" LH
left Join public."lymphedemaLineLists" L on L.id=LH."lymphedemaLineListId"
left join public.districts D on D.id = L."districtId"
left join public.facilities F on F.id = L."facilityId"
left join public.facilities F1 on F1.id = LH."nameOfHospitalSurgeryDoneId"
where LH."isSurgeryDone" = true
group by L.Year,D."districtName" ,LH."nameOfSurgeon",F."facilityName") S1
group by S1.Year,S1."districtName" ,S1."nameOfSurgeon",S1."facilityName"`
				)
				.then(([results, metadata]) => {
					// Results will be an empty array and metadata will contain the number of affected rows.
					return res.status(httpStatus.OK).json({
						status: httpStatus.OK,
						data: results,
						message: label.LABEL_SUCCESS,
					});
				});
		} catch (err) {
			console.log(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err,
			});
		}
	};

	const get_LF_PatientsineligibleForSurgery = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			var get_LF_PatientsineligibleForSurgery =
				await LFReportDao.get_LF_PatientsineligibleForSurgery(req);
			// console.log("get_AdditionalMFSurveyReport", LF_MMDPActivityReportingDao)

			if (get_LF_PatientsineligibleForSurgery.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong",
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: get_LF_PatientsineligibleForSurgery.data,
					message: label.LABEL_SUCCESS,
				});
			}
		} catch (err) {
			console.log(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err,
			});
		}
	};

	const VerifiedbyMO = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			var VerifiedbyMODao = await LFReportDao.VerifiedbyMODao(req);
			// console.log("get_AdditionalMFSurveyReport", LF_MMDPActivityReportingDao)

			if (VerifiedbyMODao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong",
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: VerifiedbyMODao.data,
					message: label.LABEL_SUCCESS,
				});
			}
		} catch (err) {
			console.log(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err,
			});
		}
	};

	const LF_PerformanceOfInstitutes = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			var LF_PerformanceOfInstitutesDao =
				await LFReportDao.LF_PerformanceOfInstitutesDao(req);
			// console.log("get_AdditionalMFSurveyReport", LF_MMDPActivityReportingDao)

			if (LF_PerformanceOfInstitutesDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong",
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: LF_PerformanceOfInstitutesDao.data,
					message: label.LABEL_SUCCESS,
				});
			}
		} catch (err) {
			console.log(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err,
			});
		}
	};

	const LF_PerformanceOfSurgeons = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			var LF_PerformanceOfSurgeonsDao =
				await LFReportDao.LF_PerformanceOfSurgeonsDao(req);
			// console.log("get_AdditionalMFSurveyReport", LF_MMDPActivityReportingDao)

			if (LF_PerformanceOfSurgeonsDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong",
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: LF_PerformanceOfSurgeonsDao.data,
					message: label.LABEL_SUCCESS,
				});
			}
		} catch (err) {
			console.log(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err,
			});
		}
	};

	const PlanningForOT = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			var PlanningForOTDao = await LFReportDao.PlanningForOTDao(req);
			// console.log("get_AdditionalMFSurveyReport", LF_MMDPActivityReportingDao)

			if (PlanningForOTDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong",
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: PlanningForOTDao.data,
					message: label.LABEL_SUCCESS,
				});
			}
		} catch (err) {
			console.log(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err,
			});
		}
	};

	const get_FollowUpservicesToLFpatients = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			var FollowUpServicesLymphedemaDao =
				await LFReportDao.FollowUpServicesLymphedemaDao(req);
			console.log("get_AdditionalMFSurveyReport", FollowUpServicesLymphedemaDao)
			if (FollowUpServicesLymphedemaDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong",
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: FollowUpServicesLymphedemaDao.data,
					message: label.LABEL_SUCCESS,
				});
			}
		} catch (err) {
			console.log(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err,
			});
		}
	};

	const get_FollowUpservicesToHydrocelePatients = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			var FollowUpServicesHydroceleDao =
				await LFReportDao.FollowUpServicesHydroceleDao(req);
			// console.log("FollowUpServicesHydroceleDao", FollowUpServicesHydroceleDao)
			if (FollowUpServicesHydroceleDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong",
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: FollowUpServicesHydroceleDao.data,
					message: label.LABEL_SUCCESS,
				});
			}
		} catch (err) {
			console.log(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err,
			});
		}
	};
	const get_GradingOfLFPatients = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			var get_LF_HydroceleOPLineListDao =
				await LFReportDao.get_GradingOfLFPatientsDao(req);

			if (get_LF_HydroceleOPLineListDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong",
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: get_LF_HydroceleOPLineListDao.data,
					message: label.LABEL_SUCCESS,
				});
			}
		} catch (err) {
			console.log(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err,
			});
		}
	};
	
	return {
		getLfAnalysis1,
		getLfAnalysis2,
		get_LF_DieseaseCasesList1,
		get_LF_HydroceleOPLineList,
		get_LF_PendingHydroceleCasesList,
		get_GradingOfLFPatients,
		getLfAnalysis3,
		LF_MMDPActivityReporting,
		getLF_PerformanceOfSurgeons,
		getLF_PerformanceOfInstitutes,
		get_LF_PatientsineligibleForSurgery,
		VerifiedbyMO,
		LF_PerformanceOfInstitutes,
		LF_PerformanceOfSurgeons,
		PlanningForOT,
		get_FollowUpservicesToLFpatients,
		get_FollowUpservicesToHydrocelePatients,
	};
};
export default LFReportController();
