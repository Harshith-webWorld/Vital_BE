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
const GraphDao = () => {





    const GetMMDPDetailsInPercentageDao = async (req) => {
        var response = {}

        // new Promise(async function (resolve) {
        //     var response = {}

        //     if (typeof req.body.year  == 'string' && req.body.year.length != 0 ){
        //         // req.body.year = JSON.parse(req.body.year)
        //         req.body.year =  req.body.year.split(",")
        //         console.log("year", req.body.year)
        //     }

        //     var year = `and  year IN (${req.body.year})`

        //     if (req.body.year.length == 0) {
        //         year = ""
        //     }
        let results =    [
                {
                  "id": 1,
                  "districtName": "Ahmadnagar",
                  "PercentageMMDPTraining": 75,
                  "PercentageMMDPKitGiven": 72
                },
                {
                  "id": 2,
                  "districtName": "Akola",
                  "PercentageMMDPTraining": 90,
                  "PercentageMMDPKitGiven": 85
                },
                {
                  "id": 3,
                  "districtName": "Amravati",
                  "PercentageMMDPTraining": 79,
                  "PercentageMMDPKitGiven": 80
                },
                {
                  "id": 4,
                  "districtName": "Aurangabad",
                  "PercentageMMDPTraining": 85,
                  "PercentageMMDPKitGiven": 89
                },
                {
                  "id": 5,
                  "districtName": "Beed",
                  "PercentageMMDPTraining": 93,
                  "PercentageMMDPKitGiven": 91
                },
                {
                  "id": 6,
                  "districtName": "Bhandara",
                  "PercentageMMDPTraining": 96,
                  "PercentageMMDPKitGiven": 95
                },
                {
                  "id": 7,
                  "districtName": "Buldana",
                  "PercentageMMDPTraining": 84,
                  "PercentageMMDPKitGiven": 79
                },
                {
                  "id": 8,
                  "districtName": "Chandrapur",
                  "PercentageMMDPTraining": 97,
                  "PercentageMMDPKitGiven": 95
                },
                {
                  "id": 9,
                  "districtName": "Dhule",
                  "PercentageMMDPTraining": 72,
                  "PercentageMMDPKitGiven": 80
                },
                {
                  "id": 10,
                  "districtName": "Gadchiroli",
                  "PercentageMMDPTraining": 72,
                  "PercentageMMDPKitGiven": 75
                },
                {
                  "id": 11,
                  "districtName": "Gondiya",
                  "PercentageMMDPTraining": 85,
                  "PercentageMMDPKitGiven": 90
                },
                {
                  "id": 12,
                  "districtName": "Hingoli",
                  "PercentageMMDPTraining": 80,
                  "PercentageMMDPKitGiven": 79
                },
                {
                  "id": 13,
                  "districtName": "Jalgaon",
                  "PercentageMMDPTraining": 89,
                  "PercentageMMDPKitGiven": 85
                },
                {
                  "id": 14,
                  "districtName": "Jalna",
                  "PercentageMMDPTraining": 91,
                  "PercentageMMDPKitGiven": 93
                },
                {
                  "id": 15,
                  "districtName": "Kolhapur",
                  "PercentageMMDPTraining": 95,
                  "PercentageMMDPKitGiven": 96
                },
                {
                  "id": 16,
                  "districtName": "Latur",
                  "PercentageMMDPTraining": 79,
                  "PercentageMMDPKitGiven": 84
                },
                {
                  "id": 19,
                  "districtName": "Nagpur",
                  "PercentageMMDPTraining": 95,
                  "PercentageMMDPKitGiven": 97
                },
                {
                  "id": 20,
                  "districtName": "Nanded",
                  "PercentageMMDPTraining": 80,
                  "PercentageMMDPKitGiven": 72
                },
                {
                  "id": 21,
                  "districtName": "Nandurbar",
                  "PercentageMMDPTraining": 75,
                  "PercentageMMDPKitGiven": 72
                },
                {
                  "id": 22,
                  "districtName": "Nashik",
                  "PercentageMMDPTraining": 90,
                  "PercentageMMDPKitGiven": 85
                },
                {
                  "id": 23,
                  "districtName": "Osmanabad",
                  "PercentageMMDPTraining": 79,
                  "PercentageMMDPKitGiven": 80
                },
                {
                  "id": 24,
                  "districtName": "Palghar",
                  "PercentageMMDPTraining": 85,
                  "PercentageMMDPKitGiven": 89
                },
                {
                  "id": 25,
                  "districtName": "Parbhani",
                  "PercentageMMDPTraining": 93,
                  "PercentageMMDPKitGiven": 91
                },
                {
                  "id": 26,
                  "districtName": "Pune",
                  "PercentageMMDPTraining": 96,
                  "PercentageMMDPKitGiven": 95
                },
                {
                  "id": 27,
                  "districtName": "Raigarh",
                  "PercentageMMDPTraining": 84,
                  "PercentageMMDPKitGiven": 79
                },
                {
                  "id": 28,
                  "districtName": "Ratnagiri",
                  "PercentageMMDPTraining": 97,
                  "PercentageMMDPKitGiven": 95
                },
                {
                  "id": 29,
                  "districtName": "Sangli",
                  "PercentageMMDPTraining": 72,
                  "PercentageMMDPKitGiven": 80
                },
                {
                  "id": 30,
                  "districtName": "Satara",
                  "PercentageMMDPTraining": 72,
                  "PercentageMMDPKitGiven": 75
                },
                {
                  "id": 31,
                  "districtName": "Sindhudurg",
                  "PercentageMMDPTraining": 85,
                  "PercentageMMDPKitGiven": 90
                },
                {
                  "id": 32,
                  "districtName": "Solapur",
                  "PercentageMMDPTraining": 80,
                  "PercentageMMDPKitGiven": 79
                },
                {
                  "id": 33,
                  "districtName": "Thane",
                  "PercentageMMDPTraining": 89,
                  "PercentageMMDPKitGiven": 85
                },
                {
                  "id": 34,
                  "districtName": "Wardha",
                  "PercentageMMDPTraining": 91,
                  "PercentageMMDPKitGiven": 93
                },
                {
                  "id": 35,
                  "districtName": "Washim",
                  "PercentageMMDPTraining": 95,
                  "PercentageMMDPKitGiven": 96
                },
                {
                  "id": 36,
                  "districtName": "Yavatmal",
                  "PercentageMMDPTraining": 79,
                  "PercentageMMDPKitGiven": 84
                }
            ]
        //     .then(([results, metadata]) => {

        //             response.error = false
        //             response.data = results
        //             // console.log("results", results)
        //         }).catch((error) => {
        //             console.log(error)
        //             response.error = true
        //         })
        //         .finally(() => {
        //             resolve(response)
        //         })
        // })
        response.error = false
        response.data = results
        return response
    }

    const GetEndemicityGraphAllDistrictsDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            if (typeof req.body.month  == 'string' && req.body.month.length != 0 ){
                // req.body.month = JSON.parse(req.body.month)
                req.body.month =  req.body.month.split(",")
                console.log("month", req.body.month)

            }
            if (typeof req.body.year  == 'string' && req.body.year.length != 0 ){
                // req.body.year = JSON.parse(req.body.year)
                req.body.year =  req.body.year.split(",")
                console.log("year", req.body.year)
            }
            if (typeof req.body.districtId  == 'string'&& req.body.districtId.length != 0){
                // req.body.year = JSON.parse(req.body.year)
                req.body.districtId =  req.body.districtId.split(",")
                console.log("districtId", req.body.districtId)
            }
            var districtId = `where  D."id"  IN (${req.body.districtId})`
            var year = `and  year IN (${req.body.year})`
            var month = `and  month IN (${req.body.month})`




            if (req.body.year.length == 0) {
                year = ""
            }
            if (req.body.month.length == 0) {
                month = ""
            }
            if (req.body.districtId.length == 0) {
                districtId = ""
            }
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select (D."id") AS "districtId",D."districtName",
            L1."NoOfLFCases",L2."NoOfHydroceleCases",
            L3."NoOfHydroceleOperated",L4."NoOfPendingApprovalMO"
            from public.districts D 
            LEFT OUTER JOIN 
            (
                select count(id) AS "NoOfLFCases","districtId" from public."lymphedemaLineLists" L
                where lower("diseaseType") like '%lymphedema%' and L."isActive"=true
                ${year} ${month}
                group by "districtId"
            )L1 ON D."id"=L1."districtId"
            LEFT OUTER JOIN 
            (
                select count(id) AS "NoOfHydroceleCases","districtId" from public."lymphedemaLineLists" L
                where lower("diseaseType") like '%hydrocele%' and L."isActive"=true
                ${year} ${month}
                group by "districtId"
            )L2 ON D."id"=L2."districtId"
            LEFT OUTER JOIN 
            (
                select count(L.id) AS "NoOfHydroceleOperated",L."districtId" from public."lymphedemaLineLists" L
                inner join public."lymphedemaLineListFollowUpsHFs" HF on HF."lymphedemaLineListId"=L.ID
                where lower("diseaseType") like '%hydrocele%' and HF."isSurgeryDone"=true
                and L."isActive"=true
                ${year} ${month}
                group by L."districtId"
            )L3 ON D."id"=L3."districtId"
            LEFT OUTER JOIN 
            (
                select count(L.id) AS "NoOfPendingApprovalMO",L."districtId" from public."lymphedemaLineLists" L
                inner join public."lymphedemaLineListSurveys" LF on LF."lymphedemaLineListId"=L.ID
                where LF."isVerified"=false and L."isActive"=true
                ${year} ${month}
                group by L."districtId"
            )L4 ON D."id"=L3."districtId"
            ${districtId}
            
  
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



    const GetEndemicityGraphAllTaluksByDistrictDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var year = `and year=  ${req.body.year}`
            var month = `and month = ${req.body.month}`
            var districtId = req.body.districtId




            if (req.body.year.length == 0) {
                year = ""
            }
            if (req.body.month.length == 0) {
                month = ""
            }

            if (req.body.districtId.length == 0) {
                districtId = ""
            }
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select (T."id") AS "talukaId",T."talukaName",T."districtId",
            L1."NoOfLFCases",L2."NoOfHydroceleCases",
            L3."NoOfHydroceleOperated",L4."NoOfPendingApprovalMO"
            from public.talukas T 
            LEFT OUTER JOIN 
            (
                select count(id) AS "NoOfLFCases","talukaId" from public."lymphedemaLineLists" L
                where lower("diseaseType") like '%lymphedema%' and L."isActive"=true
${year} ${month}
                group by "talukaId"
            )L1 ON T."id"=L1."talukaId"
            LEFT OUTER JOIN 
            (
                select count(id) AS "NoOfHydroceleCases","talukaId" from public."lymphedemaLineLists" L
                where lower("diseaseType") like '%hydrocele%' and L."isActive"=true
                ${year} ${month}
                group by "talukaId"
            )L2 ON T."id"=L2."talukaId"
            LEFT OUTER JOIN 
            (
                select count(L.id) AS "NoOfHydroceleOperated",L."talukaId" from public."lymphedemaLineLists" L
                inner join public."lymphedemaLineListFollowUpsHFs" HF on HF."lymphedemaLineListId"=L.ID
                where lower("diseaseType") like '%hydrocele%' and HF."isSurgeryDone"=true
                and L."isActive"=true
                ${year} ${month}
                group by L."talukaId"
            )L3 ON T."id"=L3."talukaId"
            LEFT OUTER JOIN 
            (
                select count(L.id) AS "NoOfPendingApprovalMO",L."talukaId" from public."lymphedemaLineLists" L
                inner join public."lymphedemaLineListSurveys" LF on LF."lymphedemaLineListId"=L.ID
                where LF."isVerified"=false and L."isActive"=true
                ${year} ${month}
                group by L."talukaId"
            )L4 ON T."id"=L3."talukaId"
            where T."districtId" =${districtId}
  
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


    const GetMFEndemicityGraphAllDistrictsDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            if (typeof req.body.month  == 'string' && req.body.month.length != 0 ){
                // req.body.month = JSON.parse(req.body.month)
                req.body.month =  req.body.month.split(",")
                // console.log("month", req.body.month)

            }
            if (typeof req.body.year  == 'string' && req.body.year.length != 0 ){
                // req.body.year = JSON.parse(req.body.year)
                req.body.year =  req.body.year.split(",")
                // console.log("year", req.body.year)
            }
            if (typeof req.body.districtId  == 'string'&& req.body.districtId.length != 0){
                // req.body.year = JSON.parse(req.body.year)
                req.body.districtId =  req.body.districtId.split(",")
                // console.log("districtId", req.body.districtId)
            }
            var year = `and  year IN (${req.body.year})`
            var month = `and  month IN (${req.body.month})`
            var districtId = `where  D."id"  IN (${req.body.districtId})`

            if (req.body.year.length == 0) {
                year = ""
            }
            if (req.body.month.length == 0) {
                month = ""
            }
            if (req.body.districtId.length == 0) {
                districtId = ""
            }


            
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            
            --GetMFEndemicityGraphAllDistricts
            select (D."id") AS "districtId",D."districtName",
            M1."NoMFPosetive",M2."NoBSCollected",M3."NoBSExamined",M4."mfRate"
            from public.districts D 
            LEFT OUTER JOIN 
            ( 
                --GetMFEndemicityGraphMFPosetive
                select sum( MS1."noOfPersons") AS "NoMFPosetive",M."districtId"  
                from public."mfPositiveLineLists" M left join
                (select MS."noOfPersons",MS."mfPositiveLineListId" from public."vMFPositiveLineListSurveys" MS
                                              where MS."categoryOptionCode"='NPMF') MS1
                ON M.id=MS1."mfPositiveLineListId"
                where M."isActive"=true
                ${year} ${month}
                group by M."districtId"
            ) M1 ON D."id"=M1."districtId"
            LEFT OUTER JOIN 
            ( 
                --GetMFEndemicityGraphBSCollected
                select sum( MS1."noOfPersons") AS "NoBSCollected",M."districtId"  
                from public."mfPositiveLineLists" M left join
                (select MS."noOfPersons",MS."mfPositiveLineListId" from public."vMFPositiveLineListSurveys" MS
                                              where MS."categoryOptionCode"='NPC') MS1
                ON M.id=MS1."mfPositiveLineListId"
                where M."isActive"=true
                ${year} ${month}
                group by M."districtId"
            ) M2 ON D."id"=M2."districtId"
            LEFT OUTER JOIN 
            ( 
                --GetMFEndemicityGraphBSExamined
                select sum( MS1."noOfPersons") AS "NoBSExamined",M."districtId"  
                from public."mfPositiveLineLists" M left join
                (select MS."noOfPersons",MS."mfPositiveLineListId" from public."vMFPositiveLineListSurveys" MS
                                              where MS."categoryOptionCode"='NBSE') MS1
                ON M.id=MS1."mfPositiveLineListId"
                where M."isActive"=true
                ${year} ${month} 
                group by M."districtId"
            ) M3 ON D."id"=M3."districtId"
            LEFT OUTER JOIN 
            ( 
                --GetMFEndemicityGraphMfRate 
                select 	
                 sum( MS1."noOfPersons") /
                    CASE sum( MS2."noOfPersons")
                        WHEN 0 THEN NULL
                        ELSE sum( MS2."noOfPersons")
                    END * 100 AS "mfRate",
                    M."districtId"  
                from public."mfPositiveLineLists" M left join
                (select MS."noOfPersons",MS."mfPositiveLineListId" from public."vMFPositiveLineListSurveys" MS
                                              where MS."categoryOptionCode"='NBSE') MS1 
                ON M.id=MS1."mfPositiveLineListId"
                left join
                (select MS."noOfPersons",MS."mfPositiveLineListId" from public."vMFPositiveLineListSurveys" MS
                                              where MS."categoryOptionCode"='NPC') MS2	
                ON M.id=MS2."mfPositiveLineListId"
                where M."isActive"=true
                ${year} ${month} 
                group by M."districtId"
            ) M4 ON D."id"=M4."districtId"
            ${districtId}
        

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

    const GetMFEndemicityGraphMFPosetiveDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            if (typeof req.body.month  == 'string' && req.body.month.length != 0 ){
                // req.body.month = JSON.parse(req.body.month)
                req.body.month =  req.body.month.split(",")
                console.log("month", req.body.month)

            }
            if (typeof req.body.year  == 'string' && req.body.year.length != 0 ){
                // req.body.year = JSON.parse(req.body.year)
                req.body.year =  req.body.year.split(",")
                console.log("year", req.body.year)
            }

// console.log("month",req.body.month[0])
            var districtId = `and  M."districtId" = ${req.body.districtId}`
            var year = `and  M.year IN (${req.body.year})`
            var month = `and  M.month IN (${req.body.month})`


           
            if (req.body.year.length == 0) {
                year = ""
            }
            if (req.body.month.length == 0) {
                month = ""
            }




            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
                   
            select 	M."srNo",M."districtId",M."subCenterId",M."villageId",
            D."districtName",Sb."subCenterName",F."facilityName",
            V."villageName",
            area,M."nameOfUnit",
            "nameOfFilariaFieldUnit","populationCoveredByUnit","noOfBSFoundPositive",
MS1."noOfPersons" "noOfPersonExamined",
V1."nameOfControlUnit",V2."fieldUnitName",M.month,M.year

            from public."mfPositiveLineLists" M 
            left join public.villages V on V.id = M."villageId"
            left join public."subCenters" Sb on Sb.id = M."subCenterId"
            left join public.districts D on D.id = M."districtId"
            left join public.facilities F on F.id = M."facilityId"
            left join public."verticalControlUnits" V1 ON V1.id=M."nameOfUnit"
            left join  public."verticalControlFieldUnits" V2 ON V2.id=M."nameOfFilariaFieldUnit"
                left join
                (select MS."noOfPersons",MS."mfPositiveLineListId" from public."vMFPositiveLineListSurveys" MS
                                              where MS."categoryOptionCode"='NPMF') MS1
                ON M.id=MS1."mfPositiveLineListId"
                where M."isActive"=true
                ${year} ${month} ${districtId}
            
    
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


    const GetMFEndemicityGraphBSCollectedDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}
            if (typeof req.body.month  == 'string' && req.body.month.length != 0 ){
                // req.body.month = JSON.parse(req.body.month)
                req.body.month =  req.body.month.split(",")
                console.log("month", req.body.month)

            }
            if (typeof req.body.year  == 'string' && req.body.year.length != 0 ){
                // req.body.year = JSON.parse(req.body.year)
                req.body.year =  req.body.year.split(",")
                console.log("year", req.body.year)
            }

