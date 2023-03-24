import db from "../../config/sequelize";
import Sequelize from "sequelize";
import utils from "../services/utils.service";

const Op = db.Sequelize.Op;
var sqDB = db.Sequelize.sqDb
const FCUMisMtrReportDao = () => {


  const getFCUMisMtrReportDao = async (req) => {
    return new Promise(async function (resolve) {
      var response = {}

      let startYear = req.body.startYear
      let endYear = req.body.endYear
      let startMonth = req.body.startMonth
      let endMonth = req.body.endMonth
      // let year = `and mf."year" BETWEEN ${startYear} and ${endYear}`;
      // let month = `and mf."month" BETWEEN ${startMonth} and  ${endMonth}`
      let monthDiff = utils.monthDiff(startYear, endYear, startMonth, endMonth)
      let endMonthLastDate = new Date(endYear, endMonth, 0).getDate()
      let startDate = `${startYear}-${startMonth}-01`
      let endDate = `${endYear}-${endMonth}-${endMonthLastDate}`
      db.sequelize.query(`SELECT
      v."nameOfControlUnit",
      v."unitType",
      v."districtId",
      d."districtName",
      fcuTargets.target AS fcuTarget,
      COALESCE(SUM(vms."noOfPersonsNPS"), 0) "noOfPersonSurveyed",
      ${monthDiff} * COALESCE(fcuTargets.target, 0) AS "target",
      COALESCE(SUM(vms."noOfPersonsNPMF"), 0) "noOfPersonsMFDetect",
      COALESCE(SUM(dis."noOfPersonsDisease"), 0) "noOfPersonsDiseaseDetect",
      (COALESCE(SUM(vms."noOfPersonsNPMF"), 0) + COALESCE(SUM(dis."noOfPersonsDisease"), 0)) "noOfPersonsTotDetect",
      COALESCE(SUM(distreat."noOfPersonsDiseaseTreated"), 0) "noOfPersonsDiseaseTreated",
      COALESCE(SUM(mfTreat."noOfPersonsMFTreated"), 0) "noOfPersonsMFTreated",
      (COALESCE(SUM(mfTreat."noOfPersonsMFTreated"), 0) + COALESCE(SUM(distreat."noOfPersonsDiseaseTreated"), 0)) "noOfPersonsTotTreated",
      (((COALESCE(SUM(vms."noOfPersonsNPS"), 0) / (${monthDiff} * COALESCE(fcuTargets.target, 1) * 1.00)) * 100.00) ::DECIMAL(10, 2)) AS "percentAchieved",
      COALESCE(SUM(vms."noOfPersonsNBSE"), 0) "noOfBSExamined",
      COALESCE(((COALESCE(SUM(vms."noOfPersonsNBSE"), 0) * 1.0 /
      ((CASE
        WHEN COALESCE(SUM(vms."noOfPersonsNPS"), 0) = 0 THEN NULL
        ELSE SUM(vms."noOfPersonsNPS")
      END)) * 100.00) ::DECIMAL(10, 2)), 0.00) AS "percentExamined",
      COALESCE(((COALESCE(SUM(vms."noOfPersonsNPMF"), 0) * 1.0 /
      ((CASE
        WHEN COALESCE(SUM(vms."noOfPersonsNBSE"), 0) = 0 THEN NULL
        ELSE SUM(vms."noOfPersonsNBSE")
      END)) * 100.00) ::DECIMAL(10, 2)), 0.00) AS "mfPercent",
      COALESCE(((COALESCE(SUM(dis."noOfPersonsDisease"), 0) * 1.0 /
      ((CASE
        WHEN COALESCE(SUM(vms."noOfPersonsNBSE"), 0) = 0 THEN NULL
        ELSE SUM(vms."noOfPersonsNBSE")
      END)) * 100.00) ::DECIMAL(10, 2)), 0.00) AS "disPercent"
    FROM public."verticalControlUnits" v
    LEFT JOIN public."districts" d
      ON v."districtId" = d.id
    LEFT JOIN public."mfPositiveLineLists" mf
      ON mf."nameOfUnit" = v.id
    LEFT JOIN public."vFCUTargets" fcuTargets
      ON v.id = fcuTargets.id
    LEFT JOIN public."vMFPositiveLineListSurveysById" vms
      ON vms.id = mf.id
    LEFT JOIN (SELECT
      COUNT(id) "noOfPersonsDisease",
      "nameOfUnit",
      "districtId"
    FROM public."lymphedemaLineLists"
    WHERE "isActive" = TRUE
    GROUP BY "nameOfUnit",
             "districtId") dis
      ON dis."districtId" = d.id
      AND dis."nameOfUnit" = v.id
    LEFT JOIN (SELECT
      COUNT(l1.id) "noOfPersonsDiseaseTreated",
      "nameOfUnit",
      "districtId"
    FROM public."lymphedemaLineLists" l1
    JOIN public."lymphedemaLineListSurveys" l2
      ON l1.id = l2."lymphedemaLineListId"
    WHERE l1."isActive" = TRUE
    AND l2."isVerified" = TRUE
    AND l2."isActive" = TRUE
    GROUP BY "nameOfUnit",
             "districtId") distreat
      ON distreat."districtId" = d.id
      AND distreat."nameOfUnit" = v.id
    LEFT JOIN (SELECT
      COUNT(m1.id) "noOfPersonsMFTreated",
      "nameOfUnit",
      "districtId"
    FROM public."mfPositiveLineListPatients" m1
    JOIN public."mfPositiveLineLists" m2
      ON m2.id = m1."mfPositiveLineListId"
    WHERE m1."isActive" = TRUE
    AND m1."isTreatmentGive" = TRUE
    AND m2."isActive" = TRUE
    GROUP BY "nameOfUnit",
             "districtId") mfTreat
      ON mfTreat."districtId" = d.id
      AND mfTreat."nameOfUnit" = v.id
    WHERE v."unitType" in ('FCU', 'MC', 'RCTC')
    GROUP BY v."nameOfControlUnit",
             v."unitType",
             v."districtId",
             d."districtName",
             fcuTargets.target`,
              
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

    const getFCUMisMtrReportDao2 = async (req) => {
    return new Promise(async function (resolve) {
      var response = {}

      let startYear = req.body.startYear
      let endYear = req.body.endYear
      let startMonth = req.body.startMonth
      let endMonth = req.body.endMonth
      // let year = `and mf."year" BETWEEN ${startYear} and ${endYear}`;
      // let month = `and mf."month" BETWEEN ${startMonth} and  ${endMonth}`
      let monthDiff = utils.monthDiff(startYear, endYear, startMonth, endMonth)
      let endMonthLastDate = new Date(endYear, endMonth, 0).getDate()
      let startDate = `${startYear}-${startMonth}-01`
      let endDate = `${endYear}-${endMonth}-${endMonthLastDate}`
      db.sequelize.query(`SELECT
        v."nameOfControlUnit",
        mf."districtId",
        d."districtName",
        v.id as vid,
        fcuTargets.target AS fcuTarget,
        COALESCE(SUM(vms."noOfPersonsNPS"), 0) "noOfPersonSurveyed",
        ${monthDiff} * COALESCE(fcuTargets.target, 0) AS "target",
        COALESCE(SUM(NV."noVillages"),0) "noVillages",
        COALESCE(SUM(NT."noTowns"),0) "noTowns",
        COALESCE(SUM(vms."noOfPersonsNPMF"), 0) "noOfPersonsMFDetect",
        COALESCE(SUM(dis."noOfPersonsDisease"), 0) "noOfPersonsDiseaseDetect",
        COALESCE(SUM(vms."noOfPersonsNPLFMF"), 0) "noOfPersonsBothDetect",
        (COALESCE(SUM(vms."noOfPersonsNPMF"), 0) + COALESCE(SUM(dis."noOfPersonsDisease"), 0)) "noOfPersonsTotDetect",
        COALESCE(SUM(distreat."noOfPersonsDiseaseTreated"), 0) "noOfPersonsDiseaseTreated",
        COALESCE(SUM(mfTreat."noOfPersonsMFTreated"), 0) "noOfPersonsMFTreated",
        (COALESCE(SUM(mfTreat."noOfPersonsMFTreated"),0) + COALESCE(SUM(distreat."noOfPersonsDiseaseTreated"), 0)) "noOfPersonsTotTreated",
        (((COALESCE(SUM(vms."noOfPersonsNPS"), 0) / (${monthDiff} * COALESCE(fcuTargets.target, 0) * 1.00)) * 100.00) ::DECIMAL(10, 2)) AS "percentAchieved",
        COALESCE(SUM(vms."noOfPersonsNBSE"), 0) "noOfBSExamined",
        ((COALESCE(SUM(vms."noOfPersonsNBSE"), 0) /
        ((CASE
          WHEN COALESCE(SUM(vms."noOfPersonsNPS"), 0) = 0 THEN NULL
          ELSE COALESCE(SUM(vms."noOfPersonsNPS"), 0)
        END)) * 100.00) ::DECIMAL(10, 2)) AS "percentExamined"
      FROM public."districts" d
      LEFT JOIN public."mfPositiveLineLists" mf
        ON mf."districtId" = d.id
      JOIN public."verticalControlUnits" v
        ON mf."nameOfUnit" = v.id
      LEFT JOIN public."vFCUTargets" fcuTargets on v.id = fcuTargets.id
      LEFT JOIN public."vMFPositiveLineListSurveysById" vms
        ON vms.id = mf.id
      LEFT JOIN (SELECT
        COUNT(DISTINCT "villageId") "noVillages",
        "nameOfUnit",
        "districtId"
      FROM public."mfPositiveLineLists"
      GROUP BY "nameOfUnit",
              "districtId") NV
        ON NV."districtId" = d.id
        AND NV."nameOfUnit" = v.id
      LEFT JOIN (SELECT
        COUNT(DISTINCT "town") "noTowns",
        "nameOfUnit",
        "districtId"
      FROM public."mfPositiveLineLists"
      GROUP BY "nameOfUnit",
              "districtId") NT
        ON NT."districtId" = d.id
        AND NT."nameOfUnit" = v.id
      LEFT JOIN (SELECT
        COUNT(id) "noOfPersonsDisease",
        "nameOfUnit",
        "districtId"
      FROM public."lymphedemaLineLists"
      WHERE "isActive" = TRUE
      GROUP BY "nameOfUnit",
              "districtId") dis
        ON dis."districtId" = d.id
        AND dis."nameOfUnit" = v.id
      LEFT JOIN (SELECT
        COUNT(l1.id) "noOfPersonsDiseaseTreated",
        "nameOfUnit",
        "districtId"
      FROM public."lymphedemaLineLists" l1
      JOIN public."lymphedemaLineListSurveys" l2
        ON l1.id = l2."lymphedemaLineListId"
      WHERE l1."isActive" = TRUE
      AND l2."isVerified" = TRUE
      AND l2."isActive" = TRUE
      GROUP BY "nameOfUnit",
              "districtId") distreat
        ON distreat."districtId" = d.id
        AND distreat."nameOfUnit" = v.id
      LEFT JOIN (SELECT
        COUNT(m1.id) "noOfPersonsMFTreated",
        "nameOfUnit",
        "districtId"
      FROM public."mfPositiveLineListPatients" m1
      JOIN public."mfPositiveLineLists" m2
        ON m2.id = m1."mfPositiveLineListId"
      WHERE m1."isActive" = TRUE
      AND m1."isTreatmentGive" = TRUE
      AND m2."isActive" = TRUE
      GROUP BY "nameOfUnit",
              "districtId") mfTreat
        ON mfTreat."districtId" = d.id
        AND mfTreat."nameOfUnit" = v.id
      WHERE v."unitType" in ('FCU', 'MC', 'RCTC') and 
      (date(concat(mf."year"::varchar,'-',mf."month"::varchar,'-01')) BETWEEN '${startDate}' AND '${endDate}')
      GROUP BY v."nameOfControlUnit",
              mf."districtId",
              d."districtName",
              v.id,
              fcuTargets.target`,
              
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
    getFCUMisMtrReportDao
  };
};
export default FCUMisMtrReportDao();