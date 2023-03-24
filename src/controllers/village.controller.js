import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { villages } = db;
const Op = db.Sequelize.Op;

const villageController = () => {
	const create = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let villageData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.villageName) {
				whereCodn["villageName"] = reqObj.villageName;
			} else {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.VILLAGE_REQUIRED,
				});
			}
			if (reqObj.id) {
				villageData = await villages.update(
					reqObj,
					{
						where: { id: reqObj["id"] },
					}
				);
			} else {

				villageData = await villages.findOne({
					where: whereCodn,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				});
				if (
					villageData &&
					villageData.isNewRecord === false
				) {
					return res.status(httpStatus.OK).json({
						status: httpStatus.OK,
						message: label.VILLAGE_ALREADY_EXISTS,
					});
				}
				villageData = await villages.create(
					reqObj
				);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: villageData,
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
	const getVillage = async (req, res) => {
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
			if (reqObj.districtId) {
				cond["districtId"] = reqObj.districtId;
			}
			if(reqObj.facilityId){
				cond["facilityId"] = reqObj.facilityId;
			}
			if(reqObj.talukaId){
				cond["talukaId"] = reqObj.talukaId;
			}
			if(reqObj.subCenterId){
				cond["subCenterId"] = reqObj.subCenterId;
			}
			// if(reqObj.zoneId){
			// 	cond["zoneId"] = reqObj.zoneId;
			// }
			cond["isActive"] = true;
			// old one
			// let cond = [{ districtId: '0' }, { talukaId: '0' }, { facilityId: '0' }, { subCenterId: '0' }];
			// let attributes = {
			// 	exclude: ["createdAt", "updatedAt"],
			// };
			// if (reqObj.districtId && reqObj.districtId !== '' && reqObj.districtId !== 'null') {
			// 	cond[0].districtId = reqObj.districtId;
			// }
			// if (reqObj.talukaId && reqObj.talukaId !== '' && reqObj.talukaId !== 'null') {
			// 	cond[1].talukaId = reqObj.talukaId
			// }
			// if (reqObj.facilityId && reqObj.facilityId !== '' && reqObj.facilityId !== 'null') {
			// 	cond[2].facilityId = reqObj.facilityId
			// }
			// if (reqObj.subCenterId && reqObj.subCenterId !== '' && reqObj.subCenterId !== 'null') {
			// 	cond[3].subCenterId = reqObj.subCenterId
			// }

			let { count, rows: villageData } =

				// await villages.findAndCountAll({
				// 	where: { isActive: true, [Op.or]: [...cond] },
				// 	attributes: attributes,
				// 	order: [["villageName", "ASC"]],
				// });

				await villages.findAndCountAll({
					where: cond,
					attributes: attributes,
					order: [["id", "ASC"]],
				});
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.VILLAGE_EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: villageData,
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
	const getVillagebyDistrict = async (req, res) => {
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
			if (reqObj.districtId && reqObj.facilityId) {
				cond["districtId"] = reqObj.districtId;
				cond["facilityId"] = reqObj.facilityId
			} else if (reqObj.districtId && reqObj.talukaId) {
				cond["districtId"] = reqObj.districtId;
			}
			
			cond["isActive"] = true;
			let { count, rows: villageData } =
				await villages.findAndCountAll({
					where: cond,
					attributes: attributes,
					order: [["id", "ASC"]],
				});
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.VILLAGE_EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: villageData,
				message: label.LABEL_SUCCESS,
			});
		} catch (err) {
			console.error(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			 return res.status(httpStatus.BAD_REQUEST).json({
                status:httpStatus.BAD_REQUEST,
                message:err
            });
		}
	};

	const getVillageBySubCenter = async (req, res) => {
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
			if (reqObj.districtId && reqObj.facilityId && reqObj.subCenterId) {
				cond["districtId"] = reqObj.districtId;
				cond["facilityId"] = reqObj.facilityId;
				cond["subCenterId"] = reqObj.subCenterId;
			}
			cond["isActive"] = true;
			let { count, rows: villageData } =
				await villages.findAndCountAll({
					where: cond,
					attributes: attributes,
					order: [["id", "ASC"]],
				});
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.VILLAGE_EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: villageData,
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

	const deleteVillage = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await villages.update(
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
		create,
		getVillage,
		deleteVillage,
		getVillagebyDistrict,
		getVillageBySubCenter
	};
};
export default villageController();
