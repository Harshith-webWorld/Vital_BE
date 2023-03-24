import {
  validationResult
} from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
import FCUMisMtrReportDao from "../dao/FCUMisMtrReportDao";

const FCUMisMtrReportController = () => {


  const getFCUMisMtrReportController = async (req, res) => {
    try {
      const reqObj = utils.getReqValues(req);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw errors.array();
      }


      let getFCUMisMtrReportDao = await FCUMisMtrReportDao.getFCUMisMtrReportDao(req)

      if (getFCUMisMtrReportDao.error) {
        return res.status(httpStatus.BAD_REQUEST).json({
          status: httpStatus.BAD_REQUEST,
          message: "Something Went Wrong"
        });
      }
      if (getFCUMisMtrReportDao.data.length) {
        getFCUMisMtrReportDao.data = getFCUMisMtrReportDao.data.sort((a, b) => {
          return a.nameOfControlUnit > b.nameOfControlUnit ? 1 : 1
        })
      }
      return res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        data: getFCUMisMtrReportDao,
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
    getFCUMisMtrReportController
  };
};
export default FCUMisMtrReportController();