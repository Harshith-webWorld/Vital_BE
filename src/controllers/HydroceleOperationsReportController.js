import {
  validationResult
} from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
import Sequelize from "sequelize";
import HydroceleOperationsReportDao from "../dao/HydroceleOperationsReportDao";
const { hydrocelectomyOperations, districts } = db;

const HydroceleOperationsReportController = () => {


  const getHydroceleOperationsReportController = async (req, res) => {
    try {
      const reqObj = utils.getReqValues(req);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw errors.array();
      }


      let getHydroceleOperationsReportDao = await HydroceleOperationsReportDao.getHydroceleOperationsReportDao(req)
      let allDistricts = await districts.findAll({
        attributes: ["districtName", "id"]
      })
      console.log("getHydroceleOperationsReportDao", getHydroceleOperationsReportDao)

      if (getHydroceleOperationsReportDao.error) {
        return res.status(httpStatus.BAD_REQUEST).json({
          status: httpStatus.BAD_REQUEST,
          message: "Something Went Wrong"
        });
      } else {
        let circles = {
          thaneCircle: [24, 27, 33],
          nashikCircle: [9, 21, 13, 22, 1],
          puneCircle: [26, 30, 32],
          kolhapurCircle: [15, 29, 28, 31],
          aurangabadCircle: [4, 14, 25, 12],
          laturCircle: [16, 5, 23, 20],
          akolaCircle: [35, 36, 2, 3, 7],
          nagpurCircle: [6, 8, 11, 10, 19, 34]
        }

        let zones = {
          thaneZone: [],
          nashikZone: [],
          puneZone: [],
          kolhapurZone: [],
          aurangabadZone: [],
          laturZone: [],
          akolaZone: [],
          nagpurZone: []
        }
        let zoneNames = {
          thaneZone: "Thane Circle",
          nashikZone: "Nashik Circle",
          puneZone: "Pune Circle",
          kolhapurZone: "Kolhapur Circle",
          aurangabadZone: "Aurangabad Circle",
          laturZone: "Latur Circle",
          akolaZone: "Akola Circle",
          nagpurZone: "Nagpur Circle"
        }
        let restDistricts = []
        let sumItems = (items, prop) => {
          return items.reduce(function (a, b) {
            return (+a) + (+b[prop]);
          }, 0);
        };
        getHydroceleOperationsReportDao.data.forEach(data => {
          if (circles.thaneCircle.includes(data.districtId)) zones.thaneZone.push(data)
          else if (circles.nashikCircle.includes(data.districtId)) zones.nashikZone.push(data)
          else if (circles.puneCircle.includes(data.districtId)) zones.puneZone.push(data)
          else if (circles.kolhapurCircle.includes(data.districtId)) zones.kolhapurZone.push(data)
          else if (circles.aurangabadCircle.includes(data.districtId)) zones.aurangabadZone.push(data)
          else if (circles.laturCircle.includes(data.districtId)) zones.laturZone.push(data)
          else if (circles.akolaCircle.includes(data.districtId)) zones.akolaZone.push(data)
          else if (circles.nagpurCircle.includes(data.districtId)) zones.nagpurZone.push(data)
          else restDistricts.push(data)
        })
        let circleLevelSum = []
        let onlyCircles = []
        let toSumProps = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec", "total", "totalLast", "pending"]
        for (const [key, value] of Object.entries(zones)) {
          if (!value.length) continue
          let rolledUp = {}
          toSumProps.forEach(prop => {
            rolledUp[prop] = sumItems(value, prop)
          })
          rolledUp["districtName"] = zoneNames[key]
          rolledUp["highlight"] = true
          onlyCircles.push(rolledUp)
          circleLevelSum.push(...value, rolledUp)
        }
        circleLevelSum.push(...restDistricts)
        if (onlyCircles.length) {
          let rolledUp = {}
          toSumProps.forEach(prop => {
            rolledUp[prop] = sumItems(onlyCircles, prop)
          })
          rolledUp["districtName"] = "Maharashtra State Total"
          rolledUp["highlight"] = true
          circleLevelSum.push(rolledUp)
        }

        return res.status(httpStatus.OK).json({
          status: httpStatus.OK,
          // hydroceleOperationsReport: getHydroceleOperationsReportDao.data,
          data: circleLevelSum,
          message: label.LABEL_SUCCESS,
        });
      }

      let data = await hydrocelectomyOperations.findAndCountAll({
        where: {
          year: {
            $lte: req.body.year
          }
        },
        // raw: true,
        attributes: ['hydrocelectomyOperations.districtId', 'district.districtName',
          [Sequelize.fn('sum', Sequelize.col('hydrocelectomyOperations.jan')), 'jan'],
          [Sequelize.fn('sum', Sequelize.col('hydrocelectomyOperations.feb')), 'feb'],
          [Sequelize.fn('sum', Sequelize.col('hydrocelectomyOperations.mar')), 'mar'],
          [Sequelize.fn('sum', Sequelize.col('hydrocelectomyOperations.apr')), 'apr'],
          [Sequelize.fn('sum', Sequelize.col('hydrocelectomyOperations.may')), 'may'],
          [Sequelize.fn('sum', Sequelize.col('hydrocelectomyOperations.jun')), 'jun'],
          [Sequelize.fn('sum', Sequelize.col('hydrocelectomyOperations.jul')), 'jul'],
          [Sequelize.fn('sum', Sequelize.col('hydrocelectomyOperations.aug')), 'aug'],
          [Sequelize.fn('sum', Sequelize.col('hydrocelectomyOperations.sep')), 'sep'],
          [Sequelize.fn('sum', Sequelize.col('hydrocelectomyOperations.oct')), 'oct'],
          [Sequelize.fn('sum', Sequelize.col('hydrocelectomyOperations.nov')), 'nov'],
          [Sequelize.fn('sum', Sequelize.col('hydrocelectomyOperations.dec')), 'dec']
        ],
        group: ['hydrocelectomyOperations.districtId', 'district.districtName'],
        include: [{
          model: districts,
          required: false,
          as: 'district',
          attributes: ["districtName"]
        }]
      })
      return res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        data: data,
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
    getHydroceleOperationsReportController
  };
};
export default HydroceleOperationsReportController();