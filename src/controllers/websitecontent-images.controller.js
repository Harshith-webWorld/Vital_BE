import { validationResult, check } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
import path from "path";
const { websiteContentImages } = db;
const Op = db.Sequelize.Op;
const filepath =
	path.join(__dirname, `../../../`) + `src/uploads/website-images/`;

const websiteContentImagesController = () => {
	const create = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			let websiteContentImagesData = [],
				NewsResult = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.imageHeader) {
				whereCodn["imageHeader"] = reqObj.imageHeader;
			}
			if (req.files && req.files.images) {
				let imageDatas = req.files.images.filter((image) => {
					return image.filename;
				});
				reqObj.imageName =
					imageDatas && imageDatas[0] ? imageDatas[0].filename : "";
			}
			if (reqObj.id) {
				NewsResult = await websiteContentImages.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				websiteContentImagesData = await websiteContentImages.findOne({
					where: whereCodn,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				});

				if (
					websiteContentImagesData &&
					websiteContentImagesData.isNewRecord === false
				) {
					return res.status(httpStatus.OK).json({
						status: httpStatus.CONFLICT,
						message: label.ALREADY_EXISTS,
					});
				}

				NewsResult = await websiteContentImages.create(reqObj);
			}

			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				message: label.LABEL_SUCCESS,
				data: NewsResult,
				filepath: filepath,
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

	const getwebsiteContentImages = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {}; let filepath = '';

			if (reqObj.id) {
				cond["id"] = reqObj.id;
				filepath = req.protocol + '://' + req.get('host') + path.join(req.originalUrl, '../../') + 'images/';
			} else {
				filepath = req.protocol + '://' + req.get('host') + path.join(req.originalUrl, '../') + 'images/'
			}

			cond["isActive"] = true;
			if (reqObj["searchTxt"]) {
				cond[Op.or] = [
					{
						imageHeader: {
							[Op.iLike]: "%" + reqObj["searchTxt"] + "%",
						},
					},
				];
			}
			let { count, rows: websiteContentImagesData } =
				await websiteContentImages.findAndCountAll({
					where: cond,
					order: [["id", "DESC"]],
				});
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.EMPTY,
				});
			}

			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: websiteContentImagesData,
				message: label.LABEL_SUCCESS,
				filepath: filepath,
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

	const deletewebsiteContentImages = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await websiteContentImages.update(
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

	const getFile = (req, res) => {
		res.sendFile(path.join(filepath + req.params.fileName));
	}
	return {
		create,
		getwebsiteContentImages,
		deletewebsiteContentImages,
		getFile
	};
};

export default websiteContentImagesController();