// console.log("month",req.body.month[0])
            var districtId = `and  M."districtId" = ${req.body.districtId}`
            var year = `and  M.year IN (${req.body.year})`
            var month = `and  M.month IN (${req.body.month})`

            if (req.body.year.length == 0) {
                year = ""
            }
            if (req.body.month.length == 0) {
                month = ""
            }





            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            
             
            select 	M."srNo",M."districtId",M."subCenterId",M."villageId",
            D."districtName",Sb."subCenterName",F."facilityName",
            V."villageName",
            area,M."nameOfUnit",
            "nameOfFilariaFieldUnit","populationCoveredByUnit","noOfBSFoundPositive",
MS1."noOfPersons" "noOfPersonExamined",
V1."nameOfControlUnit",V2."fieldUnitName"

            from public."mfPositiveLineLists" M 
            left join public.villages V on V.id = M."villageId"
            left join public."subCenters" Sb on Sb.id = M."subCenterId"
            left join public.districts D on D.id = M."districtId"
            left join public.facilities F on F.id = M."facilityId"
            left join public."verticalControlUnits" V1 ON V1.id=M."nameOfUnit"
            left join  public."verticalControlFieldUnits" V2 ON V2.id=M."nameOfFilariaFieldUnit"
             left join
            (select MS."noOfPersons",MS."mfPositiveLineListId" from public."vMFPositiveLineListSurveys" MS
                                          where MS."categoryOptionCode"='NPC') MS1
            ON M.id=MS1."mfPositiveLineListId"
            where M."isActive"=true
                ${year} ${month} ${districtId}
            
    
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



    const GetMFEndemicityGraphBSExaminedDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            if (typeof req.body.month  == 'string' && req.body.month.length != 0 ){
                // req.body.month = JSON.parse(req.body.month)
                req.body.month =  req.body.month.split(",")
                console.log("month", req.body.month)

            }
            if (typeof req.body.year  == 'string' && req.body.year.length != 0 ){
                // req.body.year = JSON.parse(req.body.year)
                req.body.year =  req.body.year.split(",")
                console.log("year", req.body.year)
            }

