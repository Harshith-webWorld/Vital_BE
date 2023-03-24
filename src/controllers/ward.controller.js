import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { wards } = db;
const Op = db.Sequelize.Op;

const wardController = () => {
	const create = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let wardData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.wardName) {
				whereCodn["wardName"] = reqObj.wardName;
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.WARD_REQUIRED,
				});
			}
			if (reqObj.id) {
				wardData = await wards.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				wardData = await wards.findOne({
					where: whereCodn,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				});
				if (wardData && wardData.isNewRecord === false) {
					return res.status(httpStatus.OK).json({
						status: httpStatus.OK,
						message: label.WARD_ALREADY_EXISTS,
					});
				}
				wardData = await wards.create(reqObj);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: wardData,
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
	const getWard = async (req, res) => {
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
			if(reqObj.corporationId){
				cond["corporationId"] = reqObj.corporationId;
			}
			// if(reqObj.zoneId){
			// 	cond["zoneId"] = reqObj.zoneId;
			// }
			cond["isActive"] = true;
			let { count, rows: wardData } =
				await wards.findAndCountAll({
					where: cond,
					attributes: attributes,
					order: [["id", "ASC"]],
				});
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: wardData,
					message: label.WARD_EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: wardData,
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

	const deleteWard = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await wards.update(
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
		getWard,
		deleteWard,
	};
};
export default wardController();
