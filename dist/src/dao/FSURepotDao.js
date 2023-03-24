"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _resources = _interopRequireDefault(require("../../config/resources"));

var _sequelize = _interopRequireDefault(require("../../config/sequelize"));

var lymphedemaLineList = _sequelize["default"].lymphedemaLineList,
    lymphedemaLineListSurvey = _sequelize["default"].lymphedemaLineListSurvey,
    lymphedemaLineListFollowUpsLF = _sequelize["default"].lymphedemaLineListFollowUpsLF,
    lymphedemaLineListFollowUpsHF = _sequelize["default"].lymphedemaLineListFollowUpsHF,
    udCategoryOptions = _sequelize["default"].udCategoryOptions,
    verticalControlFieldUnits = _sequelize["default"].verticalControlFieldUnits,
    verticalControlUnits = _sequelize["default"].verticalControlUnits,
    states = _sequelize["default"].states,
    districts = _sequelize["default"].districts,
    corporations = _sequelize["default"].corporations,
    talukas = _sequelize["default"].talukas,
    zones = _sequelize["default"].zones,
    facilities = _sequelize["default"].facilities,
    subCenters = _sequelize["default"].subCenters,
    wards = _sequelize["default"].wards,
    villages = _sequelize["default"].villages;
var Op = _sequelize["default"].Sequelize.Op;
var sqDB = _sequelize["default"].Sequelize.sqDb;

