import {
    validationResult
} from "express-validator";
import httpStatus from "http-status";
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
const lHLineListDao = () => {



    const get_AdditionalMFSurveyReportDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  M."districtId" = ${req.body.districtId}`
            var year = `and Year =  ${req.body.year}`
            // var month = `and  L."month" = ${req.body.month}`

            if (req.body.districtId.length == 0) {
                districtId = ""
            }
            if (req.body.year.length == 0) {
                year = ""
            }
            // if (req.body.month.length == 0) {
            //     month = ""
            // }

            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select M.Id,M."talukaId",M.town,M."facilityId",M.area,M."subCenterId",M."villageId",
            M."totalPopulationVillage",T."talukaName",F."facilityName",Sb."subCenterName",
            V."villageName",
            MS1."dateOfAction" as "DateOfSurvey", MS2."NoOfBSCollected",MS3."NoOfBSExamined",M."noOfBSFoundPositive",
            ((M."noOfBSFoundPositive"/(CASE MS3."NoOfBSExamined" WHEN 0 Then NULL ELSE MS3."NoOfBSExamined" END)) * 100) as "MFRate"
           from public."mfPositiveLineLists" M

           left join public.talukas T on T.id = M."talukaId"
           left join public.villages V on V.id = M."villageId"
           left join public."subCenters" Sb on Sb.id = M."subCenterId"
           left join public.facilities F on F.id = M."facilityId"
           LEFT JOIN LATERAL (select  MS."dateOfAction" , MS."mfPositiveLineListId" from public."mfPositiveLineListSurveys" MS 
           where  MS."detailsOfSurveyId"=(select id from public."udCategoryOptions" where "categoryCode"=1013 and "categoryOptionCode"='NPS')) 
           MS1 ON true 
           LEFT JOIN LATERAL (select  MS."dateOfAction" , MS."mfPositiveLineListId",
               "noOfPersonsMale0to4"+"noOfPersonsMale5to14"+"noOfPersonsMale15to39"+"noOfPersonsMale40Plus"+
               "noOfPersonsFemale0to4"+"noOfPersonsFemale5to14"+"noOfPersonsFemale15to39"+"noOfPersonsFemale40Plus"+
               "noOfPersonsTG0to4"+"noOfPersonsTG5to14"+"noOfPersonsTG15to39"+"noOfPersonsTG40Plus"
               as "NoOfBSCollected" from public."mfPositiveLineListSurveys" MS 
           where  MS."detailsOfSurveyId"=(select id from public."udCategoryOptions" where "categoryCode"=1013 and "categoryOptionCode"='NPC')) 
           MS2 ON true 
           LEFT JOIN LATERAL (select  MS."dateOfAction" , MS."mfPositiveLineListId",
               "noOfPersonsMale0to4"+"noOfPersonsMale5to14"+"noOfPersonsMale15to39"+"noOfPersonsMale40Plus"+
               "noOfPersonsFemale0to4"+"noOfPersonsFemale5to14"+"noOfPersonsFemale15to39"+"noOfPersonsFemale40Plus"+
               "noOfPersonsTG0to4"+"noOfPersonsTG5to14"+"noOfPersonsTG15to39"+"noOfPersonsTG40Plus"
               as "NoOfBSExamined" from public."mfPositiveLineListSurveys" MS 
           where  MS."detailsOfSurveyId"=(select id from public."udCategoryOptions" where "categoryCode"=1013 and "categoryOptionCode"='NBSE') ) 
           MS3 ON true 
           where MS1."mfPositiveLineListId"=M.Id and MS2."mfPositiveLineListId"=M.Id and MS3."mfPositiveLineListId"=M.Id           
           ${districtId} ${year} 
	`).then(([results, metadata]) => {

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


    const get_MFBaseLineSurveyListDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  M."districtId" = ${req.body.districtId}`
            var year = `and Year =  ${req.body.year}`
            // var month = `and  L."month" = ${req.body.month}`

            if (req.body.districtId.length == 0) {
                districtId = ""
            }
            if (req.body.year.length == 0) {
                year = ""
            }
            // if (req.body.month.length == 0) {
            //     month = ""
            // }

            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            
            select M."facilityId",M."subCenterId",M."villageId",'' as "site",
            F."facilityName",Sb."subCenterName", V."villageName",
            VMS."dateNPS" as "DateOfSurvey", SUM(VMS."noOfPersonsNPC") "NoOfBSCollected",
			SUM(VMS."noOfPersonsNBSE") "NoOfBSExamined",SUM(M."noOfBSFoundPositive") "noOfBSFoundPositive",
            ((SUM(M."noOfBSFoundPositive")/(CASE SUM(VMS."noOfPersonsNBSE")
				WHEN 0 Then NULL ELSE SUM(VMS."noOfPersonsNBSE") END)) * 100) as "MFRate"
           from public."mfPositiveLineLists" M
           left join public.villages V on V.id = M."villageId"
           left join public."subCenters" Sb on Sb.id = M."subCenterId"
           left join public.facilities F on F.id = M."facilityId"
           LEFT JOIN public."vMFPositiveLineListSurveysById" VMS
		   ON VMS.id= M.id
		   where 1=1                    
           ${districtId} ${year} 
           group by M."facilityId",M."subCenterId",M."villageId",
		   F."facilityName",Sb."subCenterName",V."villageName",
		   M."year",M."month",VMS."dateNPS"
	`).then(([results, metadata]) => {

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



    const DiseaseRate_VillagewiseDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  M."districtId" = ${req.body.districtId}`
            var year = `and M.Year =  ${req.body.year}`
            var month = `and  M.month = ${req.body.month}`
            var villageId = `and  M."villageId" = ${req.body.villageId}`


            if (req.body.districtId.length == 0) {
                districtId = ""
            }
            if (req.body.year.length == 0) {
                year = ""
            }
            if (req.body.month.length == 0) {
                month = ""
            }
            if (req.body.villageId.length == 0) {
                villageId = ""
            }

            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            
            select M."villageId",V."villageName",M."year",M."month", M."districtId",D."districtName",
            M."nameOfUnit" AS "nameOfUnitId",VC."nameOfControlUnit" AS "nameOfUnit",
            M."nameOfFilariaFieldUnit" AS "fieldUnitId",VF."fieldUnitName",
            M."facilityId",F."facilityName",
            sum(MS1."noOfPersons") AS "noOfPersonsExam",	sum(MS2."noOfPersons") AS "noOfPersonsMF",
            sum((MS2."noOfPersons"/(CASE MS1."noOfPersons"
            WHEN 0 Then NULL ELSE MS1."noOfPersons" END))*100) AS "MFRate",
            sum(MS3."noOfPersons") AS "noOfPersonsDes",
            sum((MS3."noOfPersons"/(CASE MS1."noOfPersons"
            WHEN 0 Then NULL ELSE MS1."noOfPersons" END))*100) AS "DesRate"
        from public."mfPositiveLineLists" M
        LEFT JOIN (select * from public."vMFPositiveLineListSurveys" V1 where  V1."categoryOptionCode"='NBSE') 
        MS1 ON MS1."mfPositiveLineListId"=M.id 
        LEFT JOIN (select * from public."vMFPositiveLineListSurveys" V1 where  V1."categoryOptionCode"='NPMF') 
        MS2 ON MS2."mfPositiveLineListId"=M.id 
        LEFT JOIN public."vDiseasePositive" MS3 ON MS3."mfPositiveLineListId"=M.id 
        LEFT JOIN public.districts D on D.id = M."districtId"
        LEFT JOIN public."verticalControlUnits" VC ON VC.id=M."nameOfUnit"
        LEFT JOIN public."verticalControlFieldUnits" VF ON VF.id=M."nameOfFilariaFieldUnit"
        left join public.facilities F on F.id = M."facilityId"
        left join public.villages V on V.id = M."villageId"
                       where 1 = 1
           ${districtId} ${year} ${month} ${villageId}
           group by M."villageId",V."villageName",M."year",M."month", M."districtId",D."districtName",
    M."nameOfUnit",VC."nameOfControlUnit",M."nameOfFilariaFieldUnit",VF."fieldUnitName",
	M."facilityId",F."facilityName"

	`).then(([results, metadata]) => {

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

        get_AdditionalMFSurveyReportDao,
        get_MFBaseLineSurveyListDao,
        DiseaseRate_VillagewiseDao
    };
};
export default lHLineListDao();