import {
	validationResult
} from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
import GraphDao from "./../dao/GraphDao";

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
	villages
} = db;
const Op = db.Sequelize.Op;
var sqDB = db.Sequelize.sqDb
const GraphContoller = () => {




const GetMMDPDetailsInPercentage = async (req, res) => {
	try {
		const reqObj = utils.getReqValues(req);

		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			throw errors.array();
		}


		var GetMMDPDetailsInPercentageDao = await GraphDao.GetMMDPDetailsInPercentageDao(req)
		
		if (GetMMDPDetailsInPercentageDao.error) {
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: "Something Went Wrong"
			});
		} else {
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: GetMMDPDetailsInPercentageDao.data,
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
			message: err
		});
	}
}

	const GetEndemicityGraphAllDistricts = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var GetEndemicityGraphAllDistrictsDao = await GraphDao.GetEndemicityGraphAllDistrictsDao(req)
			// console.log("get_AdditionalMFSurveyReport", get_AdditionalMFSurveyReport)

			if (GetEndemicityGraphAllDistrictsDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: GetEndemicityGraphAllDistrictsDao.data,
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
				message: err
			});
		}
	}

	
    const GetEndemicityGraphAllTaluksByDistrict = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var GetEndemicityGraphAllTaluksByDistrict = await GraphDao.GetEndemicityGraphAllTaluksByDistrictDao(req)
			// console.log("get_AdditionalMFSurveyReport", get_AdditionalMFSurveyReport)

			if (GetEndemicityGraphAllTaluksByDistrict.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: GetEndemicityGraphAllTaluksByDistrict.data,
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
				message: err
			});
		}
	}



	const GetMFEndemicityGraphAllDistricts  = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var GetMFEndemicityGraphAllDistrictsDao = await GraphDao.GetMFEndemicityGraphAllDistrictsDao(req)
			// console.log("get_AdditionalMFSurveyReport", get_MFBaseLineSurveyListDao)

			if (GetMFEndemicityGraphAllDistrictsDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: GetMFEndemicityGraphAllDistrictsDao.data,
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
				message: err
			});
		}
	}


	const GetMFEndemicityGraphMFPosetive  = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var GetMFEndemicityGraphMFPosetiveDao = await GraphDao.GetMFEndemicityGraphMFPosetiveDao(req)
			// console.log("get_AdditionalMFSurveyReport", get_MFBaseLineSurveyListDao)

			if (GetMFEndemicityGraphMFPosetiveDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: GetMFEndemicityGraphMFPosetiveDao.data,
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
				message: err
			});
		}
	}



	const GetMFEndemicityGraphBSCollected  = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var GetMFEndemicityGraphBSCollectedDao = await GraphDao.GetMFEndemicityGraphBSCollectedDao(req)
			// console.log("get_AdditionalMFSurveyReport", get_MFBaseLineSurveyListDao)

			if (GetMFEndemicityGraphBSCollectedDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: GetMFEndemicityGraphBSCollectedDao.data,
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
				message: err
			});
		}
	}


