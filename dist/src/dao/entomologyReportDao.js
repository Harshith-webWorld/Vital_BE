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

var entomologyReportDao = function entomologyReportDao() {
  var LarvicidalReport1Dao = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve) {
                  var response, districtId, year, nameOfUnit, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          response = {};
                          districtId = "and  EL.\"districtId\" = ".concat(req.body.districtId);
                          year = "and EL.year =  ".concat(req.body.year);
                          nameOfUnit = "and  EL.\"nameOfUnit\" = ".concat(req.body.nameOfUnit);
                          start_month = "and  EL.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  EL.\"month\" BETWEEN 1 ";
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

                          if (req.body.nameOfUnit.length == 0) {
                            nameOfUnit = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select  EL.year, EL.month,EL.\"districtId\",D.\"districtName\",\n            EL.\"nameOfUnit\" AS \"nameOfControlUnitId\" ,VC.\"nameOfControlUnit\",\n            EL.\"larvicideNameId\",UD.\"categoryOptionName\" AS \"larvicideName\",\n            EL.\"noOfMenWorkingSFW\",EL.\"noOfMenWorkingFW\",EL.\"openingBalance\",\n            EL.\"receivedDuringMonth\",EL.\"consumedDuringMonth\",EL.\"balanceEndOfMonth\",\n            EL.\"canalisationWork\",EL.\"desiltingWork\",EL.\"deweedingWork\",\n            EL.\"fillingWork\",EL.\"otherWork\",EL.\"noOfWellsBioControl\",\n            EL.\"noOfTankBioControl\",EL.\"noOfCanalsBioControl\"\n            from public.\"entomologicalLarvicidalLists\" EL\n            left join public.districts D ON D.id=EL.\"districtId\"\n            left join public.\"verticalControlUnits\" VC ON VC.id=EL.\"nameOfUnit\"\n            left join public.\"udCategoryOptions\" UD ON UD.id=EL.\"larvicideNameId\"\n                    where  EL.\"isActive\"= true\n".concat(districtId, " ").concat(year, "  ").concat(start_month, " ").concat(end_month, "\n").concat(nameOfUnit, "\n\t")).then(function (_ref3) {
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

                        case 12:
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

    return function LarvicidalReport1Dao(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var NFCUReportEntomology1Dao = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req) {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(resolve) {
                  var response, districtId, year, unitNameId, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          response = {};
                          districtId = "and  E.\"districtId\" = ".concat(req.body.districtId);
                          year = "and E.year =  ".concat(req.body.year);
                          unitNameId = "and  E.\"unitNameId\" = ".concat(req.body.unitNameId);
                          start_month = "and  E.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  E.\"month\" BETWEEN 1 ";
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

                          if (req.body.unitNameId.length == 0) {
                            unitNameId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select\n   VC.\"nameOfControlUnit\",\n   E.* AS \"unitName\",\n   D.\"districtName\" \nfrom\n   (\n      select\n         COALESCE(E1.\"year\", E2.\"year\") AS \"year\",\n         COALESCE(E1.\"month\", E2.\"month\") AS \"month\",\n         COALESCE(E1.\"districtId\", E2.\"districtId\") AS \"districtId\",\n         COALESCE(E1.\"nameOfUnit\", E2.\"nameOfUnit\") AS \"unitNameId\",\n         COALESCE(E1.\"mosquitoType\", E2.\"mosquitoType\") as \"mosquitoType\",\n         E1.\"totalTimeSpent\" AS \"totalTimeSpentF\",\n         E1.\"noOfMosquitoCollectedMale\" AS \"noOfMosquitoCollectedMaleF\",\n         E1.\"noOfMosquitoCollectedFemale\" AS \"noOfMosquitoCollectedFemaleF\",\n         E1.\"noOfMosquitoCollectedTotal\" AS \"noOfMosquitoCollectedTotalF\",\n         E2.\"totalTimeSpent\" AS \"totalTimeSpentR\",\n         E2.\"noOfMosquitoCollectedMale\" AS \"noOfMosquitoCollectedMaleR\",\n         E2.\"noOfMosquitoCollectedFemale\" AS \"noOfMosquitoCollectedFemaleR\",\n         E2.\"noOfMosquitoCollectedTotal\" AS \"noOfMosquitoCollectedTotalR\",\n         (\n            COALESCE(E1.\"totalTimeSpent\", 0) + COALESCE(E2.\"totalTimeSpent\", 0) \n         )\n         AS \"totalTimeSpent\",\n         (\n            COALESCE(E1.\"noOfMosquitoCollectedMale\", 0) + COALESCE(E2.\"noOfMosquitoCollectedMale\", 0) \n         )\n         AS \"noOfMosquitoCollectedMale\",\n         (\n            COALESCE(E1.\"noOfMosquitoCollectedFemale\", 0) + COALESCE(E2.\"noOfMosquitoCollectedFemale\", 0) \n         )\n         AS \"noOfMosquitoCollectedFemale\",\n         (\n            COALESCE(E1.\"noOfMosquitoCollectedTotal\", 0) + COALESCE(E2.\"noOfMosquitoCollectedTotal\", 0) \n         )\n         AS \"noOfMosquitoCollectedTotal\" \n      from\n         (\n            --Fixed,E2.Year) as \"year\"\n            select\n               ED.\"year\",\n               ED.\"month\",\n               ED.\"districtId\",\n               ED.\"nameOfUnit\",\n               ED.\"fixedOrRandom\",\n               ED.\"mosquitoType\",\n               sum(ED.\"totalTimeSpent\") \"totalTimeSpent\",\n               sum(\"noOfMosquitoCollectedMale\") AS \"noOfMosquitoCollectedMale\",\n               sum(\"noOfMosquitoCollectedFemale\") AS \"noOfMosquitoCollectedFemale\",\n               sum(\"noOfMosquitoCollectedTotal\") AS \"noOfMosquitoCollectedTotal\" \n            from\n               public.\"vEntomologicalDataCounts\" ED \n            where\n               ED.\"fixedOrRandom\" = 'Fixed' \n            group by\n               ED.\"year\",\n               ED.\"month\",\n               ED.\"districtId\",\n               ED.\"nameOfUnit\",\n               ED.\"fixedOrRandom\",\n               ED.\"mosquitoType\" \n         )\n         E1 \n         FULL OUTER JOIN\n            (\n               select\n                  ED.\"year\",\n                  ED.\"month\",\n                  ED.\"districtId\",\n                  ED.\"nameOfUnit\",\n                  ED.\"fixedOrRandom\",\n                  ED.\"mosquitoType\",\n                  sum(ED.\"totalTimeSpent\") \"totalTimeSpent\",\n                  sum(ED.\"noOfMosquitoCollectedMale\") AS \"noOfMosquitoCollectedMale\",\n                  sum(ED.\"noOfMosquitoCollectedFemale\") AS \"noOfMosquitoCollectedFemale\",\n                  sum(ED.\"noOfMosquitoCollectedTotal\") AS \"noOfMosquitoCollectedTotal\" \n               from\n                  public.\"vEntomologicalDataCounts\" ED \n               where\n                  ED.\"fixedOrRandom\" = 'Random' \n               group by\n                  ED.\"year\",\n                  ED.\"month\",\n                  ED.\"districtId\",\n                  ED.\"nameOfUnit\",\n                  ED.\"fixedOrRandom\",\n                  ED.\"mosquitoType\" \n            )\n            E2 \n            on E1.\"year\" = E2.\"year\" \n            and E1.\"month\" = E2.\"month\" \n            and E1.\"districtId\" = E1.\"districtId\" \n            and E1.\"nameOfUnit\" = E2.\"nameOfUnit\" \n            and E1.\"mosquitoType\" = E2.\"mosquitoType\" \n   )\n   E \n   left join\n      public.districts D \n      ON D.id = E.\"districtId\" \n   left join\n      public.\"verticalControlUnits\" VC \n      ON VC.id = E.\"unitNameId\" \nwhere\n   1 = 1\n".concat(districtId, " ").concat(year, "  ").concat(start_month, " ").concat(end_month, "\n").concat(unitNameId, "\n\t")).then(function (_ref7) {
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

                        case 12:
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

    return function NFCUReportEntomology1Dao(_x3) {
      return _ref5.apply(this, arguments);
    };
  }();

  var AdditionalEntomologicalReportDao = /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req) {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(resolve) {
                  var response, districtId, year;
                  return _regenerator["default"].wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          response = {};
                          districtId = "and  EL.\"districtId\" = ".concat(req.body.districtId);
                          year = "and EL.year =  ".concat(req.body.year);

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
                          _sequelize["default"].sequelize.query("\n            select EL.\"year\",EL.\"districtId\",D.\"districtName\",EL.\"talukaId\",T.\"talukaName\",\nEL.\"facilityId\",F.\"facilityName\",EL.\"subCenterId\",Sb.\"subCenterName\",\nEL.\"villageId\",EL.\"fixedOrRandom\",EL.\"dateOfSurvey\" AS \"dateOfSurvey\",\nV.\"villageName\",\nCOALESCE(ED1.\"totalTimeSpent\",0)  AS \"totalTimeSpentF\",\nCOALESCE(ED1.\"noOfMosquitoCollectedMale\",0)  AS \"noOfMosquitoCollectedMaleF\",\nCOALESCE(ED1.\"noOfMosquitoCollectedFemale\",0)  AS \"noOfMosquitoCollectedFemaleF\",\nCOALESCE(ED2.\"totalTimeSpent\",0) AS \"totalTimeSpentR\",\nCOALESCE(ED2.\"noOfMosquitoCollectedMale\",0) AS \"noOfMosquitoCollectedMaleR\",\nCOALESCE(ED2.\"noOfMosquitoCollectedFemale\",0) AS \"noOfMosquitoCollectedFemaleR\",\nCOALESCE(COALESCE(ED1.\"totalTimeSpent\", 0) + COALESCE(ED2.\"totalTimeSpent\", 0),0) AS \"totalTimeSpent\",\nCOALESCE(COALESCE(ED1.\"noOfMosquitoCollectedMale\", 0) + COALESCE(ED2.\"noOfMosquitoCollectedMale\", 0),0) AS \"noOfMosquitoCollectedMale\",\nCOALESCE(COALESCE(ED1.\"noOfMosquitoCollectedFemale\", 0) + COALESCE(ED2.\"noOfMosquitoCollectedFemale\", 0),0) AS \"noOfMosquitoCollectedFemale\",\n(COALESCE(ED1.\"noOfMosquitoCollectedFemale\" + ED2.\"noOfMosquitoCollectedFemale\",0)/\n\t(CASE  COALESCE(ED1.\"totalTimeSpent\" + ED2.\"totalTimeSpent\",0)\n\tWHEN 0 Then NULL ELSE  COALESCE(ED1.\"totalTimeSpent\" + ED2.\"totalTimeSpent\",0) END)*10) AS \"densityManHours\"\nFROM public.\"entomologicalLarvicidalLists\" EL\nLEFT JOIN \n(\n\tselect * from public.\"vEntomologicalDataCounts\" \n \twhere lower(\"mosquitoType\") like '%culex%' and lower(\"fixedOrRandom\") like '%fixed%'\n) ED1\nON EL.id=ED1.id\nLEFT JOIN \n(\n\tselect * from public.\"vEntomologicalDataCounts\" \n \twhere lower(\"mosquitoType\") like '%culex%' and lower(\"fixedOrRandom\") like '%random%'\n) ED2\nON EL.id=ED2.id\nleft join public.districts D on D.id = EL.\"districtId\"\nleft join public.facilities F on F.id = EL.\"facilityId\"\nleft join public.\"subCenters\" Sb on SB.id = EL.\"subCenterId\"\nleft join public.talukas T on T.id = EL.\"talukaId\"\nleft join public.villages V on V.id = EL.\"villageId\"\nwhere 1=1\n".concat(districtId, " ").concat(year, " \n\t")).then(function (_ref11) {
                            var _ref12 = (0, _slicedToArray2["default"])(_ref11, 2),
                                results = _ref12[0],
                                metadata = _ref12[1];

                            response.error = false;
                            response.data = results; //console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 6:
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

    return function AdditionalEntomologicalReportDao(_x5) {
      return _ref9.apply(this, arguments);
    };
  }();

  var BaselineEntomoligicalReportDao = /*#__PURE__*/function () {
    var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req) {
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(resolve) {
                  var response, districtId, year;
                  return _regenerator["default"].wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          response = {};
                          districtId = "and  EL.\"districtId\" = ".concat(req.body.districtId);
                          year = "and EL.year =  ".concat(req.body.year);

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
                          _sequelize["default"].sequelize.query("\n            select EL.\"year\",EL.\"districtId\",D.\"districtName\",EL.\"talukaId\",T.\"talukaName\",\n            EL.\"facilityId\",F.\"facilityName\",EL.\"subCenterId\",Sb.\"subCenterName\",\n            EL.\"villageId\",EL.\"fixedOrRandom\",EL.\"dateOfSurvey\" AS \"DateOfSurvey\",\n            V.\"villageName\",\n            COALESCE(ED1.\"totalTimeSpent\",0)  AS \"totalTimeSpentF\",\n            COALESCE(ED1.\"noOfMosquitoCollectedMale\",0)  AS \"noOfMosquitoCollectedMaleF\",\n            COALESCE(ED1.\"noOfMosquitoCollectedFemale\",0)  AS \"noOfMosquitoCollectedFemaleF\",\n            COALESCE(ED2.\"totalTimeSpent\",0) AS \"totalTimeSpentR\",\n            COALESCE(ED2.\"noOfMosquitoCollectedMale\",0) AS \"noOfMosquitoCollectedMaleR\",\n            COALESCE(ED2.\"noOfMosquitoCollectedFemale\",0) AS \"noOfMosquitoCollectedFemaleR\",\n            COALESCE(COALESCE(ED1.\"totalTimeSpent\", 0) + COALESCE(ED2.\"totalTimeSpent\", 0),0) AS \"totalTimeSpent\",\n            COALESCE(COALESCE(ED1.\"noOfMosquitoCollectedMale\", 0) + COALESCE(ED2.\"noOfMosquitoCollectedMale\", 0),0) AS \"noOfMosquitoCollectedMale\",\n            COALESCE(COALESCE(ED1.\"noOfMosquitoCollectedFemale\", 0) + COALESCE(ED2.\"noOfMosquitoCollectedFemale\", 0),0) AS \"noOfMosquitoCollectedFemale\",\n            (COALESCE(ED1.\"noOfMosquitoCollectedFemale\" + ED2.\"noOfMosquitoCollectedFemale\",0)/\n                (CASE  COALESCE(ED1.\"totalTimeSpent\" + ED2.\"totalTimeSpent\",0)\n                WHEN 0 Then NULL ELSE  COALESCE(ED1.\"totalTimeSpent\" + ED2.\"totalTimeSpent\",0) END)*10) AS \"densityManHours\"\n            FROM public.\"entomologicalLarvicidalLists\" EL\n            LEFT JOIN \n            (\n                select * from public.\"vEntomologicalDataCounts\" \n                 where lower(\"mosquitoType\") like '%culex%' and lower(\"fixedOrRandom\") like '%fixed%'\n            ) ED1\n            ON EL.id=ED1.id\n            LEFT JOIN \n            (\n                select * from public.\"vEntomologicalDataCounts\" \n                 where lower(\"mosquitoType\") like '%culex%' and lower(\"fixedOrRandom\") like '%random%'\n            ) ED2\n            ON EL.id=ED2.id\n            left join public.districts D on D.id = EL.\"districtId\"\n            left join public.facilities F on F.id = EL.\"facilityId\"\n            left join public.\"subCenters\" SB on SB.id = EL.\"subCenterId\"\n            left join public.talukas T on T.id = EL.\"talukaId\"\n            left join public.villages V on V.id = EL.\"villageId\"\n            where 1=1\n".concat(districtId, " ").concat(year, " \n\t")).then(function (_ref15) {
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

                        case 6:
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

    return function BaselineEntomoligicalReportDao(_x7) {
      return _ref13.apply(this, arguments);
    };
  }();

  var LarvalDensityReportUnitDao = /*#__PURE__*/function () {
    var _ref17 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req) {
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              return _context10.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(resolve) {
                  var response, districtId, year, month, nameOfUnit;
                  return _regenerator["default"].wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          response = {};
                          districtId = "and  E.\"districtId\" = ".concat(req.body.districtId);
                          year = "and year =  ".concat(req.body.year);
                          month = "and month =  ".concat(req.body.month);
                          nameOfUnit = "and E.\"nameOfUnit\" =  ".concat(req.body.nameOfUnit);

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.month.length == 0) {
                            month = "";
                          }

                          if (req.body.nameOfUnit.length == 0) {
                            nameOfUnit = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select E.\"year\",E.\"month\",E.\"districtId\",D.\"districtName\",\n\"nameOfUnit\" AS \"nameOfUnitId\",VC.\"nameOfControlUnit\",\nsum(\"breedingPlacesChecked\"::integer) AS \"breedingPlacesChecked\",\nsum(\"noOfPosVePlaceForPupae\") AS \"noOfPosVePlaceForPupae\",\nsum(\"noOfPosVePlaceIIIandIVStage\") AS \"noOfPosVePlaceIIIandIVStage\",\nsum(\"totalNoOfDipsTaken\") AS \"totalNoOfDipsTaken\",\nsum(\"totalCulexLarvaeCount1to4Stage\") AS \"totalCulexLarvaeCount1to4Stage\",\nsum(\"totalAnLarvaeCount\") AS \"totalAnLarvaeCount\",\nsum(\"totalCulexPupaeCount\") AS \"totalCulexPupaeCount\",\nsum((\"totalCulexLarvaeCount1to4Stage\"/(CASE \"totalNoOfDipsTaken\"\n\tWHEN 0 Then NULL ELSE \"totalNoOfDipsTaken\" END))*100) AS \"AverageNoCulexLarva\",\nsum((\"totalAnLarvaeCount\"/(CASE \"totalNoOfDipsTaken\"\n\tWHEN 0 Then NULL ELSE \"totalNoOfDipsTaken\" END))*100) AS \"AverageNoAnoLarva\",\nsum((\"totalCulexPupaeCount\"/(CASE \"totalNoOfDipsTaken\"\n\tWHEN 0 Then NULL ELSE \"totalNoOfDipsTaken\" END))*100) AS \"AverageNoPupae\"\nfrom public.\"entomologicalLarvicidalLists\" E\nleft join public.districts D on D.id = E.\"districtId\"\nLEFT JOIN public.\"verticalControlUnits\" VC ON VC.id=E.\"nameOfUnit\"\nwhere 1=1\n ".concat(year, " ").concat(month, "  ").concat(districtId, "  ").concat(nameOfUnit, "\n group by \"year\",\"month\",E.\"districtId\",D.\"districtName\",\n \"nameOfUnit\" ,VC.\"nameOfControlUnit\"\n \n\t")).then(function (_ref19) {
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

                        case 10:
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

    return function LarvalDensityReportUnitDao(_x9) {
      return _ref17.apply(this, arguments);
    };
  }();

  var LarvalDensityReportRuralDao = /*#__PURE__*/function () {
    var _ref21 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req) {
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              return _context12.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref22 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(resolve) {
                  var response, districtId, year, month, nameOfUnit;
                  return _regenerator["default"].wrap(function _callee11$(_context11) {
                    while (1) {
                      switch (_context11.prev = _context11.next) {
                        case 0:
                          response = {};
                          districtId = "and  E.\"districtId\" = ".concat(req.body.districtId);
                          year = "and year =  ".concat(req.body.year);
                          month = "and month =  ".concat(req.body.month);
                          nameOfUnit = "and  E.\"nameOfUnit\" =  ".concat(req.body.nameOfUnit);

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.month.length == 0) {
                            month = "";
                          }

                          if (req.body.nameOfUnit.length == 0) {
                            nameOfUnit = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select E.\"year\",E.\"month\",E.\"districtId\",D.\"districtName\",\n            \"nameOfUnit\" AS \"nameOfUnitId\",VC.\"nameOfControlUnit\",\n            sum(\"breedingPlacesChecked\"::integer) AS \"breedingPlacesChecked\",\n            sum(\"noOfPosVePlaceForPupae\") AS \"noOfPosVePlaceForPupae\",\n            sum(\"noOfPosVePlaceIIIandIVStage\") AS \"noOfPosVePlaceIIIandIVStage\",\n            sum(\"totalNoOfDipsTaken\") AS \"totalNoOfDipsTaken\",\n            sum(\"totalCulexLarvaeCount1to4Stage\") AS \"totalCulexLarvaeCount1to4Stage\",\n            sum(\"totalAnLarvaeCount\") AS \"totalAnLarvaeCount\",\n            sum(\"totalCulexPupaeCount\") AS \"totalCulexPupaeCount\",\n            sum((\"totalCulexLarvaeCount1to4Stage\"/(CASE \"totalNoOfDipsTaken\"\n                WHEN 0 Then NULL ELSE \"totalNoOfDipsTaken\" END))*100) AS \"AverageNoCulexLarva\",\n            sum((\"totalAnLarvaeCount\"/(CASE \"totalNoOfDipsTaken\"\n                WHEN 0 Then NULL ELSE \"totalNoOfDipsTaken\" END))*100) AS \"AverageNoAnoLarva\",\n            sum((\"totalCulexPupaeCount\"/(CASE \"totalNoOfDipsTaken\"\n                WHEN 0 Then NULL ELSE \"totalNoOfDipsTaken\" END))*100) AS \"AverageNoPupae\"\n            from public.\"entomologicalLarvicidalLists\" E\n            left join public.districts D on D.id = E.\"districtId\"\n            LEFT JOIN public.\"verticalControlUnits\" VC ON VC.id=E.\"nameOfUnit\"\nwhere 1=1\n ".concat(year, " ").concat(month, "  ").concat(districtId, "  ").concat(nameOfUnit, "\n and E.\"villageId\" is not null\n group by \"year\",\"month\",E.\"districtId\",D.\"districtName\",\n \"nameOfUnit\" ,VC.\"nameOfControlUnit\"\n \n\t")).then(function (_ref23) {
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

                        case 10:
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

    return function LarvalDensityReportRuralDao(_x11) {
      return _ref21.apply(this, arguments);
    };
  }();

  var NFCUMosquitoDisectionReportUnitDao = /*#__PURE__*/function () {
    var _ref25 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req) {
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              return _context14.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref26 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(resolve) {
                  var response, districtId, year, month, nameOfUnit;
                  return _regenerator["default"].wrap(function _callee13$(_context13) {
                    while (1) {
                      switch (_context13.prev = _context13.next) {
                        case 0:
                          response = {};
                          districtId = "and  E.\"districtId\" = ".concat(req.body.districtId);
                          year = "and year =  ".concat(req.body.year);
                          month = "and month =  ".concat(req.body.month);
                          nameOfUnit = "and E.\"nameOfUnit\" =  ".concat(req.body.nameOfUnit);

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.month.length == 0) {
                            month = "";
                          }

                          if (req.body.nameOfUnit.length == 0) {
                            nameOfUnit = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select 'Culex' AS \"Species\", \"year\",\"month\",E.\"districtId\",D.\"districtName\",\n            \"nameOfUnit\" AS \"nameOfUnitId\",V.\"nameOfControlUnit\",\n            SUM(\"mosqDissectedCulexQui\"::integer) AS \"mosqDissectedCulexQui\",\n            SUM(\"totalNoPositiveMosq1to3Stage\") AS \"totalNoPositiveMosq1to3Stage\",\n            SUM(\"totalNoPositiveMosq3Stage\") AS \"totalNoPositiveMosq3Stage\",\n            SUM((\"totalNoPositiveMosq1to3Stage\"/(CASE \"mosqDissectedCulexQui\"::integer\n                WHEN 0 Then NULL ELSE \"mosqDissectedCulexQui\"::integer END))*100) AS \"PercentageInfected\",\n            SUM((\"totalNoPositiveMosq3Stage\"/(CASE \"mosqDissectedCulexQui\"::integer\n                WHEN 0 Then NULL ELSE \"mosqDissectedCulexQui\"::integer END))*100) AS \"PercentageInfectivity\",\n            SUM((\"totalNoPositiveMosq3Stage\"/(CASE \"totalCulexLarvaeCount1to4Stage\"\n                WHEN 0 Then NULL ELSE \"totalCulexLarvaeCount1to4Stage\" END))*100) AS \"AverageNoLarva\"\n            from public.\"entomologicalLarvicidalLists\" E\n            left join public.districts D on D.id = E.\"districtId\"\n            LEFT JOIN public.\"verticalControlUnits\" V ON V.id=E.\"nameOfUnit\"\nwhere 1=1\n ".concat(year, " ").concat(month, "  ").concat(districtId, "  ").concat(nameOfUnit, "\n group by \"year\",\"month\",E.\"districtId\",D.\"districtName\",\n \"nameOfUnit\" ,V.\"nameOfControlUnit\"\n \n\t")).then(function (_ref27) {
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

                        case 10:
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

    return function NFCUMosquitoDisectionReportUnitDao(_x13) {
      return _ref25.apply(this, arguments);
    };
  }();

  var NFCUMosquitoDisectionReportRuralDao = /*#__PURE__*/function () {
    var _ref29 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req) {
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              return _context16.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref30 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(resolve) {
                  var response, districtId, year, month, nameOfUnit;
                  return _regenerator["default"].wrap(function _callee15$(_context15) {
                    while (1) {
                      switch (_context15.prev = _context15.next) {
                        case 0:
                          response = {};
                          districtId = "and  E.\"districtId\" = ".concat(req.body.districtId);
                          year = "and year =  ".concat(req.body.year);
                          month = "and month =  ".concat(req.body.month);
                          nameOfUnit = "and E.\"nameOfUnit\" =  ".concat(req.body.nameOfUnit);

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.month.length == 0) {
                            month = "";
                          }

                          if (req.body.nameOfUnit.length == 0) {
                            nameOfUnit = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select 'Culex' AS \"Species\", \"year\",\"month\",E.\"districtId\",D.\"districtName\",\n            \"nameOfUnit\" AS \"nameOfUnitId\",VC.\"nameOfControlUnit\",\n            SUM(\"mosqDissectedCulexQui\"::integer) AS \"mosqDissectedCulexQui\",\n            SUM(\"totalNoPositiveMosq1to3Stage\") AS \"totalNoPositiveMosq1to3Stage\",\n            SUM(\"totalNoPositiveMosq3Stage\") AS \"totalNoPositiveMosq3Stage\",\n            SUM((\"totalNoPositiveMosq1to3Stage\"/(CASE \"mosqDissectedCulexQui\"::integer\n                WHEN 0 Then NULL ELSE \"mosqDissectedCulexQui\"::integer END))*100) AS \"PercentageInfected\",\n            SUM((\"totalNoPositiveMosq3Stage\"/(CASE \"mosqDissectedCulexQui\"::integer\n                WHEN 0 Then NULL ELSE \"mosqDissectedCulexQui\"::integer END))*100) AS \"PercentageInfectivity\",\n            SUM((\"totalNoPositiveMosq3Stage\"/(CASE \"totalCulexLarvaeCount1to4Stage\"\n                WHEN 0 Then NULL ELSE \"totalCulexLarvaeCount1to4Stage\" END))*100) AS \"AverageNoLarva\"\n            from public.\"entomologicalLarvicidalLists\" E\n            left join public.districts D on D.id = E.\"districtId\"\n            LEFT JOIN public.\"verticalControlUnits\" VC ON VC.id=E.\"nameOfUnit\"\nwhere 1=1\n ".concat(year, " ").concat(month, "  ").concat(districtId, "  ").concat(nameOfUnit, "\n and E.\"villageId\" is not null\n group by \"year\",\"month\",E.\"districtId\",D.\"districtName\",\n\"nameOfUnit\" ,VC.\"nameOfControlUnit\"\n \n\t")).then(function (_ref31) {
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

                        case 10:
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

    return function NFCUMosquitoDisectionReportRuralDao(_x15) {
      return _ref29.apply(this, arguments);
    };
  }();

  return {
    LarvicidalReport1Dao: LarvicidalReport1Dao,
    NFCUReportEntomology1Dao: NFCUReportEntomology1Dao,
    AdditionalEntomologicalReportDao: AdditionalEntomologicalReportDao,
    BaselineEntomoligicalReportDao: BaselineEntomoligicalReportDao,
    LarvalDensityReportUnitDao: LarvalDensityReportUnitDao,
    LarvalDensityReportRuralDao: LarvalDensityReportRuralDao,
    NFCUMosquitoDisectionReportUnitDao: NFCUMosquitoDisectionReportUnitDao,
    NFCUMosquitoDisectionReportRuralDao: NFCUMosquitoDisectionReportRuralDao
  };
};

var _default = entomologyReportDao();

exports["default"] = _default;
//# sourceMappingURL=entomologyReportDao.js.map
