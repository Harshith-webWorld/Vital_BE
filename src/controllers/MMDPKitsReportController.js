import {
  validationResult
} from "express-validator";
import httpStatus from "http-status";
import utils from "../services/utils.service";
import label from "../../config/resources";
import db from "../../config/sequelize";
import MMDPKitsReportDao from "../dao/MMDPKitsReportDao";

const MMDPKitsReportController = () => {


  const getMMDPKitsReportController = async (req, res) => {
    try {
      const reqObj = utils.getReqValues(req);

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw errors.array();
      }


      let getMMDPKitsReportDao = await MMDPKitsReportDao.getMMDPKitsReportDao(req)

      if (getMMDPKitsReportDao.error) {
        return res.status(httpStatus.BAD_REQUEST).json({
          status: httpStatus.BAD_REQUEST,
          message: "Something Went Wrong"
        });
      }
      else {
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

        let groupBy = function (xs, key) {
          return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
          }, {});
        };
        let groupedByDistrictName = groupBy(getMMDPKitsReportDao.data, 'districtName')
        let monthsCombined = []
        Object.keys(groupedByDistrictName).forEach(function (districtName) {
          let tempObj = {
            districtName,
            districtId: groupedByDistrictName[districtName][0].districtId,
            total: 0,
            jan: 0,
            feb: 0,
            mar: 0,
            apr: 0,
            may: 0,
            jun: 0,
            jul: 0,
            aug: 0,
            sep: 0,
            oct: 0,
            nov: 0,
            dec: 0
          }
          groupedByDistrictName[districtName].forEach(data => {
            let month = utils.monthIdtoMonth[data.month]
            tempObj[month] = data.count
            tempObj["total"] = tempObj["total"] + (+data.count)
          })
          console.log("tempObj", tempObj)
          monthsCombined.push(tempObj)
        });
        let sumItems = (items, prop) => {
          return items.reduce(function (a, b) {
            return (+a) + (+b[prop]);
          }, 0);
        };
        monthsCombined.forEach(data => {
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
        let toSumProps = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec", "total"]
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
          // hydroceleOperationsReport: getMMDPKitsReportDao.data,
          data: circleLevelSum,
          // groupedByDistrictName,
          // monthsCombined,
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
    getMMDPKitsReportController
  };
};
export default MMDPKitsReportController();