const GetMFEndemicityGraphBSExamined  = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var GetMFEndemicityGraphBSExaminedDao = await GraphDao.GetMFEndemicityGraphBSExaminedDao(req)
			// console.log("get_AdditionalMFSurveyReport", get_MFBaseLineSurveyListDao)

			if (GetMFEndemicityGraphBSExaminedDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: GetMFEndemicityGraphBSExaminedDao.data,
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
				message: err
			});
		}
	}


	const GetMFEndemicityGraphMfRate  = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var GetMFEndemicityGraphMfRateDao = await GraphDao.GetMFEndemicityGraphMfRateDao(req)
			// console.log("get_AdditionalMFSurveyReport", get_MFBaseLineSurveyListDao)

			if (GetMFEndemicityGraphMfRateDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: GetMFEndemicityGraphMfRateDao.data,
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
				message: err
			});
		}
	}


	const GetEndemicityTrendGraphAllDistricts  = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var GetEndemicityTrendGraphAllDistrictsDao = await GraphDao.GetEndemicityTrendGraphAllDistrictsDao(req)
			// console.log("get_AdditionalMFSurveyReport", get_MFBaseLineSurveyListDao)

			if (GetEndemicityTrendGraphAllDistrictsDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: GetEndemicityTrendGraphAllDistrictsDao.data,
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
				message: err
			});
		}
	}


	const GetEndemicityTrendGraphByDistrict  = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var GetEndemicityTrendGraphByDistrictDao = await GraphDao.GetEndemicityTrendGraphByDistrictDao(req)
			// console.log("get_AdditionalMFSurveyReport", get_MFBaseLineSurveyListDao)

			if (GetEndemicityTrendGraphByDistrictDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: GetEndemicityTrendGraphByDistrictDao.data,
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
				message: err
			});
		}
	}


	const GetEndemicityTrendGraphAllDistrictsNoOfLFCases  = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var GetEndemicityTrendGraphAllDistrictsNoOfLFCasesDao = await GraphDao.GetEndemicityTrendGraphAllDistrictsNoOfLFCasesDao(req)
			// console.log("get_AdditionalMFSurveyReport", get_MFBaseLineSurveyListDao)

			if (GetEndemicityTrendGraphAllDistrictsNoOfLFCasesDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: GetEndemicityTrendGraphAllDistrictsNoOfLFCasesDao.data,
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
				message: err
			});
		}
	}

	const GetEndemicityTrendGraphAllDistrictsNoOfHydroceleCases  = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var GetEndemicityTrendGraphAllDistrictsNoOfHydroceleCasesDao = await GraphDao.GetEndemicityTrendGraphAllDistrictsNoOfHydroceleCasesDao(req)
			// console.log("get_AdditionalMFSurveyReport", get_MFBaseLineSurveyListDao)

			if (GetEndemicityTrendGraphAllDistrictsNoOfHydroceleCasesDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: GetEndemicityTrendGraphAllDistrictsNoOfHydroceleCasesDao.data,
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
				message: err
			});
		}
	}

	const GetEndemicityTrendGraphAllDistrictsnoOfPersons  = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var GetEndemicityTrendGraphAllDistrictsnoOfPersonsDao = await GraphDao.GetEndemicityTrendGraphAllDistrictsnoOfPersonsDao(req)
			// console.log("get_AdditionalMFSurveyReport", get_MFBaseLineSurveyListDao)

			if (GetEndemicityTrendGraphAllDistrictsnoOfPersonsDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: GetEndemicityTrendGraphAllDistrictsnoOfPersonsDao.data,
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
				message: err
			});
		}
	}

	const GetEndemicityTrendGraphByDistrictNoOfLFCases  = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var GetEndemicityTrendGraphByDistrictNoOfLFCasesDao = await GraphDao.GetEndemicityTrendGraphByDistrictNoOfLFCasesDao(req)
			// console.log("get_AdditionalMFSurveyReport", get_MFBaseLineSurveyListDao)

			if (GetEndemicityTrendGraphByDistrictNoOfLFCasesDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: GetEndemicityTrendGraphByDistrictNoOfLFCasesDao.data,
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
				message: err
			});
		}
	}


	const GetEndemicityTrendGraphByDistrictNoOfPersons  = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var GetEndemicityTrendGraphByDistrictNoOfPersonsDao = await GraphDao.GetEndemicityTrendGraphByDistrictNoOfPersonsDao(req)
			// console.log("get_AdditionalMFSurveyReport", get_MFBaseLineSurveyListDao)

			if (GetEndemicityTrendGraphByDistrictNoOfPersonsDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: GetEndemicityTrendGraphByDistrictNoOfPersonsDao.data,
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
				message: err
			});
		}
	}



	const GetEndemicityTrendGraphByDistrictNoOfHydroceleCases  = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var GetEndemicityTrendGraphByDistrictNoOfHydroceleCasesDao = await GraphDao.GetEndemicityTrendGraphByDistrictNoOfHydroceleCasesDao(req)
			// console.log("get_AdditionalMFSurveyReport", get_MFBaseLineSurveyListDao)

			if (GetEndemicityTrendGraphByDistrictNoOfHydroceleCasesDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: GetEndemicityTrendGraphByDistrictNoOfHydroceleCasesDao.data,
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
				message: err
			});
		}
	}




	const GetLFCasesDistwise = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var GetLFCasesDistwiseDao = await GraphDao.GetLFCasesDistwiseDao(req)
			// console.log("get_AdditionalMFSurveyReport", LF_MMDPActivityReportingDao)



			if (GetLFCasesDistwiseDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: GetLFCasesDistwiseDao.data,
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
				message: err
			});
		}
	}



	const GetHydroceleCasesDistwise = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var GetHydroceleCasesDistwiseDao = await GraphDao.GetHydroceleCasesDistwiseDao(req)
			// console.log("get_AdditionalMFSurveyReport", LF_MMDPActivityReportingDao)



			if (GetHydroceleCasesDistwiseDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: GetHydroceleCasesDistwiseDao.data,
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
				message: err
			});
		}
	}



	const GetHydroceleOperated = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var GetHydroceleOperatedDao = await GraphDao.GetHydroceleOperatedDao(req)
			// console.log("get_AdditionalMFSurveyReport", LF_MMDPActivityReportingDao)



			if (GetHydroceleOperatedDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: GetHydroceleOperatedDao.data,
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
				message: err
			});
		}
	}






	const GetPendingApprovalMODistwise = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var GetPendingApprovalMODistwiseDao = await GraphDao.GetPendingApprovalMODistwiseDao(req)
			// console.log("get_AdditionalMFSurveyReport", LF_MMDPActivityReportingDao)



			if (GetPendingApprovalMODistwiseDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: GetPendingApprovalMODistwiseDao.data,
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
				message: err
			});
		}
	}

















	return {

		GetMMDPDetailsInPercentage,
		GetEndemicityGraphAllDistricts,
        GetEndemicityGraphAllTaluksByDistrict,
		GetMFEndemicityGraphAllDistricts,
		GetMFEndemicityGraphMFPosetive,
		GetMFEndemicityGraphBSCollected,
		GetMFEndemicityGraphBSExamined,
		GetMFEndemicityGraphMfRate,
		GetEndemicityTrendGraphAllDistricts,
		GetEndemicityTrendGraphByDistrict,
		GetEndemicityTrendGraphAllDistrictsNoOfLFCases,
		GetEndemicityTrendGraphAllDistrictsNoOfHydroceleCases,
		GetEndemicityTrendGraphAllDistrictsnoOfPersons,
		GetEndemicityTrendGraphByDistrictNoOfPersons,
		GetEndemicityTrendGraphByDistrictNoOfHydroceleCases,
		GetEndemicityTrendGraphByDistrictNoOfLFCases,
		GetLFCasesDistwise,
		GetHydroceleCasesDistwise,
		GetHydroceleOperated,
		GetPendingApprovalMODistwise
	};
};
export default GraphContoller();