import {
    validationResult
} from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
import SAEReportDao from "../dao/SAEReportDao";

const {
    lymphedemaLineList,
    lymphedemaLineListSurvey,
    lymphedemaLineListFollowUpsLF,
    lymphedemaLineListFollowUpsHF,
    udCategoryOptions,
    verticalControlFieldUnits,
    verticalControlUnits,
    states,
    districts,
    corporations,
    talukas,
    zones,
    facilities,
    subCenters,
    wards,
    villages
} = db;
const Op = db.Sequelize.Op;
var sqDB = db.Sequelize.sqDb
const SAEReportController = () => {

    const saereport = async (req, res) => {
        try {
            const reqObj = utils.getReqValues(req);

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                throw errors.array();
            }
            var saereport = await SAEReportDao.reportdao(reqObj)
            //console.log(saereport, 'saereport')
            if (saereport.error) {
                return res.status(httpStatus.BAD_REQUEST).json({
                    status: httpStatus.BAD_REQUEST,
                    error: saereport.error,
                    message: "Something Went Wrong"
                });
            } else {
                return res.status(httpStatus.OK).json({
                    status: httpStatus.OK,
                    data: saereport.data,
                    message: label.LABEL_SUCCESS,
                });
            }
        } catch (err) {
            console.log(err);
            if (!err.statusCode) {
                err.statusCode = httpStatus.BAD_REQUEST;
            }
            return res.status(httpStatus.BAD_REQUEST).json({
                status: httpStatus.BAD_REQUEST,
                message: err
            });
        }
    }

    return {
        saereport
    };
};
export default SAEReportController();