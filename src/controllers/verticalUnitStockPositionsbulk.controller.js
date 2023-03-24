import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { verticalUnitStockPositions} = db;
const Op = db.Sequelize.Op;

const bulkVerticalUnitController = () => {
	
	const bulkCreate = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let verticalUnitStockPositionsData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.id) {
				verticalUnitStockPositionsData = await verticalUnitStockPositions.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				var lastID = await verticalUnitStockPositions.findOne({
					attributes: {
						include: ["id"],
					},
					order: [['id', 'DESC']]
				});
				var nextId = lastID && lastID.dataValues && lastID.dataValues.id ? (+lastID.dataValues.id) + 1 : 1;
				reqObj.verticalStockid.forEach((element) => {
					element.srNo = "SR" + nextId++
				})
				verticalUnitStockPositionsData = await verticalUnitStockPositions.bulkCreate(reqObj.verticalUnitStockPositions, { returning: true });
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: verticalUnitStockPositionsData,
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
export default bulkVerticalUnitController();
