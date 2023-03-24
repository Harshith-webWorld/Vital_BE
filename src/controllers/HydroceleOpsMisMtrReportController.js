import {
  validationResult
} from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
import HydroceleOpsMisMtrReportDao from "../dao/HydroceleOpsMisMtrReportDao";

const HydroceleOpsMisMtrReportController = () => {


  const getHydroceleOpsMisMtrReportController = async (req, res) => {
    try {
      const reqObj = utils.getReqValues(req);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw errors.array();
      }


      let getHydroceleOpsMisMtrReportDao = await HydroceleOpsMisMtrReportDao.getHydroceleOpsMisMtrReportDao(req)

      if (getHydroceleOpsMisMtrReportDao.error) {
        return res.status(httpStatus.BAD_REQUEST).json({
          status: httpStatus.BAD_REQUEST,
          message: "Something Went Wrong"
        });
      }
      if (getHydroceleOpsMisMtrReportDao.data.length) {
        getHydroceleOpsMisMtrReportDao.data.sort((a, b) => {
          return a.districtId - b.districtId 
        })
      }
      return res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        data: getHydroceleOpsMisMtrReportDao,
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
    getHydroceleOpsMisMtrReportController
  };
};
export default HydroceleOpsMisMtrReportController();