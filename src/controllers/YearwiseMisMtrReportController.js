import {
  validationResult
} from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
import YearwiseMisMtrReportDao from "../dao/YearwiseMisMtrReportDao";

const YearwiseMisMtrReportController = () => {


  const getYearwiseMisMtrReportController = async (req, res) => {
    try {
      const reqObj = utils.getReqValues(req);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw errors.array();
      }
      let getYearwiseMisMtrReportDao = {}
      if(req.body.yearType === "calender"){
        getYearwiseMisMtrReportDao = await YearwiseMisMtrReportDao.getYearwiseMisMtrReportDao(req)
      } else {
        getYearwiseMisMtrReportDao = await YearwiseMisMtrReportDao.getFinancialYearwiseMisMtrReportDao(req)
      }

      if (getYearwiseMisMtrReportDao.error) {
        return res.status(httpStatus.BAD_REQUEST).json({
          status: httpStatus.BAD_REQUEST,
          message: "Something Went Wrong"
        });
      }
      if (getYearwiseMisMtrReportDao.data.length) {
        getYearwiseMisMtrReportDao.data.sort((a, b) => {
          return a.districtId - b.districtId 
        })
      }
      return res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        data: getYearwiseMisMtrReportDao,
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
    getYearwiseMisMtrReportController
  };
};
export default YearwiseMisMtrReportController();