// console.log("month",req.body.month[0])
            var districtId = `and  M."districtId" = ${req.body.districtId}`
            var year = `and  M.year IN (${req.body.year})`
            var month = `and  M.month IN (${req.body.month})`

            if (req.body.year.length == 0) {
                year = ""
            }
            if (req.body.month.length == 0) {
                month = ""
            }




            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            
            select 	M."srNo",M."districtId",M."subCenterId",M."villageId",
            D."districtName",Sb."subCenterName",F."facilityName",
            V."villageName",
            area,M."nameOfUnit",
            "nameOfFilariaFieldUnit","populationCoveredByUnit","noOfBSFoundPositive",
MS1."noOfPersons" "noOfPersonExamined",
V1."nameOfControlUnit",V2."fieldUnitName"

            from public."mfPositiveLineLists" M 
            left join public.villages V on V.id = M."villageId"
            left join public."subCenters" Sb on Sb.id = M."subCenterId"
            left join public.districts D on D.id = M."districtId"
            left join public.facilities F on F.id = M."facilityId"
            left join public."verticalControlUnits" V1 ON V1.id=M."nameOfUnit"
            left join  public."verticalControlFieldUnits" V2 ON V2.id=M."nameOfFilariaFieldUnit"
             left join
            (select MS."noOfPersons",MS."mfPositiveLineListId" from public."vMFPositiveLineListSurveys" MS
                                          where MS."categoryOptionCode"='NBSE') MS1
            ON M.id=MS1."mfPositiveLineListId"
                where  M."isActive"=true
                ${year} ${month} ${districtId}
            
    
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



    const GetMFEndemicityGraphMfRateDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            if (typeof req.body.month  == 'string' && req.body.month.length != 0 ){
                // req.body.month = JSON.parse(req.body.month)
                req.body.month =  req.body.month.split(",")
                console.log("month", req.body.month)

            }
            if (typeof req.body.year  == 'string' && req.body.year.length != 0 ){
                // req.body.year = JSON.parse(req.body.year)
                req.body.year =  req.body.year.split(",")
                console.log("year", req.body.year)
            }

