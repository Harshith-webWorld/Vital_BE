import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { entomologicalLarvicidalList,entomologicalDataCounts,districts,talukas,villages,subCenters,udCategoryOptions,verticalControlUnits,facilities} = db;
const Op = db.Sequelize.Op;

const entomologicalLarvicidalListController = () => {
	const create = async (req, res) => {
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
				var currentId =  lastID && lastID.dataValues && lastID.dataValues.id ? (+lastID.dataValues.id)+1 : 1;
				reqObj.srNo= "SR"+currentId;
				let attributes = {
					exclude: ["createdAt", "updatedAt"],
				};
				entomologicalLarvicidalListData = await entomologicalLarvicidalList.create(reqObj,
					{
						include: [
							{
								model: entomologicalDataCounts,
							},
						],
						attributes: attributes
					});
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
	const getEntomologicalLarvicidalList = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {};let cond2 = {};let cond3 = {};
			
			if (reqObj.id) {
				cond["id"] = reqObj.id;
			}
			if (reqObj.districtId) {
                cond["districtId"] = reqObj.districtId;
            }
			if (reqObj.typeOfUnit) {
				cond2["typeOfUnit"] = reqObj.typeOfUnit;
			}if (reqObj.nameOfUnit) {
				cond3["nameOfUnit"] = reqObj.nameOfUnit;
			}
			cond["isActive"] = true;
		
			let { count, rows: entomologicalLarvicidalListData } =
				await entomologicalLarvicidalList.findAndCountAll({
					where: cond,
					
					order: [["id", "DESC"]],
					include: [
						{
							model: entomologicalDataCounts,
							required:false
						},
						{
                            model: districts,
                            attributes:["id","districtName"],
							required:false
                        },
						{
                            model: talukas,
                            attributes:["id","talukaName"],
							required:false
                        },
						{
                            model: villages,
                            attributes:["id","villageName"],
							required:false
                        },
						{
                            model: subCenters,
                            attributes:["id","subCenterName"],
							required:false
                        },
						{
                            model: facilities,
                            attributes:["id","facilityName"],
							required:false
                        },
						{
							where: cond2,
                            model: udCategoryOptions,
							as:"TypeOfUnit",
							required:false
                        },
						{
							where: cond3,
                            model: verticalControlUnits,
							required:false
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
				data: entomologicalLarvicidalListData,
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

	const deletEntomologicalLarvicidalList = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await entomologicalLarvicidalList.update(
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
                status:httpStatus.BAD_REQUEST,
                message:err
            });
		}
	};
	const deletEntomologicalDataCounts = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await entomologicalDataCounts.destroy(
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
                status:httpStatus.BAD_REQUEST,
                message:err
            });
		}
	};
	return {
		create,
		getEntomologicalLarvicidalList,
		deletEntomologicalLarvicidalList,
		deletEntomologicalDataCounts
	};
};
export default entomologicalLarvicidalListController();
