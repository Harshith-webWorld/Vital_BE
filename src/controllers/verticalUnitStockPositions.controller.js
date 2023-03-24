import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { verticalUnitStockPositions, states, districts, udCategoryOptions, verticalControlUnits } = db;
const Op = db.Sequelize.Op;

const verticalUnitController = () => {
	const create = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let verticalUnitStockPositionsData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.id) {
				verticalUnitStockPositionsData = await verticalUnitStockPositions.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				var lastID = await verticalUnitStockPositions.findOne({
					attributes: {
						include: ["id"],
					},
					order: [['id', 'DESC']]
				});
				var currentId = lastID && lastID.dataValues && lastID.dataValues.id ? (+lastID.dataValues.id) + 1 : 1;
				reqObj.srNo = "SR" + currentId;
				verticalUnitStockPositionsData = await verticalUnitStockPositions.create(reqObj);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: verticalUnitStockPositionsData,
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
			let verticalUnitStockPositionsData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.id) {
				verticalUnitStockPositionsData = await verticalUnitStockPositions.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				var lastID = await verticalUnitStockPositions.findOne({
					attributes: {
						include: ["id"],
					},
					order: [['id', 'DESC']]
				});
				var currentId = lastID && lastID.dataValues && lastID.dataValues.id ? (+lastID.dataValues.id) + 1 : 1;
				reqObj.verticalStockid.forEach((element) => {
					element.srNo = "SR" + currentId++
				})
				verticalUnitStockPositionsData = await verticalUnitStockPositions.bulkCreate(reqObj.verticalStockid, { returning: true });
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: verticalUnitStockPositionsData,
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
	const getVerticalUnit = async (req, res) => {
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
			if (reqObj.unitType) {
				cond2["unitType"] = reqObj.unitType;
			}
			if (reqObj.items) {
				cond4["items"] = reqObj.items;
			} if (reqObj.unitName) {
				cond3["unitName"] = reqObj.unitName;
			}
			cond["isActive"] = true;
			let { count, rows: verticalUnitStockPositionsData } =
				await verticalUnitStockPositions.findAndCountAll({
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
							where: cond2,
							model: udCategoryOptions,
							as: "UnitType",
							required:false
						},
						{
							where: cond4,
							model: udCategoryOptions,
							as: "tabletName",
							required:false
						},
						{
							where: cond3,
							model: verticalControlUnits,
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
				data: verticalUnitStockPositionsData,
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

	const deleteVerticalUnit = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await verticalUnitStockPositions.update(
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
		getVerticalUnit,
		deleteVerticalUnit,
		bulkCreate
	};
};
export default verticalUnitController();