// console.log("month",req.body.month[0])
            var districtId = `and  M."districtId" = ${req.body.districtId}`
            var year = `and  M.year IN (${req.body.year})`
            var month = `and  M.month IN (${req.body.month})`

            if (req.body.year.length == 0) {
                year = ""
            }
            if (req.body.month.length == 0) {
                month = ""
            }





            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select 	M."srNo",M."districtId",M."subCenterId",M."villageId",
            D."districtName",Sb."subCenterName",F."facilityName",
            V."villageName",
            M.area,M."nameOfUnit",
            M."nameOfFilariaFieldUnit",M."populationCoveredByUnit",M."noOfBSFoundPositive",
            MS1."noOfPersons" /
CASE MS2."noOfPersons"
WHEN 0 THEN NULL
ELSE MS2."noOfPersons"
END * 100 AS "mfRate",
MS1."noOfPersons" "noOfPersonExamined",
MS2."noOfPersons" "noOfPersonCollected",
V1."nameOfControlUnit",V2."fieldUnitName"
           from public."mfPositiveLineLists" M 
        left join public.villages V on V.id = M."villageId"
        left join public."subCenters" Sb on Sb.id = M."subCenterId"
        left join public.districts D on D.id = M."districtId"
        left join public.facilities F on F.id = M."facilityId"
        left join public."verticalControlUnits" V1 ON V1.id=M."nameOfUnit"
        left join  public."verticalControlFieldUnits" V2 ON V2.id=M."nameOfFilariaFieldUnit"

        
        
                
        
        left join
           (select MS."noOfPersons",MS."mfPositiveLineListId" from public."vMFPositiveLineListSurveys" MS
                                         where MS."categoryOptionCode"='NBSE') MS1 
           ON M.id=MS1."mfPositiveLineListId"
           left join
           (select MS."noOfPersons",MS."mfPositiveLineListId" from public."vMFPositiveLineListSurveys" MS
                                         where MS."categoryOptionCode"='NPC') MS2	
           ON M.id=MS2."mfPositiveLineListId"
                where M."isActive"=true
                ${year} ${month} ${districtId}
            
    
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

    const GetEndemicityTrendGraphAllDistrictsDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var start_year = `and Year <=  ${req.body.startYear}`
            var start_month = `and  month <= ${req.body.startMonth}`
            var end_year = `and Year >=  ${req.body.endYear}`
            var end_month = `and  month >= ${req.body.endMonth}`
         



            if (req.body.startYear.length == 0) {
                start_year = ""
            }
            if (req.body.startMonth.length == 0) {
                start_month = ""
            }

            if (req.body.endYear.length == 0) {
                end_year = ""
            }
            if (req.body.endMonth.length == 0) {
                end_month = ""
            }


            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select COALESCE(L1."year",COALESCE(L2."year",M1."year")) AS "year" ,
            COALESCE(L1."month",COALESCE(L2."month",M1."month")) "month",
            L1."NoOfLFCases",L2."NoOfHydroceleCases",M1."NoMFPosetive"
            From
            (
                select count(id) AS "NoOfLFCases","year","month" from public."lymphedemaLineLists" L
                where lower("diseaseType") like '%lymphedema%' and L."isActive"=true
${start_year} ${end_year} ${start_month} ${end_month} 
                group by "year","month"
            )L1 
            FULL OUTER JOIN  
            (
                select count(id) AS "NoOfHydroceleCases","year","month" from public."lymphedemaLineLists" L
                where lower("diseaseType") like '%hydrocele%' and  L."isActive"=true
                ${start_year} ${end_year} ${start_month} ${end_month} 
                group by "year","month"
            )L2 ON L1."year"=L2."year" and L1."month"=L2."month"
            FULL OUTER JOIN 
            ( 
                select sum( MS1."noOfPersons") AS "NoMFPosetive",M."year",M."month"
                from public."mfPositiveLineLists" M left join
                (select MS."noOfPersons",MS."mfPositiveLineListId" from public."vMFPositiveLineListSurveys" MS
                                              where MS."categoryOptionCode"='NPMF') MS1
                ON M.id=MS1."mfPositiveLineListId"
               where M."isActive"=true
                ${start_year} ${end_year} ${start_month} ${end_month} 
                group by M."year",M."month"
            ) M1 ON L1."year"=M1."year" and M1."month"=L1."month"
            
    
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


    const GetEndemicityTrendGraphByDistrictDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var start_year = `and Year <=  ${req.body.startYear}`
            var start_month = `and  month <= ${req.body.startMonth}`
            var end_year = `and Year >=  ${req.body.endYear}`
            var end_month = `and  month >= ${req.body.endMonth}`
            var districtId = `and  "districtId" = ${req.body.districtId}`
         



            if (req.body.startYear.length == 0) {
                start_year = ""
            }
            if (req.body.startMonth.length == 0) {
                start_month = ""
            }

            if (req.body.endYear.length == 0) {
                end_year = ""
            }
            if (req.body.endMonth.length == 0) {
                end_month = ""
            }



            if (req.body.districtId.length == 0) {
                districtId = ""
            }
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select COALESCE(L1."year",COALESCE(L2."year",M1."year")) AS "year" ,
            COALESCE(L1."month",COALESCE(L2."month",M1."month")) "month",
            L1."NoOfLFCases",L2."NoOfHydroceleCases",M1."NoMFPosetive"
            From
            (
                select count(id) AS "NoOfLFCases","year","month" from public."lymphedemaLineLists" L
                where lower("diseaseType") like '%lymphedema%' and L."isActive"=true
                ${start_year} ${end_year} ${start_month} ${end_month} 
${districtId}
                group by "year","month"
            )L1 
            FULL OUTER JOIN  
            (
                select count(id) AS "NoOfHydroceleCases","year","month" from public."lymphedemaLineLists" L
                where lower("diseaseType") like '%hydrocele%' and L."isActive"=true
                ${start_year} ${end_year} ${start_month} ${end_month} 
                ${districtId}
                group by "year","month"
            )L2 ON L1."year"=L2."year" and L1."month"=L2."month"
            FULL OUTER JOIN 
            ( 
                select sum( MS1."noOfPersons") AS "NoMFPosetive",M."year",M."month"
                from public."mfPositiveLineLists" M left join
                (select MS."noOfPersons",MS."mfPositiveLineListId" from public."vMFPositiveLineListSurveys" MS
                                              where MS."categoryOptionCode"='NPMF') MS1
                ON M.id=MS1."mfPositiveLineListId"
                where M."isActive"=true
                ${start_year} ${end_year} ${start_month} ${end_month} 
${districtId}
                group by M."year",M."month"
            ) M1 ON L1."year"=M1."year" and M1."month"=L1."month"
            
    
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

    const GetEndemicityTrendGraphAllDistrictsNoOfLFCasesDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var start_year = `and L.Year <=  ${req.body.startYear}`
            var start_month = `and  L.month <= ${req.body.startMonth}`
            var end_year = `and L.Year >=  ${req.body.endYear}`
            var end_month = `and  L.month >= ${req.body.endMonth}`
         



            if (req.body.startYear.length == 0) {
                start_year = ""
            }
            if (req.body.startMonth.length == 0) {
                start_month = ""
            }

            if (req.body.endYear.length == 0) {
                end_year = ""
            }
            if (req.body.endMonth.length == 0) {
                end_month = ""
            }

          
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select  L."districtId",
            L."patientId",L."nameOfPatient",L."headOfFamily",
            L.month,L.year,L."corporationId",L."talukaId",L."facilityId",
