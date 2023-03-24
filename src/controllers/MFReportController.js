import {
	validationResult
} from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
import MFReportDao from "./../dao/MFReportDao";

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
const MFReportController = () => {



	const get_AdditionalMFSurveyReportList = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var get_AdditionalMFSurveyReport = await MFReportDao.get_AdditionalMFSurveyReportDao(req)
			console.log("get_AdditionalMFSurveyReport", get_AdditionalMFSurveyReport)

			if (get_AdditionalMFSurveyReport.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: get_AdditionalMFSurveyReport.data,
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


	const get_MFBaseLineSurveyList  = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			console.log("get_AdditionalMFSurveyReport")


			var get_MFBaseLineSurveyListDao = await MFReportDao.get_MFBaseLineSurveyListDao(req)
			console.log("get_AdditionalMFSurveyReport", get_MFBaseLineSurveyListDao)

			if (get_MFBaseLineSurveyListDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: get_MFBaseLineSurveyListDao.data,
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

	const DiseaseRate_Villagewise  = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var DiseaseRate_VillagewiseDao = await MFReportDao.DiseaseRate_VillagewiseDao(req)
			// console.log("get_AdditionalMFSurveyReport", get_MFBaseLineSurveyListDao)

			if (DiseaseRate_VillagewiseDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: DiseaseRate_VillagewiseDao.data,
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

		get_AdditionalMFSurveyReportList,
		get_MFBaseLineSurveyList,
		DiseaseRate_Villagewise
	};
};
export default MFReportController();