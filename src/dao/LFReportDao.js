import { validationResult } from "express-validator";
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
	villages,
} = db;
const Op = db.Sequelize.Op;
var sqDB = db.Sequelize.sqDb;
const lHLineListDao = () => {
	const getLfAnalysis1Dao = async (req) => {
		return new Promise(async function (resolve) {
			var response = {};

			var districtId = `and  L."districtId" = ${req.body.districtId}`;
			var year = `and  L."year" = ${req.body.year}`;
			var start_month = `and  L."month" BETWEEN ${req.body.startMonth} `;
			var end_month = `and  ${req.body.endMonth}`;
			var taluka = `and  L."talukaId" = ${req.body.talukaId}`;
			var facility = `and  L."facilityId" = ${req.body.facilityId}`;
			var gender = `and  L."gender" = ${req.body.genderId}`;
			var villageId = `and  L."villageId" = ${req.body.villageId}`;
			var grading = `and   L."grading" = ${req.body.gradingId}`;
			var patientId = `and L."patientId" like '%${req.body.patientId}%'`;
			var AffectedPartId;
			if (req.body.affectedPartId == 1) {
				AffectedPartId = `and (L."isAffectedLeftLeg" = true
                or L."isAffectedRightLeg" = true)`;
			} else if (req.body.affectedPartId == 2) {
				AffectedPartId = `and (L."isAffectedRightHand" = true
                or L."isAffectedLeftHand" = true)`;
			} else if (req.body.affectedPartId == 3) {
				AffectedPartId = `and (L."isAffectedLeftBreast" = true or
                L."isAffectedRightBreast" = true)`;
			} else if (req.body.affectedPartId == 4) {
				AffectedPartId = `and ( L."isAffectedOthers" = true)`;
			}

			if (req.body.patientId.length == 0) {
				patientId = "";
			}

			if (req.body.districtId.length == 0) {
				districtId = "";
			}
			if (req.body.year.length == 0) {
				year = "";
			}
			if (req.body.startMonth.length == 0) {
				start_month = `and  L."month" BETWEEN 1 `;
			}
			if (req.body.endMonth.length == 0) {
				end_month = `and 12`;
			}

			if (req.body.talukaId.length == 0) {
				taluka = "";
			}
			if (req.body.facilityId.length == 0) {
				facility = "";
			}
			if (req.body.genderId.length == 0) {
				gender = "";
			}
			if (req.body.villageId.length == 0) {
				villageId = "";
			}
			if (req.body.gradingId.length == 0) {
				grading = "";
			}

			if (req.body.affectedPartId.length == 0) {
				AffectedPartId = "";
			}

			// const page = req.page ? req.page : 1;
			// const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
			// const offset = (page - 1) * itemsPerPage;
			db.sequelize
				.query(
					`
            select L.Year,L.Month,D."districtName",T."talukaName",C."corporationName",
            F."facilityName",S."subCenterName",V."villageName",L.town,W."wardName",
            L."headOfFamily",L."nameOfPatient",L."patientId",L."ageYears",L."ageMonths",
            L.gender,L."isAffectedLeftLeg",L."isAffectedRightLeg",L."isAffectedLeftHand",
            L."isAffectedRightHand",
            L."isAffectedLeftScrotum",L."isAffectedRightScrotum",L."isAffectedLeftBreast",
            L."isAffectedRightBreast",
            L."isAffectedOthers",L."affectedOthersNotes",L.grading,L."diseaseLastedYears",
            L."diseaseLastedMonths",
            L."stayingInYears",L."stayingInMonths",LS."dateOfSurvey",L."patientMobileNumber",
            LF."serviceMMDPTrainingDate",LF."serviceDateOfVisit",LF."serviceProviderName",Z."zoneName",
            LF."serviceProviderDesignation", LF."serviceProviderPlace", '' AS "ServicesGiven",
            U."categoryOptionName" As "gender",
U1."categoryOptionName" as gradingName
        from public."lymphedemaLineLists" L
        left join public."lymphedemaLineListSurveys" LS on LS."lymphedemaLineListId"  = L.id
        left join public."lymphedemaLineListFollowUpsLves" LF on LF."lymphedemaLineListId" = L.id
        left join public.corporations C on C.id = L."corporationId"
        left join public.districts D on D.id = L."districtId"
        left join public.facilities F on F.id = L."facilityId"
        left join public."subCenters" S on S.id = L."subCenterId"
        left join public.talukas T on T.id = L."talukaId"
        left join public.villages V on V.id = L."villageId"
        left join public.wards W on W.id = L."wardId"
        left join public.zones Z on Z.id = L."zoneId"
        left join public."udCategoryOptions" U ON U.id=L.gender
        left join public."udCategoryOptions" U1 on U1.id = L."grading"   
        where L."isActive"=true and L."diseaseType" like '%Lymphedema%' 
        ${districtId} ${year} ${start_month} ${end_month}  ${taluka} ${facility} ${gender}
        ${villageId} ${grading} ${AffectedPartId}  ${patientId}
        `
				)
				.then(([results, metadata]) => {
					response.error = false;
					response.data = results;
				})
				.catch((error) => {
					console.log(error);
					response.error = true;
				})
				.finally(() => {
					resolve(response);
				});
		});
	};

	const getLfAnalysis2Dao = async (req) => {
		return new Promise(async function (resolve) {
			var response = {};

			var districtId = `and  L."districtId" = ${req.body.districtId}`;
			var year = `and  L."year" = ${req.body.year}`;
			var start_month = `and  L."month" BETWEEN ${req.body.startMonth} `;
			var end_month = `and  ${req.body.endMonth}`;
			var facility = `and  L."facilityId" = ${req.body.facilityId}`;
			var HospitalSurgeryId = `and  HF."nameOfHospitalSurgeryDoneId" = ${req.body.hospitalSurgeryId}`;

			if (req.body.districtId.length == 0) {
				districtId = "";
			}
			if (req.body.year.length == 0) {
				year = "";
			}
			if (req.body.startMonth.length == 0) {
				start_month = `and  L."month" BETWEEN 1 `;
			}
			if (req.body.endMonth.length == 0) {
				end_month = `and 12`;
			}
			if (req.body.facilityId.length == 0) {
				facility = "";
			}
			if (req.body.hospitalSurgeryId.length == 0) {
				HospitalSurgeryId = "";
			}
			// const page = req.page ? req.page : 1;
			// const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
			// const offset = (page - 1) * itemsPerPage;

			db.sequelize
				.query(
					`
            select L.Year,L.Month,D."districtName",F."facilityName",L."nameOfPatient",L."ageYears",L."ageMonths",
            L."permanentAddressLine1",L."permanentAddressLine2",D1."districtName" City,S."stateName",L."permanentAddressPINCode",
            L."permanentAddressCity",L."patientMobileNumber",L."diseaseLastedYears",L."diseaseLastedMonths",L."stayingInYears",L."stayingInMonths",
            HF."serviceProviderName",HF."serviceProviderPhone",LS."verifiedByDoctorName", F1."facilityName" "nameOfHospitalSurgeryDone",
            HF."dateOfSurgery",HF."stageOfHydrocele",HF."nameOfSurgeon",HF."surgeonPhone",L."diseaseType" ,
            HF."dateOfFollowUpAfterSurgery",HF.remarks
        from public."lymphedemaLineLists" L
        left join public."lymphedemaLineListSurveys" LS on LS."lymphedemaLineListId"  = L.id
        left join public."lymphedemaLineListFollowUpsHFs" HF on HF."lymphedemaLineListId" = L.id
        left join public.states S on S.id = L."permanentAddressState"
        left join public.districts D1 on D1."districtName" = L."permanentAddressCity"
        left join public.districts D on D.id = L."districtId"
        left join public.facilities F on F.id = L."facilityId"
        left join public.facilities F1 on F1.id = HF."nameOfHospitalSurgeryDoneId"
        where L."diseaseType" like '%Hydrocele%'
        and L."isActive"=true
        ${districtId} ${year} ${start_month} ${end_month} ${facility} ${HospitalSurgeryId}
        `
				)
				.then(([results, metadata]) => {
					response.error = false;
					response.data = results;
				})
				.catch((error) => {
					console.log(error);
					response.error = true;
				})
				.finally(() => {
					resolve(response);
				});
		});
	};

	const get_LF_HydroceleOPLineListDao = async (req) => {
		return new Promise(async function (resolve) {
			var response = {};

			var districtId = `and  L."districtId" = ${req.body.districtId}`;
			var year = `and  L."year" = ${req.body.year}`;
			var start_month = `and  L."month" BETWEEN ${req.body.startMonth} `;
			var end_month = `and  ${req.body.endMonth}`;
			var taluka = `and  L."talukaId" = ${req.body.taluka}`;
			var facility = `and  L."facilityId" = ${req.body.facilityId}`;
			var gender = `and  L."gender" = ${req.body.gender}`;
			var age = `where A."AgeGroup" like '%${req.body.age}%'`;
			var stageOfHydrocele = `and HF."stageOfHydrocele" = ${req.body.stageOfHydrocele}`;
			var nameOfSurgeon = `and HF."nameOfSurgeon" like '%${req.body.nameOfSurgeon}%'`;
			var HospitalSurgeryId = `and  HF."nameOfHospitalSurgeryDoneId" = ${req.body.hospitalSurgeryId}`;

			if (req.body.districtId.length == 0) {
				districtId = "";
			}
			if (req.body.year.length == 0) {
				year = "";
			}
			if (req.body.taluka.length == 0) {
				taluka = "";
			}
			if (req.body.facilityId.length == 0) {
				facility = "";
			}
			if (req.body.gender.length == 0) {
				gender = "";
			}
			if (req.body.age.length == 0) {
				age = "";
			}
			if (req.body.startMonth.length == 0) {
				start_month = `and  L."month" BETWEEN 1 `;
			}
			if (req.body.endMonth.length == 0) {
				end_month = `and 12`;
			}
			if (req.body.stageOfHydrocele.length == 0) {
				stageOfHydrocele = "";
			}

			if (req.body.nameOfSurgeon.length == 0) {
				nameOfSurgeon = "";
			}

			if (req.body.hospitalSurgeryId.length == 0) {
				HospitalSurgeryId = "";
			}
			// const page = req.page ? req.page : 1;
			// const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
			// const offset = (page - 1) * itemsPerPage;

			db.sequelize
				.query(
					`
            select * from ( select L.Year,L.Month,L."districtId",D."districtName",
            L."nameOfPatient",L."patientId",U."categoryOptionName" As "gender",L."talukaId",  
            T."talukaName",C."corporationName",F."facilityName",Sb."subCenterName",
            L."villageId",V."villageName",L.town,W."wardName",L."ageYears",L."ageMonths",
            (case when L."ageYears"<16 then '0-15' when L."ageYears"<41 then '16-40'
              when L."ageYears"<66 then '46-65' else  '65+' end) AS "AgeGroup",	
            L."patientMobileNumber",L."permanentAddressLine1",L."permanentAddressLine2",
            D1."districtName" as City,HF."isSurgeryDone",
            S."stateName",L."permanentAddressPINCode",	
            L."isAffectedLeftScrotum",L."isAffectedRightScrotum", L."diseaseLastedYears",
            L."diseaseLastedMonths",HF."serviceProviderDesignation",HF."serviceProviderPlace",
            HF."serviceProviderName",HF."serviceProviderPhone",LS."verifiedByDoctorName", 
            F1."facilityName" "nameOfHospitalSurgeryDone",HF."dateOfSurgery",HF."stageOfHydrocele",
            HF."nameOfSurgeon",HF."surgeonPhone",HF."comorbidityType",
            HF."dateOfFollowUpAfterSurgery",HF.remarks,HF."findingsDuringSurgeryFollowUp",
            U1."categoryOptionName" as gradingName
        from public."lymphedemaLineLists" L
        left join public."lymphedemaLineListSurveys" LS on LS."lymphedemaLineListId"  = L.id
        left join public."lymphedemaLineListFollowUpsHFs" HF on HF."lymphedemaLineListId" = L.id
        left join public."lymphedemaLineListFollowUpsLves" LF on LF."lymphedemaLineListId" = L.id
        left join public.corporations C on C.id = L."corporationId"
        left join public.districts D on D.id = L."districtId"
        left join public.facilities F on F.id = L."facilityId"
        left join public."subCenters" Sb on Sb.id = L."subCenterId"
        left join public.talukas T on T.id = L."talukaId"
        left join public.villages V on V.id = L."villageId"
        left join public.wards W on W.id = L."wardId"
        left join public.zones Z on Z.id = L."zoneId"
        left join public.facilities F1 on F1.id = HF."nameOfHospitalSurgeryDoneId"
        left join public.states S on S.id = L."permanentAddressState"
        left join public.districts D1 on D1."districtName" = L."permanentAddressCity"
        left join public."udCategoryOptions" U ON U.id=L.gender
        left join public."udCategoryOptions" U1 on U1.id = L."grading"        
        where HF."isSurgeryDone"=true and L."diseaseType" like '%Hydrocele%'
        and L."isActive"=true
        ${districtId} ${year} ${start_month} ${end_month}  ${taluka} ${facility} ${gender} 
        ${stageOfHydrocele} ${nameOfSurgeon} ${HospitalSurgeryId}
        ) A ${age}
        `
				)
				.then(([results, metadata]) => {
					response.error = false;
					response.data = results;
				})
				.catch((error) => {
					console.log(error);
					response.error = true;
				})
				.finally(() => {
					resolve(response);
				});
		});
	};

	const get_LF_DieseaseCasesListDao = async (req) => {
		return new Promise(async function (resolve) {
			var response = {};

			var districtId = `and  "districtId" = ${req.body.districtId}`;
			var year = `and year = ${req.body.year}`;
			var start_month = `and  "month" BETWEEN ${req.body.startMonth} `;
			var end_month = `and  ${req.body.endMonth}`;
			var taluka = `and  "talukaId" = ${req.body.talukaId}`;
			var facility = `and  "facilityId" = ${req.body.facilityId}`;
			var subCenter = `and  "subCenterId" = ${req.body.subCenterId}`;
			var villageId = `and  "villageId" = ${req.body.villageId}`;
			//var diseaseType = `and  "diseaseType" like '%${req.body.diseaseType}%'`;
			//var gender = `and  "gender" = '${req.body.genderId}'`;
			var age = `and A1."ageGroup" like '%${req.body.age}%'`;

			// var groupByDistrictId = `, "districtId"`;
			// var groupByYear = `, year`;
			// var groupByTaluka = `, "talukaId"`;
			// var groupByFacility = `, "facilityId"`;
			// var groupBySubCenter = `,  "subCenterId"`;
			// var groupByVillageId = `,  "villageId"`;

			if (req.body.districtId.length == 0) {
				districtId = "";
				//groupByDistrictId = "";
			}
			if (req.body.year.length == 0) {
				year = "";
				//groupByYear = "";
			}
			if (req.body.talukaId.length == 0) {
				taluka = "";
				//groupByTaluka = "";
			}
			if (req.body.facilityId.length == 0) {
				facility = "";
				//groupByFacility = "";
			}
			if (req.body.subCenterId.length == 0) {
				subCenter = "";
				//groupBySubCenter = "";
			}
			// if (req.body.genderId.length == 0) {
			// 	gender = "";
			// }
			if (req.body.age.length == 0) {
				age = "";
			}
			// if (req.body.diseaseType.length == 0) {
			// 	diseaseType = "";
			// }

			if (req.body.villageId.length == 0) {
				villageId = "";
				//groupByVillageId = "";
			}

			if (req.body.startMonth.length == 0) {
				start_month = `and  "month" BETWEEN 1 `;
			}
			if (req.body.endMonth.length == 0) {
				end_month = `and 12`;
			}

			db.sequelize
				.query(`
				select A1."ageGroup",COALESCE(A2."noLFPatientsMale",0) "noLFPatientsMale" ,
				COALESCE(A3."noLFPatientsFemale",0) "noLFPatientsFemale",
				COALESCE(A4."noHPatientsMale",0) "noHPatientsMale",
				COALESCE(A5."noHPatientsFemale",0) "noHPatientsFemale",
				COALESCE(A2."noLFPatientsMale",0) + COALESCE(A4."noHPatientsMale",0) "noPatientsMale",
				COALESCE(A3."noLFPatientsFemale",0) + COALESCE(A5."noHPatientsFemale",0) "noPatientsFemale"
				from 
				(SELECT unnest(ARRAY[col_a, col_b, col_c,col_d]) as "ageGroup"
				FROM (VALUES('0-15','16-40','41-65','65+')) AS x(col_a, col_b, col_c,col_d))A1
				LEFT JOIN
				(select  "ageGroup",sum("noPatients") "noLFPatientsMale" 
				from public."vLFDeseaseCases" 
				where  "diseaseType" like '%Lymphedema%' and "gender" = 'Male'
				${year} ${start_month} ${end_month} ${districtId} ${taluka} 
				${facility} ${subCenter} ${villageId}
				group by "ageGroup") A2
				ON A1."ageGroup"=A2."ageGroup"
				LEFT JOIN
				(select  "ageGroup",sum("noPatients") "noLFPatientsFemale" 
				from public."vLFDeseaseCases" 
				where  "diseaseType" like '%Lymphedema%' and "gender" = 'Female'
				${year} ${start_month} ${end_month} ${districtId} ${taluka} 
				${facility} ${subCenter} ${villageId}
				group by "ageGroup") A3
				ON A1."ageGroup"=A3."ageGroup"
				LEFT JOIN
				(select  "ageGroup",sum("noPatients") "noHPatientsMale" 
				from public."vLFDeseaseCases" 
				where  "diseaseType" like '%Hydrocele%' and "gender" = 'Male'
				${year} ${start_month} ${end_month} ${districtId} ${taluka} 
				${facility} ${subCenter} ${villageId} 
				group by "ageGroup") A4
				ON A1."ageGroup"=A4."ageGroup"
				LEFT JOIN
				(select  "ageGroup",sum("noPatients") "noHPatientsFemale" 
				from public."vLFDeseaseCases" 
				where  "diseaseType" like '%Hydrocele%' and "gender" = 'Female'
				${year} ${start_month} ${end_month} ${districtId} ${taluka} 
				${facility} ${subCenter} ${villageId} 
				group by "ageGroup") A5
				ON A1."ageGroup"=A5."ageGroup"
				where 1=1 ${age}
                `)
				.then(([results, metadata]) => {
					response.error = false;
					response.data = results;
				})
				.catch((error) => {
					console.log(error);
					response.error = true;
				})
				.finally(() => {
					resolve(response);
				});
		});
	};

	const get_LF_PendingHydroceleCasesListDao = async (req) => {
		return new Promise(async function (resolve) {
			var response = {};

			var districtId = `and  "districtId" = ${req.body.districtId}`;
			var year = `and  "year" = ${req.body.year}`;
			var start_month = `and  "month" BETWEEN ${req.body.startMonth} `;
			var end_month = `and  ${req.body.endMonth}`;
			var taluka = `and  "talukaId" = ${req.body.taluka}`;
			var facility = `and  "facilityId" = ${req.body.facilityId}`;
			var gender = `and  "gender" = ${req.body.gender}`;
			var age = `where "AgeGroup" like '%${req.body.age}%'`;
			var villageId = `and  "villageId" = ${req.body.villageId}`;
			var wardId = `and  "wardId" = ${req.body.wardId}`;
			var comorbidityType = `and  "comorbidityType" like '%${req.body.comorbidityType}%'`;
			// var surgeryNotPossibleReasonsId = `and  HF."surgeryNotPossibleReasonsId" = ${req.body.surgeryNotPossibleReasonsId} `;
			if (req.body.districtId.length == 0) {
				districtId = "";
			}
			if (req.body.year.length == 0) {
				year = "";
			}

			if (req.body.taluka.length == 0) {
				taluka = "";
			}
			if (req.body.facilityId.length == 0) {
				facility = "";
			}
			if (req.body.gender.length == 0) {
				gender = "";
			}
			if (req.body.age.length == 0) {
				age = "";
			}
			if (req.body.startMonth.length == 0) {
				start_month = `and  L."month" BETWEEN 1 `;
			}
			if (req.body.endMonth.length == 0) {
				end_month = `and 12`;
			}
			if (req.body.comorbidityType.length == 0) {
				comorbidityType = "";
			}
			if (req.body.wardId.length == 0) {
				wardId = "";
			}
			if (req.body.villageId.length == 0) {
				villageId = "";
			}
			// if (req.body.surgeryNotPossibleReasonsId.length == 0) {
			// 	surgeryNotPossibleReasonsId = "";
			// }

			// const page = req.page ? req.page : 1;
			// const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
			// const offset = (page - 1) * itemsPerPage;

			db.sequelize
				.query(`
				select A1."districtId",A1."districtName",
				A1."nameOfUnitId",VC."nameOfControlUnit",
				Coalesce(A2."NoOfCasesH1",0) "noOfCasesH1",
				Coalesce(A3."NoOfCasesH2",0) "noOfCasesH2",
				Coalesce(A4."NoOfCasesH3",0) "noOfCasesH3",
				Coalesce(A5."NoOfCasesH4",0) "noOfCasesH4",
				Coalesce(A1."NoOfCases",0) "noOfCases",
				Coalesce(A6."NoOfCasesOperated",0) "noOfCasesOperated",
				Coalesce(A8."NoOfCasesIneligible",0) "noOfCasesIneligible",
				Coalesce(A7."NoOfCasesPending",0) "noOfCasesPending"
				from 
				(select A."nameOfUnitId",A."districtId",A."districtName",
				count(A.id) as "NoOfCases" from 
				(select * from public."vPendingHydroceleCases" where 1=1 
				${districtId} ${year} ${start_month} ${end_month} ${taluka} ${facility} ${gender}
				${comorbidityType} ${wardId} ${villageId} ${age}
				) A 
				group by A."nameOfUnitId",A."districtId",A."districtName")A1
				left join 
				(select A."nameOfUnitId",A."districtId",A."districtName",
				count(A.id) as "NoOfCasesH1" from 
				(select * from public."vPendingHydroceleCases" where 1=1 
				${districtId} ${year} ${start_month} ${end_month} ${taluka} ${facility} ${gender}
				${comorbidityType} ${wardId} ${villageId} ${age}
				) A where A."stageOfHydrocele"=1
				group by A."nameOfUnitId",A."districtId",A."districtName")A2
				ON A1."nameOfUnitId"=A2."nameOfUnitId" and A1."districtId"=A2."districtId"
				left join 
				(select A."nameOfUnitId",A."districtId",A."districtName",
				count(A.id) as "NoOfCasesH2" from 
				(select * from public."vPendingHydroceleCases" where 1=1 
				${districtId} ${year} ${start_month} ${end_month} ${taluka} ${facility} ${gender}
				${comorbidityType} ${wardId} ${villageId} ${age}
				) A where A."stageOfHydrocele"=2
				group by A."nameOfUnitId",A."districtId",A."districtName")A3
				ON A1."nameOfUnitId"=A3."nameOfUnitId" and A1."districtId"=A3."districtId"
				left join 
				(select A."nameOfUnitId",A."districtId",A."districtName",
				count(A.id) as "NoOfCasesH3" from 
				(select * from public."vPendingHydroceleCases" where 1=1 
				${districtId} ${year} ${start_month} ${end_month} ${taluka} ${facility} ${gender}
				${comorbidityType} ${wardId} ${villageId} ${age}
				) A where A."stageOfHydrocele"=3
				group by A."nameOfUnitId",A."districtId",A."districtName")A4
				ON A1."nameOfUnitId"=A4."nameOfUnitId" and A1."districtId"=A4."districtId"
				left join 
				(select A."nameOfUnitId",A."districtId",A."districtName",
				count(A.id) as "NoOfCasesH4" from 
				(select * from public."vPendingHydroceleCases" where 1=1 
				${districtId} ${year} ${start_month} ${end_month} ${taluka} ${facility} ${gender}
				${comorbidityType} ${wardId} ${villageId} ${age}
				) A where A."stageOfHydrocele"=4
				group by A."nameOfUnitId",A."districtId",A."districtName")A5
				ON A1."nameOfUnitId"=A5."nameOfUnitId" and A1."districtId"=A5."districtId"
				left join 
				(select A."nameOfUnitId",A."districtId",A."districtName",
				count(A.id) as "NoOfCasesOperated" from 
				(select * from public."vPendingHydroceleCases" where 1=1 
				${districtId} ${year} ${start_month} ${end_month} ${taluka} ${facility} ${gender}
				${comorbidityType} ${wardId} ${villageId} ${age}
				) A where A."isSurgeryDone"=true
				group by A."nameOfUnitId",A."districtId",A."districtName")A6
				ON A1."nameOfUnitId"=A6."nameOfUnitId" and A1."districtId"=A6."districtId"
				left join 
				(select A."nameOfUnitId",A."districtId",A."districtName",
				count(A.id) as "NoOfCasesPending" from 
				(select * from public."vPendingHydroceleCases" where 1=1 
				${districtId} ${year} ${start_month} ${end_month} ${taluka} ${facility} ${gender}
				${comorbidityType} ${wardId} ${villageId} ${age}
				) A where A."surgeryNotPossibleReasons"='Pending/Absent'
				group by A."nameOfUnitId",A."districtId",A."districtName")A7
				ON A1."nameOfUnitId"=A7."nameOfUnitId" and A1."districtId"=A7."districtId"
				left join 
				(select A."nameOfUnitId",A."districtId",A."districtName",
				count(A.id) as "NoOfCasesIneligible" from 
				(select * from public."vPendingHydroceleCases" where 1=1 
				${districtId} ${year} ${start_month} ${end_month} ${taluka} ${facility} ${gender}
				${comorbidityType} ${wardId} ${villageId} ${age}
				) A where A."surgeryNotPossibleReasons" is not null 
				and  A."surgeryNotPossibleReasons"<>'Pending/Absent'
				group by A."nameOfUnitId",A."districtId",A."districtName")A8
				ON A1."nameOfUnitId"=A8."nameOfUnitId" and A1."districtId"=A8."districtId"
				left join public."verticalControlUnits" VC
				ON VC.id=A1."nameOfUnitId"
        		`)
				.then(([results, metadata]) => {
					response.error = false;
					response.data = results;
				})
				.catch((error) => {
					console.log(error);
					response.error = true;
				})
				.finally(() => {
					resolve(response);
				});
		});
	};

	const LF_MMDPActivityReportingDao = async (req) => {
		return new Promise(async function (resolve) {
			var response = {};

			var districtId = `and  l."districtId" = ${req.body.districtId}`;
			var year = `and  l."year" = ${req.body.year}`;
			var start_month = `and  l."month" BETWEEN ${req.body.startMonth} `;
			var end_month = `and  ${req.body.endMonth}`;
			var taluka = `and  l."talukaId" = ${req.body.taluka}`;
			var facility = `and  l."facilityId" = ${req.body.facilityId}`;
			var gender = `and  l."gender" = ${req.body.gender}`;
			var age = `where l."AgeGroup" like '%${req.body.age}%'`;

			if (req.body.districtId.length == 0) {
				districtId = "";
			}
			if (req.body.year.length == 0) {
				year = "";
			}
			if (req.body.startMonth.length == 0) {
				start_month = `and  l."month" BETWEEN 1 `;
			}
			if (req.body.endMonth.length == 0) {
				end_month = `and 12`;
			}
			if (req.body.taluka.length == 0) {
				taluka = "";
			}
			if (req.body.facilityId.length == 0) {
				facility = "";
			}
			if (req.body.gender.length == 0) {
				gender = "";
			}
			if (req.body.age.length == 0) {
				age = "";
			}

			// const page = req.page ? req.page : 1;
			// const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
			// const offset = (page - 1) * itemsPerPage;

			db.sequelize
				.query(`
					select A1."districtId",D."districtName",A1."nameOfUnit" "nameOfUnitId",
					VC."nameOfControlUnit",A1."facilityId", F."facilityName", 
					Coalesce(A1."totalCases",0) "totalCases",
					Coalesce(A2."followUpDone",0) "followUpDone",  
					Coalesce(A3."lostToFollowUp",0) "lostToFollowUp",
					Coalesce(A4."mmdpTrained",0) "mmdpTrained",  
					Coalesce(A5."balancedToTrained",0) "balancedToTrained",  
					Coalesce(A6."patientFollowingMM",0) "patientFollowingMM",  
					Coalesce(A7."mmdpKitGiven",0) "mmdpKitGiven",  
					Coalesce(A8."medicineGiven",0) "medicineGiven"
					from
					(select l."districtId",l."nameOfUnit",l."facilityId", count(id) "totalCases" 
					from public."vMMDPReporting" l where l."diseaseType" like '%Lymphedema%'
					${districtId} ${year} ${start_month} ${end_month} ${taluka} ${facility} ${gender} ${age}
					group by l."districtId",l."nameOfUnit",l."facilityId") A1
					left join
					(select l."districtId",l."nameOfUnit",l."facilityId", count(l.id) "followUpDone" 
					from public."vMMDPReporting" l 
					inner join lateral
					(select * from public."lymphedemaLineListFollowUpsLves"  where "lymphedemaLineListId"= l.id 
					 and Coalesce("followUpLostReasonsId",0)=0 and "isActive"=true limit 1 )lf on true
					where l."diseaseType" like '%Lymphedema%'
					${districtId} ${year} ${start_month} ${end_month} ${taluka} ${facility} ${gender} ${age}
					group by l."districtId",l."nameOfUnit",l."facilityId") A2
					on A1."districtId"=A2."districtId" and A1."nameOfUnit"=A2."nameOfUnit" and A1."facilityId"=A2."facilityId"
					left join
					(select l."districtId",l."nameOfUnit",l."facilityId", count(l.id) "lostToFollowUp" 
					from public."vMMDPReporting" l 
					inner join lateral
					(select * from public."lymphedemaLineListFollowUpsLves"  where "lymphedemaLineListId"= l.id 
					 and Coalesce("followUpLostReasonsId",0)<>0 and "isActive"=true limit 1 )lf on true
					where l."diseaseType" like '%Lymphedema%'
					${districtId} ${year} ${start_month} ${end_month} ${taluka} ${facility} ${gender} ${age}
					group by l."districtId",l."nameOfUnit",l."facilityId") A3
					on A1."districtId"=A3."districtId" and A1."nameOfUnit"=A3."nameOfUnit" and A1."facilityId"=A3."facilityId"
					left join
					(select l."districtId",l."nameOfUnit",l."facilityId", count(l.id) "mmdpTrained" 
					from public."vMMDPReporting" l 
					inner join lateral
					(select * from public."lymphedemaLineListFollowUpsLves"  where "lymphedemaLineListId"= l.id 
					 and Coalesce("isServiceMMDPTrainingGiven",false)=true and "isActive"=true limit 1 )lf on true
					where l."diseaseType" like '%Lymphedema%'
					${districtId} ${year} ${start_month} ${end_month} ${taluka} ${facility} ${gender} ${age}
					group by l."districtId",l."nameOfUnit",l."facilityId") A4
					on A1."districtId"=A4."districtId" and A1."nameOfUnit"=A4."nameOfUnit" and A1."facilityId"=A4."facilityId"
					left join
					(select l."districtId",l."nameOfUnit",l."facilityId", count(l.id) "balancedToTrained" 
					from public."vMMDPReporting" l 
					inner join lateral
					(select * from public."lymphedemaLineListFollowUpsLves"  where "lymphedemaLineListId"= l.id 
					 and Coalesce("isServiceMMDPTrainingGiven",true)=false and "isActive"=true limit 1 )lf on true
					where l."diseaseType" like '%Lymphedema%'
					${districtId} ${year} ${start_month} ${end_month} ${taluka} ${facility} ${gender} ${age}
					group by l."districtId",l."nameOfUnit",l."facilityId") A5
					on A1."districtId"=A5."districtId" and A1."nameOfUnit"=A5."nameOfUnit" and A1."facilityId"=A5."facilityId"
					left join
					(select l."districtId",l."nameOfUnit",l."facilityId", count(l.id) "patientFollowingMM" 
					from public."vMMDPReporting" l 
					inner join lateral
					(select * from public."lymphedemaLineListFollowUpsLves"  where "lymphedemaLineListId"= l.id 
					 and Coalesce("isServicePatientFollowingMM",false)=true and "isActive"=true limit 1 )lf on true
					where l."diseaseType" like '%Lymphedema%'
					${districtId} ${year} ${start_month} ${end_month} ${taluka} ${facility} ${gender} ${age}
					group by l."districtId",l."nameOfUnit",l."facilityId")A6
					on A1."districtId"=A6."districtId" and A1."nameOfUnit"=A6."nameOfUnit" and A1."facilityId"=A6."facilityId"
					left join
					(select l."districtId",l."nameOfUnit",l."facilityId", count(l.id) "mmdpKitGiven" 
					from public."vMMDPReporting" l 
					inner join lateral
					(select * from public."lymphedemaLineListFollowUpsLves"  where "lymphedemaLineListId"= l.id 
					 and Coalesce("isServiceMMDPKitGiven",false)=true and "isActive"=true limit 1 )lf on true
					where l."diseaseType" like '%Lymphedema%'
					${districtId} ${year} ${start_month} ${end_month} ${taluka} ${facility} ${gender} ${age}
					group by l."districtId",l."nameOfUnit",l."facilityId") A7
					on A1."districtId"=A7."districtId" and A1."nameOfUnit"=A7."nameOfUnit" and A1."facilityId"=A7."facilityId"
					left join
					(select l."districtId",l."nameOfUnit",l."facilityId", count(l.id) "medicineGiven" 
					from public."vMMDPReporting" l 
					inner join lateral
					(select * from public."lymphedemaLineListFollowUpsLves"  where "lymphedemaLineListId"= l.id 
					 and Coalesce("isServiceMedicineGiven",false)=true and "isActive"=true limit 1 )lf on true
					where l."diseaseType" like '%Lymphedema%'
					${districtId} ${year} ${start_month} ${end_month} ${taluka} ${facility} ${gender} ${age}
					group by l."districtId",l."nameOfUnit",l."facilityId") A8
					on A1."districtId"=A8."districtId" and A1."nameOfUnit"=A8."nameOfUnit" and A1."facilityId"=A8."facilityId"
					left join districts D ON D.id = A1."districtId"
					left join public."verticalControlUnits" VC ON VC.id=A1."nameOfUnit"
					left join public.facilities F ON F.id=A1."facilityId"
				`)
				.then(([results, metadata]) => {
					response.error = false;
					response.data = results;
				})
				.catch((error) => {
					console.log(error);
					response.error = true;
				})
				.finally(() => {
					resolve(response);
				});
		});
	};

	const get_LF_PatientsineligibleForSurgery = async (req) => {
		return new Promise(async function (resolve) {
			var response = {};

			var districtId = `and  L."districtId" = ${req.body.districtId}`;
			var year = `and  L."year" = ${req.body.year}`;
			var start_month = `and  L."month" BETWEEN ${req.body.startMonth} `;
			var end_month = `and  ${req.body.endMonth}`;
			var taluka = `and  L."talukaId" = ${req.body.taluka}`;
			var facility = `and  L."facilityId" = ${req.body.facilityId}`;
			var gender = `and  L."gender" = ${req.body.gender}`;

			var age = `where A."AgeGroup" like '%${req.body.age}%'`;

			if (req.body.districtId.length == 0) {
				districtId = "";
			}
			if (req.body.year.length == 0) {
				year = "";
			}
			if (req.body.startMonth.length == 0) {
				start_month = `and  L."month" BETWEEN 1 `;
			}
			if (req.body.endMonth.length == 0) {
				end_month = `and 12`;
			}
			if (req.body.taluka.length == 0) {
				taluka = "";
			}
			if (req.body.facilityId.length == 0) {
				facility = "";
			}
			if (req.body.gender.length == 0) {
				gender = "";
			}
			if (req.body.age.length == 0) {
				age = "";
			}

			// const page = req.page ? req.page : 1;
			// const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
			// const offset = (page - 1) * itemsPerPage;

			db.sequelize
				.query(
					`
            select * from (select L.Year,L.Month,L."districtId",D."districtName",
            L."nameOfPatient",L."patientId",
            L."talukaId",T."talukaName",C."corporationName",L."facilityId",F."facilityName",Sb."subCenterName",
            L."villageId",V."villageName",L.town,W."wardName",L."ageYears",L."ageMonths",
            (case when L."ageYears"<16 then '0-15' when L."ageYears"<41 then '16-40'
              when L."ageYears"<66 then '46-65' else  '65+' end) AS "AgeGroup",	
            U."categoryOptionName" As "gender",
            L."patientMobileNumber",L."permanentAddressLine1",L."permanentAddressLine2",
            D1."districtName" as City,HF."isSurgeryDone",
            S."stateName",L."permanentAddressPINCode",	HF."stageOfHydrocele",
            L."isAffectedLeftScrotum",L."isAffectedRightScrotum", L.grading,L."diseaseLastedYears",
            L."diseaseLastedMonths",L."isPresenceOfBlisters",	HF."serviceProviderName",
            HF."serviceProviderDesignation",HF."serviceProviderPlace",'' AS "ServiceGiven",
            HF."serviceProviderPhone",LS."verifiedByDoctorName", HF."surgeryNotPossibleReasonsId",
            UD."categoryOptionName" AS "surgeryNotPossibleReason",
            L."diseaseType" ,HF."comorbidityType",UD."categoryOptionName"
        from public."lymphedemaLineLists" L
        left join public."lymphedemaLineListSurveys" LS on LS."lymphedemaLineListId"  = L.id
        left join public."lymphedemaLineListFollowUpsHFs" HF on HF."lymphedemaLineListId" = L.id
        left join public."lymphedemaLineListFollowUpsLves" LF on LF."lymphedemaLineListId" = L.id
        left join public.corporations C on C.id = L."corporationId"
        left join public.districts D on D.id = L."districtId"
        left join public.facilities F on F.id = L."facilityId"
        left join public."subCenters" Sb on Sb.id = L."subCenterId"
        left join public.talukas T on T.id = L."talukaId"
        left join public.villages V on V.id = L."villageId"
        left join public.wards W on W.id = L."wardId"
        left join public.zones Z on Z.id = L."zoneId"
        left join public.facilities F1 on F1.id = HF."nameOfHospitalSurgeryDoneId"
        left join public.states S on S.id = L."permanentAddressState"
        left join public.districts D1 on D1."districtName" = L."permanentAddressCity"
        left join public."udCategoryOptions" UD on UD.id=HF."surgeryNotPossibleReasonsId"
        left join public."udCategoryOptions" U ON U.id=L.gender
        where HF."surgeryNotPossibleReasonsId" is not null and L."diseaseType" like '%Hydrocele%'
        and L."isActive"=true
        ${districtId} ${year} ${start_month} ${end_month} ${taluka} ${facility} ${gender}
        ) A ${age}
        `
				)
				.then(([results, metadata]) => {
					response.error = false;
					response.data = results;
				})
				.catch((error) => {
					console.log(error);
					response.error = true;
				})
				.finally(() => {
					resolve(response);
				});
		});
	};

	const VerifiedbyMODao = async (req) => {
		return new Promise(async function (resolve) {
			var response = {};

			var districtId = `and  "districtId" = ${req.body.districtId}`;
			var year = `and  "year" = ${req.body.year}`;
			var start_month = `and  "month" BETWEEN ${req.body.startMonth} `;
			var end_month = `and  ${req.body.endMonth}`;
			var taluka = `and  "talukaId" = ${req.body.talukaId}`;
			var facility = `and  "facilityId" = ${req.body.facilityId}`;
			var gender = `and  "gender" = ${req.body.gender}`;
			var villageId = `and  "villageId" = ${req.body.villageId}`;
			var wardId = `and  "wardId" = ${req.body.wardId}`;
			var age = `where "AgeGroup" like '%${req.body.age}%'`;
			// var isVerified = `and  LF."isVerified" = ${req.body.isVerified}`;
			
			if (req.body.districtId.length == 0) {
				districtId = "";
			}
			if (req.body.year.length == 0) {
				year = "";
			}
			if (req.body.startMonth.length == 0) {
				start_month = `and  "month" BETWEEN 1 `;
			}
			if (req.body.endMonth.length == 0) {
				end_month = `and 12`;
			}

			if (req.body.talukaId.length == 0) {
				taluka = "";
			}
			if (req.body.facilityId.length == 0) {
				facility = "";
			}
			if (req.body.gender.length == 0) {
				gender = "";
			}
			if (req.body.age.length == 0) {
				age = "";
			}
			if (req.body.wardId.length == 0) {
				wardId = "";
			}
			if (req.body.villageId.length == 0) {
				villageId = "";
			}
			// if (req.body.isVerified.length == 0) {
			// 	isVerified = "";
			// }

			// const page = req.page ? req.page : 1;
			// const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
			// const offset = (page - 1) * itemsPerPage;

			db.sequelize
				.query(`
				select A1."districtName",A1. "diseaseType",
				A1."nameOfUnitId",VC."nameOfControlUnit",
				A1."facilityId", F."facilityName",
				Coalesce(A1."noOfCases",0) "noOfCases",
				Coalesce(A2."noOfCasesVerified",0) "noOfCasesVerified",
				(Coalesce(A1."noOfCases",0)-Coalesce(A2."noOfCasesVerified",0)) "noOfCasesPendingVerification"
				from
				(select "districtId","districtName","nameOfUnitId","facilityId",
				"diseaseType", count(id) as "noOfCases" from public."vVerifiedByMO"
				where 1=1 
				${districtId} ${year} ${start_month} ${end_month} ${taluka} ${facility} ${gender}
				${villageId} ${wardId}  ${age}
				group by "districtId","districtName","nameOfUnitId","facilityId","diseaseType")A1
				left join
				(select "districtId","districtName","nameOfUnitId","facilityId",
				"diseaseType",count(id) as "noOfCasesVerified" from public."vVerifiedByMO"
				where "isVerified"=true 
				${districtId} ${year} ${start_month} ${end_month} ${taluka} ${facility} ${gender}
				${villageId} ${wardId}  ${age}
				group by "districtId","districtName","nameOfUnitId","facilityId","diseaseType")A2
				on A1."districtId"=A2."districtId" and A1."nameOfUnitId"=A2."nameOfUnitId"
				and A1."facilityId"=A2."facilityId" and A1."diseaseType"=A2."diseaseType"
				left join public."verticalControlUnits" VC
				ON VC.id=A1."nameOfUnitId"
				left join public.facilities F ON F.id=A1."facilityId"
        		`)
				.then(([results, metadata]) => {
					response.error = false;
					response.data = results;
				})
				.catch((error) => {
					console.log(error);
					response.error = true;
				})
				.finally(() => {
					resolve(response);
				});
		});
	};

	const LF_PerformanceOfInstitutesDao = async (req) => {
		return new Promise(async function (resolve) {
			var response = {};

			var districtId = `and  "districtId" = ${req.body.districtId}`;
			var year = `and  "year" = ${req.body.year}`;
			var start_month = `and  "month" BETWEEN ${req.body.startMonth} `;
			var end_month = `and  ${req.body.endMonth}`;

			if (req.body.districtId.length == 0) {
				districtId = "";
			}
			if (req.body.year.length == 0) {
				year = "";
			}
			if (req.body.startMonth.length == 0) {
				start_month = `and  "month" BETWEEN 1 `;
			}
			if (req.body.endMonth.length == 0) {
				end_month = `and 12`;
			}

			// const page = req.page ? req.page : 1;
			// const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
			// const offset = (page - 1) * itemsPerPage;

			db.sequelize
				.query(`
				select A1."districtId",A1."districtName",
				A1."nameOfUnitId",VC."nameOfControlUnit",
				A1."facilityId", F."facilityName", 
				Coalesce(A1."NoOfCases",0) "noOfCases",
				Coalesce(A2."NoOfSurgeriesPerformed",0) "noOfSurgeriesPerformed",
				Coalesce(Coalesce(A1."NoOfCases",0)-Coalesce(A2."NoOfSurgeriesPerformed",0),0) "noOfSurgeriesPending"
				from
				(select A."nameOfUnitId",A."districtId",A."districtName",
				A."facilityId",count(A.id) as "NoOfCases" 
				from
				(select * from public."vPendingHydroceleCases" where 1=1
				${districtId} ${year} ${start_month} ${end_month}
				) A
				group by A."nameOfUnitId",A."districtId",A."districtName",A."facilityId")A1	
				left join
				(select A."nameOfUnitId",A."districtId",A."districtName",
				A."facilityId",count(A.id) as "NoOfSurgeriesPerformed" 
				from
				(select * from public."vPendingHydroceleCases"  
				where "isSurgeryDone"=true
				${districtId} ${year} ${start_month} ${end_month}
				) A
				group by A."nameOfUnitId",A."districtId",A."districtName",A."facilityId")A2
				ON A1."nameOfUnitId"=A2."nameOfUnitId" and A1."districtId"=A2."districtId"
				and A1."facilityId"=A2."facilityId"
				
				left join public."verticalControlUnits" VC
				ON VC.id=A1."nameOfUnitId"
				left join public.facilities F ON F.id=A1."facilityId"
        		`)
				.then(([results, metadata]) => {
					response.error = false;
					response.data = results;
				})
				.catch((error) => {
					console.log(error);
					response.error = true;
				})
				.finally(() => {
					resolve(response);
				});
		});
	};

	const LF_PerformanceOfSurgeonsDao = async (req) => {
		return new Promise(async function (resolve) {
			var response = {};

			var districtId = `and  "districtId" = ${req.body.districtId}`;
			var year = `and  "year" = ${req.body.year}`;
			var start_month = `and  "month" BETWEEN ${req.body.startMonth} `;
			var end_month = `and  ${req.body.endMonth}`;

			if (req.body.startMonth.length == 0) {
				start_month = `and  "month" BETWEEN 1 `;
			}
			if (req.body.endMonth.length == 0) {
				end_month = `and 12`;
			}

			if (req.body.districtId.length == 0) {
				districtId = "";
			}
			if (req.body.year.length == 0) {
				year = "";
			}

			// const page = req.page ? req.page : 1;
			// const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
			// const offset = (page - 1) * itemsPerPage;

			db.sequelize
				.query(`
					select A1."districtId",A1."districtName",
					A1."nameOfUnitId",VC."nameOfControlUnit",
					A1."facilityId", F."facilityName",A1."nameOfSurgeon",
					Coalesce(A1."NoOfSurgeriesPerformed",0) "noOfSurgeriesPerformed"
					from
					(select A."nameOfUnitId",A."districtId",A."districtName",
					 A."facilityId",A."nameOfSurgeon",count(A.id) as "NoOfSurgeriesPerformed" 
					from
					(select * from public."vPendingHydroceleCases" where "isSurgeryDone"=true
					${districtId} ${year} ${start_month} ${end_month}
					) A where A."isSurgeryDone"=true
					group by A."nameOfUnitId",A."districtId",A."districtName",A."facilityId",A."nameOfSurgeon")A1	
					left join public."verticalControlUnits" VC
					ON VC.id=A1."nameOfUnitId"
					left join public.facilities F ON F.id=A1."facilityId"
        		`)
				.then(([results, metadata]) => {
					response.error = false;
					response.data = results;
				})
				.catch((error) => {
					console.log(error);
					response.error = true;
				})
				.finally(() => {
					resolve(response);
				});
		});
	};

	const PlanningForOTDao = async (req) => {
		return new Promise(async function (resolve) {
			var response = {};

			var districtId = `and  O."districtId" = ${req.body.districtId}`;
			var year = `and  O."year" = ${req.body.year}`;
			var start_month = `and  O."month" BETWEEN ${req.body.startMonth} `;
			var end_month = `and  ${req.body.endMonth}`;

			if (req.body.districtId.length == 0) {
				districtId = "";
			}
			if (req.body.year.length == 0) {
				year = "";
			}
			if (req.body.startMonth.length == 0) {
				start_month = `and  O."month" BETWEEN 1 `;
			}
			if (req.body.endMonth.length == 0) {
				end_month = `and 12`;
			}

			// const page = req.page ? req.page : 1;
			// const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
			// const offset = (page - 1) * itemsPerPage;

			db.sequelize
			.query(`
            select O.year,O.month,O."districtId",D."districtName",
			F1."facilityName",
            O."nameOfInstitutionOT",O."noOfAvailableSurgeons",O."noOfAvailableAnaesthetist",
            MOT."facilityId" AS "facilityId",
            OS."surgeonOrAnesthetist",OS."nameOfDoctor",OS."headquarter",OS."headquarterOther"
            from public."mappingOfOTs" O
            left join public."mappingOfOTSurgeons" OS on OS."mappingOfOTId" =  O.id
            left join public.districts D on D.id =  O."districtId"
            left join public."mappingOfOTPhcAttachedToTheaters" MOT on MOT."mappingOfOTId" = O.id
			left join public.facilities F1 ON F1.id=MOT."facilityId"
			where O."isActive"=true         
        	${districtId} ${year} ${start_month} ${end_month}    
        `)
				.then(([results, metadata]) => {
					response.error = false;
					response.data = results;
				})
				.catch((error) => {
					console.log(error);
					response.error = true;
				})
				.finally(() => {
					resolve(response);
				});
		});
	};

	const FollowUpServicesLymphedemaDao = async (req) => {
		return new Promise(async function (resolve) {
			var response = {};

			var districtId = `and  L."districtId" = ${req.body.districtId}`;
			var year = `and  L."year" = ${req.body.year}`;
			var start_month = `and  L."month" BETWEEN ${req.body.startMonth} `;
			var end_month = `and  ${req.body.endMonth}`;
			var villageId = `and  L."villageId" = ${req.body.villageId}`;
			var wardId = `and  L."wardId" = ${req.body.wardId}`;
			var facilityId = `and  L."facilityId" = ${req.body.facilityId}`;

			if (req.body.districtId.length == 0) {
				districtId = "";
			}
			if (req.body.year.length == 0) {
				year = "";
			}
			if (req.body.startMonth.length == 0) {
				start_month = `and  L."month" BETWEEN 1 `;
			}
			if (req.body.endMonth.length == 0) {
				end_month = `and 12`;
			}

			if (req.body.villageId.length == 0) {
				villageId = "";
			}
			if (req.body.wardId.length == 0) {
				wardId = "";
			}

			if (req.body.facilityId.length == 0) {
				facilityId = "";
			}
			// const page = req.page ? req.page : 1;
			// const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
			// const offset = (page - 1) * itemsPerPage;

			db.sequelize
				.query(
					`
            select L."patientId",L."nameOfPatient",L."year",L."month",L."districtId",D."districtName",
            L."facilityId",F."facilityName",L."subCenterId",Sb."subCenterName",L."diseaseType",
            L."villageId",LS."dateOfSurvey",LS."verifiedByDoctorName",LS."dateOfVerification",
            LF."serviceProviderName",LF."serviceDateOfVisit",
            LF."isServiceMMDPTrainingGiven",LF."serviceMMDPTrainingDate",
            LF."isServicePatientFollowingMM",LF."servicePatientFollowingDate",
            LF."isServiceMMDPKitGiven",LF."serviceMMDPKitGivenDate",
            LF."isServiceMedicineGiven",LF."serviceMedicineGivenDate",
            LF."followUpLostReasonsId",U."categoryOptionName" AS "followUpLostReason"
            from public."lymphedemaLineLists" L
            left join public."lymphedemaLineListSurveys" LS on LS."lymphedemaLineListId"  = L.id and LS."isVerified"=true
            left join public."lymphedemaLineListFollowUpsLves" LF on LF."lymphedemaLineListId" = L.id
            left join public.corporations C on C.id = L."corporationId"
            left join public.districts D on D.id = L."districtId"
            left join public.facilities F on F.id = L."facilityId"
            left join public."subCenters" Sb on Sb.id = L."subCenterId"
            left join public.villages V on V.id = L."villageId"
            left join public."udCategoryOptions" U ON U.id=LF."followUpLostReasonsId"
            where lower("diseaseType") like '%lymphedema%' and L."isActive"=true
        ${districtId} ${year} ${start_month} ${end_month}  ${villageId} ${wardId} ${facilityId}
        
        `
				)
				.then(([results, metadata]) => {
					response.error = false;
					response.data = results;
				})
				.catch((error) => {
					console.log(error);
					response.error = true;
				})
				.finally(() => {
					resolve(response);
				});
		});
	};

	const FollowUpServicesHydroceleDao = async (req) => {
		return new Promise(async function (resolve) {
			var response = {};

			var districtId = `and  L."districtId" = ${req.body.districtId}`;
			var year = `and  L."year" = ${req.body.year}`;
			var start_month = `and  L."month" BETWEEN ${req.body.startMonth} `;
			var end_month = `and  ${req.body.endMonth}`;
			var villageId = `and  L."villageId" = ${req.body.villageId}`;
			var wardId = `and  L."wardId" = ${req.body.wardId}`;
			var facilityId = `and  L."facilityId" = ${req.body.facilityId}`;

			if (req.body.districtId.length == 0) {
				districtId = "";
			}
			if (req.body.year.length == 0) {
				year = "";
			}
			if (req.body.startMonth.length == 0) {
				start_month = `and  L."month" BETWEEN 1 `;
			}
			if (req.body.endMonth.length == 0) {
				end_month = `and 12`;
			}

			if (req.body.villageId.length == 0) {
				villageId = "";
			}
			if (req.body.wardId.length == 0) {
				wardId = "";
			}

			if (req.body.facilityId.length == 0) {
				facilityId = "";
			}
			// const page = req.page ? req.page : 1;
			// const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
			// const offset = (page - 1) * itemsPerPage;

			db.sequelize
				.query(
					`
            select L."patientId",L."nameOfPatient",L."year",L."month",L."districtId",D."districtName",
            L."facilityId",F."facilityName",L."subCenterId",Sb."subCenterName",L."diseaseType",
            L."villageId",LS."dateOfSurvey",LS."verifiedByDoctorName",LS."dateOfVerification",
            HF."serviceProviderName",HF."isAnyComorbidity",HF."otherComorbidity",
            HF."isSurgeryDone",HF."dateOfSurgery",HF."nameOfSurgeon",
            HF."nameOfHospitalSurgeryDoneId",F1."facilityName" AS "nameOfHospitalSurgeryDone",
            HF."stageOfHydrocele","dateOfFollowUpAfterSurgery",HF."findingsDuringSurgeryFollowUp",
            HF."surgeryNotPossibleReasonsId",U."categoryOptionName" AS "surgeryNotPossibleReason"
            from public."lymphedemaLineLists" L
            left join public."lymphedemaLineListSurveys" LS on LS."lymphedemaLineListId"  = L.id and LS."isVerified"=true
            left join public."lymphedemaLineListFollowUpsHFs" HF on HF."lymphedemaLineListId" = L.id
            left join public.corporations C on C.id = L."corporationId"
            left join public.districts D on D.id = L."districtId"
            left join public.facilities F on F.id = L."facilityId"
            left join public."subCenters" Sb on Sb.id = L."subCenterId"
            left join public.villages V on V.id = L."villageId"
            left join public.facilities F1 on F1.id = HF."nameOfHospitalSurgeryDoneId"
            left join public."udCategoryOptions" U ON U.id=HF."surgeryNotPossibleReasonsId"
            where lower("diseaseType") like '%hydrocele%' and  L."isActive"=true
            ${districtId} ${year} ${start_month} ${end_month}  ${villageId} ${wardId} ${facilityId}
        
        `
				)
				.then(([results, metadata]) => {
					response.error = false;
					response.data = results;
				})
				.catch((error) => {
					console.log(error);
					response.error = true;
				})
				.finally(() => {
					resolve(response);
				});
		});
	};

	const get_GradingOfLFPatientsDao = async (req) => {
		return new Promise(async function (resolve) {
			var response = {};

			var districtId = `and  "districtId" = ${req.body.districtId}`;
			var year = `and  "year" = ${req.body.year}`;
			var start_month = `and  "month" BETWEEN ${req.body.startMonth} `;
			var end_month = `and  ${req.body.endMonth}`;
			var taluka = `and  "talukaId" = ${req.body.taluka}`;
			var facility = `and  "facilityId" = ${req.body.facilityId}`;
			var gender = `and  "gender" = ${req.body.gender}`;
			var age = `where "AgeGroup" like '%${req.body.age}%'`;
			var villageId = `and  "villageId" = ${req.body.villageId}`;
			var wardId = `and  "wardId" = ${req.body.wardId}`;

		
			if (req.body.districtId.length == 0) {
				districtId = "";
			}
			if (req.body.year.length == 0) {
				year = "";
			}

			if (req.body.taluka.length == 0) {
				taluka = "";
			}
			if (req.body.facilityId.length == 0) {
				facility = "";
			}
			if (req.body.gender.length == 0) {
				gender = "";
			}
			if (req.body.age.length == 0) {
				age = "";
			}
			if (req.body.startMonth.length == 0) {
				start_month = `and  L."month" BETWEEN 1 `;
			}
			if (req.body.endMonth.length == 0) {
				end_month = `and 12`;
			}
			if (req.body.wardId.length == 0) {
				wardId = "";
			}
			if (req.body.villageId.length == 0) {
				villageId = "";
			}
			// const page = req.page ? req.page : 1;
			// const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
			// const offset = (page - 1) * itemsPerPage;

			db.sequelize
				.query(`
				select A1."districtId",A1."districtName",
				Coalesce(A1."NoOfCases",0) "noOfCases",
				A1."nameOfUnitId",VC."nameOfControlUnit",
				Coalesce(A2."NoOfCasesG1",0) "noOfCasesG1",
				Coalesce(A3."NoOfCasesG2",0) "noOfCasesG2",
				Coalesce(A4."NoOfCasesG3",0) "noOfCasesG3",
				Coalesce(A5."NoOfCasesG4",0) "noOfCasesG4",
				Coalesce(A6."NoOfCasesG5",0) "noOfCasesG5",
				Coalesce(A7."NoOfCasesG6",0) "noOfCasesG6",
				Coalesce(A8."NoOfCasesG7",0) "noOfCasesG7"
				from 
				(select A."nameOfUnitId",A."districtId",A."districtName",
				count(A.id) as "NoOfCases" from 
				(select * from "vGradingLF" where 1=1 
				${districtId} ${year} ${start_month} ${end_month} ${taluka} ${facility} ${gender}
				${wardId} ${villageId} ${age}
				) A 
				group by A."nameOfUnitId",A."districtId",A."districtName")A1
				left join 
				(select A."nameOfUnitId",A."districtId",A."districtName",
				count(A.id) as "NoOfCasesG1" from 
				(select * from public."vGradingLF" where 1=1 
				${districtId} ${year} ${start_month} ${end_month} ${taluka} ${facility} ${gender}
				${wardId} ${villageId} ${age}
				) A where A."grading"=6
				group by A."nameOfUnitId",A."districtId",A."districtName")A2
				ON A1."nameOfUnitId"=A2."nameOfUnitId" and A1."districtId"=A2."districtId"
				left join 
				(select A."nameOfUnitId",A."districtId",A."districtName",
				count(A.id) as "NoOfCasesG2" from 
				(select * from public."vGradingLF" where 1=1 
				${districtId} ${year} ${start_month} ${end_month} ${taluka} ${facility} ${gender}
				${wardId} ${villageId} ${age}
				) A where A."grading"=7
				group by A."nameOfUnitId",A."districtId",A."districtName")A3
				ON A1."nameOfUnitId"=A3."nameOfUnitId" and A1."districtId"=A3."districtId"
				left join 
				(select A."nameOfUnitId",A."districtId",A."districtName",
				count(A.id) as "NoOfCasesG3" from 
				(select * from public."vGradingLF" where 1=1 
				${districtId} ${year} ${start_month} ${end_month} ${taluka} ${facility} ${gender}
				${wardId} ${villageId} ${age}
				) A where A."grading"=8
				group by A."nameOfUnitId",A."districtId",A."districtName")A4
				ON A1."nameOfUnitId"=A4."nameOfUnitId" and A1."districtId"=A4."districtId"
				left join 
				(select A."nameOfUnitId",A."districtId",A."districtName",
				count(A.id) as "NoOfCasesG4" from 
				(select * from public."vGradingLF" where 1=1 
				${districtId} ${year} ${start_month} ${end_month} ${taluka} ${facility} ${gender}
				${wardId} ${villageId} ${age}
				) A where A."grading"=9
				group by A."nameOfUnitId",A."districtId",A."districtName")A5
				ON A1."nameOfUnitId"=A5."nameOfUnitId" and A1."districtId"=A5."districtId"
				left join 
				(select A."nameOfUnitId",A."districtId",A."districtName",
				count(A.id) as "NoOfCasesG5" from 
				(select * from public."vGradingLF" where 1=1 
				${districtId} ${year} ${start_month} ${end_month} ${taluka} ${facility} ${gender}
				${wardId} ${villageId} ${age}
				) A where A."grading"=10
				group by A."nameOfUnitId",A."districtId",A."districtName")A6
				ON A1."nameOfUnitId"=A6."nameOfUnitId" and A1."districtId"=A6."districtId"
				left join 
				(select A."nameOfUnitId",A."districtId",A."districtName",
				count(A.id) as "NoOfCasesG6" from 
				(select * from public."vGradingLF" where 1=1 
				${districtId} ${year} ${start_month} ${end_month} ${taluka} ${facility} ${gender}
				${wardId} ${villageId} ${age}
				) A where A."grading"=11
				group by A."nameOfUnitId",A."districtId",A."districtName")A7
				ON A1."nameOfUnitId"=A7."nameOfUnitId" and A1."districtId"=A7."districtId"
				left join 
				(select A."nameOfUnitId",A."districtId",A."districtName",
				count(A.id) as "NoOfCasesG7" from 
				(select * from public."vGradingLF" where 1=1 
				${districtId} ${year} ${start_month} ${end_month} ${taluka} ${facility} ${gender}
				${wardId} ${villageId} ${age}
				) A where A."grading"=12
				group by A."nameOfUnitId",A."districtId",A."districtName")A8
				ON A1."nameOfUnitId"=A8."nameOfUnitId" and A1."districtId"=A8."districtId"
				left join public."verticalControlUnits" VC
				ON VC.id=A1."nameOfUnitId"
        		`)
				.then(([results, metadata]) => {
					response.error = false;
					response.data = results;
				})
				.catch((error) => {
					console.log(error);
					response.error = true;
				})
				.finally(() => {
					resolve(response);
				});
		});
	};
	return {
		LF_MMDPActivityReportingDao,
		get_LF_HydroceleOPLineListDao,
		get_LF_DieseaseCasesListDao,
		get_LF_PendingHydroceleCasesListDao,
		get_LF_PatientsineligibleForSurgery,
		getLfAnalysis2Dao,
		getLfAnalysis1Dao,
		VerifiedbyMODao,
		LF_PerformanceOfInstitutesDao,
		LF_PerformanceOfSurgeonsDao,
		PlanningForOTDao,
		FollowUpServicesLymphedemaDao,
		FollowUpServicesHydroceleDao,
		get_GradingOfLFPatientsDao,
	};
};
export default lHLineListDao();
