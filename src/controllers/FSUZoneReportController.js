import {
  validationResult
} from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
import FSUZoneReportDao from "../dao/FSUZoneReportDao";

const FSUZoneReportController = () => {


  const getFSUZoneReportController = async (req, res) => {
    try {
      const reqObj = utils.getReqValues(req);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw errors.array();
      }


      let getFSUZoneReportDao = await FSUZoneReportDao.getFSUZoneReportDao(req)

      if (getFSUZoneReportDao.error) {
        return res.status(httpStatus.BAD_REQUEST).json({
          status: httpStatus.BAD_REQUEST,
          message: "Something Went Wrong"
        });
      }
      if (getFSUZoneReportDao.data.length) {
        getFSUZoneReportDao.data = getFSUZoneReportDao.data.sort((a, b) => {
          console.log(a.nameOfControlUnit, b.nameOfControlUnit)
          return a.nameOfControlUnit > b.nameOfControlUnit ? 1 : 1
        })
      }
      return res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        data: getFSUZoneReportDao,
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
    getFSUZoneReportController
  };
};
export default FSUZoneReportController();