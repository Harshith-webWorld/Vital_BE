"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _expressValidator = require("express-validator");

var _httpStatus = _interopRequireDefault(require("http-status"));

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

var lHLineListDao = function lHLineListDao() {
  var getLfAnalysis1Dao = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve) {
                  var response, districtId, year, start_month, end_month, taluka, facility, gender, villageId, grading, patientId, AffectedPartId;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          response = {};
                          districtId = "and  L.\"districtId\" = ".concat(req.body.districtId);
                          year = "and  L.\"year\" = ".concat(req.body.year);
                          start_month = "and  L.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);
                          taluka = "and  L.\"talukaId\" = ".concat(req.body.talukaId);
                          facility = "and  L.\"facilityId\" = ".concat(req.body.facilityId);
                          gender = "and  L.\"gender\" = ".concat(req.body.genderId);
                          villageId = "and  L.\"villageId\" = ".concat(req.body.villageId);
                          grading = "and   L.\"grading\" = ".concat(req.body.gradingId);
                          patientId = "and L.\"patientId\" like '%".concat(req.body.patientId, "%'");

                          if (req.body.affectedPartId == 1) {
                            AffectedPartId = "and (L.\"isAffectedLeftLeg\" = true\n                or L.\"isAffectedRightLeg\" = true)";
                          } else if (req.body.affectedPartId == 2) {
                            AffectedPartId = "and (L.\"isAffectedRightHand\" = true\n                or L.\"isAffectedLeftHand\" = true)";
                          } else if (req.body.affectedPartId == 3) {
                            AffectedPartId = "and (L.\"isAffectedLeftBreast\" = true or\n                L.\"isAffectedRightBreast\" = true)";
                          } else if (req.body.affectedPartId == 4) {
                            AffectedPartId = "and ( L.\"isAffectedOthers\" = true)";
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
                            start_month = "and  L.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
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
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select L.Year,L.Month,D.\"districtName\",T.\"talukaName\",C.\"corporationName\",\n            F.\"facilityName\",S.\"subCenterName\",V.\"villageName\",L.town,W.\"wardName\",\n            L.\"headOfFamily\",L.\"nameOfPatient\",L.\"patientId\",L.\"ageYears\",L.\"ageMonths\",\n            L.gender,L.\"isAffectedLeftLeg\",L.\"isAffectedRightLeg\",L.\"isAffectedLeftHand\",\n            L.\"isAffectedRightHand\",\n            L.\"isAffectedLeftScrotum\",L.\"isAffectedRightScrotum\",L.\"isAffectedLeftBreast\",\n            L.\"isAffectedRightBreast\",\n            L.\"isAffectedOthers\",L.\"affectedOthersNotes\",L.grading,L.\"diseaseLastedYears\",\n            L.\"diseaseLastedMonths\",\n            L.\"stayingInYears\",L.\"stayingInMonths\",LS.\"dateOfSurvey\",L.\"patientMobileNumber\",\n            LF.\"serviceMMDPTrainingDate\",LF.\"serviceDateOfVisit\",LF.\"serviceProviderName\",Z.\"zoneName\",\n            LF.\"serviceProviderDesignation\", LF.\"serviceProviderPlace\", '' AS \"ServicesGiven\",\n            U.\"categoryOptionName\" As \"gender\",\nU1.\"categoryOptionName\" as gradingName\n        from public.\"lymphedemaLineLists\" L\n        left join public.\"lymphedemaLineListSurveys\" LS on LS.\"lymphedemaLineListId\"  = L.id\n        left join public.\"lymphedemaLineListFollowUpsLves\" LF on LF.\"lymphedemaLineListId\" = L.id\n        left join public.corporations C on C.id = L.\"corporationId\"\n        left join public.districts D on D.id = L.\"districtId\"\n        left join public.facilities F on F.id = L.\"facilityId\"\n        left join public.\"subCenters\" S on S.id = L.\"subCenterId\"\n        left join public.talukas T on T.id = L.\"talukaId\"\n        left join public.villages V on V.id = L.\"villageId\"\n        left join public.wards W on W.id = L.\"wardId\"\n        left join public.zones Z on Z.id = L.\"zoneId\"\n        left join public.\"udCategoryOptions\" U ON U.id=L.gender\n        left join public.\"udCategoryOptions\" U1 on U1.id = L.\"grading\"   \n        where L.\"isActive\"=true and L.\"diseaseType\" like '%Lymphedema%' \n        ".concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, "  ").concat(taluka, " ").concat(facility, " ").concat(gender, "\n        ").concat(villageId, " ").concat(grading, " ").concat(AffectedPartId, "  ").concat(patientId, "\n        ")).then(function (_ref3) {
                            var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
                                results = _ref4[0],
                                metadata = _ref4[1];

                            response.error = false;
                            response.data = results;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 24:
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

    return function getLfAnalysis1Dao(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var getLfAnalysis2Dao = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req) {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(resolve) {
                  var response, districtId, year, start_month, end_month, facility, HospitalSurgeryId;
                  return _regenerator["default"].wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          response = {};
                          districtId = "and  L.\"districtId\" = ".concat(req.body.districtId);
                          year = "and  L.\"year\" = ".concat(req.body.year);
                          start_month = "and  L.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);
                          facility = "and  L.\"facilityId\" = ".concat(req.body.facilityId);
                          HospitalSurgeryId = "and  HF.\"nameOfHospitalSurgeryDoneId\" = ".concat(req.body.hospitalSurgeryId);

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  L.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.facilityId.length == 0) {
                            facility = "";
                          }

                          if (req.body.hospitalSurgeryId.length == 0) {
                            HospitalSurgeryId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select L.Year,L.Month,D.\"districtName\",F.\"facilityName\",L.\"nameOfPatient\",L.\"ageYears\",L.\"ageMonths\",\n            L.\"permanentAddressLine1\",L.\"permanentAddressLine2\",D1.\"districtName\" City,S.\"stateName\",L.\"permanentAddressPINCode\",\n            L.\"permanentAddressCity\",L.\"patientMobileNumber\",L.\"diseaseLastedYears\",L.\"diseaseLastedMonths\",L.\"stayingInYears\",L.\"stayingInMonths\",\n            HF.\"serviceProviderName\",HF.\"serviceProviderPhone\",LS.\"verifiedByDoctorName\", F1.\"facilityName\" \"nameOfHospitalSurgeryDone\",\n            HF.\"dateOfSurgery\",HF.\"stageOfHydrocele\",HF.\"nameOfSurgeon\",HF.\"surgeonPhone\",L.\"diseaseType\" ,\n            HF.\"dateOfFollowUpAfterSurgery\",HF.remarks\n        from public.\"lymphedemaLineLists\" L\n        left join public.\"lymphedemaLineListSurveys\" LS on LS.\"lymphedemaLineListId\"  = L.id\n        left join public.\"lymphedemaLineListFollowUpsHFs\" HF on HF.\"lymphedemaLineListId\" = L.id\n        left join public.states S on S.id = L.\"permanentAddressState\"\n        left join public.districts D1 on D1.\"districtName\" = L.\"permanentAddressCity\"\n        left join public.districts D on D.id = L.\"districtId\"\n        left join public.facilities F on F.id = L.\"facilityId\"\n        left join public.facilities F1 on F1.id = HF.\"nameOfHospitalSurgeryDoneId\"\n        where L.\"diseaseType\" like '%Hydrocele%'\n        and L.\"isActive\"=true\n        ".concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(facility, " ").concat(HospitalSurgeryId, "\n        ")).then(function (_ref7) {
                            var _ref8 = (0, _slicedToArray2["default"])(_ref7, 2),
                                results = _ref8[0],
                                metadata = _ref8[1];

                            response.error = false;
                            response.data = results;
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

    return function getLfAnalysis2Dao(_x3) {
      return _ref5.apply(this, arguments);
    };
  }();

  var get_LF_HydroceleOPLineListDao = /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req) {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(resolve) {
                  var response, districtId, year, start_month, end_month, taluka, facility, gender, age, stageOfHydrocele, nameOfSurgeon, HospitalSurgeryId;
                  return _regenerator["default"].wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          response = {};
                          districtId = "and  L.\"districtId\" = ".concat(req.body.districtId);
                          year = "and  L.\"year\" = ".concat(req.body.year);
                          start_month = "and  L.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);
                          taluka = "and  L.\"talukaId\" = ".concat(req.body.taluka);
                          facility = "and  L.\"facilityId\" = ".concat(req.body.facilityId);
                          gender = "and  L.\"gender\" = ".concat(req.body.gender);
                          age = "where A.\"AgeGroup\" like '%".concat(req.body.age, "%'");
                          stageOfHydrocele = "and HF.\"stageOfHydrocele\" = ".concat(req.body.stageOfHydrocele);
                          nameOfSurgeon = "and HF.\"nameOfSurgeon\" like '%".concat(req.body.nameOfSurgeon, "%'");
                          HospitalSurgeryId = "and  HF.\"nameOfHospitalSurgeryDoneId\" = ".concat(req.body.hospitalSurgeryId);

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
                            start_month = "and  L.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.stageOfHydrocele.length == 0) {
                            stageOfHydrocele = "";
                          }

                          if (req.body.nameOfSurgeon.length == 0) {
                            nameOfSurgeon = "";
                          }

                          if (req.body.hospitalSurgeryId.length == 0) {
                            HospitalSurgeryId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select * from ( select L.Year,L.Month,L.\"districtId\",D.\"districtName\",\n            L.\"nameOfPatient\",L.\"patientId\",U.\"categoryOptionName\" As \"gender\",L.\"talukaId\",  \n            T.\"talukaName\",C.\"corporationName\",F.\"facilityName\",Sb.\"subCenterName\",\n            L.\"villageId\",V.\"villageName\",L.town,W.\"wardName\",L.\"ageYears\",L.\"ageMonths\",\n            (case when L.\"ageYears\"<16 then '0-15' when L.\"ageYears\"<41 then '16-40'\n              when L.\"ageYears\"<66 then '46-65' else  '65+' end) AS \"AgeGroup\",\t\n            L.\"patientMobileNumber\",L.\"permanentAddressLine1\",L.\"permanentAddressLine2\",\n            D1.\"districtName\" as City,HF.\"isSurgeryDone\",\n            S.\"stateName\",L.\"permanentAddressPINCode\",\t\n            L.\"isAffectedLeftScrotum\",L.\"isAffectedRightScrotum\", L.\"diseaseLastedYears\",\n            L.\"diseaseLastedMonths\",HF.\"serviceProviderDesignation\",HF.\"serviceProviderPlace\",\n            HF.\"serviceProviderName\",HF.\"serviceProviderPhone\",LS.\"verifiedByDoctorName\", \n            F1.\"facilityName\" \"nameOfHospitalSurgeryDone\",HF.\"dateOfSurgery\",HF.\"stageOfHydrocele\",\n            HF.\"nameOfSurgeon\",HF.\"surgeonPhone\",HF.\"comorbidityType\",\n            HF.\"dateOfFollowUpAfterSurgery\",HF.remarks,HF.\"findingsDuringSurgeryFollowUp\",\n            U1.\"categoryOptionName\" as gradingName\n        from public.\"lymphedemaLineLists\" L\n        left join public.\"lymphedemaLineListSurveys\" LS on LS.\"lymphedemaLineListId\"  = L.id\n        left join public.\"lymphedemaLineListFollowUpsHFs\" HF on HF.\"lymphedemaLineListId\" = L.id\n        left join public.\"lymphedemaLineListFollowUpsLves\" LF on LF.\"lymphedemaLineListId\" = L.id\n        left join public.corporations C on C.id = L.\"corporationId\"\n        left join public.districts D on D.id = L.\"districtId\"\n        left join public.facilities F on F.id = L.\"facilityId\"\n        left join public.\"subCenters\" Sb on Sb.id = L.\"subCenterId\"\n        left join public.talukas T on T.id = L.\"talukaId\"\n        left join public.villages V on V.id = L.\"villageId\"\n        left join public.wards W on W.id = L.\"wardId\"\n        left join public.zones Z on Z.id = L.\"zoneId\"\n        left join public.facilities F1 on F1.id = HF.\"nameOfHospitalSurgeryDoneId\"\n        left join public.states S on S.id = L.\"permanentAddressState\"\n        left join public.districts D1 on D1.\"districtName\" = L.\"permanentAddressCity\"\n        left join public.\"udCategoryOptions\" U ON U.id=L.gender\n        left join public.\"udCategoryOptions\" U1 on U1.id = L.\"grading\"        \n        where HF.\"isSurgeryDone\"=true and L.\"diseaseType\" like '%Hydrocele%'\n        and L.\"isActive\"=true\n        ".concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, "  ").concat(taluka, " ").concat(facility, " ").concat(gender, " \n        ").concat(stageOfHydrocele, " ").concat(nameOfSurgeon, " ").concat(HospitalSurgeryId, "\n        ) A ").concat(age, "\n        ")).then(function (_ref11) {
                            var _ref12 = (0, _slicedToArray2["default"])(_ref11, 2),
                                results = _ref12[0],
                                metadata = _ref12[1];

                            response.error = false;
                            response.data = results;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 24:
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

    return function get_LF_HydroceleOPLineListDao(_x5) {
      return _ref9.apply(this, arguments);
    };
  }();

  var get_LF_DieseaseCasesListDao = /*#__PURE__*/function () {
    var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req) {
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(resolve) {
                  var response, districtId, year, start_month, end_month, taluka, facility, subCenter, villageId, age;
                  return _regenerator["default"].wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          response = {};
                          districtId = "and  \"districtId\" = ".concat(req.body.districtId);
                          year = "and year = ".concat(req.body.year);
                          start_month = "and  \"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);
                          taluka = "and  \"talukaId\" = ".concat(req.body.talukaId);
                          facility = "and  \"facilityId\" = ".concat(req.body.facilityId);
                          subCenter = "and  \"subCenterId\" = ".concat(req.body.subCenterId);
                          villageId = "and  \"villageId\" = ".concat(req.body.villageId); //var diseaseType = `and  "diseaseType" like '%${req.body.diseaseType}%'`;
                          //var gender = `and  "gender" = '${req.body.genderId}'`;

                          //var diseaseType = `and  "diseaseType" like '%${req.body.diseaseType}%'`;
                          //var gender = `and  "gender" = '${req.body.genderId}'`;
                          age = "and A1.\"ageGroup\" like '%".concat(req.body.age, "%'"); // var groupByDistrictId = `, "districtId"`;
                          // var groupByYear = `, year`;
                          // var groupByTaluka = `, "talukaId"`;
                          // var groupByFacility = `, "facilityId"`;
                          // var groupBySubCenter = `,  "subCenterId"`;
                          // var groupByVillageId = `,  "villageId"`;

                          // var groupByDistrictId = `, "districtId"`;
                          // var groupByYear = `, year`;
                          // var groupByTaluka = `, "talukaId"`;
                          // var groupByFacility = `, "facilityId"`;
                          // var groupBySubCenter = `,  "subCenterId"`;
                          // var groupByVillageId = `,  "villageId"`;
                          if (req.body.districtId.length == 0) {
                            districtId = ""; //groupByDistrictId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = ""; //groupByYear = "";
                          }

                          if (req.body.talukaId.length == 0) {
                            taluka = ""; //groupByTaluka = "";
                          }

                          if (req.body.facilityId.length == 0) {
                            facility = ""; //groupByFacility = "";
                          }

                          if (req.body.subCenterId.length == 0) {
                            subCenter = ""; //groupBySubCenter = "";
                          } // if (req.body.genderId.length == 0) {
                          // 	gender = "";
                          // }


                          // if (req.body.genderId.length == 0) {
                          // 	gender = "";
                          // }
                          if (req.body.age.length == 0) {
                            age = "";
                          } // if (req.body.diseaseType.length == 0) {
                          // 	diseaseType = "";
                          // }


                          // if (req.body.diseaseType.length == 0) {
                          // 	diseaseType = "";
                          // }
                          if (req.body.villageId.length == 0) {
                            villageId = ""; //groupByVillageId = "";
                          }

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  \"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          _sequelize["default"].sequelize.query("\n\t\t\t\tselect A1.\"ageGroup\",COALESCE(A2.\"noLFPatientsMale\",0) \"noLFPatientsMale\" ,\n\t\t\t\tCOALESCE(A3.\"noLFPatientsFemale\",0) \"noLFPatientsFemale\",\n\t\t\t\tCOALESCE(A4.\"noHPatientsMale\",0) \"noHPatientsMale\",\n\t\t\t\tCOALESCE(A5.\"noHPatientsFemale\",0) \"noHPatientsFemale\",\n\t\t\t\tCOALESCE(A2.\"noLFPatientsMale\",0) + COALESCE(A4.\"noHPatientsMale\",0) \"noPatientsMale\",\n\t\t\t\tCOALESCE(A3.\"noLFPatientsFemale\",0) + COALESCE(A5.\"noHPatientsFemale\",0) \"noPatientsFemale\"\n\t\t\t\tfrom \n\t\t\t\t(SELECT unnest(ARRAY[col_a, col_b, col_c,col_d]) as \"ageGroup\"\n\t\t\t\tFROM (VALUES('0-15','16-40','41-65','65+')) AS x(col_a, col_b, col_c,col_d))A1\n\t\t\t\tLEFT JOIN\n\t\t\t\t(select  \"ageGroup\",sum(\"noPatients\") \"noLFPatientsMale\" \n\t\t\t\tfrom public.\"vLFDeseaseCases\" \n\t\t\t\twhere  \"diseaseType\" like '%Lymphedema%' and \"gender\" = 'Male'\n\t\t\t\t".concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(districtId, " ").concat(taluka, " \n\t\t\t\t").concat(facility, " ").concat(subCenter, " ").concat(villageId, "\n\t\t\t\tgroup by \"ageGroup\") A2\n\t\t\t\tON A1.\"ageGroup\"=A2.\"ageGroup\"\n\t\t\t\tLEFT JOIN\n\t\t\t\t(select  \"ageGroup\",sum(\"noPatients\") \"noLFPatientsFemale\" \n\t\t\t\tfrom public.\"vLFDeseaseCases\" \n\t\t\t\twhere  \"diseaseType\" like '%Lymphedema%' and \"gender\" = 'Female'\n\t\t\t\t").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(districtId, " ").concat(taluka, " \n\t\t\t\t").concat(facility, " ").concat(subCenter, " ").concat(villageId, "\n\t\t\t\tgroup by \"ageGroup\") A3\n\t\t\t\tON A1.\"ageGroup\"=A3.\"ageGroup\"\n\t\t\t\tLEFT JOIN\n\t\t\t\t(select  \"ageGroup\",sum(\"noPatients\") \"noHPatientsMale\" \n\t\t\t\tfrom public.\"vLFDeseaseCases\" \n\t\t\t\twhere  \"diseaseType\" like '%Hydrocele%' and \"gender\" = 'Male'\n\t\t\t\t").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(districtId, " ").concat(taluka, " \n\t\t\t\t").concat(facility, " ").concat(subCenter, " ").concat(villageId, " \n\t\t\t\tgroup by \"ageGroup\") A4\n\t\t\t\tON A1.\"ageGroup\"=A4.\"ageGroup\"\n\t\t\t\tLEFT JOIN\n\t\t\t\t(select  \"ageGroup\",sum(\"noPatients\") \"noHPatientsFemale\" \n\t\t\t\tfrom public.\"vLFDeseaseCases\" \n\t\t\t\twhere  \"diseaseType\" like '%Hydrocele%' and \"gender\" = 'Female'\n\t\t\t\t").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(districtId, " ").concat(taluka, " \n\t\t\t\t").concat(facility, " ").concat(subCenter, " ").concat(villageId, " \n\t\t\t\tgroup by \"ageGroup\") A5\n\t\t\t\tON A1.\"ageGroup\"=A5.\"ageGroup\"\n\t\t\t\twhere 1=1 ").concat(age, "\n                ")).then(function (_ref15) {
                            var _ref16 = (0, _slicedToArray2["default"])(_ref15, 2),
                                results = _ref16[0],
                                metadata = _ref16[1];

                            response.error = false;
                            response.data = results;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 20:
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

    return function get_LF_DieseaseCasesListDao(_x7) {
      return _ref13.apply(this, arguments);
    };
  }();

  var get_LF_PendingHydroceleCasesListDao = /*#__PURE__*/function () {
    var _ref17 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req) {
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              return _context10.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(resolve) {
                  var response, districtId, year, start_month, end_month, taluka, facility, gender, age, villageId, wardId, comorbidityType;
                  return _regenerator["default"].wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          response = {};
                          districtId = "and  \"districtId\" = ".concat(req.body.districtId);
                          year = "and  \"year\" = ".concat(req.body.year);
                          start_month = "and  \"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);
                          taluka = "and  \"talukaId\" = ".concat(req.body.taluka);
                          facility = "and  \"facilityId\" = ".concat(req.body.facilityId);
                          gender = "and  \"gender\" = ".concat(req.body.gender);
                          age = "where \"AgeGroup\" like '%".concat(req.body.age, "%'");
                          villageId = "and  \"villageId\" = ".concat(req.body.villageId);
                          wardId = "and  \"wardId\" = ".concat(req.body.wardId);
                          comorbidityType = "and  \"comorbidityType\" like '%".concat(req.body.comorbidityType, "%'"); // var surgeryNotPossibleReasonsId = `and  HF."surgeryNotPossibleReasonsId" = ${req.body.surgeryNotPossibleReasonsId} `;

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
                            start_month = "and  L.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.comorbidityType.length == 0) {
                            comorbidityType = "";
                          }

                          if (req.body.wardId.length == 0) {
                            wardId = "";
                          }

                          if (req.body.villageId.length == 0) {
                            villageId = "";
                          } // if (req.body.surgeryNotPossibleReasonsId.length == 0) {
                          // 	surgeryNotPossibleReasonsId = "";
                          // }
                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // if (req.body.surgeryNotPossibleReasonsId.length == 0) {
                          // 	surgeryNotPossibleReasonsId = "";
                          // }
                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n\t\t\t\tselect A1.\"districtId\",A1.\"districtName\",\n\t\t\t\tA1.\"nameOfUnitId\",VC.\"nameOfControlUnit\",\n\t\t\t\tCoalesce(A2.\"NoOfCasesH1\",0) \"noOfCasesH1\",\n\t\t\t\tCoalesce(A3.\"NoOfCasesH2\",0) \"noOfCasesH2\",\n\t\t\t\tCoalesce(A4.\"NoOfCasesH3\",0) \"noOfCasesH3\",\n\t\t\t\tCoalesce(A5.\"NoOfCasesH4\",0) \"noOfCasesH4\",\n\t\t\t\tCoalesce(A1.\"NoOfCases\",0) \"noOfCases\",\n\t\t\t\tCoalesce(A6.\"NoOfCasesOperated\",0) \"noOfCasesOperated\",\n\t\t\t\tCoalesce(A8.\"NoOfCasesIneligible\",0) \"noOfCasesIneligible\",\n\t\t\t\tCoalesce(A7.\"NoOfCasesPending\",0) \"noOfCasesPending\"\n\t\t\t\tfrom \n\t\t\t\t(select A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\",\n\t\t\t\tcount(A.id) as \"NoOfCases\" from \n\t\t\t\t(select * from public.\"vPendingHydroceleCases\" where 1=1 \n\t\t\t\t".concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(taluka, " ").concat(facility, " ").concat(gender, "\n\t\t\t\t").concat(comorbidityType, " ").concat(wardId, " ").concat(villageId, " ").concat(age, "\n\t\t\t\t) A \n\t\t\t\tgroup by A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\")A1\n\t\t\t\tleft join \n\t\t\t\t(select A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\",\n\t\t\t\tcount(A.id) as \"NoOfCasesH1\" from \n\t\t\t\t(select * from public.\"vPendingHydroceleCases\" where 1=1 \n\t\t\t\t").concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(taluka, " ").concat(facility, " ").concat(gender, "\n\t\t\t\t").concat(comorbidityType, " ").concat(wardId, " ").concat(villageId, " ").concat(age, "\n\t\t\t\t) A where A.\"stageOfHydrocele\"=1\n\t\t\t\tgroup by A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\")A2\n\t\t\t\tON A1.\"nameOfUnitId\"=A2.\"nameOfUnitId\" and A1.\"districtId\"=A2.\"districtId\"\n\t\t\t\tleft join \n\t\t\t\t(select A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\",\n\t\t\t\tcount(A.id) as \"NoOfCasesH2\" from \n\t\t\t\t(select * from public.\"vPendingHydroceleCases\" where 1=1 \n\t\t\t\t").concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(taluka, " ").concat(facility, " ").concat(gender, "\n\t\t\t\t").concat(comorbidityType, " ").concat(wardId, " ").concat(villageId, " ").concat(age, "\n\t\t\t\t) A where A.\"stageOfHydrocele\"=2\n\t\t\t\tgroup by A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\")A3\n\t\t\t\tON A1.\"nameOfUnitId\"=A3.\"nameOfUnitId\" and A1.\"districtId\"=A3.\"districtId\"\n\t\t\t\tleft join \n\t\t\t\t(select A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\",\n\t\t\t\tcount(A.id) as \"NoOfCasesH3\" from \n\t\t\t\t(select * from public.\"vPendingHydroceleCases\" where 1=1 \n\t\t\t\t").concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(taluka, " ").concat(facility, " ").concat(gender, "\n\t\t\t\t").concat(comorbidityType, " ").concat(wardId, " ").concat(villageId, " ").concat(age, "\n\t\t\t\t) A where A.\"stageOfHydrocele\"=3\n\t\t\t\tgroup by A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\")A4\n\t\t\t\tON A1.\"nameOfUnitId\"=A4.\"nameOfUnitId\" and A1.\"districtId\"=A4.\"districtId\"\n\t\t\t\tleft join \n\t\t\t\t(select A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\",\n\t\t\t\tcount(A.id) as \"NoOfCasesH4\" from \n\t\t\t\t(select * from public.\"vPendingHydroceleCases\" where 1=1 \n\t\t\t\t").concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(taluka, " ").concat(facility, " ").concat(gender, "\n\t\t\t\t").concat(comorbidityType, " ").concat(wardId, " ").concat(villageId, " ").concat(age, "\n\t\t\t\t) A where A.\"stageOfHydrocele\"=4\n\t\t\t\tgroup by A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\")A5\n\t\t\t\tON A1.\"nameOfUnitId\"=A5.\"nameOfUnitId\" and A1.\"districtId\"=A5.\"districtId\"\n\t\t\t\tleft join \n\t\t\t\t(select A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\",\n\t\t\t\tcount(A.id) as \"NoOfCasesOperated\" from \n\t\t\t\t(select * from public.\"vPendingHydroceleCases\" where 1=1 \n\t\t\t\t").concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(taluka, " ").concat(facility, " ").concat(gender, "\n\t\t\t\t").concat(comorbidityType, " ").concat(wardId, " ").concat(villageId, " ").concat(age, "\n\t\t\t\t) A where A.\"isSurgeryDone\"=true\n\t\t\t\tgroup by A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\")A6\n\t\t\t\tON A1.\"nameOfUnitId\"=A6.\"nameOfUnitId\" and A1.\"districtId\"=A6.\"districtId\"\n\t\t\t\tleft join \n\t\t\t\t(select A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\",\n\t\t\t\tcount(A.id) as \"NoOfCasesPending\" from \n\t\t\t\t(select * from public.\"vPendingHydroceleCases\" where 1=1 \n\t\t\t\t").concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(taluka, " ").concat(facility, " ").concat(gender, "\n\t\t\t\t").concat(comorbidityType, " ").concat(wardId, " ").concat(villageId, " ").concat(age, "\n\t\t\t\t) A where A.\"surgeryNotPossibleReasons\"='Pending/Absent'\n\t\t\t\tgroup by A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\")A7\n\t\t\t\tON A1.\"nameOfUnitId\"=A7.\"nameOfUnitId\" and A1.\"districtId\"=A7.\"districtId\"\n\t\t\t\tleft join \n\t\t\t\t(select A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\",\n\t\t\t\tcount(A.id) as \"NoOfCasesIneligible\" from \n\t\t\t\t(select * from public.\"vPendingHydroceleCases\" where 1=1 \n\t\t\t\t").concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(taluka, " ").concat(facility, " ").concat(gender, "\n\t\t\t\t").concat(comorbidityType, " ").concat(wardId, " ").concat(villageId, " ").concat(age, "\n\t\t\t\t) A where A.\"surgeryNotPossibleReasons\" is not null \n\t\t\t\tand  A.\"surgeryNotPossibleReasons\"<>'Pending/Absent'\n\t\t\t\tgroup by A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\")A8\n\t\t\t\tON A1.\"nameOfUnitId\"=A8.\"nameOfUnitId\" and A1.\"districtId\"=A8.\"districtId\"\n\t\t\t\tleft join public.\"verticalControlUnits\" VC\n\t\t\t\tON VC.id=A1.\"nameOfUnitId\"\n        \t\t")).then(function (_ref19) {
                            var _ref20 = (0, _slicedToArray2["default"])(_ref19, 2),
                                results = _ref20[0],
                                metadata = _ref20[1];

                            response.error = false;
                            response.data = results;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 24:
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

    return function get_LF_PendingHydroceleCasesListDao(_x9) {
      return _ref17.apply(this, arguments);
    };
  }();

  var LF_MMDPActivityReportingDao = /*#__PURE__*/function () {
    var _ref21 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req) {
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              return _context12.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref22 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(resolve) {
                  var response, districtId, year, start_month, end_month, taluka, facility, gender, age;
                  return _regenerator["default"].wrap(function _callee11$(_context11) {
                    while (1) {
                      switch (_context11.prev = _context11.next) {
                        case 0:
                          response = {};
                          districtId = "and  l.\"districtId\" = ".concat(req.body.districtId);
                          year = "and  l.\"year\" = ".concat(req.body.year);
                          start_month = "and  l.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);
                          taluka = "and  l.\"talukaId\" = ".concat(req.body.taluka);
                          facility = "and  l.\"facilityId\" = ".concat(req.body.facilityId);
                          gender = "and  l.\"gender\" = ".concat(req.body.gender);
                          age = "where l.\"AgeGroup\" like '%".concat(req.body.age, "%'");

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  l.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
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
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n\t\t\t\t\tselect A1.\"districtId\",D.\"districtName\",A1.\"nameOfUnit\" \"nameOfUnitId\",\n\t\t\t\t\tVC.\"nameOfControlUnit\",A1.\"facilityId\", F.\"facilityName\", \n\t\t\t\t\tCoalesce(A1.\"totalCases\",0) \"totalCases\",\n\t\t\t\t\tCoalesce(A2.\"followUpDone\",0) \"followUpDone\",  \n\t\t\t\t\tCoalesce(A3.\"lostToFollowUp\",0) \"lostToFollowUp\",\n\t\t\t\t\tCoalesce(A4.\"mmdpTrained\",0) \"mmdpTrained\",  \n\t\t\t\t\tCoalesce(A5.\"balancedToTrained\",0) \"balancedToTrained\",  \n\t\t\t\t\tCoalesce(A6.\"patientFollowingMM\",0) \"patientFollowingMM\",  \n\t\t\t\t\tCoalesce(A7.\"mmdpKitGiven\",0) \"mmdpKitGiven\",  \n\t\t\t\t\tCoalesce(A8.\"medicineGiven\",0) \"medicineGiven\"\n\t\t\t\t\tfrom\n\t\t\t\t\t(select l.\"districtId\",l.\"nameOfUnit\",l.\"facilityId\", count(id) \"totalCases\" \n\t\t\t\t\tfrom public.\"vMMDPReporting\" l where l.\"diseaseType\" like '%Lymphedema%'\n\t\t\t\t\t".concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(taluka, " ").concat(facility, " ").concat(gender, " ").concat(age, "\n\t\t\t\t\tgroup by l.\"districtId\",l.\"nameOfUnit\",l.\"facilityId\") A1\n\t\t\t\t\tleft join\n\t\t\t\t\t(select l.\"districtId\",l.\"nameOfUnit\",l.\"facilityId\", count(l.id) \"followUpDone\" \n\t\t\t\t\tfrom public.\"vMMDPReporting\" l \n\t\t\t\t\tinner join lateral\n\t\t\t\t\t(select * from public.\"lymphedemaLineListFollowUpsLves\"  where \"lymphedemaLineListId\"= l.id \n\t\t\t\t\t and Coalesce(\"followUpLostReasonsId\",0)=0 and \"isActive\"=true limit 1 )lf on true\n\t\t\t\t\twhere l.\"diseaseType\" like '%Lymphedema%'\n\t\t\t\t\t").concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(taluka, " ").concat(facility, " ").concat(gender, " ").concat(age, "\n\t\t\t\t\tgroup by l.\"districtId\",l.\"nameOfUnit\",l.\"facilityId\") A2\n\t\t\t\t\ton A1.\"districtId\"=A2.\"districtId\" and A1.\"nameOfUnit\"=A2.\"nameOfUnit\" and A1.\"facilityId\"=A2.\"facilityId\"\n\t\t\t\t\tleft join\n\t\t\t\t\t(select l.\"districtId\",l.\"nameOfUnit\",l.\"facilityId\", count(l.id) \"lostToFollowUp\" \n\t\t\t\t\tfrom public.\"vMMDPReporting\" l \n\t\t\t\t\tinner join lateral\n\t\t\t\t\t(select * from public.\"lymphedemaLineListFollowUpsLves\"  where \"lymphedemaLineListId\"= l.id \n\t\t\t\t\t and Coalesce(\"followUpLostReasonsId\",0)<>0 and \"isActive\"=true limit 1 )lf on true\n\t\t\t\t\twhere l.\"diseaseType\" like '%Lymphedema%'\n\t\t\t\t\t").concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(taluka, " ").concat(facility, " ").concat(gender, " ").concat(age, "\n\t\t\t\t\tgroup by l.\"districtId\",l.\"nameOfUnit\",l.\"facilityId\") A3\n\t\t\t\t\ton A1.\"districtId\"=A3.\"districtId\" and A1.\"nameOfUnit\"=A3.\"nameOfUnit\" and A1.\"facilityId\"=A3.\"facilityId\"\n\t\t\t\t\tleft join\n\t\t\t\t\t(select l.\"districtId\",l.\"nameOfUnit\",l.\"facilityId\", count(l.id) \"mmdpTrained\" \n\t\t\t\t\tfrom public.\"vMMDPReporting\" l \n\t\t\t\t\tinner join lateral\n\t\t\t\t\t(select * from public.\"lymphedemaLineListFollowUpsLves\"  where \"lymphedemaLineListId\"= l.id \n\t\t\t\t\t and Coalesce(\"isServiceMMDPTrainingGiven\",false)=true and \"isActive\"=true limit 1 )lf on true\n\t\t\t\t\twhere l.\"diseaseType\" like '%Lymphedema%'\n\t\t\t\t\t").concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(taluka, " ").concat(facility, " ").concat(gender, " ").concat(age, "\n\t\t\t\t\tgroup by l.\"districtId\",l.\"nameOfUnit\",l.\"facilityId\") A4\n\t\t\t\t\ton A1.\"districtId\"=A4.\"districtId\" and A1.\"nameOfUnit\"=A4.\"nameOfUnit\" and A1.\"facilityId\"=A4.\"facilityId\"\n\t\t\t\t\tleft join\n\t\t\t\t\t(select l.\"districtId\",l.\"nameOfUnit\",l.\"facilityId\", count(l.id) \"balancedToTrained\" \n\t\t\t\t\tfrom public.\"vMMDPReporting\" l \n\t\t\t\t\tinner join lateral\n\t\t\t\t\t(select * from public.\"lymphedemaLineListFollowUpsLves\"  where \"lymphedemaLineListId\"= l.id \n\t\t\t\t\t and Coalesce(\"isServiceMMDPTrainingGiven\",true)=false and \"isActive\"=true limit 1 )lf on true\n\t\t\t\t\twhere l.\"diseaseType\" like '%Lymphedema%'\n\t\t\t\t\t").concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(taluka, " ").concat(facility, " ").concat(gender, " ").concat(age, "\n\t\t\t\t\tgroup by l.\"districtId\",l.\"nameOfUnit\",l.\"facilityId\") A5\n\t\t\t\t\ton A1.\"districtId\"=A5.\"districtId\" and A1.\"nameOfUnit\"=A5.\"nameOfUnit\" and A1.\"facilityId\"=A5.\"facilityId\"\n\t\t\t\t\tleft join\n\t\t\t\t\t(select l.\"districtId\",l.\"nameOfUnit\",l.\"facilityId\", count(l.id) \"patientFollowingMM\" \n\t\t\t\t\tfrom public.\"vMMDPReporting\" l \n\t\t\t\t\tinner join lateral\n\t\t\t\t\t(select * from public.\"lymphedemaLineListFollowUpsLves\"  where \"lymphedemaLineListId\"= l.id \n\t\t\t\t\t and Coalesce(\"isServicePatientFollowingMM\",false)=true and \"isActive\"=true limit 1 )lf on true\n\t\t\t\t\twhere l.\"diseaseType\" like '%Lymphedema%'\n\t\t\t\t\t").concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(taluka, " ").concat(facility, " ").concat(gender, " ").concat(age, "\n\t\t\t\t\tgroup by l.\"districtId\",l.\"nameOfUnit\",l.\"facilityId\")A6\n\t\t\t\t\ton A1.\"districtId\"=A6.\"districtId\" and A1.\"nameOfUnit\"=A6.\"nameOfUnit\" and A1.\"facilityId\"=A6.\"facilityId\"\n\t\t\t\t\tleft join\n\t\t\t\t\t(select l.\"districtId\",l.\"nameOfUnit\",l.\"facilityId\", count(l.id) \"mmdpKitGiven\" \n\t\t\t\t\tfrom public.\"vMMDPReporting\" l \n\t\t\t\t\tinner join lateral\n\t\t\t\t\t(select * from public.\"lymphedemaLineListFollowUpsLves\"  where \"lymphedemaLineListId\"= l.id \n\t\t\t\t\t and Coalesce(\"isServiceMMDPKitGiven\",false)=true and \"isActive\"=true limit 1 )lf on true\n\t\t\t\t\twhere l.\"diseaseType\" like '%Lymphedema%'\n\t\t\t\t\t").concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(taluka, " ").concat(facility, " ").concat(gender, " ").concat(age, "\n\t\t\t\t\tgroup by l.\"districtId\",l.\"nameOfUnit\",l.\"facilityId\") A7\n\t\t\t\t\ton A1.\"districtId\"=A7.\"districtId\" and A1.\"nameOfUnit\"=A7.\"nameOfUnit\" and A1.\"facilityId\"=A7.\"facilityId\"\n\t\t\t\t\tleft join\n\t\t\t\t\t(select l.\"districtId\",l.\"nameOfUnit\",l.\"facilityId\", count(l.id) \"medicineGiven\" \n\t\t\t\t\tfrom public.\"vMMDPReporting\" l \n\t\t\t\t\tinner join lateral\n\t\t\t\t\t(select * from public.\"lymphedemaLineListFollowUpsLves\"  where \"lymphedemaLineListId\"= l.id \n\t\t\t\t\t and Coalesce(\"isServiceMedicineGiven\",false)=true and \"isActive\"=true limit 1 )lf on true\n\t\t\t\t\twhere l.\"diseaseType\" like '%Lymphedema%'\n\t\t\t\t\t").concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(taluka, " ").concat(facility, " ").concat(gender, " ").concat(age, "\n\t\t\t\t\tgroup by l.\"districtId\",l.\"nameOfUnit\",l.\"facilityId\") A8\n\t\t\t\t\ton A1.\"districtId\"=A8.\"districtId\" and A1.\"nameOfUnit\"=A8.\"nameOfUnit\" and A1.\"facilityId\"=A8.\"facilityId\"\n\t\t\t\t\tleft join districts D ON D.id = A1.\"districtId\"\n\t\t\t\t\tleft join public.\"verticalControlUnits\" VC ON VC.id=A1.\"nameOfUnit\"\n\t\t\t\t\tleft join public.facilities F ON F.id=A1.\"facilityId\"\n\t\t\t\t")).then(function (_ref23) {
                            var _ref24 = (0, _slicedToArray2["default"])(_ref23, 2),
                                results = _ref24[0],
                                metadata = _ref24[1];

                            response.error = false;
                            response.data = results;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 18:
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

    return function LF_MMDPActivityReportingDao(_x11) {
      return _ref21.apply(this, arguments);
    };
  }();

  var get_LF_PatientsineligibleForSurgery = /*#__PURE__*/function () {
    var _ref25 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req) {
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              return _context14.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref26 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(resolve) {
                  var response, districtId, year, start_month, end_month, taluka, facility, gender, age;
                  return _regenerator["default"].wrap(function _callee13$(_context13) {
                    while (1) {
                      switch (_context13.prev = _context13.next) {
                        case 0:
                          response = {};
                          districtId = "and  L.\"districtId\" = ".concat(req.body.districtId);
                          year = "and  L.\"year\" = ".concat(req.body.year);
                          start_month = "and  L.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);
                          taluka = "and  L.\"talukaId\" = ".concat(req.body.taluka);
                          facility = "and  L.\"facilityId\" = ".concat(req.body.facilityId);
                          gender = "and  L.\"gender\" = ".concat(req.body.gender);
                          age = "where A.\"AgeGroup\" like '%".concat(req.body.age, "%'");

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  L.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
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
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select * from (select L.Year,L.Month,L.\"districtId\",D.\"districtName\",\n            L.\"nameOfPatient\",L.\"patientId\",\n            L.\"talukaId\",T.\"talukaName\",C.\"corporationName\",L.\"facilityId\",F.\"facilityName\",Sb.\"subCenterName\",\n            L.\"villageId\",V.\"villageName\",L.town,W.\"wardName\",L.\"ageYears\",L.\"ageMonths\",\n            (case when L.\"ageYears\"<16 then '0-15' when L.\"ageYears\"<41 then '16-40'\n              when L.\"ageYears\"<66 then '46-65' else  '65+' end) AS \"AgeGroup\",\t\n            U.\"categoryOptionName\" As \"gender\",\n            L.\"patientMobileNumber\",L.\"permanentAddressLine1\",L.\"permanentAddressLine2\",\n            D1.\"districtName\" as City,HF.\"isSurgeryDone\",\n            S.\"stateName\",L.\"permanentAddressPINCode\",\tHF.\"stageOfHydrocele\",\n            L.\"isAffectedLeftScrotum\",L.\"isAffectedRightScrotum\", L.grading,L.\"diseaseLastedYears\",\n            L.\"diseaseLastedMonths\",L.\"isPresenceOfBlisters\",\tHF.\"serviceProviderName\",\n            HF.\"serviceProviderDesignation\",HF.\"serviceProviderPlace\",'' AS \"ServiceGiven\",\n            HF.\"serviceProviderPhone\",LS.\"verifiedByDoctorName\", HF.\"surgeryNotPossibleReasonsId\",\n            UD.\"categoryOptionName\" AS \"surgeryNotPossibleReason\",\n            L.\"diseaseType\" ,HF.\"comorbidityType\",UD.\"categoryOptionName\"\n        from public.\"lymphedemaLineLists\" L\n        left join public.\"lymphedemaLineListSurveys\" LS on LS.\"lymphedemaLineListId\"  = L.id\n        left join public.\"lymphedemaLineListFollowUpsHFs\" HF on HF.\"lymphedemaLineListId\" = L.id\n        left join public.\"lymphedemaLineListFollowUpsLves\" LF on LF.\"lymphedemaLineListId\" = L.id\n        left join public.corporations C on C.id = L.\"corporationId\"\n        left join public.districts D on D.id = L.\"districtId\"\n        left join public.facilities F on F.id = L.\"facilityId\"\n        left join public.\"subCenters\" Sb on Sb.id = L.\"subCenterId\"\n        left join public.talukas T on T.id = L.\"talukaId\"\n        left join public.villages V on V.id = L.\"villageId\"\n        left join public.wards W on W.id = L.\"wardId\"\n        left join public.zones Z on Z.id = L.\"zoneId\"\n        left join public.facilities F1 on F1.id = HF.\"nameOfHospitalSurgeryDoneId\"\n        left join public.states S on S.id = L.\"permanentAddressState\"\n        left join public.districts D1 on D1.\"districtName\" = L.\"permanentAddressCity\"\n        left join public.\"udCategoryOptions\" UD on UD.id=HF.\"surgeryNotPossibleReasonsId\"\n        left join public.\"udCategoryOptions\" U ON U.id=L.gender\n        where HF.\"surgeryNotPossibleReasonsId\" is not null and L.\"diseaseType\" like '%Hydrocele%'\n        and L.\"isActive\"=true\n        ".concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(taluka, " ").concat(facility, " ").concat(gender, "\n        ) A ").concat(age, "\n        ")).then(function (_ref27) {
                            var _ref28 = (0, _slicedToArray2["default"])(_ref27, 2),
                                results = _ref28[0],
                                metadata = _ref28[1];

                            response.error = false;
                            response.data = results;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 18:
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

    return function get_LF_PatientsineligibleForSurgery(_x13) {
      return _ref25.apply(this, arguments);
    };
  }();

  var VerifiedbyMODao = /*#__PURE__*/function () {
    var _ref29 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req) {
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              return _context16.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref30 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(resolve) {
                  var response, districtId, year, start_month, end_month, taluka, facility, gender, villageId, wardId, age;
                  return _regenerator["default"].wrap(function _callee15$(_context15) {
                    while (1) {
                      switch (_context15.prev = _context15.next) {
                        case 0:
                          response = {};
                          districtId = "and  \"districtId\" = ".concat(req.body.districtId);
                          year = "and  \"year\" = ".concat(req.body.year);
                          start_month = "and  \"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);
                          taluka = "and  \"talukaId\" = ".concat(req.body.talukaId);
                          facility = "and  \"facilityId\" = ".concat(req.body.facilityId);
                          gender = "and  \"gender\" = ".concat(req.body.gender);
                          villageId = "and  \"villageId\" = ".concat(req.body.villageId);
                          wardId = "and  \"wardId\" = ".concat(req.body.wardId);
                          age = "where \"AgeGroup\" like '%".concat(req.body.age, "%'"); // var isVerified = `and  LF."isVerified" = ${req.body.isVerified}`;

                          // var isVerified = `and  LF."isVerified" = ${req.body.isVerified}`;
                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  \"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
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
                          } // if (req.body.isVerified.length == 0) {
                          // 	isVerified = "";
                          // }
                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // if (req.body.isVerified.length == 0) {
                          // 	isVerified = "";
                          // }
                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n\t\t\t\tselect A1.\"districtName\",A1. \"diseaseType\",\n\t\t\t\tA1.\"nameOfUnitId\",VC.\"nameOfControlUnit\",\n\t\t\t\tA1.\"facilityId\", F.\"facilityName\",\n\t\t\t\tCoalesce(A1.\"noOfCases\",0) \"noOfCases\",\n\t\t\t\tCoalesce(A2.\"noOfCasesVerified\",0) \"noOfCasesVerified\",\n\t\t\t\t(Coalesce(A1.\"noOfCases\",0)-Coalesce(A2.\"noOfCasesVerified\",0)) \"noOfCasesPendingVerification\"\n\t\t\t\tfrom\n\t\t\t\t(select \"districtId\",\"districtName\",\"nameOfUnitId\",\"facilityId\",\n\t\t\t\t\"diseaseType\", count(id) as \"noOfCases\" from public.\"vVerifiedByMO\"\n\t\t\t\twhere 1=1 \n\t\t\t\t".concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(taluka, " ").concat(facility, " ").concat(gender, "\n\t\t\t\t").concat(villageId, " ").concat(wardId, "  ").concat(age, "\n\t\t\t\tgroup by \"districtId\",\"districtName\",\"nameOfUnitId\",\"facilityId\",\"diseaseType\")A1\n\t\t\t\tleft join\n\t\t\t\t(select \"districtId\",\"districtName\",\"nameOfUnitId\",\"facilityId\",\n\t\t\t\t\"diseaseType\",count(id) as \"noOfCasesVerified\" from public.\"vVerifiedByMO\"\n\t\t\t\twhere \"isVerified\"=true \n\t\t\t\t").concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(taluka, " ").concat(facility, " ").concat(gender, "\n\t\t\t\t").concat(villageId, " ").concat(wardId, "  ").concat(age, "\n\t\t\t\tgroup by \"districtId\",\"districtName\",\"nameOfUnitId\",\"facilityId\",\"diseaseType\")A2\n\t\t\t\ton A1.\"districtId\"=A2.\"districtId\" and A1.\"nameOfUnitId\"=A2.\"nameOfUnitId\"\n\t\t\t\tand A1.\"facilityId\"=A2.\"facilityId\" and A1.\"diseaseType\"=A2.\"diseaseType\"\n\t\t\t\tleft join public.\"verticalControlUnits\" VC\n\t\t\t\tON VC.id=A1.\"nameOfUnitId\"\n\t\t\t\tleft join public.facilities F ON F.id=A1.\"facilityId\"\n        \t\t")).then(function (_ref31) {
                            var _ref32 = (0, _slicedToArray2["default"])(_ref31, 2),
                                results = _ref32[0],
                                metadata = _ref32[1];

                            response.error = false;
                            response.data = results;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 22:
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

    return function VerifiedbyMODao(_x15) {
      return _ref29.apply(this, arguments);
    };
  }();

  var LF_PerformanceOfInstitutesDao = /*#__PURE__*/function () {
    var _ref33 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(req) {
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              return _context18.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref34 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(resolve) {
                  var response, districtId, year, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee17$(_context17) {
                    while (1) {
                      switch (_context17.prev = _context17.next) {
                        case 0:
                          response = {};
                          districtId = "and  \"districtId\" = ".concat(req.body.districtId);
                          year = "and  \"year\" = ".concat(req.body.year);
                          start_month = "and  \"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  \"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n\t\t\t\tselect A1.\"districtId\",A1.\"districtName\",\n\t\t\t\tA1.\"nameOfUnitId\",VC.\"nameOfControlUnit\",\n\t\t\t\tA1.\"facilityId\", F.\"facilityName\", \n\t\t\t\tCoalesce(A1.\"NoOfCases\",0) \"noOfCases\",\n\t\t\t\tCoalesce(A2.\"NoOfSurgeriesPerformed\",0) \"noOfSurgeriesPerformed\",\n\t\t\t\tCoalesce(Coalesce(A1.\"NoOfCases\",0)-Coalesce(A2.\"NoOfSurgeriesPerformed\",0),0) \"noOfSurgeriesPending\"\n\t\t\t\tfrom\n\t\t\t\t(select A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\",\n\t\t\t\tA.\"facilityId\",count(A.id) as \"NoOfCases\" \n\t\t\t\tfrom\n\t\t\t\t(select * from public.\"vPendingHydroceleCases\" where 1=1\n\t\t\t\t".concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, "\n\t\t\t\t) A\n\t\t\t\tgroup by A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\",A.\"facilityId\")A1\t\n\t\t\t\tleft join\n\t\t\t\t(select A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\",\n\t\t\t\tA.\"facilityId\",count(A.id) as \"NoOfSurgeriesPerformed\" \n\t\t\t\tfrom\n\t\t\t\t(select * from public.\"vPendingHydroceleCases\"  \n\t\t\t\twhere \"isSurgeryDone\"=true\n\t\t\t\t").concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, "\n\t\t\t\t) A\n\t\t\t\tgroup by A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\",A.\"facilityId\")A2\n\t\t\t\tON A1.\"nameOfUnitId\"=A2.\"nameOfUnitId\" and A1.\"districtId\"=A2.\"districtId\"\n\t\t\t\tand A1.\"facilityId\"=A2.\"facilityId\"\n\t\t\t\t\n\t\t\t\tleft join public.\"verticalControlUnits\" VC\n\t\t\t\tON VC.id=A1.\"nameOfUnitId\"\n\t\t\t\tleft join public.facilities F ON F.id=A1.\"facilityId\"\n        \t\t")).then(function (_ref35) {
                            var _ref36 = (0, _slicedToArray2["default"])(_ref35, 2),
                                results = _ref36[0],
                                metadata = _ref36[1];

                            response.error = false;
                            response.data = results;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 10:
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

    return function LF_PerformanceOfInstitutesDao(_x17) {
      return _ref33.apply(this, arguments);
    };
  }();

  var LF_PerformanceOfSurgeonsDao = /*#__PURE__*/function () {
    var _ref37 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20(req) {
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              return _context20.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref38 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(resolve) {
                  var response, districtId, year, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee19$(_context19) {
                    while (1) {
                      switch (_context19.prev = _context19.next) {
                        case 0:
                          response = {};
                          districtId = "and  \"districtId\" = ".concat(req.body.districtId);
                          year = "and  \"year\" = ".concat(req.body.year);
                          start_month = "and  \"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  \"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n\t\t\t\t\tselect A1.\"districtId\",A1.\"districtName\",\n\t\t\t\t\tA1.\"nameOfUnitId\",VC.\"nameOfControlUnit\",\n\t\t\t\t\tA1.\"facilityId\", F.\"facilityName\",A1.\"nameOfSurgeon\",\n\t\t\t\t\tCoalesce(A1.\"NoOfSurgeriesPerformed\",0) \"noOfSurgeriesPerformed\"\n\t\t\t\t\tfrom\n\t\t\t\t\t(select A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\",\n\t\t\t\t\t A.\"facilityId\",A.\"nameOfSurgeon\",count(A.id) as \"NoOfSurgeriesPerformed\" \n\t\t\t\t\tfrom\n\t\t\t\t\t(select * from public.\"vPendingHydroceleCases\" where \"isSurgeryDone\"=true\n\t\t\t\t\t".concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, "\n\t\t\t\t\t) A where A.\"isSurgeryDone\"=true\n\t\t\t\t\tgroup by A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\",A.\"facilityId\",A.\"nameOfSurgeon\")A1\t\n\t\t\t\t\tleft join public.\"verticalControlUnits\" VC\n\t\t\t\t\tON VC.id=A1.\"nameOfUnitId\"\n\t\t\t\t\tleft join public.facilities F ON F.id=A1.\"facilityId\"\n        \t\t")).then(function (_ref39) {
                            var _ref40 = (0, _slicedToArray2["default"])(_ref39, 2),
                                results = _ref40[0],
                                metadata = _ref40[1];

                            response.error = false;
                            response.data = results;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 10:
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

    return function LF_PerformanceOfSurgeonsDao(_x19) {
      return _ref37.apply(this, arguments);
    };
  }();

  var PlanningForOTDao = /*#__PURE__*/function () {
    var _ref41 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22(req) {
      return _regenerator["default"].wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              return _context22.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref42 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21(resolve) {
                  var response, districtId, year, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee21$(_context21) {
                    while (1) {
                      switch (_context21.prev = _context21.next) {
                        case 0:
                          response = {};
                          districtId = "and  O.\"districtId\" = ".concat(req.body.districtId);
                          year = "and  O.\"year\" = ".concat(req.body.year);
                          start_month = "and  O.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  O.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select O.year,O.month,O.\"districtId\",D.\"districtName\",\n\t\t\tF1.\"facilityName\",\n            O.\"nameOfInstitutionOT\",O.\"noOfAvailableSurgeons\",O.\"noOfAvailableAnaesthetist\",\n            MOT.\"facilityId\" AS \"facilityId\",\n            OS.\"surgeonOrAnesthetist\",OS.\"nameOfDoctor\",OS.\"headquarter\",OS.\"headquarterOther\"\n            from public.\"mappingOfOTs\" O\n            left join public.\"mappingOfOTSurgeons\" OS on OS.\"mappingOfOTId\" =  O.id\n            left join public.districts D on D.id =  O.\"districtId\"\n            left join public.\"mappingOfOTPhcAttachedToTheaters\" MOT on MOT.\"mappingOfOTId\" = O.id\n\t\t\tleft join public.facilities F1 ON F1.id=MOT.\"facilityId\"\n\t\t\twhere O.\"isActive\"=true         \n        \t".concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, "    \n        ")).then(function (_ref43) {
                            var _ref44 = (0, _slicedToArray2["default"])(_ref43, 2),
                                results = _ref44[0],
                                metadata = _ref44[1];

                            response.error = false;
                            response.data = results;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 10:
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

    return function PlanningForOTDao(_x21) {
      return _ref41.apply(this, arguments);
    };
  }();

  var FollowUpServicesLymphedemaDao = /*#__PURE__*/function () {
    var _ref45 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24(req) {
      return _regenerator["default"].wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              return _context24.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref46 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23(resolve) {
                  var response, districtId, year, start_month, end_month, villageId, wardId, facilityId;
                  return _regenerator["default"].wrap(function _callee23$(_context23) {
                    while (1) {
                      switch (_context23.prev = _context23.next) {
                        case 0:
                          response = {};
                          districtId = "and  L.\"districtId\" = ".concat(req.body.districtId);
                          year = "and  L.\"year\" = ".concat(req.body.year);
                          start_month = "and  L.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);
                          villageId = "and  L.\"villageId\" = ".concat(req.body.villageId);
                          wardId = "and  L.\"wardId\" = ".concat(req.body.wardId);
                          facilityId = "and  L.\"facilityId\" = ".concat(req.body.facilityId);

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  L.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.villageId.length == 0) {
                            villageId = "";
                          }

                          if (req.body.wardId.length == 0) {
                            wardId = "";
                          }

                          if (req.body.facilityId.length == 0) {
                            facilityId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select L.\"patientId\",L.\"nameOfPatient\",L.\"year\",L.\"month\",L.\"districtId\",D.\"districtName\",\n            L.\"facilityId\",F.\"facilityName\",L.\"subCenterId\",Sb.\"subCenterName\",L.\"diseaseType\",\n            L.\"villageId\",LS.\"dateOfSurvey\",LS.\"verifiedByDoctorName\",LS.\"dateOfVerification\",\n            LF.\"serviceProviderName\",LF.\"serviceDateOfVisit\",\n            LF.\"isServiceMMDPTrainingGiven\",LF.\"serviceMMDPTrainingDate\",\n            LF.\"isServicePatientFollowingMM\",LF.\"servicePatientFollowingDate\",\n            LF.\"isServiceMMDPKitGiven\",LF.\"serviceMMDPKitGivenDate\",\n            LF.\"isServiceMedicineGiven\",LF.\"serviceMedicineGivenDate\",\n            LF.\"followUpLostReasonsId\",U.\"categoryOptionName\" AS \"followUpLostReason\"\n            from public.\"lymphedemaLineLists\" L\n            left join public.\"lymphedemaLineListSurveys\" LS on LS.\"lymphedemaLineListId\"  = L.id and LS.\"isVerified\"=true\n            left join public.\"lymphedemaLineListFollowUpsLves\" LF on LF.\"lymphedemaLineListId\" = L.id\n            left join public.corporations C on C.id = L.\"corporationId\"\n            left join public.districts D on D.id = L.\"districtId\"\n            left join public.facilities F on F.id = L.\"facilityId\"\n            left join public.\"subCenters\" Sb on Sb.id = L.\"subCenterId\"\n            left join public.villages V on V.id = L.\"villageId\"\n            left join public.\"udCategoryOptions\" U ON U.id=LF.\"followUpLostReasonsId\"\n            where lower(\"diseaseType\") like '%lymphedema%' and L.\"isActive\"=true\n        ".concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, "  ").concat(villageId, " ").concat(wardId, " ").concat(facilityId, "\n        \n        ")).then(function (_ref47) {
                            var _ref48 = (0, _slicedToArray2["default"])(_ref47, 2),
                                results = _ref48[0],
                                metadata = _ref48[1];

                            response.error = false;
                            response.data = results;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 16:
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

    return function FollowUpServicesLymphedemaDao(_x23) {
      return _ref45.apply(this, arguments);
    };
  }();

  var FollowUpServicesHydroceleDao = /*#__PURE__*/function () {
    var _ref49 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26(req) {
      return _regenerator["default"].wrap(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              return _context26.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref50 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25(resolve) {
                  var response, districtId, year, start_month, end_month, villageId, wardId, facilityId;
                  return _regenerator["default"].wrap(function _callee25$(_context25) {
                    while (1) {
                      switch (_context25.prev = _context25.next) {
                        case 0:
                          response = {};
                          districtId = "and  L.\"districtId\" = ".concat(req.body.districtId);
                          year = "and  L.\"year\" = ".concat(req.body.year);
                          start_month = "and  L.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);
                          villageId = "and  L.\"villageId\" = ".concat(req.body.villageId);
                          wardId = "and  L.\"wardId\" = ".concat(req.body.wardId);
                          facilityId = "and  L.\"facilityId\" = ".concat(req.body.facilityId);

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  L.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.villageId.length == 0) {
                            villageId = "";
                          }

                          if (req.body.wardId.length == 0) {
                            wardId = "";
                          }

                          if (req.body.facilityId.length == 0) {
                            facilityId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select L.\"patientId\",L.\"nameOfPatient\",L.\"year\",L.\"month\",L.\"districtId\",D.\"districtName\",\n            L.\"facilityId\",F.\"facilityName\",L.\"subCenterId\",Sb.\"subCenterName\",L.\"diseaseType\",\n            L.\"villageId\",LS.\"dateOfSurvey\",LS.\"verifiedByDoctorName\",LS.\"dateOfVerification\",\n            HF.\"serviceProviderName\",HF.\"isAnyComorbidity\",HF.\"otherComorbidity\",\n            HF.\"isSurgeryDone\",HF.\"dateOfSurgery\",HF.\"nameOfSurgeon\",\n            HF.\"nameOfHospitalSurgeryDoneId\",F1.\"facilityName\" AS \"nameOfHospitalSurgeryDone\",\n            HF.\"stageOfHydrocele\",\"dateOfFollowUpAfterSurgery\",HF.\"findingsDuringSurgeryFollowUp\",\n            HF.\"surgeryNotPossibleReasonsId\",U.\"categoryOptionName\" AS \"surgeryNotPossibleReason\"\n            from public.\"lymphedemaLineLists\" L\n            left join public.\"lymphedemaLineListSurveys\" LS on LS.\"lymphedemaLineListId\"  = L.id and LS.\"isVerified\"=true\n            left join public.\"lymphedemaLineListFollowUpsHFs\" HF on HF.\"lymphedemaLineListId\" = L.id\n            left join public.corporations C on C.id = L.\"corporationId\"\n            left join public.districts D on D.id = L.\"districtId\"\n            left join public.facilities F on F.id = L.\"facilityId\"\n            left join public.\"subCenters\" Sb on Sb.id = L.\"subCenterId\"\n            left join public.villages V on V.id = L.\"villageId\"\n            left join public.facilities F1 on F1.id = HF.\"nameOfHospitalSurgeryDoneId\"\n            left join public.\"udCategoryOptions\" U ON U.id=HF.\"surgeryNotPossibleReasonsId\"\n            where lower(\"diseaseType\") like '%hydrocele%' and  L.\"isActive\"=true\n            ".concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, "  ").concat(villageId, " ").concat(wardId, " ").concat(facilityId, "\n        \n        ")).then(function (_ref51) {
                            var _ref52 = (0, _slicedToArray2["default"])(_ref51, 2),
                                results = _ref52[0],
                                metadata = _ref52[1];

                            response.error = false;
                            response.data = results;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 16:
                        case "end":
                          return _context25.stop();
                      }
                    }
                  }, _callee25);
                }));

                return function (_x26) {
                  return _ref50.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context26.stop();
          }
        }
      }, _callee26);
    }));

    return function FollowUpServicesHydroceleDao(_x25) {
      return _ref49.apply(this, arguments);
    };
  }();

  var get_GradingOfLFPatientsDao = /*#__PURE__*/function () {
    var _ref53 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee28(req) {
      return _regenerator["default"].wrap(function _callee28$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              return _context28.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref54 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27(resolve) {
                  var response, districtId, year, start_month, end_month, taluka, facility, gender, age, villageId, wardId;
                  return _regenerator["default"].wrap(function _callee27$(_context27) {
                    while (1) {
                      switch (_context27.prev = _context27.next) {
                        case 0:
                          response = {};
                          districtId = "and  \"districtId\" = ".concat(req.body.districtId);
                          year = "and  \"year\" = ".concat(req.body.year);
                          start_month = "and  \"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);
                          taluka = "and  \"talukaId\" = ".concat(req.body.taluka);
                          facility = "and  \"facilityId\" = ".concat(req.body.facilityId);
                          gender = "and  \"gender\" = ".concat(req.body.gender);
                          age = "where \"AgeGroup\" like '%".concat(req.body.age, "%'");
                          villageId = "and  \"villageId\" = ".concat(req.body.villageId);
                          wardId = "and  \"wardId\" = ".concat(req.body.wardId);

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
                            start_month = "and  L.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.wardId.length == 0) {
                            wardId = "";
                          }

                          if (req.body.villageId.length == 0) {
                            villageId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n\t\t\t\tselect A1.\"districtId\",A1.\"districtName\",\n\t\t\t\tCoalesce(A1.\"NoOfCases\",0) \"noOfCases\",\n\t\t\t\tA1.\"nameOfUnitId\",VC.\"nameOfControlUnit\",\n\t\t\t\tCoalesce(A2.\"NoOfCasesG1\",0) \"noOfCasesG1\",\n\t\t\t\tCoalesce(A3.\"NoOfCasesG2\",0) \"noOfCasesG2\",\n\t\t\t\tCoalesce(A4.\"NoOfCasesG3\",0) \"noOfCasesG3\",\n\t\t\t\tCoalesce(A5.\"NoOfCasesG4\",0) \"noOfCasesG4\",\n\t\t\t\tCoalesce(A6.\"NoOfCasesG5\",0) \"noOfCasesG5\",\n\t\t\t\tCoalesce(A7.\"NoOfCasesG6\",0) \"noOfCasesG6\",\n\t\t\t\tCoalesce(A8.\"NoOfCasesG7\",0) \"noOfCasesG7\"\n\t\t\t\tfrom \n\t\t\t\t(select A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\",\n\t\t\t\tcount(A.id) as \"NoOfCases\" from \n\t\t\t\t(select * from \"vGradingLF\" where 1=1 \n\t\t\t\t".concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(taluka, " ").concat(facility, " ").concat(gender, "\n\t\t\t\t").concat(wardId, " ").concat(villageId, " ").concat(age, "\n\t\t\t\t) A \n\t\t\t\tgroup by A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\")A1\n\t\t\t\tleft join \n\t\t\t\t(select A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\",\n\t\t\t\tcount(A.id) as \"NoOfCasesG1\" from \n\t\t\t\t(select * from public.\"vGradingLF\" where 1=1 \n\t\t\t\t").concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(taluka, " ").concat(facility, " ").concat(gender, "\n\t\t\t\t").concat(wardId, " ").concat(villageId, " ").concat(age, "\n\t\t\t\t) A where A.\"grading\"=6\n\t\t\t\tgroup by A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\")A2\n\t\t\t\tON A1.\"nameOfUnitId\"=A2.\"nameOfUnitId\" and A1.\"districtId\"=A2.\"districtId\"\n\t\t\t\tleft join \n\t\t\t\t(select A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\",\n\t\t\t\tcount(A.id) as \"NoOfCasesG2\" from \n\t\t\t\t(select * from public.\"vGradingLF\" where 1=1 \n\t\t\t\t").concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(taluka, " ").concat(facility, " ").concat(gender, "\n\t\t\t\t").concat(wardId, " ").concat(villageId, " ").concat(age, "\n\t\t\t\t) A where A.\"grading\"=7\n\t\t\t\tgroup by A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\")A3\n\t\t\t\tON A1.\"nameOfUnitId\"=A3.\"nameOfUnitId\" and A1.\"districtId\"=A3.\"districtId\"\n\t\t\t\tleft join \n\t\t\t\t(select A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\",\n\t\t\t\tcount(A.id) as \"NoOfCasesG3\" from \n\t\t\t\t(select * from public.\"vGradingLF\" where 1=1 \n\t\t\t\t").concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(taluka, " ").concat(facility, " ").concat(gender, "\n\t\t\t\t").concat(wardId, " ").concat(villageId, " ").concat(age, "\n\t\t\t\t) A where A.\"grading\"=8\n\t\t\t\tgroup by A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\")A4\n\t\t\t\tON A1.\"nameOfUnitId\"=A4.\"nameOfUnitId\" and A1.\"districtId\"=A4.\"districtId\"\n\t\t\t\tleft join \n\t\t\t\t(select A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\",\n\t\t\t\tcount(A.id) as \"NoOfCasesG4\" from \n\t\t\t\t(select * from public.\"vGradingLF\" where 1=1 \n\t\t\t\t").concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(taluka, " ").concat(facility, " ").concat(gender, "\n\t\t\t\t").concat(wardId, " ").concat(villageId, " ").concat(age, "\n\t\t\t\t) A where A.\"grading\"=9\n\t\t\t\tgroup by A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\")A5\n\t\t\t\tON A1.\"nameOfUnitId\"=A5.\"nameOfUnitId\" and A1.\"districtId\"=A5.\"districtId\"\n\t\t\t\tleft join \n\t\t\t\t(select A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\",\n\t\t\t\tcount(A.id) as \"NoOfCasesG5\" from \n\t\t\t\t(select * from public.\"vGradingLF\" where 1=1 \n\t\t\t\t").concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(taluka, " ").concat(facility, " ").concat(gender, "\n\t\t\t\t").concat(wardId, " ").concat(villageId, " ").concat(age, "\n\t\t\t\t) A where A.\"grading\"=10\n\t\t\t\tgroup by A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\")A6\n\t\t\t\tON A1.\"nameOfUnitId\"=A6.\"nameOfUnitId\" and A1.\"districtId\"=A6.\"districtId\"\n\t\t\t\tleft join \n\t\t\t\t(select A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\",\n\t\t\t\tcount(A.id) as \"NoOfCasesG6\" from \n\t\t\t\t(select * from public.\"vGradingLF\" where 1=1 \n\t\t\t\t").concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(taluka, " ").concat(facility, " ").concat(gender, "\n\t\t\t\t").concat(wardId, " ").concat(villageId, " ").concat(age, "\n\t\t\t\t) A where A.\"grading\"=11\n\t\t\t\tgroup by A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\")A7\n\t\t\t\tON A1.\"nameOfUnitId\"=A7.\"nameOfUnitId\" and A1.\"districtId\"=A7.\"districtId\"\n\t\t\t\tleft join \n\t\t\t\t(select A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\",\n\t\t\t\tcount(A.id) as \"NoOfCasesG7\" from \n\t\t\t\t(select * from public.\"vGradingLF\" where 1=1 \n\t\t\t\t").concat(districtId, " ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(taluka, " ").concat(facility, " ").concat(gender, "\n\t\t\t\t").concat(wardId, " ").concat(villageId, " ").concat(age, "\n\t\t\t\t) A where A.\"grading\"=12\n\t\t\t\tgroup by A.\"nameOfUnitId\",A.\"districtId\",A.\"districtName\")A8\n\t\t\t\tON A1.\"nameOfUnitId\"=A8.\"nameOfUnitId\" and A1.\"districtId\"=A8.\"districtId\"\n\t\t\t\tleft join public.\"verticalControlUnits\" VC\n\t\t\t\tON VC.id=A1.\"nameOfUnitId\"\n        \t\t")).then(function (_ref55) {
                            var _ref56 = (0, _slicedToArray2["default"])(_ref55, 2),
                                results = _ref56[0],
                                metadata = _ref56[1];

                            response.error = false;
                            response.data = results;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 22:
                        case "end":
                          return _context27.stop();
                      }
                    }
                  }, _callee27);
                }));

                return function (_x28) {
                  return _ref54.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context28.stop();
          }
        }
      }, _callee28);
    }));

    return function get_GradingOfLFPatientsDao(_x27) {
      return _ref53.apply(this, arguments);
    };
  }();

  return {
    LF_MMDPActivityReportingDao: LF_MMDPActivityReportingDao,
    get_LF_HydroceleOPLineListDao: get_LF_HydroceleOPLineListDao,
    get_LF_DieseaseCasesListDao: get_LF_DieseaseCasesListDao,
    get_LF_PendingHydroceleCasesListDao: get_LF_PendingHydroceleCasesListDao,
    get_LF_PatientsineligibleForSurgery: get_LF_PatientsineligibleForSurgery,
    getLfAnalysis2Dao: getLfAnalysis2Dao,
    getLfAnalysis1Dao: getLfAnalysis1Dao,
    VerifiedbyMODao: VerifiedbyMODao,
    LF_PerformanceOfInstitutesDao: LF_PerformanceOfInstitutesDao,
    LF_PerformanceOfSurgeonsDao: LF_PerformanceOfSurgeonsDao,
    PlanningForOTDao: PlanningForOTDao,
    FollowUpServicesLymphedemaDao: FollowUpServicesLymphedemaDao,
    FollowUpServicesHydroceleDao: FollowUpServicesHydroceleDao,
    get_GradingOfLFPatientsDao: get_GradingOfLFPatientsDao
  };
};

var _default = lHLineListDao();

exports["default"] = _default;
//# sourceMappingURL=LFReportDao.js.map
