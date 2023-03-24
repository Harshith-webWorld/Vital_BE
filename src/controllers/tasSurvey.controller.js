import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { tasSurvey,tasSurveyChildrens, udCategoryOptions, villages, districts ,talukas,wards,states} = db;
const Op = db.Sequelize.Op;

const surveyController = () => {
	const createAllTasSurvey = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let tasSurveyData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.id) {
				tasSurveyData = await tasSurvey.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				var lastID = await tasSurvey.findOne({
					attributes: {
						include: ["id"],
					},
					order: [['id', 'DESC']]
				});
				var currentId = lastID && lastID.dataValues && lastID.dataValues.id ? (+lastID.dataValues.id) + 1 : 1;
				reqObj.srNo = "SR" + currentId;
				tasSurveyData = await tasSurvey.create(reqObj,{
					include:[{
						model:tasSurveyChildrens
					}]
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: tasSurveyData,
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


	const create = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let tasSurveyData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.id) {
				tasSurveyData = await tasSurvey.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				var lastID = await tasSurvey.findOne({
					attributes: {
						include: ["id"],
					},
					order: [['createdAt', 'DESC']]
				});
				var currentId = lastID && lastID.dataValues && lastID.dataValues.id ? (+lastID.dataValues.id) + 1 : 1;
				reqObj.srNo = "SR" + currentId;
				tasSurveyData = await tasSurvey.create(reqObj);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: tasSurveyData,
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
	const getSurvey = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {};let cond2 = {};let cond3 = {};let cond4 = {};

			if (reqObj.id) {
				cond["id"] = reqObj.id;
			}
			if (reqObj.districtId) {
                cond["districtId"] = reqObj.districtId;
            }
			cond["isActive"] = true;
			
			let { count, rows: tasSurveyData } =
				await tasSurvey.findAndCountAll({
					where: cond,
					order: [["id", "DESC"]],
					include: [
						{
							model: udCategoryOptions,
							as: "TypeOfSchool2",
							attributes: ["categoryCode", "categoryName", "categoryOptionEnum", "categoryOptionName"],
							required:false
						},
						{ 
							model: districts,
							attributes: ["id", "districtName"],
							required:false
						},
						{ 
							model: states,
							attributes: ["id", "stateName"],
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
				data: tasSurveyData,
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

	const deleteSurvey = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await tasSurvey.update(
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
	const createTasSurveyChildrens = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let tasSurveyChildrensData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.id) {
				tasSurveyChildrensData = await tasSurveyChildrens.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				tasSurveyChildrensData = await tasSurveyChildrens.create(reqObj);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: tasSurveyChildrensData,
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
	const getTasSurveyChildrens = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {};let cond2 = {};

			if (reqObj.id) {
				cond["id"] = reqObj.id;
			}
			if (reqObj.tasSurveyId) {
				cond["tasSurveyId"] = reqObj.tasSurveyId;
			}
			if (reqObj.sex) {
				cond2["sex"] = reqObj.sex;
			}
			cond["isActive"] = true;
			
			let { count, rows: tasSurveyChildrensData } =
				await tasSurveyChildrens.findAndCountAll({
					where: cond,
					order: [["id", "DESC"]],
					include: [
						{
							where: cond2,
							model: udCategoryOptions,
							as: "Sex",
							attributes: ["categoryCode", "categoryName", "categoryOptionEnum", "categoryOptionName"],
							required:false
						},
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
				data: tasSurveyChildrensData,
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

	const deleteTasSurveyChildrens = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await tasSurveyChildrens.update(
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
		createAllTasSurvey,
		create,
		getSurvey,
		deleteSurvey,
		createTasSurveyChildrens,
		getTasSurveyChildrens,
		deleteTasSurveyChildrens
	};
};
export default surveyController();