L.town,L."subCenterId",L."villageId",L."patientMobileNumber",
L."diseaseType",L.grading,
W."wardName",T."talukaName",C."corporationName",U."categoryOptionName" As "gender",
U1."categoryOptionName" as gradingName
             from public."lymphedemaLineLists" L
             left join public.corporations C on C.id = L."corporationId"
             left join public.districts D on D.id = L."districtId"
             left join public.facilities F on F.id = L."facilityId"
             left join public."subCenters" Sb on Sb.id = L."subCenterId"
             left join public.talukas T on T.id = L."talukaId"
             left join public.villages V on V.id = L."villageId"
             left join public.wards W on W.id = L."wardId"
             left join public.zones Z on Z.id = L."zoneId"
        left join public."udCategoryOptions" U ON U.id=L.gender
        left join public."udCategoryOptions" U1 on U1.id = L."grading"        
            where lower("diseaseType") like '%lymphedema%'
            and L."isActive"=true
${start_year} ${end_year} ${start_month} ${end_month} 
    
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

    const GetEndemicityTrendGraphAllDistrictsNoOfHydroceleCasesDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var start_year = `and L.Year <=  ${req.body.startYear}`
            var start_month = `and  L.month <= ${req.body.startMonth}`
            var end_year = `and L.Year >=  ${req.body.endYear}`
            var end_month = `and  L.month >= ${req.body.endMonth}`
         



            if (req.body.startYear.length == 0) {
                start_year = ""
            }
            if (req.body.startMonth.length == 0) {
                start_month = ""
            }

            if (req.body.endYear.length == 0) {
                end_year = ""
            }
            if (req.body.endMonth.length == 0) {
                end_month = ""
            }


            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
             select  L."districtId",
            L."patientId",L."nameOfPatient",L."headOfFamily",
            L.month,L.year,L."corporationId",L."talukaId",L."facilityId",
