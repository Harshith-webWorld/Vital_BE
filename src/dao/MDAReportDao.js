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
const MDAReportDao = () => {

    const StateLvlDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}


            var year = `and Year=  ${req.body.year}`
            var start_month = `and  M."month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth}`

            if (req.body.startMonth.length == 0) {
                start_month = `and  M."month" BETWEEN 1 `
            }
            if (req.body.endMonth.length == 0) {
                end_month = `and 12`
            }


            if (req.body.year.length == 0) {
                year = ""
            }


            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
           
            select SUM("batchesOfTrainingOrganizedMDAIDA") AS "batchesOfTrainingOrganizedMDAIDA",
            SUM("totalStaffSanctioned") AS "totalStaffSanctioned",SUM(0) as "NoOfVacantPositions",
            SUM("numberTrainedForMDAIDA") AS "numberTrainedForMDAIDA",
            SUM("batchesOfTrainingOrganizedMMDP") AS "batchesOfTrainingOrganizedMMDP",
            SUM("numberTrainedForMMDP") AS "numberTrainedForMMDP",
            (SUM("batchesOfTrainingOrganizedMDAIDA")+SUM("batchesOfTrainingOrganizedMMDP")) AS "batchesOfTrainingOrganized",
            (SUM("numberTrainedForMDAIDA")+SUM("numberTrainedForMMDP")) AS "numberTrained"
            from "preMDAActivities" M
        where M."isActive"=true
        ${year} ${start_month} ${end_month}
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

    const CHCLvlDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}


            var year = `and Year =  ${req.body.year}`

            var start_month = `and  M."month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth}`

            if (req.body.startMonth.length == 0) {
                start_month = `and  M."month" BETWEEN 1 `
            }
            if (req.body.endMonth.length == 0) {
                end_month = `and 12`
            }

            if (req.body.year.length == 0) {
                year = ""
            }


            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`           
            select M."facilityId",F."facilityName",SUM("batchesOfTrainingOrganizedMDAIDA") AS "batchesOfTrainingOrganizedMDAIDA",
            SUM("totalStaffSanctioned") AS "totalStaffSanctioned",SUM(0) as "NoOfVacantPositions",
            SUM("numberTrainedForMDAIDA") AS "numberTrainedForMDAIDA",
            SUM("batchesOfTrainingOrganizedMMDP") AS "batchesOfTrainingOrganizedMMDP",
            SUM("numberTrainedForMMDP") AS "numberTrainedForMMDP",
            (SUM("batchesOfTrainingOrganizedMDAIDA")+SUM("batchesOfTrainingOrganizedMMDP")) AS "batchesOfTrainingOrganized",
            (SUM("numberTrainedForMDAIDA")+SUM("numberTrainedForMMDP")) AS "numberTrained"
            from "preMDAActivities" M
            left join public.facilities F ON F.id=M."facilityId"
			where M."isActive"=true and COALESCE(M."facilityId",0)>0
        ${year} ${start_month} ${end_month}
        group by M."facilityId",F."facilityName"
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

    const subCenterLvlDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}


            var year = `and Year=  ${req.body.year}`
            var start_month = `and  M."month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth}`

            if (req.body.startMonth.length == 0) {
                start_month = `and  M."month" BETWEEN 1 `
            }
            if (req.body.endMonth.length == 0) {
                end_month = `and 12`
            }


            if (req.body.year.length == 0) {
                year = ""
            }



            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`           
            select M."subCenterId",S."subCenterName",SUM("batchesOfTrainingOrganizedMDAIDA") AS "batchesOfTrainingOrganizedMDAIDA",
SUM("totalStaffSanctioned") AS "totalStaffSanctioned",SUM(0) as "NoOfVacantPositions",
SUM("numberTrainedForMDAIDA") AS "numberTrainedForMDAIDA",
SUM("batchesOfTrainingOrganizedMMDP") AS "batchesOfTrainingOrganizedMMDP",
SUM("numberTrainedForMMDP") AS "numberTrainedForMMDP",
(SUM("batchesOfTrainingOrganizedMDAIDA")+SUM("batchesOfTrainingOrganizedMMDP")) AS "batchesOfTrainingOrganized",
(SUM("numberTrainedForMDAIDA")+SUM("numberTrainedForMMDP")) AS "numberTrained"
from "preMDAActivities" M
left join public."subCenters" S ON S.id=M."subCenterId"
where M."isActive"=true and COALESCE(M."subCenterId",0)>0 
        ${year}  ${start_month} ${end_month}
        group by M."subCenterId",S."subCenterName"
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

    const coverageReport1Dao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            // var year = `and date_part('Year',M."createdAt") =  ${req.body.year}`
            // var month = `and date_part('month',M."createdAt") = ${req.body.month}`


            var year = `and Year =  ${req.body.year}`
            var start_month = `and  M."month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth}`

            if (req.body.startMonth.length == 0) {
                start_month = `and  M."month" BETWEEN 1 `
            }
            if (req.body.endMonth.length == 0) {
                end_month = `and 12`
            }


            if (req.body.year.length == 0) year = ''
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`select A.*,
           ((A."noOfPeopleRceivedDrug"/(CASE A."eligiblePopulation"
               WHEN 0 Then NULL ELSE A."eligiblePopulation" END))*100) AS "percentPeopleReceived",
            ((A."noOfPeopleConsumedDrug"/(CASE A."eligiblePopulation"
               WHEN 0 Then NULL ELSE A."eligiblePopulation" END))*100) AS "percentPeopleConsumed"
           from(select M."districtId",D."districtName",'' AS "datesOfMDA",
           SUM(M."totalPopulation") AS "totalPopulation",SUM(M."eligiblePopulation") AS "eligiblePopulation", 
           (SUM(RL."noOfPeopleAdministered"::INTEGER ) + SUM(ML."noOfPeopleAdministered")) AS "noOfPeopleRceivedDrug",
               0 As "noOfPeopleConsumedDrug" 
           from public."mdaIDACoverages" M 
           LEFT JOIN public."mdaIDACoverageRegularLists" RL ON M.id=RL."mdaIDACoverageId"
           LEFT JOIN public."mdaIDACoverageMopUpLists" ML ON M.id=ML."mdaIDACoverageId"
           LEFT JOIN public.districts D ON D.id=M."districtId" 
           where M."isActive"=true
            ${year} ${start_month} ${end_month}
           group by M."districtId",D."districtName")A`).then(([results, metadata]) => {

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

    const infrastructureDao = async (req) => {
        try {
            return new Promise(async function (resolve) {
                var response = {}
                // console.log("req body",req.body)
                var year = ''
                var fyear = ''
                var facilityId = ''
                var subCenterId = ""
                var subCenterId1 = ""
                var subCenterId2 = ""
                var talukaId = ''
                var districtId = ''

                var start_month = `and  month BETWEEN ${req.body.startMonth} `
                var end_month = `and  ${req.body.endMonth}`

                if (req.body.startMonth.length == 0) {
                    start_month = `and  month BETWEEN 1`
                }
                if (req.body.endMonth.length == 0) {
                    end_month = `and 12`
                }
                if (!req.body.facilityId.length == 0) {
                    facilityId = `and "facilityId" = ${req.body.facilityId}`
                }
                if (!req.body.talukaId.length == 0) {
                    talukaId = `and "facilityId" = ${req.body.talukaId}`
                }
                if (!req.body.districtId.length == 0) {
                    districtId = `and "districtId" = ${req.body.districtId}`
                }
                if (!req.body.subCenterId.length == 0) {
                    subCenterId = `and "subCenterId" = ${req.body.subCenterId}`
                    subCenterId1 = `and P."subCenterId" = ${req.body.subCenterId}`
                    subCenterId2 = `and L1."subCenterId" = ${req.body.subCenterId}`

                }
                if (!req.body.year.length == 0) {
                    year = `and year=  ${req.body.year}`
                    fyear = `and year =  ${req.body.year}`
                }



                // const page = req.page ? req.page : 1;
                // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                // const offset = (page - 1) * itemsPerPage;
            const subcentre = db.sequelize.query(`select  COALESCE(B1."subCenterId",A3."subCenterId") "subCenterId",
                D."districtName",F."facilityName",S."subCenterName",
                COALESCE(B1."facilityId",A3."facilityId") "facilityId",
                COALESCE(B1."districtId",A3."districtId") "districtId",
                COALESCE(B1."NoOfCentresWithSkilledStaff",0) "NoOfCentresWithSkilledStaff", 
                COALESCE(B1."NoOfFilariaPatientsManaged",0) "NoOfFilariaPatientsManaged", 
                COALESCE(A3."NoOfFilarialHydroceleOperations",0) "NoOfFilarialHydroceleOperations"
                from
                (Select COALESCE(A1."subCenterId",A2."subCenterId") "subCenterId",COALESCE(A1."facilityId",A2."facilityId") "facilityId",
                COALESCE(A1."districtId",A2."districtId") "districtId",A1."NoOfCentresWithSkilledStaff", A2."NoOfFilariaPatientsManaged" 
                from (select count(P.id) AS "NoOfCentresWithSkilledStaff" , P."subCenterId",P."facilityId",P."districtId" from public."preMDAActivities" P
                where ("numberTrainedForMMDP" is not null or "numberTrainedForMDAIDA" is not null)
                and  P."isActive"=true and P."subCenterId" <> COALESCE(NULL,0)
                ${year} ${start_month} ${end_month} ${subCenterId} ${facilityId} ${talukaId} ${districtId}
                group by P."subCenterId",P."facilityId",P."districtId"
                ) A1 full outer join
                (select count(L1.id) AS "NoOfFilariaPatientsManaged",  L1."subCenterId",L1."facilityId",L1."districtId" from public."lymphedemaLineLists" L1
                where  L1."isActive"=true and L1."subCenterId" <> COALESCE(NULL,0)
                ${year} ${start_month} ${end_month} ${subCenterId}  ${facilityId} ${talukaId} ${districtId}
                group by L1."subCenterId",L1."facilityId",L1."districtId"
                ) A2 on A1."subCenterId"=A2."subCenterId"
                )B1 full outer join
                (select count(L.id) AS "NoOfFilarialHydroceleOperations",L."subCenterId",L."facilityId",L."districtId" from public."lymphedemaLineLists" L
                left join (select * from public."lymphedemaLineListFollowUpsHFs" HF where HF."isSurgeryDone"=true)
                HF1 on HF1."lymphedemaLineListId" = L.id
                where L."diseaseType" like '%Hydrocele%'
                and L."isActive"=true and L."subCenterId" <> COALESCE(NULL,0)
                ${year} ${start_month} ${end_month} ${subCenterId}  ${facilityId} ${talukaId} ${districtId}
                group by L."subCenterId",L."facilityId",L."districtId"
                ) A3  ON B1."subCenterId"=A3."subCenterId"
                left join public."subCenters" S on S.id=COALESCE(B1."subCenterId",A3."subCenterId")
                left join public."facilities" F on F.id=COALESCE(B1."facilityId",A3."facilityId")
                left join public.districts D on D.id=COALESCE(B1."districtId",A3."districtId");`).then(([results, metadata]) => {
                    return results
                })
            const phc = db.sequelize.query(`select  COALESCE(B1."facilityId",A3."facilityId") "facilityId",
                COALESCE(B1."districtId",A3."districtId") "districtId",
                D."districtName",F."facilityName",
                COALESCE(B1."NoOfCentresWithSkilledStaff",0) "NoOfCentresWithSkilledStaff", 
                COALESCE(B1."NoOfFilariaPatientsManaged",0) "NoOfFilariaPatientsManaged", 
                COALESCE(A3."NoOfFilarialHydroceleOperations",0) "NoOfFilarialHydroceleOperations"
                from
                (Select COALESCE(A1."facilityId",A2."facilityId") "facilityId",
                COALESCE(A1."districtId",A2."districtId") "districtId",
                A1."NoOfCentresWithSkilledStaff", A2."NoOfFilariaPatientsManaged" 
                from (select count(P.id) AS "NoOfCentresWithSkilledStaff" , P."facilityId",P."districtId" from public."preMDAActivities" P
                where ("numberTrainedForMMDP" is not null or "numberTrainedForMDAIDA" is not null)
                and  P."isActive"=true and P."facilityId" <> COALESCE(NULL,0)
                ${year} ${start_month} ${end_month} ${facilityId} ${talukaId} ${districtId}
                group by P."facilityId",P."districtId"
                ) A1 full outer join
                (select count(id) AS "NoOfFilariaPatientsManaged", L1."facilityId",L1."districtId" from public."lymphedemaLineLists" L1
                where  L1."isActive"=true and L1."facilityId" <> COALESCE(NULL,0)
                ${year} ${start_month} ${end_month} ${facilityId} ${talukaId} ${districtId}
                group by L1."facilityId",L1."districtId"
                ) A2 on A1."facilityId"=A2."facilityId"
                )B1 full outer join
                (select count(L.id) AS "NoOfFilarialHydroceleOperations",L."facilityId",L."districtId" from public."lymphedemaLineLists" L
                left join (select * from public."lymphedemaLineListFollowUpsHFs" HF where HF."isSurgeryDone"=true)
                HF1 on HF1."lymphedemaLineListId" = L.id
                where L."diseaseType" like '%Hydrocele%'
                and L."isActive"=true and L."facilityId" <> COALESCE(NULL,0)
                ${year} ${start_month} ${end_month} ${facilityId} ${talukaId} ${districtId}
                group by L."facilityId",L."districtId"
                ) A3  ON B1."facilityId"=A3."facilityId"
                left join public."facilities" F on F.id=COALESCE(B1."facilityId",A3."facilityId")
                left join public.districts D on D.id=COALESCE(B1."districtId",A3."districtId");`).then(([results, metadata]) => {
                    return results
                })
            const state = db.sequelize.query(`Select A1."NoOfCentresWithSkilledStaff", A2."NoOfFilariaPatientsManaged" , A3."NoOfFilarialHydroceleOperations"
                from (select 14 as id, count(P.id) AS "NoOfCentresWithSkilledStaff" from public."preMDAActivities" P
                where ("numberTrainedForMMDP" is not null or "numberTrainedForMDAIDA" is not null)
                and  P."isActive"=true and P."facilityId" <> COALESCE(NULL,0)
                ${year} ${start_month} ${end_month}
                ) A1 left join
                (select 14 as id, count(id) AS "NoOfFilariaPatientsManaged" from public."lymphedemaLineLists" L1
                where  L1."isActive"=true
                ${year} ${start_month} ${end_month}
                 ) A2 on A1."id"=A2."id"
                left join
                (select 14 as id, count(L.id) AS "NoOfFilarialHydroceleOperations" from public."lymphedemaLineLists" L
                left join (select * from public."lymphedemaLineListFollowUpsHFs" HF where HF."isSurgeryDone"=true)
                HF1 on HF1."lymphedemaLineListId" = L.id
                where L."diseaseType" like '%Hydrocele%'
                and L."isActive"=true 
                ${year} ${start_month} ${end_month}
                ) A3  ON A1."id"=A3."id"`).then(([results, metadata]) => {
                    return results
                })
                Promise
                    .all([subcentre, phc, state]).then(data => {
                        response.error = false
                        var obj = {}
                        obj.subcentre = data[0]
                        obj.phc = data[1]
                        obj.state = data[2]
                        response.data = obj
                    }).catch((error) => {
                        console.log(error)
                        response.error = true
                    })
                    .finally(() => {
                        resolve(response)
                    })
            })
        } catch (e) {
            console.log("error", error)
        }
    }


    const analysis1_postMDAEvaluationDao = (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var year = ''
            var month = ''
            var districtId = ''
            var facilityId = ''
            var subCenterId = ''
            var wardId = ''
            var villageId = ''
            var nameOfInvestigator = ''


            req.year && req.year.length > 0 && (year = `and year = ${req.year}`)
            req.districtId && req.districtId.length > 0 && (districtId = `and M."districtId" = ${req.districtId}`)
            req.facilityId && req.facilityId.length > 0 && (facilityId = `and M."facilityId" = ${req.facilityId}`)
            req.subCenterId && req.subCenterId.length > 0 && (subCenterId = `and M."subCenterId" = ${req.subCenterId}`)
            req.wardId && req.wardId.length > 0 && (wardId = `and M."wardId" = ${req.wardId}`)
            req.nameOfInvestigator && req.nameOfInvestigator.length > 0 && (nameOfInvestigator = `and M."nameOfInvestigator" = '${req.nameOfInvestigator}'`)
            req.villageId && req.villageId.length > 0 && (villageId = `and M."villageId" = ${req.villageId}`)

            var start_month = `and  M."month" BETWEEN ${req.startMonth} `
            var end_month = `and  ${req.endMonth}`

            if (req.startMonth.length == 0) {
                start_month = `and  M."month" BETWEEN 1 `
            }
            if (req.endMonth.length == 0) {
                end_month = `and 12`
            }

            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`select  M.Id, M."districtId",D."districtName" , M."facilityId", F."facilityName",
M."subCenterId",S."subCenterName" ,M."wardId", W."wardName", M."villageId",
V."villageName",M."nameOfInvestigator",M."totalMembersInFamily" AS "NoOfPersonsInterviewed",
count(P."namePersonsEligibleForMDA") AS "NoOfBeneficiaries",
Sum(P."noOfDECTabletsConsumed") AS "NoOfPersonsConsumed",
Sum(P."noOfDECTabletsRecovered") AS "NoOfPersonsNotConsumed",
0 AS "percentageConsumption",
"isDrugAdministeredInHouse" AS "DidDDVisitHouse",
0 AS "PercentageOfHousesVisited",
"resonForNotSwallowDrug",
"reservationDrugAdmin" AS "OpinionOfBeneficiariesDD",
"sourceOfInformation",
0 AS "NoOfBenefExpSideEffect",
"deatilsOfSideEffects",
0 AS "NoOfBenefAwareTreat"
from public."postMDAEvalLists" M
LEFT JOIN public."postMDAEvalListPersons" P
ON P."postMDAEvalListId"=M.id
left join public.districts D on D.id = M."districtId"
left join public.facilities F on F.id = M."facilityId"
left join public."subCenters" S on S.id = M."subCenterId"
left join public.villages V on V.id = M."villageId"
left join public.wards W on W.id = M."wardId"
 Where  M."isActive"=true 
 ${year} ${start_month} ${end_month} ${districtId} ${facilityId} ${subCenterId} ${wardId} ${villageId} ${nameOfInvestigator}
group by M."id",M."districtId",D."districtName" , M."facilityId", F."facilityName",
M."subCenterId",S."subCenterName" ,M."wardId", W."wardName", M."villageId",
V."villageName", M."districtId", M."facilityId", M."subCenterId",M."wardId", M."villageId"
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


    const analysis2_postMDAEvaluationDao = (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var year = ''
            var month = ''
            var districtId = ''
            var facilityId = ''
            var subCenterId = ''
            var wardId = ''
            var villageId = ''
            var nameOfInvestigator = ''


            req.year.length > 0 && (year = `and year = ${req.year}`)
            req.districtId.length > 0 && (districtId = `and M."districtId" = ${req.districtId}`)
            req.facilityId.length > 0 && (facilityId = `and M."facilityId" = ${req.facilityId}`)
            req.subCenterId.length > 0 && (subCenterId = `and M."subCenterId" = ${req.subCenterId}`)
            req.wardId.length > 0 && (wardId = `and M."wardId" = ${req.wardId}`)
            req.villageId.length > 0 && (villageId = `and M."villageId" = ${req.villageId}`)
            req.nameOfInvestigator.length > 0 && (nameOfInvestigator = `and M."nameOfInvestigator" = '${req.nameOfInvestigator}'`)
            var start_month = `and  M."month" BETWEEN ${req.startMonth} `
            var end_month = `and  ${req.endMonth}`

            if (req.startMonth.length == 0) {
                start_month = `and  M."month" BETWEEN 1 `
            }
            if (req.endMonth.length == 0) {
                end_month = `and 12`
            }



            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`select   M."districtId",D."districtName" , M."facilityId", F."facilityName",
M."subCenterId",S."subCenterName" ,M."wardId", W."wardName", M."villageId",
V."villageName",M."nameOfInvestigator",'' AS "designationOfInvestigator",
0 AS "populationOfVillage",Count(M.id) AS "noOfHousesSurveyed",
Sum(M."totalMembersInFamily") AS "totalNoOfPersonInHouse",
Count(P."namePersonsEligibleForMDA") AS "totalNoOfBeneficiaries",
(Sum(P."noOfDECTabletsConsumed") + Sum(P."noOfDECTabletsRecovered")) AS "totalNoOfPersonsRecived",
Sum(P."noOfDECTabletsConsumed") AS "totalNoOfPersonsConsumed",
Sum(P."noOfDECTabletsRecovered") AS "totalNoOfPersonsNotConsumed",
0 as "percentageOfCoverage", 0 AS "percentageConsumption",0 as "districtReportedCoverage",
Count(CASE WHEN M."isDrugAdministeredInHouse" =true THEN 1 ELSE NULL END) as "noOfHousesDDVisited",
0 AS "PercentageOfHousesVisited",
Count(CASE WHEN M."isDrugSwallowInDDPresence" =true THEN 1 ELSE NULL END) as "noOfPersonsSwallowInPresence",
0 AS "PercentageOfPersonsSwallowInPresence",
Count(CASE WHEN M."resonForNotSwallowDrug" IS NOT NULL THEN 1 ELSE NULL END) as "resonForNotSwallowDrug",
--"resonForNotSwallowDrug",
Count(CASE WHEN M."reservationDrugAdmin" IS NOT NULL THEN 1 ELSE NULL END) as "opinionOfBeneficiariesDD",
--"reservationDrugAdmin" AS "OpinionOfBeneficiariesDD",
Count(CASE WHEN M."sourceOfInformation" IS NOT NULL THEN 1 ELSE NULL END) as "sourceOfInformation",
--"sourceOfInformation",
Count(CASE WHEN M."isYouExperienceSideEffects" IS NOT NULL THEN 1 ELSE NULL END)  AS "noOfBenefExpSideEffect",
--"deatilsOfSideEffects","isYouExperienceSideEffects"
0 AS "NoOfBenefAwareTreat"
from public."postMDAEvalLists" M
LEFT JOIN public."postMDAEvalListPersons" P
ON P."postMDAEvalListId"=M.id
left join public.districts D on D.id = M."districtId"
left join public.facilities F on F.id = M."facilityId"
left join public."subCenters" S on S.id = M."subCenterId"
left join public.villages V on V.id = M."villageId"
left join public.wards W on W.id = M."wardId"
where M."isActive"=true
${year}  ${districtId} ${facilityId} ${subCenterId} ${wardId} ${villageId} ${nameOfInvestigator}
group by M."districtId",D."districtName" , M."facilityId", F."facilityName",
M."subCenterId",S."subCenterName" ,M."wardId", W."wardName", M."villageId",
V."villageName",M."nameOfInvestigator"

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

    const Co_ordinationCommitteReportDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}


            var year = `and Year =  ${req.body.year}`
            var start_month = `and  M."month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth}`
            var districtId = `and M."districtId" = ${req.body.districtId}`
            if (req.body.startMonth.length == 0) {
                start_month = `and  M."month" BETWEEN 1 `
            }
            if (req.body.endMonth.length == 0) {
                end_month = `and 12`
            }

            if (req.body.districtId.length == 0) {
                districtId = ''
            }
            if (req.body.year.length == 0) {
                year = ""
            }


            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;
        //     db.sequelize.query(`SELECT
        //     "districtId",
        //     '' AS "designationOfMembers",
        //     "dateDistrictCoordComitte" AS "dateOfFirstDCCMeeting"
        //   FROM public."mdaIECActivities" M
        //   WHERE "statementOfFundsAllotted" = (SELECT
        //     id
        //   FROM public."udCategoryOptions" M
        //   WHERE "categoryCode" = 1009
        //   AND "categoryOptionCode" = 'DCCF')
        //   ${start_month} ${end_month}  ${year} ${districtId}
        //   UNION
        //   SELECT
        //     "districtId",
        //     '' AS "designationOfMembers",
        //     "dateDistrictCoordComitte" AS "dateOfFirstDCCMeeting"
        //   FROM public."mdaIECActivities" M
        //   WHERE "statementOfFundsAllotted" = (SELECT
        //     id
        //   FROM public."udCategoryOptions" M
        //   WHERE "categoryCode" = 1009
        //   AND "categoryOptionCode" = 'DCCS')
        //   ${start_month} ${end_month}  ${year} ${districtId}
        //   `)
            db.sequelize.query(`
           
            select DCC1."districtId",DCC1."designationOfMembers",
            DCC1."dateOfFirstDCCMeeting",DCC2."dateOfSecondDCCMeeting" from 
            (
                select 33 as "districtId",'' AS "designationOfMembers","dateDistrictCoordComitte" AS "dateOfFirstDCCMeeting" 
                from public."mdaIECActivities" M
                where "statementOfFundsAllotted"= (select id from public."udCategoryOptions" M 
                                               where "categoryCode"=1009 and "categoryOptionCode"='DCCF')
            ${start_month} ${end_month}  ${year} ${districtId}

            )DCC1 
            FULL JOIN 
            (
                select M."districtId",M."dateDistrictCoordComitte" AS "dateOfSecondDCCMeeting" 
                        from public."mdaIECActivities" M  
                        where M."statementOfFundsAllotted"= (select id from public."udCategoryOptions" U
                                            where U."categoryCode"=1009 and U."categoryOptionCode"='DCCS')
                                            ${start_month} ${end_month} ${year} ${districtId}

             )DCC2 ON DCC1."districtId"=DCC2."districtId"
	`)
    .then(([results, metadata]) => {

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





    const DEC100MgDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}


            var year = `and  P.Year=  ${req.body.year}`
            var month = `and P.month = ${req.body.month}`



            if (req.body.year.length == 0) {
                year = ""
            }
            if (req.body.month == 0) {
                month = ""
            }


            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
           
            select "nameOfTablet","year","month",sum("quantityTabletInStockBeforeRound") AS "tabletInStockBeforeRound",
            sum("quantityOfTabletReceivedForRound") AS "tabletReceivedForRound",
            string_agg("sourceFromTabletReceivedForRound", ',') AS "sourceFromTabletReceived",
            sum("quantityOfTabletsDestroyedDuringRound") AS "tabletsDestroyedDuringRound",
            string_agg("reasonForTabletsDestroyed",',') AS "reasonForTabletsDestroyed",
            sum("quantityOfBalanceTabletsInStock") AS "tabletsBalanceInStock",
            string_agg(concat("batchNumberOfTabletInStock",'/',to_char("dateOfExpiryTabletInStock",'DD-MM-YYYY')), ',') AS "BatchAndExp",
            sum("quantityTabletRquireForMDA") 
            from public."preMDAActivities" P
            left join public."preMDAActivityDrugLogistics" PD ON PD."preMDAActivityId"=P.id
            where "nameOfTablet" like '%DEC%'
            and P."isActive"=true
${month} ${year}
            group by "nameOfTablet","year","month"
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

    const AlbendazoleDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}


            var year = `and  P.Year =  ${req.body.year}`
            var month = `and P.month = ${req.body.month}`



            if (req.body.year.length == 0) {
                year = ""
            }
            if (req.body.month == 0) {
                month = ""
            }


            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
           
            select "nameOfTablet","year","month",sum("quantityTabletInStockBeforeRound") AS "tabletInStockBeforeRound",
            sum("quantityOfTabletReceivedForRound") AS "tabletReceivedForRound",
            string_agg("sourceFromTabletReceivedForRound", ',') AS "sourceFromTabletReceived",
            sum("quantityOfTabletsDestroyedDuringRound") AS "tabletsDestroyedDuringRound",
            string_agg("reasonForTabletsDestroyed",',') AS "reasonForTabletsDestroyed",
            sum("quantityOfBalanceTabletsInStock") AS "tabletsBalanceInStock",
            string_agg(concat("batchNumberOfTabletInStock",'/',to_char("dateOfExpiryTabletInStock",'DD-MM-YYYY')), ',') AS "BatchAndExp",
            sum("quantityTabletRquireForMDA") 
            from public."preMDAActivities" P
            left join public."preMDAActivityDrugLogistics" PD ON PD."preMDAActivityId"=P.id
            where "nameOfTablet" like '%Albendazole%'
            and P."isActive"=true
${year} ${month}
            group by "nameOfTablet","year","month"
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


    const MactizinDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}


            var year = `and P.Year=  ${req.body.year}`
            var month = `and P.month = ${req.body.month}`



            if (req.body.year.length == 0) {
                year = ""
            }
            if (req.body.month == 0) {
                month = ""
            }


            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
           
            select "nameOfTablet","year","month",sum("quantityTabletInStockBeforeRound") AS "tabletInStockBeforeRound",
sum("quantityOfTabletReceivedForRound") AS "tabletReceivedForRound",
string_agg("sourceFromTabletReceivedForRound", ',') AS "sourceFromTabletReceived",
sum("quantityOfTabletsDestroyedDuringRound") AS "tabletsDestroyedDuringRound",
string_agg("reasonForTabletsDestroyed",',') AS "reasonForTabletsDestroyed",
sum("quantityOfBalanceTabletsInStock") AS "tabletsBalanceInStock",
string_agg(concat("batchNumberOfTabletInStock",'/',to_char("dateOfExpiryTabletInStock",'DD-MM-YYYY')), ',') AS "BatchAndExp",
sum("quantityTabletRquireForMDA") 
from public."preMDAActivities" P
left join public."preMDAActivityDrugLogistics" PD ON PD."preMDAActivityId"=P.id
where "nameOfTablet" like '%Mactizin%'
and P."isActive"=true
${year} ${month}
group by "nameOfTablet","year","month"
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

    const DrugRequirementMDA2StateDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}
            var year = `and M.Year=  ${req.body.year}`
            if (req.body.year.length == 0) {
                year = ""
            }
            db.sequelize.query(
                `select M."statementOfFundsAllotted" AS "statementOfFundsAllottedId", 
                UD1."categoryOptionName" AS "statementOfFundsAllotted",
                SUM("fundAllocatedWithDate") AS "fundAllocatedWithDate",
                SUM("fundUtilisedWithDate") AS "fundUtilisedWithDate",
                SUM("fundBalanceAfterRound") AS "fundBalanceAfterRound",
                M."year",M."stateId"from public."mdaIECActivities" M
                left join public."udCategoryOptions" UD1 ON UD1.Id = M."statementOfFundsAllotted"
                where M."isActive"=true ${year} 
                group by UD1."categoryOptionName",M."statementOfFundsAllotted",M."year",M."stateId"`
            ).then(([results, metadata]) => {
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

    const DrugRequirementMDA2RdDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}


            var year = `and M.Year = ${req.body.year}`



            if (req.body.year.length == 0) {
                year = ""
            }



            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select M."statementOfFundsAllotted" AS "statementOfFundsAllottedId",
                UD1."categoryOptionName" AS "statementOfFundsAllotted",
                SUM("fundAllocatedWithDate") AS "fundAllocatedWithDate",
                SUM("fundUtilisedWithDate") AS "fundUtilisedWithDate",
                SUM("fundBalanceAfterRound") AS "fundBalanceAfterRound",
                "year"
            from public."mdaIECActivities" M
            left join public."udCategoryOptions" UD1 
            ON UD1.Id = M."statementOfFundsAllotted"
            where M."districtId" > 0
and M."isActive" = true
            ${year} 
            group by UD1."categoryOptionName", M."statementOfFundsAllotted", M."year", M."stateId"

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



    const DrugStockAtPHCDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}


            var year = `and M.year = ${req.body.year}`
            var districtId = `and M."districtId" = ${req.body.districtId}`
            var facilityId = `and M."facilityId" = ${req.body.facilityId}`
            var start_month = `and  M."month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth}`

            if (req.body.startMonth.length == 0) {
                start_month = `and  M."month" BETWEEN 1 `
            }
            if (req.body.endMonth.length == 0) {
                end_month = `and 12`
            }



            if (req.body.year.length == 0) {
                year = ""
            }

            if (req.body.districtId.length == 0) {
                districtId = ""
            }
            if (req.body.facilityId.length == 0) {
                facilityId = ""
            }


            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
                select M."districtId", M."talukaId", M."facilityId", MD."nameOfTablet",
                Sum(MD."quantityTabletRquireForMDA") AS "quantityTabletRquireForMDA",
                Sum(MD."quantityTabletInStockBeforeRound") AS "quantityTabletInStockBeforeRound",
                Sum(MD."quantityOfTabletReceivedForRound") AS "quantityOfTabletReceivedForRound",
                sum(MD."quantityOfTabletsDestroyedDuringRound") AS "quantityOfTabletsDestroyedDuringRound",
                Sum(MD."quantityOfBalanceTabletsInStock") AS "quantityOfBalanceTabletsInStock"
                from public."preMDAActivities" M
                left join public."preMDAActivityDrugLogistics" MD
                ON MD."preMDAActivityId" = M.id
                left join public.districts D on D.id = M."districtId"
                left join public.talukas T on T.id = M."talukaId"
                left join public.facilities F on F.id = M."facilityId"
                where M."isActive" = true    
                ${start_month} ${end_month}
                ${year}  ${facilityId} ${districtId}
                group by M."districtId", M."talukaId", M."facilityId", MD."nameOfTablet"
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




    const DrugAdminSupervisorAvailabilityDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}


            var year = `and P.year = ${req.body.year}`

            var districtId = `and P."districtId" = ${req.body.districtId}`
            var facilityId = `and P."facilityId" = ${req.body.facilityId}`

            var start_month = `and  P."month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth}`

            if (req.body.startMonth.length == 0) {
                start_month = `and  P."month" BETWEEN 1 `
            }
            if (req.body.endMonth.length == 0) {
                end_month = `and 12`
            }


            if (req.body.year.length == 0) {
                year = ""
            }
            if (req.body.districtId.length == 0) {
                districtId = ""
            }
            if (req.body.facilityId.length == 0) {
                facilityId = ""
            }
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select  P."districtId", P."facilityId", P."year", P."month", 
            D."districtName", F."facilityName",
            SUM(P."totalStaffSanctioned") "totalStaffSanctioned", 
            SUM(P."totalStaffsUnit") "totalStaffsUnit",
            SUM(PDA."noOfDrugAdministrator") "noOfDrugAdministrator",
            SUM(P."actualAvailableDrugAdmin") "actualAvailableDrugAdmin", 
            SUM(P."requiredSupervisors") "requiredSupervisors", 
            SUM(PDS."noOfSupervisor") "noOfSupervisor",
            SUM(P."actualAvailableSupervisor" ) "actualAvailableSupervisor" 
          from public."preMDAActivities" P
          left join public."preMDAActivityDrugAdministrators" PDA on PDA."preMDAActivityId"=P.Id
          left join public."preMDAActivitySupervisors" PDS on PDS."preMDAActivityId"=P.Id
          left join public.districts D on D.id = P."districtId"
          left join public.facilities F on F.id = P."facilityId"
          where P."isActive" = true
          ${year} ${start_month} ${end_month} ${facilityId} ${districtId}
          group by  P."districtId", P."facilityId", P."year", P."month", 
          D."districtName", F."facilityName" `).then(([results, metadata]) => {

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



    const PhcHrAndTrainingStatusDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}


            var year = `and P.year = ${req.body.year}`
            var month = `and P.month = ${req.body.month}`
            var districtId = `and P."districtId" = ${req.body.districtId}`
            var facilityId = `and P."facilityId" = ${req.body.facilityId}`




            if (req.body.year.length == 0) {
                year = ""
            }
            if (req.body.month.length == 0) {
                month = ""
            }
            if (req.body.districtId.length == 0) {
                districtId = ""
            }
            if (req.body.facilityId.length == 0) {
                facilityId = ""
            }


            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select P."year", P."month", P."districtId", P."facilityId", D."districtName", F."facilityName",
            sum(P."totalStaffSanctioned") AS "totalStaffSanctioned",
            SUM(P."totalStaffsUnit") AS "totalStaffsUnit", SUM(P."totalManDaysRequired") AS "totalManDaysRequired",
            PDA."cadreOfDrugAdminId", UD1."categoryOptionName" AS "cadreOfDrugAdmin",
            SUM(P."actualAvailableDrugAdmin") AS "actualAvailableDrugAdmin",
            SUM(P."requiredSupervisors") AS "requiredSupervisors",
            PDS."cadreOfSupervisorId", UD2."categoryOptionName" AS "cadreOfSupervisor",
            SUM(P."actualAvailableSupervisor") AS "actualAvailableSupervisor",
            SUM(P."numberTrainedForMMDP") AS "numberTrainedForMMDP",
            SUM(P."batchesOfTrainingOrganizedMMDP") AS "batchesOfTrainingOrganizedMMDP",
            SUM(P."numberTrainedForMDAIDA") AS "numberTrainedForMDAIDA",
            SUM(P."batchesOfTrainingOrganizedMDAIDA")  AS "batchesOfTrainingOrganizedMDAIDA"
            from public."preMDAActivities" P
            left join public."preMDAActivityDrugAdministrators" PDA on PDA."preMDAActivityId"=P.Id
            left join public."preMDAActivitySupervisors" PDS on PDS."preMDAActivityId"=P.Id
            left join public.districts D on D.id = P."districtId"
            left join public.facilities F on F.id = P."facilityId"
            left join public."udCategoryOptions" UD1 on UD1.id = PDA."cadreOfDrugAdminId"
            left join public."udCategoryOptions" UD2 on UD2.id = PDS."cadreOfSupervisorId"
            where 1 = 1
            ${year} ${month} ${facilityId} ${districtId}
            group by  P."year", P."month", P."districtId", P."facilityId",
            PDA."cadreOfDrugAdminId", PDS."cadreOfSupervisorId",
            D."districtName", F."facilityName",
            UD1."categoryOptionName", UD2."categoryOptionName"
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


    const PHCwiseDrugConsumptionDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}


            var year = `and M1.year = ${req.body.year}`
            var month = `and M1.month = ${req.body.month}`
            var districtId = `and M1."districtId" = ${req.body.districtId}`
            var facilityId = `and M1."facilityId" = ${req.body.facilityId}`




            if (req.body.year.length == 0) {
                year = ""
            }
            if (req.body.month.length == 0) {
                month = ""
            }
            if (req.body.districtId.length == 0) {
                districtId = ""
            }
            if (req.body.facilityId.length == 0) {
                facilityId = ""
            }


            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select M1."year", M1."month", M1."districtId", M1."facilityId", D."districtName", F."facilityName",
                SUM(M1."totalPopulation") AS "totalPopulation",
                SUM(M1."eligiblePopulation") AS "eligiblePopulation",
                SUM(M1."noOfPeopleAdministered") AS "noOfPeopleAdministered"
            from
                    (
                        select M."year", M."month", M."districtId", M."facilityId", M."totalPopulation", M."eligiblePopulation",
                        (sum(MR."noOfPeopleAdministered") + sum(MM."noOfPeopleAdministered")) AS "noOfPeopleAdministered"
                from public."mdaIDACoverages" M
                left join public."mdaIDACoverageRegularLists" MR ON MR."mdaIDACoverageId" = M.id
                left join public."mdaIDACoverageMopUpLists" MM ON MM."mdaIDACoverageId" = M.id
                group by M.id
                    )M1
            left join public.districts D on D.id = M1."districtId"
            left join public.facilities F on F.id = M1."facilityId"          
           where 1 = 1
            ${year} ${month} ${facilityId} ${districtId}
            group by  M1."year", M1."month", M1."districtId", M1."facilityId", D."districtName", F."facilityName"
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





    const BifurcationOfRegularAndMopupDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}


            var year = `and M.year = ${req.body.year}`
            var districtId = `and M."districtId" = ${req.body.districtId}`
            var facilityId = `and M."facilityId" = ${req.body.facilityId}`

            var start_month = `and  M."month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth}`

            if (req.body.startMonth.length == 0) {
                start_month = `and  M."month" BETWEEN 1 `
            }
            if (req.body.endMonth.length == 0) {
                end_month = `and 12`
            }


            if (req.body.year.length == 0) {
                year = ""
            }
            if (req.body.districtId.length == 0) {
                districtId = ""
            }
            if (req.body.facilityId.length == 0) {
                facilityId = ""
            }


            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
           select M.id, M."districtId", M."facilityId", M."villageId",
           D."districtName", F."facilityName", V."villageName",
           'Regular-1' as "roundR1",
           R1."noOfPeopleAdministered" as "noOfPeopleAdministeredR1",
           R1."noOfPersonsWithFever" as "noOfPersonsWithFeverR1",
           R1."noOfPersonsWithHeadache" as "noOfPersonsWithHeadacheR1",
           R1."noOfPersonsWithBodyache" as "noOfPersonsWithBodyacheR1",
           R1."noOfPersonsWithNausea" as "noOfPersonsWithNauseaR1",
           R1."noOfPersonsWithVomiting" as "noOfPersonsWithVomitingR1",
           R1."noOfPersonsRecovered" as "noOfPersonsRecoveredR1",
           R1."noOfPersonsNotRecovered" as "noOfPersonsNotRecoveredR1",
           R1."noOfPersonsRequiredHospitalStay" as "noOfPersonsRequiredHospitalStayR1",
           R1."isRequiredHospitalStay" as "isRequiredHospitalStayR1",
           R1.remarks as remarksR1,
           'Regular-2' as "roundR2",
           R2."noOfPeopleAdministered" as "noOfPeopleAdministeredR2",
           R2."noOfPersonsWithFever" as "noOfPersonsWithFeverR2",
           R2."noOfPersonsWithHeadache" as "noOfPersonsWithHeadacheR2",
           R2."noOfPersonsWithBodyache" as "noOfPersonsWithBodyacheR2",
           R2."noOfPersonsWithNausea" as "noOfPersonsWithNauseaR2",
           R2."noOfPersonsWithVomiting" as "noOfPersonsWithVomitingR2",
           R2."noOfPersonsRecovered" as "noOfPersonsRecoveredR2",
           R2."noOfPersonsNotRecovered" as "noOfPersonsNotRecoveredR2",
           R2."noOfPersonsRequiredHospitalStay" as "noOfPersonsRequiredHospitalStayR2",
           R2."isRequiredHospitalStay" as "isRequiredHospitalStayR2",
           R2.remarks as remarksR2,
           'Regular-3' as "roundR3",
           R3."noOfPeopleAdministered" as "noOfPeopleAdministeredR3",
           R3."noOfPersonsWithFever" as "noOfPersonsWithFeverR3",
           R3."noOfPersonsWithHeadache" as "noOfPersonsWithHeadacheR3",
           R3."noOfPersonsWithBodyache" as "noOfPersonsWithBodyacheR3",
           R3."noOfPersonsWithNausea" as "noOfPersonsWithNauseaR3",
           R3."noOfPersonsWithVomiting" as "noOfPersonsWithVomitingR3",
           R3."noOfPersonsRecovered" as "noOfPersonsRecoveredR3",
           R3."noOfPersonsNotRecovered" as "noOfPersonsNotRecoveredR3",
           R3."noOfPersonsRequiredHospitalStay" as "noOfPersonsRequiredHospitalStayR3",
           R3."isRequiredHospitalStay" as "isRequiredHospitalStayR3",
           R3.remarks as remarksR3,
           'Regular-4' as "roundR4",
           R4."noOfPeopleAdministered" as "noOfPeopleAdministeredR4",
           R4."noOfPersonsWithFever" as "noOfPersonsWithFeverR4",
           R4."noOfPersonsWithHeadache" as "noOfPersonsWithHeadacheR4",
           R4."noOfPersonsWithBodyache" as "noOfPersonsWithBodyacheR4",
           R4."noOfPersonsWithNausea" as "noOfPersonsWithNauseaR4",
           R4."noOfPersonsWithVomiting" as "noOfPersonsWithVomitingR4",
           R4."noOfPersonsRecovered" as "noOfPersonsRecoveredR4",
           R4."noOfPersonsNotRecovered" as "noOfPersonsNotRecoveredR4",
           R4."noOfPersonsRequiredHospitalStay" as "noOfPersonsRequiredHospitalStayR4",
           R4."isRequiredHospitalStay" as "isRequiredHospitalStayR4",
           R4.remarks as remarksR4,
           'Regular-5' as "roundR5",
           R5."noOfPeopleAdministered" as "noOfPeopleAdministeredR5",
           R5."noOfPersonsWithFever" as "noOfPersonsWithFeverR5",
           R5."noOfPersonsWithHeadache" as "noOfPersonsWithHeadacheR5",
           R5."noOfPersonsWithBodyache" as "noOfPersonsWithBodyacheR5",
           R5."noOfPersonsWithNausea" as "noOfPersonsWithNauseaR5",
           R5."noOfPersonsWithVomiting" as "noOfPersonsWithVomitingR5",
           R5."noOfPersonsRecovered" as "noOfPersonsRecoveredR5",
           R5."noOfPersonsNotRecovered" as "noOfPersonsNotRecoveredR5",
           R5."noOfPersonsRequiredHospitalStay" as "noOfPersonsRequiredHospitalStayR5",
           R5."isRequiredHospitalStay" as "isRequiredHospitalStayR5",
           R5.remarks as remarksR5,
           'Regular-6' as "roundR6",
           R6."noOfPeopleAdministered" as "noOfPeopleAdministeredR6",
           R6."noOfPersonsWithFever" as "noOfPersonsWithFeverR6",
           R6."noOfPersonsWithHeadache" as "noOfPersonsWithHeadacheR6",
           R6."noOfPersonsWithBodyache" as "noOfPersonsWithBodyacheR6",
           R6."noOfPersonsWithNausea" as "noOfPersonsWithNauseaR6",
           R6."noOfPersonsWithVomiting" as "noOfPersonsWithVomitingR6",
           R6."noOfPersonsRecovered" as "noOfPersonsRecoveredR6",
           R6."noOfPersonsNotRecovered" as "noOfPersonsNotRecoveredR6",
           R6."noOfPersonsRequiredHospitalStay" as "noOfPersonsRequiredHospitalStayR6",
           R6."isRequiredHospitalStay" as "isRequiredHospitalStayR6",
           R6.remarks as remarksR6,
           'Regular-7' as "roundR7",
           R7."noOfPeopleAdministered" as "noOfPeopleAdministeredR7",
           R7."noOfPersonsWithFever" as "noOfPersonsWithFeverR7",
           R7."noOfPersonsWithHeadache" as "noOfPersonsWithHeadacheR7",
           R7."noOfPersonsWithBodyache" as "noOfPersonsWithBodyacheR7",
           R7."noOfPersonsWithNausea" as "noOfPersonsWithNauseaR7",
           R7."noOfPersonsWithVomiting" as "noOfPersonsWithVomitingR7",
           R7."noOfPersonsRecovered" as "noOfPersonsRecoveredR7",
           R7."noOfPersonsNotRecovered" as "noOfPersonsNotRecoveredR7",
           R7."noOfPersonsRequiredHospitalStay" as "noOfPersonsRequiredHospitalStayR7",
           R7."isRequiredHospitalStay" as "isRequiredHospitalStayR7",
           R7.remarks as remarksR7,
           'Regular-8' as "roundR8",
           R8."noOfPeopleAdministered" as "noOfPeopleAdministeredR8",
           R8."noOfPersonsWithFever" as "noOfPersonsWithFeverR8",
           R8."noOfPersonsWithHeadache" as "noOfPersonsWithHeadacheR8",
           R8."noOfPersonsWithBodyache" as "noOfPersonsWithBodyacheR8",
           R8."noOfPersonsWithNausea" as "noOfPersonsWithNauseaR8",
           R8."noOfPersonsWithVomiting" as "noOfPersonsWithVomitingR8",
           R8."noOfPersonsRecovered" as "noOfPersonsRecoveredR8",
           R8."noOfPersonsNotRecovered" as "noOfPersonsNotRecoveredR8",
           R8."noOfPersonsRequiredHospitalStay" as "noOfPersonsRequiredHospitalStayR8",
           R8."isRequiredHospitalStay" as "isRequiredHospitalStayR8",
           R8.remarks as remarksR8,
       
           'Regular-9' as "roundR9",
           R9."noOfPeopleAdministered" as "noOfPeopleAdministeredR9",
           R9."noOfPersonsWithFever" as "noOfPersonsWithFeverR9",
           R9."noOfPersonsWithHeadache" as "noOfPersonsWithHeadacheR9",
           R9."noOfPersonsWithBodyache" as "noOfPersonsWithBodyacheR9",
           R9."noOfPersonsWithNausea" as "noOfPersonsWithNauseaR9",
           R9."noOfPersonsWithVomiting" as "noOfPersonsWithVomitingR9",
           R9."noOfPersonsRecovered" as "noOfPersonsRecoveredR9",
           R9."noOfPersonsNotRecovered" as "noOfPersonsNotRecoveredR9",
           R9."noOfPersonsRequiredHospitalStay" as "noOfPersonsRequiredHospitalStayR9",
           R9."isRequiredHospitalStay" as "isRequiredHospitalStayR9",
           R9.remarks as remarksR9,
           'Regular-10' as "roundR10",
           R10."noOfPeopleAdministered" as "noOfPeopleAdministeredR10",
           R10."noOfPersonsWithFever" as "noOfPersonsWithFeverR10",
           R10."noOfPersonsWithHeadache" as "noOfPersonsWithHeadacheR10",
           R10."noOfPersonsWithBodyache" as "noOfPersonsWithBodyacheR10",
           R10."noOfPersonsWithNausea" as "noOfPersonsWithNauseaR10",
           R10."noOfPersonsWithVomiting" as "noOfPersonsWithVomitingR10",
           R10."noOfPersonsRecovered" as "noOfPersonsRecoveredR10",
           R10."noOfPersonsNotRecovered" as "noOfPersonsNotRecoveredR10",
           R10."noOfPersonsRequiredHospitalStay" as "noOfPersonsRequiredHospitalStayR10",
           R10."isRequiredHospitalStay" as "isRequiredHospitalStayR10",
           R10.remarks as remarksR10,
           'MopUp-1' as "roundM1",
           M1."noOfPeopleAdministered" as "noOfPeopleAdministeredM1",
           M1."noOfPersonsWithFever" as "noOfPersonsWithFeverM1",
           M1."noOfPersonsWithHeadache" as "noOfPersonsWithHeadacheM1",
           M1."noOfPersonsWithBodyache" as "noOfPersonsWithBodyacheM1",
           M1."noOfPersonsWithNausea" as "noOfPersonsWithNauseaM1",
           M1."noOfPersonsWithVomiting" as "noOfPersonsWithVomitingM1",
           M1."noOfPersonsRecovered" as "noOfPersonsRecoveredM1",
           M1."noOfPersonsNotRecovered" as "noOfPersonsNotRecoveredM1",
           M1."noOfPersonsRequiredHospitalStay" as "noOfPersonsRequiredHospitalStayM1",
           M1."isRequiredHospitalStay" as "isRequiredHospitalStayM1",
           M1.remarks as remarksM1,
           'MopUp-2' as "roundM2",
           M2."noOfPeopleAdministered" as "noOfPeopleAdministeredM2",
           M2."noOfPersonsWithFever" as "noOfPersonsWithFeverM2",
           M2."noOfPersonsWithHeadache" as "noOfPersonsWithHeadacheM2",
           M2."noOfPersonsWithBodyache" as "noOfPersonsWithBodyacheM2",
           M2."noOfPersonsWithNausea" as "noOfPersonsWithNauseaM2",
           M2."noOfPersonsWithVomiting" as "noOfPersonsWithVomitingM2",
           M2."noOfPersonsRecovered" as "noOfPersonsRecoveredM2",
           M2."noOfPersonsNotRecovered" as "noOfPersonsNotRecoveredM2",
           M2."noOfPersonsRequiredHospitalStay" as "noOfPersonsRequiredHospitalStayM2",
           M2."isRequiredHospitalStay" as "isRequiredHospitalStayM2",
           M2.remarks as remarksM2,
           'MopUp-3' as "roundM3",
           M3."noOfPeopleAdministered" as "noOfPeopleAdministeredM3",
           M3."noOfPersonsWithFever" as "noOfPersonsWithFeverM3",
           M3."noOfPersonsWithHeadache" as "noOfPersonsWithHeadacheM3",
           M3."noOfPersonsWithBodyache" as "noOfPersonsWithBodyacheM3",
           M3."noOfPersonsWithNausea" as "noOfPersonsWithNauseaM3",
           M3."noOfPersonsWithVomiting" as "noOfPersonsWithVomitingM3",
           M3."noOfPersonsRecovered" as "noOfPersonsRecoveredM3",
           M3."noOfPersonsNotRecovered" as "noOfPersonsNotRecoveredM3",
           M3."noOfPersonsRequiredHospitalStay" as "noOfPersonsRequiredHospitalStayM3",
           M3."isRequiredHospitalStay" as "isRequiredHospitalStayM3",
           M3.remarks as remarksM3,
           'MopUp-4' as "roundM4",
           M4."noOfPeopleAdministered" as "noOfPeopleAdministeredM4",
           M4."noOfPersonsWithFever" as "noOfPersonsWithFeverM4",
           M4."noOfPersonsWithHeadache" as "noOfPersonsWithHeadacheM4",
           M4."noOfPersonsWithBodyache" as "noOfPersonsWithBodyacheM4",
           M4."noOfPersonsWithNausea" as "noOfPersonsWithNauseaM4",
           M4."noOfPersonsWithVomiting" as "noOfPersonsWithVomitingM4",
           M4."noOfPersonsRecovered" as "noOfPersonsRecoveredM4",
           M4."noOfPersonsNotRecovered" as "noOfPersonsNotRecoveredM4",
           M4."noOfPersonsRequiredHospitalStay" as "noOfPersonsRequiredHospitalStayM4",
           M4."isRequiredHospitalStay" as "isRequiredHospitalStayM4",
           M4.remarks as remarksM4,
           'MopUp-5' as "roundM5",
           M5."noOfPeopleAdministered" as "noOfPeopleAdministeredM5",
           M5."noOfPersonsWithFever" as "noOfPersonsWithFeverM5",
           M5."noOfPersonsWithHeadache" as "noOfPersonsWithHeadacheM5",
           M5."noOfPersonsWithBodyache" as "noOfPersonsWithBodyacheM5",
           M5."noOfPersonsWithNausea" as "noOfPersonsWithNauseaM5",
           M5."noOfPersonsWithVomiting" as "noOfPersonsWithVomitingM5",
           M5."noOfPersonsRecovered" as "noOfPersonsRecoveredM5",
           M5."noOfPersonsNotRecovered" as "noOfPersonsNotRecoveredM5",
           M5."noOfPersonsRequiredHospitalStay" as "noOfPersonsRequiredHospitalStayM5",
           M5."isRequiredHospitalStay" as "isRequiredHospitalStayM5",
           M5.remarks as remarksM5,
           'MopUp-5' as "roundM6",
           M6."noOfPeopleAdministered" as "noOfPeopleAdministeredM6",
           M6."noOfPersonsWithFever" as "noOfPersonsWithFeverM6",
           M6."noOfPersonsWithHeadache" as "noOfPersonsWithHeadacheM6",
           M6."noOfPersonsWithBodyache" as "noOfPersonsWithBodyacheM6",
           M6."noOfPersonsWithNausea" as "noOfPersonsWithNauseaM6",
           M6."noOfPersonsWithVomiting" as "noOfPersonsWithVomitingM6",
           M6."noOfPersonsRecovered" as "noOfPersonsRecoveredM6",
           M6."noOfPersonsNotRecovered" as "noOfPersonsNotRecoveredM6",
           M6."noOfPersonsRequiredHospitalStay" as "noOfPersonsRequiredHospitalStayM6",
           M6."isRequiredHospitalStay" as "isRequiredHospitalStayM6",
           M6.remarks as remarksM6,
           'MopUp-7' as "roundM7",
           M7."noOfPeopleAdministered" as "noOfPeopleAdministeredM7",
           M7."noOfPersonsWithFever" as "noOfPersonsWithFeverM7",
           M7."noOfPersonsWithHeadache" as "noOfPersonsWithHeadacheM7",
           M7."noOfPersonsWithBodyache" as "noOfPersonsWithBodyacheM7",
           M7."noOfPersonsWithNausea" as "noOfPersonsWithNauseaM7",
           M7."noOfPersonsWithVomiting" as "noOfPersonsWithVomitingM7",
           M7."noOfPersonsRecovered" as "noOfPersonsRecoveredM7",
           M7."noOfPersonsNotRecovered" as "noOfPersonsNotRecoveredM7",
           M7."noOfPersonsRequiredHospitalStay" as "noOfPersonsRequiredHospitalStayM7",
           M7."isRequiredHospitalStay" as "isRequiredHospitalStayM7",
           M7.remarks as remarksM7,
           'MopUp-8' as "roundM8",
           M8."noOfPeopleAdministered" as "noOfPeopleAdministeredM8",
           M8."noOfPersonsWithFever" as "noOfPersonsWithFeverM8",
           M8."noOfPersonsWithHeadache" as "noOfPersonsWithHeadacheM8",
           M8."noOfPersonsWithBodyache" as "noOfPersonsWithBodyacheM8",
           M8."noOfPersonsWithNausea" as "noOfPersonsWithNauseaM8",
           M8."noOfPersonsWithVomiting" as "noOfPersonsWithVomitingM8",
           M8."noOfPersonsRecovered" as "noOfPersonsRecoveredM8",
           M8."noOfPersonsNotRecovered" as "noOfPersonsNotRecoveredM8",
           M8."noOfPersonsRequiredHospitalStay" as "noOfPersonsRequiredHospitalStayM8",
           M8."isRequiredHospitalStay" as "isRequiredHospitalStayM8",
           M8.remarks as remarksM8,
           'MopUp-9' as "roundM9",
           M9."noOfPeopleAdministered" as "noOfPeopleAdministeredM9",
           M9."noOfPersonsWithFever" as "noOfPersonsWithFeverM9",
           M9."noOfPersonsWithHeadache" as "noOfPersonsWithHeadacheM9",
           M9."noOfPersonsWithBodyache" as "noOfPersonsWithBodyacheM9",
           M9."noOfPersonsWithNausea" as "noOfPersonsWithNauseaM9",
           M9."noOfPersonsWithVomiting" as "noOfPersonsWithVomitingM9",
           M9."noOfPersonsRecovered" as "noOfPersonsRecoveredM9",
           M9."noOfPersonsNotRecovered" as "noOfPersonsNotRecoveredM9",
           M9."noOfPersonsRequiredHospitalStay" as "noOfPersonsRequiredHospitalStayM9",
           M9."isRequiredHospitalStay" as "isRequiredHospitalStayM9",
           M9.remarks as remarksM9,
           'MopUp-10' as "roundM10",
           M10."noOfPeopleAdministered" as "noOfPeopleAdministeredM10",
           M10."noOfPersonsWithFever" as "noOfPersonsWithFeverM10",
           M10."noOfPersonsWithHeadache" as "noOfPersonsWithHeadacheM10",
           M10."noOfPersonsWithBodyache" as "noOfPersonsWithBodyacheM10",
           M10."noOfPersonsWithNausea" as "noOfPersonsWithNauseaM10",
           M10."noOfPersonsWithVomiting" as "noOfPersonsWithVomitingM10",
           M10."noOfPersonsRecovered" as "noOfPersonsRecoveredM10",
           M10."noOfPersonsNotRecovered" as "noOfPersonsNotRecoveredM10",
           M10."noOfPersonsRequiredHospitalStay" as "noOfPersonsRequiredHospitalStayM10",
           M10."isRequiredHospitalStay" as "isRequiredHospitalStayM10",
           M10.remarks as remarksM10
           from public."mdaIDACoverages" M
           left join public.districts D on D.id = M."districtId"
           left join public.facilities F on F.id = M."facilityId"
           left join public.villages V on V.id = M."villageId"
           left join
               (select * from public."mdaIDACoverageRegularLists" where regular = 1)
           R1 ON R1."mdaIDACoverageId" = M.id
           left join
               (select * from public."mdaIDACoverageRegularLists" where regular = 2)
           R2 ON R2."mdaIDACoverageId" = M.id
           left join
               (select * from public."mdaIDACoverageRegularLists" where regular = 3)
           R3 ON R3."mdaIDACoverageId" = M.id
           left join
               (select * from public."mdaIDACoverageRegularLists" where regular = 4)
           R4 ON R4."mdaIDACoverageId" = M.id
           left join
               (select * from public."mdaIDACoverageRegularLists" where regular = 5)
           R5 ON R5."mdaIDACoverageId" = M.id
           left join
               (select * from public."mdaIDACoverageRegularLists" where regular = 6)
           R6 ON R6."mdaIDACoverageId" = M.id
           left join
               (select * from public."mdaIDACoverageRegularLists" where regular = 7)
           R7 ON R7."mdaIDACoverageId" = M.id
           left join
               (select * from public."mdaIDACoverageRegularLists" where regular = 8)
           R8 ON R8."mdaIDACoverageId" = M.id
           left join
               (select * from public."mdaIDACoverageRegularLists" where regular = 9)
           R9 ON R9."mdaIDACoverageId" = M.id
           left join
               (select * from public."mdaIDACoverageRegularLists" where regular = 10)
           R10 ON R10."mdaIDACoverageId" = M.id
           left join
               (select * from public."mdaIDACoverageMopUpLists" where "mopUp" = 1)
           M1 ON M1."mdaIDACoverageId" = M.id
           left join
               (select * from public."mdaIDACoverageMopUpLists" where "mopUp" = 2)
           M2 ON M2."mdaIDACoverageId" = M.id
           left join
               (select * from public."mdaIDACoverageMopUpLists" where "mopUp" = 3)
           M3 ON M3."mdaIDACoverageId" = M.id
           left join
               (select * from public."mdaIDACoverageMopUpLists" where "mopUp" = 4)
           M4 ON M4."mdaIDACoverageId" = M.id
           left join
               (select * from public."mdaIDACoverageMopUpLists" where "mopUp" = 5)
           M5 ON M5."mdaIDACoverageId" = M.id
           left join
               (select * from public."mdaIDACoverageMopUpLists" where "mopUp" = 6)
           M6 ON M6."mdaIDACoverageId" = M.id
           left join
               (select * from public."mdaIDACoverageMopUpLists" where "mopUp" = 7)
           M7 ON M7."mdaIDACoverageId" = M.id
           left join
               (select * from public."mdaIDACoverageMopUpLists" where "mopUp" = 8)
           M8 ON M8."mdaIDACoverageId" = M.id
           left join
               (select * from public."mdaIDACoverageMopUpLists" where "mopUp" = 9)
           M9 ON M9."mdaIDACoverageId" = M.id
           left join
               (select * from public."mdaIDACoverageMopUpLists" where "mopUp" = 10)
           M10 ON M10."mdaIDACoverageId" = M.id
           where 1 = 1
            ${year} ${start_month} ${end_month} ${facilityId} ${districtId}

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





    const ExpenditureBalanceReceivedFundsDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}


            var year = `and M.year = ${req.body.year} `
            var districtId = `and M."districtId" = ${req.body.districtId} `
            var start_month = `and  M."month" BETWEEN ${req.body.startMonth} `
            var end_month = `and  ${req.body.endMonth} `

            if (req.body.startMonth.length == 0) {
                start_month = `and  M."month" BETWEEN 1 `
            }
            if (req.body.endMonth.length == 0) {
                end_month = `and 12`
            }
            if (req.body.year.length == 0) {
                year = ""
            }
            if (req.body.districtId.length == 0) {
                districtId = ""
            }



            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select M."year", M."month", M."districtId", D."districtName",
                M."materialActivity" AS "materialActivityId", UD2."categoryOptionName" AS "materialActivity",
                    M."materialActivityNo", M."materialActivityCostInRs",
                        M."statementOfFundsAllotted" AS "statementOfFundsAllottedId", UD1."categoryOptionName" AS "statementOfFundsAllotted",
                            M."dateDistrictCoordComitte", M."fundAllocatedWithDate", M."fundUtilisedWithDate", M."fundBalanceAfterRound"
            from public."mdaIECActivities" M
            left join public."udCategoryOptions" UD1 on UD1.id = M."statementOfFundsAllotted"
            left join public."udCategoryOptions" UD2 on UD2.id = M."materialActivity"
            left join public.districts D on D.id = M."districtId"
            where M."isActive" = true
            ${year} ${start_month} ${end_month}  ${districtId}

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

    const ProposalWithdrawalOfMDADao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}


            var year = `and M.year = ${req.body.year} `
            var districtId = `and M."districtId" = ${req.body.districtId} `
      
            if (req.body.year.length == 0) {
                year = ""
            }
            if (req.body.districtId.length == 0) {
                districtId = ""
            }

            db.sequelize.query(`
            select M."districtId",D."districtName",null "sampleSizeELFGuidelines", 
            Max(MR.regular) "noOfRound", null "proposedDatesOfTAS" from public."mdaIDACoverages" M
            left join public."mdaIDACoverageRegularLists" MR ON M.id=MR."mdaIDACoverageId"
            left join public.districts D ON D.id=M."districtId"
            where 1=1  ${year}  ${districtId}
            group by M."districtId",D."districtName"
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
    return {

        StateLvlDao,
        CHCLvlDao,
        coverageReport1Dao,
        subCenterLvlDao,
        infrastructureDao,
        analysis1_postMDAEvaluationDao,
        analysis2_postMDAEvaluationDao,
        Co_ordinationCommitteReportDao,
        DEC100MgDao,
        AlbendazoleDao,
        MactizinDao,
        DrugRequirementMDA2StateDao,
        DrugRequirementMDA2RdDao,
        DrugStockAtPHCDao,
        DrugAdminSupervisorAvailabilityDao,
        PhcHrAndTrainingStatusDao,
        PHCwiseDrugConsumptionDao,
        BifurcationOfRegularAndMopupDao,
        ExpenditureBalanceReceivedFundsDao,
        ProposalWithdrawalOfMDADao
    };
};
export default MDAReportDao();