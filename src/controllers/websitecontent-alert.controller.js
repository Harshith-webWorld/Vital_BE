import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { websiteContentAlert } = db;
const Op = db.Sequelize.Op;

const websiteContentController = () => {
	const create = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let websiteContentAlertData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.alert) {
				whereCodn["alert"] = reqObj.alert;
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.ALERT_REQUIRED,
				});
			}
			if (reqObj.id) {
				websiteContentAlertData = await websiteContentAlert.update(
					reqObj,
					{
						where: { id: reqObj["id"] },
					}
				);
			} else {

				websiteContentAlertData = await websiteContentAlert.findOne({
					where: whereCodn,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				});
				if (
					websiteContentAlertData &&
					websiteContentAlertData.isNewRecord === false
				) {
					return res.status(httpStatus.OK).json({
						status: httpStatus.OK,
						message: label.ALERT_ALREADY_EXISTS,
					});
				}
				websiteContentAlertData = await websiteContentAlert.create(
					reqObj
				);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: websiteContentAlertData,
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
	const getAlert = async (req, res) => {
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
	
			let { count, rows: websiteContentAlertData } =
				await websiteContentAlert.findAndCountAll({
					where: cond,
					attributes: attributes,
					order: [["id", "DESC"]],
				});
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.ALERT_EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: websiteContentAlertData,
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

	const deleteAlert = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await websiteContentAlert.update(
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
		getAlert,
		deleteAlert,
	};
};
export default websiteContentController();
