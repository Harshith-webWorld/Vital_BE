import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { mdaIDACoverageRegularList, mdaIDACoverageMopUpList, mdaIDACoverageOthersList, mdaIDACoverages, districts, talukas, villages, facilities,
	zones,subCenters,corporations,wards} = db;
const Op = db.Sequelize.Op;

const mdaIDACoverageController = () => {
	const createAllMdaIDACoverages = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let mdaIDACoveragesData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.id) {
				mdaIDACoveragesData = await mdaIDACoverages.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				var lastID = await mdaIDACoverages.findOne({
					attributes: {
						include: ["id"],
					},
					order: [['id', 'DESC']]
				});
				var currentId = lastID && lastID.dataValues && lastID.dataValues.id ? (+lastID.dataValues.id) + 1 : 1;
				reqObj.srNo = "SR" + currentId;
				mdaIDACoveragesData = await mdaIDACoverages.create(reqObj,
					{
						include:
						[
							{
								model:mdaIDACoverageRegularList,
								include:[{model:mdaIDACoverageOthersList}]
							},
							{
								model:mdaIDACoverageMopUpList,
								include:[{model:mdaIDACoverageOthersList}]
							}
						]
					});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: mdaIDACoveragesData,
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
	const createMdaIDACoverageRegularList = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let mdaIDACoverageRegularListData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			var obj = {}
			if (reqObj.id) {
				mdaIDACoverageRegularListData = await mdaIDACoverageRegularList.update(reqObj, {
					where: { id: reqObj["id"] },
				});

				reqObj.mdaIDACoverageOthersLists.forEach(element => {
					if (!element["id"]) {
						element.mdaIDACoverageRegularListId = reqObj.id;
						mdaIDACoverageRegularListData = mdaIDACoverageOthersList.create(element);
					} else if (element["id"]) {
						mdaIDACoverageRegularListData = mdaIDACoverageOthersList.update(
							element,
							{
								where: { id: element.id }
							}
						);
					}
				});

			} else {
				let attributes = {
					exclude: ["createdAt", "updatedAt"],
				};
				mdaIDACoverageRegularListData = await mdaIDACoverageRegularList.create(reqObj,
					{
						include: [
							{
								model: mdaIDACoverageOthersList,
								as: "mdaIDACoverageOthersLists",
							}
						],
						attributes: attributes
					});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: mdaIDACoverageRegularListData,
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
	const createMdaIDACoverageMopUpList = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let mdaIDACoverageMopUpListData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.id) {
				mdaIDACoverageMopUpListData = await mdaIDACoverageMopUpList.update(reqObj, {
					where: { id: reqObj["id"] },
				});

				reqObj.mdaIDACoverageOthersLists.forEach(element => {
					if (!element["id"]) {
						element.mdaIDACoverageMopUpListId = reqObj.id;
						mdaIDACoverageMopUpListData = mdaIDACoverageOthersList.create(
							element

						);
					} else if (element["id"]) {

						mdaIDACoverageMopUpListData = mdaIDACoverageOthersList.update(
							element,
							{
								where: { id: element.id }
							}
						);
					}
				});

			} else {
				let attributes = {
					exclude: ["createdAt", "updatedAt"],
				};
				mdaIDACoverageMopUpListData = await mdaIDACoverageMopUpList.create(reqObj,
					{
						include: [
							{
								model: mdaIDACoverageOthersList,
								as: "mdaIDACoverageOthersLists"
							}
						],
						attributes: attributes
					});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: mdaIDACoverageMopUpListData,
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
	const createMdaIDACoverages = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let mdaIDACoveragesData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.id) {
				mdaIDACoveragesData = await mdaIDACoverages.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				var lastID = await mdaIDACoverages.findOne({
					attributes: {
						include: ["id"],
					},
					order: [['id', 'DESC']]
				});
				var currentId = lastID && lastID.dataValues && lastID.dataValues.id ? (+lastID.dataValues.id) + 1 : 1;
				reqObj.srNo = "SR" + currentId;
				mdaIDACoveragesData = await mdaIDACoverages.create(reqObj);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: mdaIDACoveragesData,
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
	const getAllMdaIDACoverageMopUpLists = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {};

			if (reqObj.id) {
				cond["mdaIDACoverageId"] = reqObj.id;
			}
			cond["isActive"] = true;
			let { count, rows: mdaIDACoverageMopUpListData } =
				await mdaIDACoverageMopUpList.findAndCountAll({
					where: cond,
					order: [["id", "DESC"]],
					include: [
						{
							model: mdaIDACoverageOthersList,
							as: "mdaIDACoverageOthersLists",
							required:false
						}, 
						{
							model: mdaIDACoverages,
							required:false
						}
					]

				});
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: mdaIDACoverageMopUpListData,
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
	const getAllMdaIDACoverageRegularLists = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {};

			if (reqObj.id) {
				cond["mdaIDACoverageId"] = reqObj.id;
			}
			cond["isActive"] = true;
			let { count, rows: mdaIDACoverageRegularListData } =
				await mdaIDACoverageRegularList.findAndCountAll({
					where: cond,
					order: [["id", "DESC"]],
					include: [
						{
							model: mdaIDACoverageOthersList,
							as: "mdaIDACoverageOthersLists",
							required:false
						}, 
						{
							model: mdaIDACoverages,
							required:false
						}
					]

				});
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: mdaIDACoverageRegularListData,
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
	const getMdaIDACoverageRegularLists = async (req, res) => {
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
			cond["isActive"] = true;
			let { count, rows: mdaIDACoverageRegularListData } =
				await mdaIDACoverageRegularList.findAndCountAll({
					where: cond,
					order: [["id", "DESC"]],
					include: [
						{
							model: mdaIDACoverageOthersList,
							as: "mdaIDACoverageOthersLists",
							required:false
						}, 
						{
							model: mdaIDACoverages,
							required:false
						}
					]
				}
				);
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: mdaIDACoverageRegularListData,
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
	const getMdaIDACoverageMopUpLists = async (req, res) => {
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
			cond["isActive"] = true;
			let { count, rows: mdaIDACoverageRegularListData } =
				await mdaIDACoverageMopUpList.findAndCountAll({
					where: cond,
					order: [["id", "DESC"]],

					include: [
						{
							model: mdaIDACoverageOthersList,
							as: "mdaIDACoverageOthersLists",
							required:false
						},
						{
							model: mdaIDACoverages,
							required:false
						}
					]

				});
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: mdaIDACoverageRegularListData,
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
	const getMdaIDACoverages = async (req, res) => {
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
			
			let { count, rows: mdaIDACoveragesData } =
				await mdaIDACoverages.findAndCountAll({
					where: cond,
					order: [["id", "DESC"]],
					include: [
						{
							model: districts,
							attributes: ["id", "districtName"],
							required:false
						},
						{
							model: talukas,
							attributes: ["id", "talukaName"],
							required:false
						},
						{
							model: villages,
							attributes: ["id", "villageName"],
							required:false
						},
						{
							model: facilities,
							attributes: ["id", "facilityName"],
							required:false
						},
						{
							model: zones,
							attributes: ["id", "zoneName"],
							required:false
						},
						{
							model: subCenters,
							attributes: ["id", "subCenterName"],
							required:false
						},
						{
							model: corporations,
							attributes: ["id", "corporationName"],
							required:false
						},
						{
							model: wards,
							attributes: ["id", "wardName"],
							required:false
						},

					]
				});
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: mdaIDACoveragesData,
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

	const deletemdaIDACoverageRegularList = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await mdaIDACoverageRegularList.update(
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
	const deleteMdaIDACoverageMopUpList = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await mdaIDACoverageMopUpList.update(
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
	const deleteMdaIDACoverages = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await mdaIDACoverages.update(
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
		createAllMdaIDACoverages,
		createMdaIDACoverageMopUpList,
		createMdaIDACoverageRegularList,
		createMdaIDACoverages,
		getMdaIDACoverageRegularLists,
		getMdaIDACoverageMopUpLists,
		getMdaIDACoverages,
		deletemdaIDACoverageRegularList,
		deleteMdaIDACoverageMopUpList,
		deleteMdaIDACoverages,
		getAllMdaIDACoverageMopUpLists,
		getAllMdaIDACoverageRegularLists
	};
};
export default mdaIDACoverageController();
