import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { institutionTypes } = db;
const Op = db.Sequelize.Op;

const institutionTypesController = () => {
    const create = async (req, res) => {
        try {
            const reqObj = utils.getReqValues(req);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw errors.array();
            }
            let institutionTypesData = [];
            let whereCodn = {};
            whereCodn["isActive"] = true;
            if (reqObj.id) {
                institutionTypesData = await institutionTypes.update(reqObj, {
                    where: { id: reqObj["id"] },
                });
            } else {
                institutionTypesData = await institutionTypes.findOne({
                    where: whereCodn,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                });
                institutionTypesData = await institutionTypes.create(reqObj);
            }
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                data: institutionTypesData,
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
	const getInstitutionTypes = async (req, res) => {
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
			let { count, rows:institutionTypesData } =
				await institutionTypes.findAndCountAll({
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
				data: institutionTypesData,
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
		getInstitutionTypes
		
	};
};
export default institutionTypesController();
