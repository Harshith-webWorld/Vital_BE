import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { designations } = db;
const Op = db.Sequelize.Op;

const designationsController = () => {
    const create = async (req, res) => {
        try {
            const reqObj = utils.getReqValues(req);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw errors.array();
            }
            let designationsData = [];
            let whereCodn = {};
            whereCodn["isActive"] = true;
            if (reqObj.id) {
                designationsData = await designations.update(reqObj, {
                    where: { id: reqObj["id"] },
                });
            } else {
                designationsData = await designations.findOne({
                    where: whereCodn,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                });
                designationsData = await designations.create(reqObj);
            }
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                data: designationsData,
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
	const getDesignations = async (req, res) => {
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
			let { count, rows:designationsData } =
				await designations.findAndCountAll({
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
				data: designationsData,
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
		getDesignations
	};
};
export default designationsController();
