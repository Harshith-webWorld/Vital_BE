import db from "../../config/sequelize";
import Sequelize from "sequelize";
import utils from "../services/utils.service";

const Op = db.Sequelize.Op;
var sqDB = db.Sequelize.sqDb
const RCOMisMtrReportDao = () => {


  const getRCOMisMtrReportDao = async (req) => {
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
      *,
      (SELECT
        SUM("noOpt")
      FROM (SELECT
        year,
        1 AS month,
        concat(year, '-1-01') AS fulldate,
        SUM(jan) AS "noOpt"
      FROM public."hydrocelectomyOperations"
      GROUP BY year
      UNION
      SELECT
        year,
        2 AS month,
        concat(year, '-2-01') AS fulldate,
        SUM(feb) AS "noOpt"
      FROM public."hydrocelectomyOperations"
      GROUP BY year
      UNION
      SELECT
        year,
        3 AS month,
        concat(year, '-3-01') AS fulldate,
        SUM(mar) AS "noOpt"
      FROM public."hydrocelectomyOperations"
      GROUP BY year
      UNION
      SELECT
        year,
        4 AS month,
        concat(year, '-4-01') AS fulldate,
        SUM(apr) AS "noOpt"
      FROM public."hydrocelectomyOperations"
      GROUP BY year
      UNION
      SELECT
        year,
        5 AS month,
        concat(year, '-5-01') AS fulldate,
        SUM(may) AS "noOpt"
      FROM public."hydrocelectomyOperations"
      GROUP BY year
      UNION
      SELECT
        year,
        6 AS month,
        concat(year, '-6-01') AS fulldate,
        SUM(jun) AS "noOpt"
      FROM public."hydrocelectomyOperations"
      GROUP BY year
      UNION
      SELECT
        year,
        7 AS month,
        concat(year, '-7-01') AS fulldate,
        SUM(jul) AS "noOpt"
      FROM public."hydrocelectomyOperations"
      GROUP BY year
      UNION
      SELECT
        year,
        8 AS month,
        concat(year, '-8-01') AS fulldate,
        SUM(aug) AS "noOpt"
      FROM public."hydrocelectomyOperations"
      GROUP BY year
      UNION
      SELECT
        year,
        9 AS month,
        concat(year, '-9-01') AS fulldate,
        SUM(sep) AS "noOpt"
      FROM public."hydrocelectomyOperations"
      GROUP BY year
      UNION
      SELECT
        year,
        10 AS month,
        concat(year, '-10-01') AS fulldate,
        SUM(oct) AS "noOpt"
      FROM public."hydrocelectomyOperations"
      GROUP BY year
      UNION
      SELECT
        year,
        11 AS month,
        concat(year, '-11-01') AS fulldate,
        SUM(nov) AS "noOpt"
      FROM public."hydrocelectomyOperations"
      GROUP BY year
      UNION
      SELECT
        year,
        12 AS month,
        concat(year, '-12-01') AS fulldate,
        SUM(dec) AS "noOpt"
      FROM public."hydrocelectomyOperations"
      GROUP BY year
      ORDER BY year, month) a
      WHERE a.fulldate BETWEEN '${startDate}' AND '${endDate}')
      AS hydeocel
    FROM (SELECT
      "unitType",
      COUNT("unitType") "noUnits",
      COALESCE(SUM("noOfPersonSurveyed"), 0) "noOfPersonSurveyed",
      COALESCE(SUM("target"), 0) "target",
      ((((COALESCE(SUM("noOfPersonSurveyed"), 0) * 1.0) /
      ((CASE
        WHEN COALESCE(SUM("target"), 0) = 0 THEN NULL
        ELSE SUM("target")
      END))) * 100.00) ::DECIMAL(10, 2)) AS "percentAchieved",
      COALESCE(SUM("noOfBSExamined"), 0) "noOfBSExamined",
      ((((COALESCE(SUM("noOfBSExamined"), 0) * 1.0) /
      ((CASE
        WHEN COALESCE(SUM("noOfPersonSurveyed"), 0) = 0 THEN NULL
        ELSE SUM("noOfPersonSurveyed")
      END))) * 100.00) ::DECIMAL(10, 2)) AS "percentExamined",
      COALESCE(SUM("noOfPersonsMFDetect"), 0) "noOfPersonsMFDetect",
      COALESCE(SUM("noOfPersonsDiseaseDetect"), 0) "noOfPersonsDiseaseDetect",
      COALESCE(SUM("noOfPersonsTotDetect"), 0) "noOfPersonsTotDetect",
      COALESCE(SUM("noOfPersonsTotTreated"), 0) "noOfPersonsTotTreated"
    FROM (SELECT
      'Filaria Night Clinics' AS "unitType",
      fUnit."districtId",
      d."districtName",
      fUnit."nameOfControlUnit",
      fUnit."fieldUnitName",
      COALESCE(SUM(vms."noOfPersonsNPS"), 0) "noOfPersonSurveyed",
      ${monthDiff * 1500} AS "target",
      COALESCE(SUM(vms."noOfPersonsNPMF"), 0) "noOfPersonsMFDetect",
      COALESCE(SUM(dis."noOfPersonsDisease"), 0) "noOfPersonsDiseaseDetect",
      (COALESCE(SUM(vms."noOfPersonsNPMF"), 0) + COALESCE(SUM(dis."noOfPersonsDisease"), 0)) "noOfPersonsTotDetect",
      COALESCE(SUM(distreat."noOfPersonsDiseaseTreated"), 0) "noOfPersonsDiseaseTreated",
      COALESCE(SUM(mfTreat."noOfPersonsMFTreated"), 0) "noOfPersonsMFTreated",
      (COALESCE(SUM(mfTreat."noOfPersonsMFTreated"), 0) + COALESCE(SUM(distreat."noOfPersonsDiseaseTreated"), 0)) "noOfPersonsTotTreated",
      (((COALESCE(SUM(vms."noOfPersonsNPS"), 0) / (${monthDiff * 1500} * 1.00)) * 100.00) ::DECIMAL(10, 2)) AS "percentAchieved",
      COALESCE(SUM(vms."noOfPersonsNBSE"), 0) "noOfBSExamined",
      COALESCE(((COALESCE(SUM(vms."noOfPersonsNBSE"), 0) * 1.0 /
      ((CASE
        WHEN COALESCE(SUM(vms."noOfPersonsNPS"), 0) = 0 THEN NULL
        ELSE SUM(vms."noOfPersonsNPS")
      END)) * 100.00) ::DECIMAL(10, 2)), 0) AS "percentExamined",
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
    FROM (SELECT
      vcfu.id "fieldUnitId",
      vcfu."fieldUnitName",
      vcfu."fieldUnitType",
      vcfu."districtId",
      vcfu."verticalControlUnitId",
      vcu."nameOfControlUnit"
    FROM public."verticalControlFieldUnits" vcfu
    JOIN public."verticalControlUnits" vcu
      ON vcfu."verticalControlUnitId" = vcu.id
    WHERE vcfu."fieldUnitType" = 'NC') fUnit
    LEFT JOIN public."districts" d
      ON fUnit."districtId" = d.id
    LEFT JOIN public."mfPositiveLineLists" mf
      ON mf."nameOfUnit" = fUnit."verticalControlUnitId"
      AND (DATE(concat(mf."year" ::varchar, '-', mf."month" ::varchar, '-01')) BETWEEN '${startDate}' AND '${endDate}')
    LEFT JOIN public."verticalControlUnits" v
      ON fUnit."verticalControlUnitId" = v.id
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
    GROUP BY fUnit."districtId",
             d."districtName",
             fUnit."nameOfControlUnit",
             fUnit."fieldUnitName") A1
    GROUP BY "unitType"
    UNION
    SELECT
      "unitType",
      COUNT("unitType") "noUnits",
      COALESCE(SUM("noOfPersonSurveyed"), 0) "noOfPersonSurveyed",
      COALESCE(SUM("target"), 0) "target",
      ((((COALESCE(SUM("noOfPersonSurveyed"), 0) * 1.0) /
      ((CASE
        WHEN COALESCE(SUM("target"), 0) = 0 THEN NULL
        ELSE SUM("target")
      END))) * 100.00) ::DECIMAL(10, 2)) AS "percentAchieved",
      COALESCE(SUM("noOfBSExamined"), 0) "noOfBSExamined",
      ((((COALESCE(SUM("noOfBSExamined"), 0) * 1.0) /
      ((CASE
        WHEN COALESCE(SUM("noOfPersonSurveyed"), 0) = 0 THEN NULL
        ELSE SUM("noOfPersonSurveyed")
      END))) * 100.00) ::DECIMAL(10, 2)) AS "percentExamined",
      COALESCE(SUM("noOfPersonsMFDetect"), 0) "noOfPersonsMFDetect",
      COALESCE(SUM("noOfPersonsDiseaseDetect"), 0) "noOfPersonsDiseaseDetect",
      COALESCE(SUM("noOfPersonsTotDetect"), 0) "noOfPersonsTotDetect",
      COALESCE(SUM("noOfPersonsTotTreated"), 0) "noOfPersonsTotTreated"
    FROM (SELECT
      'Filaria Control Unit' AS "unitType",
      v."nameOfControlUnit",
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
    LEFT JOIN (SELECT
      *
    FROM public."mfPositiveLineLists"
    WHERE (DATE(concat("year" ::varchar, '-', "month" ::varchar, '-01')) BETWEEN '${startDate}' AND '${endDate}')) mf
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
    WHERE v."unitType" = 'FCU'
    GROUP BY v."nameOfControlUnit",
             v."unitType",
             v."districtId",
             d."districtName",
             fcuTargets.target) A1
    GROUP BY "unitType"
    UNION
    SELECT
      "unitType",
      COUNT("unitType") "noUnits",
      COALESCE(SUM("noOfPersonSurveyed"), 0) "noOfPersonSurveyed",
      COALESCE(SUM("target"), 0) "target",
      ((((COALESCE(SUM("noOfPersonSurveyed"), 0) * 1.0) /
      ((CASE
        WHEN COALESCE(SUM("target"), 0) = 0 THEN NULL
        ELSE SUM("target")
      END))) * 100.00) ::DECIMAL(10, 2)) AS "percentAchieved",
      COALESCE(SUM("noOfBSExamined"), 0) "noOfBSExamined",
      ((((COALESCE(SUM("noOfBSExamined"), 0) * 1.0) /
      ((CASE
        WHEN COALESCE(SUM("noOfPersonSurveyed"), 0) = 0 THEN NULL
        ELSE SUM("noOfPersonSurveyed")
      END))) * 100.00) ::DECIMAL(10, 2)) AS "percentExamined",
      COALESCE(SUM("noOfPersonsMFDetect"), 0) "noOfPersonsMFDetect",
      COALESCE(SUM("noOfPersonsDiseaseDetect"), 0) "noOfPersonsDiseaseDetect",
      COALESCE(SUM("noOfPersonsTotDetect"), 0) "noOfPersonsTotDetect",
      COALESCE(SUM("noOfPersonsTotTreated"), 0) "noOfPersonsTotTreated"
    FROM (SELECT
      'Filaria Survey Unit' AS "unitType",
      v."nameOfControlUnit",
      COALESCE(SUM(vms."noOfPersonsNPS"), 0) "noOfPersonSurveyed",
      ${monthDiff * 3000} AS "target",
      COALESCE(SUM(vms."noOfPersonsNPMF"), 0) "noOfPersonsMFDetect",
      COALESCE(SUM(dis."noOfPersonsDisease"), 0) "noOfPersonsDiseaseDetect",
      (COALESCE(SUM(vms."noOfPersonsNPMF"), 0) + COALESCE(SUM(dis."noOfPersonsDisease"), 0)) "noOfPersonsTotDetect",
      COALESCE(SUM(distreat."noOfPersonsDiseaseTreated"), 0) "noOfPersonsDiseaseTreated",
      COALESCE(SUM(mfTreat."noOfPersonsMFTreated"), 0) "noOfPersonsMFTreated",
      (COALESCE(SUM(mfTreat."noOfPersonsMFTreated"), 0) + COALESCE(SUM(distreat."noOfPersonsDiseaseTreated"), 0)) "noOfPersonsTotTreated",
      (((COALESCE(SUM(vms."noOfPersonsNPS"), 0) / (${monthDiff * 3000} * 1.00)) * 100.00) ::DECIMAL(10, 2)) AS "percentAchieved",
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
      AND (DATE(concat(mf."year" ::varchar, '-', mf."month" ::varchar, '-01')) BETWEEN '${startDate}' AND '${endDate}')
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
    WHERE v."unitType" = 'FSU'
    GROUP BY v."nameOfControlUnit",
             v."unitType") A1
    GROUP BY "unitType") sub1`,
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
    getRCOMisMtrReportDao
  };
};
export default RCOMisMtrReportDao();