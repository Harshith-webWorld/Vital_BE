import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";

const {
	lymphedemaLineList,
	lymphedemaLineListSurvey,
	lymphedemaLineListFollowUpsLF,
	lymphedemaLineListFollowUpsHF,
	districts,
} = db;
import db from "../../config/sequelize";

const bulklHLineListController = () => {
	const bulkcreate = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let patientInfo = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.id) {
				patientInfo = await lymphedemaLineList.update(
					reqObj.LymphedemaLineLists,
					{
						where: { id: reqObj["id"] },
					}
				);
				reqObj.LymphedemaLineLists.LymphedemaLineListSurveys.forEach(
					(element) => {
						if (element["id"]) {
							patientInfo = lymphedemaLineListSurvey.update(
								element,
								{
									where: { id: element["id"] },
								}
							);
						} else if (!element["id"]) {
							element.lymphedemaLineListId = reqObj.id;
							patientInfo =
								lymphedemaLineListSurvey.create(element);
						}
					}
				);

				reqObj.LymphedemaLineLists.LymphedemaLineListFollowUpsLFs.forEach(
					(element) => {
						if (element["id"]) {
							patientInfo = lymphedemaLineListFollowUpsLF.update(
								element,
								{
									where: { id: element["id"] },
								}
							);
						} else if (!element["id"]) {
							element.lymphedemaLineListId = reqObj.id;
							patientInfo =
								lymphedemaLineListFollowUpsLF.create(element);
						}
					}
				);

				reqObj.LymphedemaLineLists.LymphedemaLineListFollowUpsHFs.forEach(
					(element) => {
						if (element["id"]) {
							patientInfo = lymphedemaLineListFollowUpsHF.update(
								element,
								{
									where: { id: element["id"] },
								}
							);
						} else if (!element["id"]) {
							element.lymphedemaLineListId = reqObj.id;
							patientInfo =
								lymphedemaLineListFollowUpsHF.create(element);
						}
					}
				);
			} else {
				patientInfo = await lymphedemaLineList.findOne({
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
					include: [
						{
							model: lymphedemaLineListSurvey,
							as: "LymphedemaLineListSurveys",
						},
						{
							model: lymphedemaLineListFollowUpsLF,
							as: "LymphedemaLineListFollowUpsLFs",
						},
						{
							model: lymphedemaLineListFollowUpsHF,
							as: "LymphedemaLineListFollowUpsHFs",
						}
					],
				});
				var patientID = await lymphedemaLineList.findOne({
					attributes: {
						include: ["id"],
					},
					order: [["id", "DESC"]],
				});
				var districtId = await districts.findOne({
					where: reqObj.districtId,
					attributes: {
						include: ["id", "districtCode"],
					},
					order: [["createdAt", "DESC"]],
				});
				let nextId =
					patientID && patientID.dataValues && patientID.dataValues.id
						? +patientID.dataValues.id + 1
						: 1;
				let districtCode =
					districtId && districtId.dataValues && districtId.dataValues.districtCode;
				reqObj.LymphedemaLineList.forEach((element)=>{
					element.patientId = "IND" + "-MH" + "-" + districtCode + "-" + (!element.year ? "YYYY" : element.year )+ "-LF" + "0000" + nextId++
				})
				patientInfo = await lymphedemaLineList.bulkCreate(
					reqObj.LymphedemaLineList,
					{
						include: [
							{
								model: lymphedemaLineListSurvey,
								as: "LymphedemaLineListSurveys",
							},
							{
								model: lymphedemaLineListFollowUpsLF,
								as: "LymphedemaLineListFollowUpsLFs",
							},
							{
								model: lymphedemaLineListFollowUpsHF,
								as: "LymphedemaLineListFollowUpsHFs",
							},
						],

						attributes: {
							exclude: ["createdAt", "updatedAt"],
						},
					}
				);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: patientInfo,
				message: label.LABEL_SUCCESS,
			});
		} catch (err) {
			console.log(err);
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err,
			});
		}
	};
	const bulkpostPatientInformation = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let lymphedemaLineListData = [];
			if (reqObj.id) {
				lymphedemaLineListData = await lymphedemaLineList.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				var patientID = await lymphedemaLineList.findOne({
					attributes: {
						include: ["id"],
					},
					order: [["createdAt", "DESC"]],
				});
				var districtId = await districts.findOne({
					where: reqObj.districtId,
					attributes: {
						include: ["id", "districtCode"],
					},
					order: [["createdAt", "DESC"]],
				});
				let nextId =
					patientID && patientID.dataValues && patientID.dataValues.id
						? +patientID.dataValues.id + 1
						: 1;
				let districtCode =
					districtId && districtId.dataValues && districtId.dataValues.districtCode;
			
					reqObj.patientId = "IND" + "-MH" + "-" + districtCode + "-" + (!reqObj.year ? "YYYY" : reqObj.year )+ "-LF" + "0000" + nextId;

				lymphedemaLineListData = await lymphedemaLineList.bulkcreate(reqObj.lymphedemaLineList,{returning: true}); 
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: lymphedemaLineListData,
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
	}
	const bulkpostSurvey = async (req, res) => {
		try {

			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let lymphedemaLineListSurveyData = [];
			if (reqObj.id) {
				lymphedemaLineListSurveyData = await lymphedemaLineListSurvey.update(reqObj, {
					where: { id: reqObj["id"] }
				});
			} else {
				lymphedemaLineListSurveyData = await lymphedemaLineListSurvey.bulkcreate(reqObj.lymphedemaLineListSurvey);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: lymphedemaLineListSurveyData,
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
	}
	const bulkpostLFFollowups = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let lymphedemaLineListFollowUpsLFData = [];
			if (reqObj.id) {
				lymphedemaLineListFollowUpsLFData = await lymphedemaLineListFollowUpsLF.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				lymphedemaLineListFollowUpsLFData = await lymphedemaLineListFollowUpsLF.bulkcreate(reqObj.lymphedemaLineListFollowUpsLF);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: lymphedemaLineListFollowUpsLFData,
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
	}
	const bulkpostHFFollowups = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);

			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let lymphedemaLineListFollowUpsHFData = [];
			if (reqObj.id) {
				lymphedemaLineListFollowUpsHFData = await lymphedemaLineListFollowUpsHF.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				lymphedemaLineListFollowUpsHFData = await lymphedemaLineListFollowUpsHF.create(reqObj);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: lymphedemaLineListFollowUpsHFData,
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
	}
	return {
		bulkcreate,
		bulkpostPatientInformation,
		bulkpostSurvey,
		bulkpostHFFollowups,
		bulkpostLFFollowups


	};
};

export default bulklHLineListController();
