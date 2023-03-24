import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const {
	lymphedemaLineList,
	lymphedemaLineListSurvey,
	lymphedemaLineListFollowUpsLF,
	lymphedemaLineListFollowUpsHF,
	udCategoryOptions, verticalControlFieldUnits, verticalControlUnits,
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

const lHLineListController = () => {
	const create = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let patientInfo = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.id) {
				patientInfo = await lymphedemaLineList.update(
					reqObj.LymphedemaLineLists,
					{
						where: { id: reqObj["id"] },
					}
				);
				reqObj.LymphedemaLineLists.LymphedemaLineListSurveys.forEach(
					(element) => {
						if (element["id"]) {
							patientInfo = lymphedemaLineListSurvey.update(
								element,
								{
									where: { id: element["id"] },
								}
							);
						} else if (!element["id"]) {
							element.lymphedemaLineListId = reqObj.id;
							patientInfo = lymphedemaLineListSurvey.create(
								element
							);
						}
					}
				);

				reqObj.LymphedemaLineLists.LymphedemaLineListFollowUpsLFs.forEach(
					(element) => {
						if (element["id"]) {
							patientInfo = lymphedemaLineListFollowUpsLF.update(
								element,
								{
									where: { id: element["id"] },
								}
							);
						} else if (!element["id"]) {
							element.lymphedemaLineListId = reqObj.id;
							patientInfo = lymphedemaLineListFollowUpsLF.create(
								element
							);
						}
					}
				);

				reqObj.LymphedemaLineLists.LymphedemaLineListFollowUpsHFs.forEach(
					(element) => {
						if (element["id"]) {
							patientInfo = lymphedemaLineListFollowUpsHF.update(
								element,
								{
									where: { id: element["id"] },
								}
							);
						} else if (!element["id"]) {
							element.lymphedemaLineListId = reqObj.id;
							patientInfo = lymphedemaLineListFollowUpsHF.create(
								element
							);
						}
					}
				);

			} else {
				patientInfo = await lymphedemaLineList.findOne({
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
					include: [
						{
							model: lymphedemaLineListSurvey,
							as: "LymphedemaLineListSurveys",
						},
						{
							model: lymphedemaLineListFollowUpsLF,
							as: "LymphedemaLineListFollowUpsLFs",
						},
						{
							model: lymphedemaLineListFollowUpsHF,
							as: "LymphedemaLineListFollowUpsHFs",
						}
					],
				});
				var patientID = await lymphedemaLineList.findOne({
					attributes: {
						include: ["id"],
					},
					order: [["id", "DESC"]],
				});
				var districtId = await districts.findOne({
					where: reqObj.districtId,
					attributes: {
						include: ["id", "districtCode"],
					},
					order: [["createdAt", "DESC"]],
				});
				let currentId =
					patientID && patientID.dataValues && patientID.dataValues.id
						? +patientID.dataValues.id + 1
						: 1;
				let districtCode =
					districtId && districtId.dataValues && districtId.dataValues.districtCode;

				reqObj.patientId = "IND" + "-MH" + "-" + districtCode + "-" + (!reqObj.year ? "YYYY" : reqObj.year) + "-LF" + "0000" + currentId;
				console.log("patientID Id", patientID);
				console.log("districtId Id", districtId);
				console.log("currentId Id", currentId);
				console.log("districtCode Id", districtCode);
				console.log("patient Id", reqObj.patientId);
				patientInfo = await lymphedemaLineList.create(
					reqObj,
					{
						include:
							[
								{
									model: lymphedemaLineListSurvey,
									as: "LymphedemaLineListSurveys",
								},
								{
									model: lymphedemaLineListFollowUpsLF,
									as: "LymphedemaLineListFollowUpsLFs",
								},
								{
									model: lymphedemaLineListFollowUpsHF,
									as: "LymphedemaLineListFollowUpsHFs",
								}
							]
					}
				);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: patientInfo,
				message: label.LABEL_SUCCESS,
			});
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
	};
	const getLHLineList = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {}; let cond2 = {}; let cond3 = {}; let cond4 = {}; let cond5 = {};

			if (reqObj.id) {
				cond["id"] = reqObj.id;
			}
			if (reqObj.patientId) {
				cond["patientId"] = { [Op.iLike]: "%" + reqObj["patientId"] + "%" }
			}
			if (reqObj.patientName) {
				cond["nameOfPatient"] = { [Op.iLike]: "%" + reqObj["patientName"] + "%" }
			}
			if (reqObj.districtId) {
				cond["districtId"] = reqObj.districtId
			}
			if (reqObj.talukaId) {
				cond["talukaId"] = reqObj.talukaId
			}
			if (reqObj.facilityId) {
				cond["facilityId"] = reqObj.facilityId
			}
			if (reqObj.subCenterId) {
				cond["subCenterId"] = reqObj.subCenterId
			}
			if (reqObj.villageId) {
				cond["villageId"] = reqObj.villageId
			}
			cond["isActive"] = true;
			if (reqObj.grading) {
				cond["grading"] = reqObj.grading;
			}
			if (reqObj.gender) {
				cond["gender"] = reqObj.gender;
			}
			if (reqObj.patientMobileNumber) {
				cond["patientMobileNumber"] = { [Op.iLike]: "%" + reqObj["patientMobileNumber"] + "%" }
			}
			if (reqObj.ashaMobileNumber) {
				cond["ashaMobileNumber"] = { [Op.iLike]: "%" + reqObj["ashaMobileNumber"] + "%" }
			}
			if (reqObj.unitOfAction) {
				cond3["unitOfAction"] = reqObj.unitOfAction;
			}
			if (reqObj.nameOfUnit) {
				cond4["nameOfUnit"] = reqObj.nameOfUnit;
			}
			if (reqObj.nameOfFiledUnit) {
				cond5["nameOfFiledUnit"] = reqObj.nameOfFiledUnit;
			}
			let { count, rows: patientInfo } =
				await lymphedemaLineList.findAndCountAll({
					where: cond,
					order: [["id", "DESC"]],
					include: [
						{
							model: lymphedemaLineListSurvey,
							as: "LymphedemaLineListSurveys",
							required: false
						},
						{
							model: lymphedemaLineListFollowUpsLF,
							as: "LymphedemaLineListFollowUpsLFs",
							required: false
						},
						{
							model: lymphedemaLineListFollowUpsHF,
							as: "LymphedemaLineListFollowUpsHFs",
							required: false
						},
						{
							model: districts,
							attributes: ["id", "districtName"],
							required: false
						},
						{
							model: talukas,
							attributes: ["id", "talukaName"],
							required: false
						},
						{
							model: wards,
							attributes: ["id", "wardName"],
							required: false
						},
						{
							model: villages,
							attributes: ["id", "villageName"],
							required: false
						},
						{
							model: facilities,
							attributes: ["id", "facilityName"],
							required: false
						},
						{
							model: zones,
							attributes: ["id", "zoneName"],
							required: false
						},
						{
							model: subCenters,
							attributes: ["id", "subCenterName"],
							required: false
						},
						{
							model: corporations,
							attributes: ["id", "corporationName"],
							required: false
						},
						{
							where: cond2,
							model: udCategoryOptions,
							as: "Grading",
							required: false
						},
						{
							where: cond3,
							model: udCategoryOptions,
							as: "UnitOfAction",
							required: false
						},
						{
							where: cond4,
							model: verticalControlUnits,
							required: false
						},
						{
							where: cond5,
							model: verticalControlFieldUnits,
							required: false
						}
					],
				});

			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: patientInfo,
				message: label.LABEL_SUCCESS,
			});
		} catch (err) {
			console.error(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err
			});
		}
	};

	const deleteLHLineList = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await lymphedemaLineList.update(
					{ isActive: false },
					{
						where: { id: reqObj.id },
					}
				);

				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.DELETE_SUCCESS,
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.SOMETHING_WRONG,
				});
			}
		} catch (err) {
			console.error(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err
			});
		}
	};
	const postPatientInformation = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let lymphedemaLineListData = [];
			if (reqObj.id) {
				lymphedemaLineListData = await lymphedemaLineList.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				var patientID = await lymphedemaLineList.findOne({
					attributes: {
						include: ["id"],
					},
					order: [["createdAt", "DESC"]],
				});
				var districtId = await districts.findOne({
					where: reqObj.districtId,
					attributes: {
						include: ["id", "districtCode"],
					},
					order: [["createdAt", "DESC"]],
				});
				let currentId =
					patientID && patientID.dataValues && patientID.dataValues.id
						? +patientID.dataValues.id + 1
						: 1;
				let districtCode =
					districtId && districtId.dataValues && districtId.dataValues.districtCode;

				reqObj.patientId = "IND" + "-MH" + "-" + districtCode + "-" + (!reqObj.year ? "YYYY" : reqObj.year) + "-LF" + "0000" + currentId;

				lymphedemaLineListData = await lymphedemaLineList.create(reqObj);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: lymphedemaLineListData,
				message: label.LABEL_SUCCESS,
			});
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
	const postSurvey = async (req, res) => {
		try {

			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let lymphedemaLineListSurveyData = [];
			if (reqObj.id) {
				lymphedemaLineListSurveyData = await lymphedemaLineListSurvey.update(reqObj, {
					where: { id: reqObj["id"] }
				});
			} else {
				lymphedemaLineListSurveyData = await lymphedemaLineListSurvey.create(reqObj);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: lymphedemaLineListSurveyData,
				message: label.LABEL_SUCCESS,
			});
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
	const getSurveyList = async (req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {}; let cond2 = {}; let cond3 = {}; let cond4 = {};
			if (reqObj.id) {
				cond["id"] = reqObj.id;
			}
			if (reqObj.id) {
				cond[""] = reqObj.id;
			}
			if (reqObj.lymphedemaLineListId) {
				cond["lymphedemaLineListId"] = reqObj.lymphedemaLineListId;
			}
			if (reqObj.surveyDoneUnder) {
				cond2["surveyDoneUnder"] = reqObj.surveyDoneUnder;
			}
			cond["isActive"] = true;
			let { count, rows: surveys } =
				await lymphedemaLineListSurvey.findAndCountAll({
					where: cond,
					order: [["id", "DESC"]],
					include: [{
						where: cond2,
						model: udCategoryOptions,
						required: false
					}]
				});

			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: surveys,
				message: label.LABEL_SUCCESS,
			});
		} catch (err) {
			console.error(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err
			});
		}
	};
	const postLFFollowups = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let lymphedemaLineListFollowUpsLFData = [];
			if (reqObj.id) {
				lymphedemaLineListFollowUpsLFData = await lymphedemaLineListFollowUpsLF.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				lymphedemaLineListFollowUpsLFData = await lymphedemaLineListFollowUpsLF.create(reqObj);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: lymphedemaLineListFollowUpsLFData,
				message: label.LABEL_SUCCESS,
			});
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
	const getLFFollowups = async (req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {}; let cond1 = {};

			console.log("reqObj", reqObj);
			if (reqObj.id) {
				cond["id"] = reqObj.id;
			}
			if (reqObj.lymphedemaLineListId) {
				cond["lymphedemaLineListId"] = reqObj.lymphedemaLineListId;
			}
			if (reqObj.followUpLostReasonsId) {
				cond1["followUpLostReasonsId"] = reqObj.followUpLostReasonsId;
			}
			cond["isActive"] = true;
			let { count, rows: surveys } =
				await lymphedemaLineListFollowUpsLF.findAndCountAll({
					where: cond,
					order: [["id", "DESC"]],
					include: [
						{
							where: cond1,
							model: udCategoryOptions,
							as: "FollowUpLostReasonsId",
							required: false
						}
					]
				});

			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: surveys,
				message: label.LABEL_SUCCESS,
			});
		} catch (err) {
			console.error(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err
			});
		}
	};
	const postHFFollowups = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let lymphedemaLineListFollowUpsHFData = [];
			if (reqObj.id) {
				lymphedemaLineListFollowUpsHFData = await lymphedemaLineListFollowUpsHF.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				lymphedemaLineListFollowUpsHFData = await lymphedemaLineListFollowUpsHF.create(reqObj);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: lymphedemaLineListFollowUpsHFData,
				message: label.LABEL_SUCCESS,
			});
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
	const getHFFollowups = async (req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {}; let cond2 = {}; let cond3 = {};

			if (reqObj.id) {
				cond["id"] = reqObj.id;
			}
			if (reqObj.lymphedemaLineListId) {
				cond["lymphedemaLineListId"] = reqObj.lymphedemaLineListId;
			}
			if (reqObj.surgeryNotPossibleReasonsId) {
				cond2["surgeryNotPossibleReasonsId"] = reqObj.surgeryNotPossibleReasonsId;
			}
			if (reqObj.nameOfHospitalSurgeryDoneId) {
				cond3["nameOfHospitalSurgeryDoneId"] = reqObj.nameOfHospitalSurgeryDoneId;
			}
			cond["isActive"] = true;
			let { count, rows: surveys } =
				await lymphedemaLineListFollowUpsHF.findAndCountAll({
					where: cond,
					order: [["id", "DESC"]],
					include: [
						{
							where: cond2,
							model: udCategoryOptions,
							as: "SurgeryNotPossibleReasonsId",
							required: false
						},
						{
							where: cond3,
							model: facilities,
							as: "NameOfHospitalSurgeryDoneId",
							required: false
						}
					]
				});

			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: surveys,
				message: label.LABEL_SUCCESS,
			});
		} catch (err) {
			console.error(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err
			});
		}
	};
	const getPatientInfo = async (req, res) => {

		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {};

			console.log("reqObj", reqObj);
			if (reqObj.id) {
				cond["id"] = reqObj.id;
			}

			cond["isActive"] = true;
			let { count, rows: surveys } =
				await lymphedemaLineList.findAndCountAll({
					where: cond,
					order: [["id", "DESC"]],

				});

			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: surveys,
				message: label.LABEL_SUCCESS,
			});
		} catch (err) {
			console.error(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err
			});
		}
	};
	const deleteHFFollowup = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await lymphedemaLineListFollowUpsHF.update(
					{ isActive: false },
					{
						where: { id: reqObj.id },
					}
				);

				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.DELETE_SUCCESS,
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.SOMETHING_WRONG,
				});
			}
		} catch (err) {
			console.error(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err
			});
		}
	};
	const deleteLFFollowup = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await lymphedemaLineListFollowUpsLF.update(
					{ isActive: false },
					{
						where: { id: reqObj.id },
					}
				);

				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.DELETE_SUCCESS,
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.SOMETHING_WRONG,
				});
			}
		} catch (err) {
			console.error(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err
			});
		}
	};
	const deleteSurvey = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await lymphedemaLineListSurvey.update(
					{ isActive: false },
					{
						where: { id: reqObj.id },
					}
				);

				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.DELETE_SUCCESS,
				});
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.SOMETHING_WRONG,
				});
			}
		} catch (err) {
			console.error(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err
			});
		}
	};
	return {
		postPatientInformation,
		postSurvey,
		getSurveyList,
		getLFFollowups,
		postLFFollowups,
		getHFFollowups,
		postHFFollowups,
		create,
		getLHLineList,
		deleteLHLineList,
		getPatientInfo,
		deleteHFFollowup,
		deleteLFFollowup,
		deleteSurvey
	};
};
export default lHLineListController();
