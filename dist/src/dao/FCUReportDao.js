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

var FCUReportDao = function FCUReportDao() {
  var get_FCUAnalysis1Dao = /*#__PURE__*/function () {
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
                          _sequelize["default"].sequelize.query("\n          select      M.\"nameOfUnit\" AS \"nameOfUnitId\", VC.\"nameOfControlUnit\" AS \"nameOfUnit\",\n            M.\"nameOfFilariaFieldUnit\" as \"nameOfFilariaFieldUnitId\",\n\t\t\tVCF.\"fieldUnitName\" as \"nameOfFilariaFieldUnit\",\n            M.\"districtId\",D.\"districtName\",M.\"year\" AS \"Year\", M.\"month\" AS \"Month\",\n            SUM(M.\"populationCoveredByUnit\") \"populationCoveredByUnit\",\n\t\t\tSUM(MS2.\"NoOfBSCollected\") \"NoOfBSCollected\", 0 As \"PrevBackLog\",\n\t\t\tSUM(MS3.\"NoOfBSExamined\") \"NoOfBSExamined\" , SUM(MS4.\"NoOfMFPostve\") \"NoOfMFPostve\",\n            ((SUM(MS4.\"NoOfMFPostve\")/(CASE SUM(MS2.\"NoOfBSCollected\")\n                WHEN 0 Then NULL ELSE SUM(MS2.\"NoOfBSCollected\") END))*100) AS \"MFRate\",  \n\t\t\tSUM(MS5.\"NoOfTotPostve\"-MS4.\"NoOfMFPostve\") AS \"NoOfDesPostve\",\n            SUM(M.\"populationCoveredByUnit\") \"populationCoveredByUnit\",\n\t\t\tSUM(MS2.\"NoOfBSCollected\") \"NoOfBSCollected\",0 As \"PrevBackLog\",\n\t\t\tSUM(MS3.\"NoOfBSExamined\") \"NoOfBSExamined\",SUM(MS4.\"NoOfMFPostve\") \"NoOfMFPostve\",\n            ((SUM(MS5.\"NoOfTotPostve\"-MS4.\"NoOfMFPostve\")/(CASE SUM(MS2.\"NoOfBSCollected\")\n                WHEN 0 Then NULL ELSE SUM(MS2.\"NoOfBSCollected\") END))*100) AS \"DesRate\",\n            0 as \"PrgBSExam\",0 as \"PrgMFPostve\",0 as \"PrgMFRate\"\n            from public.\"mfPositiveLineLists\" M\n            LEFT JOIN public.\"mfPositiveLineListPatients\" MP on MP.\"mfPositiveLineListId\"=M.id\n            LEFT JOIN (\n                select  MS.\"dateOfAction\" , MS.\"mfPositiveLineListId\",\n                \"noOfPersonsMale0to4\"+\"noOfPersonsMale5to14\"+\"noOfPersonsMale15to39\"+\"noOfPersonsMale40Plus\"+\n                \"noOfPersonsFemale0to4\"+\"noOfPersonsFemale5to14\"+\"noOfPersonsFemale15to39\"+\"noOfPersonsFemale40Plus\"+\n                \"noOfPersonsTG0to4\"+\"noOfPersonsTG5to14\"+\"noOfPersonsTG15to39\"+\"noOfPersonsTG40Plus\"\n                as \"NoOfBSCollected\" from public.\"mfPositiveLineListSurveys\" MS\n            where  MS.\"detailsOfSurveyId\"=(select id from public.\"udCategoryOptions\" where \"categoryCode\"=1013 and \"categoryOptionCode\"='NPC')\n            )\n            MS2 ON MS2.\"mfPositiveLineListId\"=M.id\n            LEFT JOIN (\n                select  MS.\"dateOfAction\" , MS.\"mfPositiveLineListId\",\n                \"noOfPersonsMale0to4\"+\"noOfPersonsMale5to14\"+\"noOfPersonsMale15to39\"+\"noOfPersonsMale40Plus\" +\n                \"noOfPersonsFemale0to4\"+\"noOfPersonsFemale5to14\"+\"noOfPersonsFemale15to39\"+\"noOfPersonsFemale40Plus\" +\n                \"noOfPersonsTG0to4\"+\"noOfPersonsTG5to14\"+\"noOfPersonsTG15to39\"+\"noOfPersonsTG40Plus\" As \"NoOfBSExamined\"\n                 from public.\"mfPositiveLineListSurveys\" MS\n            where  MS.\"detailsOfSurveyId\"=(select id from public.\"udCategoryOptions\" where \"categoryCode\"=1013 and \"categoryOptionCode\"='NBSE')\n            )\n            MS3 ON MS3.\"mfPositiveLineListId\"=M.id\n            LEFT JOIN (\n                select  MS.\"dateOfAction\" , MS.\"mfPositiveLineListId\",\n                \"noOfPersonsMale0to4\"+\"noOfPersonsMale5to14\"+\"noOfPersonsMale15to39\"+\"noOfPersonsMale40Plus\" +\n                \"noOfPersonsFemale0to4\"+\"noOfPersonsFemale5to14\"+\"noOfPersonsFemale15to39\"+\"noOfPersonsFemale40Plus\" +\n                \"noOfPersonsTG0to4\"+\"noOfPersonsTG5to14\"+\"noOfPersonsTG15to39\"+\"noOfPersonsTG40Plus\" As \"NoOfMFPostve\"\n                 from public.\"mfPositiveLineListSurveys\" MS\n            where  MS.\"detailsOfSurveyId\"=(select id from public.\"udCategoryOptions\" where \"categoryCode\"=1013 and \"categoryOptionCode\"='NPMF')\n            )\n            MS4 ON MS4.\"mfPositiveLineListId\"=M.id\n            LEFT JOIN (\n                select  MS.\"dateOfAction\" , MS.\"mfPositiveLineListId\",\n                \"noOfPersonsMale0to4\"+\"noOfPersonsMale5to14\"+\"noOfPersonsMale15to39\"+\"noOfPersonsMale40Plus\"  +\n                \"noOfPersonsFemale0to4\"+\"noOfPersonsFemale5to14\"+\"noOfPersonsFemale15to39\"+\"noOfPersonsFemale40Plus\" +\n                \"noOfPersonsTG0to4\"+\"noOfPersonsTG5to14\"+\"noOfPersonsTG15to39\"+\"noOfPersonsTG40Plus\" As \"NoOfTotPostve\"\n                 from public.\"mfPositiveLineListSurveys\" MS\n            where  MS.\"detailsOfSurveyId\"=(select id from public.\"udCategoryOptions\" where \"categoryCode\"=1013 and \"categoryOptionCode\"='NPLFMF')\n            )\n            MS5 ON MS5.\"mfPositiveLineListId\"=M.id\n            LEFT JOIN public.facilities F on F.id=M.\"facilityId\"\n            LEFT JOIN public.villages  V on V.id=M.\"villageId\"\n            LEFT JOIN public.districts D on D.id = M.\"districtId\"\n            LEFT JOIN public.talukas T on T.id = M.\"talukaId\"\n            LEFT JOIN public.\"subCenters\" S on S.id = M.\"subCenterId\"\n            LEFT JOIN public.\"verticalControlUnits\" VC on VC.id = M.\"nameOfUnit\"\n            LEFT JOIN public.\"verticalControlFieldUnits\" VCF on VCF.id = M.\"nameOfFilariaFieldUnit\"\n            LEFT JOIN public.\"udCategoryOptions\" U ON M.id=MP.gender\n            LEFT JOIN public.\"udCategoryOptions\" U1 ON M.id=M.\"targetForCollectionOfNBS\"\n        where M.\"isActive\"=true  ".concat(start_month, " ").concat(end_month, " ").concat(nameOfUnitId, " ").concat(districtId, " ").concat(year, " ").concat(facilityId, " \n  group by  M.\"nameOfUnit\", VC.\"nameOfControlUnit\",\n            M.\"nameOfFilariaFieldUnit\",VCF.\"fieldUnitName\", \n            M.\"districtId\",D.\"districtName\",M.\"year\", M.\"month\"\n\t")).then(function (_ref3) {
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

    return function get_FCUAnalysis1Dao(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var get_FCUAnalysis2Dao = /*#__PURE__*/function () {
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
                          _sequelize["default"].sequelize.query("\n           \tselect M.\"nameOfUnit\" AS \"nameOfUnitId\", VC.\"nameOfControlUnit\" AS \"nameOfUnit\",\n            M.\"nameOfFilariaFieldUnit\" as \"nameOfFilariaFieldUnitId\",VCF.\"fieldUnitName\" as \"nameOfFilariaFieldUnit\",\n            M.\"districtId\",D.\"districtName\",M.\"year\" AS \"Year\", M.\"month\" AS \"Month\",\n            Sum(M.\"targetForCollectionOfNBS\") AS \"targetForCollectionOfNBS\",\n\t\t\tSum(MS2.\"noOfPersons\") AS \"NoOfBSCollected\",\n\t\t\tSum(MS3.\"noOfPersons\") AS \"NoOfBSExamined\",\n            Sum(M.\"targetForCollectionOfNBS\") AS \"targetForCollectionOfNBS\",\n\t\t\tSum(MS2.\"noOfPersons\") AS \"noOfPersons\",\n            ((Sum(M.\"targetForCollectionOfNBS\")/(CASE Sum(MS2.\"noOfPersons\")\n                WHEN 0 Then NULL ELSE Sum(MS2.\"noOfPersons\") END))*100) AS \"AchivedOfBSCollection\",\n            ((Sum(MS4.\"noOfPersons\")/(CASE Sum(MS2.\"noOfPersons\")\n                WHEN 0 Then NULL ELSE Sum(MS2.\"noOfPersons\") END))*100) AS \"MFRate\",\n            ((Sum(MS5.\"noOfPersons\"-MS4.\"noOfPersons\")/(CASE Sum(MS2.\"noOfPersons\")\n                WHEN 0 Then NULL ELSE Sum(MS2.\"noOfPersons\") END))*100) AS \"DesRate\",\n            ((Sum(MS5.\"noOfPersons\")/(CASE Sum(MS2.\"noOfPersons\")\n                WHEN 0 Then NULL ELSE Sum(MS2.\"noOfPersons\") END))*100) AS \"TotRate\",\n            Sum(MP1.\"NoTreatedMF\") AS \"NoTreatedMF\", 0 AS \"NoTreatedDes\", SUM(MP1.\"NoTreatedMF\") AS \"NoTreatedTot\",\n            0 AS \"percentOfCasesTreated\",0 AS \"populationCovered\",0 AS \"percentOfPopulationCovered\",\n            Sum(MP2.\"NotTreatedP\") \"NotTreatedP\",Sum(MP3.\"NotTreatedM\") \"NotTreatedM\",\n\t\t\tSum(MP4.\"NotTreatedI\") \"NotTreatedI\",Sum(MP5.\"NotTreatedD\") \"NotTreatedD\",\t\t\t\n\t\t\tSum(MP6.\"NotTreatedAP\") \"NotTreatedAP\",Sum(MP7.\"NotTreatedO\") \"NotTreatedO\",\n\t\t\tSum(MP8.\"NotTreatedTot\") \"NotTreatedTot\"\n\t\t\tfrom public.\"mfPositiveLineLists\" M\n            LEFT JOIN public.\"mfPositiveLineListPatients\" MP on MP.\"mfPositiveLineListId\"=M.id\n            LEFT JOIN (select * from public.\"vMFPositiveLineListSurveys\" V1 where  V1.\"categoryOptionCode\"='NPC')\n            MS2 ON MS2.\"mfPositiveLineListId\"=M.id\n            LEFT JOIN (select * from public.\"vMFPositiveLineListSurveys\" V1 where  V1.\"categoryOptionCode\"='NBSE')\n            MS3 ON MS3.\"mfPositiveLineListId\"=M.id\n            LEFT JOIN (select * from public.\"vMFPositiveLineListSurveys\" V1 where  V1.\"categoryOptionCode\"='NPMF')\n            MS4 ON MS4.\"mfPositiveLineListId\"=M.id\n            LEFT JOIN (select * from public.\"vMFPositiveLineListSurveys\" V1 where  V1.\"categoryOptionCode\"='NPLFMF')\n            MS5 ON MS5.\"mfPositiveLineListId\"=M.id\n            LEFT JOIN (select MP.\"mfPositiveLineListId\",Count(id) AS \"NoTreatedMF\" from public.\"mfPositiveLineListPatients\" MP\n                       where MP.\"isTreatmentGive\"=true group by MP.\"mfPositiveLineListId\" )\n                       MP1 ON MP1.\"mfPositiveLineListId\"=M.id\n            LEFT JOIN (select MP.\"mfPositiveLineListId\",Count(id) AS \"NotTreatedP\" from public.\"mfPositiveLineListPatients\" MP\n                       where MP.\"isTreatmentGive\"=false and MP.\"reasonsForNonTreating\"=(select id from public.\"udCategoryOptions\"\n                       where \"categoryCode\"=1015 and \"categoryOptionCode\"='P') group by MP.\"mfPositiveLineListId\" )\n            MP2 ON MP2.\"mfPositiveLineListId\"=M.id\n            LEFT JOIN (select MP.\"mfPositiveLineListId\",Count(id) AS \"NotTreatedM\" from public.\"mfPositiveLineListPatients\" MP\n                       where MP.\"isTreatmentGive\"=false and MP.\"reasonsForNonTreating\"=(select id from public.\"udCategoryOptions\"\n                       where \"categoryCode\"=1015 and \"categoryOptionCode\"='M') group by MP.\"mfPositiveLineListId\" )\n            MP3 ON MP3.\"mfPositiveLineListId\"=M.id\n            LEFT JOIN (select MP.\"mfPositiveLineListId\",Count(id) AS \"NotTreatedI\" from public.\"mfPositiveLineListPatients\" MP\n                       where MP.\"isTreatmentGive\"=false and MP.\"reasonsForNonTreating\"=(select id from public.\"udCategoryOptions\"\n                       where \"categoryCode\"=1015 and \"categoryOptionCode\"='I') group by MP.\"mfPositiveLineListId\" )\n            MP4 ON MP4.\"mfPositiveLineListId\"=M.id\n            LEFT JOIN (select MP.\"mfPositiveLineListId\",Count(id) AS \"NotTreatedD\" from public.\"mfPositiveLineListPatients\" MP\n                       where MP.\"isTreatmentGive\"=false and MP.\"reasonsForNonTreating\"=(select id from public.\"udCategoryOptions\"\n                       where \"categoryCode\"=1015 and \"categoryOptionCode\"='D') group by MP.\"mfPositiveLineListId\" )\n            MP5 ON MP5.\"mfPositiveLineListId\"=M.id\n            LEFT JOIN (select MP.\"mfPositiveLineListId\",Count(id) AS \"NotTreatedAP\" from public.\"mfPositiveLineListPatients\" MP\n                       where MP.\"isTreatmentGive\"=false and MP.\"reasonsForNonTreating\"=(select id from public.\"udCategoryOptions\"\n                       where \"categoryCode\"=1015 and \"categoryOptionCode\"='AP') group by MP.\"mfPositiveLineListId\" )\n            MP6 ON MP6.\"mfPositiveLineListId\"=M.id\n            LEFT JOIN (select MP.\"mfPositiveLineListId\",Count(id) AS \"NotTreatedO\" from public.\"mfPositiveLineListPatients\" MP\n                       where MP.\"isTreatmentGive\"=false and MP.\"reasonsForNonTreating\"=(select id from public.\"udCategoryOptions\"\n                       where \"categoryCode\"=1015 and \"categoryOptionCode\"='OS') group by MP.\"mfPositiveLineListId\" )\n            MP7 ON MP7.\"mfPositiveLineListId\"=M.id\n            LEFT JOIN (select MP.\"mfPositiveLineListId\",Count(id) AS \"NotTreatedTot\" from public.\"mfPositiveLineListPatients\" MP\n                       where MP.\"isTreatmentGive\"=false and MP.\"reasonsForNonTreating\" is not null group by MP.\"mfPositiveLineListId\" )\n            MP8 ON MP8.\"mfPositiveLineListId\"=M.id\n            LEFT JOIN public.facilities F on F.id=M.\"facilityId\"\n            LEFT JOIN public.villages  V on V.id=M.\"villageId\"\n            LEFT JOIN public.districts D on D.id = M.\"districtId\"\n            LEFT JOIN public.talukas T on T.id = M.\"talukaId\"\n            LEFT JOIN public.\"subCenters\" S on S.id = M.\"subCenterId\"\n            LEFT JOIN public.\"verticalControlUnits\" VC on VC.id = M.\"nameOfUnit\"\n            LEFT JOIN public.\"verticalControlFieldUnits\" VCF on VCF.id = M.\"nameOfFilariaFieldUnit\"\n            LEFT JOIN public.\"udCategoryOptions\" U ON M.id=MP.gender\n            LEFT JOIN public.\"udCategoryOptions\" U1 ON M.id=M.\"targetForCollectionOfNBS\"\n        where  M.\"isActive\"=true\n ".concat(start_month, " ").concat(end_month, "  ").concat(districtId, " ").concat(year, "  ").concat(facilityId, " ").concat(nameOfUnitId, " group by M.\"month\", M.\"year\",M.\"nameOfUnit\", VC.\"nameOfControlUnit\",\n   M.\"nameOfFilariaFieldUnit\", VCF.\"fieldUnitName\",M.\"districtId\",D.\"districtName\"\n\n\t")).then(function (_ref7) {
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

    return function get_FCUAnalysis2Dao(_x3) {
      return _ref5.apply(this, arguments);
    };
  }();

  var UnitLevelDao = /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req) {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(resolve) {
                  var response, districtId, year, month, nameOfUnitId;
                  return _regenerator["default"].wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          response = {};
                          districtId = "and  M.\"districtId\" = ".concat(req.body.districtId);
                          year = "and M.\"year\" =  ".concat(req.body.year);
                          month = "and M.\"month\" = ".concat(req.body.month);
                          nameOfUnitId = "and  M.\"nameOfUnit\" = ".concat(req.body.nameOfUnitId);

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.month.length == 0) {
                            month = "";
                          }

                          if (req.body.nameOfUnitId.length == 0) {
                            nameOfUnitId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n       select M.\"nameOfUnit\" AS \"nameOfUnitId\", VC.\"nameOfControlUnit\" AS \"nameOfUnit\",\nM.\"nameOfFilariaFieldUnit\" as \"nameOfFilariaFieldUnitId\",VCF.\"fieldUnitName\" as \"nameOfFilariaFieldUnit\",\nM.\"districtId\",D.\"districtName\",M.\"year\", M.\"month\",\nsum(M.\"targetForCollectionOfNBS\") \"targetForCollectionOfNBS\",\nsum(MS2.\"noOfPersons\") AS \"NoOfPersonsExam\",\nsum( M.\"targetForCollectionOfNBS\")  AS \"targetForCollectionOfNBS\",\nsum(MS2.\"noOfPersons\") as \"noOfPersons\",\n((sum(M.\"targetForCollectionOfNBS\")/(CASE sum(MS2.\"noOfPersons\")\n        WHEN 0 Then NULL ELSE sum(MS2.\"noOfPersons\") END))*100) AS \"AchivedOfBSCollection\",\nsum(MS3.\"noOfPersons\") AS \"NoOfBSExamined\",\nsum(MS4.\"noOfPersons\") AS \"NoOfMF\",\nsum(MS5.\"noOfPersons\") AS \"NoOfBoth\",\nsum(MS5.\"noOfPersons\"-MS4.\"noOfPersons\") AS \"NoOfDes\",\nsum(MS4.\"noOfPersons\"+MS5.\"noOfPersons\") AS \"NoOfTot\",\n((sum(MS4.\"noOfPersons\")/(CASE sum(MS2.\"noOfPersons\")\n        WHEN 0 Then NULL ELSE sum(MS2.\"noOfPersons\") END))*100) AS \"MFRate\",\n((sum(MS5.\"noOfPersons\"-MS4.\"noOfPersons\")/(CASE sum(MS2.\"noOfPersons\")\n        WHEN 0 Then NULL ELSE sum(MS2.\"noOfPersons\") END))*100) AS \"DesRate\",\nsum(0) AS \"EndRate\", sum(MP1.\"NoTreatedMF\") as \"NoTreatedMF\", \nsum(0) AS \"NoTreatedDes\", sum(MP1.\"NoTreatedMF\" + 0 ) AS \"NoTreatedTot\",\nsum(MP2.\"NotTreatedP\") AS \"NotTreatedP\",sum(MP3.\"NotTreatedM\") AS \"NotTreatedM\",\nsum(MP4.\"NotTreatedI\") AS \"NotTreatedI\",sum(MP5.\"NotTreatedD\") AS \"NotTreatedD\",\nsum(MP6.\"NotTreatedAP\") AS \"NotTreatedAP\",sum(MP7.\"NotTreatedO\") AS \"NotTreatedO\",\nsum(MP8.\"NotTreatedTot\") AS \"NotTreatedTot\"\nfrom public.\"mfPositiveLineLists\" M\nLEFT JOIN public.\"mfPositiveLineListPatients\" MP on MP.\"mfPositiveLineListId\"=M.id\nLEFT JOIN (select * from public.\"vMFPositiveLineListSurveys\" V1 where  V1.\"categoryOptionCode\"='NPC')\nMS2 ON MS2.\"mfPositiveLineListId\"=M.id\nLEFT JOIN (select * from public.\"vMFPositiveLineListSurveys\" V1 where  V1.\"categoryOptionCode\"='NBSE')\nMS3 ON MS3.\"mfPositiveLineListId\"=M.id\nLEFT JOIN (select * from public.\"vMFPositiveLineListSurveys\" V1 where  V1.\"categoryOptionCode\"='NPMF')\nMS4 ON MS4.\"mfPositiveLineListId\"=M.id\nLEFT JOIN (select * from public.\"vMFPositiveLineListSurveys\" V1 where  V1.\"categoryOptionCode\"='NPLFMF')\nMS5 ON MS5.\"mfPositiveLineListId\"=M.id\nLEFT JOIN (select MP.\"mfPositiveLineListId\",Count(id) AS \"NoTreatedMF\" from public.\"mfPositiveLineListPatients\" MP\n                   where MP.\"isTreatmentGive\"=true group by MP.\"mfPositiveLineListId\" )\n                   MP1 ON MP1.\"mfPositiveLineListId\"=M.id\nLEFT JOIN (select MP.\"mfPositiveLineListId\",Count(id) AS \"NotTreatedP\" from public.\"mfPositiveLineListPatients\" MP\n                   where MP.\"isTreatmentGive\"=false and MP.\"reasonsForNonTreating\"=(select id from public.\"udCategoryOptions\"\n                   where \"categoryCode\"=1015 and \"categoryOptionCode\"='P') group by MP.\"mfPositiveLineListId\" )\nMP2 ON MP2.\"mfPositiveLineListId\"=M.id\nLEFT JOIN (select MP.\"mfPositiveLineListId\",Count(id) AS \"NotTreatedM\" from public.\"mfPositiveLineListPatients\" MP\n                   where MP.\"isTreatmentGive\"=false and MP.\"reasonsForNonTreating\"=(select id from public.\"udCategoryOptions\"\n                   where \"categoryCode\"=1015 and \"categoryOptionCode\"='M') group by MP.\"mfPositiveLineListId\" )\nMP3 ON MP3.\"mfPositiveLineListId\"=M.id\nLEFT JOIN (select MP.\"mfPositiveLineListId\",Count(id) AS \"NotTreatedI\" from public.\"mfPositiveLineListPatients\" MP\n                   where MP.\"isTreatmentGive\"=false and MP.\"reasonsForNonTreating\"=(select id from public.\"udCategoryOptions\"\n                   where \"categoryCode\"=1015 and \"categoryOptionCode\"='I') group by MP.\"mfPositiveLineListId\" )\nMP4 ON MP4.\"mfPositiveLineListId\"=M.id\nLEFT JOIN (select MP.\"mfPositiveLineListId\",Count(id) AS \"NotTreatedD\" from public.\"mfPositiveLineListPatients\" MP\n                   where MP.\"isTreatmentGive\"=false and MP.\"reasonsForNonTreating\"=(select id from public.\"udCategoryOptions\"\n                   where \"categoryCode\"=1015 and \"categoryOptionCode\"='D') group by MP.\"mfPositiveLineListId\" )\nMP5 ON MP5.\"mfPositiveLineListId\"=M.id\nLEFT JOIN (select MP.\"mfPositiveLineListId\",Count(id) AS \"NotTreatedAP\" from public.\"mfPositiveLineListPatients\" MP\n                   where MP.\"isTreatmentGive\"=false and MP.\"reasonsForNonTreating\"=(select id from public.\"udCategoryOptions\"\n                   where \"categoryCode\"=1015 and \"categoryOptionCode\"='AP') group by MP.\"mfPositiveLineListId\" )\nMP6 ON MP6.\"mfPositiveLineListId\"=M.id\nLEFT JOIN (select MP.\"mfPositiveLineListId\",Count(id) AS \"NotTreatedO\" from public.\"mfPositiveLineListPatients\" MP\n                   where MP.\"isTreatmentGive\"=false and MP.\"reasonsForNonTreating\"=(select id from public.\"udCategoryOptions\"\n                   where \"categoryCode\"=1015 and \"categoryOptionCode\"='OS') group by MP.\"mfPositiveLineListId\" )\nMP7 ON MP7.\"mfPositiveLineListId\"=M.id\nLEFT JOIN (select MP.\"mfPositiveLineListId\",Count(id) AS \"NotTreatedTot\" from public.\"mfPositiveLineListPatients\" MP\n                   where MP.\"isTreatmentGive\"=false and MP.\"reasonsForNonTreating\" is not null group by MP.\"mfPositiveLineListId\" )\nMP8 ON MP8.\"mfPositiveLineListId\"=M.id\nLEFT JOIN public.facilities F on F.id=M.\"facilityId\"\nLEFT JOIN public.villages  V on V.id=M.\"villageId\"\nLEFT JOIN public.districts D on D.id = M.\"districtId\"\nLEFT JOIN public.talukas T on T.id = M.\"talukaId\"\nLEFT JOIN public.\"subCenters\" S on S.id = M.\"subCenterId\"\nLEFT JOIN public.\"verticalControlUnits\" VC on VC.id = M.\"nameOfUnit\"\nLEFT JOIN public.\"verticalControlFieldUnits\" VCF on VCF.id = M.\"nameOfFilariaFieldUnit\"\nLEFT JOIN public.\"udCategoryOptions\" U ON M.id=MP.gender\nLEFT JOIN public.\"udCategoryOptions\" U1 ON M.id=M.\"targetForCollectionOfNBS\"\nwhere M.\"isActive\"=true and M.\"fixOrRandom\"=2\n".concat(districtId, " ").concat(year, "  ").concat(month, "  ").concat(nameOfUnitId, "\ngroup by M.\"nameOfUnit\",VC.\"nameOfControlUnit\" ,M.\"districtId\",D.\"districtName\",\nM.\"year\", M.\"month\",M.\"nameOfFilariaFieldUnit\",VCF.\"fieldUnitName\"\n\n\n\t")).then(function (_ref11) {
                            var _ref12 = (0, _slicedToArray2["default"])(_ref11, 2),
                                results = _ref12[0],
                                metadata = _ref12[1];

                            response.error = false;
                            response.data = results; // console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 10:
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

    return function UnitLevelDao(_x5) {
      return _ref9.apply(this, arguments);
    };
  }();

  var SubUnitLevelDao = /*#__PURE__*/function () {
    var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req) {
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(resolve) {
                  var response, districtId, year, month, nameOfUnitId, nameOfFilariaFieldUnit;
                  return _regenerator["default"].wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          response = {};
                          districtId = "and  M.\"districtId\" = ".concat(req.body.districtId);
                          year = "and M.\"year\" =  ".concat(req.body.year);
                          month = "and M.\"month\" = ".concat(req.body.month);
                          nameOfUnitId = "and  M.\"nameOfUnit\" = ".concat(req.body.nameOfUnitId);
                          nameOfFilariaFieldUnit = "and  M.\"nameOfFilariaFieldUnit\" = ".concat(req.body.nameOfFilariaFieldUnit);

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.month.length == 0) {
                            month = "";
                          }

                          if (req.body.nameOfUnitId.length == 0) {
                            nameOfUnitId = "";
                          }

                          if (req.body.nameOfFilariaFieldUnit.length == 0) {
                            nameOfFilariaFieldUnit = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n           select M.\"nameOfUnit\" AS \"nameOfUnitId\", VC.\"nameOfControlUnit\" AS \"nameOfUnit\",\nM.\"nameOfFilariaFieldUnit\" as \"nameOfFilariaFieldUnitId\",VCF.\"fieldUnitName\" as \"nameOfFilariaFieldUnit\",\nM.\"districtId\",D.\"districtName\",M.\"year\", M.\"month\",\nsum(M.\"targetForCollectionOfNBS\") \"targetForCollectionOfNBS\",sum(MS2.\"noOfPersons\") AS \"NoOfPersonsExam\",\nsum( M.\"targetForCollectionOfNBS\")  AS \"targetForCollectionOfNBS\",sum(MS2.\"noOfPersons\") as \"noOfPersons\", \n  sum((M.\"targetForCollectionOfNBS\"/(CASE MS2.\"noOfPersons\"\n\tWHEN 0 Then NULL ELSE MS2.\"noOfPersons\" END))*100) AS \"AchivedOfBSCollection\", \nsum(MS3.\"noOfPersons\") AS \"NoOfBSExamined\",\tsum(MS4.\"noOfPersons\") AS \"NoOfMF\", \nsum(MS5.\"noOfPersons\") AS \"NoOfBoth\",\nsum(MS5.\"noOfPersons\"-MS4.\"noOfPersons\") AS \"NoOfDes\",\nsum(MS4.\"noOfPersons\"+MS5.\"noOfPersons\") AS \"NoOfTot\",\nsum((MS4.\"noOfPersons\"/(CASE MS2.\"noOfPersons\" \n\tWHEN 0 Then NULL ELSE MS2.\"noOfPersons\" END))*100) AS \"MFRate\",\nsum(((MS5.\"noOfPersons\"-MS4.\"noOfPersons\")/(CASE MS2.\"noOfPersons\" \n\tWHEN 0 Then NULL ELSE MS2.\"noOfPersons\" END))*100) AS \"DesRate\",\nsum(0) AS \"EndRate\", sum(MP1.\"NoTreatedMF\") as \"NoTreatedMF\", sum(0) AS \"NoTreatedDes\", sum(MP1.\"NoTreatedMF\" + 0 ) AS \"NoTreatedTot\",\nsum(MP2.\"NotTreatedP\") AS \"NotTreatedP\",sum(MP3.\"NotTreatedM\") AS \"NotTreatedM\",\nsum(MP4.\"NotTreatedI\") AS \"NotTreatedI\",sum(MP5.\"NotTreatedD\") AS \"NotTreatedD\",\nsum(MP6.\"NotTreatedAP\") AS \"NotTreatedAP\",sum(MP7.\"NotTreatedO\") AS \"NotTreatedO\",\nsum(MP8.\"NotTreatedTot\") AS \"NotTreatedTot\"\nfrom public.\"mfPositiveLineLists\" M\nLEFT JOIN public.\"mfPositiveLineListPatients\" MP on MP.\"mfPositiveLineListId\"=M.id\nLEFT JOIN (select * from public.\"vMFPositiveLineListSurveys\" V1 where  V1.\"categoryOptionCode\"='NPC') \nMS2 ON MS2.\"mfPositiveLineListId\"=M.id \nLEFT JOIN (select * from public.\"vMFPositiveLineListSurveys\" V1 where  V1.\"categoryOptionCode\"='NBSE') \nMS3 ON MS3.\"mfPositiveLineListId\"=M.id \nLEFT JOIN (select * from public.\"vMFPositiveLineListSurveys\" V1 where  V1.\"categoryOptionCode\"='NPMF')\nMS4 ON MS4.\"mfPositiveLineListId\"=M.id \nLEFT JOIN (select * from public.\"vMFPositiveLineListSurveys\" V1 where  V1.\"categoryOptionCode\"='NPLFMF') \nMS5 ON MS5.\"mfPositiveLineListId\"=M.id \nLEFT JOIN (select MP.\"mfPositiveLineListId\",Count(id) AS \"NoTreatedMF\" from public.\"mfPositiveLineListPatients\" MP\n\t\t   where MP.\"isTreatmentGive\"=true group by MP.\"mfPositiveLineListId\" ) \n\t\t   MP1 ON MP1.\"mfPositiveLineListId\"=M.id \nLEFT JOIN (select MP.\"mfPositiveLineListId\",Count(id) AS \"NotTreatedP\" from public.\"mfPositiveLineListPatients\" MP\n\t\t   where MP.\"isTreatmentGive\"=false and MP.\"reasonsForNonTreating\"=(select id from public.\"udCategoryOptions\" \n\t\t   where \"categoryCode\"=1015 and \"categoryOptionCode\"='P') group by MP.\"mfPositiveLineListId\" ) \nMP2 ON MP2.\"mfPositiveLineListId\"=M.id \nLEFT JOIN (select MP.\"mfPositiveLineListId\",Count(id) AS \"NotTreatedM\" from public.\"mfPositiveLineListPatients\" MP\n\t\t   where MP.\"isTreatmentGive\"=false and MP.\"reasonsForNonTreating\"=(select id from public.\"udCategoryOptions\" \n\t\t   where \"categoryCode\"=1015 and \"categoryOptionCode\"='M') group by MP.\"mfPositiveLineListId\" ) \nMP3 ON MP3.\"mfPositiveLineListId\"=M.id \nLEFT JOIN (select MP.\"mfPositiveLineListId\",Count(id) AS \"NotTreatedI\" from public.\"mfPositiveLineListPatients\" MP\n\t\t   where MP.\"isTreatmentGive\"=false and MP.\"reasonsForNonTreating\"=(select id from public.\"udCategoryOptions\" \n\t\t   where \"categoryCode\"=1015 and \"categoryOptionCode\"='I') group by MP.\"mfPositiveLineListId\" ) \nMP4 ON MP4.\"mfPositiveLineListId\"=M.id \nLEFT JOIN (select MP.\"mfPositiveLineListId\",Count(id) AS \"NotTreatedD\" from public.\"mfPositiveLineListPatients\" MP\n\t\t   where MP.\"isTreatmentGive\"=false and MP.\"reasonsForNonTreating\"=(select id from public.\"udCategoryOptions\" \n\t\t   where \"categoryCode\"=1015 and \"categoryOptionCode\"='D') group by MP.\"mfPositiveLineListId\" ) \nMP5 ON MP5.\"mfPositiveLineListId\"=M.id \nLEFT JOIN (select MP.\"mfPositiveLineListId\",Count(id) AS \"NotTreatedAP\" from public.\"mfPositiveLineListPatients\" MP\n\t\t   where MP.\"isTreatmentGive\"=false and MP.\"reasonsForNonTreating\"=(select id from public.\"udCategoryOptions\" \n\t\t   where \"categoryCode\"=1015 and \"categoryOptionCode\"='AP') group by MP.\"mfPositiveLineListId\" ) \nMP6 ON MP6.\"mfPositiveLineListId\"=M.id \nLEFT JOIN (select MP.\"mfPositiveLineListId\",Count(id) AS \"NotTreatedO\" from public.\"mfPositiveLineListPatients\" MP\n\t\t   where MP.\"isTreatmentGive\"=false and MP.\"reasonsForNonTreating\"=(select id from public.\"udCategoryOptions\" \n\t\t   where \"categoryCode\"=1015 and \"categoryOptionCode\"='OS') group by MP.\"mfPositiveLineListId\" ) \nMP7 ON MP7.\"mfPositiveLineListId\"=M.id\nLEFT JOIN (select MP.\"mfPositiveLineListId\",Count(id) AS \"NotTreatedTot\" from public.\"mfPositiveLineListPatients\" MP\n\t\t   where MP.\"isTreatmentGive\"=false and MP.\"reasonsForNonTreating\" is not null group by MP.\"mfPositiveLineListId\" ) \nMP8 ON MP8.\"mfPositiveLineListId\"=M.id \nLEFT JOIN public.facilities F on F.id=M.\"facilityId\"\nLEFT JOIN public.villages  V on V.id=M.\"villageId\"\nLEFT JOIN public.districts D on D.id = M.\"districtId\"\nLEFT JOIN public.talukas T on T.id = M.\"talukaId\"\nLEFT JOIN public.\"subCenters\" S on S.id = M.\"subCenterId\"\nLEFT JOIN public.\"verticalControlUnits\" VC on VC.id = M.\"nameOfUnit\"\nLEFT JOIN public.\"verticalControlFieldUnits\" VCF on VCF.id = M.\"nameOfFilariaFieldUnit\"\nLEFT JOIN public.\"udCategoryOptions\" U ON M.id=MP.gender\nLEFT JOIN public.\"udCategoryOptions\" U1 ON M.id=M.\"targetForCollectionOfNBS\"\n         where M.\"isActive\"=true\n".concat(districtId, " ").concat(year, "  ").concat(month, "  ").concat(nameOfUnitId, " ").concat(nameOfFilariaFieldUnit, "\ngroup by M.\"nameOfUnit\",VC.\"nameOfControlUnit\" ,M.\"districtId\",D.\"districtName\",\nM.\"year\", M.\"month\",M.\"nameOfFilariaFieldUnit\",VCF.\"fieldUnitName\";\n\t")).then(function (_ref15) {
                            var _ref16 = (0, _slicedToArray2["default"])(_ref15, 2),
                                results = _ref16[0],
                                metadata = _ref16[1];

                            response.error = false;
                            response.data = results; // console.log("results", results)
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

    return function SubUnitLevelDao(_x7) {
      return _ref13.apply(this, arguments);
    };
  }();

  var vNoCasesDetectedDuringMonthDao = /*#__PURE__*/function () {
    var _ref17 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req) {
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              return _context10.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(resolve) {
                  var response, districtId, year, facilityId, nameOfUnitId, pf_year, year1, pfStart_month, pfEnd_month, startMonth1, endMonth1, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          response = {};
                          console.log("req body ", req.body.startMonth, req.body.endMonth);
                          districtId = "and  v.\"districtId\" = ".concat(req.body.districtId);
                          year = "and year =  ".concat(req.body.year);
                          facilityId = "and  v.\"facilityId\" = ".concat(req.body.facilityId);
                          nameOfUnitId = "and  v.\"nameOfUnitId\" = ".concat(req.body.nameOfUnitId);
                          pf_year = "and date_part('Year',PF.\"followUpDate\") = ".concat(req.body.year);
                          year1 = "and  date_part('Year',P.\"dateOfTreatmentStarted\") =".concat(req.body.year, " ");
                          pfStart_month = "and date_part('month',PF.\"followUpDate\") BETWEEN ".concat(req.body.startMonth);
                          pfEnd_month = "and  ".concat(req.body.endMonth);
                          startMonth1 = "and  date_part('month',P.\"dateOfTreatmentStarted\")\n             BETWEEN ".concat(req.body.startMonth, " ");
                          endMonth1 = "and  ".concat(req.body.endMonth);
                          start_month = "and  \"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                            pf_year = '';
                            year1 = '';
                          }

                          if (req.body.startMonth.length == 0) {
                            req.body.startMonth = 1;
                            start_month = "and  \"month\" BETWEEN 1 ";
                            pfStart_month = "and date_part('month',PF.\"followUpDate\") BETWEEN ".concat(req.body.startMonth);
                            startMonth1 = "and  date_part('month',P.\"dateOfTreatmentStarted\")  \n                BETWEEN ".concat(req.body.startMonth, " ");
                          }

                          if (req.body.endMonth.length == 0) {
                            req.body.endMonth = 12;
                            end_month = "and  ".concat(req.body.endMonth);
                            pfEnd_month = "and  ".concat(req.body.endMonth);
                            endMonth1 = "and  ".concat(req.body.endMonth);
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
                          _sequelize["default"].sequelize.query("\n           select A.*,B.* ,C.*,D.*\nfrom\n(\nselect M1.\"nameOfUnitId\", M1.\"nameOfControlUnit\",\nM1.\"districtId\" ,M1.\"month\",M1.\"year\",\nsum(M1.\"FoundMFPostve\") as \"FoundMFPostve\",\nsum(M1.\"FoundDesPostve\") as \"FoundDesPostve\",\nsum(M1.\"FoundTotPostve\") as \"FoundTotPostve\"\nfrom (\nselect * from \"vNoCasesDetectedDuringMonth\"v\nwhere 1 = 1\n            ".concat(districtId, " ").concat(year, "  ").concat(start_month, " ").concat(end_month, " ").concat(facilityId, " ").concat(nameOfUnitId, "\n\n) M1 group by M1.\"nameOfUnitId\", M1.\"nameOfControlUnit\", M1.\"districtId\",M1.\"month\",M1.\"year\"\n)A\nLEFT JOIN\n(\nselect M1.\"nameOfUnitId\", M1.\"nameOfControlUnit\",\nM1.\"districtId\",M1.\"month\",M1.\"year\",\nsum(M1.\"FoundMFPostve\") as \"FoundMFPostve\",\nsum(M1.\"FoundDesPostve\") as \"FoundDesPostve\",\nsum(M1.\"FoundTotPostve\") as \"FoundTotPostve\"\nfrom (\nselect * from \"vNoCasesDetectedDuringMonth\" v\nwhere 1 = 1\n            ").concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(facilityId, " ").concat(nameOfUnitId, "\n) M1 group by M1.\"nameOfUnitId\", M1.\"nameOfControlUnit\", M1.\"districtId\",M1.\"month\",M1.\"year\"\n)B\nON B.\"nameOfUnitId\"=A.\"nameOfUnitId\" and B.\"districtId\"=A.\"districtId\"\nand B.\"month\"=A.\"month\" and B.\"year\"=A.\"year\"\nLEFT JOIN\n(\nselect M1.\"nameOfUnitId\", M1.\"nameOfControlUnit\", M1.\"districtId\" ,M1.\"districtName\",\nsum(M1.\"noOfDECTabletsGiven\") as \"noOfDECTabletsGiven\",M1.\"month\",M1.\"year\",\nsum(M1.\"noOfDECTabletsConsumed\") as \"noOfDECTabletsConsumed\",\n(sum(M1.\"noOfDECTabletsGiven\")-sum(M1.\"noOfDECTabletsConsumed\")) AS \"noOfDECTabletsBal\"\nfrom (select M.Id,M.\"nameOfUnit\" AS \"nameOfUnitId\", V.\"nameOfControlUnit\",\nM.\"districtId\",D.\"districtName\" ,PF1.\"noOfDECTabletsGiven\",PF1.\"noOfDECTabletsConsumed\",\nM.\"month\",M.\"year\"\nfrom public.\"mfPositiveLineLists\" M\nLEFT JOIN (select PF.\"mfPositiveLineListId\",PF.\"noOfDECTabletsGiven\",PF.\"noOfDECTabletsConsumed\"\nfrom public.\"mfPositiveLineListBSFollowUps\" PF\nwhere PF.\"isActive\"=true\n                       ").concat(pf_year, " ").concat(pfStart_month, " ").concat(pfEnd_month, "\n)\nPF1 ON PF1.\"mfPositiveLineListId\"=M.id\nLEFT JOIN \"verticalControlUnits\" v ON v.id = m.\"nameOfUnit\"\nLEFT JOIN districts d ON d.id = m.\"districtId\"\n)M1 group by M1.\"nameOfUnitId\", M1.\"nameOfControlUnit\", M1.\"districtId\",M1.\"districtName\",M1.\"month\",M1.\"year\"\n)\nC ON C.\"nameOfUnitId\"=A.\"nameOfUnitId\" and C.\"districtId\"=A.\"districtId\"\nand C.\"month\"=A.\"month\" and C.\"year\"=A.\"year\"\nLEFT JOIN\n(\nselect M1.\"nameOfUnitId\", M1.\"nameOfControlUnit\",M1.\"districtId\",M1.\"districtName\",\nSUM(M1.\"noOfDECTabletsGiven\") AS \"noOfDECTabletsGiven\",\nSUM(M1.\"noOfDECTabletsConsumed\") AS \"noOfDECTabletsConsumed\",M1.\"month\",M1.\"year\"\nfrom\n(\nselect M.\"nameOfUnit\" AS \"nameOfUnitId\", V.\"nameOfControlUnit\", M.\"districtId\" ,D.\"districtName\",\nP1.\"NoOfOldCasesTreated\", P1.\"noOfDECTabletsGiven\",P1.\"noOfDECTabletsConsumed\",\nM.\"month\",M.\"year\"\nfrom public.\"mfPositiveLineLists\" M\nLEFT JOIN (select P.\"mfPositiveLineListId\", Count(id) AS \"NoOfOldCasesTreated\",\nSUM(PF1.\"noOfDECTabletsGiven\") AS \"noOfDECTabletsGiven\",\nSUM(PF1.\"noOfDECTabletsConsumed\") AS \"noOfDECTabletsConsumed\"\nfrom public.\"mfPositiveLineListPatients\" P\nLEFT JOIN (select PF.\"mfPositiveLineListId\",PF.\"mfPositiveLineListPatientId\",\nPF.\"noOfDECTabletsGiven\",PF.\"noOfDECTabletsConsumed\"\nfrom public.\"mfPositiveLineListBSFollowUps\" PF\nwhere PF.\"isActive\"=true\n               ").concat(pf_year, " ").concat(pfStart_month, " ").concat(pfEnd_month, "\n)PF1 On P.id=PF1.\"mfPositiveLineListPatientId\"\nwhere P.\"isTreatmentGive\" =true\nand P.\"isActive\"=true\n               ").concat(year1, " ").concat(startMonth1, " ").concat(endMonth1, "\ngroup by P.\"mfPositiveLineListId\"\n)P1 ON P1.\"mfPositiveLineListId\"=M.ID\nLEFT JOIN \"verticalControlUnits\" v ON v.id = m.\"nameOfUnit\"\nLEFT JOIN districts d ON d.id = m.\"districtId\"\n)M1\ngroup by M1.\"nameOfUnitId\", M1.\"nameOfControlUnit\", M1.\"districtId\",M1.\"districtName\",M1.\"month\",M1.\"year\"\n)D ON D.\"nameOfUnitId\"=A.\"nameOfUnitId\" and D.\"districtId\"=A.\"districtId\"\nand D.\"month\"=A.\"month\" and D.\"year\"=A.\"year\"")).then(function (_ref19) {
                            var _ref20 = (0, _slicedToArray2["default"])(_ref19, 2),
                                results = _ref20[0],
                                metadata = _ref20[1];

                            response.error = false;
                            response.data = results; //console.log("results", results)
                          })["catch"](function (error) {
                            //console.log(error, 'LLLLLLLLLL')
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 21:
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

    return function vNoCasesDetectedDuringMonthDao(_x9) {
      return _ref17.apply(this, arguments);
    };
  }();

  var get_FCUAnalysis6Dao = /*#__PURE__*/function () {
    var _ref21 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req) {
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              return _context12.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref22 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(resolve) {
                  var response, districtId, year, facilityId, nameOfUnitId, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee11$(_context11) {
                    while (1) {
                      switch (_context11.prev = _context11.next) {
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
                          _sequelize["default"].sequelize.query("\n         select M.\"nameOfUnit\" AS \"nameOfUnitId\",V.\"nameOfControlUnit\",\n            M.\"districtId\",D.\"districtName\", M.\"nameOfFilariaFieldUnit\" AS \"fieldUnitId\",VF.\"fieldUnitName\",\n            M.\"year\" AS \"Year\", M.\"month\" AS \"Month\",\n            SUM(MS1.\"noOfPersons\") AS \"noOfPersonsExam\",SUM(MS2.\"noOfPersons\") AS \"noOfPersonsMF\",\n            ((SUM(MS2.\"noOfPersons\")/(CASE SUM(MS1.\"noOfPersons\")\n            WHEN 0 Then NULL ELSE SUM(MS1.\"noOfPersons\") END))*100) AS \"MFRate\",\n            SUM(MS3.\"noOfPersons\") AS \"noOfPersonsDes\",\n            ((SUM(MS3.\"noOfPersons\")/(CASE SUM(MS1.\"noOfPersons\")\n            WHEN 0 Then NULL ELSE SUM(MS1.\"noOfPersons\") END))*100) AS \"DesRate\"\n        from public.\"mfPositiveLineLists\" M\n        LEFT JOIN (select * from public.\"vMFPositiveLineListSurveys\" V1 where  V1.\"categoryOptionCode\"='NBSE')\n        MS1 ON MS1.\"mfPositiveLineListId\"=M.id\n        LEFT JOIN (select * from public.\"vMFPositiveLineListSurveys\" V1 where  V1.\"categoryOptionCode\"='NPMF')\n        MS2 ON MS2.\"mfPositiveLineListId\"=M.id\n        LEFT JOIN public.\"vDiseasePositive\" MS3 ON MS3.\"mfPositiveLineListId\"=M.id\n        LEFT JOIN public.districts D on D.id = M.\"districtId\"\n        LEFT JOIN public.\"verticalControlUnits\" V ON V.id=M.\"nameOfUnit\"\n        LEFT JOIN public.\"verticalControlFieldUnits\" VF ON VF.id=M.\"nameOfFilariaFieldUnit\"\n        where M.\"isActive\"=true\n".concat(districtId, " ").concat(year, "  ").concat(start_month, " ").concat(end_month, " ").concat(facilityId, " ").concat(nameOfUnitId, "\n   group by M.\"nameOfUnit\" ,V.\"nameOfControlUnit\",\n            M.\"districtId\",D.\"districtName\", M.\"nameOfFilariaFieldUnit\" ,VF.\"fieldUnitName\",\n            M.\"year\",M.\"month\"   \n\t")).then(function (_ref23) {
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

                        case 14:
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

    return function get_FCUAnalysis6Dao(_x11) {
      return _ref21.apply(this, arguments);
    };
  }();

  var get_FCUAnalysis10ListDao = /*#__PURE__*/function () {
    var _ref25 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req) {
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              return _context14.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref26 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(resolve) {
                  var response, districtId, year, start_month, end_month, nameOfUnitId;
                  return _regenerator["default"].wrap(function _callee13$(_context13) {
                    while (1) {
                      switch (_context13.prev = _context13.next) {
                        case 0:
                          response = {};
                          districtId = "and  M.\"districtId\" = ".concat(req.body.districtId);
                          year = "and Year =  ".concat(req.body.year);
                          start_month = "and  M.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);
                          nameOfUnitId = "and  M.\"nameOfUnit\" = ".concat(req.body.nameOfUnitId);

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
                          _sequelize["default"].sequelize.query("\n            select M.\"districtId\",M.\"talukaId\", M.\"facilityId\",M.\"subCenterId\",M.\"villageId\",\n            d.\"districtName\",t.\"talukaName\",f.\"facilityName\", s.\"subCenterName\",v.\"villageName\",\n            M.\"nameOfUnit\" AS \"nameOfUnitId\", M.\"year\", M.\"month\",\n            MP.\"patientName\",MP.\"ageYears\",MP.\"ageMonths\",MP.gender,MP.\"patientPhoneNo\",MP.\"dateOfExamination\",\n            MP.\"bsNumber\",MP.\"mfCount\",MP.\"dateOfTreatmentStarted\",\n            MF1.\"followUpDate\" AS \"followUpDate1\",MF1.\"result\" AS \"result1\",MF1.\"followUpDate\" \"TreatmentDate1\",\n            MF2.\"followUpDate\" AS \"followUpDate2\",MF1.\"result\" AS \"result2\",MF1.\"followUpDate\" \"TreatmentDate2\",\n            MF3.\"followUpDate\" AS \"followUpDate3\",MF1.\"result\" AS \"result3\",MF1.\"followUpDate\" \"TreatmentDate3\",\n            MF4.\"followUpDate\" AS \"followUpDate4\",MF1.\"result\" AS \"result4\",MF1.\"followUpDate\" \"TreatmentDate4\",\n            MF5.\"followUpDate\" AS \"followUpDate5\",MF1.\"result\" AS \"result5\",MF1.\"followUpDate\" \"TreatmentDate5\",\n            MF6.\"followUpDate\" AS \"followUpDate6\",MF1.\"result\" AS \"result6\",MF1.\"followUpDate\" \"TreatmentDate6\",\n            MF7.\"followUpDate\" AS \"followUpDate7\",MF1.\"result\" AS \"result7\",MF1.\"followUpDate\" \"TreatmentDate7\",\n            MF8.\"followUpDate\" AS \"followUpDate8\",MF1.\"result\" AS \"result8\",MF1.\"followUpDate\" \"TreatmentDate8\",\n            MF9.\"followUpDate\" AS \"followUpDate9\",MF1.\"result\" AS \"result1\",MF1.\"followUpDate\" \"TreatmentDate9\",\n            MF10.\"followUpDate\" AS \"followUpDate10\",MF1.\"result\" AS \"result10\",MF1.\"followUpDate\" \"TreatmentDate10\",\n            MP.\"nameOfDrugAdmin\",MP.\"designation\",\n            MP.\"phoneNoOfDrugAdmin\"\n            from public.\"mfPositiveLineLists\" M\n            left join public.\"mfPositiveLineListPatients\" MP \n            ON MP.\"mfPositiveLineListId\"=M.id\n            left join public.\"mfPositiveLineListBSFollowUps\" MF1\n            ON MF1.\"mfPositiveLineListId\"=M.id and  MP.id=MF1.\"mfPositiveLineListPatientId\" \n               and MF1.\"followUpYear\"=1\n            left join public.\"mfPositiveLineListBSFollowUps\" MF2\n            ON MF2.\"mfPositiveLineListId\"=M.id and  MP.id=MF2.\"mfPositiveLineListPatientId\" \n               and MF2.\"followUpYear\"=2\n            left join public.\"mfPositiveLineListBSFollowUps\" MF3\n            ON MF3.\"mfPositiveLineListId\"=M.id and  MP.id=MF3.\"mfPositiveLineListPatientId\" \n               and MF3.\"followUpYear\"=3\n            left join public.\"mfPositiveLineListBSFollowUps\" MF4\n            ON MF4.\"mfPositiveLineListId\"=M.id and  MP.id=MF4.\"mfPositiveLineListPatientId\" \n               and MF4.\"followUpYear\"=4\n            left join public.\"mfPositiveLineListBSFollowUps\" MF5\n            ON MF5.\"mfPositiveLineListId\"=M.id and  MP.id=MF5.\"mfPositiveLineListPatientId\" \n               and MF5.\"followUpYear\"=5\n            left join public.\"mfPositiveLineListBSFollowUps\" MF6\n            ON MF6.\"mfPositiveLineListId\"=M.id and  MP.id=MF6.\"mfPositiveLineListPatientId\" \n               and MF6.\"followUpYear\"=6\n            left join public.\"mfPositiveLineListBSFollowUps\" MF7\n            ON MF7.\"mfPositiveLineListId\"=M.id and  MP.id=MF7.\"mfPositiveLineListPatientId\" \n               and MF7.\"followUpYear\"=7\n            left join public.\"mfPositiveLineListBSFollowUps\" MF8\n            ON MF8.\"mfPositiveLineListId\"=M.id and  MP.id=MF8.\"mfPositiveLineListPatientId\" \n               and MF8.\"followUpYear\"=8\n            left join public.\"mfPositiveLineListBSFollowUps\" MF9\n            ON MF9.\"mfPositiveLineListId\"=M.id and  MP.id=MF9.\"mfPositiveLineListPatientId\" \n               and MF9.\"followUpYear\"=9\n            left join public.\"mfPositiveLineListBSFollowUps\" MF10\n            ON MF10.\"mfPositiveLineListId\"=M.id and  MP.id=MF10.\"mfPositiveLineListPatientId\" \n               and MF10.\"followUpYear\"=10 \n            left join public.districts d on d.id= M.\"districtId\" \n            left join public.talukas t on t.id= M.\"talukaId\" \n            left join public.facilities f on f.id= M.\"facilityId\" \n            left join public.\"subCenters\" s on s.id= M.\"subCenterId\" \n            left join public.villages v on v.id= M.\"villageId\" \n                where M.\"isActive\"=true\n".concat(districtId, " ").concat(year, "  ").concat(start_month, " ").concat(end_month, "\n").concat(nameOfUnitId, "\n\t")).then(function (_ref27) {
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

    return function get_FCUAnalysis10ListDao(_x13) {
      return _ref25.apply(this, arguments);
    };
  }();

  var get_FCUAnalysis7ListDao = /*#__PURE__*/function () {
    var _ref29 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req) {
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              return _context16.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref30 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(resolve) {
                  var response, districtId, year1, month1, year2, month2, year, month, nameOfUnitId, date;
                  return _regenerator["default"].wrap(function _callee15$(_context15) {
                    while (1) {
                      switch (_context15.prev = _context15.next) {
                        case 0:
                          response = {};
                          districtId = "and  M.\"districtId\" = ".concat(req.body.districtId);
                          year1 = "and date_part('year',\"dateNPC\")= ".concat(req.body.year);
                          month1 = "and date_part('month',\"dateNPC\")=  ".concat(req.body.month);
                          year2 = "and date_part('year',\"dateNBSE\")= ".concat(req.body.year);
                          month2 = "and date_part('month',\"dateNBSE\")=  ".concat(req.body.month);
                          year = req.body.year;
                          month = req.body.month;
                          nameOfUnitId = "and  M.\"nameOfUnit\" = ".concat(req.body.nameOfUnitId);
                          date = new Date();

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = date.getFullYear();
                            year1 = "";
                            year2 = "";
                          }

                          if (req.body.month.length == 0) {
                            month = date.getMonth() + 1;
                            month1 = "";
                            month2 = "";
                          }

                          if (req.body.nameOfUnitId.length == 0) {
                            nameOfUnitId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n\n            select M.\"districtId\",D.\"districtName\",\n            M.\"nameOfUnit\" AS \"nameOfControlUnitId\", VC.\"nameOfControlUnit\",\n            sum(M1.\"noOfPersonsNPC\") AS \"BSCommectionDuring\",\n            sum(M2.\"noOfPersonsNBSE\") AS \"BSExamDuring\",\n            sum(M3.\"noOfPersonsNBSE\") AS \"BSExamPrevious\",\n            sum(M2.\"noOfPersonsNBSE\") + sum(M3.\"noOfPersonsNBSE\")  AS \"BSExamTotal\",\n            0 AS \"CollectionFrom\",0 AS \"ExamFrom\",0 AS \"BSNotToBeExam\"\n            from public.\"mfPositiveLineLists\" M\n            left join public.\"verticalControlUnits\" VC ON VC.id=M.\"nameOfUnit\"\n            left join public.districts D ON D.id=M.\"districtId\"\n            left join\n            (\n                select id,\"dateNPC\", \"noOfPersonsNPC\" from public.\"vMFPositiveLineListSurveysById\"\nwhere 1 = 1\n                ".concat(year1, " ").concat(month1, "\n                )M1\n            ON M1.id=M.id\n            left join\n            --BS During\n            (\n                select  id,\"dateNBSE\",\"noOfPersonsNBSE\" from public.\"vMFPositiveLineListSurveysById\"\n                where 1 = 1\n                ").concat(year1, " ").concat(month1, "\n                ").concat(year2, " ").concat(month2, "\n\n            )M2 ON M2.id=M.id\n            left join\n            --BS Previous\n            (\n                select  id,\"dateNBSE\",\"noOfPersonsNBSE\" from public.\"vMFPositiveLineListSurveysById\"\n                where \"dateNPC\" < TO_DATE(CONCAT(").concat(year, "::text,LPAD(").concat(month, "::text, 2, '0'),'01'),'YYYYMMDD')\n                ").concat(year2, " ").concat(month2, "\n                )M3 ON M3.id=M.id \n            where 1 = 1\n            ").concat(districtId, " ").concat(nameOfUnitId, "\n            group by M.\"districtId\",D.\"districtName\",M.\"nameOfUnit\",VC.\"nameOfControlUnit\"\n\t")).then(function (_ref31) {
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

                        case 15:
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

    return function get_FCUAnalysis7ListDao(_x15) {
      return _ref29.apply(this, arguments);
    };
  }();

  var get_FCUAnalysis8ListDao = /*#__PURE__*/function () {
    var _ref33 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(req) {
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              return _context18.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref34 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(resolve) {
                  var response, districtId, year2, month1, year1, year3, year0, month0, nameOfUnitId;
                  return _regenerator["default"].wrap(function _callee17$(_context17) {
                    while (1) {
                      switch (_context17.prev = _context17.next) {
                        case 0:
                          response = {};
                          districtId = "and  M.\"districtId\" = ".concat(req.body.districtId);
                          year2 = "and date_part('year',\"dateNBSE\")=(case when ".concat(req.body.month, " = 1 then ").concat(req.body.year, " -2 else  ").concat(req.body.year, " -1 end) ");
                          month1 = "and date_part('month',\"dateNBSE\")=(case when ".concat(req.body.month, " = 1 then 12 else ").concat(req.body.month, "-1 end)");
                          year1 = "and date_part('year',\"dateNBSE\")= (".concat(req.body.year, " -1)");
                          year3 = "and date_part('year',\"dateNBSE\")=(case when ".concat(req.body.month, " = 1 then ").concat(req.body.year, " -1 else  ").concat(req.body.year, " end) ");
                          year0 = "and date_part('year',\"dateNBSE\")= (".concat(req.body.year, ")");
                          month0 = "and date_part('month',\"dateNBSE\")=  ".concat(req.body.month);
                          nameOfUnitId = "and  M.\"nameOfUnit\" = ".concat(req.body.nameOfUnitId);

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year1 = "";
                            year2 = "";
                            year0 = "";
                            year3 = "";
                          }

                          if (req.body.month.length == 0) {
                            month1 = "";
                            month2 = "";
                            month0 = "";
                          }

                          if (req.body.nameOfUnitId.length == 0) {
                            nameOfUnitId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n\n            select M.\"districtId\",D.\"districtName\",M.\"year\",M.\"month\",\n            M.\"nameOfUnit\" AS \"nameOfControlUnitId\", VC.\"nameOfControlUnit\",\n            sum(M1.\"noOfPersonsNBSE\") AS \"BSExamDuringPrev\",\n            sum(M2.\"noOfPersonsNPMF\") AS \"MFCountDuringPrev\",\n            ((sum(M2.\"noOfPersonsNPMF\")/(CASE sum(M1.\"noOfPersonsNBSE\")\n                WHEN 0 Then NULL ELSE sum(M1.\"noOfPersonsNBSE\") END))*100) AS \"MFRateDuringPrev\",\n            sum(M3.\"noOfPersonsDisease\") AS \"DisCountDuringPrev\",\n            ((sum(M3.\"noOfPersonsDisease\")/(CASE sum(M1.\"noOfPersonsNBSE\")\n                WHEN 0 Then NULL ELSE sum(M1.\"noOfPersonsNBSE\") END))*100) AS \"DisRateDuringPrev\",\n            sum(M4.\"noOfPersonsNBSE\") AS \"BSExamPrgPrev\",\n            sum(M5.\"noOfPersonsNPMF\") AS \"MFCountPrgPrev\",\n            ((sum(M5.\"noOfPersonsNPMF\")/(CASE sum(M4.\"noOfPersonsNBSE\")\n                WHEN 0 Then NULL ELSE sum(M4.\"noOfPersonsNBSE\") END))*100)  AS \"MFRatePrgPrev\",\n            sum(M6.\"noOfPersonsDisease\") AS \"DisCountPrgPrev\",\n            ((sum(M6.\"noOfPersonsDisease\")/(CASE sum(M4.\"noOfPersonsNBSE\")\n                WHEN 0 Then NULL ELSE sum(M4.\"noOfPersonsNBSE\") END))*100) AS \"DisRatePrgPrev\",\n            sum(M7.\"noOfPersonsNBSE\") AS \"BSExamDuringCurrent\",\n            sum(M8.\"noOfPersonsNPMF\") AS \"MFCountDuringCurrent\",\n            ((sum(M8.\"noOfPersonsNPMF\")/(CASE sum(M7.\"noOfPersonsNBSE\")\n                WHEN 0 Then NULL ELSE sum(M7.\"noOfPersonsNBSE\") END))*100)  AS \"MFRateDuringCurrent\",\n            sum(M9.\"noOfPersonsDisease\") AS \"DisCountDuringCurrent\",\n            ((sum(M9.\"noOfPersonsDisease\")/(CASE sum(M7.\"noOfPersonsNBSE\")\n                WHEN 0 Then NULL ELSE sum(M7.\"noOfPersonsNBSE\") END))*100) AS \"DisRateDuringCurrent\",\n            sum(M10.\"noOfPersonsNBSE\") AS \"BSExamPrgCurrent\",\n            sum(M11.\"noOfPersonsNPMF\") AS \"MFCountPrgCurrent\",\n            ((sum(M11.\"noOfPersonsNPMF\")/(CASE sum(M10.\"noOfPersonsNBSE\")\n                WHEN 0 Then NULL ELSE sum(M10.\"noOfPersonsNBSE\") END))*100)  AS \"MFRatePrgCurrent\",\n            sum(M12.\"noOfPersonsDisease\") AS \"DisCountPrgCurrent\",\n            ((sum(M12.\"noOfPersonsDisease\")/(CASE sum(M10.\"noOfPersonsNBSE\")\n                WHEN 0 Then NULL ELSE sum(M10.\"noOfPersonsNBSE\") END))*100) AS \"DisRatePrgCurrent\"\n            from public.\"mfPositiveLineLists\" M\n            left join public.\"verticalControlUnits\" VC ON VC.id=M.\"nameOfUnit\"\n            left join public.districts D ON D.id=M.\"districtId\"\n            left join\n            (\n                select id,\"dateNBSE\", \"noOfPersonsNBSE\" from public.\"vMFPositiveLineListSurveysById\"\n                where 1 = 1\n                ".concat(month0, " ").concat(year1, "\n            )M1\n            ON M1.id=M.id\n            left join\n            (\n                select id,\"dateNBSE\", \"noOfPersonsNPMF\" from public.\"vMFPositiveLineListSurveysById\"\n                where 1 = 1\n                ").concat(month0, " ").concat(year1, "\n            )M2\n            ON M2.id=M.id\n            left join\n            (\n                select id,\"dateNBSE\",\"noOfPersonsDisease\"  from public.\"vMFPositiveLineListSurveysById\"\n                where 1 = 1\n                ").concat(month0, " ").concat(year1, "\n                )M3\n            ON M3.id=M.id\n            left join\n            (\n                select id,\"dateNBSE\", \"noOfPersonsNBSE\" from public.\"vMFPositiveLineListSurveysById\"\n                where 1 = 1\n                ").concat(month1, " ").concat(year2, "\n                \n            )M4\n            ON M4.id=M.id\n            left join\n            (\n                select id,\"dateNBSE\", \"noOfPersonsNPMF\" from public.\"vMFPositiveLineListSurveysById\"\n                where 1 = 1\n                ").concat(month1, " ").concat(year2, "\n\n            )M5\n            ON M5.id=M.id\n            left join\n            (\n                select id,\"dateNBSE\",\"noOfPersonsDisease\"  from public.\"vMFPositiveLineListSurveysById\"\n                where 1 = 1\n                ").concat(month1, " ").concat(year2, "\n\n            )M6\n            ON M6.id=M.id\n            left join\n            (\n                select id,\"dateNBSE\", \"noOfPersonsNBSE\" from public.\"vMFPositiveLineListSurveysById\"\n                where 1 = 1\n                ").concat(month0, " ").concat(year0, "\n\n            )M7\n            ON M7.id=M.id\n            left join\n            (\n                select id,\"dateNBSE\", \"noOfPersonsNPMF\" from public.\"vMFPositiveLineListSurveysById\"\n                where 1 = 1\n                ").concat(month0, " ").concat(year0, "\n\n            )M8\n            ON M8.id=M.id\n            left join\n            (\n                select id,\"dateNBSE\",\"noOfPersonsDisease\"  from public.\"vMFPositiveLineListSurveysById\"\n                where 1 = 1\n                ").concat(month0, " ").concat(year0, "\n\n            )M9\n            ON M9.id=M.id\n            left join\n            (\n                select id,\"dateNBSE\", \"noOfPersonsNBSE\" from public.\"vMFPositiveLineListSurveysById\"\n                where 1 = 1\n                ").concat(month1, " ").concat(year3, "\n\n            )M10\n            ON M10.id=M.id\n            left join\n            (\n                select id,\"dateNBSE\", \"noOfPersonsNPMF\" from public.\"vMFPositiveLineListSurveysById\"\n                where 1 = 1\n                ").concat(month1, " ").concat(year3, "\n\n            )M11\n            ON M11.id=M.id\n            left join\n            (\n                select id,\"dateNBSE\",\"noOfPersonsDisease\"  from public.\"vMFPositiveLineListSurveysById\"\n                where 1 = 1\n                ").concat(month1, " ").concat(year3, "\n\n            )M12\n            ON M12.id=M.id \n            Where 1 = 1 \n            ").concat(nameOfUnitId, " ").concat(districtId, "\n            group by M.\"districtId\",D.\"districtName\",M.\"nameOfUnit\",VC.\"nameOfControlUnit\",\n            M.\"year\",M.\"month\"\n\t")).then(function (_ref35) {
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

                        case 14:
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

    return function get_FCUAnalysis8ListDao(_x17) {
      return _ref33.apply(this, arguments);
    };
  }();

  return {
    get_FCUAnalysis1Dao: get_FCUAnalysis1Dao,
    get_FCUAnalysis2Dao: get_FCUAnalysis2Dao,
    vNoCasesDetectedDuringMonthDao: vNoCasesDetectedDuringMonthDao,
    get_FCUAnalysis6Dao: get_FCUAnalysis6Dao,
    UnitLevelDao: UnitLevelDao,
    SubUnitLevelDao: SubUnitLevelDao,
    get_FCUAnalysis10ListDao: get_FCUAnalysis10ListDao,
    get_FCUAnalysis7ListDao: get_FCUAnalysis7ListDao,
    get_FCUAnalysis8ListDao: get_FCUAnalysis8ListDao
  };
};

var _default = FCUReportDao();

exports["default"] = _default;
//# sourceMappingURL=FCUReportDao.js.map
