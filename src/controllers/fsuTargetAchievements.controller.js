import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { fsuTargetAchivements, fsuTargetAchievementsSurveys, districts, facilities, villages, verticalControlFieldUnits,verticalControlUnits } = db;
const Op = db.Sequelize.Op;

const fsuTargetAchivementsController = () => {
	const createFsuTargetAchivements = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			console.log(req.body, "req")
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let fsuTargetAchivementsData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.id) {
				fsuTargetAchivementsData = await fsuTargetAchivements.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				var lastID = await fsuTargetAchivements.findOne({
					attributes: {
						include: ["id"],
					},
					order: [['id', 'DESC']]
				});
				var currentId = lastID && lastID.dataValues && lastID.dataValues.id ? (+lastID.dataValues.id) + 1 : 1;
				reqObj.srNo = "SR" + currentId;
				fsuTargetAchivementsData = await fsuTargetAchivements.create(reqObj,
					{
						include: [{
							model: fsuTargetAchievementsSurveys
						}]
					});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: fsuTargetAchivementsData,
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
	const getFsuTargetAchivements = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {}; let cond2 = {};

			if (reqObj.id) {
				cond["id"] = reqObj.id;
			}
			if (reqObj.districtId) {
                cond["districtId"] = reqObj.districtId;
            }
			if (reqObj.nameOfFilariaSurveyUnit) {
				cond2["nameOfControlUnit"] = reqObj.nameOfFilariaSurveyUnit;
			}
			cond["isActive"] = true;
			let { count, rows: fsuTargetAchivementsData } =
				await fsuTargetAchivements.findAndCountAll({
					where: cond,

					order: [["id", "DESC"]],
					include: [
						{
							model: districts,
							attributes: ["id", "districtName"],
							required:false
						},
						{
							model: facilities,
							attributes: ["id", "facilityName"],
							required:false
						},
						// {
						// 	where: cond2,
						// 	model: verticalControlFieldUnits,
						// 	required: false
						// },
						{
							where: cond2,
							model: verticalControlUnits,
							required: false
						}
					]
				});
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: fsuTargetAchivementsData,
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

	const deleteFsuTargetAchivements = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await fsuTargetAchivements.update(
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
	const createFsuTargetAchievementsSurveys = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let fsuTargetAchievementsSurveysData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.id) {
				fsuTargetAchievementsSurveysData = await fsuTargetAchievementsSurveys.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {

				fsuTargetAchievementsSurveysData = await fsuTargetAchievementsSurveys.create(reqObj);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: fsuTargetAchievementsSurveysData,
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
	const getFsuTargetAchievementsSurveys = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {};

			if (reqObj.fsuTargetAchievementId) {
				cond["fsuTargetAchievementId"] = reqObj.fsuTargetAchievementId;
			}
			if (reqObj.id) {
				cond["id"] = reqObj.id;
			}
			cond["isActive"] = true;

			let { count, rows: fsuTargetAchievementsSurveysData } =
				await fsuTargetAchievementsSurveys.findAndCountAll({
					where: cond,
					order: [["id", "DESC"]],
					include: [{
						model: fsuTargetAchivements
					}]
				});
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: fsuTargetAchievementsSurveysData,
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

	const deletefsuTargetAchievementsSurveys = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await fsuTargetAchievementsSurveys.update(
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
		createFsuTargetAchivements,
		getFsuTargetAchivements,
		deleteFsuTargetAchivements,
		createFsuTargetAchievementsSurveys,
		getFsuTargetAchievementsSurveys,
		deletefsuTargetAchievementsSurveys
	};
};
export default fsuTargetAchivementsController();
