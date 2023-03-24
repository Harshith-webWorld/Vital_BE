import {
  validationResult
} from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
import RCOMisMtrReportDao from "../dao/RCOMisMtrReportDao";

const RCOMisMtrReportController = () => {


  const getRCOMisMtrReportController = async (req, res) => {
    try {
      const reqObj = utils.getReqValues(req);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw errors.array();
      }


      let getRCOMisMtrReportDao = await RCOMisMtrReportDao.getRCOMisMtrReportDao(req)

      if (getRCOMisMtrReportDao.error) {
        return res.status(httpStatus.BAD_REQUEST).json({
          status: httpStatus.BAD_REQUEST,
          message: "Something Went Wrong"
        });
      }
      if (getRCOMisMtrReportDao.data.length) {
        getRCOMisMtrReportDao.data.sort((a, b) => {
          return a.districtId - b.districtId 
        })
      }
      return res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        data: getRCOMisMtrReportDao,
        message: label.LABEL_SUCCESS,
      });
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
    getRCOMisMtrReportController
  };
};
export default RCOMisMtrReportController();