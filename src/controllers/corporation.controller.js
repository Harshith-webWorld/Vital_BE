import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { corporations } = db;
const Op = db.Sequelize.Op;

const corporationController = () => {
	const create = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let corporationData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.corporationName) {
				whereCodn["corporationName"] = reqObj.corporationName;
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.CORPORATION_REQUIRED,
				});
			}
			if (reqObj.id) {
				corporationData = await corporations.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				corporationData = await corporations.findOne({
					where: whereCodn,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				});
				if (corporationData && corporationData.isNewRecord === false) {
					return res.status(httpStatus.OK).json({
						status: httpStatus.OK,
						message: label.CORPORATION_ALREADY_EXISTS,
					});
				}
				corporationData = await corporations.create(reqObj);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: corporationData,
				message: label.LABEL_SUCCESS,
			});
		} catch (err) {
			console.log(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status:httpStatus.BAD_REQUEST,
				message:err
			});
		}
	};
	const getCorporation = async (req, res) => {
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
				cond["districtId"] = reqObj.districtId;
			}
			cond["isActive"] = true;
			let { count, rows: corporationData } =
				await corporations.findAndCountAll({
					where: cond,
					attributes: attributes,
					order: [["id", "ASC"]],
				});
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.CORPORATION_EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: corporationData,
				message: label.LABEL_SUCCESS,
			});
		} catch (err) {
			console.error(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status:httpStatus.BAD_REQUEST,
				message:err
			});
		}
	};

	const deleteCorporation = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await corporations.update(
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
				status:httpStatus.BAD_REQUEST,
				message:err
			});
		}
	};
	return {
		create,
		getCorporation,
		deleteCorporation,
	};
};
export default corporationController();
