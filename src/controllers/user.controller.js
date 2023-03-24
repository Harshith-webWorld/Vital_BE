import { validationResult, check } from "express-validator";
import httpStatus from "http-status";
import _ from "lodash";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
import userRoleScreenActivitiesController from "./userRoleScreenActivities.controller";
const { users,userRoleScreenActivities,institutionTypes,designations,facilities,districts,roles } = db;
const Op = db.Sequelize.Op;

const UserController = () => {
	const create = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			console.log("reqObj",reqObj)
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let userData = [];
			let whereCodn = {};
			let screenResponse=[];
            let destroyExistingScreens = [];
			whereCodn["isActive"] = true;
			if (reqObj.email) {
				whereCodn["email"] = reqObj.email;
			}
			if (reqObj.id) {
				delete reqObj.password;
				userData = await users.update(reqObj, {
					where: { id: reqObj["id"] },
				});
				destroyExistingScreens = await userRoleScreenActivities.destroy(
					{
						where: { userId: reqObj["id"]}
					}
				);
				req.body.roleId = reqObj.roleId;
				req.body.userId = reqObj.id;
				// req.body.activitiId = reqObj.activitiId;
				req.body.screenId = reqObj.screenId;
				req.body.isActive = true;
				req.body.createdBy = reqObj.createdBy;
				req.body.lastModifiedBy = reqObj.lastModifiedBy;
				screenResponse = await userRoleScreenActivitiesController.create(req,res);
			} else {
				var userID = await users.findOne({
					attributes: ["id"],
					order: [['createdAt', 'DESC']]
				});
				var institutionTypeId = await institutionTypes.findOne({
					where: reqObj.institutionTypeId,
					attributes: ["id","institutionTypeShortName"],
					order: [['createdAt', 'DESC']]
				});
				// var designationId = await designations.findOne({
				// 	where: reqObj.designationId,
				// 	attributes: ["id","designationShortName"],
				// 	order: [['createdAt', 'DESC']]
				// });
				var institutionId = await facilities.findOne({
					where: reqObj.institutionId,
					attributes: ["id","facilityType","districtId"],
					order: [['createdAt', 'DESC']]
				});
				var distId = await districts.findOne({
					where:reqObj.districtId,
					attributes:["id","districtCode"],
					order: [['createdAt', 'DESC']]
				})
				var currentId = userID && userID.dataValues && userID.dataValues.id ? (+userID.dataValues.id) + 1 : 1;
				let institutionTypeShortName =
				institutionTypeId && institutionTypeId.dataValues && institutionTypeId.dataValues.institutionTypeShortName;
				// let designationShortName =
				// designationId && designationId.dataValues && designationId.dataValues.designationShortName;
				let distCode = distId && distId.dataValues && distId.dataValues.districtCode;
				if (userData && userData.isNewRecord === false) {
					return res.status(httpStatus.OK).json({
						status: httpStatus.OK,
						message: label.USER_ALREADY_EXISTS,
					});
				}
				reqObj.password = 'Welcome@123';
				reqObj.userName = distCode + "_" + institutionTypeShortName + "_" + currentId
				userData = await users.create(reqObj);
				req.body.roleId = reqObj.roleId;
				req.body.userId = userData.id;
				// req.body.activitiId = reqObj.activitiId;
				req.body.screenId = reqObj.screenId;
				req.body.isActive = true;
				req.body.createdBy = reqObj.createdBy;
				req.body.lastModifiedBy = reqObj.lastModifiedBy;
				screenResponse = await userRoleScreenActivitiesController.create(req,res);
				if(screenResponse){
					const mailOptions = {
						subject: "User Creation Notification",
						message: `Hi ${reqObj.fullName}, welcome to our app\n Your Login Information \n Email:\t ${reqObj.email} \n Password:\t ${reqObj.password} \n Login URL: ${req.protocol + '://' + req.get('host')} \n Username:${reqObj.userName}`,
						email: reqObj.email,
					};
					utils.transporter(mailOptions);
				}
				
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: screenResponse,
				message: label.LABEL_SUCCESS,
			});
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

	const getusers = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);

			let cond = {};
			let attributes = {
				exclude: ["createdAt", "updatedAt", "password"],
			};
			if (reqObj.id) {
				cond["id"] = reqObj.id;
				attributes = "";
			}
			cond["isActive"] = true;

			let { count, rows: userData } = await users.findAndCountAll({
				where: cond,
				attributes: attributes,
				order:[["id","DESC"]],
				include:
				[
					{
						model:institutionTypes,
						attributes: ["id", "institutionTypeName"],
						required:false
					},
					{
						model:roles,
						attributes: ["id", "roleName"],
						required:false
					},
					// {
					// 	model:designations,
					// 	attributes: ["id", "designationName"],
					// 	required:false
					// }
			]
			});
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.USER_EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: userData,
				message: label.LABEL_SUCCESS,
			});
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

	const deleteUser = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await users.update(
					{ isActive: false },
					{
						where: { id: reqObj.id },
					}
				);
				await userRoleScreenActivities.update(
					{ isActive: false },
					{
						where: { userId: reqObj.id },
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
				message: err,
			});
		}
	};

	return {
		create,
		getusers,
		deleteUser,
	};
};

export default UserController();