L.town,L."subCenterId",L."villageId",L."patientMobileNumber",
L."diseaseType",L.grading,
W."wardName",T."talukaName",C."corporationName",U."categoryOptionName" As "gender",
U1."categoryOptionName" as gradingName
             from public."lymphedemaLineLists" L
             left join public.corporations C on C.id = L."corporationId"
             left join public.districts D on D.id = L."districtId"
             left join public.facilities F on F.id = L."facilityId"
             left join public."subCenters" Sb on Sb.id = L."subCenterId"
             left join public.talukas T on T.id = L."talukaId"
             left join public.villages V on V.id = L."villageId"
             left join public.wards W on W.id = L."wardId"
             left join public.zones Z on Z.id = L."zoneId"
        left join public."udCategoryOptions" U ON U.id=L.gender
        left join public."udCategoryOptions" U1 on U1.id = L."grading" 
            where lower("diseaseType") like '%hydrocele%'
            and L."isActive"=true
${start_year} ${end_year} ${start_month} ${end_month} 
    
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

    const GetEndemicityTrendGraphAllDistrictsnoOfPersonsDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var start_year = `and M.Year <=  ${req.body.startYear}`
            var start_month = `and  M.month <= ${req.body.startMonth}`
            var end_year = `and M.Year >=  ${req.body.endYear}`
            var end_month = `and  M.month >= ${req.body.endMonth}`
         



            if (req.body.startYear.length == 0) {
                start_year = ""
            }
            if (req.body.startMonth.length == 0) {
                start_month = ""
            }

            if (req.body.endYear.length == 0) {
                end_year = ""
            }
            if (req.body.endMonth.length == 0) {
                end_month = ""
            }

          
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select 	M."srNo",M."districtId",M."subCenterId",M."villageId",
            D."districtName",Sb."subCenterName",F."facilityName",
            V."villageName",
            M.area,M."nameOfUnit",
            M."nameOfFilariaFieldUnit",M."populationCoveredByUnit",M."noOfBSFoundPositive",
MS1."noOfPersons" "noOfPersonExamined",
V1."nameOfControlUnit",V2."fieldUnitName"
           from public."mfPositiveLineLists" M 
        left join public.villages V on V.id = M."villageId"
        left join public."subCenters" Sb on Sb.id = M."subCenterId"
        left join public.districts D on D.id = M."districtId"
        left join public.facilities F on F.id = M."facilityId"
        left join public."verticalControlUnits" V1 ON V1.id=M."nameOfUnit"
        left join  public."verticalControlFieldUnits" V2 ON V2.id=M."nameOfFilariaFieldUnit"
            left join
	(select MS."noOfPersons",MS."mfPositiveLineListId" from public."vMFPositiveLineListSurveys" MS
								  where MS."categoryOptionCode"='NPMF') MS1
	ON M.id=MS1."mfPositiveLineListId"
    where M."isActive"=true
${start_year} ${end_year} ${start_month} ${end_month}
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


    const GetEndemicityTrendGraphByDistrictNoOfLFCasesDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var start_year = `and L.Year <=  ${req.body.startYear}`
            var start_month = `and  L.month <= ${req.body.startMonth}`
            var end_year = `and L.Year >=  ${req.body.endYear}`
            var end_month = `and  L.month >= ${req.body.endMonth}`
            var districtId = `and  L."districtId" = ${req.body.districtId}`
         



            if (req.body.startYear.length == 0) {
                start_year = ""
            }
            if (req.body.startMonth.length == 0) {
                start_month = ""
            }

            if (req.body.endYear.length == 0) {
                end_year = ""
            }
            if (req.body.endMonth.length == 0) {
                end_month = ""
            }
            if (req.body.districtId.length == 0) {
                districtId = ""
            }
          
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select  L."districtId",
            L."patientId",L."nameOfPatient",L."headOfFamily",
            L.month,L.year,L."corporationId",L."talukaId",L."facilityId",
L.town,L."subCenterId",L."villageId",L."patientMobileNumber",
L."diseaseType",L.grading,
W."wardName",T."talukaName",C."corporationName",U."categoryOptionName" As "gender",
U1."categoryOptionName" as gradingName
             from public."lymphedemaLineLists" L
             left join public.corporations C on C.id = L."corporationId"
             left join public.districts D on D.id = L."districtId"
             left join public.facilities F on F.id = L."facilityId"
             left join public."subCenters" Sb on Sb.id = L."subCenterId"
             left join public.talukas T on T.id = L."talukaId"
             left join public.villages V on V.id = L."villageId"
             left join public.wards W on W.id = L."wardId"
             left join public.zones Z on Z.id = L."zoneId"
        left join public."udCategoryOptions" U ON U.id=L.gender
        left join public."udCategoryOptions" U1 on U1.id = L."grading" 
        where lower("diseaseType") like '%lymphedema%'
        and L."isActive"=true
${start_year} ${end_year} ${start_month} ${end_month} ${districtId}
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




    const GetEndemicityTrendGraphByDistrictNoOfHydroceleCasesDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}
            var start_year = `and L.Year <=  ${req.body.startYear}`
            var start_month = `and  L.month <= ${req.body.startMonth}`
            var end_year = `and L.Year >=  ${req.body.endYear}`
            var end_month = `and  L.month >= ${req.body.endMonth}`
            var districtId = `and  L."districtId" = ${req.body.districtId}`
         



            if (req.body.startYear.length == 0) {
                start_year = ""
            }
            if (req.body.startMonth.length == 0) {
                start_month = ""
            }

            if (req.body.endYear.length == 0) {
                end_year = ""
            }
            if (req.body.endMonth.length == 0) {
                end_month = ""
            }

            if (req.body.districtId.length == 0) {
                districtId = ""
            }
          
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select  L."districtId",
            L."patientId",L."nameOfPatient",L."headOfFamily",
            L.month,L.year,L."corporationId",L."talukaId",L."facilityId",
