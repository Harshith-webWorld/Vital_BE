import { validationResult, check } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
import path from "path";
const { websiteContentNews } = db;
const Op = db.Sequelize.Op;
let filepath = path.join(__dirname, `../../../`) + `src/uploads/website-news/`;
const websiteContentNewsController = () => {
	const create = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			let websiteContentNewsData = [],
				NewsResult = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.newsHeader) {
				whereCodn["newsHeader"] = reqObj.newsHeader;
			}
			if (req.files && req.files.images) {
				let imageDatas = req.files.images.filter((image) => {
					return image.filename;
				});
				reqObj.newsImageName =
					imageDatas && imageDatas[0] ? imageDatas[0].filename : "";
			}
			if (reqObj.id) {
				NewsResult = await websiteContentNews.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				websiteContentNewsData = await websiteContentNews.findOne({
					where: whereCodn,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				});

				if (
					websiteContentNewsData &&
					websiteContentNewsData.isNewRecord === false
				) {
					return res.status(httpStatus.OK).json({
						status: httpStatus.OK,
						message: label.WEBSITE_NEWS_ALREADY_EXISTS,
					});
				}

				NewsResult = await websiteContentNews.create(reqObj);
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

	const getwebsiteContentNews = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {}; let filepath = '';

			if (reqObj.id) {
				cond["id"] = reqObj.id;
				filepath = req.protocol + '://' + req.get('host') + path.join(req.originalUrl, '../../') + 'news/';
			} else {
				filepath = req.protocol + '://' + req.get('host') + path.join(req.originalUrl, '../') + 'news/'
			}
			cond["isActive"] = true;
			if (reqObj["searchTxt"]) {
				cond[Op.or] = [
					{
						newsHeader: {
							[Op.iLike]: "%" + reqObj["searchTxt"] + "%",
						},
					},
				];
			}

			let { count, rows: websiteContentNewsData } =
				await websiteContentNews.findAndCountAll({
					where: cond,
					order: [["id", "DESC"]],
				});
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.WEBSITE_NEWS_EMPTY,
				});
			}

			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: websiteContentNewsData,
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

	const deletewebsiteContentNews = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await websiteContentNews.update(
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
		getwebsiteContentNews,
		deletewebsiteContentNews,
		getFile
	};
};

export default websiteContentNewsController();
