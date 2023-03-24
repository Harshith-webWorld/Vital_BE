import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { postMDAEvalList, postMDAEvalListPersons, postMDAEvalListFMembers } = db;

const Op = db.Sequelize.Op;

const bulckevalListController = () => {

	const bulkCreate = async (req, res) => {
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
			} else {
				var evalID = await postMDAEvalList.findOne({
					attributes: {
						include: ["id"],
					},
					order: [["id", "DESC"]],
				});
				let nextId =
					evalID && evalID.dataValues && evalID.dataValues.id
						? +evalID.dataValues.id + 1
						: 1;
				reqObj.postMdaEvaId.forEach((element) => {
					element.srNo = "SR" + nextId++
				})

				var personID = await postMDAEvalListPersons.findOne({
					attributes: ["id"],

					order: [["createdAt", "DESC"]],
				});
				console.log("element", personID)
				reqObj.postMdaEvaId.forEach((element) => {
					element.postMDAEvalListPersons.forEach((element) => {

					let nextId =
						personID &&
							personID.dataValues &&
							personID.dataValues.id
							? (+personID.dataValues.id) + 1
							: 1;
					element.srNo = "SR" + nextId++
					})
				});

				var fmemberID = await postMDAEvalListFMembers.findOne({
					attributes: ["id"],
					order: [["createdAt", "DESC"]],
				});
				reqObj.postMdaEvaId.forEach((element) => {
					element.postMDAEvalListFMembers.forEach((element) => {
					let nextId = fmemberID && fmemberID.dataValues && fmemberID.dataValues.id ? (+ fmemberID.dataValues.id) + 1 : 1;
					element.srNo = "SR" + nextId++;
					})
				});

				postMDAEvalListData = await postMDAEvalList.bulkCreate(reqObj.postMdaEvaId, {
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

	return {

		bulkCreate,

	};
};
export default bulckevalListController();
