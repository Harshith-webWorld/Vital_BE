import { validationResult } from "express-validator";
import httpStatus from "http-status";
import joi from "joi";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
const { hydrocelectomyOperations, districts } = db;
const Op = db.Sequelize.Op;

const hydrocelectomyOperationsController = () => {

    const create = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw errors.array();
            }
            let hydrocelectomyOperationsData = [];
            let lastID = await hydrocelectomyOperations.findOne({
                attributes: ["id"],
                order: [['id', 'DESC']]
            });
            let currentId = lastID && lastID.dataValues && lastID.dataValues.id ? (+lastID.dataValues.id) + 1 : 1;
            req.body.srNo = "SR" + currentId;
            hydrocelectomyOperationsData = await hydrocelectomyOperations.create(req.body,
            );
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                data: hydrocelectomyOperationsData,
                message: label.LABEL_SUCCESS,
            });
        } catch (err) {
            console.log(err);
            if (!err.statusCode) {
                err.statusCode = httpStatus.BAD_REQUEST;
            }
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                data: err,
                message: label.LABEL_FAILED
            });
        }
    };

    const update = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw errors.array();
            }
            let hydrocelectomyOperationsData = [];
            if (req.body.id) {
                hydrocelectomyOperationsData = await hydrocelectomyOperations.update(req.body, {
                    where: { id: req.body.id },
                });
            }
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                data: hydrocelectomyOperationsData,
                message: label.LABEL_SUCCESS,
            });
        } catch (err) {
            console.log(err);
            if (!err.statusCode) {
                err.statusCode = httpStatus.BAD_REQUEST;
            }
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                data: err,
                message: label.LABEL_FAILED
            });
        }
    }

    const bulkCreate = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw errors.array();
            }
            let hydrocelectomyOperationsData = [];
            let lastID = await hydrocelectomyOperations.findOne({
                attributes: ["id"],
                order: [['id', 'DESC']]
            });
            let currentId = lastID && lastID.dataValues && lastID.dataValues.id ? (+lastID.dataValues.id) + 1 : 1;
            req.body.hydrocelectomyOperations.forEach((element) => {
                element.srNo = "SR" + currentId++;
            })
            hydrocelectomyOperationsData = await hydrocelectomyOperations.bulkCreate(req.body.hydrocelectomyOperations, { returning: true });
            return res.status(httpStatus.OK).json({
                status: httpStatus.OK,
                data: hydrocelectomyOperationsData,
                message: label.LABEL_SUCCESS,
            });
        } catch (err) {
            console.log(err);
            if (!err.statusCode) {
                err.statusCode = httpStatus.BAD_REQUEST;
            }
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                data: err,
                message: label.LABEL_FAILED
            });
        }
    };

    const get = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw errors.array();
            }
            let cond = {}
            if (req.query.id) {
                cond["id"] = req.query.id;
            }
            if (req.query.districtId) {
                cond["districtId"] = req.query.districtId;
            }
            cond["isActive"] = true;
            let { count, rows: hydrocelectomyOperationsData } =
                await hydrocelectomyOperations.findAndCountAll({
                    where: cond,
                    order: [["id", "DESC"]],
                    include: [
                        {
                            model: districts,
                            attributes: ["id", "districtName"],
                            required: false
                        },
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
                data: hydrocelectomyOperationsData,
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

    const deleteEntry = async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw errors.array();
            }
            if (req.query.id) {
                await hydrocelectomyOperations.update(
                    { isActive: false },
                    {
                        where: { id: req.query.id },
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
        bulkCreate,
        update,
        get,
        deleteEntry
    };
};
export default hydrocelectomyOperationsController();
