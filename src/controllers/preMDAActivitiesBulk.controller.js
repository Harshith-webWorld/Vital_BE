import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";

const { preMDAActivities, preMDAActivityDrugLogistics,preMDAActivityDrugAdministrators ,preMDAActivitySupervisors } = db;
const Op = db.Sequelize.Op;

const bulkpreMDAActivitiesController = () => {
	const bulkCreate = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let preMDAActivitiesData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			// var obj = {}
			if (reqObj.id) {
				preMDAActivitiesData = await preMDAActivities.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			}else{
				var lastID= await preMDAActivities.findOne({
					attributes: {
						include: ["id"]
					},
					order:[['id','DESC']]
				});
			
			var nextId = lastID && lastID.dataValues && lastID.dataValues.id ? (+lastID.dataValues.id) + 1 : 1;
            reqObj.forEach((element) =>{
				element.srNo = "SR" + nextId++
			})
			preMDAActivitiesData = await preMDAActivities.bulkCreate(reqObj,
				{
					include:
					[
						{
							model: preMDAActivityDrugLogistics,
							as: "preMDAActivityDrugLogistics",
						},
						{
							model: preMDAActivityDrugAdministrators,
							as: "preMDAActivityDrugAdministrators",
						},
						{
							model: preMDAActivitySupervisors,
							as: "preMDAActivitySupervisors",
						},
					]
				},
				{ returning: true }
				);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: preMDAActivitiesData,
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
		bulkCreate
	};
};
export default bulkpreMDAActivitiesController();







