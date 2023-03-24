import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { mfPositiveLineList, mfPositiveLineListSurvey, mfPositiveLineListPatients, mfPositiveLineListBSFollowUps, verticalControlUnits, udCategoryOptions, verticalControlFieldUnits,
	districts, talukas, facilities, villages, zones, subCenters, corporations } = db;
const Op = db.Sequelize.Op;

const mfPositiveController = () => {
	const createMfPositiveLineList = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let mfPositiveLineData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			var obj = {};
			if (reqObj.id) {
				mfPositiveLineData = await mfPositiveLineList.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				var patientID = await mfPositiveLineList.findOne({
					attributes: {
						include: ["id"],
					},
					order: [["id", "DESC"]],
				});
				let currentId =
					patientID && patientID.dataValues && patientID.dataValues.id
						? +patientID.dataValues.id + 1
						: 1;
				reqObj.srNo = "SR" + currentId;
				mfPositiveLineData = await mfPositiveLineList.create(reqObj);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: mfPositiveLineData,
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
	const createAllMfPositiveLineList = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let mfPositiveLineData = [];
			let mfPositiveLineListPatientsData = [];
			let incomingMfPositiveLineListPatientsData = reqObj && reqObj.mfPositiveLineListPatients && reqObj.mfPositiveLineListPatients.length
				? reqObj.mfPositiveLineListPatients
				: [];
			let mfPositiveLineListPatientsUpdatedData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.id) {
				mfPositiveLineData = await mfPositiveLineList.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				var patientID = await mfPositiveLineList.findOne({
					attributes: {
						include: ["id"],
					},
					order: [["id", "DESC"]],
				});
				let currentId =
					patientID && patientID.dataValues && patientID.dataValues.id
						? +patientID.dataValues.id + 1
						: 1;
				reqObj.srNo = "SR" + currentId;
				mfPositiveLineData = await mfPositiveLineList.create(reqObj,
					{
						include:
							[
								{
									model: mfPositiveLineListSurvey,
									as: "mfPositiveLineListSurveys",
								},
								{
									model: mfPositiveLineListBSFollowUps,
									as: "mfPositiveLineListBSFollowUps",
								}
							]
					});
				incomingMfPositiveLineListPatientsData.forEach(async (element) => {
					if (mfPositiveLineData && mfPositiveLineData.id) {
						if (element["id"]) {
							element.mfPositiveLineListId = mfPositiveLineData.id;
							mfPositiveLineListPatientsData = mfPositiveLineListPatients.update(element, {
								where: { id: element["id"] },
							});
						} else if (!element["id"]) {
							element.mfPositiveLineListId = mfPositiveLineData.id;
							mfPositiveLineListPatientsData = await mfPositiveLineListPatients.create(element);
							mfPositiveLineListPatientsData.patientId = "MF" + "0000" + mfPositiveLineListPatientsData.id;
							mfPositiveLineListPatientsUpdatedData = await mfPositiveLineListPatients.update({ patientId: mfPositiveLineListPatientsData.patientId }, {
								where: { id: mfPositiveLineListPatientsData["id"] },
							});
						}
					}
				})
			}

			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: mfPositiveLineData,
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
	const getMFPositiveLineList = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {}; let cond1 = {}; let cond2 = {};

			if (reqObj.id) {
				cond["id"] = reqObj.id;
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
			if (reqObj.bsCollectionAntigenTest) {
				cond1["bsCollectionAntigenTest"] = reqObj.bsCollectionAntigenTest;
			}
			if (reqObj.unitOfAction) {
				cond1["unitOfAction"] = reqObj.unitOfAction;
			}
			cond["isActive"] = true;
			let { count, rows: mfPositiveLineData } =
				await mfPositiveLineList.findAndCountAll({
					where: cond,

					order: [["id", "DESC"]],
					include: [
						{
							model: mfPositiveLineListSurvey,
							required: false
						},
						{
							model: mfPositiveLineListPatients,
							required: false
						},
						{
							model: mfPositiveLineListBSFollowUps,
							required: false
						},
						{
							model: verticalControlUnits,
							required: false
						},
						{
							model: verticalControlFieldUnits,
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
							where: cond1,
							model: udCategoryOptions,
							as: "BsCollectionAntigenTest",
							attributes: ["categoryCode", "categoryName", "categoryOptionEnum", "categoryOptionName"],
							required: false
						},
						{
							where: cond2,
							model: udCategoryOptions,
							as: "UnitOfAction2",
							attributes: ["categoryCode", "categoryName", "categoryOptionEnum", "categoryOptionName"],
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
				data: mfPositiveLineData,
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

	const deleteMFPositiveLineList = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await mfPositiveLineList.update(
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
	const createMfPositiveLineListSurvey = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			if (reqObj.noOfBSFoundPositive && reqObj["fieldUnitId"]) {
				await mfPositiveLineList.update(reqObj, {
					where: { id: reqObj["fieldUnitId"] },
				});
			}
			let mfPositiveLineListSurveyData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.fieldUnitId) {
				reqObj.surveyInfo.forEach((element) => {
					if (element["id"]) {
						element.mfPositiveLineListId = reqObj.fieldUnitId;
						if (!element.dateOfAction) {
							element.dateOfAction = new Date()
						} else {
							element.dateOfAction = element.dateOfAction;
						}
						mfPositiveLineListSurveyData = mfPositiveLineListSurvey.update(element, {
							where: { id: element["id"] },
						});
					} else if (!element["id"]) {
						element.mfPositiveLineListId = reqObj.fieldUnitId;
						if (!element.dateOfAction) {
							element.dateOfAction = new Date()
						} else {
							element.dateOfAction = element.dateOfAction;
						}
						mfPositiveLineListSurveyData = mfPositiveLineListSurvey.create(element);
					}
				});

			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: mfPositiveLineListSurveyData,
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
	const getMfPositiveLineListSurvey = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {};

			if (reqObj.fieldUnitId) {
				cond["mfPositiveLineListId"] = reqObj.fieldUnitId;
			}
			cond["isActive"] = true;
			let { count, rows: mfPositiveLineListSurveyData } =
				await mfPositiveLineListSurvey.findAndCountAll({
					where: cond,

					order: [["id", "ASC"]],
				});

			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.EMPTY,
				});
			}
			let responseData = {};
			responseData.surveyInfo = mfPositiveLineListSurveyData;
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: responseData,
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

	const deleteMfPositiveLineListSurvey = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await mfPositiveLineListSurvey.update(
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
	const createMfPositiveLineListPatients = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let mfPositiveLineListPatientsData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			var obj = {};
			if (reqObj.id) {
				mfPositiveLineListPatientsData = await mfPositiveLineListPatients.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				var patientID = await mfPositiveLineListPatients.findOne({
					attributes: {
						include: ["id"],
					},
					order: [["id", "DESC"]],
				});

				let currentId =
					patientID && patientID.dataValues && patientID.dataValues.id
						? +patientID.dataValues.id + 1
						: 1;


				reqObj.patientId = "MF" + "0000" + currentId;
				mfPositiveLineListPatientsData = await mfPositiveLineListPatients.create(reqObj);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: mfPositiveLineListPatientsData,
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
	const getMfPositiveLineListPatients = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {}; let cond1 = {}; let cond2 = {};

			if (reqObj.id) {
				cond["id"] = reqObj.id;
			}
			if (reqObj.fieldUnitId) {
				cond["mfPositiveLineListId"] = reqObj.fieldUnitId;
			}
			if (reqObj.gender) {
				cond["gender"] = reqObj.gender;
			}
			if (reqObj.nameOfFiledUnit) {
				cond1["nameOfFiledUnit"] = reqObj.nameOfFiledUnit;
			}
			if (reqObj.reasonsForNonTreating) {
				cond2["reasonsForNonTreating"] = reqObj.reasonsForNonTreating;
			}
			cond["isActive"] = true;
			let { count, rows: mfPositiveLineListPatientsData } =
				await mfPositiveLineListPatients.findAndCountAll({
					where: cond,

					order: [["id", "DESC"]],
					include: [
						{
							model: mfPositiveLineList,
							required: false
						},
						{
							where: cond1,
							model: udCategoryOptions,
							as: "Gender",
							required: false
						},
						{
							where: cond2,
							model: udCategoryOptions,
							as: "ReasonsForNonTreating",
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
				data: mfPositiveLineListPatientsData,
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

	const deleteMfPositiveLineListPatients = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await mfPositiveLineListPatients.update(
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
	const createMfPositiveLineListBSFollowUps = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let mfPositiveLineListBSFollowUpsData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			var obj = {};
			if (reqObj.id) {
				mfPositiveLineListBSFollowUpsData = await mfPositiveLineListBSFollowUps.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				mfPositiveLineListBSFollowUpsData = await mfPositiveLineListBSFollowUps.findOne({
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				});
				mfPositiveLineListBSFollowUpsData = await mfPositiveLineListBSFollowUps.create(reqObj);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: mfPositiveLineListBSFollowUpsData,
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
	const getMfPositiveLineListBSFollowUps = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {};

			if (reqObj.id) {
				cond["id"] = reqObj.id;
			}
			if (reqObj.fieldUnitId) {
				cond["mfPositiveLineListId"] = reqObj.fieldUnitId;
			}
			cond["isActive"] = true;
			let { count, rows: mfPositiveLineListBSFollowUpsData } =
				await mfPositiveLineListBSFollowUps.findAndCountAll({
					where: cond,

					order: [["id", "DESC"]],
					include: [
						{
							model: mfPositiveLineListPatients,
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
				data: mfPositiveLineListBSFollowUpsData,
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

	const deleteMfPositiveLineListBSFollowUps = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await mfPositiveLineListBSFollowUps.update(
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
		createMfPositiveLineList,
		createAllMfPositiveLineList,
		getMFPositiveLineList,
		deleteMFPositiveLineList,
		createMfPositiveLineListSurvey,
		getMfPositiveLineListSurvey,
		deleteMfPositiveLineListSurvey,
		createMfPositiveLineListPatients,
		getMfPositiveLineListPatients,
		deleteMfPositiveLineListPatients,
		createMfPositiveLineListBSFollowUps,
		getMfPositiveLineListBSFollowUps,
		deleteMfPositiveLineListBSFollowUps
	};
};
export default mfPositiveController();
