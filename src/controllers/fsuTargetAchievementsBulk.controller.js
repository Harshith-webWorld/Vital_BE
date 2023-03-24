import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { fsuTargetAchivements, fsuTargetAchievementsSurveys} = db;
const Op = db.Sequelize.Op;

const bulkFsuTargetAchivementsController = () => {
	const bulkCreateFsuTargetAchivements = async (req, res) => {
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
				var nextId = lastID && lastID.dataValues && lastID.dataValues.id ? (+lastID.dataValues.id) + 1 : 1;
				reqObj.forEach((element)=>{
                    element.srNo = "SR" + nextId++;
                })
				let attributes = {
					exclude: ["createdAt", "updatedAt"],
				};
				fsuTargetAchivementsData = await fsuTargetAchivements.bulkCreate(reqObj,
					{
						include: [
							{
								model: fsuTargetAchievementsSurveys
							},
						],
						attributes: attributes
					},{returning:true});
					
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
	const bulkCreateFsuTargetAchievementsSurveys = async (req, res) => {
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

				fsuTargetAchievementsSurveysData = await fsuTargetAchievementsSurveys.bulkCreate(reqObj.fsuTargetAchievementsSurveys);
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
	return {
        bulkCreateFsuTargetAchivements,
		bulkCreateFsuTargetAchievementsSurveys,
	};
};
export default bulkFsuTargetAchivementsController();
