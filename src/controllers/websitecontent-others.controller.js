import { validationResult, check } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
import path from "path";
const { websiteContentOthers, websiteContentOthersLinks, websiteContentOthersSections } = db;
const Op = db.Sequelize.Op;
const filepath = path.join(__dirname, `../../../`) + `src/uploads/websitecontent-others/`;

const websiteContentOthersController = () => {
	const create = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			let websiteContentOthersData = [],
				NewsResult = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.menuType) {
				whereCodn["menuType"] = reqObj.menuType;
			}

			if (req.files && req.files.others) {
				let imageDatas = req.files.others.filter((image) => {
					return image.filename;
				});
				reqObj.menuContentImageName =
					imageDatas && imageDatas[0] ? imageDatas[0].filename : "";
			}
			if (reqObj.id) {
				NewsResult = await websiteContentOthers.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				websiteContentOthersData = await websiteContentOthers.findOne({
					where: whereCodn,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				});
				console.error(websiteContentOthersData)
				if (
					websiteContentOthersData &&
					websiteContentOthersData.isNewRecord === false
				) {
					return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
						status: httpStatus.UNPROCESSABLE_ENTITY,
						message: 'Menu Type already exist',
					});
				}

				NewsResult = await websiteContentOthers.create(reqObj);
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

	const getwebsiteContentOthers = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {}; let filepath = ''

			if (reqObj.id) {
				cond["id"] = reqObj.id;
				filepath = req.protocol + '://' + req.get('host') + path.join(req.originalUrl, '../../') + 'blogs/';
			} else {
				filepath = req.protocol + '://' + req.get('host') + path.join(req.originalUrl, '../') + 'blogs/'
			}

			cond["isActive"] = true;
			if (reqObj["searchTxt"]) {
				cond[Op.or] = [
					{
						blogHeader: {
							[Op.iLike]: "%" + reqObj["searchTxt"] + "%",
						},
					},
				];
			}

			let { count, rows: websiteContentOthersData } =
				await websiteContentOthers.findAndCountAll({
					where: cond,

					order: [["id", "DESC"]],
					include: [
						{
							model: websiteContentOthersLinks,
							order: [["displayOrder", "ASC"]]
						},
						{
							model: websiteContentOthersSections,
							order: [["displayOrder", "ASC"]],
						}]
				});
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.EMPTY,
				});
			}

			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: websiteContentOthersData,
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

	const deletewebsiteContentOthers = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await websiteContentOthers.update(
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
	const getothersLinkFile = (req, res) => {
		res.sendFile(path.join(filepath + req.params.fileName));
	}

	const createOthersLinks = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			let NewsResult = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (req.files && req.files.otherslink) {
				let imageDatas = req.files.otherslink.filter((image) => {
					return image.filename;
				});
				reqObj.linkFileName =
					imageDatas && imageDatas[0] ? imageDatas[0].filename : "";
			}
			if (reqObj.id) {
				NewsResult = await websiteContentOthersLinks.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {

				NewsResult = await websiteContentOthersLinks.create(reqObj);
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

	const getwebsiteContentOthersLinks = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {};
			let filepath = ''

			if (reqObj.id) {
				cond["id"] = reqObj.id;
				filepath = req.protocol + '://' + req.get('host') + path.join(req.originalUrl, '../../') + 'otherslink/';
			} else {
				filepath = req.protocol + '://' + req.get('host') + path.join(req.originalUrl, '../') + 'otherslink/'
			}
			if (reqObj.otherMenuId) {
				cond["otherMenuId"] = reqObj.otherMenuId;
			}

			if (reqObj.id) {
				cond["id"] = reqObj.id;
			}
			cond["isActive"] = true;

			let { count, rows: websiteContentOthersLinksData } =
				await websiteContentOthersLinks.findAndCountAll({
					where: cond,
					order: [["id", "DESC"]],
					include: [
						{
							model: websiteContentOthersSections
						}
					]
				});
			if (count <= 0) {
				return res.status(httpStatus.OK).json({
					status: httpStatus.OK,
					message: label.EMPTY,
				});
			}

			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				data: websiteContentOthersLinksData,
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

	const deletewebsiteContentOthersLinks = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await websiteContentOthersLinks.update(
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
	const createOthersections = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			let websiteContentOthersSectionsData = [],
				NewsResult = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.id) {
				NewsResult = await websiteContentOthersSections.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				websiteContentOthersSectionsData = await websiteContentOthersSections.findOne({
					where: whereCodn,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				});

				NewsResult = await websiteContentOthersSections.create(reqObj);
			}

			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				message: label.LABEL_SUCCESS,
				data: NewsResult,

			});
		} catch (err) {
			console.error(err, '*******');
			if (!err.statusCode) {
				err.statusCode = httpStatus.BAD_REQUEST;
			}
			return res.status(httpStatus.BAD_REQUEST).json({
				status: httpStatus.BAD_REQUEST,
				message: err
			});
		}
	};

	const getwebsiteContentOthersSections = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {};

			if (reqObj.id) {
				cond["id"] = reqObj.id;
			}
			if (reqObj.otherMenuId) {
				cond["otherMenuId"] = reqObj.otherMenuId;
			}

			cond["isActive"] = true;

			let { count, rows: websiteContentOthersSectionsData } =
				await websiteContentOthersSections.findAndCountAll({
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
				data: websiteContentOthersSectionsData,
				message: label.LABEL_SUCCESS,
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

	const deletewebsiteContentOthersSections = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await websiteContentOthersSections.update(
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


	return {
		create,
		getwebsiteContentOthers,
		deletewebsiteContentOthers,
		createOthersections,
		getwebsiteContentOthersSections,
		deletewebsiteContentOthersSections,
		createOthersLinks,
		getwebsiteContentOthersLinks,
		deletewebsiteContentOthersLinks,
		getFile,
		getothersLinkFile
	};
};

export default websiteContentOthersController();
