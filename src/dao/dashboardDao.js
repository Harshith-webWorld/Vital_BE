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
const dashboardDao = () => {


    const GetEndemicityTotalAllDistrictsDao = async (req) => {
        try {
            return new Promise(async function (resolve) {
                var response = {}
                //console.log(req.body);
                var year = `and A."year" BETWEEN ${req.body.fromYear} and  ${req.body.toYear} `;
                var endYear = `and A."year" = ${req.body.toYear} `;
                var prevYear = `and A."year" = ${req.body.toYear - 1} `;
                var districtId = (req.body.districtId.length == 0 || req.body.districtId == 0) ? ` ` : `and A."districtId" = ${req.body.districtId}`;
                var month = `and A."month" BETWEEN ${req.body.startMonth} and  ${req.body.endMonth} `

                // const page = req.page ? req.page : 1;
                // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                // const offset = (page - 1) * itemsPerPage;

                const selectYear = db.sequelize.query(`
            select 	sum(B."NoOfLFCases") "NoOfLFCases", sum(B."NoOfHydroceleCases") "NoOfHydroceleCases", 
	        sum (B."NoOfHydroceleSurgery") "NoOfHydroceleSurgery", sum (B."NoMFPosetive") "NoMFPosetive"
            From
            (select (D."id") AS "districtId",D."districtName",D."mapId" AS "mapDistrictId",

            COALESCE(L1."NoOfLFCases",0) + COALESCE(L11."NoOfLFCases",0) As "NoOfLFCases",
            COALESCE(L2."NoOfHydroceleCases",0)  + COALESCE(L21."NoOfHydroceleCases",0) As "NoOfHydroceleCases",
            COALESCE(L3."NoOfHydroceleSurgery",0) + COALESCE(L31."NoOfHydroceleSurgery",0) As "NoOfHydroceleSurgery",
            COALESCE(M1."NoMFPosetive",0) As "NoMFPosetive"

            from public.districts D  
            LEFT OUTER JOIN 
            (select count(A.id) AS "NoOfLFCases", A."districtId" from public."lymphedemaLineLists" A
                where lower(A."diseaseType") like '%lymphedema%' and A."isActive" =true
                ${endYear} ${month} ${districtId}
                group by A."districtId"
            )L1 ON D."id"=L1."districtId"
            LEFT OUTER JOIN 
            (select sum(A."lfCases"/A.month) AS "NoOfLFCases", A."districtId" from public."districtYearWiseCasesLHHF" A
                where 1=1 
                ${endYear} ${districtId}
                group by A."districtId"
            )L11 ON D."id"=L11."districtId"
            LEFT OUTER JOIN 
            (select count(A.id) AS "NoOfHydroceleCases",A."districtId" from public."lymphedemaLineLists"  A
                where lower(A."diseaseType") like '%hydrocele%' and A."isActive" =true
                ${endYear} ${month} ${districtId}
                group by A."districtId"
            )L2 ON D."id"=L2."districtId"
			LEFT OUTER JOIN 
            (select sum(A."hydroceleCases"/A.month) AS "NoOfHydroceleCases", A."districtId" from public."districtYearWiseCasesLHHF" A
                where 1=1 
                ${endYear} ${districtId}
                group by A."districtId"
            )L21 ON D."id"=L21."districtId"
            LEFT OUTER JOIN 
            (select count(LH.id) AS "NoOfHydroceleSurgery",A."districtId" from public."lymphedemaLineLists" A
                inner join public."lymphedemaLineListFollowUpsHFs" LH ON A.id=LH."lymphedemaLineListId" 
                where lower(A."diseaseType") like '%hydrocele%' and A."isActive" = true 
                and LH."isActive" =true and LH."isSurgeryDone"=true 
                ${endYear} ${month} ${districtId}
                group by A."districtId"
            )L3 ON D."id"=L3."districtId"
            LEFT OUTER JOIN 
            (select sum(A."hydroceleSurgeries"/A.month) AS "NoOfHydroceleSurgery", A."districtId" from public."districtYearWiseCasesLHHF" A
                where 1=1 
                ${endYear} ${districtId}
                group by A."districtId"
            )L31 ON D."id"=L31."districtId"
            LEFT OUTER JOIN 
            (select count(MP.id) AS "NoMFPosetive",A."districtId" from public."mfPositiveLineListPatients" MP
                inner join public."mfPositiveLineLists" A ON A.id=MP."mfPositiveLineListId"
                where MP."isActive" =true and A."isActive" =true
                ${endYear} ${month} ${districtId}
                group by A."districtId"
            )M1 ON D."id"=M1."districtId"
            )B`).then(([results, metadata]) => {
                    return results
                })

                const previosYear = db.sequelize.query(`
            select 	sum(B."NoOfLFCases") "NoOfLFCases", sum(B."NoOfHydroceleCases") "NoOfHydroceleCases", 
	        sum (B."NoOfHydroceleSurgery") "NoOfHydroceleSurgery", sum (B."NoMFPosetive") "NoMFPosetive"
            From
            (select (D."id") AS "districtId",D."districtName",D."mapId" AS "mapDistrictId",

            COALESCE(L1."NoOfLFCases",0) + COALESCE(L11."NoOfLFCases",0) As "NoOfLFCases",
            COALESCE(L2."NoOfHydroceleCases",0)  + COALESCE(L21."NoOfHydroceleCases",0) As "NoOfHydroceleCases",
            COALESCE(L3."NoOfHydroceleSurgery",0) + COALESCE(L31."NoOfHydroceleSurgery",0) As "NoOfHydroceleSurgery",
            COALESCE(M1."NoMFPosetive",0) As "NoMFPosetive"

            from public.districts D  
            LEFT OUTER JOIN 
            (select count(A.id) AS "NoOfLFCases", A."districtId" from public."lymphedemaLineLists" A
                where lower(A."diseaseType") like '%lymphedema%' and A."isActive" =true
                ${prevYear} ${month} ${districtId}
                group by A."districtId"
            )L1 ON D."id"=L1."districtId"
            LEFT OUTER JOIN 
            (select sum(A."lfCases"/A.month) AS "NoOfLFCases", A."districtId" from public."districtYearWiseCasesLHHF" A
                where 1=1 
                ${prevYear}  ${districtId}
                group by A."districtId"
            )L11 ON D."id"=L11."districtId"
            LEFT OUTER JOIN 
            (select count(A.id) AS "NoOfHydroceleCases",A."districtId" from public."lymphedemaLineLists"  A
                where lower(A."diseaseType") like '%hydrocele%' and A."isActive" =true
                ${prevYear} ${month} ${districtId}
                group by A."districtId"
            )L2 ON D."id"=L2."districtId"
            LEFT OUTER JOIN 
            (select sum(A."hydroceleCases"/A.month) AS "NoOfHydroceleCases", A."districtId" from public."districtYearWiseCasesLHHF" A
                where 1=1 
                ${prevYear} ${districtId}
                group by A."districtId"
            )L21 ON D."id"=L21."districtId"
            LEFT OUTER JOIN 
            (select count(LH.id) AS "NoOfHydroceleSurgery",A."districtId" from public."lymphedemaLineLists" A
                inner join public."lymphedemaLineListFollowUpsHFs" LH ON A.id=LH."lymphedemaLineListId" 
                where lower(A."diseaseType") like '%hydrocele%' and A."isActive" = true 
                and LH."isActive" =true and LH."isSurgeryDone"=true 
                ${prevYear} ${month} ${districtId}
                group by A."districtId"
            )L3 ON D."id"=L3."districtId"
            LEFT OUTER JOIN 
            (select sum(A."hydroceleSurgeries"/A.month) AS "NoOfHydroceleSurgery", A."districtId" from public."districtYearWiseCasesLHHF" A
                where 1=1 
                ${prevYear} ${districtId}
                group by A."districtId"
            )L31 ON D."id"=L31."districtId"
            LEFT OUTER JOIN 
            (select count(MP.id) AS "NoMFPosetive",A."districtId" from public."mfPositiveLineListPatients" MP
                inner join public."mfPositiveLineLists" A ON A.id=MP."mfPositiveLineListId"
                where MP."isActive" =true and A."isActive" =true
                ${prevYear} ${month} ${districtId}
                group by A."districtId"
            )M1 ON D."id"=M1."districtId"
            )B`).then(([results, metadata]) => {
                    return results
                })
                const cumulative = db.sequelize.query(`
            select 	sum(B."NoOfLFCases") "NoOfLFCases", sum(B."NoOfHydroceleCases") "NoOfHydroceleCases", 
	        sum (B."NoOfHydroceleSurgery") "NoOfHydroceleSurgery", sum (B."NoMFPosetive") "NoMFPosetive"
            From
            (select (D."id") AS "districtId",D."districtName",D."mapId" AS "mapDistrictId",

            COALESCE(L1."NoOfLFCases",0) + COALESCE(L11."NoOfLFCases",0) As "NoOfLFCases",
            COALESCE(L2."NoOfHydroceleCases",0)  + COALESCE(L21."NoOfHydroceleCases",0) As "NoOfHydroceleCases",
            COALESCE(L3."NoOfHydroceleSurgery",0) + COALESCE(L31."NoOfHydroceleSurgery",0) As "NoOfHydroceleSurgery",
            COALESCE(M1."NoMFPosetive",0) As "NoMFPosetive"
            
            from public.districts D  
            LEFT OUTER JOIN 
            (select count(A.id) AS "NoOfLFCases", A."districtId" from public."lymphedemaLineLists" A
                where lower(A."diseaseType") like '%lymphedema%' and A."isActive" =true
                ${year} ${districtId}
                group by A."districtId"
            )L1 ON D."id"=L1."districtId"
            LEFT OUTER JOIN 
            (select sum(A."lfCases") AS "NoOfLFCases", A."districtId" from public."districtYearWiseCasesLHHF" A
                where 1=1 
                ${year} ${districtId}
                group by A."districtId"
            )L11 ON D."id"=L11."districtId"
            LEFT OUTER JOIN 
            (select count(A.id) AS "NoOfHydroceleCases",A."districtId" from public."lymphedemaLineLists"  A
                where lower(A."diseaseType") like '%hydrocele%' and A."isActive" =true
                ${year} ${districtId}
                group by A."districtId"
            )L2 ON D."id"=L2."districtId"
            LEFT OUTER JOIN 
            (select sum(A."hydroceleCases") AS "NoOfHydroceleCases", A."districtId" from public."districtYearWiseCasesLHHF" A
                where 1=1 
                ${year} ${districtId}
                group by A."districtId"
            )L21 ON D."id"=L21."districtId"
            LEFT OUTER JOIN 
            (select count(LH.id) AS "NoOfHydroceleSurgery",A."districtId" from public."lymphedemaLineLists" A
                inner join public."lymphedemaLineListFollowUpsHFs" LH ON A.id=LH."lymphedemaLineListId" 
                where lower(A."diseaseType") like '%hydrocele%' and A."isActive" = true 
                and LH."isActive" =true and LH."isSurgeryDone"=true 
                ${year} ${districtId}
                group by A."districtId"
            )L3 ON D."id"=L3."districtId"
            LEFT OUTER JOIN 
            (select sum(A."hydroceleSurgeries") AS "NoOfHydroceleSurgery", A."districtId" from public."districtYearWiseCasesLHHF" A
                where 1=1 
                ${year} ${districtId}
                group by A."districtId"
            )L31 ON D."id"=L31."districtId"
            LEFT OUTER JOIN 
            (select count(MP.id) AS "NoMFPosetive",A."districtId" from public."mfPositiveLineListPatients" MP
                inner join public."mfPositiveLineLists" A ON A.id=MP."mfPositiveLineListId"
                where MP."isActive" =true and A."isActive" =true
                ${year} ${districtId}
                group by A."districtId"
            )M1 ON D."id"=M1."districtId"
            )B    
            `).then(([results, metadata]) => {
                    return results
                })
                Promise
                    .all([selectYear, previosYear, cumulative]).then(data => {
                        response.error = false
                        var obj = {}
                        obj.selectYear = data[0]
                        obj.previosYear = data[1]
                        obj.cumulative = data[2]
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

    const get_DashboardTodayEntryDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}


            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select B."TodayLF",B."TodayHF",B."TodayMF", B."TodayEntry",
            (case when (B."TodayEntry">B."YesterdayEntry") then 
            +B."percentThanYesterday" else -B."percentThanYesterday" End) as "percentThanYesterday"
            from
            (
                select A."TodayLF",A."TodayHF",A."TodayMF", A."TodayEntry", A."YesterdayEntry",
                (A."TodayEntry"/(CASE A."YesterdayEntry"
                    WHEN 0 Then 1 ELSE A."YesterdayEntry" END))*100 AS "percentThanYesterday"
                FROM
                (
                    select A1.id as id, A1."TodayLF",A2."YesterdayLF",A3."TodayHF",
                      A4."YesterdayHF",A5."TodayMF",A6."YesterdayMF",
                      (A1."TodayLF" + A3."TodayHF" + A5."TodayMF") AS "TodayEntry",
                      (A2."YesterdayLF" + A4."YesterdayHF" + A6."YesterdayMF") AS "YesterdayEntry"
                    From
                    (
                        select 1 as id, count(id) AS "TodayLF" from public."lymphedemaLineLists" 
                        where lower("diseaseType") like '%lymphedema%' and "isActive"=true and DATE("createdAt")= CURRENT_DATE
                    )A1
                    left join
                    (
                        select 1 as id, count(id) AS "YesterdayLF" from public."lymphedemaLineLists" 
                        where lower("diseaseType") like '%lymphedema%' and "isActive"=true and DATE("createdAt")= (CURRENT_DATE-1)
                    )A2
                    ON A1.id=A2.id
                    left join
                    (
                        select 1 as id, count(id) AS "TodayHF" from public."lymphedemaLineLists" 
                        where lower("diseaseType") like '%hydrocele%' and "isActive"=true and DATE("createdAt")= CURRENT_DATE
                    )A3
                    ON A1.id=A3.id
                    left join
                    (
                        select 1 as id, count(id) AS "YesterdayHF" from public."lymphedemaLineLists" 
                        where lower("diseaseType") like '%hydrocele%' and "isActive"=true and DATE("createdAt")= (CURRENT_DATE-1)
                    )A4
                    ON A1.id=A4.id
                    left join
                    (
                        select 1 as id, count(id) AS "TodayMF" from public."mfPositiveLineListPatients"
                        where  "isActive"=true and DATE("createdAt")= CURRENT_DATE
                    )A5
                    ON A1.id=A5.id
                    left join
                    (
                        select 1 as id, count(id) AS "YesterdayMF" from public."mfPositiveLineListPatients"
                        where"isActive"=true and DATE("createdAt")= (CURRENT_DATE-1)
                    )A6
                    ON A1.id=A6.id
                ) A
            )B            
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


    const DashboardBSCollectedTodayDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}


            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select  C."bsCollectedToday",
            (case when (C."bsCollectedToday">C."bsCollectedYesterday") then 
            +C."percentThanYesterday" else -C."percentThanYesterday" End) as "percentThanYesterday"
            from
            (
                select A1.id,A1."bsCollectedToday" ,A2."bsCollectedYesterday",
                (A1."bsCollectedToday"/(CASE A2."bsCollectedYesterday"
                    WHEN 0 Then 1 ELSE A2."bsCollectedYesterday" END))*100 AS "percentThanYesterday"
                From
                (
                    select 1 as id, count(id) "bsCollectedToday"  from public."vMFPositiveLineListSurveysById" where  DATE("dateNPC")= CURRENT_DATE
                )A1
                left join
                (
                    select 1 as id, count(id) "bsCollectedYesterday" from public."vMFPositiveLineListSurveysById" where  DATE("dateNPC")= (CURRENT_DATE-1)
                )A2
                ON A1.id=A2.id
            )C          
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

    const DashboardLFThisMonthDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}


            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select  C."lfThisMonth",
            (case when (C."lfThisMonth">C."lfLastMonth") then 
            +C."percentThanLastmonth" else -C."percentThanLastmonth" End) as "percentThanLastmonth"
            from
            (
                select A.id, A."lfThisMonth",B."lfLastMonth",  
                (A."lfThisMonth"/(CASE B."lfLastMonth"
                WHEN 0 Then 1 ELSE B."lfLastMonth" END))*100 AS "percentThanLastmonth"
                from
                (
                    select 1 as id,count(id) "lfThisMonth" from public."lymphedemaLineLists" where "isActive"=true and 
                    "month"=date_part('month', CURRENT_DATE)
                )A
                left join
                (
                    select 1 as id,count(id) "lfLastMonth" from public."lymphedemaLineLists" where "isActive"=true and 
                    "month"=(case when date_part('month', CURRENT_DATE)=1 then 12 else date_part('month', CURRENT_DATE)-1 end)
                )B on A.id=B.id
            )C
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
    const DashboardMFPositive12MonthsDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}


            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            SELECT M1."month",TO_CHAR(TO_DATE (M1."month"::text, 'MM'), 'Mon') AS "monthName", M1."year",M2."noMFPositive" 
            From 
            (
                SELECT
                EXTRACT('month' FROM d) AS "month",
                EXTRACT('year' FROM d) AS "year"
                FROM
                GENERATE_SERIES(
                    now(),
                    now() - interval '11 months',
                    interval '-1 month'
                ) AS d	
            ) M1
            left join
            (
                select "year","month",count(MP.id) AS "noMFPositive" 
                from public."mfPositiveLineListPatients" MP
                inner join public."mfPositiveLineLists" M 
                ON M.id=MP.id and MP."isActive"=true
                where M."isActive"=true and M."year"<=date_part('year', CURRENT_DATE)-1
                group by "year","month"
            )M2
            ON M1."month"=M2."month" and M1."year"=M2."year"
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


    const DashboardLFCases12MonthsDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}


            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
           SELECT M1."month",TO_CHAR(TO_DATE (M1."month"::text, 'MM'), 'Mon') AS "monthName", M1."year",M2."noLFCases" 
            From 
            (
                SELECT
                EXTRACT('month' FROM d) AS "month",
                EXTRACT('year' FROM d) AS "year"
                FROM
                GENERATE_SERIES(
                    now(),
                    now() - interval '11 months',
                    interval '-1 month'
                ) AS d	
            ) M1
            left join
            (
            select L."year",L."month",count(L.id) AS "noLFCases" from public."lymphedemaLineLists" L
                where L."isActive"=true and L."year"<=date_part('year', CURRENT_DATE)-1
                group by "year","month"
            )M2
            ON M1."month"=M2."month" and M1."year"=M2."year"
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

    const DashboardMONotVerifiedDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}


            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select COALESCE(L1."noNotVerified",0) AS "noNotVerified", D.id,D."districtName" 
            from districts D
            left join
            (
                select count(L.id) "noNotVerified", L."districtId" from public."lymphedemaLineLists" L
                left join public."lymphedemaLineListSurveys" LS
                ON LS."lymphedemaLineListId"=L.id
                where LS."isVerified"= false and  L."isActive"=true
                and ("year" =date_part('year', CURRENT_DATE) 
                    OR "year" = date_part('year',date_trunc('year', now()) - interval '1 year'))
                and ("month" = date_part('month', CURRENT_DATE) 
                    OR "month"=date_part('month',date_trunc('month', now()) - interval '1 month'))
                group by L."districtId"
             )L1
            ON D.id=L1."districtId"
            order by L1."noNotVerified" asc             
            
            
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

    const DashboardFSUTargetsDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}


            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select F."nameOfFilariaSurveyUnit" AS "nameOfUnitId",VC."nameOfControlUnit" AS "nameOfUnit",
            sum(F."noOfVillagesOrTowns") AS "noOfVillagesOrTowns",sum(FS."targetedPopulation") AS "targetedPopulation",
            sum(FS."surveyedPopulation") "surveyedPopulation",
            sum(FS."noOfBSCollected") "noOfBSCollected", sum(FS."noOfBSExamined") "noOfBSExamined",
            sum(FS."noOfMFPositiveCases") "noOfMFPositiveCases"
            from public."fsuTargetAchivements" F
            left join public."fsuTargetAchievementsSurveys" FS ON FS."fsuTargetAchievementId"=F.id
            left join public.districts D on D.id =  F."districtId"
            left join public.facilities F1 on F1.id = F."facilityId"
            left join public."verticalControlUnits" VC on VC.id = F."nameOfFilariaSurveyUnit"
            where F."isActive"=true
                and (F."year" =date_part('year', CURRENT_DATE) 
                    OR F."year" = date_part('year',date_trunc('year', now()) - interval '1 year'))
                and (F."month" = date_part('month', CURRENT_DATE) 
                    OR F."month"=date_part('month',date_trunc('month', now()) - interval '1 month'))
            group by F.year,F.month,F."nameOfFilariaSurveyUnit",VC."nameOfControlUnit"            
            
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

    const DashboardMFRatesDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}


            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            SELECT M1."month",
            TO_CHAR(TO_DATE (M1."month"::text, 'MM'), 'Mon') AS "monthName", 
            M1."year",coalesce(M2."mfRate",0) as "mfRate"
            From 
            (
                SELECT
                EXTRACT('month' FROM d) AS "month",
                EXTRACT('year' FROM d) AS "year"
                FROM
                GENERATE_SERIES(
                    now(),
                    now() - interval '6 months',
                    interval '-1 month'
                ) AS d	
            ) M1
            left join
            (
                select sum("noOfPersonsNPMF") AS "noOfPersonsNPMF",M."year",M."month",
                sum("noOfPersonsNBSE") AS "noOfPersonsNBSE" ,
                (sum("noOfPersonsNPMF")  /
                    CASE sum("noOfPersonsNBSE")
                        WHEN 0 THEN 1
                        ELSE sum("noOfPersonsNBSE")
                    END * 100)::integer AS "mfRate"
                from public."vMFPositiveLineListSurveysById" MF
                left join public."mfPositiveLineLists" M 
                ON M."id"=MF."id"
                where M."isActive"=true and M."year"<=date_part('year', CURRENT_DATE)-1
                group by M."year",M."month"
            )M2
            ON M1."month"=M2."month" and M1."year"=M2."year"
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

    const DashboardDrugConsumptionDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}


            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            SELECT M1."month",
            TO_CHAR(TO_DATE (M1."month"::text, 'MM'), 'Mon') AS "monthName", 
            M1."year",
            coalesce(M2."noOfDECTabletsConsumed" /
                    CASE M2."noOfDECTabletsGiven"
                        WHEN 0 THEN 1
                        ELSE M2."noOfDECTabletsGiven"
                    END * 100,0) AS "percentDrugConsumption"
            From 
            (
                SELECT
                EXTRACT('month' FROM d) AS "month",
                EXTRACT('year' FROM d) AS "year"
                FROM
                GENERATE_SERIES(
                    now(),
                    now() - interval '5 months',
                    interval '-1 month'
                ) AS d	
            ) M1
            left join
            (
                select sum("noOfDECTabletsConsumed") as "noOfDECTabletsConsumed",
                sum("noOfDECTabletsRecovered") as "noOfDECTabletsRecovered",M."year",M."month",
                sum("noOfDECTabletsConsumed"+"noOfDECTabletsRecovered") "noOfDECTabletsGiven"  
                from  public."postMDAEvalListPersons" MP
                left join public."postMDAEvalLists" M
                ON M.id=MP."postMDAEvalListId"
                where M."isActive"=true and M."year"<=date_part('year', CURRENT_DATE)-1
                group by M."year",M."month"
            ) M2
            ON M1."month"=M2."month" and M1."year"=M2."year"
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

    const GetMFRateTimeTrendDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var startYear = ''
            var endYear = ''
            var year = ''
            var districtId = ''

            if (req.body.startYear.length > 0 && req.body.endYear.length > 0 ) {
                year = `and m."year" BETWEEN ${req.body.startYear} and  ${req.body.endYear}`;
                startYear=req.body.startYear;
                endYear= req.body.endYear;
            }
            if (req.body.districtId.length > 0 && req.body.districtId !='0' ) {
                districtId = `and m."districtId" = ${req.body.districtId}`
            }
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`            
            select A.year,COALESCE(B."mfRate",COALESCE(T."mfRate",0)) as "mfRate" 
            from (select generate_series(${startYear},${endYear}) as year) A
            LEFT JOIN
            (SELECT m.year,
                COALESCE((CAST(sum(vm."noOfPersonsNPMF") AS float)  
                    / (case when sum(vm."noOfPersonsNBSE") = 0 
                    then null else sum(vm."noOfPersonsNBSE") end) * 100.00),0):: DECIMAL(10,2) AS "mfRate"
            FROM "vMFPositiveLineListSurveysById" vm
            LEFT JOIN "mfPositiveLineLists" m ON m.id = vm.id
            WHERE m."isActive" = true 
            ${year} ${districtId}
            group by m.year) B
            ON A.year=B.year
            LEFT JOIN public."mfRateTemp" T
            ON A.year=T.year
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

    const GetMFRateTimeTrendListDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}
            
            var year = ''
            var districtId = ''
            var year1 = ''

            if (req.body.year.length > 0 ) {
                year = `and m."year" = ${req.body.year}`;
                year1=req.body.year;
            }
            if (req.body.districtId.length > 0 && req.body.districtId !='0') {
                districtId = `and m."districtId" = ${req.body.districtId}`
            }
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`            
            select A.year,B.month,B."districtId",B."facilityId",B."villageId",B."nameOfUnitId",
            D."districtName",F."facilityName", V."villageName",VC."nameOfControlUnit",
             COALESCE(B."noOfPersonsMFPositive",0) "noOfPersonsMFPositive",
             COALESCE(B."noOfPersonsExamined",0) "noOfPersonsExamined",
             COALESCE(B."mfRate",0) "mfRate"
            from (select generate_series(${year1},${year1}) as year) A
            LEFT JOIN
            (SELECT m.year,m.month,m."districtId",m."facilityId",m."villageId",m."nameOfUnit" "nameOfUnitId",
             vm."noOfPersonsNPMF" "noOfPersonsMFPositive",vm."noOfPersonsNBSE" "noOfPersonsExamined",
                COALESCE((CAST((vm."noOfPersonsNPMF") AS float)  
                    / (case when (vm."noOfPersonsNBSE") = 0 
                    then null else (vm."noOfPersonsNBSE") end) * 100.00),0):: DECIMAL(10,2) AS "mfRate"
            FROM "vMFPositiveLineListSurveysById" vm
            LEFT JOIN "mfPositiveLineLists" m ON m.id = vm.id
            WHERE m."isActive" = true 
            ${year} ${districtId}
            ) B ON A.year=B.year
            left join public.districts D on D.id = B."districtId" 
            left join public.facilities F on F.id=B."facilityId"
            left join public.villages V on V.id = B."villageId"
            left join public."verticalControlUnits" VC on VC.id = B."villageId"                       
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

    const GetLymphedemaCasesDistrictsDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var year = `and A."year" = ${req.body.year} `;
            var districtId = (req.body.districtId.length == 0 || req.body.districtId == 0) ? ` ` : `and A."districtId" = ${req.body.districtId}`;
            var month = `and A."month" BETWEEN ${req.body.startMonth} and  ${req.body.endMonth} `

            db.sequelize.query(`            
            select A."patientId",A."nameOfPatient",A."patientMobileNumber",
            A.year,A.month,A."ageYears",G."categoryOptionName" gender,
            GR."categoryOptionName" grading, A."districtId",D."districtName",
            A."facilityId",F."facilityName", A."villageId",V."villageName"
            from public."lymphedemaLineLists" A
            left join public."udCategoryOptions" G on G.id = A.gender
            left join public."udCategoryOptions" GR on GR.id = A.grading
            left join public.districts D on D.id = A."districtId" 
            left join public.facilities F on F.id=A."facilityId"
            left join public.villages V on V.id = A."villageId"
            where lower(A."diseaseType") like '%lymphedema%' and A."isActive" =true
            ${year} ${month} ${districtId}
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

    const GetHydroceleCasesDistrictsDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var year = `and A."year" = ${req.body.year} `;
            var districtId = (req.body.districtId.length == 0 || req.body.districtId == 0) ? ` ` : `and A."districtId" = ${req.body.districtId}`;
            var month = `and A."month" BETWEEN ${req.body.startMonth} and  ${req.body.endMonth} `

            db.sequelize.query(`            
            select A."patientId",A."nameOfPatient",A."patientMobileNumber",
            A.year,A.month,A."ageYears",G."categoryOptionName" gender,
            GR."categoryOptionName" grading, A."districtId",D."districtName",
            A."facilityId",F."facilityName", A."villageId",V."villageName"
            from public."lymphedemaLineLists" A
            left join public."udCategoryOptions" G on G.id = A.gender
            left join public."udCategoryOptions" GR on GR.id = A.grading
            left join public.districts D on D.id = A."districtId" 
            left join public.facilities F on F.id=A."facilityId"
            left join public.villages V on V.id = A."villageId"
            where lower(A."diseaseType") like '%hydrocele%' and A."isActive" =true
            ${year} ${month} ${districtId}
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
    const GetHydroceleSurgeriesDistrictsDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var year = `and A."year" = ${req.body.year} `;
            var districtId = (req.body.districtId.length == 0 || req.body.districtId == 0) ? ` ` : `and A."districtId" = ${req.body.districtId}`;
            var month = `and A."month" BETWEEN ${req.body.startMonth} and  ${req.body.endMonth} `

            db.sequelize.query(`            
            select A."patientId",A."nameOfPatient",A."patientMobileNumber",
            A.year,A.month,A."ageYears",G."categoryOptionName" gender,
            GR."categoryOptionName" grading, A."districtId",D."districtName",
            A."facilityId",F."facilityName", A."villageId",V."villageName"
            from public."lymphedemaLineLists" A
            inner join public."lymphedemaLineListFollowUpsHFs" LH ON A.id=LH."lymphedemaLineListId" 
            left join public."udCategoryOptions" G on G.id = A.gender
            left join public."udCategoryOptions" GR on GR.id = A.grading
            left join public.districts D on D.id = A."districtId" 
            left join public.facilities F on F.id=A."facilityId"
            left join public.villages V on V.id = A."villageId"
            where lower(A."diseaseType") like '%hydrocele%' and A."isActive" = true 
            and LH."isActive" =true and LH."isSurgeryDone"=true 
            ${year} ${month} ${districtId}
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

    const GetMFPositiveCasesDistrictsDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var year = `and A."year" = ${req.body.year} `;
            var districtId = (req.body.districtId.length == 0 || req.body.districtId == 0) ? ` ` : `and A."districtId" = ${req.body.districtId}`;
            var month = `and A."month" BETWEEN ${req.body.startMonth} and  ${req.body.endMonth} `

            db.sequelize.query(`            
            select MP."patientId",MP."patientName",MP."patientPhoneNo",
            A.year,A.month,MP."ageYears",G."categoryOptionName" gender,
            MP."bsNumber",MP."mfCount", A."districtId",D."districtName",
            A."facilityId",F."facilityName", A."villageId",V."villageName"
            from public."mfPositiveLineListPatients" MP
            inner join public."mfPositiveLineLists" A ON A.id=MP."mfPositiveLineListId"
            left join public."udCategoryOptions" G on G.id = MP.gender
            left join public.districts D on D.id = A."districtId" 
            left join public.facilities F on F.id=A."facilityId"
            left join public.villages V on V.id = A."villageId"
            where MP."isActive" =true and A."isActive" =true
            ${year} ${month} ${districtId}
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
    const GetMDAIDACoverageAndConsumptionDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var startYear = ''
            var endYear = ''
            var year = ''
            var districtId = ''            
           
            if (req.body.startYear.length > 0 && req.body.endYear.length > 0 ) {
                year = ` and m."year" BETWEEN ${req.body.startYear} and  ${req.body.endYear}`;
                startYear=req.body.startYear;
                endYear= req.body.endYear;
            }
            if (req.body.districtId.length > 0 && req.body.districtId !='0' ) {
                districtId = ` and m."districtId" = ${req.body.districtId}`;

                db.sequelize.query(`            
                select  C0."talukaId",
                C0."talukaName" "name",
              	(coalesce((Cast(C1. "noOfDECTabletsConsumed" as float) /
                    case when C1."noOfDECTabletsGiven"=0 then null else C1."noOfDECTabletsGiven" end),0)*100.00)::DECIMAL(10,2) "percentConsumption",
                (coalesce((Cast(C2. "noOfPeopleAdministered" as float) /
                    case when C2."eligiblePopulation"=0 then null else C2."eligiblePopulation" end) ,0)*100.00)::DECIMAL(10,2) "percentCoverage"
                 from
                 (select id "talukaId","talukaName" from public.talukas m where 1=1 ${districtId} ) C0
                 left join
                (select m."talukaId", sum(coalesce(mp."noOfDECTabletsConsumed",0)) "noOfDECTabletsConsumed" ,
                sum(coalesce(mp."noOfDECTabletsRecovered",0)) "noOfDECTabletsRecovered" ,
                (sum(coalesce(mp."noOfDECTabletsConsumed",0)) +  sum(coalesce(mp."noOfDECTabletsRecovered",0))) "noOfDECTabletsGiven"
                from public."postMDAEvalLists" m
                left join public."postMDAEvalListPersons" mp on mp."postMDAEvalListId"=m.id
                ${year} ${districtId}
                group by m."talukaId")C1
                on C0."talukaId"=C1."talukaId"
                left join
                (select m."talukaId",sum(m."eligiblePopulation") "eligiblePopulation",
                sum(coalesce(mcr."noOfPeopleAdministered",0)) "noOfPeopleAdministeredR",
                sum(coalesce(mcm."noOfPeopleAdministered",0)) "noOfPeopleAdministeredM",
                (sum(coalesce(mcr."noOfPeopleAdministered",0)) + sum(coalesce(mcm."noOfPeopleAdministered",0))) "noOfPeopleAdministered"
                from public."mdaIDACoverages" m
                left join public."mdaIDACoverageRegularLists" mcr on m.id=mcr."mdaIDACoverageId"
                left join public."mdaIDACoverageMopUpLists" mcm on m.id=mcm."mdaIDACoverageId"
                ${year} ${districtId}
                group by m."talukaId")C2 on C0."talukaId"=c2."talukaId"
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
            }
            else
            {
                // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                // const offset = (page - 1) * itemsPerPage;

                db.sequelize.query(`            
                select coalesce (C1."districtId",C2."districtId") "districtId",
                D."districtName" "name",
				C1. "noOfDECTabletsConsumed",C1."noOfDECTabletsGiven",
				C2. "noOfPeopleAdministered",C2."eligiblePopulation",
                (coalesce((Cast(C1. "noOfDECTabletsConsumed" as float) /
                    case when C1."noOfDECTabletsGiven"=0 then null else C1."noOfDECTabletsGiven" end),0)*100.00)::DECIMAL(10,2) "percentConsumption",
                (coalesce((Cast(C2. "noOfPeopleAdministered" as float) /
                    case when C2."eligiblePopulation"=0 then null else C2."eligiblePopulation" end) ,0)*100.00)::DECIMAL(10,2) "percentCoverage"
                from
                (select m."districtId", sum(coalesce(mp."noOfDECTabletsConsumed",0)) "noOfDECTabletsConsumed" ,
                sum(coalesce(mp."noOfDECTabletsRecovered",0)) "noOfDECTabletsRecovered" ,
                (sum(coalesce(mp."noOfDECTabletsConsumed",0)) +  sum(coalesce(mp."noOfDECTabletsRecovered",0))) "noOfDECTabletsGiven"
                from public."postMDAEvalLists" m
                left join public."postMDAEvalListPersons" mp on mp."postMDAEvalListId"=m.id
                ${year}
                group by m."districtId")C1
                full outer join
                (select m."districtId",sum(m."eligiblePopulation") "eligiblePopulation",
                sum(coalesce(mcr."noOfPeopleAdministered",0)) "noOfPeopleAdministeredR",
                sum(coalesce(mcm."noOfPeopleAdministered",0)) "noOfPeopleAdministeredM",
                (sum(coalesce(mcr."noOfPeopleAdministered",0)) + sum(coalesce(mcm."noOfPeopleAdministered",0))) "noOfPeopleAdministered"
                from public."mdaIDACoverages" m
                left join public."mdaIDACoverageRegularLists" mcr on m.id=mcr."mdaIDACoverageId"
                left join public."mdaIDACoverageMopUpLists" mcm on m.id=mcm."mdaIDACoverageId"
                ${year}
                group by m."districtId")C2 on c1."districtId"=c2."districtId"
                left join districts D ON D.id = coalesce (C1."districtId",C2."districtId")
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
            }
        })
    
    }
    const GetMdaTasActivityStatusDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}
            
            var year = `and ("tas1Year"<= ${req.body.year} or "tas2Year"<= ${req.body.year} or "tas3Year"<= ${req.body.year}) `;
           
            db.sequelize.query(`            
            SELECT * FROM public."mdaTASActivityStatus"
            where 1=1  ${year}
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

    const GetMMDPGraphDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var startYear = ''
            var endYear = ''
            var year = ''
            var districtId = ''

            if (req.body.startYear.length > 0 && req.body.endYear.length > 0 ) {
                year = `and l."year" BETWEEN ${req.body.startYear} and  ${req.body.endYear}`;
                startYear=req.body.startYear;
                endYear= req.body.endYear;
            }
            if (req.body.districtId.length > 0 && req.body.districtId !='0' ) {
                districtId = `and l."districtId" = ${req.body.districtId}`;

                db.sequelize.query(`            
                select A0."talukaId",A0."talukaName" "name",
                Coalesce(A1."totalCases",0) "totalCases", 
                Coalesce(A2."mmdpTrained",0) "mmdpTrained", 
                Coalesce(A3."mmdpKitGiven",0) "mmdpKitGiven",
                Coalesce((CAST(A2."mmdpTrained" AS float) / 
                    (case when A1."totalCases"=0 then null else A1."totalCases" end) * 100.00),0)
                    :: DECIMAL(10,2) as "mmdpTrainedPercent",
                Coalesce((CAST(A3."mmdpKitGiven" AS float) / 
                    (case when A1."totalCases"=0 then null else A1."totalCases" end) * 100.00),0)
                    :: DECIMAL(10,2) as "mmdpKitGivenPercent"
                from 
				(select id "talukaId","talukaName" from public.talukas l where 1=1  ${districtId} )A0
				left join
				(select l."talukaId", count(id) "totalCases" 
                from public."vMMDPReporting" l where l."diseaseType" like '%Lymphedema%' 
                ${year}  ${districtId} 
                group by l."talukaId") A1
				ON A0."talukaId"=A1."talukaId"
                left join
                (select l."talukaId", count(l.id) "mmdpTrained" 
                from public."vMMDPReporting" l 
                inner join lateral
                (select * from public."lymphedemaLineListFollowUpsLves"  where "lymphedemaLineListId"= l.id 
                 and Coalesce("isServiceMMDPTrainingGiven",false)=true and "isActive"=true limit 1 )lf on true
                where l."diseaseType" like '%Lymphedema%' 
                ${year}  ${districtId}
                group by l."talukaId")A2
                ON A0."talukaId"=A2."talukaId"
                left join
                (select l."talukaId", count(l.id) "mmdpKitGiven" 
                from public."vMMDPReporting" l 
                inner join lateral
                (select * from public."lymphedemaLineListFollowUpsLves"  where "lymphedemaLineListId"= l.id 
                 and Coalesce("isServiceMMDPKitGiven",false)=true and "isActive"=true limit 1 )lf on true
                where l."diseaseType" like '%Lymphedema%' 
                ${year}   ${districtId}
                group by l."talukaId")A3
                ON A0."talukaId"=A3."talukaId"             
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
            }
            else
            {
                // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                // const offset = (page - 1) * itemsPerPage;

                db.sequelize.query(`            
                select A0."districtId",A0."districtName" "name",
                Coalesce(A1."totalCases",0) "totalCases",
                Coalesce(A2."mmdpTrained",0) "mmdpTrained",
                Coalesce(A3."mmdpKitGiven",0) "mmdpKitGiven",
                Coalesce((CAST(A2."mmdpTrained" AS float) /
                    (case when A1."totalCases"=0 then null else A1."totalCases" end) * 100.00),0)
                    :: DECIMAL(10,2) as "mmdpTrainedPercent",
                Coalesce((CAST(A3."mmdpKitGiven" AS float) /
                    (case when A1."totalCases"=0 then null else A1."totalCases" end) * 100.00),0)
                    :: DECIMAL(10,2) as "mmdpKitGivenPercent"
                from 
                (select id "districtId","districtName" from  public.districts) A0
                left join
                (select l."districtId", count(id) "totalCases"
                from public."vMMDPReporting" l where l."diseaseType" like '%Lymphedema%' 
                ${year}
                group by l."districtId") A1
                ON A0."districtId"=A1."districtId"
                left join
                (select l."districtId", count(l.id) "mmdpTrained"
                from public."vMMDPReporting" l
                inner join lateral
                (select * from public."lymphedemaLineListFollowUpsLves"  where "lymphedemaLineListId"= l.id
                and Coalesce("isServiceMMDPTrainingGiven",false)=true and "isActive"=true limit 1 )lf on true
                where l."diseaseType" like '%Lymphedema%' 
                ${year}
                group by l."districtId")A2
                ON A0."districtId"=A2."districtId"
                left join
                (select l."districtId", count(l.id) "mmdpKitGiven"
                from public."vMMDPReporting" l
                inner join lateral
                (select * from public."lymphedemaLineListFollowUpsLves"  where "lymphedemaLineListId"= l.id
                and Coalesce("isServiceMMDPKitGiven",false)=true and "isActive"=true limit 1 )lf on true
                where l."diseaseType" like '%Lymphedema%' 
                ${year}
                group by l."districtId")A3
                ON A0."districtId"=A3."districtId"
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
            }
        })
    
    }
    const GetFilariaUnitPerformanceDao = async (req) => {
        try {
            return new Promise(async function (resolve) {
                var response = {}
                // console.log("req body",req.body)
                var year = '';
                var months = 12;
                const todaysDate = new Date();
                const currentYear = todaysDate.getFullYear();

                if (!req.body.year.length == 0) {
                    year = `and year=  ${req.body.year}`
                    if (req.body.year==currentYear)
                   {
                        months=todaysDate.getMonth +1;
                   }
                }

            const fsu = db.sequelize.query(`
            select A1."nameOfUnitId",A1."nameOfUnit", 
            (3000 * ${months}) "noOfPersonsTarget", 
            coalesce(A2. "noOfPersonsAchieved",0)  "noOfPersonsAchieved",
            coalesce((CAST(A2. "noOfPersonsAchieved" as float)/
                      (3000 * ${months} )*100),0) :: DECIMAL(10,2) as "percentOfPersonsAchieved",
            coalesce(A3. "noOfCasesMF",0)  "noOfCasesMF",
            coalesce(A4. "noOfCasesDisease",0)  "noOfCasesDisease",
            (coalesce(A3. "noOfCasesMF",0)+coalesce(A4. "noOfCasesDisease",0))  "noOfCasesTotal",
            coalesce(A5. "noOfCasesMFTreated",0)  "noOfCasesMFTreated",
            coalesce(A6."noOfCasesDiseaseTreated",0)  "noOfCasesDiseaseTreated",
            (coalesce(A5. "noOfCasesMFTreated",0) + coalesce(A6."noOfCasesDiseaseTreated",0))  "noOfCasesTreatedTotal"
            from 
            (select id "nameOfUnitId","nameOfControlUnit" "nameOfUnit"
                 from  public."verticalControlUnits" where "unitType"='FSU')A1
            left join
            (select m."nameOfUnit" "nameOfUnitId", sum(ms."noOfPersonsNBSE") "noOfPersonsAchieved"  
            from public."mfPositiveLineLists" m
            left join public."vMFPositiveLineListSurveysById" ms on ms.id=m.id
            where m."isActive"=true  ${year}
            group by m."nameOfUnit" ) A2
            on A1."nameOfUnitId"=A2."nameOfUnitId"
            left join
            (select "nameOfUnit" "nameOfUnitId", count(mp."id") "noOfCasesMF"  
            from public."mfPositiveLineLists" m
            left join public."mfPositiveLineListPatients" mp on mp."mfPositiveLineListId"=m.id
            where m."isActive"=true and mp."isActive"=true ${year}
            group by m."nameOfUnit" ) A3
            on A1."nameOfUnitId"=A3."nameOfUnitId"
            left join
            (select "nameOfUnit" "nameOfUnitId", count(m."id") "noOfCasesDisease"  
            from public."lymphedemaLineLists" m
            where m."isActive"=true and  m."diseaseType" like '%Lymphedema%' ${year}
            group by m."nameOfUnit" ) A4
            on A1."nameOfUnitId"=A4."nameOfUnitId"
            left join
            (select "nameOfUnit" "nameOfUnitId", count(mp."id") "noOfCasesMFTreated"  
            from public."mfPositiveLineLists" m
            left join public."mfPositiveLineListPatients" mp on mp."mfPositiveLineListId"=m.id
            where m."isActive"=true and mp."isActive"=true and "isTreatmentGive"=true ${year}
            group by m."nameOfUnit" ) A5
            on A1."nameOfUnitId"=A5."nameOfUnitId"
            left join
            (select "nameOfUnit" "nameOfUnitId", count(m."id") "noOfCasesDiseaseTreated"  
            from public."lymphedemaLineLists" m
            inner join lateral
             (select * from public."lymphedemaLineListFollowUpsLves" ml
              where ml."lymphedemaLineListId"= m.id and ml."isActive"=true limit 1 )lf on true 
            where m."isActive"=true and  m."diseaseType" like '%Lymphedema%' ${year}
            group by m."nameOfUnit" ) A6
            on A1."nameOfUnitId"=A6."nameOfUnitId";
                `).then(([results, metadata]) => {
                    return results
                })

            const fcu = db.sequelize.query(`
            select A1."nameOfUnitId",A1."nameOfUnit", 
            (coalesce(A7."monthTarget",600)* ${months}) "noOfPersonsTarget", 
            coalesce(A2. "noOfPersonsAchieved",0)  "noOfPersonsAchieved",
            coalesce((CAST(A2. "noOfPersonsAchieved" as float)/
                      (coalesce(A7."monthTarget",600)* ${months})*100),0) :: DECIMAL(10,2) as "percentOfPersonsAchieved",
            coalesce(A3. "noOfCasesMF",0)  "noOfCasesMF",
            coalesce(A4. "noOfCasesDisease",0)  "noOfCasesDisease",
            (coalesce(A3. "noOfCasesMF",0)+coalesce(A4. "noOfCasesDisease",0))  "noOfCasesTotal",
            coalesce(A5. "noOfCasesMFTreated",0)  "noOfCasesMFTreated",
            coalesce(A6."noOfCasesDiseaseTreated",0)  "noOfCasesDiseaseTreated",
            (coalesce(A5. "noOfCasesMFTreated",0) + coalesce(A6."noOfCasesDiseaseTreated",0))  "noOfCasesTreatedTotal"
            from 
            (select id "nameOfUnitId","nameOfControlUnit" "nameOfUnit"
                 from  public."verticalControlUnits" where "unitType" in ('FCU', 'MC', 'RCTC'))A1
            left join
            (select m."nameOfUnit" "nameOfUnitId", sum(ms."noOfPersonsNBSE") "noOfPersonsAchieved"  
            from public."mfPositiveLineLists" m
            left join public."vMFPositiveLineListSurveysById" ms on ms.id=m.id
            where m."isActive"=true  ${year}
            group by m."nameOfUnit" ) A2
            on A1."nameOfUnitId"=A2."nameOfUnitId"
            left join
            (select "nameOfUnit" "nameOfUnitId", count(mp."id") "noOfCasesMF"  
            from public."mfPositiveLineLists" m
            left join public."mfPositiveLineListPatients" mp on mp."mfPositiveLineListId"=m.id
            where m."isActive"=true and mp."isActive"=true ${year}
            group by m."nameOfUnit" ) A3
            on A1."nameOfUnitId"=A3."nameOfUnitId"
            left join
            (select "nameOfUnit" "nameOfUnitId", count(m."id") "noOfCasesDisease"  
            from public."lymphedemaLineLists" m
            where m."isActive"=true and  m."diseaseType" like '%Lymphedema%' ${year}
            group by m."nameOfUnit" ) A4
            on A1."nameOfUnitId"=A4."nameOfUnitId"
            left join
            (select "nameOfUnit" "nameOfUnitId", count(mp."id") "noOfCasesMFTreated"  
            from public."mfPositiveLineLists" m
            left join public."mfPositiveLineListPatients" mp on mp."mfPositiveLineListId"=m.id
            where m."isActive"=true and mp."isActive"=true and "isTreatmentGive"=true ${year}
            group by m."nameOfUnit" ) A5
            on A1."nameOfUnitId"=A5."nameOfUnitId"
            left join
            (select "nameOfUnit" "nameOfUnitId", count(m."id") "noOfCasesDiseaseTreated"  
            from public."lymphedemaLineLists" m
            inner join lateral
             (select * from public."lymphedemaLineListFollowUpsLves" ml
              where ml."lymphedemaLineListId"= m.id and ml."isActive"=true limit 1 )lf on true 
            where m."isActive"=true and  m."diseaseType" like '%Lymphedema%' ${year}
            group by m."nameOfUnit" ) A6
            on A1."nameOfUnitId"=A6."nameOfUnitId"
            left join 
            (select "verticalControlUnitId" "nameOfUnitId",
            SUM(CASE WHEN  "fieldUnitType" ='NC' THEN 1500 ELSE 600 END) as "monthTarget"		
            from public."verticalControlFieldUnits" 
            group by "verticalControlUnitId") A7		   
            on A1."nameOfUnitId"=A7."nameOfUnitId";
                `).then(([results, metadata]) => {
                    return results
                })
            const nc = db.sequelize.query(`
            select A1."nameOfUnitId",A1."nameOfUnit", 
            (1500 * ${months} ) "noOfPersonsTarget", 
            coalesce(A2. "noOfPersonsAchieved",0)  "noOfPersonsAchieved",
            coalesce((CAST(A2. "noOfPersonsAchieved" as float)/
                      (1500* ${months} )*100),0) :: DECIMAL(10,2) as "percentOfPersonsAchieved",
            coalesce(A3. "noOfCasesMF",0)  "noOfCasesMF",
            coalesce(A4. "noOfCasesDisease",0)  "noOfCasesDisease",
            (coalesce(A3. "noOfCasesMF",0)+coalesce(A4. "noOfCasesDisease",0))  "noOfCasesTotal",
            coalesce(A5. "noOfCasesMFTreated",0)  "noOfCasesMFTreated",
            coalesce(A6."noOfCasesDiseaseTreated",0)  "noOfCasesDiseaseTreated",
            (coalesce(A5. "noOfCasesMFTreated",0) + coalesce(A6."noOfCasesDiseaseTreated",0))  "noOfCasesTreatedTotal"
            from 
            (select id "nameOfUnitId","fieldUnitName" "nameOfUnit"
                 from  public."verticalControlFieldUnits" where "fieldUnitType" like 'NC')A1
            left join
            (select m."nameOfFilariaFieldUnit" "nameOfUnitId", sum(ms."noOfPersonsNBSE") "noOfPersonsAchieved"  
            from public."mfPositiveLineLists" m
            left join public."vMFPositiveLineListSurveysById" ms on ms.id=m.id
            where m."isActive"=true  ${year}
            group by m."nameOfFilariaFieldUnit" ) A2
            on A1."nameOfUnitId"=A2."nameOfUnitId"
            left join
            (select "nameOfFilariaFieldUnit" "nameOfUnitId", count(mp."id") "noOfCasesMF"  
            from public."mfPositiveLineLists" m
            left join public."mfPositiveLineListPatients" mp on mp."mfPositiveLineListId"=m.id
            where m."isActive"=true and mp."isActive"=true ${year}
            group by m."nameOfFilariaFieldUnit" ) A3
            on A1."nameOfUnitId"=A3."nameOfUnitId"
            left join
            (select "nameOfFiledUnit" "nameOfUnitId", count(m."id") "noOfCasesDisease"  
            from public."lymphedemaLineLists" m
            where m."isActive"=true and  m."diseaseType" like '%Lymphedema%' ${year}
            group by m."nameOfFiledUnit" ) A4
            on A1."nameOfUnitId"=A4."nameOfUnitId"
            left join
            (select "nameOfFilariaFieldUnit" "nameOfUnitId", count(mp."id") "noOfCasesMFTreated"  
            from public."mfPositiveLineLists" m
            left join public."mfPositiveLineListPatients" mp on mp."mfPositiveLineListId"=m.id
            where m."isActive"=true and mp."isActive"=true and "isTreatmentGive"=true ${year}
            group by m."nameOfFilariaFieldUnit" ) A5
            on A1."nameOfUnitId"=A5."nameOfUnitId"
            left join
            (select "nameOfFiledUnit" "nameOfUnitId", count(m."id") "noOfCasesDiseaseTreated"  
            from public."lymphedemaLineLists" m
            inner join lateral
             (select * from public."lymphedemaLineListFollowUpsLves" ml
              where ml."lymphedemaLineListId"= m.id and ml."isActive"=true limit 1 )lf on true 
            where m."isActive"=true and  m."diseaseType" like '%Lymphedema%' ${year}
            group by m."nameOfFiledUnit" ) A6
            on A1."nameOfUnitId"=A6."nameOfUnitId"
                `).then(([results, metadata]) => {
                    return results
                })
                Promise
                    .all([fsu, fcu, nc]).then(data => {
                        response.error = false
                        var obj = {}
                        obj.fsu = data[0]
                        obj.fcu = data[1]
                        obj.nc = data[2]
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

    const GetAlertsForUserDao = async (req) => {
        try {
            return new Promise(async function (resolve) {
                var response = {}
                console.log("req body",req.body.userId)
                var userId = '';

                if (!req.body.userId.length == 0) {
                    userId = `and "userId" =  ${req.body.userId}`
                }
                else
                {
                    userId = `and "userId" = 0 ` 
                }

            const newAlerts = db.sequelize.query(`
                select count (id) "newAlerts" from alerts where "createdAt">= (now()::date - '8 days'::interval)
                ${userId} 
                `).then(([results, metadata]) => {
                    return results
                })

            const allAlerts = db.sequelize.query(`
                select * from alerts where 1=1  ${userId} 
                order by id desc
                `).then(([results, metadata]) => {
                    return results
                })
                Promise
                    .all([newAlerts, allAlerts]).then(data => {
                        response.error = false
                        var obj = {}
                        obj.newAlerts = data[0]
                        obj.allAlerts = data[1]
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

    return {
        GetEndemicityTotalAllDistrictsDao,
        get_DashboardTodayEntryDao,
        DashboardBSCollectedTodayDao,
        DashboardLFThisMonthDao,
        DashboardMFPositive12MonthsDao,
        DashboardLFCases12MonthsDao,
        DashboardMONotVerifiedDao,
        DashboardFSUTargetsDao,
        DashboardMFRatesDao,
        DashboardDrugConsumptionDao,
        GetMFRateTimeTrendDao,
        GetMFRateTimeTrendListDao,
        GetLymphedemaCasesDistrictsDao,
        GetHydroceleCasesDistrictsDao,
        GetHydroceleSurgeriesDistrictsDao,
        GetMFPositiveCasesDistrictsDao,
        GetMDAIDACoverageAndConsumptionDao,
        GetMdaTasActivityStatusDao,
        GetMMDPGraphDao,
        GetFilariaUnitPerformanceDao,
        GetAlertsForUserDao
    };
};
export default dashboardDao();