import db from "../../config/sequelize";
import Sequelize from "sequelize";

const Op = db.Sequelize.Op;
var sqDB = db.Sequelize.sqDb
const HydroceleOperationsReportDao = () => {


  const getHydroceleOperationsReportDao = async (req) => {
    return new Promise(async function (resolve) {
      var response = {}

      let year = req.body.year
      let lastYear = year - 1
      db.sequelize.query(`SELECT
      COALESCE(A."districtId", B."districtId") AS "districtId",
      COALESCE(A."districtName", B."districtName") AS "districtName",
      COALESCE(A.jan, 0) AS "jan",
      COALESCE(A.feb, 0) AS "feb",
      COALESCE(A.mar, 0) AS "mar",
      COALESCE(A.apr, 0) AS "apr",
      COALESCE(A.may, 0) AS "may",
      COALESCE(A.jun, 0) AS "jun",
      COALESCE(A.jul, 0) AS "jul",
      COALESCE(A.aug, 0) AS "aug",
      COALESCE(A.sep, 0) AS "sep",
      COALESCE(A.oct, 0) AS "oct",
      COALESCE(A.nov, 0) AS "nov",
      COALESCE(A.dec, 0) AS "dec",
      COALESCE(A.total, 0) AS "total",
      COALESCE(B."totalLast", 0) AS "totalLast",
      (CASE
        WHEN COALESCE(COALESCE(B."totalLast", 0) - A."total", 0) < 0 THEN 0
        ELSE COALESCE(COALESCE(B."totalLast", 0) - A."total", 0)
      END) AS Pending
    FROM (SELECT
      D.id as "districtId",
      D."districtName",
      SUM(H.jan) AS "jan",
      SUM(H.feb) AS "feb",
      SUM(H.mar) AS "mar",
      SUM(H.apr) AS "apr",
      SUM(H.may) AS "may",
      SUM(H.jun) AS "jun",
      SUM(H.jul) AS "jul",
      SUM(H.aug) AS "aug",
      SUM(H.sep) AS "sep",
      SUM(H.oct) AS "oct",
      SUM(H.nov) AS "nov",
      SUM(H.dec) AS "dec",
      SUM(H.jan + H.feb + H.mar + H.apr + H.may + H.jun + H.jul + H.aug + H.sep + H.oct + H.nov + H.dec) AS "total"
    FROM public.districts D
    LEFT JOIN (select 
               * 
               from public."hydrocelectomyOperations"  
               WHERE YEAR = :year) H
      ON D.id = H."districtId"
    GROUP BY H."districtId",
             D.id,
             D."districtName"
    ORDER BY H."districtId") A
    FULL JOIN (SELECT
      H."districtId",
      D.id,
      D."districtName",
      SUM(H.jan + H.feb + H.mar + H.apr + H.may + H.jun + H.jul + H.aug + H.sep + H.oct + H.nov + H.dec) AS "totalLast"
    FROM public."hydrocelectomyOperations" H
    LEFT JOIN public.districts D
      ON D.id = H."districtId"
    WHERE YEAR <=
    (
    :lastYear
    )
    GROUP BY H."districtId",
             D.id,
             D."districtName"
    ORDER BY H."districtId") B
      ON A."districtId" = B."districtId"`,
        {
          replacements: { year: year, lastYear: lastYear },
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
    getHydroceleOperationsReportDao
  };
};
export default HydroceleOperationsReportDao();