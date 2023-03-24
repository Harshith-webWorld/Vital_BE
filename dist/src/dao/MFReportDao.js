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
  var get_AdditionalMFSurveyReportDao = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve) {
                  var response, districtId, year;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          response = {};
                          districtId = "and  M.\"districtId\" = ".concat(req.body.districtId);
                          year = "and Year =  ".concat(req.body.year); // var month = `and  L."month" = ${req.body.month}`

                          // var month = `and  L."month" = ${req.body.month}`
                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          } // if (req.body.month.length == 0) {
                          //     month = ""
                          // }
                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // if (req.body.month.length == 0) {
                          //     month = ""
                          // }
                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select M.Id,M.\"talukaId\",M.town,M.\"facilityId\",M.area,M.\"subCenterId\",M.\"villageId\",\n            M.\"totalPopulationVillage\",T.\"talukaName\",F.\"facilityName\",Sb.\"subCenterName\",\n            V.\"villageName\",\n            MS1.\"dateOfAction\" as \"DateOfSurvey\", MS2.\"NoOfBSCollected\",MS3.\"NoOfBSExamined\",M.\"noOfBSFoundPositive\",\n            ((M.\"noOfBSFoundPositive\"/(CASE MS3.\"NoOfBSExamined\" WHEN 0 Then NULL ELSE MS3.\"NoOfBSExamined\" END)) * 100) as \"MFRate\"\n           from public.\"mfPositiveLineLists\" M\n\n           left join public.talukas T on T.id = M.\"talukaId\"\n           left join public.villages V on V.id = M.\"villageId\"\n           left join public.\"subCenters\" Sb on Sb.id = M.\"subCenterId\"\n           left join public.facilities F on F.id = M.\"facilityId\"\n           LEFT JOIN LATERAL (select  MS.\"dateOfAction\" , MS.\"mfPositiveLineListId\" from public.\"mfPositiveLineListSurveys\" MS \n           where  MS.\"detailsOfSurveyId\"=(select id from public.\"udCategoryOptions\" where \"categoryCode\"=1013 and \"categoryOptionCode\"='NPS')) \n           MS1 ON true \n           LEFT JOIN LATERAL (select  MS.\"dateOfAction\" , MS.\"mfPositiveLineListId\",\n               \"noOfPersonsMale0to4\"+\"noOfPersonsMale5to14\"+\"noOfPersonsMale15to39\"+\"noOfPersonsMale40Plus\"+\n               \"noOfPersonsFemale0to4\"+\"noOfPersonsFemale5to14\"+\"noOfPersonsFemale15to39\"+\"noOfPersonsFemale40Plus\"+\n               \"noOfPersonsTG0to4\"+\"noOfPersonsTG5to14\"+\"noOfPersonsTG15to39\"+\"noOfPersonsTG40Plus\"\n               as \"NoOfBSCollected\" from public.\"mfPositiveLineListSurveys\" MS \n           where  MS.\"detailsOfSurveyId\"=(select id from public.\"udCategoryOptions\" where \"categoryCode\"=1013 and \"categoryOptionCode\"='NPC')) \n           MS2 ON true \n           LEFT JOIN LATERAL (select  MS.\"dateOfAction\" , MS.\"mfPositiveLineListId\",\n               \"noOfPersonsMale0to4\"+\"noOfPersonsMale5to14\"+\"noOfPersonsMale15to39\"+\"noOfPersonsMale40Plus\"+\n               \"noOfPersonsFemale0to4\"+\"noOfPersonsFemale5to14\"+\"noOfPersonsFemale15to39\"+\"noOfPersonsFemale40Plus\"+\n               \"noOfPersonsTG0to4\"+\"noOfPersonsTG5to14\"+\"noOfPersonsTG15to39\"+\"noOfPersonsTG40Plus\"\n               as \"NoOfBSExamined\" from public.\"mfPositiveLineListSurveys\" MS \n           where  MS.\"detailsOfSurveyId\"=(select id from public.\"udCategoryOptions\" where \"categoryCode\"=1013 and \"categoryOptionCode\"='NBSE') ) \n           MS3 ON true \n           where MS1.\"mfPositiveLineListId\"=M.Id and MS2.\"mfPositiveLineListId\"=M.Id and MS3.\"mfPositiveLineListId\"=M.Id           \n           ".concat(districtId, " ").concat(year, " \n\t")).then(function (_ref3) {
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

                        case 6:
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

    return function get_AdditionalMFSurveyReportDao(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var get_MFBaseLineSurveyListDao = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req) {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(resolve) {
                  var response, districtId, year;
                  return _regenerator["default"].wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          response = {};
                          districtId = "and  M.\"districtId\" = ".concat(req.body.districtId);
                          year = "and Year =  ".concat(req.body.year); // var month = `and  L."month" = ${req.body.month}`

                          // var month = `and  L."month" = ${req.body.month}`
                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          } // if (req.body.month.length == 0) {
                          //     month = ""
                          // }
                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // if (req.body.month.length == 0) {
                          //     month = ""
                          // }
                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            \n            select M.\"facilityId\",M.\"subCenterId\",M.\"villageId\",'' as \"site\",\n            F.\"facilityName\",Sb.\"subCenterName\", V.\"villageName\",\n            VMS.\"dateNPS\" as \"DateOfSurvey\", SUM(VMS.\"noOfPersonsNPC\") \"NoOfBSCollected\",\n\t\t\tSUM(VMS.\"noOfPersonsNBSE\") \"NoOfBSExamined\",SUM(M.\"noOfBSFoundPositive\") \"noOfBSFoundPositive\",\n            ((SUM(M.\"noOfBSFoundPositive\")/(CASE SUM(VMS.\"noOfPersonsNBSE\")\n\t\t\t\tWHEN 0 Then NULL ELSE SUM(VMS.\"noOfPersonsNBSE\") END)) * 100) as \"MFRate\"\n           from public.\"mfPositiveLineLists\" M\n           left join public.villages V on V.id = M.\"villageId\"\n           left join public.\"subCenters\" Sb on Sb.id = M.\"subCenterId\"\n           left join public.facilities F on F.id = M.\"facilityId\"\n           LEFT JOIN public.\"vMFPositiveLineListSurveysById\" VMS\n\t\t   ON VMS.id= M.id\n\t\t   where 1=1                    \n           ".concat(districtId, " ").concat(year, " \n           group by M.\"facilityId\",M.\"subCenterId\",M.\"villageId\",\n\t\t   F.\"facilityName\",Sb.\"subCenterName\",V.\"villageName\",\n\t\t   M.\"year\",M.\"month\",VMS.\"dateNPS\"\n\t")).then(function (_ref7) {
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

                        case 6:
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

    return function get_MFBaseLineSurveyListDao(_x3) {
      return _ref5.apply(this, arguments);
    };
  }();

  var DiseaseRate_VillagewiseDao = /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req) {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(resolve) {
                  var response, districtId, year, month, villageId;
                  return _regenerator["default"].wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          response = {};
                          districtId = "and  M.\"districtId\" = ".concat(req.body.districtId);
                          year = "and M.Year =  ".concat(req.body.year);
                          month = "and  M.month = ".concat(req.body.month);
                          villageId = "and  M.\"villageId\" = ".concat(req.body.villageId);

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.month.length == 0) {
                            month = "";
                          }

                          if (req.body.villageId.length == 0) {
                            villageId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            \n            select M.\"villageId\",V.\"villageName\",M.\"year\",M.\"month\", M.\"districtId\",D.\"districtName\",\n            M.\"nameOfUnit\" AS \"nameOfUnitId\",VC.\"nameOfControlUnit\" AS \"nameOfUnit\",\n            M.\"nameOfFilariaFieldUnit\" AS \"fieldUnitId\",VF.\"fieldUnitName\",\n            M.\"facilityId\",F.\"facilityName\",\n            sum(MS1.\"noOfPersons\") AS \"noOfPersonsExam\",\tsum(MS2.\"noOfPersons\") AS \"noOfPersonsMF\",\n            sum((MS2.\"noOfPersons\"/(CASE MS1.\"noOfPersons\"\n            WHEN 0 Then NULL ELSE MS1.\"noOfPersons\" END))*100) AS \"MFRate\",\n            sum(MS3.\"noOfPersons\") AS \"noOfPersonsDes\",\n            sum((MS3.\"noOfPersons\"/(CASE MS1.\"noOfPersons\"\n            WHEN 0 Then NULL ELSE MS1.\"noOfPersons\" END))*100) AS \"DesRate\"\n        from public.\"mfPositiveLineLists\" M\n        LEFT JOIN (select * from public.\"vMFPositiveLineListSurveys\" V1 where  V1.\"categoryOptionCode\"='NBSE') \n        MS1 ON MS1.\"mfPositiveLineListId\"=M.id \n        LEFT JOIN (select * from public.\"vMFPositiveLineListSurveys\" V1 where  V1.\"categoryOptionCode\"='NPMF') \n        MS2 ON MS2.\"mfPositiveLineListId\"=M.id \n        LEFT JOIN public.\"vDiseasePositive\" MS3 ON MS3.\"mfPositiveLineListId\"=M.id \n        LEFT JOIN public.districts D on D.id = M.\"districtId\"\n        LEFT JOIN public.\"verticalControlUnits\" VC ON VC.id=M.\"nameOfUnit\"\n        LEFT JOIN public.\"verticalControlFieldUnits\" VF ON VF.id=M.\"nameOfFilariaFieldUnit\"\n        left join public.facilities F on F.id = M.\"facilityId\"\n        left join public.villages V on V.id = M.\"villageId\"\n                       where 1 = 1\n           ".concat(districtId, " ").concat(year, " ").concat(month, " ").concat(villageId, "\n           group by M.\"villageId\",V.\"villageName\",M.\"year\",M.\"month\", M.\"districtId\",D.\"districtName\",\n    M.\"nameOfUnit\",VC.\"nameOfControlUnit\",M.\"nameOfFilariaFieldUnit\",VF.\"fieldUnitName\",\n\tM.\"facilityId\",F.\"facilityName\"\n\n\t")).then(function (_ref11) {
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

    return function DiseaseRate_VillagewiseDao(_x5) {
      return _ref9.apply(this, arguments);
    };
  }();

  return {
    get_AdditionalMFSurveyReportDao: get_AdditionalMFSurveyReportDao,
    get_MFBaseLineSurveyListDao: get_MFBaseLineSurveyListDao,
    DiseaseRate_VillagewiseDao: DiseaseRate_VillagewiseDao
  };
};

var _default = lHLineListDao();

exports["default"] = _default;
//# sourceMappingURL=MFReportDao.js.map
