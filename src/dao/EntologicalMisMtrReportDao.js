import db from "../../config/sequelize";
import Sequelize from "sequelize";
import utils from "../services/utils.service";

const Op = db.Sequelize.Op;
var sqDB = db.Sequelize.sqDb
const EntologicalMisMtrReportDao = () => {


  const getEntologicalMisMtrReportDao = async (req) => {
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
      db.sequelize.query(`select
      A."nameOfUnit",
      coalesce(A."totalTime",0) totalTime,
      coalesce(A."cQuinMale",0) cQuinMale,
      coalesce(A."cQuinFemale",0) cQuinFemale,
      coalesce(A."cQuinTot",0) cQuinTot,
      coalesce(A."noOfMosquitoDissected",0) noOfMosquitoDissected,
      coalesce(A."noOfPositiveI_II_IIIStage",0) noOfPositiveI_II_IIIStage,
      coalesce(A."noOfPositiveIIIStage",0) noOfPositiveIIIStage,
      coalesce((coalesce(A."cQuinTot",0)*10.0/
      (case 
       when A."totalTime"=null then null
       when A."totalTime"=0 then null
      else A."totalTime" end))::DECIMAL(10, 2), 0) "densityPer10Menhrs",
      coalesce((coalesce(A."noOfPositiveI_II_IIIStage",0) * 100.00 /
      (case when A."noOfMosquitoDissected" = null then null
      when
         A."noOfMosquitoDissected" = 0 
      then
         null 
      else A."noOfMosquitoDissected" end ))::DECIMAL(10, 2), 0) AS "InfectionRate",
      coalesce((coalesce(A."noOfPositiveIIIStage",0) * 100.00 /
      (case when A."noOfMosquitoDissected" = null then null
      when
         A."noOfMosquitoDissected" = 0 
      then
         null 
      else A."noOfMosquitoDissected" end ))::DECIMAL(10, 2),0) AS "InfectivityRate"
      from
      (select VC."nameOfControlUnit" "nameOfUnit",
      sum(EL."totalTimeSpentHrs"+ coalesce(EL."totalTimeSpentMinutes",0)/60.0)::DECIMAL(10, 2) AS "totalTime",
      Sum(ELC."noOfMosquitoCollectedMale") "cQuinMale",
      Sum(ELC."noOfMosquitoCollectedFemale") "cQuinFemale",
      Sum(ELC."noOfMosquitoCollectedTotal") "cQuinTot",
      Sum("mosqDissectedCulexQui") "noOfMosquitoDissected",
      Sum("totalNoPositiveMosq1to3Stage") "noOfPositiveI_II_IIIStage",
      Sum("totalNoPositiveMosq3Stage") "noOfPositiveIIIStage"
      from (select * from public."verticalControlUnits" where "unitType" in('FCU','FSU'))VC -- Filter
      -- left join (select * from public."entomologicalLarvicidalLists" where year=2022 and month=1 )EL --filter
      left join (select * from public."entomologicalLarvicidalLists" 
      where (date(concat("year"::varchar,'-',"month"::varchar,'-01')) BETWEEN '${startDate}' AND '${endDate}') )EL --filter
      ON VC."id"=EL."nameOfUnit"
      left join public."entomologicalDataCounts" ELC
      ON ELC."entomologicalLarvicidalListId"=EL."id"
      left join public."udCategoryOptions" UC
      ON UC."id"=ELC."mosquitoTypeId" and UC."categoryOptionCode" = 'CLX'
      group by VC."nameOfControlUnit") A
      ORDER BY A."nameOfUnit" DESC`,
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
    getEntologicalMisMtrReportDao
  };
};
export default EntologicalMisMtrReportDao();