L.town,L."subCenterId",L."villageId",L."patientMobileNumber",
L."diseaseType",L.grading,
W."wardName",T."talukaName",C."corporationName",U."categoryOptionName" As "gender",
U1."categoryOptionName" as gradingName
             from public."lymphedemaLineLists" L
             left join public.corporations C on C.id = L."corporationId"
             left join public.districts D on D.id = L."districtId"
             left join public.facilities F on F.id = L."facilityId"
             left join public."subCenters" Sb on Sb.id = L."subCenterId"
             left join public.talukas T on T.id = L."talukaId"
             left join public.villages V on V.id = L."villageId"
             left join public.wards W on W.id = L."wardId"
             left join public.zones Z on Z.id = L."zoneId"
        left join public."udCategoryOptions" U ON U.id=L.gender
        left join public."udCategoryOptions" U1 on U1.id = L."grading" 
            where lower("diseaseType") like '%hydrocele%'
            and L."isActive"=true
${start_year} ${end_year} ${start_month} ${end_month} ${districtId}
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


    const GetEndemicityTrendGraphByDistrictNoOfPersonsDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var start_year = `and M.Year <=  ${req.body.startYear}`
            var start_month = `and  M.month <= ${req.body.startMonth}`
            var end_year = `and M.Year >=  ${req.body.endYear}`
            var end_month = `and  M.month >= ${req.body.endMonth}`
            var districtId = `and  M."districtId" = ${req.body.districtId}`
         



            if (req.body.startYear.length == 0) {
                start_year = ""
            }
            if (req.body.startMonth.length == 0) {
                start_month = ""
            }

            if (req.body.endYear.length == 0) {
                end_year = ""
            }
            if (req.body.endMonth.length == 0) {
                end_month = ""
            }

            if (req.body.districtId.length == 0) {
                districtId = ""
            }
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select 	M."srNo",M."districtId",M."subCenterId",M."villageId",
            D."districtName",Sb."subCenterName",F."facilityName",
            V."villageName",
            M.area,M."nameOfUnit",
            M."nameOfFilariaFieldUnit",M."populationCoveredByUnit",M."noOfBSFoundPositive",
MS1."noOfPersons" "noOfPersonExamined",
V1."nameOfControlUnit",V2."fieldUnitName"
           from public."mfPositiveLineLists" M 
        left join public.villages V on V.id = M."villageId"
        left join public."subCenters" Sb on Sb.id = M."subCenterId"
        left join public.districts D on D.id = M."districtId"
        left join public.facilities F on F.id = M."facilityId"
        left join public."verticalControlUnits" V1 ON V1.id=M."nameOfUnit"
        left join  public."verticalControlFieldUnits" V2 ON V2.id=M."nameOfFilariaFieldUnit"
            left join
(select MS."noOfPersons",MS."mfPositiveLineListId" from public."vMFPositiveLineListSurveys" MS
								  where MS."categoryOptionCode"='NPMF') MS1
	ON M.id=MS1."mfPositiveLineListId"
    where  M."isActive"=true
