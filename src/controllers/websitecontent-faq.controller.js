import { validationResult, check } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { websiteContentFaq } = db;
const Op = db.Sequelize.Op;

const websiteContentFaqController = () => {
	const create = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let websiteContentFaqData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.question) {
				whereCodn["question"] = reqObj.question;
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.FAQ_REQUIRED,
				});
			}
			if (reqObj.id) {
				websiteContentFaqData = await websiteContentFaq.update(
					reqObj,
					{
						where: { id: reqObj["id"] },
					}
				);
			} else {
				websiteContentFaqData = await websiteContentFaq.findOne({
					where: whereCodn,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				});
				if (
					websiteContentFaqData &&
					websiteContentFaqData.isNewRecord === false
				) {
					return res.status(httpStatus.OK).json({
						status: httpStatus.OK,
						message: label.FAQ_ALREADY_EXISTS,
					});
				}
				websiteContentFaqData = await websiteContentFaq.create(
					reqObj
				);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: websiteContentFaqData,
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
	const getFaq = async (req, res) => {
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
			let { count, rows: websiteContentFaqData } =
				await websiteContentFaq.findAndCountAll({
					where: cond,
					order: [["id", "DESC"]],
				});
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.FAQ_EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: websiteContentFaqData,
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

	const deleteFaq = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await websiteContentFaq.update(
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
		getFaq,
		deleteFaq,
	};
};
export default websiteContentFaqController();