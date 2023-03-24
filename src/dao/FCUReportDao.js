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
const FCUReportDao = () => {





    const get_FCUAnalysis1Dao = async (req) => {
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
          select      M."nameOfUnit" AS "nameOfUnitId", VC."nameOfControlUnit" AS "nameOfUnit",
            M."nameOfFilariaFieldUnit" as "nameOfFilariaFieldUnitId",
			VCF."fieldUnitName" as "nameOfFilariaFieldUnit",
            M."districtId",D."districtName",M."year" AS "Year", M."month" AS "Month",
            SUM(M."populationCoveredByUnit") "populationCoveredByUnit",
			SUM(MS2."NoOfBSCollected") "NoOfBSCollected", 0 As "PrevBackLog",
			SUM(MS3."NoOfBSExamined") "NoOfBSExamined" , SUM(MS4."NoOfMFPostve") "NoOfMFPostve",
            ((SUM(MS4."NoOfMFPostve")/(CASE SUM(MS2."NoOfBSCollected")
                WHEN 0 Then NULL ELSE SUM(MS2."NoOfBSCollected") END))*100) AS "MFRate",  
			SUM(MS5."NoOfTotPostve"-MS4."NoOfMFPostve") AS "NoOfDesPostve",
            SUM(M."populationCoveredByUnit") "populationCoveredByUnit",
			SUM(MS2."NoOfBSCollected") "NoOfBSCollected",0 As "PrevBackLog",
			SUM(MS3."NoOfBSExamined") "NoOfBSExamined",SUM(MS4."NoOfMFPostve") "NoOfMFPostve",
            ((SUM(MS5."NoOfTotPostve"-MS4."NoOfMFPostve")/(CASE SUM(MS2."NoOfBSCollected")
                WHEN 0 Then NULL ELSE SUM(MS2."NoOfBSCollected") END))*100) AS "DesRate",
            0 as "PrgBSExam",0 as "PrgMFPostve",0 as "PrgMFRate"
            from public."mfPositiveLineLists" M
            LEFT JOIN public."mfPositiveLineListPatients" MP on MP."mfPositiveLineListId"=M.id
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
                "noOfPersonsMale0to4"+"noOfPersonsMale5to14"+"noOfPersonsMale15to39"+"noOfPersonsMale40Plus" +
                "noOfPersonsFemale0to4"+"noOfPersonsFemale5to14"+"noOfPersonsFemale15to39"+"noOfPersonsFemale40Plus" +
                "noOfPersonsTG0to4"+"noOfPersonsTG5to14"+"noOfPersonsTG15to39"+"noOfPersonsTG40Plus" As "NoOfBSExamined"
                 from public."mfPositiveLineListSurveys" MS
            where  MS."detailsOfSurveyId"=(select id from public."udCategoryOptions" where "categoryCode"=1013 and "categoryOptionCode"='NBSE')
            )
            MS3 ON MS3."mfPositiveLineListId"=M.id
            LEFT JOIN (
                select  MS."dateOfAction" , MS."mfPositiveLineListId",
                "noOfPersonsMale0to4"+"noOfPersonsMale5to14"+"noOfPersonsMale15to39"+"noOfPersonsMale40Plus" +
                "noOfPersonsFemale0to4"+"noOfPersonsFemale5to14"+"noOfPersonsFemale15to39"+"noOfPersonsFemale40Plus" +
                "noOfPersonsTG0to4"+"noOfPersonsTG5to14"+"noOfPersonsTG15to39"+"noOfPersonsTG40Plus" As "NoOfMFPostve"
                 from public."mfPositiveLineListSurveys" MS
            where  MS."detailsOfSurveyId"=(select id from public."udCategoryOptions" where "categoryCode"=1013 and "categoryOptionCode"='NPMF')
            )
            MS4 ON MS4."mfPositiveLineListId"=M.id
            LEFT JOIN (
                select  MS."dateOfAction" , MS."mfPositiveLineListId",
                "noOfPersonsMale0to4"+"noOfPersonsMale5to14"+"noOfPersonsMale15to39"+"noOfPersonsMale40Plus"  +
                "noOfPersonsFemale0to4"+"noOfPersonsFemale5to14"+"noOfPersonsFemale15to39"+"noOfPersonsFemale40Plus" +
                "noOfPersonsTG0to4"+"noOfPersonsTG5to14"+"noOfPersonsTG15to39"+"noOfPersonsTG40Plus" As "NoOfTotPostve"
                 from public."mfPositiveLineListSurveys" MS
            where  MS."detailsOfSurveyId"=(select id from public."udCategoryOptions" where "categoryCode"=1013 and "categoryOptionCode"='NPLFMF')
            )
            MS5 ON MS5."mfPositiveLineListId"=M.id
            LEFT JOIN public.facilities F on F.id=M."facilityId"
            LEFT JOIN public.villages  V on V.id=M."villageId"
            LEFT JOIN public.districts D on D.id = M."districtId"
            LEFT JOIN public.talukas T on T.id = M."talukaId"
            LEFT JOIN public."subCenters" S on S.id = M."subCenterId"
            LEFT JOIN public."verticalControlUnits" VC on VC.id = M."nameOfUnit"
            LEFT JOIN public."verticalControlFieldUnits" VCF on VCF.id = M."nameOfFilariaFieldUnit"
            LEFT JOIN public."udCategoryOptions" U ON M.id=MP.gender
            LEFT JOIN public."udCategoryOptions" U1 ON M.id=M."targetForCollectionOfNBS"
        where M."isActive"=true  ${start_month} ${end_month} ${nameOfUnitId} ${districtId} ${year} ${facilityId} 
  group by  M."nameOfUnit", VC."nameOfControlUnit",
            M."nameOfFilariaFieldUnit",VCF."fieldUnitName", 
            M."districtId",D."districtName",M."year", M."month"
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



    const get_FCUAnalysis2Dao = async (req) => {
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
           	select M."nameOfUnit" AS "nameOfUnitId", VC."nameOfControlUnit" AS "nameOfUnit",
            M."nameOfFilariaFieldUnit" as "nameOfFilariaFieldUnitId",VCF."fieldUnitName" as "nameOfFilariaFieldUnit",
            M."districtId",D."districtName",M."year" AS "Year", M."month" AS "Month",
            Sum(M."targetForCollectionOfNBS") AS "targetForCollectionOfNBS",
			Sum(MS2."noOfPersons") AS "NoOfBSCollected",
			Sum(MS3."noOfPersons") AS "NoOfBSExamined",
            Sum(M."targetForCollectionOfNBS") AS "targetForCollectionOfNBS",
			Sum(MS2."noOfPersons") AS "noOfPersons",
            ((Sum(M."targetForCollectionOfNBS")/(CASE Sum(MS2."noOfPersons")
                WHEN 0 Then NULL ELSE Sum(MS2."noOfPersons") END))*100) AS "AchivedOfBSCollection",
            ((Sum(MS4."noOfPersons")/(CASE Sum(MS2."noOfPersons")
                WHEN 0 Then NULL ELSE Sum(MS2."noOfPersons") END))*100) AS "MFRate",
            ((Sum(MS5."noOfPersons"-MS4."noOfPersons")/(CASE Sum(MS2."noOfPersons")
                WHEN 0 Then NULL ELSE Sum(MS2."noOfPersons") END))*100) AS "DesRate",
            ((Sum(MS5."noOfPersons")/(CASE Sum(MS2."noOfPersons")
                WHEN 0 Then NULL ELSE Sum(MS2."noOfPersons") END))*100) AS "TotRate",
            Sum(MP1."NoTreatedMF") AS "NoTreatedMF", 0 AS "NoTreatedDes", SUM(MP1."NoTreatedMF") AS "NoTreatedTot",
            0 AS "percentOfCasesTreated",0 AS "populationCovered",0 AS "percentOfPopulationCovered",
            Sum(MP2."NotTreatedP") "NotTreatedP",Sum(MP3."NotTreatedM") "NotTreatedM",
			Sum(MP4."NotTreatedI") "NotTreatedI",Sum(MP5."NotTreatedD") "NotTreatedD",			
			Sum(MP6."NotTreatedAP") "NotTreatedAP",Sum(MP7."NotTreatedO") "NotTreatedO",
			Sum(MP8."NotTreatedTot") "NotTreatedTot"
			from public."mfPositiveLineLists" M
            LEFT JOIN public."mfPositiveLineListPatients" MP on MP."mfPositiveLineListId"=M.id
            LEFT JOIN (select * from public."vMFPositiveLineListSurveys" V1 where  V1."categoryOptionCode"='NPC')
            MS2 ON MS2."mfPositiveLineListId"=M.id
            LEFT JOIN (select * from public."vMFPositiveLineListSurveys" V1 where  V1."categoryOptionCode"='NBSE')
            MS3 ON MS3."mfPositiveLineListId"=M.id
            LEFT JOIN (select * from public."vMFPositiveLineListSurveys" V1 where  V1."categoryOptionCode"='NPMF')
            MS4 ON MS4."mfPositiveLineListId"=M.id
            LEFT JOIN (select * from public."vMFPositiveLineListSurveys" V1 where  V1."categoryOptionCode"='NPLFMF')
            MS5 ON MS5."mfPositiveLineListId"=M.id
            LEFT JOIN (select MP."mfPositiveLineListId",Count(id) AS "NoTreatedMF" from public."mfPositiveLineListPatients" MP
                       where MP."isTreatmentGive"=true group by MP."mfPositiveLineListId" )
                       MP1 ON MP1."mfPositiveLineListId"=M.id
            LEFT JOIN (select MP."mfPositiveLineListId",Count(id) AS "NotTreatedP" from public."mfPositiveLineListPatients" MP
                       where MP."isTreatmentGive"=false and MP."reasonsForNonTreating"=(select id from public."udCategoryOptions"
                       where "categoryCode"=1015 and "categoryOptionCode"='P') group by MP."mfPositiveLineListId" )
            MP2 ON MP2."mfPositiveLineListId"=M.id
            LEFT JOIN (select MP."mfPositiveLineListId",Count(id) AS "NotTreatedM" from public."mfPositiveLineListPatients" MP
                       where MP."isTreatmentGive"=false and MP."reasonsForNonTreating"=(select id from public."udCategoryOptions"
                       where "categoryCode"=1015 and "categoryOptionCode"='M') group by MP."mfPositiveLineListId" )
            MP3 ON MP3."mfPositiveLineListId"=M.id
            LEFT JOIN (select MP."mfPositiveLineListId",Count(id) AS "NotTreatedI" from public."mfPositiveLineListPatients" MP
                       where MP."isTreatmentGive"=false and MP."reasonsForNonTreating"=(select id from public."udCategoryOptions"
                       where "categoryCode"=1015 and "categoryOptionCode"='I') group by MP."mfPositiveLineListId" )
            MP4 ON MP4."mfPositiveLineListId"=M.id
            LEFT JOIN (select MP."mfPositiveLineListId",Count(id) AS "NotTreatedD" from public."mfPositiveLineListPatients" MP
                       where MP."isTreatmentGive"=false and MP."reasonsForNonTreating"=(select id from public."udCategoryOptions"
                       where "categoryCode"=1015 and "categoryOptionCode"='D') group by MP."mfPositiveLineListId" )
            MP5 ON MP5."mfPositiveLineListId"=M.id
            LEFT JOIN (select MP."mfPositiveLineListId",Count(id) AS "NotTreatedAP" from public."mfPositiveLineListPatients" MP
                       where MP."isTreatmentGive"=false and MP."reasonsForNonTreating"=(select id from public."udCategoryOptions"
                       where "categoryCode"=1015 and "categoryOptionCode"='AP') group by MP."mfPositiveLineListId" )
            MP6 ON MP6."mfPositiveLineListId"=M.id
            LEFT JOIN (select MP."mfPositiveLineListId",Count(id) AS "NotTreatedO" from public."mfPositiveLineListPatients" MP
                       where MP."isTreatmentGive"=false and MP."reasonsForNonTreating"=(select id from public."udCategoryOptions"
                       where "categoryCode"=1015 and "categoryOptionCode"='OS') group by MP."mfPositiveLineListId" )
            MP7 ON MP7."mfPositiveLineListId"=M.id
            LEFT JOIN (select MP."mfPositiveLineListId",Count(id) AS "NotTreatedTot" from public."mfPositiveLineListPatients" MP
                       where MP."isTreatmentGive"=false and MP."reasonsForNonTreating" is not null group by MP."mfPositiveLineListId" )
            MP8 ON MP8."mfPositiveLineListId"=M.id
            LEFT JOIN public.facilities F on F.id=M."facilityId"
            LEFT JOIN public.villages  V on V.id=M."villageId"
            LEFT JOIN public.districts D on D.id = M."districtId"
            LEFT JOIN public.talukas T on T.id = M."talukaId"
            LEFT JOIN public."subCenters" S on S.id = M."subCenterId"
            LEFT JOIN public."verticalControlUnits" VC on VC.id = M."nameOfUnit"
            LEFT JOIN public."verticalControlFieldUnits" VCF on VCF.id = M."nameOfFilariaFieldUnit"
            LEFT JOIN public."udCategoryOptions" U ON M.id=MP.gender
            LEFT JOIN public."udCategoryOptions" U1 ON M.id=M."targetForCollectionOfNBS"
        where  M."isActive"=true
 ${start_month} ${end_month}  ${districtId} ${year}  ${facilityId} ${nameOfUnitId} group by M."month", M."year",M."nameOfUnit", VC."nameOfControlUnit",
   M."nameOfFilariaFieldUnit", VCF."fieldUnitName",M."districtId",D."districtName"

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





    const UnitLevelDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  M."districtId" = ${req.body.districtId}`
            var year = `and M."year" =  ${req.body.year}`
            var month = `and M."month" = ${req.body.month}`
            var nameOfUnitId = `and  M."nameOfUnit" = ${req.body.nameOfUnitId}`


            if (req.body.districtId.length == 0) {
                districtId = ""
            }
            if (req.body.year.length == 0) {
                year = ""
            }
            if (req.body.month.length == 0) {
                month = ""
            }

            if (req.body.nameOfUnitId.length == 0) {
                nameOfUnitId = ""
            }
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
       select M."nameOfUnit" AS "nameOfUnitId", VC."nameOfControlUnit" AS "nameOfUnit",
M."nameOfFilariaFieldUnit" as "nameOfFilariaFieldUnitId",VCF."fieldUnitName" as "nameOfFilariaFieldUnit",
M."districtId",D."districtName",M."year", M."month",
sum(M."targetForCollectionOfNBS") "targetForCollectionOfNBS",
sum(MS2."noOfPersons") AS "NoOfPersonsExam",
sum( M."targetForCollectionOfNBS")  AS "targetForCollectionOfNBS",
sum(MS2."noOfPersons") as "noOfPersons",
((sum(M."targetForCollectionOfNBS")/(CASE sum(MS2."noOfPersons")
        WHEN 0 Then NULL ELSE sum(MS2."noOfPersons") END))*100) AS "AchivedOfBSCollection",
sum(MS3."noOfPersons") AS "NoOfBSExamined",
sum(MS4."noOfPersons") AS "NoOfMF",
sum(MS5."noOfPersons") AS "NoOfBoth",
sum(MS5."noOfPersons"-MS4."noOfPersons") AS "NoOfDes",
sum(MS4."noOfPersons"+MS5."noOfPersons") AS "NoOfTot",
((sum(MS4."noOfPersons")/(CASE sum(MS2."noOfPersons")
        WHEN 0 Then NULL ELSE sum(MS2."noOfPersons") END))*100) AS "MFRate",
((sum(MS5."noOfPersons"-MS4."noOfPersons")/(CASE sum(MS2."noOfPersons")
        WHEN 0 Then NULL ELSE sum(MS2."noOfPersons") END))*100) AS "DesRate",
sum(0) AS "EndRate", sum(MP1."NoTreatedMF") as "NoTreatedMF", 
sum(0) AS "NoTreatedDes", sum(MP1."NoTreatedMF" + 0 ) AS "NoTreatedTot",
sum(MP2."NotTreatedP") AS "NotTreatedP",sum(MP3."NotTreatedM") AS "NotTreatedM",
sum(MP4."NotTreatedI") AS "NotTreatedI",sum(MP5."NotTreatedD") AS "NotTreatedD",
sum(MP6."NotTreatedAP") AS "NotTreatedAP",sum(MP7."NotTreatedO") AS "NotTreatedO",
sum(MP8."NotTreatedTot") AS "NotTreatedTot"
from public."mfPositiveLineLists" M
LEFT JOIN public."mfPositiveLineListPatients" MP on MP."mfPositiveLineListId"=M.id
LEFT JOIN (select * from public."vMFPositiveLineListSurveys" V1 where  V1."categoryOptionCode"='NPC')
MS2 ON MS2."mfPositiveLineListId"=M.id
LEFT JOIN (select * from public."vMFPositiveLineListSurveys" V1 where  V1."categoryOptionCode"='NBSE')
MS3 ON MS3."mfPositiveLineListId"=M.id
LEFT JOIN (select * from public."vMFPositiveLineListSurveys" V1 where  V1."categoryOptionCode"='NPMF')
MS4 ON MS4."mfPositiveLineListId"=M.id
LEFT JOIN (select * from public."vMFPositiveLineListSurveys" V1 where  V1."categoryOptionCode"='NPLFMF')
MS5 ON MS5."mfPositiveLineListId"=M.id
LEFT JOIN (select MP."mfPositiveLineListId",Count(id) AS "NoTreatedMF" from public."mfPositiveLineListPatients" MP
                   where MP."isTreatmentGive"=true group by MP."mfPositiveLineListId" )
                   MP1 ON MP1."mfPositiveLineListId"=M.id
LEFT JOIN (select MP."mfPositiveLineListId",Count(id) AS "NotTreatedP" from public."mfPositiveLineListPatients" MP
                   where MP."isTreatmentGive"=false and MP."reasonsForNonTreating"=(select id from public."udCategoryOptions"
                   where "categoryCode"=1015 and "categoryOptionCode"='P') group by MP."mfPositiveLineListId" )
MP2 ON MP2."mfPositiveLineListId"=M.id
LEFT JOIN (select MP."mfPositiveLineListId",Count(id) AS "NotTreatedM" from public."mfPositiveLineListPatients" MP
                   where MP."isTreatmentGive"=false and MP."reasonsForNonTreating"=(select id from public."udCategoryOptions"
                   where "categoryCode"=1015 and "categoryOptionCode"='M') group by MP."mfPositiveLineListId" )
MP3 ON MP3."mfPositiveLineListId"=M.id
LEFT JOIN (select MP."mfPositiveLineListId",Count(id) AS "NotTreatedI" from public."mfPositiveLineListPatients" MP
                   where MP."isTreatmentGive"=false and MP."reasonsForNonTreating"=(select id from public."udCategoryOptions"
                   where "categoryCode"=1015 and "categoryOptionCode"='I') group by MP."mfPositiveLineListId" )
MP4 ON MP4."mfPositiveLineListId"=M.id
LEFT JOIN (select MP."mfPositiveLineListId",Count(id) AS "NotTreatedD" from public."mfPositiveLineListPatients" MP
                   where MP."isTreatmentGive"=false and MP."reasonsForNonTreating"=(select id from public."udCategoryOptions"
                   where "categoryCode"=1015 and "categoryOptionCode"='D') group by MP."mfPositiveLineListId" )
MP5 ON MP5."mfPositiveLineListId"=M.id
LEFT JOIN (select MP."mfPositiveLineListId",Count(id) AS "NotTreatedAP" from public."mfPositiveLineListPatients" MP
                   where MP."isTreatmentGive"=false and MP."reasonsForNonTreating"=(select id from public."udCategoryOptions"
                   where "categoryCode"=1015 and "categoryOptionCode"='AP') group by MP."mfPositiveLineListId" )
MP6 ON MP6."mfPositiveLineListId"=M.id
LEFT JOIN (select MP."mfPositiveLineListId",Count(id) AS "NotTreatedO" from public."mfPositiveLineListPatients" MP
                   where MP."isTreatmentGive"=false and MP."reasonsForNonTreating"=(select id from public."udCategoryOptions"
                   where "categoryCode"=1015 and "categoryOptionCode"='OS') group by MP."mfPositiveLineListId" )
MP7 ON MP7."mfPositiveLineListId"=M.id
LEFT JOIN (select MP."mfPositiveLineListId",Count(id) AS "NotTreatedTot" from public."mfPositiveLineListPatients" MP
                   where MP."isTreatmentGive"=false and MP."reasonsForNonTreating" is not null group by MP."mfPositiveLineListId" )
MP8 ON MP8."mfPositiveLineListId"=M.id
LEFT JOIN public.facilities F on F.id=M."facilityId"
LEFT JOIN public.villages  V on V.id=M."villageId"
LEFT JOIN public.districts D on D.id = M."districtId"
LEFT JOIN public.talukas T on T.id = M."talukaId"
LEFT JOIN public."subCenters" S on S.id = M."subCenterId"
LEFT JOIN public."verticalControlUnits" VC on VC.id = M."nameOfUnit"
LEFT JOIN public."verticalControlFieldUnits" VCF on VCF.id = M."nameOfFilariaFieldUnit"
LEFT JOIN public."udCategoryOptions" U ON M.id=MP.gender
LEFT JOIN public."udCategoryOptions" U1 ON M.id=M."targetForCollectionOfNBS"
where M."isActive"=true and M."fixOrRandom"=2
${districtId} ${year}  ${month}  ${nameOfUnitId}
group by M."nameOfUnit",VC."nameOfControlUnit" ,M."districtId",D."districtName",
M."year", M."month",M."nameOfFilariaFieldUnit",VCF."fieldUnitName"


	`).then(([results, metadata]) => {

                response.error = false
                response.data = results
                // console.log("results", results)
            }).catch((error) => {
                console.log(error)
                response.error = true
            })
                .finally(() => {
                    resolve(response)
                })
        })
    }



    const SubUnitLevelDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  M."districtId" = ${req.body.districtId}`
            var year = `and M."year" =  ${req.body.year}`
            var month = `and M."month" = ${req.body.month}`
            var nameOfUnitId = `and  M."nameOfUnit" = ${req.body.nameOfUnitId}`
            var nameOfFilariaFieldUnit = `and  M."nameOfFilariaFieldUnit" = ${req.body.nameOfFilariaFieldUnit}`



            if (req.body.districtId.length == 0) {
                districtId = ""
            }
            if (req.body.year.length == 0) {
                year = ""
            }
            if (req.body.month.length == 0) {
                month = ""
            }

            if (req.body.nameOfUnitId.length == 0) {
                nameOfUnitId = ""
            }
            if (req.body.nameOfFilariaFieldUnit.length == 0) {
                nameOfFilariaFieldUnit = ""
            }
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
           select M."nameOfUnit" AS "nameOfUnitId", VC."nameOfControlUnit" AS "nameOfUnit",
M."nameOfFilariaFieldUnit" as "nameOfFilariaFieldUnitId",VCF."fieldUnitName" as "nameOfFilariaFieldUnit",
M."districtId",D."districtName",M."year", M."month",
sum(M."targetForCollectionOfNBS") "targetForCollectionOfNBS",sum(MS2."noOfPersons") AS "NoOfPersonsExam",
sum( M."targetForCollectionOfNBS")  AS "targetForCollectionOfNBS",sum(MS2."noOfPersons") as "noOfPersons", 
  sum((M."targetForCollectionOfNBS"/(CASE MS2."noOfPersons"
	WHEN 0 Then NULL ELSE MS2."noOfPersons" END))*100) AS "AchivedOfBSCollection", 
sum(MS3."noOfPersons") AS "NoOfBSExamined",	sum(MS4."noOfPersons") AS "NoOfMF", 
sum(MS5."noOfPersons") AS "NoOfBoth",
sum(MS5."noOfPersons"-MS4."noOfPersons") AS "NoOfDes",
sum(MS4."noOfPersons"+MS5."noOfPersons") AS "NoOfTot",
sum((MS4."noOfPersons"/(CASE MS2."noOfPersons" 
	WHEN 0 Then NULL ELSE MS2."noOfPersons" END))*100) AS "MFRate",
sum(((MS5."noOfPersons"-MS4."noOfPersons")/(CASE MS2."noOfPersons" 
	WHEN 0 Then NULL ELSE MS2."noOfPersons" END))*100) AS "DesRate",
sum(0) AS "EndRate", sum(MP1."NoTreatedMF") as "NoTreatedMF", sum(0) AS "NoTreatedDes", sum(MP1."NoTreatedMF" + 0 ) AS "NoTreatedTot",
sum(MP2."NotTreatedP") AS "NotTreatedP",sum(MP3."NotTreatedM") AS "NotTreatedM",
sum(MP4."NotTreatedI") AS "NotTreatedI",sum(MP5."NotTreatedD") AS "NotTreatedD",
sum(MP6."NotTreatedAP") AS "NotTreatedAP",sum(MP7."NotTreatedO") AS "NotTreatedO",
sum(MP8."NotTreatedTot") AS "NotTreatedTot"
from public."mfPositiveLineLists" M
LEFT JOIN public."mfPositiveLineListPatients" MP on MP."mfPositiveLineListId"=M.id
LEFT JOIN (select * from public."vMFPositiveLineListSurveys" V1 where  V1."categoryOptionCode"='NPC') 
MS2 ON MS2."mfPositiveLineListId"=M.id 
LEFT JOIN (select * from public."vMFPositiveLineListSurveys" V1 where  V1."categoryOptionCode"='NBSE') 
MS3 ON MS3."mfPositiveLineListId"=M.id 
LEFT JOIN (select * from public."vMFPositiveLineListSurveys" V1 where  V1."categoryOptionCode"='NPMF')
MS4 ON MS4."mfPositiveLineListId"=M.id 
LEFT JOIN (select * from public."vMFPositiveLineListSurveys" V1 where  V1."categoryOptionCode"='NPLFMF') 
MS5 ON MS5."mfPositiveLineListId"=M.id 
LEFT JOIN (select MP."mfPositiveLineListId",Count(id) AS "NoTreatedMF" from public."mfPositiveLineListPatients" MP
		   where MP."isTreatmentGive"=true group by MP."mfPositiveLineListId" ) 
		   MP1 ON MP1."mfPositiveLineListId"=M.id 
LEFT JOIN (select MP."mfPositiveLineListId",Count(id) AS "NotTreatedP" from public."mfPositiveLineListPatients" MP
		   where MP."isTreatmentGive"=false and MP."reasonsForNonTreating"=(select id from public."udCategoryOptions" 
		   where "categoryCode"=1015 and "categoryOptionCode"='P') group by MP."mfPositiveLineListId" ) 
MP2 ON MP2."mfPositiveLineListId"=M.id 
LEFT JOIN (select MP."mfPositiveLineListId",Count(id) AS "NotTreatedM" from public."mfPositiveLineListPatients" MP
		   where MP."isTreatmentGive"=false and MP."reasonsForNonTreating"=(select id from public."udCategoryOptions" 
		   where "categoryCode"=1015 and "categoryOptionCode"='M') group by MP."mfPositiveLineListId" ) 
MP3 ON MP3."mfPositiveLineListId"=M.id 
LEFT JOIN (select MP."mfPositiveLineListId",Count(id) AS "NotTreatedI" from public."mfPositiveLineListPatients" MP
		   where MP."isTreatmentGive"=false and MP."reasonsForNonTreating"=(select id from public."udCategoryOptions" 
		   where "categoryCode"=1015 and "categoryOptionCode"='I') group by MP."mfPositiveLineListId" ) 
MP4 ON MP4."mfPositiveLineListId"=M.id 
LEFT JOIN (select MP."mfPositiveLineListId",Count(id) AS "NotTreatedD" from public."mfPositiveLineListPatients" MP
		   where MP."isTreatmentGive"=false and MP."reasonsForNonTreating"=(select id from public."udCategoryOptions" 
		   where "categoryCode"=1015 and "categoryOptionCode"='D') group by MP."mfPositiveLineListId" ) 
MP5 ON MP5."mfPositiveLineListId"=M.id 
LEFT JOIN (select MP."mfPositiveLineListId",Count(id) AS "NotTreatedAP" from public."mfPositiveLineListPatients" MP
		   where MP."isTreatmentGive"=false and MP."reasonsForNonTreating"=(select id from public."udCategoryOptions" 
		   where "categoryCode"=1015 and "categoryOptionCode"='AP') group by MP."mfPositiveLineListId" ) 
MP6 ON MP6."mfPositiveLineListId"=M.id 
LEFT JOIN (select MP."mfPositiveLineListId",Count(id) AS "NotTreatedO" from public."mfPositiveLineListPatients" MP
		   where MP."isTreatmentGive"=false and MP."reasonsForNonTreating"=(select id from public."udCategoryOptions" 
		   where "categoryCode"=1015 and "categoryOptionCode"='OS') group by MP."mfPositiveLineListId" ) 
MP7 ON MP7."mfPositiveLineListId"=M.id
LEFT JOIN (select MP."mfPositiveLineListId",Count(id) AS "NotTreatedTot" from public."mfPositiveLineListPatients" MP
		   where MP."isTreatmentGive"=false and MP."reasonsForNonTreating" is not null group by MP."mfPositiveLineListId" ) 
MP8 ON MP8."mfPositiveLineListId"=M.id 
LEFT JOIN public.facilities F on F.id=M."facilityId"
LEFT JOIN public.villages  V on V.id=M."villageId"
LEFT JOIN public.districts D on D.id = M."districtId"
LEFT JOIN public.talukas T on T.id = M."talukaId"
LEFT JOIN public."subCenters" S on S.id = M."subCenterId"
LEFT JOIN public."verticalControlUnits" VC on VC.id = M."nameOfUnit"
LEFT JOIN public."verticalControlFieldUnits" VCF on VCF.id = M."nameOfFilariaFieldUnit"
LEFT JOIN public."udCategoryOptions" U ON M.id=MP.gender
LEFT JOIN public."udCategoryOptions" U1 ON M.id=M."targetForCollectionOfNBS"
         where M."isActive"=true
${districtId} ${year}  ${month}  ${nameOfUnitId} ${nameOfFilariaFieldUnit}
group by M."nameOfUnit",VC."nameOfControlUnit" ,M."districtId",D."districtName",
M."year", M."month",M."nameOfFilariaFieldUnit",VCF."fieldUnitName";
	`).then(([results, metadata]) => {

                response.error = false
                response.data = results
                // console.log("results", results)
            }).catch((error) => {
                console.log(error)
                response.error = true
            })
                .finally(() => {
                    resolve(response)
                })
        })
    }



    const vNoCasesDetectedDuringMonthDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}
            console.log("req body ", req.body.startMonth, req.body.endMonth)
            var districtId = `and  v."districtId" = ${req.body.districtId}`
            var year = `and year =  ${req.body.year}`
            var facilityId = `and  v."facilityId" = ${req.body.facilityId}`
            var nameOfUnitId = `and  v."nameOfUnitId" = ${req.body.nameOfUnitId}`
            var pf_year = `and date_part('Year',PF."followUpDate") = ${req.body.year}`
            var year1 = `and  date_part('Year',P."dateOfTreatmentStarted") =${req.body.year} `

            var pfStart_month = `and date_part('month',PF."followUpDate") BETWEEN ${req.body.startMonth}`
            var pfEnd_month = `and  ${req.body.endMonth}`

            var startMonth1 = `and  date_part('month',P."dateOfTreatmentStarted")
             BETWEEN ${req.body.startMonth} `
            var endMonth1 = `and  ${req.body.endMonth}`

            var start_month = `and  "month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth}`




            if (req.body.districtId.length == 0) {
                districtId = ""
            }
            if (req.body.year.length == 0) {
                year = ""
                pf_year = ''
                year1 = ''
            }
            if (req.body.startMonth.length == 0) {
                req.body.startMonth = 1
                start_month = `and  "month" BETWEEN 1 `
                pfStart_month = `and date_part('month',PF."followUpDate") BETWEEN ${req.body.startMonth}`
                startMonth1 = `and  date_part('month',P."dateOfTreatmentStarted")  
                BETWEEN ${req.body.startMonth} `
            }
            if (req.body.endMonth.length == 0) {
                req.body.endMonth = 12
                end_month = `and  ${req.body.endMonth}`
                pfEnd_month = `and  ${req.body.endMonth}`
                endMonth1 = `and  ${req.body.endMonth}`
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
           select A.*,B.* ,C.*,D.*
from
(
select M1."nameOfUnitId", M1."nameOfControlUnit",
M1."districtId" ,M1."month",M1."year",
sum(M1."FoundMFPostve") as "FoundMFPostve",
sum(M1."FoundDesPostve") as "FoundDesPostve",
sum(M1."FoundTotPostve") as "FoundTotPostve"
from (
select * from "vNoCasesDetectedDuringMonth"v
where 1 = 1
            ${districtId} ${year}  ${start_month} ${end_month} ${facilityId} ${nameOfUnitId}

) M1 group by M1."nameOfUnitId", M1."nameOfControlUnit", M1."districtId",M1."month",M1."year"
)A
LEFT JOIN
(
select M1."nameOfUnitId", M1."nameOfControlUnit",
M1."districtId",M1."month",M1."year",
sum(M1."FoundMFPostve") as "FoundMFPostve",
sum(M1."FoundDesPostve") as "FoundDesPostve",
sum(M1."FoundTotPostve") as "FoundTotPostve"
from (
select * from "vNoCasesDetectedDuringMonth" v
where 1 = 1
            ${districtId} ${year} ${start_month} ${end_month} ${facilityId} ${nameOfUnitId}
) M1 group by M1."nameOfUnitId", M1."nameOfControlUnit", M1."districtId",M1."month",M1."year"
)B
ON B."nameOfUnitId"=A."nameOfUnitId" and B."districtId"=A."districtId"
and B."month"=A."month" and B."year"=A."year"
LEFT JOIN
(
select M1."nameOfUnitId", M1."nameOfControlUnit", M1."districtId" ,M1."districtName",
sum(M1."noOfDECTabletsGiven") as "noOfDECTabletsGiven",M1."month",M1."year",
sum(M1."noOfDECTabletsConsumed") as "noOfDECTabletsConsumed",
(sum(M1."noOfDECTabletsGiven")-sum(M1."noOfDECTabletsConsumed")) AS "noOfDECTabletsBal"
from (select M.Id,M."nameOfUnit" AS "nameOfUnitId", V."nameOfControlUnit",
M."districtId",D."districtName" ,PF1."noOfDECTabletsGiven",PF1."noOfDECTabletsConsumed",
M."month",M."year"
from public."mfPositiveLineLists" M
LEFT JOIN (select PF."mfPositiveLineListId",PF."noOfDECTabletsGiven",PF."noOfDECTabletsConsumed"
from public."mfPositiveLineListBSFollowUps" PF
where PF."isActive"=true
                       ${pf_year} ${pfStart_month} ${pfEnd_month}
)
PF1 ON PF1."mfPositiveLineListId"=M.id
LEFT JOIN "verticalControlUnits" v ON v.id = m."nameOfUnit"
LEFT JOIN districts d ON d.id = m."districtId"
)M1 group by M1."nameOfUnitId", M1."nameOfControlUnit", M1."districtId",M1."districtName",M1."month",M1."year"
)
C ON C."nameOfUnitId"=A."nameOfUnitId" and C."districtId"=A."districtId"
and C."month"=A."month" and C."year"=A."year"
LEFT JOIN
(
select M1."nameOfUnitId", M1."nameOfControlUnit",M1."districtId",M1."districtName",
SUM(M1."noOfDECTabletsGiven") AS "noOfDECTabletsGiven",
SUM(M1."noOfDECTabletsConsumed") AS "noOfDECTabletsConsumed",M1."month",M1."year"
from
(
select M."nameOfUnit" AS "nameOfUnitId", V."nameOfControlUnit", M."districtId" ,D."districtName",
P1."NoOfOldCasesTreated", P1."noOfDECTabletsGiven",P1."noOfDECTabletsConsumed",
M."month",M."year"
from public."mfPositiveLineLists" M
LEFT JOIN (select P."mfPositiveLineListId", Count(id) AS "NoOfOldCasesTreated",
SUM(PF1."noOfDECTabletsGiven") AS "noOfDECTabletsGiven",
SUM(PF1."noOfDECTabletsConsumed") AS "noOfDECTabletsConsumed"
from public."mfPositiveLineListPatients" P
LEFT JOIN (select PF."mfPositiveLineListId",PF."mfPositiveLineListPatientId",
PF."noOfDECTabletsGiven",PF."noOfDECTabletsConsumed"
from public."mfPositiveLineListBSFollowUps" PF
where PF."isActive"=true
               ${pf_year} ${pfStart_month} ${pfEnd_month}
)PF1 On P.id=PF1."mfPositiveLineListPatientId"
where P."isTreatmentGive" =true
and P."isActive"=true
               ${year1} ${startMonth1} ${endMonth1}
group by P."mfPositiveLineListId"
)P1 ON P1."mfPositiveLineListId"=M.ID
LEFT JOIN "verticalControlUnits" v ON v.id = m."nameOfUnit"
LEFT JOIN districts d ON d.id = m."districtId"
)M1
group by M1."nameOfUnitId", M1."nameOfControlUnit", M1."districtId",M1."districtName",M1."month",M1."year"
)D ON D."nameOfUnitId"=A."nameOfUnitId" and D."districtId"=A."districtId"
and D."month"=A."month" and D."year"=A."year"`).then(([results, metadata]) => {

                response.error = false
                response.data = results
                //console.log("results", results)
            }).catch((error) => {
                //console.log(error, 'LLLLLLLLLL')
                response.error = true
            })
                .finally(() => {
                    resolve(response)
                })
        })
    }

    const get_FCUAnalysis6Dao = async (req) => {
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
         select M."nameOfUnit" AS "nameOfUnitId",V."nameOfControlUnit",
            M."districtId",D."districtName", M."nameOfFilariaFieldUnit" AS "fieldUnitId",VF."fieldUnitName",
            M."year" AS "Year", M."month" AS "Month",
            SUM(MS1."noOfPersons") AS "noOfPersonsExam",SUM(MS2."noOfPersons") AS "noOfPersonsMF",
            ((SUM(MS2."noOfPersons")/(CASE SUM(MS1."noOfPersons")
            WHEN 0 Then NULL ELSE SUM(MS1."noOfPersons") END))*100) AS "MFRate",
            SUM(MS3."noOfPersons") AS "noOfPersonsDes",
            ((SUM(MS3."noOfPersons")/(CASE SUM(MS1."noOfPersons")
            WHEN 0 Then NULL ELSE SUM(MS1."noOfPersons") END))*100) AS "DesRate"
        from public."mfPositiveLineLists" M
        LEFT JOIN (select * from public."vMFPositiveLineListSurveys" V1 where  V1."categoryOptionCode"='NBSE')
        MS1 ON MS1."mfPositiveLineListId"=M.id
        LEFT JOIN (select * from public."vMFPositiveLineListSurveys" V1 where  V1."categoryOptionCode"='NPMF')
        MS2 ON MS2."mfPositiveLineListId"=M.id
        LEFT JOIN public."vDiseasePositive" MS3 ON MS3."mfPositiveLineListId"=M.id
        LEFT JOIN public.districts D on D.id = M."districtId"
        LEFT JOIN public."verticalControlUnits" V ON V.id=M."nameOfUnit"
        LEFT JOIN public."verticalControlFieldUnits" VF ON VF.id=M."nameOfFilariaFieldUnit"
        where M."isActive"=true
${districtId} ${year}  ${start_month} ${end_month} ${facilityId} ${nameOfUnitId}
   group by M."nameOfUnit" ,V."nameOfControlUnit",
            M."districtId",D."districtName", M."nameOfFilariaFieldUnit" ,VF."fieldUnitName",
            M."year",M."month"   
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




    const get_FCUAnalysis10ListDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  M."districtId" = ${req.body.districtId}`
            var year = `and Year =  ${req.body.year}`
            var start_month = `and  M."month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth}`
            var nameOfUnitId = `and  M."nameOfUnit" = ${req.body.nameOfUnitId}`
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
            select M."districtId",M."talukaId", M."facilityId",M."subCenterId",M."villageId",
            d."districtName",t."talukaName",f."facilityName", s."subCenterName",v."villageName",
            M."nameOfUnit" AS "nameOfUnitId", M."year", M."month",
            MP."patientName",MP."ageYears",MP."ageMonths",MP.gender,MP."patientPhoneNo",MP."dateOfExamination",
            MP."bsNumber",MP."mfCount",MP."dateOfTreatmentStarted",
            MF1."followUpDate" AS "followUpDate1",MF1."result" AS "result1",MF1."followUpDate" "TreatmentDate1",
            MF2."followUpDate" AS "followUpDate2",MF1."result" AS "result2",MF1."followUpDate" "TreatmentDate2",
            MF3."followUpDate" AS "followUpDate3",MF1."result" AS "result3",MF1."followUpDate" "TreatmentDate3",
            MF4."followUpDate" AS "followUpDate4",MF1."result" AS "result4",MF1."followUpDate" "TreatmentDate4",
            MF5."followUpDate" AS "followUpDate5",MF1."result" AS "result5",MF1."followUpDate" "TreatmentDate5",
            MF6."followUpDate" AS "followUpDate6",MF1."result" AS "result6",MF1."followUpDate" "TreatmentDate6",
            MF7."followUpDate" AS "followUpDate7",MF1."result" AS "result7",MF1."followUpDate" "TreatmentDate7",
            MF8."followUpDate" AS "followUpDate8",MF1."result" AS "result8",MF1."followUpDate" "TreatmentDate8",
            MF9."followUpDate" AS "followUpDate9",MF1."result" AS "result1",MF1."followUpDate" "TreatmentDate9",
            MF10."followUpDate" AS "followUpDate10",MF1."result" AS "result10",MF1."followUpDate" "TreatmentDate10",
            MP."nameOfDrugAdmin",MP."designation",
            MP."phoneNoOfDrugAdmin"
            from public."mfPositiveLineLists" M
            left join public."mfPositiveLineListPatients" MP 
            ON MP."mfPositiveLineListId"=M.id
            left join public."mfPositiveLineListBSFollowUps" MF1
            ON MF1."mfPositiveLineListId"=M.id and  MP.id=MF1."mfPositiveLineListPatientId" 
               and MF1."followUpYear"=1
            left join public."mfPositiveLineListBSFollowUps" MF2
            ON MF2."mfPositiveLineListId"=M.id and  MP.id=MF2."mfPositiveLineListPatientId" 
               and MF2."followUpYear"=2
            left join public."mfPositiveLineListBSFollowUps" MF3
            ON MF3."mfPositiveLineListId"=M.id and  MP.id=MF3."mfPositiveLineListPatientId" 
               and MF3."followUpYear"=3
            left join public."mfPositiveLineListBSFollowUps" MF4
            ON MF4."mfPositiveLineListId"=M.id and  MP.id=MF4."mfPositiveLineListPatientId" 
               and MF4."followUpYear"=4
            left join public."mfPositiveLineListBSFollowUps" MF5
            ON MF5."mfPositiveLineListId"=M.id and  MP.id=MF5."mfPositiveLineListPatientId" 
               and MF5."followUpYear"=5
            left join public."mfPositiveLineListBSFollowUps" MF6
            ON MF6."mfPositiveLineListId"=M.id and  MP.id=MF6."mfPositiveLineListPatientId" 
               and MF6."followUpYear"=6
            left join public."mfPositiveLineListBSFollowUps" MF7
            ON MF7."mfPositiveLineListId"=M.id and  MP.id=MF7."mfPositiveLineListPatientId" 
               and MF7."followUpYear"=7
            left join public."mfPositiveLineListBSFollowUps" MF8
            ON MF8."mfPositiveLineListId"=M.id and  MP.id=MF8."mfPositiveLineListPatientId" 
               and MF8."followUpYear"=8
            left join public."mfPositiveLineListBSFollowUps" MF9
            ON MF9."mfPositiveLineListId"=M.id and  MP.id=MF9."mfPositiveLineListPatientId" 
               and MF9."followUpYear"=9
            left join public."mfPositiveLineListBSFollowUps" MF10
            ON MF10."mfPositiveLineListId"=M.id and  MP.id=MF10."mfPositiveLineListPatientId" 
               and MF10."followUpYear"=10 
            left join public.districts d on d.id= M."districtId" 
            left join public.talukas t on t.id= M."talukaId" 
            left join public.facilities f on f.id= M."facilityId" 
            left join public."subCenters" s on s.id= M."subCenterId" 
            left join public.villages v on v.id= M."villageId" 
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


    const get_FCUAnalysis7ListDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  M."districtId" = ${req.body.districtId}`
            var year1 = `and date_part('year',"dateNPC")= ${req.body.year}`
            var month1 = `and date_part('month',"dateNPC")=  ${req.body.month}`

            var year2 = `and date_part('year',"dateNBSE")= ${req.body.year}`
            var month2 = `and date_part('month',"dateNBSE")=  ${req.body.month}`


            var year = req.body.year;
            var month = req.body.month;

            var nameOfUnitId = `and  M."nameOfUnit" = ${req.body.nameOfUnitId}`

            var date = new Date();
            if (req.body.districtId.length == 0) {
                districtId = ""
            }
            if (req.body.year.length == 0) {
                year = date.getFullYear()
                year1 = ""
                year2 = ""



            }
            if (req.body.month.length == 0) {
                month = date.getMonth() + 1
                month1 = ""
                month2 = ""

            }

            if (req.body.nameOfUnitId.length == 0) {
                nameOfUnitId = ""
            }
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`

            select M."districtId",D."districtName",
            M."nameOfUnit" AS "nameOfControlUnitId", VC."nameOfControlUnit",
            sum(M1."noOfPersonsNPC") AS "BSCommectionDuring",
            sum(M2."noOfPersonsNBSE") AS "BSExamDuring",
            sum(M3."noOfPersonsNBSE") AS "BSExamPrevious",
            sum(M2."noOfPersonsNBSE") + sum(M3."noOfPersonsNBSE")  AS "BSExamTotal",
            0 AS "CollectionFrom",0 AS "ExamFrom",0 AS "BSNotToBeExam"
            from public."mfPositiveLineLists" M
            left join public."verticalControlUnits" VC ON VC.id=M."nameOfUnit"
            left join public.districts D ON D.id=M."districtId"
            left join
            (
                select id,"dateNPC", "noOfPersonsNPC" from public."vMFPositiveLineListSurveysById"
where 1 = 1
                ${year1} ${month1}
                )M1
            ON M1.id=M.id
            left join
            --BS During
            (
                select  id,"dateNBSE","noOfPersonsNBSE" from public."vMFPositiveLineListSurveysById"
                where 1 = 1
                ${year1} ${month1}
                ${year2} ${month2}

            )M2 ON M2.id=M.id
            left join
            --BS Previous
            (
                select  id,"dateNBSE","noOfPersonsNBSE" from public."vMFPositiveLineListSurveysById"
                where "dateNPC" < TO_DATE(CONCAT(${year}::text,LPAD(${month}::text, 2, '0'),'01'),'YYYYMMDD')
                ${year2} ${month2}
                )M3 ON M3.id=M.id 
            where 1 = 1
            ${districtId} ${nameOfUnitId}
            group by M."districtId",D."districtName",M."nameOfUnit",VC."nameOfControlUnit"
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

    const get_FCUAnalysis8ListDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  M."districtId" = ${req.body.districtId}`
            var year2 = `and date_part('year',"dateNBSE")=(case when ${req.body.month} = 1 then ${req.body.year} -2 else  ${req.body.year} -1 end) `
            var month1 = `and date_part('month',"dateNBSE")=(case when ${req.body.month} = 1 then 12 else ${req.body.month}-1 end)`

            var year1 = `and date_part('year',"dateNBSE")= (${req.body.year} -1)`
            var year3 = `and date_part('year',"dateNBSE")=(case when ${req.body.month} = 1 then ${req.body.year} -1 else  ${req.body.year} end) `

            var year0 = `and date_part('year',"dateNBSE")= (${req.body.year})`
            var month0 = `and date_part('month',"dateNBSE")=  ${req.body.month}`

            var nameOfUnitId = `and  M."nameOfUnit" = ${req.body.nameOfUnitId}`

            if (req.body.districtId.length == 0) {
                districtId = ""
            }
            if (req.body.year.length == 0) {
                year1 = ""
                year2 = ""
                year0 = ""
                year3 = ""

            }
            if (req.body.month.length == 0) {
                month1 = ""
                month2 = ""
                month0 = ""

            }

            if (req.body.nameOfUnitId.length == 0) {
                nameOfUnitId = ""
            }
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`

            select M."districtId",D."districtName",M."year",M."month",
            M."nameOfUnit" AS "nameOfControlUnitId", VC."nameOfControlUnit",
            sum(M1."noOfPersonsNBSE") AS "BSExamDuringPrev",
            sum(M2."noOfPersonsNPMF") AS "MFCountDuringPrev",
            ((sum(M2."noOfPersonsNPMF")/(CASE sum(M1."noOfPersonsNBSE")
                WHEN 0 Then NULL ELSE sum(M1."noOfPersonsNBSE") END))*100) AS "MFRateDuringPrev",
            sum(M3."noOfPersonsDisease") AS "DisCountDuringPrev",
            ((sum(M3."noOfPersonsDisease")/(CASE sum(M1."noOfPersonsNBSE")
                WHEN 0 Then NULL ELSE sum(M1."noOfPersonsNBSE") END))*100) AS "DisRateDuringPrev",
            sum(M4."noOfPersonsNBSE") AS "BSExamPrgPrev",
            sum(M5."noOfPersonsNPMF") AS "MFCountPrgPrev",
            ((sum(M5."noOfPersonsNPMF")/(CASE sum(M4."noOfPersonsNBSE")
                WHEN 0 Then NULL ELSE sum(M4."noOfPersonsNBSE") END))*100)  AS "MFRatePrgPrev",
            sum(M6."noOfPersonsDisease") AS "DisCountPrgPrev",
            ((sum(M6."noOfPersonsDisease")/(CASE sum(M4."noOfPersonsNBSE")
                WHEN 0 Then NULL ELSE sum(M4."noOfPersonsNBSE") END))*100) AS "DisRatePrgPrev",
            sum(M7."noOfPersonsNBSE") AS "BSExamDuringCurrent",
            sum(M8."noOfPersonsNPMF") AS "MFCountDuringCurrent",
            ((sum(M8."noOfPersonsNPMF")/(CASE sum(M7."noOfPersonsNBSE")
                WHEN 0 Then NULL ELSE sum(M7."noOfPersonsNBSE") END))*100)  AS "MFRateDuringCurrent",
            sum(M9."noOfPersonsDisease") AS "DisCountDuringCurrent",
            ((sum(M9."noOfPersonsDisease")/(CASE sum(M7."noOfPersonsNBSE")
                WHEN 0 Then NULL ELSE sum(M7."noOfPersonsNBSE") END))*100) AS "DisRateDuringCurrent",
            sum(M10."noOfPersonsNBSE") AS "BSExamPrgCurrent",
            sum(M11."noOfPersonsNPMF") AS "MFCountPrgCurrent",
            ((sum(M11."noOfPersonsNPMF")/(CASE sum(M10."noOfPersonsNBSE")
                WHEN 0 Then NULL ELSE sum(M10."noOfPersonsNBSE") END))*100)  AS "MFRatePrgCurrent",
            sum(M12."noOfPersonsDisease") AS "DisCountPrgCurrent",
            ((sum(M12."noOfPersonsDisease")/(CASE sum(M10."noOfPersonsNBSE")
                WHEN 0 Then NULL ELSE sum(M10."noOfPersonsNBSE") END))*100) AS "DisRatePrgCurrent"
            from public."mfPositiveLineLists" M
            left join public."verticalControlUnits" VC ON VC.id=M."nameOfUnit"
            left join public.districts D ON D.id=M."districtId"
            left join
            (
                select id,"dateNBSE", "noOfPersonsNBSE" from public."vMFPositiveLineListSurveysById"
                where 1 = 1
                ${month0} ${year1}
            )M1
            ON M1.id=M.id
            left join
            (
                select id,"dateNBSE", "noOfPersonsNPMF" from public."vMFPositiveLineListSurveysById"
                where 1 = 1
                ${month0} ${year1}
            )M2
            ON M2.id=M.id
            left join
            (
                select id,"dateNBSE","noOfPersonsDisease"  from public."vMFPositiveLineListSurveysById"
                where 1 = 1
                ${month0} ${year1}
                )M3
            ON M3.id=M.id
            left join
            (
                select id,"dateNBSE", "noOfPersonsNBSE" from public."vMFPositiveLineListSurveysById"
                where 1 = 1
                ${month1} ${year2}
                
            )M4
            ON M4.id=M.id
            left join
            (
                select id,"dateNBSE", "noOfPersonsNPMF" from public."vMFPositiveLineListSurveysById"
                where 1 = 1
                ${month1} ${year2}

            )M5
            ON M5.id=M.id
            left join
            (
                select id,"dateNBSE","noOfPersonsDisease"  from public."vMFPositiveLineListSurveysById"
                where 1 = 1
                ${month1} ${year2}

            )M6
            ON M6.id=M.id
            left join
            (
                select id,"dateNBSE", "noOfPersonsNBSE" from public."vMFPositiveLineListSurveysById"
                where 1 = 1
                ${month0} ${year0}

            )M7
            ON M7.id=M.id
            left join
            (
                select id,"dateNBSE", "noOfPersonsNPMF" from public."vMFPositiveLineListSurveysById"
                where 1 = 1
                ${month0} ${year0}

            )M8
            ON M8.id=M.id
            left join
            (
                select id,"dateNBSE","noOfPersonsDisease"  from public."vMFPositiveLineListSurveysById"
                where 1 = 1
                ${month0} ${year0}

            )M9
            ON M9.id=M.id
            left join
            (
                select id,"dateNBSE", "noOfPersonsNBSE" from public."vMFPositiveLineListSurveysById"
                where 1 = 1
                ${month1} ${year3}

            )M10
            ON M10.id=M.id
            left join
            (
                select id,"dateNBSE", "noOfPersonsNPMF" from public."vMFPositiveLineListSurveysById"
                where 1 = 1
                ${month1} ${year3}

            )M11
            ON M11.id=M.id
            left join
            (
                select id,"dateNBSE","noOfPersonsDisease"  from public."vMFPositiveLineListSurveysById"
                where 1 = 1
                ${month1} ${year3}

            )M12
            ON M12.id=M.id 
            Where 1 = 1 
            ${nameOfUnitId} ${districtId}
            group by M."districtId",D."districtName",M."nameOfUnit",VC."nameOfControlUnit",
            M."year",M."month"
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
        get_FCUAnalysis1Dao,
        get_FCUAnalysis2Dao,
        vNoCasesDetectedDuringMonthDao,
        get_FCUAnalysis6Dao,
        UnitLevelDao,
        SubUnitLevelDao,
        get_FCUAnalysis10ListDao,
        get_FCUAnalysis7ListDao,
        get_FCUAnalysis8ListDao,
    };
};
export default FCUReportDao();