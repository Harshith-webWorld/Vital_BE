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
const entomologyReportDao = () => {





    const LarvicidalReport1Dao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  EL."districtId" = ${req.body.districtId}`
            var year = `and EL.year =  ${req.body.year}`
            var nameOfUnit = `and  EL."nameOfUnit" = ${req.body.nameOfUnit}`

            var start_month = `and  EL."month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth}`

            if (req.body.startMonth.length == 0) {
                start_month = `and  EL."month" BETWEEN 1 `
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

            if (req.body.nameOfUnit.length == 0) {
                nameOfUnit = ""
            }
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select  EL.year, EL.month,EL."districtId",D."districtName",
            EL."nameOfUnit" AS "nameOfControlUnitId" ,VC."nameOfControlUnit",
            EL."larvicideNameId",UD."categoryOptionName" AS "larvicideName",
            EL."noOfMenWorkingSFW",EL."noOfMenWorkingFW",EL."openingBalance",
            EL."receivedDuringMonth",EL."consumedDuringMonth",EL."balanceEndOfMonth",
            EL."canalisationWork",EL."desiltingWork",EL."deweedingWork",
            EL."fillingWork",EL."otherWork",EL."noOfWellsBioControl",
            EL."noOfTankBioControl",EL."noOfCanalsBioControl"
            from public."entomologicalLarvicidalLists" EL
            left join public.districts D ON D.id=EL."districtId"
            left join public."verticalControlUnits" VC ON VC.id=EL."nameOfUnit"
            left join public."udCategoryOptions" UD ON UD.id=EL."larvicideNameId"
                    where  EL."isActive"= true
${districtId} ${year}  ${start_month} ${end_month}
${nameOfUnit}
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



    const NFCUReportEntomology1Dao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  E."districtId" = ${req.body.districtId}`
            var year = `and E.year =  ${req.body.year}`
            var unitNameId = `and  E."unitNameId" = ${req.body.unitNameId}`

            var start_month = `and  E."month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth}`

            if (req.body.startMonth.length == 0) {
                start_month = `and  E."month" BETWEEN 1 `
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
            if (req.body.unitNameId.length == 0) {
                unitNameId = ""
            }
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select
   VC."nameOfControlUnit",
   E.* AS "unitName",
   D."districtName" 
from
   (
      select
         COALESCE(E1."year", E2."year") AS "year",
         COALESCE(E1."month", E2."month") AS "month",
         COALESCE(E1."districtId", E2."districtId") AS "districtId",
         COALESCE(E1."nameOfUnit", E2."nameOfUnit") AS "unitNameId",
         COALESCE(E1."mosquitoType", E2."mosquitoType") as "mosquitoType",
         E1."totalTimeSpent" AS "totalTimeSpentF",
         E1."noOfMosquitoCollectedMale" AS "noOfMosquitoCollectedMaleF",
         E1."noOfMosquitoCollectedFemale" AS "noOfMosquitoCollectedFemaleF",
         E1."noOfMosquitoCollectedTotal" AS "noOfMosquitoCollectedTotalF",
         E2."totalTimeSpent" AS "totalTimeSpentR",
         E2."noOfMosquitoCollectedMale" AS "noOfMosquitoCollectedMaleR",
         E2."noOfMosquitoCollectedFemale" AS "noOfMosquitoCollectedFemaleR",
         E2."noOfMosquitoCollectedTotal" AS "noOfMosquitoCollectedTotalR",
         (
            COALESCE(E1."totalTimeSpent", 0) + COALESCE(E2."totalTimeSpent", 0) 
         )
         AS "totalTimeSpent",
         (
            COALESCE(E1."noOfMosquitoCollectedMale", 0) + COALESCE(E2."noOfMosquitoCollectedMale", 0) 
         )
         AS "noOfMosquitoCollectedMale",
         (
            COALESCE(E1."noOfMosquitoCollectedFemale", 0) + COALESCE(E2."noOfMosquitoCollectedFemale", 0) 
         )
         AS "noOfMosquitoCollectedFemale",
         (
            COALESCE(E1."noOfMosquitoCollectedTotal", 0) + COALESCE(E2."noOfMosquitoCollectedTotal", 0) 
         )
         AS "noOfMosquitoCollectedTotal" 
      from
         (
            --Fixed,E2.Year) as "year"
            select
               ED."year",
               ED."month",
               ED."districtId",
               ED."nameOfUnit",
               ED."fixedOrRandom",
               ED."mosquitoType",
               sum(ED."totalTimeSpent") "totalTimeSpent",
               sum("noOfMosquitoCollectedMale") AS "noOfMosquitoCollectedMale",
               sum("noOfMosquitoCollectedFemale") AS "noOfMosquitoCollectedFemale",
               sum("noOfMosquitoCollectedTotal") AS "noOfMosquitoCollectedTotal" 
            from
               public."vEntomologicalDataCounts" ED 
            where
               ED."fixedOrRandom" = 'Fixed' 
            group by
               ED."year",
               ED."month",
               ED."districtId",
               ED."nameOfUnit",
               ED."fixedOrRandom",
               ED."mosquitoType" 
         )
         E1 
         FULL OUTER JOIN
            (
               select
                  ED."year",
                  ED."month",
                  ED."districtId",
                  ED."nameOfUnit",
                  ED."fixedOrRandom",
                  ED."mosquitoType",
                  sum(ED."totalTimeSpent") "totalTimeSpent",
                  sum(ED."noOfMosquitoCollectedMale") AS "noOfMosquitoCollectedMale",
                  sum(ED."noOfMosquitoCollectedFemale") AS "noOfMosquitoCollectedFemale",
                  sum(ED."noOfMosquitoCollectedTotal") AS "noOfMosquitoCollectedTotal" 
               from
                  public."vEntomologicalDataCounts" ED 
               where
                  ED."fixedOrRandom" = 'Random' 
               group by
                  ED."year",
                  ED."month",
                  ED."districtId",
                  ED."nameOfUnit",
                  ED."fixedOrRandom",
                  ED."mosquitoType" 
            )
            E2 
            on E1."year" = E2."year" 
            and E1."month" = E2."month" 
            and E1."districtId" = E1."districtId" 
            and E1."nameOfUnit" = E2."nameOfUnit" 
            and E1."mosquitoType" = E2."mosquitoType" 
   )
   E 
   left join
      public.districts D 
      ON D.id = E."districtId" 
   left join
      public."verticalControlUnits" VC 
      ON VC.id = E."unitNameId" 
where
   1 = 1
${districtId} ${year}  ${start_month} ${end_month}
${unitNameId}
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

    const AdditionalEntomologicalReportDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  EL."districtId" = ${req.body.districtId}`
            var year = `and EL.year =  ${req.body.year}`



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
            select EL."year",EL."districtId",D."districtName",EL."talukaId",T."talukaName",
EL."facilityId",F."facilityName",EL."subCenterId",Sb."subCenterName",
EL."villageId",EL."fixedOrRandom",EL."dateOfSurvey" AS "dateOfSurvey",
V."villageName",
COALESCE(ED1."totalTimeSpent",0)  AS "totalTimeSpentF",
COALESCE(ED1."noOfMosquitoCollectedMale",0)  AS "noOfMosquitoCollectedMaleF",
COALESCE(ED1."noOfMosquitoCollectedFemale",0)  AS "noOfMosquitoCollectedFemaleF",
COALESCE(ED2."totalTimeSpent",0) AS "totalTimeSpentR",
COALESCE(ED2."noOfMosquitoCollectedMale",0) AS "noOfMosquitoCollectedMaleR",
COALESCE(ED2."noOfMosquitoCollectedFemale",0) AS "noOfMosquitoCollectedFemaleR",
COALESCE(COALESCE(ED1."totalTimeSpent", 0) + COALESCE(ED2."totalTimeSpent", 0),0) AS "totalTimeSpent",
COALESCE(COALESCE(ED1."noOfMosquitoCollectedMale", 0) + COALESCE(ED2."noOfMosquitoCollectedMale", 0),0) AS "noOfMosquitoCollectedMale",
COALESCE(COALESCE(ED1."noOfMosquitoCollectedFemale", 0) + COALESCE(ED2."noOfMosquitoCollectedFemale", 0),0) AS "noOfMosquitoCollectedFemale",
(COALESCE(ED1."noOfMosquitoCollectedFemale" + ED2."noOfMosquitoCollectedFemale",0)/
	(CASE  COALESCE(ED1."totalTimeSpent" + ED2."totalTimeSpent",0)
	WHEN 0 Then NULL ELSE  COALESCE(ED1."totalTimeSpent" + ED2."totalTimeSpent",0) END)*10) AS "densityManHours"
FROM public."entomologicalLarvicidalLists" EL
LEFT JOIN 
(
	select * from public."vEntomologicalDataCounts" 
 	where lower("mosquitoType") like '%culex%' and lower("fixedOrRandom") like '%fixed%'
) ED1
ON EL.id=ED1.id
LEFT JOIN 
(
	select * from public."vEntomologicalDataCounts" 
 	where lower("mosquitoType") like '%culex%' and lower("fixedOrRandom") like '%random%'
) ED2
ON EL.id=ED2.id
left join public.districts D on D.id = EL."districtId"
left join public.facilities F on F.id = EL."facilityId"
left join public."subCenters" Sb on SB.id = EL."subCenterId"
left join public.talukas T on T.id = EL."talukaId"
left join public.villages V on V.id = EL."villageId"
where 1=1
${districtId} ${year} 
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

    const BaselineEntomoligicalReportDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  EL."districtId" = ${req.body.districtId}`
            var year = `and EL.year =  ${req.body.year}`



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
            select EL."year",EL."districtId",D."districtName",EL."talukaId",T."talukaName",
            EL."facilityId",F."facilityName",EL."subCenterId",Sb."subCenterName",
            EL."villageId",EL."fixedOrRandom",EL."dateOfSurvey" AS "DateOfSurvey",
            V."villageName",
            COALESCE(ED1."totalTimeSpent",0)  AS "totalTimeSpentF",
            COALESCE(ED1."noOfMosquitoCollectedMale",0)  AS "noOfMosquitoCollectedMaleF",
            COALESCE(ED1."noOfMosquitoCollectedFemale",0)  AS "noOfMosquitoCollectedFemaleF",
            COALESCE(ED2."totalTimeSpent",0) AS "totalTimeSpentR",
            COALESCE(ED2."noOfMosquitoCollectedMale",0) AS "noOfMosquitoCollectedMaleR",
            COALESCE(ED2."noOfMosquitoCollectedFemale",0) AS "noOfMosquitoCollectedFemaleR",
            COALESCE(COALESCE(ED1."totalTimeSpent", 0) + COALESCE(ED2."totalTimeSpent", 0),0) AS "totalTimeSpent",
            COALESCE(COALESCE(ED1."noOfMosquitoCollectedMale", 0) + COALESCE(ED2."noOfMosquitoCollectedMale", 0),0) AS "noOfMosquitoCollectedMale",
            COALESCE(COALESCE(ED1."noOfMosquitoCollectedFemale", 0) + COALESCE(ED2."noOfMosquitoCollectedFemale", 0),0) AS "noOfMosquitoCollectedFemale",
            (COALESCE(ED1."noOfMosquitoCollectedFemale" + ED2."noOfMosquitoCollectedFemale",0)/
                (CASE  COALESCE(ED1."totalTimeSpent" + ED2."totalTimeSpent",0)
                WHEN 0 Then NULL ELSE  COALESCE(ED1."totalTimeSpent" + ED2."totalTimeSpent",0) END)*10) AS "densityManHours"
            FROM public."entomologicalLarvicidalLists" EL
            LEFT JOIN 
            (
                select * from public."vEntomologicalDataCounts" 
                 where lower("mosquitoType") like '%culex%' and lower("fixedOrRandom") like '%fixed%'
            ) ED1
            ON EL.id=ED1.id
            LEFT JOIN 
            (
                select * from public."vEntomologicalDataCounts" 
                 where lower("mosquitoType") like '%culex%' and lower("fixedOrRandom") like '%random%'
            ) ED2
            ON EL.id=ED2.id
            left join public.districts D on D.id = EL."districtId"
            left join public.facilities F on F.id = EL."facilityId"
            left join public."subCenters" SB on SB.id = EL."subCenterId"
            left join public.talukas T on T.id = EL."talukaId"
            left join public.villages V on V.id = EL."villageId"
            where 1=1
${districtId} ${year} 
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

    const LarvalDensityReportUnitDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  E."districtId" = ${req.body.districtId}`
            var year = `and year =  ${req.body.year}`
            var month = `and month =  ${req.body.month}`
            var nameOfUnit = `and E."nameOfUnit" =  ${req.body.nameOfUnit}`




            if (req.body.districtId.length == 0) {
                districtId = ""
            }
            if (req.body.year.length == 0) {
                year = ""
            }
            if (req.body.month.length == 0) {
                month = ""
            }
            if (req.body.nameOfUnit.length == 0) {
                nameOfUnit = ""
            }

            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select E."year",E."month",E."districtId",D."districtName",
"nameOfUnit" AS "nameOfUnitId",VC."nameOfControlUnit",
sum("breedingPlacesChecked"::integer) AS "breedingPlacesChecked",
sum("noOfPosVePlaceForPupae") AS "noOfPosVePlaceForPupae",
sum("noOfPosVePlaceIIIandIVStage") AS "noOfPosVePlaceIIIandIVStage",
sum("totalNoOfDipsTaken") AS "totalNoOfDipsTaken",
sum("totalCulexLarvaeCount1to4Stage") AS "totalCulexLarvaeCount1to4Stage",
sum("totalAnLarvaeCount") AS "totalAnLarvaeCount",
sum("totalCulexPupaeCount") AS "totalCulexPupaeCount",
sum(("totalCulexLarvaeCount1to4Stage"/(CASE "totalNoOfDipsTaken"
	WHEN 0 Then NULL ELSE "totalNoOfDipsTaken" END))*100) AS "AverageNoCulexLarva",
sum(("totalAnLarvaeCount"/(CASE "totalNoOfDipsTaken"
	WHEN 0 Then NULL ELSE "totalNoOfDipsTaken" END))*100) AS "AverageNoAnoLarva",
sum(("totalCulexPupaeCount"/(CASE "totalNoOfDipsTaken"
	WHEN 0 Then NULL ELSE "totalNoOfDipsTaken" END))*100) AS "AverageNoPupae"
from public."entomologicalLarvicidalLists" E
left join public.districts D on D.id = E."districtId"
LEFT JOIN public."verticalControlUnits" VC ON VC.id=E."nameOfUnit"
where 1=1
 ${year} ${month}  ${districtId}  ${nameOfUnit}
 group by "year","month",E."districtId",D."districtName",
 "nameOfUnit" ,VC."nameOfControlUnit"
 
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

    const LarvalDensityReportRuralDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  E."districtId" = ${req.body.districtId}`
            var year = `and year =  ${req.body.year}`
            var month = `and month =  ${req.body.month}`
            var nameOfUnit = `and  E."nameOfUnit" =  ${req.body.nameOfUnit}`




            if (req.body.districtId.length == 0) {
                districtId = ""
            }
            if (req.body.year.length == 0) {
                year = ""
            }
            if (req.body.month.length == 0) {
                month = ""
            }
            if (req.body.nameOfUnit.length == 0) {
                nameOfUnit = ""
            }

            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select E."year",E."month",E."districtId",D."districtName",
            "nameOfUnit" AS "nameOfUnitId",VC."nameOfControlUnit",
            sum("breedingPlacesChecked"::integer) AS "breedingPlacesChecked",
            sum("noOfPosVePlaceForPupae") AS "noOfPosVePlaceForPupae",
            sum("noOfPosVePlaceIIIandIVStage") AS "noOfPosVePlaceIIIandIVStage",
            sum("totalNoOfDipsTaken") AS "totalNoOfDipsTaken",
            sum("totalCulexLarvaeCount1to4Stage") AS "totalCulexLarvaeCount1to4Stage",
            sum("totalAnLarvaeCount") AS "totalAnLarvaeCount",
            sum("totalCulexPupaeCount") AS "totalCulexPupaeCount",
            sum(("totalCulexLarvaeCount1to4Stage"/(CASE "totalNoOfDipsTaken"
                WHEN 0 Then NULL ELSE "totalNoOfDipsTaken" END))*100) AS "AverageNoCulexLarva",
            sum(("totalAnLarvaeCount"/(CASE "totalNoOfDipsTaken"
                WHEN 0 Then NULL ELSE "totalNoOfDipsTaken" END))*100) AS "AverageNoAnoLarva",
            sum(("totalCulexPupaeCount"/(CASE "totalNoOfDipsTaken"
                WHEN 0 Then NULL ELSE "totalNoOfDipsTaken" END))*100) AS "AverageNoPupae"
            from public."entomologicalLarvicidalLists" E
            left join public.districts D on D.id = E."districtId"
            LEFT JOIN public."verticalControlUnits" VC ON VC.id=E."nameOfUnit"
where 1=1
 ${year} ${month}  ${districtId}  ${nameOfUnit}
 and E."villageId" is not null
 group by "year","month",E."districtId",D."districtName",
 "nameOfUnit" ,VC."nameOfControlUnit"
 
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

    const NFCUMosquitoDisectionReportUnitDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  E."districtId" = ${req.body.districtId}`
            var year = `and year =  ${req.body.year}`
            var month = `and month =  ${req.body.month}`
            var nameOfUnit = `and E."nameOfUnit" =  ${req.body.nameOfUnit}`




            if (req.body.districtId.length == 0) {
                districtId = ""
            }
            if (req.body.year.length == 0) {
                year = ""
            }
            if (req.body.month.length == 0) {
                month = ""
            }
            if (req.body.nameOfUnit.length == 0) {
                nameOfUnit = ""
            }

            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select 'Culex' AS "Species", "year","month",E."districtId",D."districtName",
            "nameOfUnit" AS "nameOfUnitId",V."nameOfControlUnit",
            SUM("mosqDissectedCulexQui"::integer) AS "mosqDissectedCulexQui",
            SUM("totalNoPositiveMosq1to3Stage") AS "totalNoPositiveMosq1to3Stage",
            SUM("totalNoPositiveMosq3Stage") AS "totalNoPositiveMosq3Stage",
            SUM(("totalNoPositiveMosq1to3Stage"/(CASE "mosqDissectedCulexQui"::integer
                WHEN 0 Then NULL ELSE "mosqDissectedCulexQui"::integer END))*100) AS "PercentageInfected",
            SUM(("totalNoPositiveMosq3Stage"/(CASE "mosqDissectedCulexQui"::integer
                WHEN 0 Then NULL ELSE "mosqDissectedCulexQui"::integer END))*100) AS "PercentageInfectivity",
            SUM(("totalNoPositiveMosq3Stage"/(CASE "totalCulexLarvaeCount1to4Stage"
                WHEN 0 Then NULL ELSE "totalCulexLarvaeCount1to4Stage" END))*100) AS "AverageNoLarva"
            from public."entomologicalLarvicidalLists" E
            left join public.districts D on D.id = E."districtId"
            LEFT JOIN public."verticalControlUnits" V ON V.id=E."nameOfUnit"
where 1=1
 ${year} ${month}  ${districtId}  ${nameOfUnit}
 group by "year","month",E."districtId",D."districtName",
 "nameOfUnit" ,V."nameOfControlUnit"
 
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


    const NFCUMosquitoDisectionReportRuralDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var districtId = `and  E."districtId" = ${req.body.districtId}`
            var year = `and year =  ${req.body.year}`
            var month = `and month =  ${req.body.month}`
            var nameOfUnit = `and E."nameOfUnit" =  ${req.body.nameOfUnit}`




            if (req.body.districtId.length == 0) {
                districtId = ""
            }
            if (req.body.year.length == 0) {
                year = ""
            }
            if (req.body.month.length == 0) {
                month = ""
            }
            if (req.body.nameOfUnit.length == 0) {
                nameOfUnit = ""
            }

            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select 'Culex' AS "Species", "year","month",E."districtId",D."districtName",
            "nameOfUnit" AS "nameOfUnitId",VC."nameOfControlUnit",
            SUM("mosqDissectedCulexQui"::integer) AS "mosqDissectedCulexQui",
            SUM("totalNoPositiveMosq1to3Stage") AS "totalNoPositiveMosq1to3Stage",
            SUM("totalNoPositiveMosq3Stage") AS "totalNoPositiveMosq3Stage",
            SUM(("totalNoPositiveMosq1to3Stage"/(CASE "mosqDissectedCulexQui"::integer
                WHEN 0 Then NULL ELSE "mosqDissectedCulexQui"::integer END))*100) AS "PercentageInfected",
            SUM(("totalNoPositiveMosq3Stage"/(CASE "mosqDissectedCulexQui"::integer
                WHEN 0 Then NULL ELSE "mosqDissectedCulexQui"::integer END))*100) AS "PercentageInfectivity",
            SUM(("totalNoPositiveMosq3Stage"/(CASE "totalCulexLarvaeCount1to4Stage"
                WHEN 0 Then NULL ELSE "totalCulexLarvaeCount1to4Stage" END))*100) AS "AverageNoLarva"
            from public."entomologicalLarvicidalLists" E
            left join public.districts D on D.id = E."districtId"
            LEFT JOIN public."verticalControlUnits" VC ON VC.id=E."nameOfUnit"
where 1=1
 ${year} ${month}  ${districtId}  ${nameOfUnit}
 and E."villageId" is not null
 group by "year","month",E."districtId",D."districtName",
"nameOfUnit" ,VC."nameOfControlUnit"
 
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

        LarvicidalReport1Dao,
        NFCUReportEntomology1Dao,
        AdditionalEntomologicalReportDao,
        BaselineEntomoligicalReportDao,
        LarvalDensityReportUnitDao,
        LarvalDensityReportRuralDao,
        NFCUMosquitoDisectionReportUnitDao,
        NFCUMosquitoDisectionReportRuralDao

    };
};
export default entomologyReportDao();