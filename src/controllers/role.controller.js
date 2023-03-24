import { validationResult, check } from "express-validator";
import httpStatus from "http-status";
import _ from "lodash";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { roles } = db;
const Op = db.Sequelize.Op;

const RoleController = () => {
	const create = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let roleData = [];
			let whereCodn = {};
			if (reqObj.roleName) {
				whereCodn["roleName"] = reqObj.roleName;
			}
			if (reqObj.id) {
				roleData = await roles.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				if (whereCodn["roleName"] == "") {
					return res.status(httpStatus.OK).json({
						status: httpStatus.OK,
						message: label.ROLE_REQUIRED,
					});
				}
				roleData = await roles.findOne({
					where: whereCodn,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				});
				if (roleData && roleData.isNewRecord === false) {
					return res.status(httpStatus.OK).json({
						status: httpStatus.OK,
						message: label.ROLE_ALREADY_EXISTS,
					});
				}
				roleData = await roles.create(reqObj);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: roleData,
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

	const getRole = async (req, res) => {
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
				attributes = "";
			}
			if (reqObj.roleName) {
				cond["roleName"] = reqObj.roleName;
			}
			let { count,rows:roleData } = await roles.findAndCountAll({
				where: cond,
				attributes: attributes,
			});
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.ROLE_EMPTY,
				});
			}

			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: roleData,
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

	const deleteRole = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await roles.update(
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
				return res.status(httpStatus.BAD_REQUEST).json({
					status: httpStatus.BAD_REQUEST,
					message: label.SOMETHING_WRONG,
				});
			}
		} catch (err) {
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
		getRole,
		deleteRole,
	};
};

export default RoleController();
