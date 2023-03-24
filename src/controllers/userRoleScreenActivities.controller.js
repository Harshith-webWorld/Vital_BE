import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { userRoleScreenActivities, screens, users, roles, activities } = db;
const Op = db.Sequelize.Op;

const userRoleScreenActivitiesController = () => {
	const create = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let userRoleScreenActivitiesData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.userId) {
				if (reqObj.screenId) {
					reqObj.screenId.forEach((element) => {
						element.screenId = element.value? element.value: 0;
						element.userId = reqObj.userId? reqObj.userId: 0;
						element.createdBy = reqObj.createdBy? reqObj.createdBy: 0;
						element.lastModifiedBy = reqObj.lastModifiedBy? reqObj.lastModifiedBy:0;
						if(element.id){
							element.id = null;
							userRoleScreenActivitiesData = userRoleScreenActivities.create(element);
						}else{
							userRoleScreenActivitiesData = userRoleScreenActivities.create(element);
						}
					});
				}
			} else {
				if (reqObj.screenId) {
					reqObj.screenId.forEach((element) => {
						element.screenId = element.value? element.value: 0;
						element.userId = reqObj.userId? reqObj.userId: 0;
						element.createdBy = reqObj.createdBy? reqObj.createdBy: 0;
						element.lastModifiedBy = reqObj.lastModifiedBy? reqObj.lastModifiedBy:0;
						userRoleScreenActivitiesData = userRoleScreenActivities.create(element);
					});
				}
			}
			return userRoleScreenActivitiesData;
		} catch (err) {
			console.log(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err,
			});
		}
	};
	const getUserRoleScreenActivities = async (req, res) => {
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
				cond["userId"] = reqObj.id;
			}
			if (reqObj.userId) {
				cond["userId"] = reqObj.userId;
			}
			cond["isActive"] = true;
			let { count, rows: userRoleScreenActivitiesData } =
				await users.findAndCountAll({
					attributes: attributes,
					order: [["id", "ASC"]],
					include: [
						{
							model: userRoleScreenActivities,
							where: cond,
							include: [
								{
									model: screens,
								},
								{
									model: roles,
								},
								{
									model: activities,
								}
								
							],
						},
						
					],
				});
			
			return userRoleScreenActivitiesData;
		} catch (err) {
			console.error(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err,
			});
		}
	};

	const getUser = async (req, res) => {
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
				cond["userId"] = reqObj.id;
			}
			
			cond["isActive"] = true;
			let { count, rows: userRoleScreenActivitiesData } =
				await userRoleScreenActivities.findAndCountAll({
					attributes: attributes,
					where: cond,
					include: [
								{
									model: screens,
								},
								{
									model: roles,
								},
								{
									model: activities,
								}
								
							],
						
						
				
				});
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data:userRoleScreenActivitiesData,
					message: label.EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data:userRoleScreenActivitiesData,
				message: label.LABEL_SUCCESS,
			});
		} catch (err) {
			console.error(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err,
			});
		}
	};

	return {
		create,
		getUserRoleScreenActivities,
		getUser
	};
};
export default userRoleScreenActivitiesController();
