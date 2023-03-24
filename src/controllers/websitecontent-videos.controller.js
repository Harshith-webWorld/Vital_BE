import { validationResult, check } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
import path from "path";
const { websiteContentVideos } = db;
const Op = db.Sequelize.Op;
const filepath =
	path.join(__dirname, `../../../`) + `src/uploads/websitecontent-videos/`;
const websiteContentVideosController = () => {
	const create = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			let websiteContentVideosData = [],
				NewsResult = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.videoHeader) {
				whereCodn["videoHeader"] = reqObj.videoHeader;
			}
			console.log("filess:: ", reqObj.files);
			if (req.files && req.files.videos) {
				console.log("filess:: ", req.files.videos);
				let videoDatas = req.files.videos.filter((image) => {
					return image.filename;
				});
				reqObj.videoName =
					videoDatas && videoDatas[0] ? videoDatas[0].filename : "";
			}
			if (req.files && req.files.thumbnail) {
				console.log("filess:: ", req.files.thumbnail);
				let thumbData = req.files.thumbnail.filter((image) => {
					return image.filename;
				});
				reqObj.thumbnailName =
					thumbData && thumbData[0] ? thumbData[0].filename : "";
			}
			if (reqObj.id) {
				NewsResult = await websiteContentVideos.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				websiteContentVideosData = await websiteContentVideos.findOne({
					where: whereCodn,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				});

				if (
					websiteContentVideosData &&
					websiteContentVideosData.isNewRecord === false
				) {
					return res.status(httpStatus.OK).json({
						status: httpStatus.OK,
						message: label.ALREADY_EXISTS,
					});
				}

				NewsResult = await websiteContentVideos.create(reqObj);
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

	const getwebsiteContentVideos = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {}; let filepath = '';

			if (reqObj.id) {
				cond["id"] = reqObj.id;
				filepath = req.protocol + '://' + req.get('host') + path.join(req.originalUrl, '../../') + 'videos/';
			} else {
				filepath = req.protocol + '://' + req.get('host') + path.join(req.originalUrl, '../') + 'videos/'
			}

			cond["isActive"] = true;
			if (reqObj["searchTxt"]) {
				cond[Op.or] = [
					{
						videoHeader: {
							[Op.iLike]: "%" + reqObj["searchTxt"] + "%",
						},
					},
				];
			}
			let { count, rows: websiteContentVideosData } =
				await websiteContentVideos.findAndCountAll({
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
				data: websiteContentVideosData,
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

	const deletewebsiteContentVideos = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await websiteContentVideos.update(
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
		getwebsiteContentVideos,
		deletewebsiteContentVideos,
		getFile
	};
};

export default websiteContentVideosController();
