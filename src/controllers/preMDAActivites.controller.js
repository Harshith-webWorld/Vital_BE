import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { preMDAActivities, preMDAActivityDrugLogistics ,preMDAActivityDrugAdministrators ,preMDAActivitySupervisors, districts, talukas, wards, facilities, villages,
	subCenters,corporations,zones } = db;
const Op = db.Sequelize.Op;

const preMDAActivitiesController = () => {
	const createAllPreMDAActivity = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let preMDAActivityData= [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.id) {
				preMDAActivityData = await preMDAActivities.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				var lastID = await preMDAActivities.findOne({
					attributes: {
						include: ["id"],
					},
					order: [['id', 'DESC']]
				});
				let attributes = {
					exclude: ["createdAt", "updatedAt"],
				};
				var currentId = lastID && lastID.dataValues && lastID.dataValues.id ? (+lastID.dataValues.id) + 1 : 1;
				reqObj.srNo = "SR" + currentId;
				preMDAActivityData = await preMDAActivities.create(reqObj,{
					include: [
						{
							model: preMDAActivityDrugLogistics,
							as: "preMDAActivityDrugLogistics",
						},
						{
							model: preMDAActivityDrugAdministrators,
							as: "preMDAActivityDrugAdministrators",
						},
						{
							model: preMDAActivitySupervisors,
							as: "preMDAActivitySupervisors",
						},
					]
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: preMDAActivityData,
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

	const createPreMDAActivities = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let preMDAActivitiesData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			var obj = {}
			if (reqObj.id) {
				preMDAActivitiesData = await preMDAActivities.update(reqObj, {
					where: { id: reqObj["id"] },
				});
				reqObj.preMDAActivityDrugLogistics.forEach(element => {
					if (element["id"]) {
						preMDAActivitiesData = preMDAActivityDrugLogistics.update(
							element,
							{
								where: { id: element["id"] },
							}
						);
					} else if (!element["id"]) {
						element = reqObj.id;
						preMDAActivitiesData = preMDAActivityDrugLogistics.create(element);
					}
				});
				reqObj.preMDAActivityDrugAdministrators.forEach(element => {
					if (element["id"]) {
						preMDAActivitiesData = preMDAActivityDrugAdministrators.update(
							element,
							{
								where: { id: element["id"] },
							}
						);
					} else if (!element["id"]) {
						element.preMDAActivityId = reqObj.id;
						preMDAActivitiesData = preMDAActivityDrugAdministrators.create(element);
					}
				});
				reqObj.preMDAActivitySupervisors.forEach(element => {
					if (element["id"]) {
						preMDAActivitiesData = preMDAActivitySupervisors.update(
							element,
							{
								where: { id: element["id"] },
							}
						);
					} else if (!element["id"]) {
						element.preMDAActivityId = reqObj.id;
						preMDAActivitiesData = preMDAActivitySupervisors.create(element);
					}
				});
			} else {
				var lastID = await preMDAActivities.findOne({
					attributes: {
						include: ["id"],
					},
					order: [['createdAt', 'DESC']]
				});
				let attributes = {
					exclude: ["createdAt", "updatedAt"],
				};
				var currentId = lastID && lastID.dataValues && lastID.dataValues.id ? (+lastID.dataValues.id) + 1 : 1;
				reqObj.srNo = "SR" + currentId;
				preMDAActivitiesData = await preMDAActivities.create(reqObj,
					{
						include: [
							{
								model: preMDAActivityDrugLogistics,
								as: "preMDAActivityDrugLogistics",
							},
							{
								model: preMDAActivityDrugAdministrators,
								as: "preMDAActivityDrugAdministrators",
							},
							{
								model: preMDAActivitySupervisors,
								as: "preMDAActivitySupervisors",
							},
						],
						attributes: attributes
					});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: preMDAActivitiesData,
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
	const createPreMDAActivityDrugLogistics = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let preMDAActivityDrugLogisticsData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.id) {
				preMDAActivityDrugLogisticsData = await preMDAActivityDrugLogistics.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				preMDAActivityDrugLogisticsData = await preMDAActivityDrugLogistics.create(reqObj);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: preMDAActivityDrugLogisticsData,
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
	const getPreMDAActivities = async (req, res) => {
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
			if (reqObj.districtId) {
				cond["districtId"] = reqObj.districtId;
			}
			cond["isActive"] = true;
			let subCond = { isActive: true};
			
			let { count, rows: preMDAActivitiesData } =
				await preMDAActivities.findAndCountAll({
					where: cond,
					order: [["id", "DESC"]],
                    required: false,
					include: [
						{
							model: preMDAActivityDrugLogistics,
							as: "preMDAActivityDrugLogistics",
							required:false
						},
						{
							model: preMDAActivityDrugAdministrators,
							as: "preMDAActivityDrugAdministrators",
							where: subCond,
							required: false
						},
						{
							model: preMDAActivitySupervisors,
							as: "preMDAActivitySupervisors",
							where: subCond,
							required: false
						},
						{
							model: districts,
							attributes: ["id", "districtName"],
							required:false
						},
						{
							model: talukas,
							attributes: ["id", "talukaName"],
							required:false
						},
						{
							model: wards,
							attributes: ["id", "wardName"],
							required:false
						},
						{
							model: villages,
							attributes: ["id", "villageName"],
							required:false
						},
						{
							model: facilities,
							attributes: ["id", "facilityName"],
							required:false
						},
						{
							model: subCenters,
							attributes: ["id", "subCenterName"],
							required:false
						},
						{
							model: corporations,
							attributes: ["id", "corporationName"],
							required:false
						},
						{
							model: zones,
							attributes: ["id", "zoneName"],
							required:false
						},
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
				data: preMDAActivitiesData,
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
	const getAllPreMDAActivityDrugLogistics = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);

			let cond = {};

			if (reqObj.preMDAActivityId) {
				cond["preMDAActivityId"] = reqObj.preMDAActivityId;
			}
			cond["isActive"] = true;
			let { count, rows: preMDAActivityDrugLogisticsData } =
				await preMDAActivityDrugLogistics.findAndCountAll({
					where: cond,
					order: [["id", "DESC"]],
					include:[
						{
							model: preMDAActivities,
							attributes: ["srNo"],
							required:false
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
				data: preMDAActivityDrugLogisticsData,
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
	const getPreMDAActivityDrugLogistics = async (req, res) => {
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
			cond["isActive"] = true;
			let { count, rows: preMDAActivityDrugLogisticsData } =
				await preMDAActivityDrugLogistics.findAndCountAll({
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
				data: preMDAActivityDrugLogisticsData,
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

	const deletePreMDAActivities = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await preMDAActivities.update(
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
	const deletepreMDAActivityDrugAdministrators = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await preMDAActivityDrugAdministrators.update(
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
	const deletepreMDAActivitySupervisors = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await preMDAActivitySupervisors.update(
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
	const deletePreMDAActivityDrugLogistics = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await preMDAActivityDrugLogistics.update(
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
		createAllPreMDAActivity,
		createPreMDAActivities,
		createPreMDAActivityDrugLogistics,
		getPreMDAActivities,
		getPreMDAActivityDrugLogistics,
		deletePreMDAActivities,
		deletePreMDAActivityDrugLogistics,
		deletepreMDAActivitySupervisors,
		deletepreMDAActivityDrugAdministrators,
		getAllPreMDAActivityDrugLogistics
	};
};
export default preMDAActivitiesController();
