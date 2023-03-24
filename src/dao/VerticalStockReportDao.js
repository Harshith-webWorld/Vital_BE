import label from "../../config/resources";
import db from "../../config/sequelize";

const {
    lymphedemaLineList,
    lymphedemaLineListSurvey,
    lymphedemaLineListFollowUpsLF,
    lymphedemaLineListFollowUpsHF,
    udCategoryOptions,
    verticalControlFieldUnits,
    verticalControlUnits,
    states,
    districts,
    corporations,
    talukas,
    zones,
    facilities,
    subCenters,
    wards,
    villages
} = db;
const Op = db.Sequelize.Op;
var sqDB = db.Sequelize.sqDb
const VerticalStockReportDao = () => {





    const VerticalStockAnalysisDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  VT."districtId" = ${req.body.districtId}`
            var year = `and VT.year =  ${req.body.year}`
            var unitName = `and  VT."unitName" = ${req.body.unitName}`
            var start_month = `and  VT."month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth}`

            if (req.body.startMonth.length == 0) {
                start_month = `and  VT."month" BETWEEN 1 `
            }
            if (req.body.endMonth.length == 0) {
                end_month = `and 12`
            }

            if (req.body.districtId.length == 0) {
                districtId = ""
            }
            if (req.body.year.length == 0) {
                year = ""
            }
            if (req.body.unitName.length == 0) {
                unitName = ""
            }
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select VT."year",VT.month,VT."districtId",D."districtName", 
            VT."unitName" as "nameOfControlUnitId", V."nameOfControlUnit",
            VT.items AS "itemId",UD1."categoryOptionName" AS "itemName",
            VT."openingBalanceQty",VT."receivedDuringMonthQty",
            (case when ("receivedFromWhomOthers" is not null and "receivedFromWhomOthers" <> '')then "receivedFromWhomOthers"
            when VT."receivedFromDistricts" >0 then D."districtName"
            else VT."receivedFromWhom" end) as "receivedFromWhom",
            "totalStock","actualConsumption",
            "issueToOtherQty","issuedToWhom",
            "balanceEndOfMonth","reqNext3MonthsQty"
            from public."verticalUnitStockPositions" VT
            left join public.districts D ON D.id=VT."districtId"
            left join public.districts D1 ON D1.id=VT."receivedFromDistricts"
            left join public."verticalControlUnits" V ON V.id=VT."unitName"
            left join public."udCategoryOptions" UD1 ON UD1.id=VT."items"
                    where VT."isActive"=true
${districtId} ${year}  ${start_month} ${end_month}  ${unitName}
	`).then(([results, metadata]) => {

                    response.error = false
                    response.data = results
                    console.log("results", results)
                }).catch((error) => {
                    console.log(error)
                    response.error = true
                })
                .finally(() => {
                    resolve(response)
                })
        })
    }


    const vspMonthlyVacancyStatusDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  S."districtId" = ${req.body.districtId}`
            var year = `and S.year =  ${req.body.year}`
            var start_month = `and  S."month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth}`

            if (req.body.startMonth.length == 0) {
                start_month = `and  S."month" BETWEEN 1 `
            }
            if (req.body.endMonth.length == 0) {
                end_month = `and 12`
            }

            if (req.body.districtId.length == 0) {
                districtId = ""
            }
            if (req.body.year.length == 0) {
                year = ""
            }
          
         
       
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select year,month, S."districtId",  S."nameOfUnit" AS "nameOfUnitId", 
            D."districtName", VC."nameOfControlUnit" AS "nameOfUnit", S.cadre AS "cadreId", S."cadreOther",
            UD1."categoryOptionName" AS "cadre", S.sanctioned, S.filled, S.vacant
            from public."staffPosVerticalUnits" S
            left join public.districts D on D.id =  S."districtId"
            left join public."verticalControlUnits" VC on VC.id = S."nameOfUnit"
            left join public."udCategoryOptions" UD1 on UD1.id=S."cadre"
                    where S."isActive"=true
${districtId} ${year}  ${start_month} ${end_month}
	`).then(([results, metadata]) => {

                    response.error = false
                    response.data = results
                    console.log("results", results)
                }).catch((error) => {
                    console.log(error)
                    response.error = true
                })
                .finally(() => {
                    resolve(response)
                })
        })
    }

 
    const vspTrainingStatusDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  S."districtId" = ${req.body.districtId}`
            var year = `and S.year =  ${req.body.year}`

            var start_month = `and  S."month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth}`

            if (req.body.startMonth.length == 0) {
                start_month = `and  S."month" BETWEEN 1 `
            }
            if (req.body.endMonth.length == 0) {
                end_month = `and 12`
            }
            if (req.body.districtId.length == 0) {
                districtId = ""
            }
            if (req.body.year.length == 0) {
                year = ""
            }
         
       
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select year,month, S."districtId",  S."nameOfUnit" AS "nameOfUnitId",
            D."districtName", VC."nameOfControlUnit" AS "nameOfUnit",
            SS."designationId", SS."designationOther",DG."designationName" AS "designation",
            ST."typeOfTraining",ST."placeOfTraining",ST."dateOfTraining",ST."isTrained"
            from public."staffPosVerticalUnits" S
            left join public."staffPosVerticalUnitStaffs" SS ON SS."staffPosVerticalUnitId"=S.id
            left join public."staffPosVerticalUnitTrainingStatuses" ST
            ON ST."staffPosVerticalUnitId"=S.id AND ST."staffPosVerticalUnitStaffId"=SS.id
            left join public.districts D on D.id =  S."districtId"
            left join public."verticalControlUnits" VC on VC.id = S."nameOfUnit"
            left join public.designations DG on DG.id=SS."designationId"
            where S."isActive"=true
            ${districtId} ${year} ${start_month} ${end_month}  
	        `).then(([results, metadata]) => {

                    response.error = false
                    response.data = results
                    console.log("results", results)
                }).catch((error) => {
                    console.log(error)
                    response.error = true
                })
                .finally(() => {
                    resolve(response)
                })
        })
    }




    const vspAvailabilityConsumptionLabmaterialsDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  S."districtId" = ${req.body.districtId}`
            var year = `and S.year =  ${req.body.year}`

            var start_month = `and  S."month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth}`

            if (req.body.startMonth.length == 0) {
                start_month = `and  S."month" BETWEEN 1 `
            }
            if (req.body.endMonth.length == 0) {
                end_month = `and 12`
            }
            if (req.body.districtId.length == 0) {
                districtId = ""
            }
            if (req.body.year.length == 0) {
                year = ""
            }
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
			select S.year,S.month, S."districtId",S."unitName" AS "unitNameId",
            D."districtName", VC."nameOfControlUnit" AS "unitName",
            N."districtName" AS "receivedFromDistrictName",
            S.items,UD."categoryOptionName" "itemName", S."openingBalanceQty",S."receivedDuringMonthQty",S."receivedFromWhom",
            S."receivedFromDistricts",S."receivedFromWhomOthers",S."totalStock",S."actualConsumption",
            S."issueToOtherQty",S."issuedToWhom",S."balanceEndOfMonth",S."reqNext3MonthsQty"
            from public."verticalUnitStockPositions" S
            left join public.districts D on D.id =  S."districtId"
            left join public.districts N on N.id =  S."receivedFromDistricts"
            left join public."verticalControlUnits" VC on VC.id = S."unitName"
			left join public."udCategoryOptions" UD ON UD.id=S.items
            where S."isActive"=true
            ${districtId} ${year} ${start_month} ${end_month} 
	        `).then(([results, metadata]) => {

                    response.error = false
                    response.data = results
                    console.log("results", results)
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

        VerticalStockAnalysisDao,
        vspMonthlyVacancyStatusDao,
        vspTrainingStatusDao,
        vspAvailabilityConsumptionLabmaterialsDao
        

    };
};
export default VerticalStockReportDao();