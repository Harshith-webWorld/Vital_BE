import db from "../../config/sequelize";
import Sequelize from "sequelize";
import utils from "../services/utils.service";

const Op = db.Sequelize.Op;
var sqDB = db.Sequelize.sqDb
const HydroceleOpsMisMtrReportDao = () => {


  const getHydroceleOpsMisMtrReportDao = async (req) => {
    return new Promise(async function (resolve) {
      var response = {}

      let year = req.body.startYear
      db.sequelize.query(`SELECT
      d."districtName",
      COALESCE(SUM(H.jan), 0) AS "jan",
      COALESCE(SUM(H.feb), 0) AS "feb",
      COALESCE(SUM(H.mar), 0) AS "mar",
      COALESCE(SUM(H.apr), 0) AS "apr",
      COALESCE(SUM(H.may), 0) AS "may",
      COALESCE(SUM(H.jun), 0) AS "jun",
      COALESCE(SUM(H.jul), 0) AS "jul",
      COALESCE(SUM(H.aug), 0) AS "aug",
      COALESCE(SUM(H.sep), 0) AS "sep",
      COALESCE(SUM(H.oct), 0) AS "oct",
      COALESCE(SUM(H.nov), 0) AS "nov",
      COALESCE(SUM(H.dec), 0) AS "dec",
      COALESCE(SUM(H.jan + H.feb + H.mar + H.apr + H.may + H.jun + H.jul + H.aug + H.sep + H.oct + H.nov + H.dec), 0) AS "total"
    FROM public.districts d
    LEFT JOIN (SELECT
      *
    FROM public."hydrocelectomyOperations" h
    WHERE year = :year) h
      ON h."districtId" = d.id
    GROUP BY h.year,
             d."districtName"`,
        {
          replacements: { year },
          // type: Sequelize.QueryTypes.SELECT
        }
      )
        .then(([results, metadata]) => {

          response.error = false
          response.data = results
        }).catch((error) => {
          console.log(error)
          response.error = true
        })
        .finally(() => {
          resolve(response)
        })
    })
  }

  return {
    getHydroceleOpsMisMtrReportDao
  };
};
export default HydroceleOpsMisMtrReportDao();