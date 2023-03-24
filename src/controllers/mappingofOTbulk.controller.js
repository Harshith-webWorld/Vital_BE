import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { mappingOfOT, mappingOfOTSurgeons, mappingOfOTPhcAttachedToTheaters} = db;
const Op = db.Sequelize.Op;

const bulkMappingOfOTController = () => {
	const bulkCreate = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let mappingOfOTData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			var obj = {}
			if (reqObj.id) {
				await mappingOfOTPhcAttachedToTheaters.destroy(
					{
						where: { mappingOfOTId: reqObj["id"] }
					}
				);
				mappingOfOTData = await mappingOfOT.update(reqObj, {
					where: { id: reqObj["id"] },
				});
				reqObj.mappingOfOTSurgeons.forEach(element => {
					if (element["id"]) {
						mappingOfOTData = mappingOfOTSurgeons.update(
							element,
							{
								where: { id: element["id"] },
							}
						);
					} else if (!element["id"]) {
						element.mappingOfOTId = reqObj.id;
						mappingOfOTData = mappingOfOTSurgeons.create(
							element
						);
					}
				});
				for (const element of reqObj.nameOfPHCAttachedToOT) {
					let payLoad = {
						mappingOfOTId: reqObj.id,
						facilityId: element.value
					}
					mappingOfOTData = await mappingOfOTPhcAttachedToTheaters.create(
						payLoad
					);
				}

			} else {
				var lastID = await mappingOfOT.findOne({
					attributes: ["id"],
					order: [['id', 'DESC']]
				});
				var nextId = lastID && lastID.dataValues && lastID.dataValues.id ? (+lastID.dataValues.id) + 1 : 1;
				reqObj.mappingOfOT.forEach((element)=>{
                    element.srNo = "SR" + nextId++
                })
				let attributes = {
					exclude: ["createdAt", "updatedAt"],
				};
				mappingOfOTData = await mappingOfOT.bulkCreate(reqObj.mappingOfOT,
					{
						include: [
							{
								model: mappingOfOTSurgeons
							},
							{
								model: mappingOfOTPhcAttachedToTheaters
							},
						],
						attributes: attributes
					},{returning:true});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: mappingOfOTData,
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
export default bulkMappingOfOTController();
