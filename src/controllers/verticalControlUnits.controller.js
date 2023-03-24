import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { verticalControlUnits, verticalControlFieldUnits } = db;
const Op = db.Sequelize.Op;

const verticalControlUnitsController = () => {

	const getverticalControlUnits = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {};
			let attributes = {
				exclude: ["createdAt", "updatedAt"],
			};
			if (reqObj.id) {
				cond["id"] = reqObj.id;
			}
			if (reqObj.unitType) {
				cond["unitType"] = reqObj.unitType;
			}
			cond["isActive"] = true;
			let { count, rows: verticalControlUnitsData } =
				await verticalControlUnits.findAndCountAll({
					where: cond,
					attributes: attributes,
					order: [["id", "ASC"]],
				});
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: verticalControlUnitsData,
					message: label.EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: verticalControlUnitsData,
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
	const getverticalControlFieldUnits = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {};
			let attributes = {
				exclude: ["createdAt", "updatedAt"],
			};
			if (reqObj.id) {
				cond["verticalControlUnitId"] = reqObj.id;
			}
			cond["isActive"] = true;
			let { count, rows: verticalControlFieldUnitData } =
				await verticalControlFieldUnits.findAndCountAll({
					where: cond,
					attributes: attributes,
					order: [["id", "ASC"]],
				});
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: verticalControlFieldUnitData,
					message: label.EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: verticalControlFieldUnitData,
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


	const createverticalControlUnits = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let verticalControlUnitsData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.nameOfControlUnit) {
				whereCodn["nameOfControlUnit"] = reqObj.nameOfControlUnit;
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.NAMEOFCONTROLUNIT_REQUIRED,
				});
			}
			if (reqObj.id) {
				verticalControlUnitsData = await verticalControlUnits.update(
					reqObj,
					{
						where: { id: reqObj["id"] },
					}
				);
			} else {
				/*verticalControlUnitsData = await verticalControlUnits.findOne({
					where: whereCodn,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				});
				if (
					verticalControlUnitsData &&
					verticalControlUnitsData.isNewRecord === false
				) {
					return res.status(httpStatus.OK).json({
						status: httpStatus.OK,
						message: label.VILLAGE_ALREADY_EXISTS,
					});
				}*/
				console.log("123 sure")
				console.log(reqObj)
				verticalControlUnitsData = await verticalControlUnits.create(
					reqObj
				);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: verticalControlUnitsData,
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
	const createverticalControlFieldUnits = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let verticalControlUnitsData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.fieldUnitName) {
				whereCodn["fieldUnitName"] = reqObj.fieldUnitName;
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.FIELDUNITNAME_REQUIRED,
				});
			}
			if (reqObj.id) {
				verticalControlUnitsData = await verticalControlFieldUnits.update(
					reqObj,
					{
						where: { id: reqObj["id"] },
					}
				);
			} else {

				verticalControlUnitsData = await verticalControlFieldUnits.findOne({
					where: whereCodn,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				});
				if (
					verticalControlUnitsData &&
					verticalControlUnitsData.isNewRecord === false
				) {
					return res.status(httpStatus.OK).json({
						status: httpStatus.OK,
						message: label.VILLAGE_ALREADY_EXISTS,
					});
				}
				verticalControlUnitsData = await verticalControlFieldUnits.create(
					reqObj
				);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: verticalControlUnitsData,
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
	return {

		getverticalControlUnits,
		getverticalControlFieldUnits,
		createverticalControlFieldUnits,
		createverticalControlUnits
	};
};
export default verticalControlUnitsController();
