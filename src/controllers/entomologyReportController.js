import {
	validationResult
} from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
import entomologyReportDao from "./../dao/entomologyReportDao";

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
const entomologyReportController = () => {



	const LarvicidalReport1 = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var LarvicidalReport1Dao = await entomologyReportDao.LarvicidalReport1Dao(req)
			// console.log("get_AdditionalMFSurveyReport", get_AdditionalMFSurveyReport)

			if (LarvicidalReport1Dao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: LarvicidalReport1Dao.data,
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

	const NFCUReportEntomology1 = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var NFCUReportEntomology1Dao = await entomologyReportDao.NFCUReportEntomology1Dao(req)
			// console.log("get_AdditionalMFSurveyReport", get_AdditionalMFSurveyReport)

			if (NFCUReportEntomology1Dao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: NFCUReportEntomology1Dao.data,
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



	const AdditionalEntomologicalReport = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var AdditionalEntomologicalReportDao = await entomologyReportDao.AdditionalEntomologicalReportDao(req)
			// console.log("get_AdditionalMFSurveyReport", get_AdditionalMFSurveyReport)

			if (AdditionalEntomologicalReportDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: AdditionalEntomologicalReportDao.data,
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

	const BaselineEntomoligicalReport = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}


			var BaselineEntomoligicalReportDao = await entomologyReportDao.BaselineEntomoligicalReportDao(req)
			// console.log("get_AdditionalMFSurveyReport", get_AdditionalMFSurveyReport)

			if (BaselineEntomoligicalReportDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: BaselineEntomoligicalReportDao.data,
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


	const LarvalDensityReport = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			var obj = {}

			var LarvalDensityReportUnitDao = await entomologyReportDao.LarvalDensityReportUnitDao(req)

			if (LarvalDensityReportUnitDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {

				obj.Unit = LarvalDensityReportUnitDao.data
				var LarvalDensityReportRuralDao = await entomologyReportDao.LarvalDensityReportRuralDao(req)

				if (LarvalDensityReportRuralDao.error) {
					return res.status(httpStatus.BAD_REQUEST).json({
						status: httpStatus.BAD_REQUEST,
						message: "Something Went Wrong"
					});
				} else {

					obj.Rural = LarvalDensityReportRuralDao.data
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


	const NFCUMosquitoDisectionReport = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			var obj = {}

			var NFCUMosquitoDisectionReportUnitDao = await entomologyReportDao.NFCUMosquitoDisectionReportUnitDao(req)

			if (NFCUMosquitoDisectionReportUnitDao.error) {
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: "Something Went Wrong"
				});
			} else {

				obj.Unit = NFCUMosquitoDisectionReportUnitDao.data
				var NFCUMosquitoDisectionReportRuralDao = await entomologyReportDao.NFCUMosquitoDisectionReportRuralDao(req)

				if (NFCUMosquitoDisectionReportRuralDao.error) {
					return res.status(httpStatus.BAD_REQUEST).json({
						status: httpStatus.BAD_REQUEST,
						message: "Something Went Wrong"
					});
				} else {

					obj.Rural = NFCUMosquitoDisectionReportRuralDao.data
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





	return {

		LarvicidalReport1,
		NFCUReportEntomology1,
		AdditionalEntomologicalReport,
		BaselineEntomoligicalReport,
		LarvalDensityReport,
		NFCUMosquitoDisectionReport

	};
};
export default entomologyReportController();