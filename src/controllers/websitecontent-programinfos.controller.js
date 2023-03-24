import { validationResult, check } from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
import path from "path";
const { websiteContentProgramInfos, websiteContentProgramInfoLinks, websiteContentProgramInfoSections } = db;
const Op = db.Sequelize.Op;
const filepath = path.join(__dirname, `../../../`) + `src/uploads/website-programinfos/`;

const websiteContentProgramInfosController = () => {
	const create = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			let websiteContentProgramInfosData = [],
				NewsResult = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.programInfoHeader) {
				whereCodn["programInfoHeader"] = reqObj.programInfoHeader;
			}

			if (req.files && req.files.programInfos) {
				let imageDatas = req.files.programInfos.filter((image) => {
					return image.filename;
				});
				reqObj.programInfoImage =
					imageDatas && imageDatas[0] ? imageDatas[0].filename : "";
			}
			if (reqObj.id) {
				NewsResult = await websiteContentProgramInfos.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				websiteContentProgramInfosData = await websiteContentProgramInfos.findOne({
					where: whereCodn,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				});

				if (
					websiteContentProgramInfosData &&
					websiteContentProgramInfosData.isNewRecord === false
				) {
					return res.status(httpStatus.OK).json({
						status: httpStatus.OK,
						message: label.WEBSITE_BLOGS_ALREADY_EXISTS,
					});
				}

				NewsResult = await websiteContentProgramInfos.create(reqObj);
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

	const getwebsiteContentProgramInfos = async (req, res) => {
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

			let { count, rows: websiteContentProgramInfosData } =
				await websiteContentProgramInfos.findAndCountAll({
					where: cond,

					order: [["id", "DESC"]],
					include: [
						{
							model: websiteContentProgramInfoLinks,
							order: [["displayOrder", "ASC"]]
						},
						{
							model: websiteContentProgramInfoSections,
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
				data: websiteContentProgramInfosData,
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

	const deletewebsiteContentProgramInfos = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await websiteContentProgramInfos.update(
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
	const getProgramInfoLinkFile = (req, res) => {
		res.sendFile(path.join(filepath + req.params.fileName));
	}
	const createProgramInfoLinks = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			let NewsResult = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (req.files && req.files.programInfoLinks) {
				let imageDatas = req.files.programInfoLinks.filter((image) => {
					return image.filename;
				});
				reqObj.linkFileName =
					imageDatas && imageDatas[0] ? imageDatas[0].filename : "";
			}
			if (reqObj.id) {
				NewsResult = await websiteContentProgramInfoLinks.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {

				NewsResult = await websiteContentProgramInfoLinks.create(reqObj);
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

	const getwebsiteContentProgramInfoLinks = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			let cond = {}; let filepath = ''

			if (reqObj.id) {
				cond["id"] = reqObj.id;
				filepath = req.protocol + '://' + req.get('host') + path.join(req.originalUrl, '../../') + 'programInfoLinks/';
			} else {
				filepath = req.protocol + '://' + req.get('host') + path.join(req.originalUrl, '../') + 'programInfoLinks/'
			}
			if (reqObj.programInfoId) {
				cond["programInfoId"] = reqObj.programInfoId;
			}

			if (reqObj.id) {
				cond["id"] = reqObj.id;
			}
			cond["isActive"] = true;

			let { count, rows: websiteContentProgramInfoLinksData } =
				await websiteContentProgramInfoLinks.findAndCountAll({
					where: cond,

					order: [["id", "DESC"]],
					include: [
						{
							model: websiteContentProgramInfoSections
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
				data: websiteContentProgramInfoLinksData,
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

	const deletewebsiteContentProgramInfoLinks = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await websiteContentProgramInfoLinks.update(
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
	const createProgramInfoSections = async (req, res) => {
		try {
			const reqObj = utils.getReqValues(req);
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}

			let websiteContentProgramInfoSectionsData = [],
				NewsResult = [];
			let whereCodn = {};
			whereCodn["isActive"] = true;
			if (reqObj.id) {
				NewsResult = await websiteContentProgramInfoSections.update(reqObj, {
					where: { id: reqObj["id"] },
				});
			} else {
				websiteContentProgramInfoSectionsData = await websiteContentProgramInfoSections.findOne({
					where: whereCodn,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				});

				NewsResult = await websiteContentProgramInfoSections.create(reqObj);
			}

			return res.status(httpStatus.OK).json({
				status: httpStatus.OK,
				message: label.LABEL_SUCCESS,
				data: NewsResult,

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

	const getwebsiteContentProgramInfoSections = async (req, res) => {
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
			if (reqObj.programInfoId) {
				cond["programInfoId"] = reqObj.programInfoId;
			}

			cond["isActive"] = true;

			let { count, rows: websiteContentProgramInfoSectionsData } =
				await websiteContentProgramInfoSections.findAndCountAll({
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
				data: websiteContentProgramInfoSectionsData,
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

	const deletewebsiteContentProgramInfoSections = async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				throw errors.array();
			}
			const reqObj = utils.getReqValues(req);
			if (reqObj.id) {
				await websiteContentProgramInfoSections.update(
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
		getwebsiteContentProgramInfos,
		deletewebsiteContentProgramInfos,
		createProgramInfoSections,
		getwebsiteContentProgramInfoSections,
		deletewebsiteContentProgramInfoSections,
		createProgramInfoLinks,
		getwebsiteContentProgramInfoLinks,
		deletewebsiteContentProgramInfoLinks,
		getFile,
		getProgramInfoLinkFile
	};
};

export default websiteContentProgramInfosController();
