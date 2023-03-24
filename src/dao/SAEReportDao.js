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
const SAEReportDao = () => {

	const reportdao = async (req) => {
		return new Promise(async function (resolve) {
			var response = {}

			var start_month = `and  M."month" BETWEEN ${req.startMonth} `
			var end_month = `and  ${req.endMonth}`

			if (req.startMonth.length == 0) {
				start_month = `and  M."month" BETWEEN 1 `
			}
			if (req.endMonth.length == 0) {
				end_month = `and 12`
			}
			var year = ''

			if (!req.year.length == 0) {
				year = `and Year =  ${req.year}`
			}


			// const page = req.page ? req.page : 1;
			// const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
			// const offset = (page - 1) * itemsPerPage;

			db.sequelize.query(`select D."districtName",MDA.*,
			COALESCE((MDA."noOfPersonsWithFever" + MDA."noOfPersonsWithHeadache" + MDA."noOfPersonsWithBodyache"
 			+ MDA."noOfPersonsWithNausea" + MDA."noOfPersonsWithVomiting" + MDA."noOfPersonsWithOther"),0) AS "NoOfPersonsWithSAE"
			from
			(
			select M1."districtId",
			COALESCE((M1."noOfPersonsWithFever" + M2."noOfPersonsWithFever"),0) AS "noOfPersonsWithFever",
			COALESCE((M3."noOfPersonsWithHeadache" + M4."noOfPersonsWithHeadache"),0) AS "noOfPersonsWithHeadache",
			COALESCE((M5."noOfPersonsWithBodyache" + M6."noOfPersonsWithBodyache"),0) AS "noOfPersonsWithBodyache",
			COALESCE((M7."noOfPersonsWithNausea" + M8."noOfPersonsWithNausea"),0) AS "noOfPersonsWithNausea",
			COALESCE((M9."noOfPersonsWithVomiting" + M10."noOfPersonsWithVomiting"),0) AS "noOfPersonsWithVomiting",
			COALESCE(M11."noOfPersonsWithOther",0) AS "noOfPersonsWithOther" ,
			COALESCE((M12."noOfPersonsRecovered" + M13."noOfPersonsRecovered"),0) AS "noOfPersonsRecovered",
			COALESCE((M12."noOfPersonsNotRecovered" + M13."noOfPersonsRecovered"),0) AS "noOfPersonsNotRecovered",		
			COALESCE((M14."requiredHospitalStay" + M15."requiredHospitalStay"),0) AS "requiredHospitalStay"
	from
	(
		select M."districtId",sum(MR."noOfPersonsWithFever"::integer) AS "noOfPersonsWithFever" from public."mdaIDACoverages" M
		LEFT JOIN public."mdaIDACoverageRegularLists" MR ON MR."mdaIDACoverageId"=M.id
		where MR."noOfPersonsWithFever" is not null
		group by M."districtId"
	) M1 LEFT JOIN
	(
		select M."districtId",sum(MP."noOfPersonsWithFever"::integer) AS "noOfPersonsWithFever" from 
		public."mdaIDACoverages" M
		LEFT JOIN public."mdaIDACoverageMopUpLists" MP ON MP."mdaIDACoverageId"=M.id
		where MP."noOfPersonsWithFever" is not null
${year} ${start_month} ${end_month}	
group by M."districtId"
	)M2 ON M1."districtId"=M2."districtId"
	LEFT JOIN
	(
		select M."districtId",sum(MR."noOfPersonsWithHeadache"::integer) AS "noOfPersonsWithHeadache" from 
		public."mdaIDACoverages" M
		LEFT JOIN public."mdaIDACoverageRegularLists" MR ON MR."mdaIDACoverageId"=M.id
		where MR."noOfPersonsWithHeadache" is not null
${year} ${start_month} ${end_month}		
group by M."districtId"
	) M3 ON M3."districtId"=M1."districtId"
	LEFT JOIN
	(
		select M."districtId",sum(MP."noOfPersonsWithHeadache"::integer) AS "noOfPersonsWithHeadache" from
		 public."mdaIDACoverages" M
		LEFT JOIN public."mdaIDACoverageMopUpLists" MP ON MP."mdaIDACoverageId"=M.id
		where MP."noOfPersonsWithHeadache" is not null
${year} ${start_month} ${end_month}		
group by M."districtId"
	)M4 ON M4."districtId"=M1."districtId"
	LEFT JOIN
	(
		select M."districtId",sum(MR."noOfPersonsWithBodyache"::integer) AS "noOfPersonsWithBodyache" from
		 public."mdaIDACoverages" M
		LEFT JOIN public."mdaIDACoverageRegularLists" MR ON MR."mdaIDACoverageId"=M.id
		where MR."noOfPersonsWithBodyache" is not null
${year} ${start_month} ${end_month}	
group by M."districtId"
	) M5 ON M5."districtId"=M1."districtId"
	LEFT JOIN
	(
		select M."districtId",sum(MP."noOfPersonsWithBodyache"::integer) AS "noOfPersonsWithBodyache" 
		from public."mdaIDACoverages" M
		LEFT JOIN public."mdaIDACoverageMopUpLists" MP ON MP."mdaIDACoverageId"=M.id
		where MP."noOfPersonsWithBodyache" is not null
${year} ${start_month} ${end_month}	
group by M."districtId"
	)M6 ON M6."districtId"=M1."districtId"
	LEFT JOIN
	(
		select M."districtId",sum(MR."noOfPersonsWithNausea"::integer) AS "noOfPersonsWithNausea" from
		 public."mdaIDACoverages" M
		LEFT JOIN public."mdaIDACoverageRegularLists" MR ON MR."mdaIDACoverageId"=M.id
		where MR."noOfPersonsWithNausea" is not null
		${year} ${start_month} ${end_month}
		group by M."districtId"
	) M7 ON M7."districtId"=M1."districtId"
	LEFT JOIN
	(
		select M."districtId",sum(MP."noOfPersonsWithNausea"::integer) AS "noOfPersonsWithNausea" from
		 public."mdaIDACoverages" M
		LEFT JOIN public."mdaIDACoverageMopUpLists" MP ON MP."mdaIDACoverageId"=M.id
		where MP."noOfPersonsWithNausea" is not null
${year} ${start_month} ${end_month}		
group by M."districtId"
	)M8 ON M8."districtId"=M1."districtId"
	LEFT JOIN
	(
		select M."districtId",sum(MR."noOfPersonsWithVomiting"::integer) AS "noOfPersonsWithVomiting" from 
		public."mdaIDACoverages" M
		LEFT JOIN public."mdaIDACoverageRegularLists" MR ON MR."mdaIDACoverageId"=M.id
		where MR."noOfPersonsWithVomiting" is not null
${year} ${start_month} ${end_month}	
group by M."districtId"
	) M9 ON M9."districtId"=M1."districtId"
	LEFT JOIN
	(
		select M."districtId",sum(MP."noOfPersonsWithVomiting"::integer) AS "noOfPersonsWithVomiting" from 
		public."mdaIDACoverages" M
		LEFT JOIN public."mdaIDACoverageMopUpLists" MP ON MP."mdaIDACoverageId"=M.id
		where MP."noOfPersonsWithVomiting" is not null
${year} ${start_month} ${end_month}	
group by M."districtId"
	)M10 ON M10."districtId"=M1."districtId"
	LEFT JOIN
	(
		select M."districtId",sum(O."noOfPersonsWithOtherAdverseExp"::integer) AS "noOfPersonsWithOther" from 
		public."mdaIDACoverages" M
		LEFT JOIN public."mdaIDACoverageOthersLists" O ON O."mdaIDACoverageId"=M.id
		where O."noOfPersonsWithOtherAdverseExp" is not null
${year} ${start_month} ${end_month}
	
	group by M."districtId"
	)M11 ON M11."districtId"=M1."districtId"
	LEFT JOIN
	(
		select M."districtId",sum( MR."noOfPersonsRecovered") AS "noOfPersonsRecovered",
		sum( MR."noOfPersonsNotRecovered") AS "noOfPersonsNotRecovered"
		from public."mdaIDACoverages" M
		LEFT JOIN public."mdaIDACoverageRegularLists" MR ON MR."mdaIDACoverageId"=M.id
${year} ${start_month} ${end_month}
		
group by M."districtId"
	) M12 ON M12."districtId"=M1."districtId"
	LEFT JOIN
	(
		select M."districtId",sum( MP."noOfPersonsRecovered") AS "noOfPersonsRecovered",
		sum( MP."noOfPersonsNotRecovered") AS "noOfPersonsNotRecovered"
		from public."mdaIDACoverages" M
		LEFT JOIN public."mdaIDACoverageMopUpLists" MP ON MP."mdaIDACoverageId"=M.id
${year} ${start_month} ${end_month}
		
group by M."districtId"
	)M13 ON M13."districtId"=M1."districtId"
	LEFT JOIN
	(
		select M."districtId",sum( M."districtId") AS "requiredHospitalStay" from public."mdaIDACoverages" M
		LEFT JOIN public."mdaIDACoverageRegularLists" MR ON MR."mdaIDACoverageId"=M.id
		where MR."isRequiredHospitalStay" = 'yes'
${year} ${start_month} ${end_month}
	
	group by M."districtId"
	) M14 ON M14."districtId"=M1."districtId"
	LEFT JOIN
	(
		select M."districtId",sum( M."districtId") AS "requiredHospitalStay" from public."mdaIDACoverages" M
		LEFT JOIN public."mdaIDACoverageMopUpLists" MP ON MP."mdaIDACoverageId"=M.id
		where MP."isRequiredHospitalStay" = true
${year} ${start_month} ${end_month}
		
group by M."districtId"
	)M15 ON M15."districtId"=M1."districtId"
) MDA
LEFT JOIN public.districts D ON D.id=MDA."districtId"

`).then(([results, metadata]) => {
				//console.log(results, metadata)
				response.error = false
				response.data = results
				// console.log("results", results)
			}).catch((error) => {
				console.log(error, 'error')
				response.error = true
			})
				.finally(() => {
					resolve(response)
				})
		})
	}


	return {

		reportdao

	};
};
export default SAEReportDao();