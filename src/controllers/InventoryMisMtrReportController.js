import {
  validationResult
} from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
import InventoryMisMtrReportDao from "../dao/InventoryMisMtrReportDao";

const InventoryMisMtrReportController = () => {


  const getInventoryMisMtrReportController = async (req, res) => {
    try {
      const reqObj = utils.getReqValues(req);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw errors.array();
      }


      let getInventoryMisMtrReportDao = await InventoryMisMtrReportDao.getInventoryMisMtrReportDao(req)

      if (getInventoryMisMtrReportDao.error) {
        return res.status(httpStatus.BAD_REQUEST).json({
          status: httpStatus.BAD_REQUEST,
          message: "Something Went Wrong"
        });
      }
      if (getInventoryMisMtrReportDao.data.length) {
        getInventoryMisMtrReportDao.data.sort((a, b) => {
          return a.districtId - b.districtId 
        })
      }
      return res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        data: getInventoryMisMtrReportDao,
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
    getInventoryMisMtrReportController
  };
};
export default InventoryMisMtrReportController();