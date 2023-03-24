import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { activities } = db;
const Op = db.Sequelize.Op;

const activitiesController = () => {
    const create = async (req, res) => {
    try {
        const reqObj = utils.getReqValues(req);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw errors.array();
        }
        let activitiesData = [];
        let whereCodn = {};
        whereCodn["isActive"] = true;
        if (reqObj.id) {
            activitiesData = await activities.update(reqObj, {
                where: { id: reqObj["id"] },
            });
        } else {
            activitiesData = await activities.findOne({
                where: whereCodn,
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            });
            activitiesData = await activities.create(reqObj);
        }
        return res.status(httpStatus.OK).json({
            status: httpStatus.OK,
            data: activitiesData,
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
	
	const getActivities = async (req, res) => {
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
			if (reqObj.id) {
				cond["id"] = reqObj.id;
			}
			cond["isActive"] = true;
			let { count, rows:activitiesData } =
				await activities.findAndCountAll({
					where: cond,
					attributes: attributes,
					order: [["id", "ASC"]],
				});
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.EMPTY,
				});
			}
			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: activitiesData,
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

	
	
	return {
		create,
		getActivities,
		
	};
};
export default activitiesController();
