import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { subCenters } = db;
const Op = db.Sequelize.Op;

const subCenterController = () => {
	const create = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let subCenterData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.subCenterName) {
				whereCodn["subCenterName"] = reqObj.subCenterName;
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.SUBCENTER_REQUIRED,
				});
			}
			if (reqObj.id) {
				subCenterData = await subCenters.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				subCenterData = await subCenters.findOne({
					where: whereCodn,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				});
				if (subCenterData && subCenterData.isNewRecord === false) {
					return res.status(httpStatus.OK).json({
						status: httpStatus.OK,
						message: label.SUBCENTER_ALREADY_EXISTS,
					});
				}
				subCenterData = await subCenters.create(reqObj);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: subCenterData,
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
	const getSubcenter = async (req, res) => {
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
			if (reqObj.facilityId) {
				cond["facilityId"] = reqObj.facilityId;
			}
			cond["isActive"] = true;
			let { count, rows: subCenterData } =
				await subCenters.findAndCountAll({
					where: cond,
					attributes: attributes,
					order: [["id", "ASC"]],
				});
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.SUBCENTER_EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: subCenterData,
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

	const deleteSubcenter = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await subCenters.update(
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
		getSubcenter,
		deleteSubcenter,
	};
};
export default subCenterController();
