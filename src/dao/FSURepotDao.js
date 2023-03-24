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
const FSUReportDao = () => {





    const get_FSUAnalysis1Dao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  M."districtId" = ${req.body.districtId}`
            var year = `and Year =  ${req.body.year}`
            var facilityId = `and  M."facilityId" = ${req.body.facilityId}`
            var nameOfUnitId = `and  M."nameOfUnit" = ${req.body.nameOfUnitId}`
            var start_month = `and  M."month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth}`

            if (req.body.startMonth.length == 0) {
                start_month = `and  M."month" BETWEEN 1 `
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
            if (req.body.facilityId.length == 0) {
                facilityId = ""
            }
            if (req.body.nameOfUnitId.length == 0) {
                nameOfUnitId = ""
            }
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select M.Id,M."nameOfUnit" AS "nameOfUnitId", VC."nameOfControlUnit", M."facilityId",F."facilityName",
            M."villageId",V."villageName",M."districtId",D."districtName", M."totalPopulationVillage",M."populationCoveredByUnit", 
            M."totalNoOfHousesInArea",MS2."NoOfBSCollected",MS3."NoOfBSExamined",M."noOfBSFoundPositive", 
             ((M."noOfBSFoundPositive"/ (CASE MS3."NoOfBSExamined" WHEN 0 Then NULL ELSE MS3."NoOfBSExamined" END)) * 100) as "MFRate",
             "NoOfPersonSurveyed" As "DiseasePatients",0 as "VectorInfectionRate"
            from public."mfPositiveLineLists" M
            LEFT JOIN (select  MS."dateOfAction" , MS."mfPositiveLineListId",
                "noOfPersonsMale0to4"+"noOfPersonsMale5to14"+"noOfPersonsMale15to39"+"noOfPersonsMale40Plus"+
                "noOfPersonsFemale0to4"+"noOfPersonsFemale5to14"+"noOfPersonsFemale15to39"+"noOfPersonsFemale40Plus"+
                "noOfPersonsTG0to4"+"noOfPersonsTG5to14"+"noOfPersonsTG15to39"+"noOfPersonsTG40Plus"
                as "NoOfPersonSurveyed" from public."mfPositiveLineListSurveys" MS 
            where  MS."detailsOfSurveyId"=(select id from public."udCategoryOptions" where "categoryCode"=1013 and "categoryOptionCode"='NPS')) 
            MS1 ON MS1."mfPositiveLineListId"=M.id 
            LEFT JOIN (select  MS."dateOfAction" , MS."mfPositiveLineListId",
                "noOfPersonsMale0to4"+"noOfPersonsMale5to14"+"noOfPersonsMale15to39"+"noOfPersonsMale40Plus"+
                "noOfPersonsFemale0to4"+"noOfPersonsFemale5to14"+"noOfPersonsFemale15to39"+"noOfPersonsFemale40Plus"+
                "noOfPersonsTG0to4"+"noOfPersonsTG5to14"+"noOfPersonsTG15to39"+"noOfPersonsTG40Plus"
                as "NoOfBSCollected" from public."mfPositiveLineListSurveys" MS 
            where  MS."detailsOfSurveyId"=(select id from public."udCategoryOptions" where "categoryCode"=1013 and "categoryOptionCode"='NPC')) 
            MS2 ON MS2."mfPositiveLineListId"=M.id 
            LEFT JOIN (select  MS."dateOfAction" , MS."mfPositiveLineListId",
                "noOfPersonsMale0to4"+"noOfPersonsMale5to14"+"noOfPersonsMale15to39"+"noOfPersonsMale40Plus"+
                "noOfPersonsFemale0to4"+"noOfPersonsFemale5to14"+"noOfPersonsFemale15to39"+"noOfPersonsFemale40Plus"+
                "noOfPersonsTG0to4"+"noOfPersonsTG5to14"+"noOfPersonsTG15to39"+"noOfPersonsTG40Plus"
                as "NoOfBSExamined" from public."mfPositiveLineListSurveys" MS 
            where  MS."detailsOfSurveyId"=(select id from public."udCategoryOptions" where "categoryCode"=1013 and "categoryOptionCode"='NBSE') ) 
            MS3 ON MS3."mfPositiveLineListId"=M.id 
            LEFT JOIN public.facilities F on F.id=M."facilityId"
            LEFT JOIN public.villages  V on V.id=M."villageId"
            LEFT JOIN public.districts D on D.id = M."districtId"
            LEFT JOIN public."verticalControlUnits" VC on VC.id = M."nameOfUnit"
            where MS1."mfPositiveLineListId"=M.Id and MS2."mfPositiveLineListId"=M.Id and MS3."mfPositiveLineListId"=M.Id
            and M."isActive"=true
            ${districtId} ${year} ${start_month} ${end_month} ${facilityId} ${nameOfUnitId}
	`).then(([results, metadata]) => {

                response.error = false
                response.data = results
                //console.log("results", results)
            }).catch((error) => {
                console.log(error)
                response.error = true
            })
                .finally(() => {
                    resolve(response)
                })
        })
    }


    const get_FSUAnalysis2ListDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  M."districtId" = ${req.body.districtId}`
            var year = `and Year =  ${req.body.year}`
            var facilityId = `and  M."facilityId" = ${req.body.facilityId}`
            var nameOfUnitId = `and  M."nameOfUnit" = ${req.body.nameOfUnitId}`
            var start_month = `and  M."month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth}`

            if (req.body.startMonth.length == 0) {
                start_month = `and  M."month" BETWEEN 1 `
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
            if (req.body.facilityId.length == 0) {
                facilityId = ""
            }
            if (req.body.nameOfUnitId.length == 0) {
                nameOfUnitId = ""
            }
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select M.Id,M."nameOfUnit" AS "nameOfUnitId", V."nameOfControlUnit",
            M."facilityId",F."facilityName", M."districtId",D."districtName",
            M."totalPopulationVillage",MS1."NoOfPersonSurveyed",
            MS3."PersonsExaminedMale",MS3."PersonsExaminedFemale",MS3."PersonsExaminedTG",
            MS3."PersonsExaminedMale"+MS3."PersonsExaminedFemale"+MS3."PersonsExaminedTG" AS "NoOfBSExamined",
            MS2."NoOfBSCollected",  
            MS4."FoundMFPostveMale",MS4."FoundMFPostveFemale",MS4."FoundMFPostveTG",
            MS4."FoundMFPostveMale"+MS4."FoundMFPostveFemale"+MS4."FoundMFPostveTG" AS "FoundMFPostve",
            (MS5."FoundTotPostveMale"-MS4."FoundMFPostveMale") AS "FoundDesPostveMale",
            (MS5."FoundTotPostveFemale"-MS4."FoundMFPostveFemale") AS "FoundDesPostveFemale",
            (MS5."FoundTotPostveTG"-MS4."FoundMFPostveTG") AS "FoundDesPostveTG",
             (MS5."FoundTotPostveMale"-MS4."FoundMFPostveMale") +
            (MS5."FoundTotPostveFemale"-MS4."FoundMFPostveFemale") +
            (MS5."FoundTotPostveTG"-MS4."FoundMFPostveTG") AS "FoundDesPostve",
            MS5."FoundTotPostveMale",MS5."FoundTotPostveFemale",MS5."FoundTotPostveTG",
            MS5."FoundTotPostveMale"+MS5."FoundTotPostveFemale"+MS5."FoundTotPostveTG" AS "FoundTotPostve",
            
            MS2."NoOfBSCollected",M."noOfBSFoundPositive"
          
          from public."mfPositiveLineLists" M
          LEFT JOIN (select  MS."dateOfAction" , MS."mfPositiveLineListId",
              "noOfPersonsMale0to4"+"noOfPersonsMale5to14"+"noOfPersonsMale15to39"+"noOfPersonsMale40Plus" +
              "noOfPersonsFemale0to4"+"noOfPersonsFemale5to14"+"noOfPersonsFemale15to39"+"noOfPersonsFemale40Plus"+
              "noOfPersonsTG0to4"+"noOfPersonsTG5to14"+"noOfPersonsTG15to39"+"noOfPersonsTG40Plus"
              as "NoOfPersonSurveyed" from public."mfPositiveLineListSurveys" MS 
          where  MS."detailsOfSurveyId"=(select id from public."udCategoryOptions" where "categoryCode"=1013 and "categoryOptionCode"='NPS')) 
          MS1 ON MS1."mfPositiveLineListId"=M.id  
          LEFT JOIN (
              select  MS."dateOfAction" , MS."mfPositiveLineListId",
              "noOfPersonsMale0to4"+"noOfPersonsMale5to14"+"noOfPersonsMale15to39"+"noOfPersonsMale40Plus"+
              "noOfPersonsFemale0to4"+"noOfPersonsFemale5to14"+"noOfPersonsFemale15to39"+"noOfPersonsFemale40Plus"+
              "noOfPersonsTG0to4"+"noOfPersonsTG5to14"+"noOfPersonsTG15to39"+"noOfPersonsTG40Plus"
              as "NoOfBSCollected" from public."mfPositiveLineListSurveys" MS 
          where  MS."detailsOfSurveyId"=(select id from public."udCategoryOptions" where "categoryCode"=1013 and "categoryOptionCode"='NPC')
          ) 
          MS2 ON MS2."mfPositiveLineListId"=M.id 
          LEFT JOIN ( 
              select  MS."dateOfAction" , MS."mfPositiveLineListId",
              "noOfPersonsMale0to4"+"noOfPersonsMale5to14"+"noOfPersonsMale15to39"+"noOfPersonsMale40Plus" As "PersonsExaminedMale",
              "noOfPersonsFemale0to4"+"noOfPersonsFemale5to14"+"noOfPersonsFemale15to39"+"noOfPersonsFemale40Plus" As "PersonsExaminedFemale",
              "noOfPersonsTG0to4"+"noOfPersonsTG5to14"+"noOfPersonsTG15to39"+"noOfPersonsTG40Plus" As "PersonsExaminedTG"
               from public."mfPositiveLineListSurveys" MS 
          where  MS."detailsOfSurveyId"=(select id from public."udCategoryOptions" where "categoryCode"=1013 and "categoryOptionCode"='NBSE') 
          ) 
          MS3 ON MS3."mfPositiveLineListId"=M.id 
          LEFT JOIN (
              select  MS."dateOfAction" , MS."mfPositiveLineListId",
              "noOfPersonsMale0to4"+"noOfPersonsMale5to14"+"noOfPersonsMale15to39"+"noOfPersonsMale40Plus" As "FoundMFPostveMale",
              "noOfPersonsFemale0to4"+"noOfPersonsFemale5to14"+"noOfPersonsFemale15to39"+"noOfPersonsFemale40Plus" As "FoundMFPostveFemale",
              "noOfPersonsTG0to4"+"noOfPersonsTG5to14"+"noOfPersonsTG15to39"+"noOfPersonsTG40Plus" As "FoundMFPostveTG"
               from public."mfPositiveLineListSurveys" MS 
          where  MS."detailsOfSurveyId"=(select id from public."udCategoryOptions" where "categoryCode"=1013 and "categoryOptionCode"='NPMF') 
          ) 
          MS4 ON MS4."mfPositiveLineListId"=M.id 
          LEFT JOIN (
              select  MS."dateOfAction" , MS."mfPositiveLineListId",
              "noOfPersonsMale0to4"+"noOfPersonsMale5to14"+"noOfPersonsMale15to39"+"noOfPersonsMale40Plus" As "FoundTotPostveMale",
              "noOfPersonsFemale0to4"+"noOfPersonsFemale5to14"+"noOfPersonsFemale15to39"+"noOfPersonsFemale40Plus" As "FoundTotPostveFemale",
              "noOfPersonsTG0to4"+"noOfPersonsTG5to14"+"noOfPersonsTG15to39"+"noOfPersonsTG40Plus" As "FoundTotPostveTG"
               from public."mfPositiveLineListSurveys" MS 
          where  MS."detailsOfSurveyId"=(select id from public."udCategoryOptions" where "categoryCode"=1013 and "categoryOptionCode"='NPLFMF') 
          ) 
          MS5 ON MS5."mfPositiveLineListId"=M.id 
          LEFT JOIN public.facilities F on F.id= M."facilityId"
          LEFT JOIN public.districts D on D.id = M."districtId"
          LEFT JOIN public."verticalControlUnits" V on V.id = M."nameOfUnit"
          where MS1."mfPositiveLineListId"=M.Id and MS2."mfPositiveLineListId"=M.Id and MS3."mfPositiveLineListId"=M.Id 
          and MS4."mfPositiveLineListId"=M.Id
          and M."isActive"=true
${districtId} ${year}  ${start_month} ${end_month}
${facilityId} ${nameOfUnitId}
	`).then(([results, metadata]) => {

                response.error = false
                response.data = results
                //console.log("results", results)
            }).catch((error) => {
                console.log(error)
                response.error = true
            })
                .finally(() => {
                    resolve(response)
                })
        })
    }


    const get_FSUAnalysis3ListDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}
            var districtId = `and  M."districtId" = ${req.body.districtId}`
            var nameOfUnitId = `and  M."nameOfUnit" = ${req.body.nameOfUnitId}`
            var from_date = `${req.body.from_date}`
            var to_date = `${req.body.to_date}`
            var year = `and  A."year" = ${req.body.year}`
            if (req.body.districtId.length == 0) {
                districtId = ""
            }
            if (req.body.nameOfUnitId.length == 0) {
                nameOfUnitId = ""
            }
            var start_month = `A."month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth}`

            if (req.body.year.length == 0) {
                year = ''
            }
            if (req.body.startMonth.length == 0) {
                start_month = `A."month" BETWEEN 1 `
            }
            if (req.body.endMonth.length == 0) {
                end_month = `and 12`
            }

            db.sequelize.query(`
 Select A."nameOfUnitId", A."nameOfControlUnit",
 A."districtId",A."districtName",
 A."villageId",A."villageName",A.year,A.month,
 sum(A."totalPopulationVillage") AS "totalPopulationVillage",
 sum(A."NoOfPersonSurveyed") AS "NoOfPersonSurveyed",
 sum(A."targetForCollectionOfNBS") AS "targetForCollectionOfNBS",
 sum(A."NoOfBSCollected") AS "NoOfBSCollected",
 sum(A."AchivedOfBSCollection") AS "AchivedOfBSCollection",
 sum(A."NoOfBSExamined") AS "NoOfBSExamined",
 sum(A."NoOfMFPostve") AS "NoOfMFPostve",
 sum(A."FoundDesPostve") AS "FoundDesPostve",
 sum(A."FoundTotPostve") AS "FoundTotPostve",
 sum(A."TotCasesTreatment") AS "TotCasesTreatment"
From (
  Select M.Id,M.year,M.month,M."nameOfUnit" AS "nameOfUnitId", VC."nameOfControlUnit",
  M."districtId",D."districtName",M."villageId",V."villageName",
  M."totalPopulationVillage",MS1."NoOfPersonSurveyed",
  M."targetForCollectionOfNBS",MS2."NoOfBSCollected", 
  ((M."targetForCollectionOfNBS"/(CASE MS2."NoOfBSCollected" 
	WHEN 0 Then 1 ELSE MS2."NoOfBSCollected" END))*100) AS "AchivedOfBSCollection",  
  MS3."PersonsExaminedMale"+MS3."PersonsExaminedFemale"+MS3."PersonsExaminedTG" AS "NoOfBSExamined",
  MS4."FoundMFPostveMale"+MS4."FoundMFPostveFemale"+MS4."FoundMFPostveTG" AS "NoOfMFPostve",
  (MS5."FoundTotPostveMale"-MS4."FoundMFPostveMale") +
  (MS5."FoundTotPostveFemale"-MS4."FoundMFPostveFemale") +
  (MS5."FoundTotPostveTG"-MS4."FoundMFPostveTG") AS "FoundDesPostve",
   MS5."FoundTotPostveMale"+MS5."FoundTotPostveFemale"+MS5."FoundTotPostveTG" AS "FoundTotPostve",
   MS6."MFCasesTreatment", 0 AS "DecCasesTreatment", MS6."MFCasesTreatment" AS "TotCasesTreatment"
from public."mfPositiveLineLists" M
LEFT JOIN (select  MS."dateOfAction" , MS."mfPositiveLineListId",
    "noOfPersonsMale0to4"+"noOfPersonsMale5to14"+"noOfPersonsMale15to39"+"noOfPersonsMale40Plus" +
	"noOfPersonsFemale0to4"+"noOfPersonsFemale5to14"+"noOfPersonsFemale15to39"+"noOfPersonsFemale40Plus"+
	"noOfPersonsTG0to4"+"noOfPersonsTG5to14"+"noOfPersonsTG15to39"+"noOfPersonsTG40Plus"
	as "NoOfPersonSurveyed" from public."mfPositiveLineListSurveys" MS 
where  MS."detailsOfSurveyId"=(select id from public."udCategoryOptions" where "categoryCode"=1013 and "categoryOptionCode"='NPS')) 
MS1 ON MS1."mfPositiveLineListId"=M.id  
LEFT JOIN (
	select  MS."dateOfAction" , MS."mfPositiveLineListId",
	"noOfPersonsMale0to4"+"noOfPersonsMale5to14"+"noOfPersonsMale15to39"+"noOfPersonsMale40Plus"+
	"noOfPersonsFemale0to4"+"noOfPersonsFemale5to14"+"noOfPersonsFemale15to39"+"noOfPersonsFemale40Plus"+
	"noOfPersonsTG0to4"+"noOfPersonsTG5to14"+"noOfPersonsTG15to39"+"noOfPersonsTG40Plus"
	as "NoOfBSCollected" from public."mfPositiveLineListSurveys" MS 
where  MS."detailsOfSurveyId"=(select id from public."udCategoryOptions" where "categoryCode"=1013 and "categoryOptionCode"='NPC')
) 
MS2 ON MS2."mfPositiveLineListId"=M.id 
LEFT JOIN(
	select  MS."dateOfAction" , MS."mfPositiveLineListId",
	"noOfPersonsMale0to4"+"noOfPersonsMale5to14"+"noOfPersonsMale15to39"+"noOfPersonsMale40Plus" As "PersonsExaminedMale",
	"noOfPersonsFemale0to4"+"noOfPersonsFemale5to14"+"noOfPersonsFemale15to39"+"noOfPersonsFemale40Plus" As "PersonsExaminedFemale",
	"noOfPersonsTG0to4"+"noOfPersonsTG5to14"+"noOfPersonsTG15to39"+"noOfPersonsTG40Plus" As "PersonsExaminedTG"
	 from public."mfPositiveLineListSurveys" MS 
where  MS."detailsOfSurveyId"=(select id from public."udCategoryOptions" where "categoryCode"=1013 and "categoryOptionCode"='NBSE') 
) 
MS3 ON MS3."mfPositiveLineListId"=M.id 
LEFT JOIN (
	select  MS."dateOfAction" , MS."mfPositiveLineListId",
	"noOfPersonsMale0to4"+"noOfPersonsMale5to14"+"noOfPersonsMale15to39"+"noOfPersonsMale40Plus" As "FoundMFPostveMale",
	"noOfPersonsFemale0to4"+"noOfPersonsFemale5to14"+"noOfPersonsFemale15to39"+"noOfPersonsFemale40Plus" As "FoundMFPostveFemale",
	"noOfPersonsTG0to4"+"noOfPersonsTG5to14"+"noOfPersonsTG15to39"+"noOfPersonsTG40Plus" As "FoundMFPostveTG"
	 from public."mfPositiveLineListSurveys" MS 
where  MS."detailsOfSurveyId"=(select id from public."udCategoryOptions" where "categoryCode"=1013 and "categoryOptionCode"='NPMF') 
) 
MS4 ON MS4."mfPositiveLineListId"=M.id 
LEFT JOIN (
	select  MS."dateOfAction" , MS."mfPositiveLineListId",
	"noOfPersonsMale0to4"+"noOfPersonsMale5to14"+"noOfPersonsMale15to39"+"noOfPersonsMale40Plus" As "FoundTotPostveMale",
	"noOfPersonsFemale0to4"+"noOfPersonsFemale5to14"+"noOfPersonsFemale15to39"+"noOfPersonsFemale40Plus" As "FoundTotPostveFemale",
	"noOfPersonsTG0to4"+"noOfPersonsTG5to14"+"noOfPersonsTG15to39"+"noOfPersonsTG40Plus" As "FoundTotPostveTG"
	 from public."mfPositiveLineListSurveys" MS 
where  MS."detailsOfSurveyId"=(select id from public."udCategoryOptions" where "categoryCode"=1013 and "categoryOptionCode"='NPLFMF') 
) 
MS5 ON MS5."mfPositiveLineListId"=M.id 
LEFT JOIN (select count(MP.id) AS "MFCasesTreatment",MP."mfPositiveLineListId"  from public."mfPositiveLineListPatients" MP 
		   group by MP."mfPositiveLineListId",MP."isTreatmentGive" having MP."isTreatmentGive"=true)
MS6 ON MS6."mfPositiveLineListId"=M.id 
LEFT JOIN public.districts D on D.id = M."districtId"
LEFT JOIN public.villages  V on V.id=M."villageId"
LEFT JOIN public."verticalControlUnits" VC on VC.id = M."nameOfUnit"
where MS1."mfPositiveLineListId"=M.Id and MS2."mfPositiveLineListId"=M.Id and MS3."mfPositiveLineListId"=M.Id 
and MS4."mfPositiveLineListId"=M.Id ${districtId} ${nameOfUnitId}
) A  where ${start_month} ${end_month} ${year}
group by A."nameOfUnitId",A."nameOfControlUnit",
A."districtId",A."districtName",
 A."villageId",A."villageName",A.year,A.month`)
                .then(([results, metadata]) => {
                    response.error = false
                    response.data = results
                }).catch((error) => {
                    console.log(error, '::::')
                    response.error = true
                })
                .finally(() => {
                    resolve(response)
                })
        })
    }


    const NPSDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  M."districtId" = ${req.body.districtId}`
            var year = `and Year =  ${req.body.year}`
            var nameOfUnitId = `and  M."nameOfUnit" = ${req.body.nameOfUnitId}`

            var start_month = `and  M."month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth}`

            if (req.body.startMonth.length == 0) {
                start_month = `and  M."month" BETWEEN 1 `
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


            if (req.body.nameOfUnitId.length == 0) {
                nameOfUnitId = ""
            }
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select M.Id,M."nameOfUnit" AS "nameOfUnitId",M."districtId",D."districtName", 
            MS1."categoryOptionName" as "Action",V."nameOfControlUnit", MS1.*
     from public."mfPositiveLineLists" M
     LEFT JOIN (select * from public."vMFPositiveLineListSurveys" V1 where  V1."categoryOptionCode"='NPS') 
     MS1 ON MS1."mfPositiveLineListId"=M.id 
     LEFT JOIN public.districts D on D.id = M."districtId"
     LEFT JOIN public."verticalControlUnits" V ON V.id=M."nameOfUnit"
     where  M."isActive"=true
${districtId} ${year}  ${start_month} ${end_month} ${nameOfUnitId}
	`).then(([results, metadata]) => {

                response.error = false
                response.data = results
                //console.log("results", results)
            }).catch((error) => {
                console.log(error)
                response.error = true
            })
                .finally(() => {
                    resolve(response)
                })
        })
    }


    const NBSEDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  M."districtId" = ${req.body.districtId}`
            var year = `and Year =  ${req.body.year}`
            var nameOfUnitId = `and  M."nameOfUnit" = ${req.body.nameOfUnitId}`
            var start_month = `and  M."month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth}`

            if (req.body.startMonth.length == 0) {
                start_month = `and  M."month" BETWEEN 1 `
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

            if (req.body.nameOfUnitId.length == 0) {
                nameOfUnitId = ""
            }
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select M.Id,M."nameOfUnit" AS "nameOfUnitId",M."districtId",D."districtName", 
            MS1."categoryOptionName" as "Action",V."nameOfControlUnit", MS1.*
     from public."mfPositiveLineLists" M
     LEFT JOIN (select * from public."vMFPositiveLineListSurveys" V1 where  V1."categoryOptionCode"='NBSE') 
     MS1 ON MS1."mfPositiveLineListId"=M.id 
     LEFT JOIN public.districts D on D.id = M."districtId"
     LEFT JOIN public."verticalControlUnits" V ON V.id=M."nameOfUnit"
     where M."isActive"=true
     ${districtId} ${year}  ${start_month} ${end_month}  ${nameOfUnitId}
	`).then(([results, metadata]) => {

                response.error = false
                response.data = results
                //console.log("results", results)
            }).catch((error) => {
                console.log(error)
                response.error = true
            })
                .finally(() => {
                    resolve(response)
                })
        })
    }


    const NPMFDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  M."districtId" = ${req.body.districtId}`
            var year = `and Year =  ${req.body.year}`
            var nameOfUnitId = `and  M."nameOfUnit" = ${req.body.nameOfUnitId}`

            var start_month = `and  M."month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth}`

            if (req.body.startMonth.length == 0) {
                start_month = `and  M."month" BETWEEN 1 `
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


            if (req.body.nameOfUnitId.length == 0) {
                nameOfUnitId = ""
            }
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select M.Id,M."nameOfUnit" AS "nameOfUnitId",M."districtId",D."districtName", 
            MS1."categoryOptionName" as "Action",V."nameOfControlUnit", MS1.*
     from public."mfPositiveLineLists" M
     LEFT JOIN (select * from public."vMFPositiveLineListSurveys" V1 where  V1."categoryOptionCode"='NPMF') 
     MS1 ON MS1."mfPositiveLineListId"=M.id 
     LEFT JOIN public.districts D on D.id = M."districtId"
     LEFT JOIN public."verticalControlUnits" V ON V.id=M."nameOfUnit"
     where M."isActive"=true
     ${districtId} ${year}  ${start_month} ${end_month}
${nameOfUnitId}
	`).then(([results, metadata]) => {

                response.error = false
                response.data = results
                //console.log("results", results)
            }).catch((error) => {
                console.log(error)
                response.error = true
            })
                .finally(() => {
                    resolve(response)
                })
        })
    }



    const No_positive_DiseaseDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  M."districtId" = ${req.body.districtId}`
            var year = `and Year =  ${req.body.year}`
            var nameOfUnitId = `and  M."nameOfUnit" = ${req.body.nameOfUnitId}`
            var start_month = `and  M."month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth}`

            if (req.body.startMonth.length == 0) {
                start_month = `and  M."month" BETWEEN 1 `
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


            if (req.body.nameOfUnitId.length == 0) {
                nameOfUnitId = ""
            }
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select M.Id,M."nameOfUnit" AS "nameOfUnitId",M."districtId",D."districtName", 
            'No.of +ve for Disease' as "Action", V."nameOfControlUnit",
         MS1.*
     from public."mfPositiveLineLists" M
     LEFT JOIN public."vDiseasePositive" MS1 ON MS1."mfPositiveLineListId"=M.id 
     LEFT JOIN public.districts D on D.id = M."districtId"
     LEFT JOIN public."verticalControlUnits" V ON V.id=M."nameOfUnit"
     where M."isActive"=true
     ${districtId} ${year} ${start_month} ${end_month}  ${nameOfUnitId}
	`).then(([results, metadata]) => {

                response.error = false
                response.data = results
                //console.log("results", results)
            }).catch((error) => {
                console.log(error)
                response.error = true
            })
                .finally(() => {
                    resolve(response)
                })
        })
    }


    const NPLFMFDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  M."districtId" = ${req.body.districtId}`
            var year = `and Year =  ${req.body.year}`
            var nameOfUnitId = `and  M."nameOfUnit" = ${req.body.nameOfUnitId}`
            var start_month = `and  M."month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth}`

            if (req.body.startMonth.length == 0) {
                start_month = `and  M."month" BETWEEN 1 `
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


            if (req.body.nameOfUnitId.length == 0) {
                nameOfUnitId = ""
            }
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
select M.Id,M."nameOfUnit" AS "nameOfUnitId",M."districtId",D."districtName", 
   	MS1."categoryOptionName" as "Action", V."nameOfControlUnit",MS1.*
from public."mfPositiveLineLists" M
LEFT JOIN (select * from public."vMFPositiveLineListSurveys" V1 where  V1."categoryOptionCode"='NPLFMF') 
MS1 ON MS1."mfPositiveLineListId"=M.id 
LEFT JOIN public.districts D on D.id = M."districtId"
LEFT JOIN public."verticalControlUnits" V ON V.id=M."nameOfUnit"
where M."isActive"=true
${districtId} ${year}   ${start_month} ${end_month} ${nameOfUnitId}
	`).then(([results, metadata]) => {

                response.error = false
                response.data = results
                //console.log("results", results)
            }).catch((error) => {
                console.log(error)
                response.error = true
            })
                .finally(() => {
                    resolve(response)
                })
        })
    }

    const Total_MF_RateDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  M."districtId" = ${req.body.districtId}`
            var year = `and Year =  ${req.body.year}`
            var nameOfUnitId = `and  M."nameOfUnit" = ${req.body.nameOfUnitId}`
            var start_month = `and  M."month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth}`

            if (req.body.startMonth.length == 0) {
                start_month = `and  M."month" BETWEEN 1 `
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

            if (req.body.nameOfUnitId.length == 0) {
                nameOfUnitId = ""
            }
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select M.Id,M."nameOfUnit" AS "nameOfUnitId",M."districtId",D."districtName", 
            'Total MF Rate' as "Action", V."nameOfControlUnit",
         MS1.*
     from public."mfPositiveLineLists" M
     LEFT JOIN public."vMFPositiveLineListSurveysMFRate" MS1 ON MS1."mfPositiveLineListId"=M.id 
     LEFT JOIN public.districts D on D.id = M."districtId"
     LEFT JOIN public."verticalControlUnits" V ON V.id=M."nameOfUnit"
     where M."isActive"=true
     ${districtId} ${year}  ${start_month} ${end_month}  ${nameOfUnitId}
	`).then(([results, metadata]) => {

                response.error = false
                response.data = results
                //console.log("results", results)
            }).catch((error) => {
                console.log(error)
                response.error = true
            })
                .finally(() => {
                    resolve(response)
                })
        })
    }

    const Total_Disease_RateDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  M."districtId" = ${req.body.districtId}`
            var year = `and Year =  ${req.body.year}`
            var nameOfUnitId = `and  M."nameOfUnit" = ${req.body.nameOfUnitId}`
            var start_month = `and  M."month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth}`

            if (req.body.startMonth.length == 0) {
                start_month = `and  M."month" BETWEEN 1 `
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


            if (req.body.nameOfUnitId.length == 0) {
                nameOfUnitId = ""
            }
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select M.Id,M."nameOfUnit" AS "nameOfUnitId",M."districtId",D."districtName", 
            'Total Disease Rate' as "Action", V."nameOfControlUnit",
         MS1.*
     from public."mfPositiveLineLists" M
     LEFT JOIN public."vDiseasePositiveRate" MS1 ON MS1."mfPositiveLineListId"=M.id 
     LEFT JOIN public.districts D on D.id = M."districtId"
     LEFT JOIN public."verticalControlUnits" V ON V.id=M."nameOfUnit"
     where M."isActive"=true
     ${districtId} ${year} ${start_month} ${end_month} ${nameOfUnitId}
	`).then(([results, metadata]) => {

                response.error = false
                response.data = results
                //console.log("results", results)
            }).catch((error) => {
                console.log(error)
                response.error = true
            })
                .finally(() => {
                    resolve(response)
                })
        })
    }


    const get_FSUAnalysis5ListDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  M."districtId" = ${req.body.districtId}`
            var year = `and Year =  ${req.body.year}`
            var facilityId = `and  M."facilityId" = ${req.body.facilityId}`
            var nameOfUnitId = `and  M."nameOfUnit" = ${req.body.nameOfUnitId}`
            var start_month = `and  M."month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth}`

            if (req.body.startMonth.length == 0) {
                start_month = `and  M."month" BETWEEN 1 `
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

            if (req.body.facilityId.length == 0) {
                facilityId = ""
            }
            if (req.body.nameOfUnitId.length == 0) {
                nameOfUnitId = ""
            }
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
           
select M.Id,M."nameOfUnit" AS "nameOfUnitId", VC."nameOfControlUnit", M."facilityId",F."facilityName",
M."villageId",V."villageName",M."districtId",D."districtName",M."talukaId",T."talukaName",M."subCenterId",
S."subCenterName",date_part('Year',M."createdAt") AS "Year", date_part('month',M."createdAt") AS "Month",
MP."patientName",MP."ageYears",MP."ageMonths",U."categoryOptionName" As "gender",MP."patientPhoneNo",
MP."bsNumber",MP."mfCount",M."bsCollectionAntigenTest" AS "typeOfSurveyId",U1."categoryOptionName" AS "typeOfSurvey" 
from public."mfPositiveLineLists" M
LEFT JOIN public."mfPositiveLineListPatients" MP on MP."mfPositiveLineListId"=M.id
LEFT JOIN public.facilities F on F.id=M."facilityId"
LEFT JOIN public.villages  V on V.id=M."villageId"
LEFT JOIN public.districts D on D.id = M."districtId"
LEFT JOIN public.talukas T on T.id = M."talukaId"
LEFT JOIN public."subCenters" S on S.id = M."subCenterId"
LEFT JOIN public."verticalControlUnits" VC on VC.id = M."nameOfUnit"
LEFT JOIN public."udCategoryOptions" U ON M.id=MP.gender
LEFT JOIN public."udCategoryOptions" U1 ON U1.id=M."bsCollectionAntigenTest"
           where M."isActive"=true
      ${districtId} ${year}  ${start_month} ${end_month} ${facilityId} ${nameOfUnitId}
	`).then(([results, metadata]) => {

                response.error = false
                response.data = results
                //console.log("results", results)
            }).catch((error) => {
                console.log(error)
                response.error = true
            })
                .finally(() => {
                    resolve(response)
                })
        })
    }

    const fsuPercentageTargetCompletedDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  F."districtId" = ${req.body.districtId}`
            var year = `and Year =  ${req.body.year}`

            var facilityId = `and  F."facilityId" = ${req.body.facilityId}`
            var start_month = `and  F."month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth}`

            if (req.body.startMonth.length == 0) {
                start_month = `and  F."month" BETWEEN 1 `
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

            if (req.body.facilityId.length == 0) {
                facilityId = ""
            }

            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;
            // (CASE MS3."NoOfBSExamined" WHEN 0 Then NULL ELSE MS3."NoOfBSExamined" END)) * 100) 
            db.sequelize.query(`
            select F.year,F.month,F."districtId",F."facilityId",D."districtName",F1."facilityName",
            F."nameOfFilariaSurveyUnit" AS "nameOfUnitId",VC."nameOfControlUnit" AS "nameOfUnit",
            F."noOfVillagesOrTowns",FS."namesOfVillagesOrTowns",FS."targetedPopulation",FS."surveyedPopulation",
            FS."noOfBSCollected",FS."noOfBSExamined",FS."noOfMFPositiveCases",
            ((FS."surveyedPopulation"/(CASE FS."targetedPopulation"  WHEN 0 Then NULL ELSE
                FS."targetedPopulation" END))  *100 ) As "percentageOfTarget"
            from public."fsuTargetAchivements" F
            left join public."fsuTargetAchievementsSurveys" FS ON FS."fsuTargetAchievementId"=F.id
            left join public.districts D on D.id =  F."districtId"
            left join public.facilities F1 on F1.id = F."facilityId"
            left join public."verticalControlUnits" VC on VC.id = F."nameOfFilariaSurveyUnit"            
            where F."isActive"=true
${districtId} ${year} ${start_month} ${end_month}
${facilityId} 
	`).then(([results, metadata]) => {

                response.error = false
                response.data = results
                //console.log("results", results)
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

        get_FSUAnalysis1Dao,
        get_FSUAnalysis2ListDao,
        get_FSUAnalysis3ListDao,
        NPSDao,
        NBSEDao,
        NPMFDao,
        NPLFMFDao,
        get_FSUAnalysis5ListDao,
        No_positive_DiseaseDao,
        Total_MF_RateDao,
        Total_Disease_RateDao,
        fsuPercentageTargetCompletedDao
    };
};
export default FSUReportDao();