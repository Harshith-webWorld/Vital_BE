import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { postMDAEvalList, postMDAEvalListPersons, postMDAEvalListFMembers, districts, talukas, wards, facilities, villages, subCenters,corporations,states} = db;

const Op = db.Sequelize.Op;

const evalListController = () => {
	const create = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let postMDAEvalListData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			var obj = {};
			if (reqObj.id) {
				postMDAEvalListData = await postMDAEvalList.update(reqObj, {
					where: { id: reqObj["id"] },
				});
				reqObj.postMDAEvalListPersons.forEach((element) => {
					if (element["id"]) {
						postMDAEvalListData = postMDAEvalListPersons.update(
							element,
							{
								where: { id: element["id"] },
							}
						);
					} else if (!element["id"]) {
						element.postMDAEvalListId = reqObj.id;
						postMDAEvalListData =
							postMDAEvalListPersons.create(element);
					}
				});

				reqObj.postMDAEvalListFMembers.forEach((element) => {
					if (element["id"]) {
						postMDAEvalListData = postMDAEvalListFMembers.update(
							element,
							{
								where: { id: element["id"] },
							}
						);
					} else if (!element["id"]) {
						element.postMDAEvalListId = reqObj.id;
						postMDAEvalListData =
							postMDAEvalListFMembers.create(element);
					}
				});
			} else {
				var evalID = await postMDAEvalList.findOne({
					attributes: {
						include: ["id"],
					},
					order: [["id", "DESC"]],
				});
				let currentId =
					evalID && evalID.dataValues && evalID.dataValues.id
						? +evalID.dataValues.id + 1
						: 1;
				reqObj.srNo = "SR" + currentId;
				var personID = await postMDAEvalListPersons.findOne({
					attributes: ["id"],

					order: [["id", "DESC"]],
				});
				console.log("element", personID)
				reqObj.postMDAEvalListPersons.forEach((element) => {

					let currentId =
						personID &&
							personID.dataValues &&
							personID.dataValues.id
							? (+personID.dataValues.id) + 1
							: 1;
					element.srNo = "SR" + currentId
				});
				var fmemberID = await postMDAEvalListFMembers.findOne({
					attributes: ["id"],
					order: [["id", "ASC"]],
				});

				reqObj.postMDAEvalListFMembers.forEach((element) => {
					let currentId = fmemberID && fmemberID.dataValues && fmemberID.dataValues.id ? (+ fmemberID.dataValues.id) + 1 : 1;
					element.srNo = "SR" + currentId;
				});
				postMDAEvalListData = await postMDAEvalList.create(reqObj, {
					include: [
						{
							model: postMDAEvalListPersons,
						},
						{
							model: postMDAEvalListFMembers,
						},
					],
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				});
			}

			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: postMDAEvalListData,
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
	
	const getEvalList = async (req, res) => {
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
			let { count, rows: postMDAEvalListData } =
				await postMDAEvalList.findAndCountAll({
					where: cond,
					order: [["id", "DESC"]],
					include: [
						{
							model: postMDAEvalListPersons,
							required:false,
							order: [["createdAt", "ASC"]]
						},
						{
							model: postMDAEvalListFMembers,
							required:false,
							order: [["createdAt", "ASC"]]
						},
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
							model: wards,
							attributes: ["id", "wardName"],
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
							model: states,
							attributes: ["id", "stateName"],
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
				data: postMDAEvalListData,
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

	const deleteEvalList = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await postMDAEvalList.update(
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
	const deletePostMDAEvalListPersons = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await postMDAEvalListPersons.destroy(
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
	const deletePostMDAEvalListFMembers = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await postMDAEvalListFMembers.destroy(
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
		getEvalList,
		deleteEvalList,
		deletePostMDAEvalListPersons,
		deletePostMDAEvalListFMembers
	};
};
export default evalListController();
