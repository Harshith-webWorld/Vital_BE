import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { mdaIDACoverageRegularList, mdaIDACoverageMopUpList, mdaIDACoverageOthersList, mdaIDACoverages } = db;
const Op = db.Sequelize.Op;

const bulkMdaIDACoverageController = () => {
	const bulkCreateMdaIDACoverages = async (req, res) => {
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
				// mdaIDACoveragesData = await mdaIDACoverages.update(reqObj, {
				// 	where: { id: reqObj["id"] },
				// });
			} else {
				var lastID = await mdaIDACoverages.findOne({
					attributes: {
						include: ["id"],
					},
					order: [['id', 'DESC']]
				});
				var nextId = lastID && lastID.dataValues && lastID.dataValues.id ? (+lastID.dataValues.id) + 1 : 1;
				reqObj.forEach((element)=>{
                    element.srNo = "SR" + nextId++;
                });
				mdaIDACoveragesData = await mdaIDACoverages.bulkCreate(reqObj,
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
							},
							// {model:mdaIDACoverageOthersList}

						]
					},{returning:true});
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
    const bulkCreateMdaIDACoverageRegularList = async (req, res) => {
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
				// mdaIDACoverageRegularListData = await mdaIDACoverageRegularList.update(reqObj, {
				// 	where: { id: reqObj["id"] },
				// });

				// reqObj.mdaIDACoverageOthersLists.forEach(element => {
				// 	if (!element["id"]) {
				// 		element.mdaIDACoverageRegularListId = reqObj.id;
				// 		mdaIDACoverageRegularListData = mdaIDACoverageOthersList.create(element);
				// 	} else if (element["id"]) {
				// 		mdaIDACoverageRegularListData = mdaIDACoverageOthersList.update(
				// 			element,
				// 			{
				// 				where: { id: element.id }
				// 			}
				// 		);
				// 	}
				// });

			} else {
				let attributes = {
					exclude: ["createdAt", "updatedAt"],
				};
			

				mdaIDACoverageRegularListData = await mdaIDACoverageRegularList.bulkCreate(reqObj.mdaIDACoverageRegularList,
					{
						include: [
							{
								model: mdaIDACoverageOthersList,
								as: "mdaIDACoverageOthersLists",
								required:false
							}
						],
						attributes: attributes
					},{returning:true});
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
	const bulkCreateMdaIDACoverageMopUpList = async (req, res) => {
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
				// mdaIDACoverageMopUpListData = await mdaIDACoverageMopUpList.update(reqObj, {
				// 	where: { id: reqObj["id"] },
				// });

				// reqObj.mdaIDACoverageOthersLists.forEach(element => {
				// 	if (!element["id"]) {
				// 		element.mdaIDACoverageMopUpListId = reqObj.id;
				// 		mdaIDACoverageMopUpListData = mdaIDACoverageOthersList.bulkCreate(
				// 			element

				// 		);
				// 	} else if (element["id"]) {

				// 		mdaIDACoverageMopUpListData = mdaIDACoverageOthersList.update(
				// 			element,
				// 			{
				// 				where: { id: element.id }
				// 			}
				// 		);
				// 	}
				// });

			} else {
				let attributes = {
					exclude: ["createdAt", "updatedAt"],
				};

				mdaIDACoverageMopUpListData = await mdaIDACoverageMopUpList.bulkCreate(reqObj.mdaIDACoverageMopUpList,
					{
						include: [
							{
								model: mdaIDACoverageOthersList,
								as: "mdaIDACoverageOthersLists",
								required:false
							}
						],
						attributes: attributes
					},{returning:true});
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
	
    return {
		bulkCreateMdaIDACoverages,
        bulkCreateMdaIDACoverageRegularList,
        bulkCreateMdaIDACoverageMopUpList
	};
};
export default bulkMdaIDACoverageController();
