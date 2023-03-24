import db from "../../config/sequelize";
import Sequelize from "sequelize";

const Op = db.Sequelize.Op;
var sqDB = db.Sequelize.sqDb
const MMDPKitsReportDao = () => {


  const getMMDPKitsReportDao = async (req) => {
    return new Promise(async function (resolve) {
      var response = {}

      let year = req.body.year
      db.sequelize.query(`SELECT
      COALESCE(A.count, 0) AS count,
      COALESCE(A.month, 0) AS month,
      D.id AS "districtId",
      D."districtName"
    FROM (SELECT
      month,
      "districtId",
      D."districtName",
      COUNT(L.id)
    FROM public."lymphedemaLineLists" L
    JOIN public."lymphedemaLineListFollowUpsLves" LF
      ON L.id = LF."lymphedemaLineListId"
    LEFT JOIN public.districts D
      ON D.id = L."districtId"
    WHERE L."isActive" = TRUE
    AND LF."isServiceMMDPKitGiven" = TRUE
    AND date_part('year', LF."serviceMMDPKitGivenDate") = :year
    GROUP BY month,
             "districtId",
             D."districtName") A
    RIGHT JOIN public.districts D
      ON D.id = A."districtId";`,
        {
          replacements: { year: year},
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
    getMMDPKitsReportDao
  };
};
export default MMDPKitsReportDao();