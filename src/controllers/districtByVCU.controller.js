import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { verticalControlUnits, districts } = db;
const Op = db.Sequelize.Op;

const districtByVCUController = () => {

	const getDistrictByVCU = async (req, res) => {
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
			if (reqObj.unitId) {
				cond["id"] = reqObj.unitId
			}
			cond["isActive"] = true;
			let districtData  =
				await verticalControlUnits.findOne({
					where: cond,
					attributes: attributes,
					include: [
						{
							model: districts,
							required: false
						}
					]
				});
			// if (count <= 0) {
			// 	return res.status(httpStatus.OK).json({
			// 		status: httpStatus.OK,
			// 		data: districtData,
			// 		message: label.DISTRICT_EMPTY,
			// 	});
			// }
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: districtData,
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

	const getDistrictByFSU = async (req, res) =>{
		try{
			console.log("fsu came")
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {};
			let attributes = {
				exclude: ["createdAt", "updatedAt"],
			};
			if (reqObj.unitId) {
				cond["fsuId"] = reqObj.unitId
			}
			cond["isActive"] = true;
			let { count, rows: districtData } =
				await districts.findAndCountAll({
					where: cond,
					attributes: attributes,
					order: [["districtName", "ASC"]],
				});
			// if (count <= 0) {
				if (count <= 0) {
					return res.status(httpStatus.OK).json({
						status: httpStatus.OK,
						data: districtData,
						message: label.DISTRICT_EMPTY,
					});
				}
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					data: districtData,
					message: label.LABEL_SUCCESS,
				});
			
		}catch (err) {
			console.error(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err
			});
			}
	}
		return {
			getDistrictByVCU,
			getDistrictByFSU
		};
};
export default districtByVCUController();