${start_year} ${end_year} ${start_month} ${end_month} ${districtId}
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


    const GetLFCasesDistwiseDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}
            if (typeof req.body.month == 'string' && req.body.month.length != 0) {
                req.body.month = req.body.month.split(',')
                console.log("month", req.body.month[0])

            }
            if (typeof req.body.year == 'string' && req.body.year.length != 0) {
                // req.body.year = JSON.parse(req.body.year)
                req.body.year = req.body.year.split(",")
                // console.log("year", req.body.year)
            }

            // console.log("month",req.body.month[0])
            var districtId = `and  L."districtId" = ${req.body.districtId}`
            var year = `and  L.year IN (${req.body.year})`
            var month = `and  L.month IN (${req.body.month})`



            if (req.body.year.length == 0) {
                year = ""
            }
            if (req.body.month.length == 0) {
                month = ""
            }


            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;
            db.sequelize.query(`
            select
            L."districtId",
            D."districtName",
            F."facilityName",
            Sb."subCenterName",
            V."villageName",
            L."patientId",
            L."nameOfPatient",
            L."headOfFamily",
            L.month,
            L.year,
            L."corporationId",
            L."talukaId",
            L."facilityId",
            L.town,
            L."subCenterId",
            L."villageId",
            L."patientMobileNumber",
            L."diseaseType",
            L.grading,
            W."wardName",
            T."talukaName",
            C."corporationName",
            U."categoryOptionName" As "gender",
            U1."categoryOptionName" as gradingName
          from
            public."lymphedemaLineLists" L
            left join public.corporations C on C.id = L."corporationId"
            left join public.districts D on D.id = L."districtId"
            left join public.facilities F on F.id = L."facilityId"
            left join public."subCenters" Sb on Sb.id = L."subCenterId"
            left join public.talukas T on T.id = L."talukaId"
            left join public.villages V on V.id = L."villageId"
            left join public.wards W on W.id = L."wardId"
            left join public.zones Z on Z.id = L."zoneId"
            left join public."udCategoryOptions" U ON U.id = L.gender
            left join public."udCategoryOptions" U1 on U1.id = L."grading"
          where
            lower("diseaseType") like '%lymphedema%'
            and L."isActive" = true
        ${districtId} ${year} ${month} 
        
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


    const GetHydroceleCasesDistwiseDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}
            if (typeof req.body.month == 'string' && req.body.month.length != 0) {
                // req.body.month = JSON.parse(req.body.month)
                req.body.month = req.body.month.split(",")
                console.log("month", req.body.month)

            }
            if (typeof req.body.year == 'string' && req.body.year.length != 0) {
                // req.body.year = JSON.parse(req.body.year)
                req.body.year = req.body.year.split(",")
                console.log("year", req.body.year)
            }
            var districtId = `and  L."districtId" = ${req.body.districtId}`
            var year = `and  L.year IN (${req.body.year})`
            var month = `and  L.month IN (${req.body.month})`


            if (req.body.year.length == 0) {
                year = ""
            }
            if (req.body.month.length == 0) {
                month = ""
            }


            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select
            L."districtId",
            D."districtName",
            F."facilityName",
            Sb."subCenterName",
            V."villageName",
            L."patientId",
            L."nameOfPatient",
            L."headOfFamily",
            L.month,
            L.year,
            L."corporationId",
            L."talukaId",
            L."facilityId",
            L.town,
            L."subCenterId",
            L."villageId",
            L."patientMobileNumber",
            L."diseaseType",
            L.grading,
            W."wardName",
            T."talukaName",
            C."corporationName",
            U."categoryOptionName" As "gender",
            U1."categoryOptionName" as gradingName
        from
            public."lymphedemaLineLists" L
            left join public.corporations C on C.id = L."corporationId"
            left join public.districts D on D.id = L."districtId"
            left join public.facilities F on F.id = L."facilityId"
            left join public."subCenters" Sb on Sb.id = L."subCenterId"
            left join public.talukas T on T.id = L."talukaId"
            left join public.villages V on V.id = L."villageId"
            left join public.wards W on W.id = L."wardId"
            left join public.zones Z on Z.id = L."zoneId"
            left join public."udCategoryOptions" U ON U.id = L.gender
            left join public."udCategoryOptions" U1 on U1.id = L."grading"
        where
            lower("diseaseType") like '%hydrocele%'
            and L."isActive" = true
             ${districtId} ${year} ${month} 
        
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



    const GetHydroceleOperatedDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            if (typeof req.body.month == 'string' && req.body.month.length != 0) {
                // req.body.month = JSON.parse(req.body.month)
                req.body.month = req.body.month.split(",")
                console.log("month", req.body.month)

            }
            if (typeof req.body.year == 'string' && req.body.year.length != 0) {
                // req.body.year = JSON.parse(req.body.year)
                req.body.year = req.body.year.split(",")
                console.log("year", req.body.year)
            }

            var districtId = `and  L."districtId" = ${req.body.districtId}`
            var year = `and  L.year IN (${req.body.year})`
            var month = `and  L.month IN (${req.body.month})`


            if (req.body.year.length == 0) {
                year = ""
            }
            if (req.body.month.length == 0) {
                month = ""
            }


            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select L."districtId",
            D."districtName",F."facilityName",Sb."subCenterName",V."villageName",
            L."patientId",L."nameOfPatient",L."headOfFamily",
            L.month,L.year,L."corporationId",L."talukaId",L."facilityId",
            L.town,L."subCenterId",L."villageId",L."patientMobileNumber",
            L."diseaseType",L.grading,
            W."wardName",T."talukaName",C."corporationName",U."categoryOptionName" As "gender",
            U1."categoryOptionName" as gradingName
            from public."lymphedemaLineLists" L
            inner join public."lymphedemaLineListFollowUpsHFs" HF on HF."lymphedemaLineListId"=L.ID and HF."isActive"=true
            left join public.corporations C on C.id = L."corporationId"
            left join public.districts D on D.id = L."districtId"
            left join public.facilities F on F.id = L."facilityId"
            left join public."subCenters" Sb on Sb.id = L."subCenterId"
            left join public.talukas T on T.id = L."talukaId"
            left join public.villages V on V.id = L."villageId"
            left join public.wards W on W.id = L."wardId"
            left join public.zones Z on Z.id = L."zoneId"
            left join public."udCategoryOptions" U ON U.id=L.gender
            left join public."udCategoryOptions" U1 on U1.id = L."grading"
            where lower("diseaseType") like '%hydrocele%' and HF."isSurgeryDone"=true and L."isActive"=true            
        ${districtId} ${year} ${month} 
        
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




    const GetPendingApprovalMODistwiseDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            if (typeof req.body.month == 'string' && req.body.month.length != 0) {
                // req.body.month = JSON.parse(req.body.month)
                req.body.month = req.body.month.split(",")
                console.log("month", req.body.month)

            }
            if (typeof req.body.year == 'string' && req.body.year.length != 0) {
                // req.body.year = JSON.parse(req.body.year)
                req.body.year = req.body.year.split(",")
                console.log("year", req.body.year)
            }

            var districtId = `and  L."districtId" = ${req.body.districtId}`
            var year = `and  L.year IN (${req.body.year})`
            var month = `and  L.month IN (${req.body.month})`




            if (req.body.year.length == 0) {
                year = ""
            }
            if (req.body.month.length == 0) {
                month = ""
            }


            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select
            L."districtId",
            D."districtName",
            F."facilityName",
            Sb."subCenterName",
            V."villageName",
            L."patientId",
            L."nameOfPatient",
            L."headOfFamily",
            L.month,
            L.year,
            L."corporationId",
            L."talukaId",
            L."facilityId",
            L.town,
            L."subCenterId",
            L."villageId",
            L."patientMobileNumber",
            L."diseaseType",
            L.grading,
            W."wardName",
            T."talukaName",
            C."corporationName",
            U."categoryOptionName" As "gender",
            U1."categoryOptionName" as gradingName
       from
            public."lymphedemaLineLists" L
            inner join public."lymphedemaLineListSurveys" LF on LF."lymphedemaLineListId" = L.ID
            and LF."isActive" = true
            left join public.corporations C on C.id = L."corporationId"
            left join public.districts D on D.id = L."districtId"
            left join public.facilities F on F.id = L."facilityId"
            left join public."subCenters" Sb on Sb.id = L."subCenterId"
            left join public.talukas T on T.id = L."talukaId"
            left join public.villages V on V.id = L."villageId"
            left join public.wards W on W.id = L."wardId"
            left join public.zones Z on Z.id = L."zoneId"
            left join public."udCategoryOptions" U ON U.id = L.gender
            left join public."udCategoryOptions" U1 on U1.id = L."grading"
       where
            LF."isVerified" = false
            and L."isActive" = true
        ${districtId} ${year} ${month} 
        
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
        GetMMDPDetailsInPercentageDao,
        GetEndemicityGraphAllDistrictsDao,
        GetEndemicityGraphAllTaluksByDistrictDao,
        GetMFEndemicityGraphAllDistrictsDao,
        GetMFEndemicityGraphMFPosetiveDao,
        GetMFEndemicityGraphBSCollectedDao,
        GetMFEndemicityGraphBSExaminedDao,
        GetMFEndemicityGraphMfRateDao,
        GetEndemicityTrendGraphAllDistrictsDao,
        GetEndemicityTrendGraphByDistrictDao,
        GetEndemicityTrendGraphAllDistrictsNoOfLFCasesDao,
        GetEndemicityTrendGraphAllDistrictsNoOfHydroceleCasesDao,
        GetEndemicityTrendGraphAllDistrictsnoOfPersonsDao,
        GetEndemicityTrendGraphByDistrictNoOfPersonsDao,
        GetEndemicityTrendGraphByDistrictNoOfHydroceleCasesDao,
        GetEndemicityTrendGraphByDistrictNoOfLFCasesDao,
        GetLFCasesDistwiseDao,
        GetHydroceleCasesDistwiseDao,
        GetHydroceleOperatedDao,
        GetPendingApprovalMODistwiseDao


    };
};
export default GraphDao();