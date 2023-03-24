import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const {
	mfPositiveLineList,
	mfPositiveLineListSurvey,
	mfPositiveLineListPatients,
	mfPositiveLineListBSFollowUps,
} = db;
const Op = db.Sequelize.Op;

const bulkmfPositiveController = () => {
	const bulkcreateMfPositiveLineList = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let mfPositiveLineData = [];
			let mfPositiveLineListPatientsBulkDeleteData;
			let mfPositiveLineListPatientsUpdatedData;
			let step3PatientInfo = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			var obj = {};
			if (reqObj.id) {
				mfPositiveLineData = await mfPositiveLineList.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				var patientID = await mfPositiveLineList.findOne({
					attributes: {
						include: ["id"],
					},
					order: [["id", "DESC"]],
				});
				let nextId = patientID && patientID.dataValues && patientID.dataValues.id
						? +patientID.dataValues.id + 1
						: 1;
				reqObj && reqObj.mfPositiveLineList.forEach((element)=>{
					element.srNo = "SR" + nextId++;
				})
				reqObj && reqObj.mfPositiveLineList.forEach((element)=>{
					element.mfPositiveLineListPatients.forEach((patientObj)=>{
						if(!(patientObj.id === 0)){
							step3PatientInfo.push(patientObj.id);
						}
					})
				})
				mfPositiveLineListPatientsBulkDeleteData = await mfPositiveLineListPatients.destroy( {
						where: { id: { "$in": step3PatientInfo } },
					});

				mfPositiveLineData = await mfPositiveLineList.bulkCreate(
					reqObj.mfPositiveLineList,{
						include:
						[
							{
								model:mfPositiveLineListSurvey,
								as: "mfPositiveLineListSurveys",
							},
							{
								model:mfPositiveLineListPatients,
								as: "mfPositiveLineListPatients",
							},
							{
								model:mfPositiveLineListBSFollowUps,
								as: "mfPositiveLineListBSFollowUps",
							}
						]
					}
				);
				mfPositiveLineData.forEach((element)=>{
					 element.mfPositiveLineListPatients.forEach(async(object)=>{
						if(object["patientId"]==="" || object["patientId"]===null){
							object.patientId = "MF" + "0000" + object.id;
							mfPositiveLineListPatientsUpdatedData = await mfPositiveLineListPatients.update({ patientId: object.patientId }, {
								where: { id: object["id"] },
							});
						}
					})
				})
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: mfPositiveLineData,
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

	const bulkcreateMfPositiveLineListSurvey = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			let mfPositiveLineListSurveyData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.id) {
				reqObj.surveyInfo.forEach((element) => {
					if (element["id"]) {
						element.mfPositiveLineListId = reqObj.fieldUnitId;
						if (!element.dateOfAction) {
							element.dateOfAction = new Date();
						} else {
							element.dateOfAction = element.dateOfAction;
						}
						mfPositiveLineListSurveyData =
							mfPositiveLineListSurvey.update(element, {
								where: { id: element["id"] },
							});
					} else if (!element["id"]) {
						element.mfPositiveLineListId = reqObj.fieldUnitId;
						if (!element.dateOfAction) {
							element.dateOfAction = new Date();
						} else {
							element.dateOfAction = element.dateOfAction;
						}
						mfPositiveLineListSurveyData =
							mfPositiveLineListSurvey.create(element);
					}
				});
			} else {
				let attributes = {
					exclude: ["createdAt", "updatedAt"],
				};
				mfPositiveLineListSurveyData =
					await mfPositiveLineListSurvey.bulkCreate(
						reqObj.mfPositiveLineListSurvey,
						{ returning: true },
						{
							attributes: attributes,
						}
					);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: mfPositiveLineListSurveyData,
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
	const bulkcreateMfPositiveLineListPatients = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let mfPositiveLineListPatientsData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			var obj = {};
			if (reqObj.id) {
				mfPositiveLineListPatientsData =
					await mfPositiveLineListPatients.update(reqObj, {
						where: { id: reqObj["id"] },
					});
			} else {
				var patientID = await mfPositiveLineListPatients.findOne({
					attributes: {
						include: ["id"],
					},
					order: [["id", "DESC"]],
				});

				let nextId =
					patientID && patientID.dataValues && patientID.dataValues.id
						? +patientID.dataValues.id + 1
						: 1;

				reqObj.patientId = "MF" + "0000" + nextId;

				mfPositiveLineListPatientsData =
					await mfPositiveLineListPatients.bulkCreate(
						reqObj.mfPositiveLineListPatients,
						{ returning: true }
					);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: mfPositiveLineListPatientsData,
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
	const bulkcreateMfPositiveLineListBSFollowUps = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let mfPositiveLineListBSFollowUpsData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			var obj = {};
			if (reqObj.id) {
				mfPositiveLineListBSFollowUpsData =
					await mfPositiveLineListBSFollowUps.update(reqObj, {
						where: { id: reqObj["id"] },
					});
			} else {
				mfPositiveLineListBSFollowUpsData =
					await mfPositiveLineListBSFollowUps.findOne({
						attributes: {
							exclude: ["createdAt", "updatedAt"],
						},
					});
				mfPositiveLineListBSFollowUpsData =
					await mfPositiveLineListBSFollowUps.bulkCreate(
						reqObj.mfPositiveLineListBSFollowUps,
						{ returning: true }
					);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: mfPositiveLineListBSFollowUpsData,
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

	return {
		bulkcreateMfPositiveLineList,
		bulkcreateMfPositiveLineListSurvey,
		bulkcreateMfPositiveLineListPatients,
		bulkcreateMfPositiveLineListBSFollowUps,
	};
};

export default bulkmfPositiveController();
