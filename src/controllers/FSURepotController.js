import {
	validationResult
} from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
import FSURepotDao from "./../dao/FSURepotDao";

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
const FSUReportController = () => {



	const get_FSUAnalysis1List = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var get_FSUAnalysis1List = await FSURepotDao.get_FSUAnalysis1Dao(req)
			// console.log("get_AdditionalMFSurveyReport", get_AdditionalMFSurveyReport)

			if (get_FSUAnalysis1List.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: get_FSUAnalysis1List.data,
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



	const get_FSUAnalysis2List = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var get_FSUAnalysis2List = await FSURepotDao.get_FSUAnalysis2ListDao(req)
			// console.log("get_AdditionalMFSurveyReport", get_AdditionalMFSurveyReport)

			if (get_FSUAnalysis2List.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: get_FSUAnalysis2List.data,
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


	const get_FSUAnalysis3List = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var get_FSUAnalysis3ListDao = await FSURepotDao.get_FSUAnalysis3ListDao(req)
			// console.log("get_AdditionalMFSurveyReport", get_AdditionalMFSurveyReport)

			if (get_FSUAnalysis3ListDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: get_FSUAnalysis3ListDao.data,
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



	const get_FSUAnalysis4List = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			var obj = {}

			var NPSDao = await FSURepotDao.NPSDao(req)
			// console.log("get_AdditionalMFSurveyReport", get_AdditionalMFSurveyReport)

			if (NPSDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {

				obj.NPS = NPSDao.data

				var NBSEDao = await FSURepotDao.NBSEDao(req)
				if (NBSEDao.error) {
					return res.status(httpStatus.BAD_REQUEST).json({
						status: httpStatus.BAD_REQUEST,
						message: "Something Went Wrong"
					});
				} else {
					obj.NBSE = NBSEDao.data

					var NPMFDao = await FSURepotDao.NPMFDao(req)
					if (NPMFDao.error) {
						return res.status(httpStatus.BAD_REQUEST).json({
							status: httpStatus.BAD_REQUEST,
							message: "Something Went Wrong"
						});
					} else {
						obj.NPMF = NPMFDao.data

						var No_positive_DiseaseDao = await FSURepotDao.No_positive_DiseaseDao(req)
						if (No_positive_DiseaseDao.error) {
							return res.status(httpStatus.BAD_REQUEST).json({
								status: httpStatus.BAD_REQUEST,
								message: "Something Went Wrong"
							});
						} else {
							obj.No_Of_Positive_Disease = No_positive_DiseaseDao.data

							var NPLFMFDao = await FSURepotDao.NPLFMFDao(req)
							if (NPLFMFDao.error) {
								return res.status(httpStatus.BAD_REQUEST).json({
									status: httpStatus.BAD_REQUEST,
									message: "Something Went Wrong"
								});
							} else {
								obj.NPLFMF = NPLFMFDao.data

								var Total_MF_RateDao = await FSURepotDao.Total_MF_RateDao(req)
								if (Total_MF_RateDao.error) {
									return res.status(httpStatus.BAD_REQUEST).json({
										status: httpStatus.BAD_REQUEST,
										message: "Something Went Wrong"
									});
								} else {

									obj.Total_MF_Rate = Total_MF_RateDao.data

									var Total_Disease_RateDao = await FSURepotDao.Total_Disease_RateDao(req)
									if (Total_Disease_RateDao.error) {
										return res.status(httpStatus.BAD_REQUEST).json({
											status: httpStatus.BAD_REQUEST,
											message: "Something Went Wrong"
										});
									} else {
										obj.Total_Disease_Rate = Total_Disease_RateDao.data
										return res.status(httpStatus.OK).json({
											status: httpStatus.OK,
											data: obj,
											message: label.LABEL_SUCCESS,
										});
									}
								}

							}
						}
					}
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

	const get_FSUAnalysis5List = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var get_FSUAnalysis5ListDao = await FSURepotDao.get_FSUAnalysis5ListDao(req)
			// console.log("get_AdditionalMFSurveyReport", get_AdditionalMFSurveyReport)

			if (get_FSUAnalysis5ListDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: get_FSUAnalysis5ListDao.data,
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

	const fsuPercentageTargetCompleted = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var fsuPercentageTargetCompletedDao = await FSURepotDao.fsuPercentageTargetCompletedDao(req)
			// console.log("get_AdditionalMFSurveyReport", get_AdditionalMFSurveyReport)

			if (fsuPercentageTargetCompletedDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: fsuPercentageTargetCompletedDao.data,
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

		get_FSUAnalysis1List,
		get_FSUAnalysis2List,
		get_FSUAnalysis3List,
		get_FSUAnalysis4List,
		get_FSUAnalysis5List,
		fsuPercentageTargetCompleted
	};
};
export default FSUReportController();