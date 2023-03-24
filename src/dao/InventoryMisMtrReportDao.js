import db from "../../config/sequelize";
import Sequelize from "sequelize";
import utils from "../services/utils.service";

const Op = db.Sequelize.Op;
var sqDB = db.Sequelize.sqDb
const InventoryMisMtrReportDao = () => {


  const getInventoryMisMtrReportDao = async (req) => {
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
      db.sequelize.query(`select VC."nameOfControlUnit" "unitName",VC."itemName" "nameOfLarvicideDEC",
      coalesce(sum("openingBalanceQty"),0) AS "openingBalance",
      coalesce(sum("receivedDuringMonthQty"),0) AS "receipt",
      coalesce(sum("totalStock"),0) AS "total",
      coalesce(sum("actualConsumption"),0) AS "consumption",
      coalesce(sum("balanceEndOfMonth"),0) AS "balanceEndOfMonth"
      from (select vc1.*,uc1."categoryOptionName" "itemName", uc1."categoryOptionCode" "itemCode", uc1."id" "itemId" from public."verticalControlUnits" vc1, public."udCategoryOptions" uc1
      where vc1."unitType" in('FCU','FSU') and uc1."categoryCode"=1020 and uc1."categoryOptionCode" in ('T','BTI','DEC')) VC
      left join (select vc1.* from public."verticalUnitStockPositions" vc1
      -- where vc1.year=2022 and vc1.month=1)VSP -- Filter
      where (date(concat(vc1."year"::varchar,'-',vc1."month"::varchar,'-01')) BETWEEN '${startDate}' AND '${endDate}'))VSP -- Filter
      ON VC.id= VSP."unitName" and VSP."items"=VC."itemId"
      left join public."udCategoryOptions" UC
      ON UC.id= VSP."items" and VC."itemCode"=UC."categoryOptionCode"
      group by VC."unitType",VC."nameOfControlUnit",VC."itemName" ,UC."categoryOptionName"
      order by VC."unitType",VC."nameOfControlUnit"`,
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
    getInventoryMisMtrReportDao
  };
};
export default InventoryMisMtrReportDao();