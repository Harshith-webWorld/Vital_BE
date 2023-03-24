import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const {
	staffPosVerticalUnits,
	staffPosVerticalUnitTrainingStatus,
	staffPosVerticalUnitStaffs,
	states,
	districts, designations, udCategoryOptions, verticalControlUnits
} = db;
const Op = db.Sequelize.Op;

const staffPosVerticalUnitsController = () => {
	const createStaffPosVerticalUnits = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let staffPosVerticalUnitsData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			var obj = {};
			if (reqObj.id) {
				staffPosVerticalUnitsData = await staffPosVerticalUnits.update(
					reqObj,
					{
						where: { id: reqObj["id"] },
					}
				);
			} else {
				var lastID = await staffPosVerticalUnits.findOne({
					attributes: {
						include: ["id"],
					},
					order: [["id", "DESC"]],
				});
				var currentId =
					lastID && lastID.dataValues && lastID.dataValues.id
						? +lastID.dataValues.id + 1
						: 1;
				reqObj.srNo = "SR" + currentId;
				staffPosVerticalUnitsData = await staffPosVerticalUnits.create(
					reqObj
				);
				if(reqObj.staffPosVerticalUnitStaffs && reqObj.staffPosVerticalUnitStaffs.length){
					let staffPosVerticalUnitId = staffPosVerticalUnitsData.dataValues.id
					for (let staff of reqObj.staffPosVerticalUnitStaffs) {
						staff.staffPosVerticalUnitId = staffPosVerticalUnitId
						if(staff.staffPosVerticalUnitTrainingStatuses && staff.staffPosVerticalUnitTrainingStatuses.length){
							for (let status of staff.staffPosVerticalUnitTrainingStatuses) {
								status.staffPosVerticalUnitId = staffPosVerticalUnitId
							}
						}
						await staffPosVerticalUnitStaffs.create(staff, {
							include: [{
								model: staffPosVerticalUnitTrainingStatus
							}],
						});
					}
				}
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: staffPosVerticalUnitsData,
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

	const createAllStaffPosVerticalUnits = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let staffPosVerticalUnitsData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			var obj = {};
			if (reqObj.id) {
				staffPosVerticalUnitsData = await staffPosVerticalUnits.update(
					reqObj,
					{
						where: { id: reqObj["id"] },
					}
				);
			} else {
				var lastID = await staffPosVerticalUnits.findOne({
					attributes: {
						include: ["id"],
					},
					order: [["id", "DESC"]],
				});
				var currentId =
					lastID && lastID.dataValues && lastID.dataValues.id
						? +lastID.dataValues.id + 1
						: 1;

				reqObj.srNo = "SR" + currentId;
				staffPosVerticalUnitsData =
					await staffPosVerticalUnits.create(
						reqObj,
						{
							include:
								[
									{
										model: staffPosVerticalUnitStaffs,
										include: [{ model: staffPosVerticalUnitTrainingStatus }]
									},
								]
						},
						{ returning: true }
					);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: staffPosVerticalUnitsData,
				message: label.LABEL_SUCCESS,
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




	const getStaffPosVerticalUnits = async (req, res) => {
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
			if (reqObj.districtId) {
                cond["districtId"] = reqObj.districtId;
            }
			if (reqObj.typeOfUnit) {
				cond2["typeOfUnit"] = reqObj.typeOfUnit;
			}

			if (reqObj.nameOfUnit) {
				cond3["nameOfUnit"] = reqObj.nameOfUnit;
			}
			if (reqObj.cadre) {
				cond4["cadre"] = reqObj.cadre;
			}
			cond["isActive"] = true;

			let { count, rows: staffPosVerticalUnitsData } =
				await staffPosVerticalUnits.findAndCountAll({
					where: cond,

					order: [["id", "DESC"]],
					include: [
						{
							model: states,
							attributes: ["id", "stateName"],
							required: false
						},
						{
							model: districts,
							attributes: ["id", "districtName"],
							required: false
						},
						{
							where: cond2,
							model: udCategoryOptions,
							as: "TypeOfUnit2",
							required: false
						},
						{
							where: cond4,
							model: udCategoryOptions,
							as: "Cadre2",
							required: false
						},
						{
							where: cond3,
							model: verticalControlUnits,
							required: false
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
				data: staffPosVerticalUnitsData,
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

	const deleteStaffPosVerticalUnits = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await staffPosVerticalUnits.update(
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
	const createStaffPosVerticalUnitStaffs = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let staffPosVerticalUnitStaffsData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.id) {
				console.log("reqObj:: ", reqObj);
				staffPosVerticalUnitStaffsData =
					await staffPosVerticalUnitStaffs.update(reqObj, {
						where: { id: reqObj["id"] },
					});
				reqObj.staffPosVerticalUnitTrainingStatuses.forEach(
					(element) => {
						if (element["id"]) {
							staffPosVerticalUnitStaffsData =
								staffPosVerticalUnitTrainingStatus.update(
									element,
									{
										where: { id: element["id"] },
									}
								);
						} else if (!element["id"]) {
							element.staffPosVerticalUnitStaffId = parseInt(reqObj.id);
							console.log("element:: ", element);
							staffPosVerticalUnitStaffsData =
								staffPosVerticalUnitTrainingStatus.create(
									element
								);
						}
					}
				);
			} else {

				staffPosVerticalUnitStaffsData =
					await staffPosVerticalUnitStaffs.create(reqObj, {
						include: [{
							model: staffPosVerticalUnitTrainingStatus
						}],
					});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: staffPosVerticalUnitStaffsData,
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
	const getAllStaffPosVerticalUnitStaffs = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {}; let cond2 = {};
			if (reqObj.id) {
				cond["id"] = reqObj.id;
			}
			console.log("staffPosVerticalUnitId1111:: ", reqObj.id);

			cond["isActive"] = true;
			let { count, rows: staffPosVerticalUnitStaffsData } =
				await staffPosVerticalUnitStaffs.findAndCountAll({
					where: cond,

					order: [["id", "DESC"]],
					include: [{
						model: staffPosVerticalUnitTrainingStatus,
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
				data: staffPosVerticalUnitStaffsData,
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
	const getStaffPosVerticalUnitStaffs = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {}; let cond2 = {}; let cond3 = {};

			console.log("staffPosVerticalUnitId2222:: ", reqObj.id);
			if (reqObj.id) {
				cond["staffPosVerticalUnitId"] = reqObj.id;
			}
			if (reqObj.typeOfUnit) {
				cond2["typeOfUnit"] = reqObj.typeOfUnit;
			}

			if (reqObj.nameOfUnit) {
				cond3["nameOfUnit"] = reqObj.nameOfUnit;
			}

			cond["isActive"] = true;
			let { count, rows: staffPosVerticalUnitStaffsData } =
				await staffPosVerticalUnitStaffs.findAndCountAll({
					where: cond,
					order: [["id", "DESC"]],
					include: [
						{
							model: staffPosVerticalUnits,
							include: [{
								where: cond2,
								model: udCategoryOptions,
								as: "TypeOfUnit2",
								required: false
							},
							{
								where: cond3,
								model: verticalControlUnits,
								required: false
							}]
						},
						{
							model: designations,
							as: "Designation",
							required: false
						},
						{
							model: staffPosVerticalUnitTrainingStatus,
							// where: cond,
							required: false
						}],
				});
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: staffPosVerticalUnitStaffsData,
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

	const deleteStaffPosVerticalUnitStaffs = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await staffPosVerticalUnitStaffs.update(
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
	const createStaffPosVerticalUnitTrainingStatus = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let staffPosVerticalUnitTrainingStatusData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.id) {
				staffPosVerticalUnitTrainingStatusData =
					await staffPosVerticalUnitTrainingStatus.update(reqObj, {
						where: { id: reqObj["id"] },
					});
			} else {
				staffPosVerticalUnitTrainingStatusData =
					await staffPosVerticalUnitTrainingStatus.findOne({
						where: whereCodn,
						attributes: {
							exclude: ["createdAt", "updatedAt"],
						},
					});
				staffPosVerticalUnitTrainingStatusData =
					await staffPosVerticalUnitTrainingStatus.create(reqObj);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: staffPosVerticalUnitTrainingStatusData,
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
	const getAllStaffPosVerticalUnitTrainingStatus = async (req, res) => {
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

			let { count, rows: staffPosVerticalUnitTrainingStatusData } =
				await staffPosVerticalUnitTrainingStatus.findAndCountAll({
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
				data: staffPosVerticalUnitTrainingStatusData,
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
	const getStaffPosVerticalUnitTrainingStatus = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {};

			if (reqObj.id) {
				cond["staffPosVerticalUnitId"] = reqObj.id;
			}
			cond["isActive"] = true;

			let { count, rows: staffPosVerticalUnitTrainingStatusData } =
				await staffPosVerticalUnitTrainingStatus.findAndCountAll({
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
				data: staffPosVerticalUnitTrainingStatusData,
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
	const deleteStaffPosVerticalUnitTrainingStatus = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await staffPosVerticalUnitTrainingStatus.destroy(
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
		createStaffPosVerticalUnits,
		createAllStaffPosVerticalUnits,
		getStaffPosVerticalUnits,
		deleteStaffPosVerticalUnits,
		createStaffPosVerticalUnitTrainingStatus,
		getStaffPosVerticalUnitTrainingStatus,
		deleteStaffPosVerticalUnitTrainingStatus,
		createStaffPosVerticalUnitStaffs,
		getStaffPosVerticalUnitStaffs,
		deleteStaffPosVerticalUnitStaffs,
		getAllStaffPosVerticalUnitStaffs,
		getAllStaffPosVerticalUnitTrainingStatus
	};
};
export default staffPosVerticalUnitsController();
