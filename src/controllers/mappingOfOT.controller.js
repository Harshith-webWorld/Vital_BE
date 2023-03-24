import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { mappingOfOT, mappingOfOTSurgeons, facilities, districts, corporations, talukas, mappingOfOTPhcAttachedToTheaters } = db;
const Op = db.Sequelize.Op;

const mappingOfOTController = () => {
	const create = async (req, res) => {
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
				// await mappingOfOTPhcAttachedToTheaters.destroy(
				// 	{
				// 		where: { mappingOfOTId: reqObj["id"] }
				// 	}
				// );
				reqObj.mappingOfOTPhcAttachedToTheaters ? reqObj.mappingOfOTPhcAttachedToTheaters : []
				for (const element of reqObj.mappingOfOTPhcAttachedToTheaters) {
					let payLoad = {
						mappingOfOTId: reqObj.id,
						facilityId: element.facilityId,
						createdBy: element.createdBy,
						lastModifiedBy: element.lastModifiedBy

					}
					mappingOfOTData = await mappingOfOTPhcAttachedToTheaters.create(
						payLoad
					);
				}
				// let phcsAttachedToTheare = reqObj.nameOfPHCAttachedToOT ? reqObj.nameOfPHCAttachedToOT : []
				// phcsAttachedToTheare = phcsAttachedToTheare.map(el => el.value)
				// await mappingOfOTPhcAttachedToTheaters.create(
				// 				{
				// 					mappingOfOTId : reqObj.id,
				// 					facilityId: phcsAttachedToTheare,
				// 				}
				// 			);

			} else {
				var lastID = await mappingOfOT.findOne({
					attributes: ["id"],
					order: [['id', 'DESC']]
				});
				var currentId = lastID && lastID.dataValues && lastID.dataValues.id ? (+lastID.dataValues.id) + 1 : 1;
				reqObj.srNo = "SR" + currentId;
				let attributes = {
					exclude: ["createdAt", "updatedAt"],
				};
				mappingOfOTData = await mappingOfOT.create(reqObj,
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
					});
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
	const getmappingOfOT = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {};

			if (reqObj.id) {
				cond["id"] = reqObj.id;
			}
			if (reqObj.districtId) {
				cond["districtId"] = reqObj.districtId;
			}
			cond["isActive"] = true;
			let { count, rows: mappingOfOTData } =
				await mappingOfOT.findAndCountAll({
					where: cond,
					order: [["id", "DESC"]],
					include: [
						{
							model: mappingOfOTSurgeons,
							required: false
						},
						{
							model: mappingOfOTPhcAttachedToTheaters,
							attributes: ["id", "facilityId"],
							required: false, 
							raw: true,
							include: [
								{
									model : facilities,
									attributes: ["id","facilityName"],
									required: false,
									raw: true
								}
							]
						},
						{
							model: districts,
							attributes: ["id", "districtName"],
							required: false
						},
						{
							model: corporations,
							attributes: ["id", "corporationName"],
							required: false
						},
						{
							model: talukas,
							attributes: ["id", "talukaName"],
							required: false
						},
					],
				});
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: mappingOfOTData,
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

	const deletemappingOfOT = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await mappingOfOT.update(
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
	const deletemappingOfOTSurg = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await mappingOfOTSurgeons.destroy(
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
		create,
		getmappingOfOT,
		deletemappingOfOT,
		deletemappingOfOTSurg
	};
};
export default mappingOfOTController();
