import {
	validationResult
} from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
import FCUReportDao from "./../dao/FCUReportDao";

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
const FCUReportController = () => {



	const get_FCUAnalysis1List = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var get_FCUAnalysis1Dao = await FCUReportDao.get_FCUAnalysis1Dao(req)
			// console.log("get_AdditionalMFSurveyReport", get_AdditionalMFSurveyReport)

			if (get_FCUAnalysis1Dao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: get_FCUAnalysis1Dao.data,
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

	const get_FCUAnalysis2List = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var get_FCUAnalysis2Dao = await FCUReportDao.get_FCUAnalysis2Dao(req)
			// console.log("get_AdditionalMFSurveyReport", get_AdditionalMFSurveyReport)

			if (get_FCUAnalysis2Dao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: get_FCUAnalysis2Dao.data,
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


	const get_FCUAnalysis4List = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			var obj = {}
			var UnitLevelDao = await FCUReportDao.UnitLevelDao(req)
			// console.log("UnitLevelDao", UnitLevelDao)

			if (UnitLevelDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {


				obj.UnitLevel = UnitLevelDao.data
				var SubUnitLevelDao = await FCUReportDao.SubUnitLevelDao(req)
				// console.log("get_AdditionalMFSurveyReport", get_AdditionalMFSurveyReport)

				if (SubUnitLevelDao.error) {
					return res.status(httpStatus.BAD_REQUEST).json({
						status: httpStatus.BAD_REQUEST,
						message: "Something Went Wrong"
					});
				} else {

					obj.SubUnitLevel = SubUnitLevelDao.data

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



	const get_FCUAnalysis5List = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var vNoCasesDetectedDuringMonthDao = await FCUReportDao.vNoCasesDetectedDuringMonthDao(req)
			// console.log("get_AdditionalMFSurveyReport", get_AdditionalMFSurveyReport)

			if (vNoCasesDetectedDuringMonthDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: vNoCasesDetectedDuringMonthDao.data,
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

	const get_FCUAnalysis6List = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var get_FCUAnalysis6Dao = await FCUReportDao.get_FCUAnalysis6Dao(req)
			// console.log("get_AdditionalMFSurveyReport", get_AdditionalMFSurveyReport)

			if (get_FCUAnalysis6Dao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: get_FCUAnalysis6Dao.data,
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


	const get_FCUAnalysis10List = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var get_FCUAnalysis10ListDao = await FCUReportDao.get_FCUAnalysis10ListDao(req)
			// console.log("get_AdditionalMFSurveyReport", get_AdditionalMFSurveyReport)

			if (get_FCUAnalysis10ListDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: get_FCUAnalysis10ListDao.data,
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


	const get_FCUAnalysis7List = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var get_FCUAnalysis7ListDao = await FCUReportDao.get_FCUAnalysis7ListDao(req)
			// console.log("get_AdditionalMFSurveyReport", get_AdditionalMFSurveyReport)

			if (get_FCUAnalysis7ListDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: get_FCUAnalysis7ListDao.data,
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

	const get_FCUAnalysis8List = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var get_FCUAnalysis8ListDao = await FCUReportDao.get_FCUAnalysis8ListDao(req)
			console.log("get_FCUAnalysis8ListDao", get_FCUAnalysis8ListDao)

			if (get_FCUAnalysis8ListDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: get_FCUAnalysis8ListDao.data,
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

		get_FCUAnalysis1List,
		get_FCUAnalysis2List,
		get_FCUAnalysis5List,
		get_FCUAnalysis6List,
		get_FCUAnalysis4List,
		get_FCUAnalysis10List,
		get_FCUAnalysis7List,
		get_FCUAnalysis8List

	};
};
export default FCUReportController();