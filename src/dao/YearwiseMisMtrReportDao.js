import db from "../../config/sequelize";
import Sequelize from "sequelize";
import utils from "../services/utils.service";

const Op = db.Sequelize.Op;
var sqDB = db.Sequelize.sqDb
const YearwiseMisMtrReportDao = () => {


  const getYearwiseMisMtrReportDao = async (req) => {
    return new Promise(async function (resolve) {
      var response = {}
      db.sequelize.query(`select year, "noOfBSExamined", "noOfPersonsMFDetect","noOfPersonsDiseaseDetect","mfPercent","disPercent",
      sum as "hydrocelectomyOperations"
      from
          (
             SELECT 
            mf.year,
            COALESCE(SUM(vms."noOfPersonsNBSE"), 0) "noOfBSExamined",
            COALESCE(SUM(vms."noOfPersonsNPMF"), 0) "noOfPersonsMFDetect",
            COALESCE(SUM(dis."noOfPersonsDisease"), 0) "noOfPersonsDiseaseDetect",
              COALESCE(((COALESCE(SUM(vms."noOfPersonsNPMF"), 0) * 1.0 /
              ((CASE
                WHEN COALESCE(SUM(vms."noOfPersonsNBSE"), 0) = 0 THEN NULL
                ELSE SUM(vms."noOfPersonsNBSE")
              END)) * 100.00) ::DECIMAL(10, 2)), 0) AS "mfPercent",
                COALESCE(((COALESCE(SUM(dis."noOfPersonsDisease"), 0) * 1.0 /
              ((CASE
                WHEN COALESCE(SUM(vms."noOfPersonsNBSE"), 0) = 0 THEN NULL
                ELSE SUM(vms."noOfPersonsNBSE")
              END)) * 100.00) ::DECIMAL(10, 2)), 0) AS "disPercent"
            From 
            public."mfPositiveLineLists" mf
            LEFT JOIN public."vMFPositiveLineListSurveysById" vms
            ON vms.id = mf.id
            LEFT JOIN (SELECT
              COUNT(id) "noOfPersonsDisease",
              "year"
            FROM public."lymphedemaLineLists"
            WHERE "isActive" = TRUE
            GROUP BY year) dis
            on dis.year = mf.year
            Group by mf.year
            ORDER BY mf.year ASC
          ) q1
          left outer join
          (
            Select a.year, sum(a.total) from (
      select year,jan+feb+mar+apr+may+jun+jul+aug+sep+oct+nov+dec as total from public."hydrocelectomyOperations"
      ) a
      group by a.year  
          ) t using (year)
      order by year`,
        {
          // replacements: { year: year},
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

  const getFinancialYearwiseMisMtrReportDao = async (req) => {
    return new Promise(async function (resolve) {
      var response = {}
      db.sequelize.query(`select financialyear as year, "noOfBSExamined", "noOfPersonsMFDetect","noOfPersonsDiseaseDetect","mfPercent","disPercent",
      hydrocelectomyOperations
      from
          (
             SELECT (CASE WHEN t1.month  <=3 THEN 
        concat(year-1,'-',year)
         ELSE concat(year,'-',year+1) end) AS financialyear,sum(t1."noOfBSExamined") as "noOfBSExamined",
         sum(t1."noOfPersonsMFDetect") as "noOfPersonsMFDetect",
         sum(t1."noOfPersonsDiseaseDetect") as "noOfPersonsDiseaseDetect",
         sum(t1."mfPercent") as "mfPercent",
         sum(t1."disPercent") as "disPercent"
      FROM (SELECT 
           mf.year,mf.month , 
            COALESCE(SUM(vms."noOfPersonsNBSE"), 0) "noOfBSExamined",
            COALESCE(SUM(vms."noOfPersonsNPMF"), 0) "noOfPersonsMFDetect",
            COALESCE(SUM(dis."noOfPersonsDisease"), 0) "noOfPersonsDiseaseDetect",
              COALESCE(((COALESCE(SUM(vms."noOfPersonsNPMF"), 0) * 1.0 /
              ((CASE
                WHEN COALESCE(SUM(vms."noOfPersonsNBSE"), 0) = 0 THEN NULL
                ELSE SUM(vms."noOfPersonsNBSE")
              END)) * 100.00) ::DECIMAL(10, 2)), 0) AS "mfPercent",
                COALESCE(((COALESCE(SUM(dis."noOfPersonsDisease"), 0) * 1.0 /
              ((CASE
                WHEN COALESCE(SUM(vms."noOfPersonsNBSE"), 0) = 0 THEN NULL
                ELSE SUM(vms."noOfPersonsNBSE")
              END)) * 100.00) ::DECIMAL(10, 2)), 0) AS "disPercent"
            From 
            public."mfPositiveLineLists" mf
            LEFT JOIN public."vMFPositiveLineListSurveysById" vms
            ON vms.id = mf.id
            LEFT JOIN (SELECT
              COUNT(id) "noOfPersonsDisease",
              "year"
            FROM public."lymphedemaLineLists"
            WHERE "isActive" = TRUE
            GROUP BY year) dis
            on dis.year = mf.year
          Group by mf.year,mf.month
            ORDER BY mf.year ASC
            ) t1
            group by financialyear  
          ) q1
          left outer join
          (
            select financialyear,sum(total) as hydrocelectomyOperations from
      (select year,concat(year-1,'-',year)as financialyear,sum(quater1) as total from (
          select year, jan+feb+mar as quater1 from public."hydrocelectomyOperations" 
      ) a
      group by a.year
      UNION
      select year,concat(year,'-',year+1)as financialyear,sum(quater2) as total from (
          select year, apr+may+jun+jul+aug+sep+oct+nov+dec as quater2 from public."hydrocelectomyOperations" 
      ) b
      group by b.year
      order by year) sub1
      group by  sub1.financialyear
      order by financialyear desc
          ) t using (financialyear)
      order by financialyear`,
        {
          // replacements: { year: year},
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
    getYearwiseMisMtrReportDao,
    getFinancialYearwiseMisMtrReportDao
  };
};
export default YearwiseMisMtrReportDao();