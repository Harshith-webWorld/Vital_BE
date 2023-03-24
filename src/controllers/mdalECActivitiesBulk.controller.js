import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { mdaIECActivities} = db;
const Op = db.Sequelize.Op;

const bulkMdaIECActivitiesController = () => {
	
	const bulkCreate = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			// reqObj.srNo = "SR" + reqObj.id
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let mdaIECActivitiesData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.id) {
				mdaIECActivitiesData = await mdaIECActivities.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				var lastID = await mdaIECActivities.findOne({
					attributes: ['id'],
					order: [['id', 'DESC']]
				})
				var nextId = lastID && lastID.dataValues && lastID.dataValues.id ? (+lastID.dataValues.id) + 1 : 1;
				reqObj.mdaIecActivityid.forEach((element) => {
					element.srNo = "SR" + nextId++
				})
				mdaIECActivitiesData = await mdaIECActivities.bulkCreate(reqObj.mdaIecActivityid, { returning: true });
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: mdaIECActivitiesData,
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
		bulkCreate,
		};
};
export default bulkMdaIECActivitiesController();
