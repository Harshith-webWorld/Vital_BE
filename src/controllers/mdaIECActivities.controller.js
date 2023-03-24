import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { mdaIECActivities, districts, states, udCategoryOptions } = db;
const Op = db.Sequelize.Op;

const mdaIECActivitiesController = () => {
	const create = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let mdaIECActivitiesData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.id) {
				mdaIECActivitiesData = await mdaIECActivities.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				var lastID = await mdaIECActivities.findOne({
					attributes: {
						include: ["id"],
					},
					order: [['id', 'DESC']]
				});
				var currentId = lastID && lastID.dataValues && lastID.dataValues.id ? (+lastID.dataValues.id) + 1 : 1;
				reqObj.srNo = "SR" + currentId;
				mdaIECActivitiesData = await mdaIECActivities.create(reqObj);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: mdaIECActivitiesData,
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
	const bulkCreate = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let mdaIECActivitiesData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.id) {
				mdaIECActivitiesData = await mdaIECActivities.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				var lastID = await mdaIECActivities.findOne({
					attributes: ['id'],
					order: [['id', 'DESC']]
				})
				var currentId = lastID && lastID.dataValues && lastID.dataValues.id ? (+lastID.dataValues.id) + 1 : 1;
				reqObj.mdaIecActivityid.forEach((element) => {
					element.srNo = "SR" + currentId++
				})
				mdaIECActivitiesData = await mdaIECActivities.bulkCreate(reqObj.mdaIecActivityid, { returning: true });
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: mdaIECActivitiesData,
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
	const getMdaIECActivities = async (req, res) => {
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

			let { count, rows: mdaIECActivitiesData } =
				await mdaIECActivities.findAndCountAll({
					where: cond,

					order: [["id", "DESC"]],
					include: [
						{
							model: states,
							attributes: ["id", "stateName"],
							required:false
						},
						{
							model: districts,
							attributes: ["id", "districtName"],
							required:false
						},
						{
							model: udCategoryOptions,
							as:"StatementOfFundsAllotted",
							attributes: ["id", "categoryCode", "categoryName", "categoryOptionName"],
							required:false
						},
						{
							model: udCategoryOptions,
							as:"MaterialActivity",
							attributes: ["id", "categoryCode", "categoryName", "categoryOptionName"],
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
				data: mdaIECActivitiesData,
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

	const deleteMdaIECActivities = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await mdaIECActivities.update(
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
		create,
		bulkCreate,
		getMdaIECActivities,
		deleteMdaIECActivities,
	};
};
export default mdaIECActivitiesController();
