import { validationResult } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { screensnew } = db;
const Op = db.Sequelize.Op;

const screensnewController = () => {
	const create = async (req, res) => {
        try {
            const reqObj = utils.getReqValues(req);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw errors.array();
            }
            let screensData = [];
            let whereCodn = {};
            whereCodn["isActive"] = true;
            if (reqObj.materialActivity) {
                whereCodn["materialActivity"] = reqObj.materialActivity;
            } else {
                return res.status(httpStatus.OK).json({
                    status: httpStatus.OK,
                    message: label.MISSING_REQUIRED,
                });
            }
            if (reqObj.id) {
                screensData = await screensnew.update(reqObj, {
                    where: { id: reqObj["id"] },
                });
            } else {
                screensData = await screensnew.findOne({
                    where: whereCodn,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                });
                if (screensData && screensData.isNewRecord === false) {
                    return res.status(httpStatus.OK).json({
                        status: httpStatus.OK,
                        message: label.ALREADY_EXISTS,
                    });
                }
                screensData = await screensnew.create(reqObj);
            }
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                data: screensData,
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
	const getScreens = async (req, res) => {
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
			let { count, rows:screensData } =
				await screensnew.findAndCountAll({
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
				data: screensData,
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
		getScreens
		
	};
};
export default screensnewController();
