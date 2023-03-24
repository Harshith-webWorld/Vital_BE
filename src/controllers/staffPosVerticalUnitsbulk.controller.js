import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const {
	staffPosVerticalUnits,
	staffPosVerticalUnitTrainingStatus,
	staffPosVerticalUnitStaffs,
} = db;
const Op = db.Sequelize.Op;

const bulkstaffPosVerticalUnitsController = () => {
	const bulkcreateStaffPosVerticalUnits = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let staffPosVerticalUnitsData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			var obj = {};
			if (reqObj.id) {
				staffPosVerticalUnitsData = await staffPosVerticalUnits.update(
					reqObj,
					{
						where: { id: reqObj["id"] },
					}
				);
			} else {
				var lastID = await staffPosVerticalUnits.findOne({
                    attributes: {
                        include: ["id"],
                    },
                    order: [["id", "DESC"]],
                });
                var nextId =
                    lastID && lastID.dataValues && lastID.dataValues.id
                        ? +lastID.dataValues.id + 1
                        : 1;
 
                reqObj.forEach((element) => {
                    element.srNo = "SR" + nextId++
                })
 
                staffPosVerticalUnitsData =
                    await staffPosVerticalUnits.bulkCreate(
                        reqObj,
                        {
                            include:
                            [
                                {
                                    model:staffPosVerticalUnitStaffs,
                                    include:[{model:staffPosVerticalUnitTrainingStatus}]
                                },  
                            ]
                        },
                        { returning: true }
                    );
            }
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                data: staffPosVerticalUnitsData,
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


	const bulkcreateStaffPosVerticalUnitStaffs = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let staffPosVerticalUnitStaffsData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.id) {
				console.log("reqObj:: ", reqObj);
				staffPosVerticalUnitStaffsData =
					await staffPosVerticalUnitStaffs.update(reqObj, {
						where: { id: reqObj["id"] },
					});
				reqObj.staffPosVerticalUnitTrainingStatuses.forEach(
					(element) => {
						if (element["id"]) {
							staffPosVerticalUnitStaffsData =
								staffPosVerticalUnitTrainingStatus.update(
									element,
									{
										where: { id: element["id"] },
									}
								);
						} else if (!element["id"]) {
							element.staffPosVerticalUnitStaffId = parseInt(
								reqObj.id
							);
							console.log("element:: ", element);
							staffPosVerticalUnitStaffsData =
								staffPosVerticalUnitTrainingStatus.create(
									element
								);
						}
					}
				);
			} else {
				staffPosVerticalUnitStaffsData =
					await staffPosVerticalUnitStaffs.bulkCreate(
						reqObj.staffPosVerticalUnitStaffs,
						{
							include: [
								{
									model: staffPosVerticalUnitTrainingStatus,
								},
							],
						}
					);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: staffPosVerticalUnitStaffsData,
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

	const bulkcreateStaffPosVerticalUnitTrainingStatus = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			let staffPosVerticalUnitTrainingStatusData = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.id) {
				staffPosVerticalUnitTrainingStatusData =
					await staffPosVerticalUnitTrainingStatus.update(reqObj, {
						where: { id: reqObj["id"] },
					});
			} else {
				staffPosVerticalUnitTrainingStatusData =
					await staffPosVerticalUnitTrainingStatus.findOne({
						where: whereCodn,
						attributes: {
							exclude: ["createdAt", "updatedAt"],
						},
					});
				staffPosVerticalUnitTrainingStatusData =
					await staffPosVerticalUnitTrainingStatus.bulkCreate(
						reqObj.staffPosVerticalUnitTrainingStatus,
						{ returning: true }
					);
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: staffPosVerticalUnitTrainingStatusData,
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
		bulkcreateStaffPosVerticalUnits,
		bulkcreateStaffPosVerticalUnitStaffs,
		bulkcreateStaffPosVerticalUnitTrainingStatus,
	};
};

export default bulkstaffPosVerticalUnitsController();