var FSUReportDao = function FSUReportDao() {
  var get_FSUAnalysis1Dao = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve) {
                  var response, districtId, year, facilityId, nameOfUnitId, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          response = {};
                          districtId = "and  M.\"districtId\" = ".concat(req.body.districtId);
                          year = "and Year =  ".concat(req.body.year);
                          facilityId = "and  M.\"facilityId\" = ".concat(req.body.facilityId);
                          nameOfUnitId = "and  M.\"nameOfUnit\" = ".concat(req.body.nameOfUnitId);
                          start_month = "and  M.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  M.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.facilityId.length == 0) {
                            facilityId = "";
                          }

                          if (req.body.nameOfUnitId.length == 0) {
                            nameOfUnitId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select M.Id,M.\"nameOfUnit\" AS \"nameOfUnitId\", VC.\"nameOfControlUnit\", M.\"facilityId\",F.\"facilityName\",\n            M.\"villageId\",V.\"villageName\",M.\"districtId\",D.\"districtName\", M.\"totalPopulationVillage\",M.\"populationCoveredByUnit\", \n            M.\"totalNoOfHousesInArea\",MS2.\"NoOfBSCollected\",MS3.\"NoOfBSExamined\",M.\"noOfBSFoundPositive\", \n             ((M.\"noOfBSFoundPositive\"/ (CASE MS3.\"NoOfBSExamined\" WHEN 0 Then NULL ELSE MS3.\"NoOfBSExamined\" END)) * 100) as \"MFRate\",\n             \"NoOfPersonSurveyed\" As \"DiseasePatients\",0 as \"VectorInfectionRate\"\n            from public.\"mfPositiveLineLists\" M\n            LEFT JOIN (select  MS.\"dateOfAction\" , MS.\"mfPositiveLineListId\",\n                \"noOfPersonsMale0to4\"+\"noOfPersonsMale5to14\"+\"noOfPersonsMale15to39\"+\"noOfPersonsMale40Plus\"+\n                \"noOfPersonsFemale0to4\"+\"noOfPersonsFemale5to14\"+\"noOfPersonsFemale15to39\"+\"noOfPersonsFemale40Plus\"+\n                \"noOfPersonsTG0to4\"+\"noOfPersonsTG5to14\"+\"noOfPersonsTG15to39\"+\"noOfPersonsTG40Plus\"\n                as \"NoOfPersonSurveyed\" from public.\"mfPositiveLineListSurveys\" MS \n            where  MS.\"detailsOfSurveyId\"=(select id from public.\"udCategoryOptions\" where \"categoryCode\"=1013 and \"categoryOptionCode\"='NPS')) \n            MS1 ON MS1.\"mfPositiveLineListId\"=M.id \n            LEFT JOIN (select  MS.\"dateOfAction\" , MS.\"mfPositiveLineListId\",\n                \"noOfPersonsMale0to4\"+\"noOfPersonsMale5to14\"+\"noOfPersonsMale15to39\"+\"noOfPersonsMale40Plus\"+\n                \"noOfPersonsFemale0to4\"+\"noOfPersonsFemale5to14\"+\"noOfPersonsFemale15to39\"+\"noOfPersonsFemale40Plus\"+\n                \"noOfPersonsTG0to4\"+\"noOfPersonsTG5to14\"+\"noOfPersonsTG15to39\"+\"noOfPersonsTG40Plus\"\n                as \"NoOfBSCollected\" from public.\"mfPositiveLineListSurveys\" MS \n            where  MS.\"detailsOfSurveyId\"=(select id from public.\"udCategoryOptions\" where \"categoryCode\"=1013 and \"categoryOptionCode\"='NPC')) \n            MS2 ON MS2.\"mfPositiveLineListId\"=M.id \n            LEFT JOIN (select  MS.\"dateOfAction\" , MS.\"mfPositiveLineListId\",\n                \"noOfPersonsMale0to4\"+\"noOfPersonsMale5to14\"+\"noOfPersonsMale15to39\"+\"noOfPersonsMale40Plus\"+\n                \"noOfPersonsFemale0to4\"+\"noOfPersonsFemale5to14\"+\"noOfPersonsFemale15to39\"+\"noOfPersonsFemale40Plus\"+\n                \"noOfPersonsTG0to4\"+\"noOfPersonsTG5to14\"+\"noOfPersonsTG15to39\"+\"noOfPersonsTG40Plus\"\n                as \"NoOfBSExamined\" from public.\"mfPositiveLineListSurveys\" MS \n            where  MS.\"detailsOfSurveyId\"=(select id from public.\"udCategoryOptions\" where \"categoryCode\"=1013 and \"categoryOptionCode\"='NBSE') ) \n            MS3 ON MS3.\"mfPositiveLineListId\"=M.id \n            LEFT JOIN public.facilities F on F.id=M.\"facilityId\"\n            LEFT JOIN public.villages  V on V.id=M.\"villageId\"\n            LEFT JOIN public.districts D on D.id = M.\"districtId\"\n            LEFT JOIN public.\"verticalControlUnits\" VC on VC.id = M.\"nameOfUnit\"\n            where MS1.\"mfPositiveLineListId\"=M.Id and MS2.\"mfPositiveLineListId\"=M.Id and MS3.\"mfPositiveLineListId\"=M.Id\n            and M.\"isActive\"=true\n            ".concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(facilityId, " ").concat(nameOfUnitId, "\n\t")).then(function (_ref3) {
                            var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
                                results = _ref4[0],
                                metadata = _ref4[1];

                            response.error = false;
                            response.data = results; //console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 14:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));

                return function (_x2) {
                  return _ref2.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function get_FSUAnalysis1Dao(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var get_FSUAnalysis2ListDao = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req) {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(resolve) {
                  var response, districtId, year, facilityId, nameOfUnitId, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          response = {};
                          districtId = "and  M.\"districtId\" = ".concat(req.body.districtId);
                          year = "and Year =  ".concat(req.body.year);
                          facilityId = "and  M.\"facilityId\" = ".concat(req.body.facilityId);
                          nameOfUnitId = "and  M.\"nameOfUnit\" = ".concat(req.body.nameOfUnitId);
                          start_month = "and  M.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  M.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.facilityId.length == 0) {
                            facilityId = "";
                          }

                          if (req.body.nameOfUnitId.length == 0) {
                            nameOfUnitId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select M.Id,M.\"nameOfUnit\" AS \"nameOfUnitId\", V.\"nameOfControlUnit\",\n            M.\"facilityId\",F.\"facilityName\", M.\"districtId\",D.\"districtName\",\n            M.\"totalPopulationVillage\",MS1.\"NoOfPersonSurveyed\",\n            MS3.\"PersonsExaminedMale\",MS3.\"PersonsExaminedFemale\",MS3.\"PersonsExaminedTG\",\n            MS3.\"PersonsExaminedMale\"+MS3.\"PersonsExaminedFemale\"+MS3.\"PersonsExaminedTG\" AS \"NoOfBSExamined\",\n            MS2.\"NoOfBSCollected\",  \n            MS4.\"FoundMFPostveMale\",MS4.\"FoundMFPostveFemale\",MS4.\"FoundMFPostveTG\",\n            MS4.\"FoundMFPostveMale\"+MS4.\"FoundMFPostveFemale\"+MS4.\"FoundMFPostveTG\" AS \"FoundMFPostve\",\n            (MS5.\"FoundTotPostveMale\"-MS4.\"FoundMFPostveMale\") AS \"FoundDesPostveMale\",\n            (MS5.\"FoundTotPostveFemale\"-MS4.\"FoundMFPostveFemale\") AS \"FoundDesPostveFemale\",\n            (MS5.\"FoundTotPostveTG\"-MS4.\"FoundMFPostveTG\") AS \"FoundDesPostveTG\",\n             (MS5.\"FoundTotPostveMale\"-MS4.\"FoundMFPostveMale\") +\n            (MS5.\"FoundTotPostveFemale\"-MS4.\"FoundMFPostveFemale\") +\n            (MS5.\"FoundTotPostveTG\"-MS4.\"FoundMFPostveTG\") AS \"FoundDesPostve\",\n            MS5.\"FoundTotPostveMale\",MS5.\"FoundTotPostveFemale\",MS5.\"FoundTotPostveTG\",\n            MS5.\"FoundTotPostveMale\"+MS5.\"FoundTotPostveFemale\"+MS5.\"FoundTotPostveTG\" AS \"FoundTotPostve\",\n            \n            MS2.\"NoOfBSCollected\",M.\"noOfBSFoundPositive\"\n          \n          from public.\"mfPositiveLineLists\" M\n          LEFT JOIN (select  MS.\"dateOfAction\" , MS.\"mfPositiveLineListId\",\n              \"noOfPersonsMale0to4\"+\"noOfPersonsMale5to14\"+\"noOfPersonsMale15to39\"+\"noOfPersonsMale40Plus\" +\n              \"noOfPersonsFemale0to4\"+\"noOfPersonsFemale5to14\"+\"noOfPersonsFemale15to39\"+\"noOfPersonsFemale40Plus\"+\n              \"noOfPersonsTG0to4\"+\"noOfPersonsTG5to14\"+\"noOfPersonsTG15to39\"+\"noOfPersonsTG40Plus\"\n              as \"NoOfPersonSurveyed\" from public.\"mfPositiveLineListSurveys\" MS \n          where  MS.\"detailsOfSurveyId\"=(select id from public.\"udCategoryOptions\" where \"categoryCode\"=1013 and \"categoryOptionCode\"='NPS')) \n          MS1 ON MS1.\"mfPositiveLineListId\"=M.id  \n          LEFT JOIN (\n              select  MS.\"dateOfAction\" , MS.\"mfPositiveLineListId\",\n              \"noOfPersonsMale0to4\"+\"noOfPersonsMale5to14\"+\"noOfPersonsMale15to39\"+\"noOfPersonsMale40Plus\"+\n              \"noOfPersonsFemale0to4\"+\"noOfPersonsFemale5to14\"+\"noOfPersonsFemale15to39\"+\"noOfPersonsFemale40Plus\"+\n              \"noOfPersonsTG0to4\"+\"noOfPersonsTG5to14\"+\"noOfPersonsTG15to39\"+\"noOfPersonsTG40Plus\"\n              as \"NoOfBSCollected\" from public.\"mfPositiveLineListSurveys\" MS \n          where  MS.\"detailsOfSurveyId\"=(select id from public.\"udCategoryOptions\" where \"categoryCode\"=1013 and \"categoryOptionCode\"='NPC')\n          ) \n          MS2 ON MS2.\"mfPositiveLineListId\"=M.id \n          LEFT JOIN ( \n              select  MS.\"dateOfAction\" , MS.\"mfPositiveLineListId\",\n              \"noOfPersonsMale0to4\"+\"noOfPersonsMale5to14\"+\"noOfPersonsMale15to39\"+\"noOfPersonsMale40Plus\" As \"PersonsExaminedMale\",\n              \"noOfPersonsFemale0to4\"+\"noOfPersonsFemale5to14\"+\"noOfPersonsFemale15to39\"+\"noOfPersonsFemale40Plus\" As \"PersonsExaminedFemale\",\n              \"noOfPersonsTG0to4\"+\"noOfPersonsTG5to14\"+\"noOfPersonsTG15to39\"+\"noOfPersonsTG40Plus\" As \"PersonsExaminedTG\"\n               from public.\"mfPositiveLineListSurveys\" MS \n          where  MS.\"detailsOfSurveyId\"=(select id from public.\"udCategoryOptions\" where \"categoryCode\"=1013 and \"categoryOptionCode\"='NBSE') \n          ) \n          MS3 ON MS3.\"mfPositiveLineListId\"=M.id \n          LEFT JOIN (\n              select  MS.\"dateOfAction\" , MS.\"mfPositiveLineListId\",\n              \"noOfPersonsMale0to4\"+\"noOfPersonsMale5to14\"+\"noOfPersonsMale15to39\"+\"noOfPersonsMale40Plus\" As \"FoundMFPostveMale\",\n              \"noOfPersonsFemale0to4\"+\"noOfPersonsFemale5to14\"+\"noOfPersonsFemale15to39\"+\"noOfPersonsFemale40Plus\" As \"FoundMFPostveFemale\",\n              \"noOfPersonsTG0to4\"+\"noOfPersonsTG5to14\"+\"noOfPersonsTG15to39\"+\"noOfPersonsTG40Plus\" As \"FoundMFPostveTG\"\n               from public.\"mfPositiveLineListSurveys\" MS \n          where  MS.\"detailsOfSurveyId\"=(select id from public.\"udCategoryOptions\" where \"categoryCode\"=1013 and \"categoryOptionCode\"='NPMF') \n          ) \n          MS4 ON MS4.\"mfPositiveLineListId\"=M.id \n          LEFT JOIN (\n              select  MS.\"dateOfAction\" , MS.\"mfPositiveLineListId\",\n              \"noOfPersonsMale0to4\"+\"noOfPersonsMale5to14\"+\"noOfPersonsMale15to39\"+\"noOfPersonsMale40Plus\" As \"FoundTotPostveMale\",\n              \"noOfPersonsFemale0to4\"+\"noOfPersonsFemale5to14\"+\"noOfPersonsFemale15to39\"+\"noOfPersonsFemale40Plus\" As \"FoundTotPostveFemale\",\n              \"noOfPersonsTG0to4\"+\"noOfPersonsTG5to14\"+\"noOfPersonsTG15to39\"+\"noOfPersonsTG40Plus\" As \"FoundTotPostveTG\"\n               from public.\"mfPositiveLineListSurveys\" MS \n          where  MS.\"detailsOfSurveyId\"=(select id from public.\"udCategoryOptions\" where \"categoryCode\"=1013 and \"categoryOptionCode\"='NPLFMF') \n          ) \n          MS5 ON MS5.\"mfPositiveLineListId\"=M.id \n          LEFT JOIN public.facilities F on F.id= M.\"facilityId\"\n          LEFT JOIN public.districts D on D.id = M.\"districtId\"\n          LEFT JOIN public.\"verticalControlUnits\" V on V.id = M.\"nameOfUnit\"\n          where MS1.\"mfPositiveLineListId\"=M.Id and MS2.\"mfPositiveLineListId\"=M.Id and MS3.\"mfPositiveLineListId\"=M.Id \n          and MS4.\"mfPositiveLineListId\"=M.Id\n          and M.\"isActive\"=true\n".concat(districtId, " ").concat(year, "  ").concat(start_month, " ").concat(end_month, "\n").concat(facilityId, " ").concat(nameOfUnitId, "\n\t")).then(function (_ref7) {
                            var _ref8 = (0, _slicedToArray2["default"])(_ref7, 2),
                                results = _ref8[0],
                                metadata = _ref8[1];

                            response.error = false;
                            response.data = results; //console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 14:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }));

                return function (_x4) {
                  return _ref6.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function get_FSUAnalysis2ListDao(_x3) {
      return _ref5.apply(this, arguments);
    };
  }();

  var get_FSUAnalysis3ListDao = /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req) {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(resolve) {
                  var response, districtId, nameOfUnitId, from_date, to_date, year, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          response = {};
                          districtId = "and  M.\"districtId\" = ".concat(req.body.districtId);
                          nameOfUnitId = "and  M.\"nameOfUnit\" = ".concat(req.body.nameOfUnitId);
                          from_date = "".concat(req.body.from_date);
                          to_date = "".concat(req.body.to_date);
                          year = "and  A.\"year\" = ".concat(req.body.year);

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.nameOfUnitId.length == 0) {
                            nameOfUnitId = "";
                          }

                          start_month = "A.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.year.length == 0) {
                            year = '';
                          }

                          if (req.body.startMonth.length == 0) {
                            start_month = "A.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          _sequelize["default"].sequelize.query("\n Select A.\"nameOfUnitId\", A.\"nameOfControlUnit\",\n A.\"districtId\",A.\"districtName\",\n A.\"villageId\",A.\"villageName\",A.year,A.month,\n sum(A.\"totalPopulationVillage\") AS \"totalPopulationVillage\",\n sum(A.\"NoOfPersonSurveyed\") AS \"NoOfPersonSurveyed\",\n sum(A.\"targetForCollectionOfNBS\") AS \"targetForCollectionOfNBS\",\n sum(A.\"NoOfBSCollected\") AS \"NoOfBSCollected\",\n sum(A.\"AchivedOfBSCollection\") AS \"AchivedOfBSCollection\",\n sum(A.\"NoOfBSExamined\") AS \"NoOfBSExamined\",\n sum(A.\"NoOfMFPostve\") AS \"NoOfMFPostve\",\n sum(A.\"FoundDesPostve\") AS \"FoundDesPostve\",\n sum(A.\"FoundTotPostve\") AS \"FoundTotPostve\",\n sum(A.\"TotCasesTreatment\") AS \"TotCasesTreatment\"\nFrom (\n  Select M.Id,M.year,M.month,M.\"nameOfUnit\" AS \"nameOfUnitId\", VC.\"nameOfControlUnit\",\n  M.\"districtId\",D.\"districtName\",M.\"villageId\",V.\"villageName\",\n  M.\"totalPopulationVillage\",MS1.\"NoOfPersonSurveyed\",\n  M.\"targetForCollectionOfNBS\",MS2.\"NoOfBSCollected\", \n  ((M.\"targetForCollectionOfNBS\"/(CASE MS2.\"NoOfBSCollected\" \n\tWHEN 0 Then 1 ELSE MS2.\"NoOfBSCollected\" END))*100) AS \"AchivedOfBSCollection\",  \n  MS3.\"PersonsExaminedMale\"+MS3.\"PersonsExaminedFemale\"+MS3.\"PersonsExaminedTG\" AS \"NoOfBSExamined\",\n  MS4.\"FoundMFPostveMale\"+MS4.\"FoundMFPostveFemale\"+MS4.\"FoundMFPostveTG\" AS \"NoOfMFPostve\",\n  (MS5.\"FoundTotPostveMale\"-MS4.\"FoundMFPostveMale\") +\n  (MS5.\"FoundTotPostveFemale\"-MS4.\"FoundMFPostveFemale\") +\n  (MS5.\"FoundTotPostveTG\"-MS4.\"FoundMFPostveTG\") AS \"FoundDesPostve\",\n   MS5.\"FoundTotPostveMale\"+MS5.\"FoundTotPostveFemale\"+MS5.\"FoundTotPostveTG\" AS \"FoundTotPostve\",\n   MS6.\"MFCasesTreatment\", 0 AS \"DecCasesTreatment\", MS6.\"MFCasesTreatment\" AS \"TotCasesTreatment\"\nfrom public.\"mfPositiveLineLists\" M\nLEFT JOIN (select  MS.\"dateOfAction\" , MS.\"mfPositiveLineListId\",\n    \"noOfPersonsMale0to4\"+\"noOfPersonsMale5to14\"+\"noOfPersonsMale15to39\"+\"noOfPersonsMale40Plus\" +\n\t\"noOfPersonsFemale0to4\"+\"noOfPersonsFemale5to14\"+\"noOfPersonsFemale15to39\"+\"noOfPersonsFemale40Plus\"+\n\t\"noOfPersonsTG0to4\"+\"noOfPersonsTG5to14\"+\"noOfPersonsTG15to39\"+\"noOfPersonsTG40Plus\"\n\tas \"NoOfPersonSurveyed\" from public.\"mfPositiveLineListSurveys\" MS \nwhere  MS.\"detailsOfSurveyId\"=(select id from public.\"udCategoryOptions\" where \"categoryCode\"=1013 and \"categoryOptionCode\"='NPS')) \nMS1 ON MS1.\"mfPositiveLineListId\"=M.id  \nLEFT JOIN (\n\tselect  MS.\"dateOfAction\" , MS.\"mfPositiveLineListId\",\n\t\"noOfPersonsMale0to4\"+\"noOfPersonsMale5to14\"+\"noOfPersonsMale15to39\"+\"noOfPersonsMale40Plus\"+\n\t\"noOfPersonsFemale0to4\"+\"noOfPersonsFemale5to14\"+\"noOfPersonsFemale15to39\"+\"noOfPersonsFemale40Plus\"+\n\t\"noOfPersonsTG0to4\"+\"noOfPersonsTG5to14\"+\"noOfPersonsTG15to39\"+\"noOfPersonsTG40Plus\"\n\tas \"NoOfBSCollected\" from public.\"mfPositiveLineListSurveys\" MS \nwhere  MS.\"detailsOfSurveyId\"=(select id from public.\"udCategoryOptions\" where \"categoryCode\"=1013 and \"categoryOptionCode\"='NPC')\n) \nMS2 ON MS2.\"mfPositiveLineListId\"=M.id \nLEFT JOIN(\n\tselect  MS.\"dateOfAction\" , MS.\"mfPositiveLineListId\",\n\t\"noOfPersonsMale0to4\"+\"noOfPersonsMale5to14\"+\"noOfPersonsMale15to39\"+\"noOfPersonsMale40Plus\" As \"PersonsExaminedMale\",\n\t\"noOfPersonsFemale0to4\"+\"noOfPersonsFemale5to14\"+\"noOfPersonsFemale15to39\"+\"noOfPersonsFemale40Plus\" As \"PersonsExaminedFemale\",\n\t\"noOfPersonsTG0to4\"+\"noOfPersonsTG5to14\"+\"noOfPersonsTG15to39\"+\"noOfPersonsTG40Plus\" As \"PersonsExaminedTG\"\n\t from public.\"mfPositiveLineListSurveys\" MS \nwhere  MS.\"detailsOfSurveyId\"=(select id from public.\"udCategoryOptions\" where \"categoryCode\"=1013 and \"categoryOptionCode\"='NBSE') \n) \nMS3 ON MS3.\"mfPositiveLineListId\"=M.id \nLEFT JOIN (\n\tselect  MS.\"dateOfAction\" , MS.\"mfPositiveLineListId\",\n\t\"noOfPersonsMale0to4\"+\"noOfPersonsMale5to14\"+\"noOfPersonsMale15to39\"+\"noOfPersonsMale40Plus\" As \"FoundMFPostveMale\",\n\t\"noOfPersonsFemale0to4\"+\"noOfPersonsFemale5to14\"+\"noOfPersonsFemale15to39\"+\"noOfPersonsFemale40Plus\" As \"FoundMFPostveFemale\",\n\t\"noOfPersonsTG0to4\"+\"noOfPersonsTG5to14\"+\"noOfPersonsTG15to39\"+\"noOfPersonsTG40Plus\" As \"FoundMFPostveTG\"\n\t from public.\"mfPositiveLineListSurveys\" MS \nwhere  MS.\"detailsOfSurveyId\"=(select id from public.\"udCategoryOptions\" where \"categoryCode\"=1013 and \"categoryOptionCode\"='NPMF') \n) \nMS4 ON MS4.\"mfPositiveLineListId\"=M.id \nLEFT JOIN (\n\tselect  MS.\"dateOfAction\" , MS.\"mfPositiveLineListId\",\n\t\"noOfPersonsMale0to4\"+\"noOfPersonsMale5to14\"+\"noOfPersonsMale15to39\"+\"noOfPersonsMale40Plus\" As \"FoundTotPostveMale\",\n\t\"noOfPersonsFemale0to4\"+\"noOfPersonsFemale5to14\"+\"noOfPersonsFemale15to39\"+\"noOfPersonsFemale40Plus\" As \"FoundTotPostveFemale\",\n\t\"noOfPersonsTG0to4\"+\"noOfPersonsTG5to14\"+\"noOfPersonsTG15to39\"+\"noOfPersonsTG40Plus\" As \"FoundTotPostveTG\"\n\t from public.\"mfPositiveLineListSurveys\" MS \nwhere  MS.\"detailsOfSurveyId\"=(select id from public.\"udCategoryOptions\" where \"categoryCode\"=1013 and \"categoryOptionCode\"='NPLFMF') \n) \nMS5 ON MS5.\"mfPositiveLineListId\"=M.id \nLEFT JOIN (select count(MP.id) AS \"MFCasesTreatment\",MP.\"mfPositiveLineListId\"  from public.\"mfPositiveLineListPatients\" MP \n\t\t   group by MP.\"mfPositiveLineListId\",MP.\"isTreatmentGive\" having MP.\"isTreatmentGive\"=true)\nMS6 ON MS6.\"mfPositiveLineListId\"=M.id \nLEFT JOIN public.districts D on D.id = M.\"districtId\"\nLEFT JOIN public.villages  V on V.id=M.\"villageId\"\nLEFT JOIN public.\"verticalControlUnits\" VC on VC.id = M.\"nameOfUnit\"\nwhere MS1.\"mfPositiveLineListId\"=M.Id and MS2.\"mfPositiveLineListId\"=M.Id and MS3.\"mfPositiveLineListId\"=M.Id \nand MS4.\"mfPositiveLineListId\"=M.Id ".concat(districtId, " ").concat(nameOfUnitId, "\n) A  where ").concat(start_month, " ").concat(end_month, " ").concat(year, "\ngroup by A.\"nameOfUnitId\",A.\"nameOfControlUnit\",\nA.\"districtId\",A.\"districtName\",\n A.\"villageId\",A.\"villageName\",A.year,A.month")).then(function (_ref11) {
                            var _ref12 = (0, _slicedToArray2["default"])(_ref11, 2),
                                results = _ref12[0],
                                metadata = _ref12[1];

                            response.error = false;
                            response.data = results;
                          })["catch"](function (error) {
                            console.log(error, '::::');
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 14:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5);
                }));

                return function (_x6) {
                  return _ref10.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function get_FSUAnalysis3ListDao(_x5) {
      return _ref9.apply(this, arguments);
    };
  }();

  var NPSDao = /*#__PURE__*/function () {
    var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req) {
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(resolve) {
                  var response, districtId, year, nameOfUnitId, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          response = {};
                          districtId = "and  M.\"districtId\" = ".concat(req.body.districtId);
                          year = "and Year =  ".concat(req.body.year);
                          nameOfUnitId = "and  M.\"nameOfUnit\" = ".concat(req.body.nameOfUnitId);
                          start_month = "and  M.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  M.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.nameOfUnitId.length == 0) {
                            nameOfUnitId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select M.Id,M.\"nameOfUnit\" AS \"nameOfUnitId\",M.\"districtId\",D.\"districtName\", \n            MS1.\"categoryOptionName\" as \"Action\",V.\"nameOfControlUnit\", MS1.*\n     from public.\"mfPositiveLineLists\" M\n     LEFT JOIN (select * from public.\"vMFPositiveLineListSurveys\" V1 where  V1.\"categoryOptionCode\"='NPS') \n     MS1 ON MS1.\"mfPositiveLineListId\"=M.id \n     LEFT JOIN public.districts D on D.id = M.\"districtId\"\n     LEFT JOIN public.\"verticalControlUnits\" V ON V.id=M.\"nameOfUnit\"\n     where  M.\"isActive\"=true\n".concat(districtId, " ").concat(year, "  ").concat(start_month, " ").concat(end_month, " ").concat(nameOfUnitId, "\n\t")).then(function (_ref15) {
                            var _ref16 = (0, _slicedToArray2["default"])(_ref15, 2),
                                results = _ref16[0],
                                metadata = _ref16[1];

                            response.error = false;
                            response.data = results; //console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 12:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  }, _callee7);
                }));

                return function (_x8) {
                  return _ref14.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function NPSDao(_x7) {
      return _ref13.apply(this, arguments);
    };
  }();

  var NBSEDao = /*#__PURE__*/function () {
    var _ref17 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req) {
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              return _context10.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(resolve) {
                  var response, districtId, year, nameOfUnitId, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          response = {};
                          districtId = "and  M.\"districtId\" = ".concat(req.body.districtId);
                          year = "and Year =  ".concat(req.body.year);
                          nameOfUnitId = "and  M.\"nameOfUnit\" = ".concat(req.body.nameOfUnitId);
                          start_month = "and  M.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  M.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.nameOfUnitId.length == 0) {
                            nameOfUnitId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select M.Id,M.\"nameOfUnit\" AS \"nameOfUnitId\",M.\"districtId\",D.\"districtName\", \n            MS1.\"categoryOptionName\" as \"Action\",V.\"nameOfControlUnit\", MS1.*\n     from public.\"mfPositiveLineLists\" M\n     LEFT JOIN (select * from public.\"vMFPositiveLineListSurveys\" V1 where  V1.\"categoryOptionCode\"='NBSE') \n     MS1 ON MS1.\"mfPositiveLineListId\"=M.id \n     LEFT JOIN public.districts D on D.id = M.\"districtId\"\n     LEFT JOIN public.\"verticalControlUnits\" V ON V.id=M.\"nameOfUnit\"\n     where M.\"isActive\"=true\n     ".concat(districtId, " ").concat(year, "  ").concat(start_month, " ").concat(end_month, "  ").concat(nameOfUnitId, "\n\t")).then(function (_ref19) {
                            var _ref20 = (0, _slicedToArray2["default"])(_ref19, 2),
                                results = _ref20[0],
                                metadata = _ref20[1];

                            response.error = false;
                            response.data = results; //console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 12:
                        case "end":
                          return _context9.stop();
                      }
                    }
                  }, _callee9);
                }));

                return function (_x10) {
                  return _ref18.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    return function NBSEDao(_x9) {
      return _ref17.apply(this, arguments);
    };
  }();

  var NPMFDao = /*#__PURE__*/function () {
    var _ref21 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req) {
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              return _context12.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref22 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(resolve) {
                  var response, districtId, year, nameOfUnitId, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee11$(_context11) {
                    while (1) {
                      switch (_context11.prev = _context11.next) {
                        case 0:
                          response = {};
                          districtId = "and  M.\"districtId\" = ".concat(req.body.districtId);
                          year = "and Year =  ".concat(req.body.year);
                          nameOfUnitId = "and  M.\"nameOfUnit\" = ".concat(req.body.nameOfUnitId);
                          start_month = "and  M.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  M.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.nameOfUnitId.length == 0) {
                            nameOfUnitId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select M.Id,M.\"nameOfUnit\" AS \"nameOfUnitId\",M.\"districtId\",D.\"districtName\", \n            MS1.\"categoryOptionName\" as \"Action\",V.\"nameOfControlUnit\", MS1.*\n     from public.\"mfPositiveLineLists\" M\n     LEFT JOIN (select * from public.\"vMFPositiveLineListSurveys\" V1 where  V1.\"categoryOptionCode\"='NPMF') \n     MS1 ON MS1.\"mfPositiveLineListId\"=M.id \n     LEFT JOIN public.districts D on D.id = M.\"districtId\"\n     LEFT JOIN public.\"verticalControlUnits\" V ON V.id=M.\"nameOfUnit\"\n     where M.\"isActive\"=true\n     ".concat(districtId, " ").concat(year, "  ").concat(start_month, " ").concat(end_month, "\n").concat(nameOfUnitId, "\n\t")).then(function (_ref23) {
                            var _ref24 = (0, _slicedToArray2["default"])(_ref23, 2),
                                results = _ref24[0],
                                metadata = _ref24[1];

                            response.error = false;
                            response.data = results; //console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 12:
                        case "end":
                          return _context11.stop();
                      }
                    }
                  }, _callee11);
                }));

                return function (_x12) {
                  return _ref22.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }));

    return function NPMFDao(_x11) {
      return _ref21.apply(this, arguments);
    };
  }();

  var No_positive_DiseaseDao = /*#__PURE__*/function () {
    var _ref25 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req) {
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              return _context14.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref26 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(resolve) {
                  var response, districtId, year, nameOfUnitId, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee13$(_context13) {
                    while (1) {
                      switch (_context13.prev = _context13.next) {
                        case 0:
                          response = {};
                          districtId = "and  M.\"districtId\" = ".concat(req.body.districtId);
                          year = "and Year =  ".concat(req.body.year);
                          nameOfUnitId = "and  M.\"nameOfUnit\" = ".concat(req.body.nameOfUnitId);
                          start_month = "and  M.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  M.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.nameOfUnitId.length == 0) {
                            nameOfUnitId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select M.Id,M.\"nameOfUnit\" AS \"nameOfUnitId\",M.\"districtId\",D.\"districtName\", \n            'No.of +ve for Disease' as \"Action\", V.\"nameOfControlUnit\",\n         MS1.*\n     from public.\"mfPositiveLineLists\" M\n     LEFT JOIN public.\"vDiseasePositive\" MS1 ON MS1.\"mfPositiveLineListId\"=M.id \n     LEFT JOIN public.districts D on D.id = M.\"districtId\"\n     LEFT JOIN public.\"verticalControlUnits\" V ON V.id=M.\"nameOfUnit\"\n     where M.\"isActive\"=true\n     ".concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, "  ").concat(nameOfUnitId, "\n\t")).then(function (_ref27) {
                            var _ref28 = (0, _slicedToArray2["default"])(_ref27, 2),
                                results = _ref28[0],
                                metadata = _ref28[1];

                            response.error = false;
                            response.data = results; //console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 12:
                        case "end":
                          return _context13.stop();
                      }
                    }
                  }, _callee13);
                }));

                return function (_x14) {
                  return _ref26.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    }));

    return function No_positive_DiseaseDao(_x13) {
      return _ref25.apply(this, arguments);
    };
  }();

  var NPLFMFDao = /*#__PURE__*/function () {
    var _ref29 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req) {
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              return _context16.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref30 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(resolve) {
                  var response, districtId, year, nameOfUnitId, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee15$(_context15) {
                    while (1) {
                      switch (_context15.prev = _context15.next) {
                        case 0:
                          response = {};
                          districtId = "and  M.\"districtId\" = ".concat(req.body.districtId);
                          year = "and Year =  ".concat(req.body.year);
                          nameOfUnitId = "and  M.\"nameOfUnit\" = ".concat(req.body.nameOfUnitId);
                          start_month = "and  M.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  M.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.nameOfUnitId.length == 0) {
                            nameOfUnitId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\nselect M.Id,M.\"nameOfUnit\" AS \"nameOfUnitId\",M.\"districtId\",D.\"districtName\", \n   \tMS1.\"categoryOptionName\" as \"Action\", V.\"nameOfControlUnit\",MS1.*\nfrom public.\"mfPositiveLineLists\" M\nLEFT JOIN (select * from public.\"vMFPositiveLineListSurveys\" V1 where  V1.\"categoryOptionCode\"='NPLFMF') \nMS1 ON MS1.\"mfPositiveLineListId\"=M.id \nLEFT JOIN public.districts D on D.id = M.\"districtId\"\nLEFT JOIN public.\"verticalControlUnits\" V ON V.id=M.\"nameOfUnit\"\nwhere M.\"isActive\"=true\n".concat(districtId, " ").concat(year, "   ").concat(start_month, " ").concat(end_month, " ").concat(nameOfUnitId, "\n\t")).then(function (_ref31) {
                            var _ref32 = (0, _slicedToArray2["default"])(_ref31, 2),
                                results = _ref32[0],
                                metadata = _ref32[1];

                            response.error = false;
                            response.data = results; //console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 12:
                        case "end":
                          return _context15.stop();
                      }
                    }
                  }, _callee15);
                }));

                return function (_x16) {
                  return _ref30.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    }));

    return function NPLFMFDao(_x15) {
      return _ref29.apply(this, arguments);
    };
  }();

  var Total_MF_RateDao = /*#__PURE__*/function () {
    var _ref33 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(req) {
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              return _context18.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref34 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(resolve) {
                  var response, districtId, year, nameOfUnitId, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee17$(_context17) {
                    while (1) {
                      switch (_context17.prev = _context17.next) {
                        case 0:
                          response = {};
                          districtId = "and  M.\"districtId\" = ".concat(req.body.districtId);
                          year = "and Year =  ".concat(req.body.year);
                          nameOfUnitId = "and  M.\"nameOfUnit\" = ".concat(req.body.nameOfUnitId);
                          start_month = "and  M.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  M.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.nameOfUnitId.length == 0) {
                            nameOfUnitId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select M.Id,M.\"nameOfUnit\" AS \"nameOfUnitId\",M.\"districtId\",D.\"districtName\", \n            'Total MF Rate' as \"Action\", V.\"nameOfControlUnit\",\n         MS1.*\n     from public.\"mfPositiveLineLists\" M\n     LEFT JOIN public.\"vMFPositiveLineListSurveysMFRate\" MS1 ON MS1.\"mfPositiveLineListId\"=M.id \n     LEFT JOIN public.districts D on D.id = M.\"districtId\"\n     LEFT JOIN public.\"verticalControlUnits\" V ON V.id=M.\"nameOfUnit\"\n     where M.\"isActive\"=true\n     ".concat(districtId, " ").concat(year, "  ").concat(start_month, " ").concat(end_month, "  ").concat(nameOfUnitId, "\n\t")).then(function (_ref35) {
                            var _ref36 = (0, _slicedToArray2["default"])(_ref35, 2),
                                results = _ref36[0],
                                metadata = _ref36[1];

                            response.error = false;
                            response.data = results; //console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 12:
                        case "end":
                          return _context17.stop();
                      }
                    }
                  }, _callee17);
                }));

                return function (_x18) {
                  return _ref34.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    }));

    return function Total_MF_RateDao(_x17) {
      return _ref33.apply(this, arguments);
    };
  }();

  var Total_Disease_RateDao = /*#__PURE__*/function () {
    var _ref37 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20(req) {
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              return _context20.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref38 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(resolve) {
                  var response, districtId, year, nameOfUnitId, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee19$(_context19) {
                    while (1) {
                      switch (_context19.prev = _context19.next) {
                        case 0:
                          response = {};
                          districtId = "and  M.\"districtId\" = ".concat(req.body.districtId);
                          year = "and Year =  ".concat(req.body.year);
                          nameOfUnitId = "and  M.\"nameOfUnit\" = ".concat(req.body.nameOfUnitId);
                          start_month = "and  M.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  M.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.nameOfUnitId.length == 0) {
                            nameOfUnitId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select M.Id,M.\"nameOfUnit\" AS \"nameOfUnitId\",M.\"districtId\",D.\"districtName\", \n            'Total Disease Rate' as \"Action\", V.\"nameOfControlUnit\",\n         MS1.*\n     from public.\"mfPositiveLineLists\" M\n     LEFT JOIN public.\"vDiseasePositiveRate\" MS1 ON MS1.\"mfPositiveLineListId\"=M.id \n     LEFT JOIN public.districts D on D.id = M.\"districtId\"\n     LEFT JOIN public.\"verticalControlUnits\" V ON V.id=M.\"nameOfUnit\"\n     where M.\"isActive\"=true\n     ".concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(nameOfUnitId, "\n\t")).then(function (_ref39) {
                            var _ref40 = (0, _slicedToArray2["default"])(_ref39, 2),
                                results = _ref40[0],
                                metadata = _ref40[1];

                            response.error = false;
                            response.data = results; //console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 12:
                        case "end":
                          return _context19.stop();
                      }
                    }
                  }, _callee19);
                }));

                return function (_x20) {
                  return _ref38.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20);
    }));

    return function Total_Disease_RateDao(_x19) {
      return _ref37.apply(this, arguments);
    };
  }();

  var get_FSUAnalysis5ListDao = /*#__PURE__*/function () {
    var _ref41 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22(req) {
      return _regenerator["default"].wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              return _context22.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref42 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21(resolve) {
                  var response, districtId, year, facilityId, nameOfUnitId, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee21$(_context21) {
                    while (1) {
                      switch (_context21.prev = _context21.next) {
                        case 0:
                          response = {};
                          districtId = "and  M.\"districtId\" = ".concat(req.body.districtId);
                          year = "and Year =  ".concat(req.body.year);
                          facilityId = "and  M.\"facilityId\" = ".concat(req.body.facilityId);
                          nameOfUnitId = "and  M.\"nameOfUnit\" = ".concat(req.body.nameOfUnitId);
                          start_month = "and  M.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  M.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.facilityId.length == 0) {
                            facilityId = "";
                          }

                          if (req.body.nameOfUnitId.length == 0) {
                            nameOfUnitId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n           \nselect M.Id,M.\"nameOfUnit\" AS \"nameOfUnitId\", VC.\"nameOfControlUnit\", M.\"facilityId\",F.\"facilityName\",\nM.\"villageId\",V.\"villageName\",M.\"districtId\",D.\"districtName\",M.\"talukaId\",T.\"talukaName\",M.\"subCenterId\",\nS.\"subCenterName\",date_part('Year',M.\"createdAt\") AS \"Year\", date_part('month',M.\"createdAt\") AS \"Month\",\nMP.\"patientName\",MP.\"ageYears\",MP.\"ageMonths\",U.\"categoryOptionName\" As \"gender\",MP.\"patientPhoneNo\",\nMP.\"bsNumber\",MP.\"mfCount\",M.\"bsCollectionAntigenTest\" AS \"typeOfSurveyId\",U1.\"categoryOptionName\" AS \"typeOfSurvey\" \nfrom public.\"mfPositiveLineLists\" M\nLEFT JOIN public.\"mfPositiveLineListPatients\" MP on MP.\"mfPositiveLineListId\"=M.id\nLEFT JOIN public.facilities F on F.id=M.\"facilityId\"\nLEFT JOIN public.villages  V on V.id=M.\"villageId\"\nLEFT JOIN public.districts D on D.id = M.\"districtId\"\nLEFT JOIN public.talukas T on T.id = M.\"talukaId\"\nLEFT JOIN public.\"subCenters\" S on S.id = M.\"subCenterId\"\nLEFT JOIN public.\"verticalControlUnits\" VC on VC.id = M.\"nameOfUnit\"\nLEFT JOIN public.\"udCategoryOptions\" U ON M.id=MP.gender\nLEFT JOIN public.\"udCategoryOptions\" U1 ON U1.id=M.\"bsCollectionAntigenTest\"\n           where M.\"isActive\"=true\n      ".concat(districtId, " ").concat(year, "  ").concat(start_month, " ").concat(end_month, " ").concat(facilityId, " ").concat(nameOfUnitId, "\n\t")).then(function (_ref43) {
                            var _ref44 = (0, _slicedToArray2["default"])(_ref43, 2),
                                results = _ref44[0],
                                metadata = _ref44[1];

                            response.error = false;
                            response.data = results; //console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 14:
                        case "end":
                          return _context21.stop();
                      }
                    }
                  }, _callee21);
                }));

                return function (_x22) {
                  return _ref42.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22);
    }));

    return function get_FSUAnalysis5ListDao(_x21) {
      return _ref41.apply(this, arguments);
    };
  }();

  var fsuPercentageTargetCompletedDao = /*#__PURE__*/function () {
    var _ref45 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24(req) {
      return _regenerator["default"].wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              return _context24.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref46 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23(resolve) {
                  var response, districtId, year, facilityId, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee23$(_context23) {
                    while (1) {
                      switch (_context23.prev = _context23.next) {
                        case 0:
                          response = {};
                          districtId = "and  F.\"districtId\" = ".concat(req.body.districtId);
                          year = "and Year =  ".concat(req.body.year);
                          facilityId = "and  F.\"facilityId\" = ".concat(req.body.facilityId);
                          start_month = "and  F.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  F.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.facilityId.length == 0) {
                            facilityId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          // (CASE MS3."NoOfBSExamined" WHEN 0 Then NULL ELSE MS3."NoOfBSExamined" END)) * 100) 


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          // (CASE MS3."NoOfBSExamined" WHEN 0 Then NULL ELSE MS3."NoOfBSExamined" END)) * 100) 
                          _sequelize["default"].sequelize.query("\n            select F.year,F.month,F.\"districtId\",F.\"facilityId\",D.\"districtName\",F1.\"facilityName\",\n            F.\"nameOfFilariaSurveyUnit\" AS \"nameOfUnitId\",VC.\"nameOfControlUnit\" AS \"nameOfUnit\",\n            F.\"noOfVillagesOrTowns\",FS.\"namesOfVillagesOrTowns\",FS.\"targetedPopulation\",FS.\"surveyedPopulation\",\n            FS.\"noOfBSCollected\",FS.\"noOfBSExamined\",FS.\"noOfMFPositiveCases\",\n            ((FS.\"surveyedPopulation\"/(CASE FS.\"targetedPopulation\"  WHEN 0 Then NULL ELSE\n                FS.\"targetedPopulation\" END))  *100 ) As \"percentageOfTarget\"\n            from public.\"fsuTargetAchivements\" F\n            left join public.\"fsuTargetAchievementsSurveys\" FS ON FS.\"fsuTargetAchievementId\"=F.id\n            left join public.districts D on D.id =  F.\"districtId\"\n            left join public.facilities F1 on F1.id = F.\"facilityId\"\n            left join public.\"verticalControlUnits\" VC on VC.id = F.\"nameOfFilariaSurveyUnit\"            \n            where F.\"isActive\"=true\n".concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, "\n").concat(facilityId, " \n\t")).then(function (_ref47) {
                            var _ref48 = (0, _slicedToArray2["default"])(_ref47, 2),
                                results = _ref48[0],
                                metadata = _ref48[1];

                            response.error = false;
                            response.data = results; //console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 12:
                        case "end":
                          return _context23.stop();
                      }
                    }
                  }, _callee23);
                }));

                return function (_x24) {
                  return _ref46.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context24.stop();
          }
        }
      }, _callee24);
    }));

    return function fsuPercentageTargetCompletedDao(_x23) {
      return _ref45.apply(this, arguments);
    };
  }();

  return {
    get_FSUAnalysis1Dao: get_FSUAnalysis1Dao,
    get_FSUAnalysis2ListDao: get_FSUAnalysis2ListDao,
    get_FSUAnalysis3ListDao: get_FSUAnalysis3ListDao,
    NPSDao: NPSDao,
    NBSEDao: NBSEDao,
    NPMFDao: NPMFDao,
    NPLFMFDao: NPLFMFDao,
    get_FSUAnalysis5ListDao: get_FSUAnalysis5ListDao,
    No_positive_DiseaseDao: No_positive_DiseaseDao,
    Total_MF_RateDao: Total_MF_RateDao,
    Total_Disease_RateDao: Total_Disease_RateDao,
    fsuPercentageTargetCompletedDao: fsuPercentageTargetCompletedDao
  };
};

var _default = FSUReportDao();

exports["default"] = _default;
//# sourceMappingURL=FSURepotDao.js.map
