import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { talukas } = db;
const Op = db.Sequelize.Op;

const talukaController = () => {
	const create = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let talukaData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.talukaName) {
				whereCodn["talukaName"] = reqObj.talukaName;
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.TALUKA_REQUIRED,
				});
			}
			if (reqObj.id) {
				talukaData = await talukas.update(
					reqObj,
					{
						where: { id: reqObj["id"] },
					}
				);
			} else {

				talukaData = await talukas.findOne({
					where: whereCodn,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				});
				if (
					talukaData &&
					talukaData.isNewRecord === false
				) {
					return res.status(httpStatus.OK).json({
						status: httpStatus.OK,
						message: label.TALUKA_ALREADY_EXISTS,
					});
				}
				talukaData = await talukas.create(
					reqObj
				);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: talukaData,
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
	const getTaluka = async (req, res) => {
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
			if (reqObj.districtId) {
				cond["districtId"] = reqObj.districtId
			}
			cond["isActive"] = true;
			let { count, rows: talukaData } =
				await talukas.findAndCountAll({
					where: cond,
					attributes: attributes,
					order: [["talukaName", "ASC"]],
				});
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.TALUKA_EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: talukaData,
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

	const deleteTaluka = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await talukas.update(
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
		getTaluka,
		deleteTaluka,
	};
};
export default talukaController();
