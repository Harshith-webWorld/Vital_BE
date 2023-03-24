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
const mapDao = () => {

    const GetEndemicityMapAllDistrictsDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var year = ''
            var month = ''
            var district = ''

            if (req.body.year.length > 0) {
                year = `and year in  (${req.body.year})`
            }
            if (req.body.startMonth.length > 0 && req.body.endMonth.length > 0 ) {
                month = `and "month" BETWEEN ${req.body.startMonth} and  ${req.body.endMonth}`
            }
            if (req.body.district.length > 0) {
                district = `where D.id in (${req.body.district})`
            }

            // if (req.body.year.length > 0) {
            //     year = `and year in  (${req.body.year})`
            // }
            // if (req.body.month.length > 0) {
            //     month = `and month in (${req.body.month})`
            // }
            // if (req.body.district.length > 0) {
            //     district = `where D.id in (${req.body.district})`
            // }

            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select (D."id") AS "districtId",D."districtName",D."mapId" AS "mapDistrictId",
            COALESCE(L1."NoOfLFCases",0) :: INTEGER As "NoOfLFCases",
            COALESCE(L2."NoOfHydroceleCases",0):: INTEGER As "NoOfHydroceleCases",
            COALESCE(L3."NoOfHydroceleSurgeries",0):: INTEGER As "NoOfHydroceleSurgeries",
            COALESCE(M1."NoMFPosetive",0):: INTEGER As "NoMFPosetive",
            COALESCE(E1."infectionRate",0):: DECIMAL(10,2) As "CulexInfection",
			COALESCE(E1."infectivityRate",0):: DECIMAL(10,2)  As "CulexInfectivity"
            from public.districts D  
            LEFT OUTER JOIN 
            (select count(id) AS "NoOfLFCases","districtId" from public."lymphedemaLineLists" 
                where lower("diseaseType") like '%lymphedema%' and "isActive" =true
                ${year} ${month} 
                group by "districtId"
            )L1 ON D."id"=L1."districtId"
            LEFT OUTER JOIN 
            (select count(id) AS "NoOfHydroceleCases","districtId" from public."lymphedemaLineLists" 
                where lower("diseaseType") like '%hydrocele%' and "isActive" =true
                ${year} ${month}
                group by "districtId"
            )L2 ON D."id"=L2."districtId"
            LEFT OUTER JOIN 
            (select count(H.id) AS "NoOfHydroceleSurgeries","districtId" from public."lymphedemaLineLists" H
				left join public."lymphedemaLineListFollowUpsHFs" HO ON H.id=HO."lymphedemaLineListId"
                where lower("diseaseType") like '%hydrocele%' and HO."isSurgeryDone"=true
                ${year} ${month}
                group by "districtId"
            )L3 ON D."id"=L3."districtId"
            LEFT OUTER JOIN 
            (select count(MP.id) AS "NoMFPosetive",M."districtId" from public."mfPositiveLineListPatients" MP
                inner join public."mfPositiveLineLists" M ON M.id=MP."mfPositiveLineListId"
                where MP."isActive" =true and M."isActive" =true
                ${year} ${month}
                group by M."districtId"
            )M1 ON D."id"=M1."districtId" 
            LEFT OUTER JOIN 
			(select E."districtId",
				((CAST(SUM("totalNoPositiveMosq1to3Stage") AS float)/ (case when COALESCE (SUM("mosqDissectedCulexQui"),0) = 0 
				then null else SUM("mosqDissectedCulexQui") end))*100.00)  as "infectionRate",
				((CAST(SUM("totalNoPositiveMosq3Stage") AS float)/ (case when COALESCE (SUM("mosqDissectedCulexQui"),0) = 0 
				then null else SUM("mosqDissectedCulexQui") end))*100.00) as "infectivityRate"
				from public."entomologicalLarvicidalLists" E
				where E."isActive" =true 
				${year} ${month}
				group by E."districtId"
			)E1 ON D."id"=E1."districtId"             
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



    const GetEndemicityMapAllTaluksByDistrictDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var year = ''
            var month = ''
            var mapDistrictId = ''

            if (req.body.year.length > 0) {
                year = `and year in  (${req.body.year})`
            }
            if (req.body.startMonth.length > 0 && req.body.endMonth.length > 0 ) {
                month = `and "month" BETWEEN ${req.body.startMonth} and  ${req.body.endMonth}`
            }
            if (req.body.mapDistrictId.length > 0) {
                mapDistrictId = req.body.mapDistrictId;
            }
            // var year = `and "year" =  ${req.body.year}`
            // var month = `and "month" = ${req.body.month}`
            // var mapDistrictId = req.body.mapDistrictId
            // if (req.body.year.length == 0) {
            //     year = ""
            // }
            // if (req.body.month.length == 0) {
            //     month = ""
            // }

            // if (req.body.mapDistrictId.length == 0) {
            //     mapDistrictId = ""
            // }
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`           
            select (T."id") AS "talukaId",T."talukaName",T."mapId" AS "mapTalukaId",
            T."districtId",D."mapId" AS "mapDistrictId",
            COALESCE(L1."NoOfLFCases",0) :: INTEGER As "NoOfLFCases",
            COALESCE(L2."NoOfHydroceleCases",0):: INTEGER As "NoOfHydroceleCases",
            COALESCE(L3."NoOfHydroceleSurgeries",0):: INTEGER As "NoOfHydroceleSurgeries",
            COALESCE(M1."NoMFPosetive",0):: INTEGER As "NoMFPosetive",
            COALESCE(E1."infectionRate",0):: DECIMAL(10,2) As "CulexInfection",
			COALESCE(E1."infectivityRate",0):: DECIMAL(10,2)  As "CulexInfectivity"          
            from public.talukas T
            LEFT OUTER JOIN 
            public.districts D ON D.id=T."districtId"
            LEFT OUTER JOIN 
            (
                select count(id) AS "NoOfLFCases","talukaId" from public."lymphedemaLineLists" 
                where lower("diseaseType") like '%lymphedema%'
                ${year} ${month}
                group by "talukaId"
            )L1 ON T."id"=L1."talukaId"
            LEFT OUTER JOIN 
            (
                select count(id) AS "NoOfHydroceleCases","talukaId" from public."lymphedemaLineLists" 
                where lower("diseaseType") like '%hydrocele%'
                ${year} ${month}
                group by "talukaId"
            )L2 ON T."id"=L2."talukaId"
            LEFT OUTER JOIN 
            (
                select count(H.id) AS "NoOfHydroceleSurgeries","talukaId" from public."lymphedemaLineLists" H
				left join public."lymphedemaLineListFollowUpsHFs" HO ON H.id=HO."lymphedemaLineListId"
                where lower("diseaseType") like '%hydrocele%' and HO."isSurgeryDone"=true
                ${year} ${month}
                group by "talukaId"
            )L3 ON T."id"=L3."talukaId"
            LEFT OUTER JOIN 
            (
                select count(MP.id) AS "NoMFPosetive",M."talukaId" from public."mfPositiveLineListPatients" MP
                inner join public."mfPositiveLineLists" M ON M.id=MP."mfPositiveLineListId"
                where MP."mfCount" > 0
                ${year} ${month}
                group by M."talukaId"
            )M1 ON T."id"=M1."talukaId"
            LEFT OUTER JOIN 
			(select E."talukaId",
				((CAST(SUM("totalNoPositiveMosq1to3Stage") AS float)/ (case when COALESCE (SUM("mosqDissectedCulexQui"),0) = 0 
				then null else SUM("mosqDissectedCulexQui") end))*100.00)  as "infectionRate",
				((CAST(SUM("totalNoPositiveMosq3Stage") AS float)/ (case when COALESCE (SUM("mosqDissectedCulexQui"),0) = 0 
				then null else SUM("mosqDissectedCulexQui") end))*100.00) as "infectivityRate"
				from public."entomologicalLarvicidalLists" E
				where E."isActive" =true 
				${year} ${month}
				group by E."talukaId"
			)E1 ON T."id"=E1."talukaId"
            where D."mapId" = '${mapDistrictId}'  
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

    const GetEndemicityMapAllVillagesByTalukaDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}
            var year = '';
            var month ='' ;
            var mapDistrictId = '' ;
            var mapTalukaId = '' ;

            if (req.body.year.length > 0) {
                year = `and year in  (${req.body.year})`;
            }
            if (req.body.startMonth.length > 0 && req.body.endMonth.length > 0 ) {
                month = `and "month" BETWEEN ${req.body.startMonth} and  ${req.body.endMonth}`;
            }
            if (req.body.mapDistrictId.length > 0) {
                mapDistrictId = req.body.mapDistrictId;
            }

            if (req.body.mapTalukaId.length > 0) {
                mapTalukaId = req.body.mapTalukaId;
            }
            // var year = `and year =  ${req.body.year}`
            // var month = `and month = ${req.body.month}`
            // var mapDistrictId = req.body.mapDistrictId
            // var mapTalukaId = req.body.mapTalukaId
            // if (req.body.year.length == 0) {
            //     year = ""
            // }
            // if (req.body.month.length == 0) {
            //     month = ""
            // }
            // if (req.body.mapDistrictId.length == 0) {
            //     mapDistrictId = ""
            // }

            // if (req.body.mapTalukaId.length == 0) {
            //     mapTalukaId = ""
            // }
            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
            select (V."id") AS "villageId",V."villageName",V."mapId" AS "mapVillageId",
            V."districtId",D."mapId" AS "mapDistrictId",V."talukaId",T."mapId" AS "mapTalukaId",
            COALESCE(L1."NoOfLFCases",0) :: INTEGER As "NoOfLFCases",
            COALESCE(L2."NoOfHydroceleCases",0):: INTEGER As "NoOfHydroceleCases",
            COALESCE(L3."NoOfHydroceleSurgeries",0):: INTEGER As "NoOfHydroceleSurgeries",
            COALESCE(M1."NoMFPosetive",0):: INTEGER As "NoMFPosetive",            
            COALESCE(E1."infectionRate",0):: DECIMAL(10,2) As "CulexInfection",
			COALESCE(E1."infectivityRate",0):: DECIMAL(10,2)  As "CulexInfectivity"  
            from public.villages V
            LEFT OUTER JOIN 
            public.districts D ON D.id=V."districtId"
            LEFT OUTER JOIN 
            public.talukas T  ON T.id=V."talukaId"
            LEFT OUTER JOIN 
            (
                select count(id) AS "NoOfLFCases","villageId" from public."lymphedemaLineLists" 
                where lower("diseaseType") like '%lymphedema%'
            ${year} ${month}
                group by "villageId"
            )L1 ON V."id"=L1."villageId"
            LEFT OUTER JOIN 
            (
                select count(id) AS "NoOfHydroceleCases","villageId" from public."lymphedemaLineLists" 
                where lower("diseaseType") like '%hydrocele%'
                ${year} ${month}
                group by "villageId"
            )L2 ON V."id"=L2."villageId"
            LEFT OUTER JOIN 
            (
                select count(H.id) AS "NoOfHydroceleSurgeries","villageId" from public."lymphedemaLineLists" H
				left join public."lymphedemaLineListFollowUpsHFs" HO ON H.id=HO."lymphedemaLineListId"
                where lower("diseaseType") like '%hydrocele%' and HO."isSurgeryDone"=true
                ${year} ${month}
                group by "villageId"
            )L3 ON V."id"=L3."villageId"
            LEFT OUTER JOIN 
            (
                select count(MP.id) AS "NoMFPosetive",M."villageId" from public."mfPositiveLineListPatients" MP
                inner join public."mfPositiveLineLists" M ON M.id=MP."mfPositiveLineListId"
                where MP."mfCount" > 0
                ${year} ${month}
                group by M."villageId"
            )M1 ON V."id"=M1."villageId"
            LEFT OUTER JOIN 
			(select E."villageId",
				((CAST(SUM("totalNoPositiveMosq1to3Stage") AS float)/ (case when COALESCE (SUM("mosqDissectedCulexQui"),0) = 0 
				then null else SUM("mosqDissectedCulexQui") end))*100.00)  as "infectionRate",
				((CAST(SUM("totalNoPositiveMosq3Stage") AS float)/ (case when COALESCE (SUM("mosqDissectedCulexQui"),0) = 0 
				then null else SUM("mosqDissectedCulexQui") end))*100.00) as "infectivityRate"
				from public."entomologicalLarvicidalLists" E
				where E."isActive" =true 
				${year} ${month}
				group by E."villageId"
			)E1 ON V."id"=E1."villageId"            
            where D."mapId"= '${mapDistrictId}' and T."mapId" = '${mapTalukaId}'
  
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

    const GetDistrictsGeoDao = async () => {
        return new Promise(async function (resolve) {
            var response = {}
            db.sequelize.query(`
            SELECT json_agg(features) AS features    
            FROM (select "stateId" ,"mapId","districtName",features    
            FROM   public."districtsGeoJson" 
			order by "districtName") G 
            group by "stateId"
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
    const GetTalukasGeoDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}
            var districtMapId = req.query.districtMapId;
            db.sequelize.query(`
            SELECT "districtMapId", json_agg(features) AS features    
            FROM (select "districtMapId","talukaName",features    
            FROM   public."talukasGeoJson" 
			order by "districtMapId","talukaName") G 
            where "districtMapId"= '${districtMapId}'
            group by "districtMapId"  
            `).then(([results, metadata]) => {
                response.error = false
                response.data = results[0]
            }).catch((error) => {
                console.log(error)
                response.error = true
            })
                .finally(() => {
                    resolve(response)
                })
        })
    }
    const GetVillagesGeoDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}
            var talukaMapId = req.query.talukaMapId;
            db.sequelize.query(`
            SELECT "talukaMapId","districtMapId", json_agg(features) AS features
            FROM  public."villagesGeoJson"
            where "talukaMapId"= '${talukaMapId}'
            group by "talukaMapId","districtMapId" 
            `).then(([results, metadata]) => {
                response.error = false
                response.data = results[0]
            }).catch((error) => {
                console.log(error)
                response.error = true
            })
                .finally(() => {
                    resolve(response)
                })
        })
    }

    const GetTownsGeoDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}
            var talukaMapId = req.query.talukaMapId;
            db.sequelize.query(`
            SELECT "talukaMapId","districtMapId", json_agg(features) AS features
            FROM  public."townsGeoJson"
            where "talukaMapId"= '${talukaMapId}'
            group by "talukaMapId","districtMapId" 
            `).then(([results, metadata]) => {
                response.error = false
                response.data = results[0]
            }).catch((error) => {
                console.log(error)
                response.error = true
            })
                .finally(() => {
                    resolve(response)
                })
        })
    }

    const GetEndemicityMapHomeDao = async () => {
        return new Promise(async function (resolve) {
            var response = {}
            const todaysDate = new Date()
            const currentYear = todaysDate.getFullYear()
            var year = ''
            year = `and year in  (${currentYear})`

            db.sequelize.query(`
            select (D."id") AS "districtId",D."districtName",D."mapId" AS "mapDistrictId",
            COALESCE(L1."NoOfLFCases",0) :: INTEGER As "NoOfLFCases",
            COALESCE(L2."NoOfHydroceleCases",0):: INTEGER As "NoOfHydroceleCases",
            COALESCE(M1."NoMFPosetive",0):: INTEGER As "NoMFPosetive"
            from public.districts D  
            LEFT OUTER JOIN 
            (select count(id) AS "NoOfLFCases","districtId" from public."lymphedemaLineLists" 
                where lower("diseaseType") like '%lymphedema%' and "isActive" =true
                ${year} 
                group by "districtId"
            )L1 ON D."id"=L1."districtId"
            LEFT OUTER JOIN 
            (select count(id) AS "NoOfHydroceleCases","districtId" from public."lymphedemaLineLists" 
                where lower("diseaseType") like '%hydrocele%' and "isActive" =true
                ${year} 
                group by "districtId"
            )L2 ON D."id"=L2."districtId"
            LEFT OUTER JOIN 
            (select count(MP.id) AS "NoMFPosetive",M."districtId" from public."mfPositiveLineListPatients" MP
                inner join public."mfPositiveLineLists" M ON M.id=MP."mfPositiveLineListId"
                where MP."isActive" =true and M."isActive" =true
                ${year}
                group by M."districtId"
            )M1 ON D."id"=M1."districtId" `).then(([results, metadata]) => {
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

        GetEndemicityMapAllDistrictsDao,
        GetEndemicityMapAllTaluksByDistrictDao,
        GetEndemicityMapAllVillagesByTalukaDao,
        GetDistrictsGeoDao,
        GetTalukasGeoDao,
        GetVillagesGeoDao,
        GetTownsGeoDao,
        GetEndemicityMapHomeDao

    };
};
export default mapDao();