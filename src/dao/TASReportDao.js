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
const TASReportDao = () => {





    const get_TASReport1_SchoolDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var date = req.body.Date_of_survey
            // console.log(date)
            var DateOfSurvey = `and  T."DateOfSurvey" = '${date}'`
            var nameOfEUEA = `and T."nameOfEU"=  '${req.body.name_Of_EU}'`



            if (req.body.Date_of_survey.length == 0) {
                DateOfSurvey = ""
            }
            if (req.body.name_Of_EU == 0) {
                nameOfEUEA = ""
            }


            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
           
            select T."nameOfEU",T."nameOfSchool",T."DateOfSurvey",T."serialNoOfSchool",
            T."typeOfSchool",T."tokenNumberSB" from public."tasSurveys" T
            where T."isActive"=true
        ${DateOfSurvey} ${nameOfEUEA}
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


    const get_TASReport1_StudentDao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}

            var date = req.body.Date_of_survey
            // console.log(date)
            var DateOfSurvey = `and  T."DateOfSurvey" = '${date}'`
            var nameOfEUEA = `and T."nameOfEU"=  '${req.body.name_Of_EU}'`



            if (req.body.Date_of_survey.length == 0) {
                DateOfSurvey = ""
            }
            if (req.body.name_Of_EU == 0) {
                nameOfEUEA = ""
            }


            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
           
            select 
            TC."nameOfStudent",TC."ageYears",TC."ageMonths",UD."categoryOptionName" sex,TC.result
            from public."tasSurveys" T 
            left join public."tasSurveyChildrens" TC ON TC."tasSurveyId"=T.ID
            left join public."udCategoryOptions" UD ON UD."id"=TC.sex
             where T."isActive"=true
        ${DateOfSurvey} ${nameOfEUEA}
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


    const get_TASReport2Dao = async (req) => {
        return new Promise(async function (resolve) {
            var response = {}


            var nameOfStudent = `and  TC."nameOfStudent" = '${req.body.name_of_student}'`
            var nameOfSchool = `and T."nameOfSchool" =  '${req.body.name_of_school}'`



            if (req.body.name_of_student.length == 0) {
                nameOfStudent = ""
            }
            if (req.body.name_of_school.length == 0) {
                nameOfSchool = ""
            }

            // const page = req.page ? req.page : 1;
            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
            // const offset = (page - 1) * itemsPerPage;

            db.sequelize.query(`
           
            select 
            TC."nameOfStudent",T."nameOfSchool",T."districtId",T."villageId",T."wardId",
            D."districtName",V."villageName",W."wardName",
            '' AS "fatherName",TC."ageYears",TC."ageMonths",
            UD."categoryOptionName" sex,'' AS "completePermanentAddress",'' AS "dateOfICT"
            from public."tasSurveys" T
            left join public."tasSurveyChildrens" TC ON TC."tasSurveyId"=T.id
            left join public."udCategoryOptions" UD ON UD."id"=TC.sex
            left join public.districts D on D.id = T."districtId"
            left join public.villages V on V.id = T."villageId"
            left join public.wards W on W.id = T."wardId"
            where T."isActive"=true
        ${nameOfStudent} ${nameOfSchool}
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

        get_TASReport1_SchoolDao,
        get_TASReport1_StudentDao,
        get_TASReport2Dao,

    };
};
export default TASReportDao();