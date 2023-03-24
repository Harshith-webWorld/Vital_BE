import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { entomologicalLarvicidalList,entomologicalDataCounts} = db;
const Op = db.Sequelize.Op;

const bulkEntomologicalLarvicidalListController = () => {
	const bulkCreate = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let entomologicalLarvicidalListData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			var obj = {}
			if (reqObj.id) {
				entomologicalLarvicidalListData = await entomologicalLarvicidalList.update(reqObj, {
					where: { id: reqObj["id"] },
				});
				reqObj.entomologicalDataCounts.forEach(element => {
					if (element["id"]) {
						entomologicalLarvicidalListData = entomologicalDataCounts.update(
							element,
							{
								where: { id: element["id"] },
							}
						);
					} else if (!element["id"]) {
						element.entomologicalLarvicidalListId = reqObj.id;
						entomologicalLarvicidalListData =
						entomologicalDataCounts.create(element);
					}
				});
			} else {
				var lastID = await entomologicalDataCounts.findOne({
					attributes: {
						include: ["id"],
					},
					order: [ ['id','DESC']]
				});
				var nextId =  lastID && lastID.dataValues && lastID.dataValues.id ? (+lastID.dataValues.id)+1 : 1;
				reqObj.entomologicalId.forEach((element) => {
					element.srNo = "SR" + nextId++
				})
				let attributes = {
					exclude: ["createdAt", "updatedAt"],
				};
				entomologicalLarvicidalListData = await entomologicalLarvicidalList.bulkCreate(reqObj.entomologicalId,
					{
						include: [
							{
								model: entomologicalDataCounts,
							},
						],
						attributes: attributes
					},{returning:true});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: entomologicalLarvicidalListData,
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
		
	return {
		bulkCreate
	};
};
export default bulkEntomologicalLarvicidalListController();
