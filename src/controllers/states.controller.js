import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { states } = db;
const Op = db.Sequelize.Op;

const stateController = () => {
	const create = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let stateData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.stateCode) {
				whereCodn["stateCode"] = reqObj.stateCode;
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.STATE_REQUIRED,
				});
			}
			if (reqObj.id) {
				stateData = await states.update(
					reqObj,
					{
						where: { id: reqObj["id"] },
					}
				);
			} else {

				stateData = await states.findOne({
					where: whereCodn,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				});
				if (
					stateData &&
					stateData.isNewRecord === false
				) {
					return res.status(httpStatus.OK).json({
						status: httpStatus.OK,
						message: label.STATE_ALREADY_EXISTS,
					});
				}
				stateData = await states.create(
					reqObj
				);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: stateData,
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
	const getState = async (req, res) => {
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
			cond["isActive"] = true;
			let { count, rows: stateData } =
				await states.findAndCountAll({
					where: cond,
					attributes: attributes,
					order: [["id", "ASC"]],
				});
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.STATE_EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: stateData,
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

	const deleteState = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await states.update(
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
		getState,
		deleteState,
	};
};
export default stateController();
