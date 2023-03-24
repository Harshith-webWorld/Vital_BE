import {
	validationResult
} from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
import TASReportDao from "../dao/TASReportDao";

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
const TASReportController = () => {



	const get_TASReport1List = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			var obj = {}

			var get_TASReport1_SchoolDao = await TASReportDao.get_TASReport1_SchoolDao(req)
			// console.log("get_AdditionalMFSurveyReport", get_AdditionalMFSurveyReport)

			if (get_TASReport1_SchoolDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				obj.school = get_TASReport1_SchoolDao.data


				var get_TASReport1_StudentDao = await TASReportDao.get_TASReport1_StudentDao(req)
				// console.log("get_AdditionalMFSurveyReport", get_AdditionalMFSurveyReport)

				if (get_TASReport1_StudentDao.error) {
					return res.status(httpStatus.BAD_REQUEST).json({
						status: httpStatus.BAD_REQUEST,
						message: "Something Went Wrong"
					});
				} else {
					obj.student = get_TASReport1_StudentDao.data
					return res.status(httpStatus.OK).json({
						status: httpStatus.OK,
						data: obj,
						message: label.LABEL_SUCCESS,
					});
				}
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

	const get_TASReport2List = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var get_TASReport2Dao = await TASReportDao.get_TASReport2Dao(req)
			// console.log("get_AdditionalMFSurveyReport", get_AdditionalMFSurveyReport)

			if (get_TASReport2Dao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: get_TASReport2Dao.data,
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

		get_TASReport1List,
		get_TASReport2List,


	};
};
export default TASReportController();