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

var MDAReportDao = function MDAReportDao() {
  var StateLvlDao = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve) {
                  var response, year, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          response = {};
                          year = "and Year=  ".concat(req.body.year);
                          start_month = "and  M.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  M.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n           \n            select SUM(\"batchesOfTrainingOrganizedMDAIDA\") AS \"batchesOfTrainingOrganizedMDAIDA\",\n            SUM(\"totalStaffSanctioned\") AS \"totalStaffSanctioned\",SUM(0) as \"NoOfVacantPositions\",\n            SUM(\"numberTrainedForMDAIDA\") AS \"numberTrainedForMDAIDA\",\n            SUM(\"batchesOfTrainingOrganizedMMDP\") AS \"batchesOfTrainingOrganizedMMDP\",\n            SUM(\"numberTrainedForMMDP\") AS \"numberTrainedForMMDP\",\n            (SUM(\"batchesOfTrainingOrganizedMDAIDA\")+SUM(\"batchesOfTrainingOrganizedMMDP\")) AS \"batchesOfTrainingOrganized\",\n            (SUM(\"numberTrainedForMDAIDA\")+SUM(\"numberTrainedForMMDP\")) AS \"numberTrained\"\n            from \"preMDAActivities\" M\n        where M.\"isActive\"=true\n        ".concat(year, " ").concat(start_month, " ").concat(end_month, "\n\t")).then(function (_ref3) {
                            var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
                                results = _ref4[0],
                                metadata = _ref4[1];

                            response.error = false;
                            response.data = results; // console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 8:
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

    return function StateLvlDao(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var CHCLvlDao = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req) {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(resolve) {
                  var response, year, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          response = {};
                          year = "and Year =  ".concat(req.body.year);
                          start_month = "and  M.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  M.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("           \n            select M.\"facilityId\",F.\"facilityName\",SUM(\"batchesOfTrainingOrganizedMDAIDA\") AS \"batchesOfTrainingOrganizedMDAIDA\",\n            SUM(\"totalStaffSanctioned\") AS \"totalStaffSanctioned\",SUM(0) as \"NoOfVacantPositions\",\n            SUM(\"numberTrainedForMDAIDA\") AS \"numberTrainedForMDAIDA\",\n            SUM(\"batchesOfTrainingOrganizedMMDP\") AS \"batchesOfTrainingOrganizedMMDP\",\n            SUM(\"numberTrainedForMMDP\") AS \"numberTrainedForMMDP\",\n            (SUM(\"batchesOfTrainingOrganizedMDAIDA\")+SUM(\"batchesOfTrainingOrganizedMMDP\")) AS \"batchesOfTrainingOrganized\",\n            (SUM(\"numberTrainedForMDAIDA\")+SUM(\"numberTrainedForMMDP\")) AS \"numberTrained\"\n            from \"preMDAActivities\" M\n            left join public.facilities F ON F.id=M.\"facilityId\"\n\t\t\twhere M.\"isActive\"=true and COALESCE(M.\"facilityId\",0)>0\n        ".concat(year, " ").concat(start_month, " ").concat(end_month, "\n        group by M.\"facilityId\",F.\"facilityName\"\n\t")).then(function (_ref7) {
                            var _ref8 = (0, _slicedToArray2["default"])(_ref7, 2),
                                results = _ref8[0],
                                metadata = _ref8[1];

                            response.error = false;
                            response.data = results; // console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 8:
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

    return function CHCLvlDao(_x3) {
      return _ref5.apply(this, arguments);
    };
  }();

  var subCenterLvlDao = /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req) {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(resolve) {
                  var response, year, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          response = {};
                          year = "and Year=  ".concat(req.body.year);
                          start_month = "and  M.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  M.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("           \n            select M.\"subCenterId\",S.\"subCenterName\",SUM(\"batchesOfTrainingOrganizedMDAIDA\") AS \"batchesOfTrainingOrganizedMDAIDA\",\nSUM(\"totalStaffSanctioned\") AS \"totalStaffSanctioned\",SUM(0) as \"NoOfVacantPositions\",\nSUM(\"numberTrainedForMDAIDA\") AS \"numberTrainedForMDAIDA\",\nSUM(\"batchesOfTrainingOrganizedMMDP\") AS \"batchesOfTrainingOrganizedMMDP\",\nSUM(\"numberTrainedForMMDP\") AS \"numberTrainedForMMDP\",\n(SUM(\"batchesOfTrainingOrganizedMDAIDA\")+SUM(\"batchesOfTrainingOrganizedMMDP\")) AS \"batchesOfTrainingOrganized\",\n(SUM(\"numberTrainedForMDAIDA\")+SUM(\"numberTrainedForMMDP\")) AS \"numberTrained\"\nfrom \"preMDAActivities\" M\nleft join public.\"subCenters\" S ON S.id=M.\"subCenterId\"\nwhere M.\"isActive\"=true and COALESCE(M.\"subCenterId\",0)>0 \n        ".concat(year, "  ").concat(start_month, " ").concat(end_month, "\n        group by M.\"subCenterId\",S.\"subCenterName\"\n\t")).then(function (_ref11) {
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

                        case 8:
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

    return function subCenterLvlDao(_x5) {
      return _ref9.apply(this, arguments);
    };
  }();

  var coverageReport1Dao = /*#__PURE__*/function () {
    var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req) {
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(resolve) {
                  var response, year, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          response = {}; // var year = `and date_part('Year',M."createdAt") =  ${req.body.year}`
                          // var month = `and date_part('month',M."createdAt") = ${req.body.month}`

                          // var year = `and date_part('Year',M."createdAt") =  ${req.body.year}`
                          // var month = `and date_part('month',M."createdAt") = ${req.body.month}`
                          year = "and Year =  ".concat(req.body.year);
                          start_month = "and  M.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  M.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.year.length == 0) year = ''; // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;

                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("select A.*,\n           ((A.\"noOfPeopleRceivedDrug\"/(CASE A.\"eligiblePopulation\"\n               WHEN 0 Then NULL ELSE A.\"eligiblePopulation\" END))*100) AS \"percentPeopleReceived\",\n            ((A.\"noOfPeopleConsumedDrug\"/(CASE A.\"eligiblePopulation\"\n               WHEN 0 Then NULL ELSE A.\"eligiblePopulation\" END))*100) AS \"percentPeopleConsumed\"\n           from(select M.\"districtId\",D.\"districtName\",'' AS \"datesOfMDA\",\n           SUM(M.\"totalPopulation\") AS \"totalPopulation\",SUM(M.\"eligiblePopulation\") AS \"eligiblePopulation\", \n           (SUM(RL.\"noOfPeopleAdministered\"::INTEGER ) + SUM(ML.\"noOfPeopleAdministered\")) AS \"noOfPeopleRceivedDrug\",\n               0 As \"noOfPeopleConsumedDrug\" \n           from public.\"mdaIDACoverages\" M \n           LEFT JOIN public.\"mdaIDACoverageRegularLists\" RL ON M.id=RL.\"mdaIDACoverageId\"\n           LEFT JOIN public.\"mdaIDACoverageMopUpLists\" ML ON M.id=ML.\"mdaIDACoverageId\"\n           LEFT JOIN public.districts D ON D.id=M.\"districtId\" \n           where M.\"isActive\"=true\n            ".concat(year, " ").concat(start_month, " ").concat(end_month, "\n           group by M.\"districtId\",D.\"districtName\")A")).then(function (_ref15) {
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

                        case 8:
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

    return function coverageReport1Dao(_x7) {
      return _ref13.apply(this, arguments);
    };
  }();

  var infrastructureDao = /*#__PURE__*/function () {
    var _ref17 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req) {
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              return _context10.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(resolve) {
                  var response, year, fyear, facilityId, subCenterId, subCenterId1, subCenterId2, talukaId, districtId, start_month, end_month, subcentre, phc, state;
                  return _regenerator["default"].wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          response = {}; // console.log("req body",req.body)

                          // console.log("req body",req.body)
                          year = '';
                          fyear = '';
                          facilityId = '';
                          subCenterId = "";
                          subCenterId1 = "";
                          subCenterId2 = "";
                          talukaId = '';
                          districtId = '';
                          start_month = "and  month BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  month BETWEEN 1";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (!req.body.facilityId.length == 0) {
                            facilityId = "and \"facilityId\" = ".concat(req.body.facilityId);
                          }

                          if (!req.body.talukaId.length == 0) {
                            talukaId = "and \"facilityId\" = ".concat(req.body.talukaId);
                          }

                          if (!req.body.districtId.length == 0) {
                            districtId = "and \"districtId\" = ".concat(req.body.districtId);
                          }

                          if (!req.body.subCenterId.length == 0) {
                            subCenterId = "and \"subCenterId\" = ".concat(req.body.subCenterId);
                            subCenterId1 = "and P.\"subCenterId\" = ".concat(req.body.subCenterId);
                            subCenterId2 = "and L1.\"subCenterId\" = ".concat(req.body.subCenterId);
                          }

                          if (!req.body.year.length == 0) {
                            year = "and year=  ".concat(req.body.year);
                            fyear = "and year =  ".concat(req.body.year);
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          subcentre = _sequelize["default"].sequelize.query("select  COALESCE(B1.\"subCenterId\",A3.\"subCenterId\") \"subCenterId\",\n                D.\"districtName\",F.\"facilityName\",S.\"subCenterName\",\n                COALESCE(B1.\"facilityId\",A3.\"facilityId\") \"facilityId\",\n                COALESCE(B1.\"districtId\",A3.\"districtId\") \"districtId\",\n                COALESCE(B1.\"NoOfCentresWithSkilledStaff\",0) \"NoOfCentresWithSkilledStaff\", \n                COALESCE(B1.\"NoOfFilariaPatientsManaged\",0) \"NoOfFilariaPatientsManaged\", \n                COALESCE(A3.\"NoOfFilarialHydroceleOperations\",0) \"NoOfFilarialHydroceleOperations\"\n                from\n                (Select COALESCE(A1.\"subCenterId\",A2.\"subCenterId\") \"subCenterId\",COALESCE(A1.\"facilityId\",A2.\"facilityId\") \"facilityId\",\n                COALESCE(A1.\"districtId\",A2.\"districtId\") \"districtId\",A1.\"NoOfCentresWithSkilledStaff\", A2.\"NoOfFilariaPatientsManaged\" \n                from (select count(P.id) AS \"NoOfCentresWithSkilledStaff\" , P.\"subCenterId\",P.\"facilityId\",P.\"districtId\" from public.\"preMDAActivities\" P\n                where (\"numberTrainedForMMDP\" is not null or \"numberTrainedForMDAIDA\" is not null)\n                and  P.\"isActive\"=true and P.\"subCenterId\" <> COALESCE(NULL,0)\n                ".concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(subCenterId, " ").concat(facilityId, " ").concat(talukaId, " ").concat(districtId, "\n                group by P.\"subCenterId\",P.\"facilityId\",P.\"districtId\"\n                ) A1 full outer join\n                (select count(L1.id) AS \"NoOfFilariaPatientsManaged\",  L1.\"subCenterId\",L1.\"facilityId\",L1.\"districtId\" from public.\"lymphedemaLineLists\" L1\n                where  L1.\"isActive\"=true and L1.\"subCenterId\" <> COALESCE(NULL,0)\n                ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(subCenterId, "  ").concat(facilityId, " ").concat(talukaId, " ").concat(districtId, "\n                group by L1.\"subCenterId\",L1.\"facilityId\",L1.\"districtId\"\n                ) A2 on A1.\"subCenterId\"=A2.\"subCenterId\"\n                )B1 full outer join\n                (select count(L.id) AS \"NoOfFilarialHydroceleOperations\",L.\"subCenterId\",L.\"facilityId\",L.\"districtId\" from public.\"lymphedemaLineLists\" L\n                left join (select * from public.\"lymphedemaLineListFollowUpsHFs\" HF where HF.\"isSurgeryDone\"=true)\n                HF1 on HF1.\"lymphedemaLineListId\" = L.id\n                where L.\"diseaseType\" like '%Hydrocele%'\n                and L.\"isActive\"=true and L.\"subCenterId\" <> COALESCE(NULL,0)\n                ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(subCenterId, "  ").concat(facilityId, " ").concat(talukaId, " ").concat(districtId, "\n                group by L.\"subCenterId\",L.\"facilityId\",L.\"districtId\"\n                ) A3  ON B1.\"subCenterId\"=A3.\"subCenterId\"\n                left join public.\"subCenters\" S on S.id=COALESCE(B1.\"subCenterId\",A3.\"subCenterId\")\n                left join public.\"facilities\" F on F.id=COALESCE(B1.\"facilityId\",A3.\"facilityId\")\n                left join public.districts D on D.id=COALESCE(B1.\"districtId\",A3.\"districtId\");")).then(function (_ref19) {
                            var _ref20 = (0, _slicedToArray2["default"])(_ref19, 2),
                                results = _ref20[0],
                                metadata = _ref20[1];

                            return results;
                          });
                          phc = _sequelize["default"].sequelize.query("select  COALESCE(B1.\"facilityId\",A3.\"facilityId\") \"facilityId\",\n                COALESCE(B1.\"districtId\",A3.\"districtId\") \"districtId\",\n                D.\"districtName\",F.\"facilityName\",\n                COALESCE(B1.\"NoOfCentresWithSkilledStaff\",0) \"NoOfCentresWithSkilledStaff\", \n                COALESCE(B1.\"NoOfFilariaPatientsManaged\",0) \"NoOfFilariaPatientsManaged\", \n                COALESCE(A3.\"NoOfFilarialHydroceleOperations\",0) \"NoOfFilarialHydroceleOperations\"\n                from\n                (Select COALESCE(A1.\"facilityId\",A2.\"facilityId\") \"facilityId\",\n                COALESCE(A1.\"districtId\",A2.\"districtId\") \"districtId\",\n                A1.\"NoOfCentresWithSkilledStaff\", A2.\"NoOfFilariaPatientsManaged\" \n                from (select count(P.id) AS \"NoOfCentresWithSkilledStaff\" , P.\"facilityId\",P.\"districtId\" from public.\"preMDAActivities\" P\n                where (\"numberTrainedForMMDP\" is not null or \"numberTrainedForMDAIDA\" is not null)\n                and  P.\"isActive\"=true and P.\"facilityId\" <> COALESCE(NULL,0)\n                ".concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(facilityId, " ").concat(talukaId, " ").concat(districtId, "\n                group by P.\"facilityId\",P.\"districtId\"\n                ) A1 full outer join\n                (select count(id) AS \"NoOfFilariaPatientsManaged\", L1.\"facilityId\",L1.\"districtId\" from public.\"lymphedemaLineLists\" L1\n                where  L1.\"isActive\"=true and L1.\"facilityId\" <> COALESCE(NULL,0)\n                ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(facilityId, " ").concat(talukaId, " ").concat(districtId, "\n                group by L1.\"facilityId\",L1.\"districtId\"\n                ) A2 on A1.\"facilityId\"=A2.\"facilityId\"\n                )B1 full outer join\n                (select count(L.id) AS \"NoOfFilarialHydroceleOperations\",L.\"facilityId\",L.\"districtId\" from public.\"lymphedemaLineLists\" L\n                left join (select * from public.\"lymphedemaLineListFollowUpsHFs\" HF where HF.\"isSurgeryDone\"=true)\n                HF1 on HF1.\"lymphedemaLineListId\" = L.id\n                where L.\"diseaseType\" like '%Hydrocele%'\n                and L.\"isActive\"=true and L.\"facilityId\" <> COALESCE(NULL,0)\n                ").concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(facilityId, " ").concat(talukaId, " ").concat(districtId, "\n                group by L.\"facilityId\",L.\"districtId\"\n                ) A3  ON B1.\"facilityId\"=A3.\"facilityId\"\n                left join public.\"facilities\" F on F.id=COALESCE(B1.\"facilityId\",A3.\"facilityId\")\n                left join public.districts D on D.id=COALESCE(B1.\"districtId\",A3.\"districtId\");")).then(function (_ref21) {
                            var _ref22 = (0, _slicedToArray2["default"])(_ref21, 2),
                                results = _ref22[0],
                                metadata = _ref22[1];

                            return results;
                          });
                          state = _sequelize["default"].sequelize.query("Select A1.\"NoOfCentresWithSkilledStaff\", A2.\"NoOfFilariaPatientsManaged\" , A3.\"NoOfFilarialHydroceleOperations\"\n                from (select 14 as id, count(P.id) AS \"NoOfCentresWithSkilledStaff\" from public.\"preMDAActivities\" P\n                where (\"numberTrainedForMMDP\" is not null or \"numberTrainedForMDAIDA\" is not null)\n                and  P.\"isActive\"=true and P.\"facilityId\" <> COALESCE(NULL,0)\n                ".concat(year, " ").concat(start_month, " ").concat(end_month, "\n                ) A1 left join\n                (select 14 as id, count(id) AS \"NoOfFilariaPatientsManaged\" from public.\"lymphedemaLineLists\" L1\n                where  L1.\"isActive\"=true\n                ").concat(year, " ").concat(start_month, " ").concat(end_month, "\n                 ) A2 on A1.\"id\"=A2.\"id\"\n                left join\n                (select 14 as id, count(L.id) AS \"NoOfFilarialHydroceleOperations\" from public.\"lymphedemaLineLists\" L\n                left join (select * from public.\"lymphedemaLineListFollowUpsHFs\" HF where HF.\"isSurgeryDone\"=true)\n                HF1 on HF1.\"lymphedemaLineListId\" = L.id\n                where L.\"diseaseType\" like '%Hydrocele%'\n                and L.\"isActive\"=true \n                ").concat(year, " ").concat(start_month, " ").concat(end_month, "\n                ) A3  ON A1.\"id\"=A3.\"id\"")).then(function (_ref23) {
                            var _ref24 = (0, _slicedToArray2["default"])(_ref23, 2),
                                results = _ref24[0],
                                metadata = _ref24[1];

                            return results;
                          });
                          Promise.all([subcentre, phc, state]).then(function (data) {
                            response.error = false;
                            var obj = {};
                            obj.subcentre = data[0];
                            obj.phc = data[1];
                            obj.state = data[2];
                            response.data = obj;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 22:
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

            case 4:
              _context10.prev = 4;
              _context10.t0 = _context10["catch"](0);
              console.log("error", error);

            case 7:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[0, 4]]);
    }));

    return function infrastructureDao(_x9) {
      return _ref17.apply(this, arguments);
    };
  }();

  var analysis1_postMDAEvaluationDao = function analysis1_postMDAEvaluationDao(req) {
    return new Promise( /*#__PURE__*/function () {
      var _ref25 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(resolve) {
        var response, year, month, districtId, facilityId, subCenterId, wardId, villageId, nameOfInvestigator, start_month, end_month;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                response = {};
                year = '';
                month = '';
                districtId = '';
                facilityId = '';
                subCenterId = '';
                wardId = '';
                villageId = '';
                nameOfInvestigator = '';
                req.year && req.year.length > 0 && (year = "and year = ".concat(req.year));
                req.districtId && req.districtId.length > 0 && (districtId = "and M.\"districtId\" = ".concat(req.districtId));
                req.facilityId && req.facilityId.length > 0 && (facilityId = "and M.\"facilityId\" = ".concat(req.facilityId));
                req.subCenterId && req.subCenterId.length > 0 && (subCenterId = "and M.\"subCenterId\" = ".concat(req.subCenterId));
                req.wardId && req.wardId.length > 0 && (wardId = "and M.\"wardId\" = ".concat(req.wardId));
                req.nameOfInvestigator && req.nameOfInvestigator.length > 0 && (nameOfInvestigator = "and M.\"nameOfInvestigator\" = '".concat(req.nameOfInvestigator, "'"));
                req.villageId && req.villageId.length > 0 && (villageId = "and M.\"villageId\" = ".concat(req.villageId));
                start_month = "and  M.\"month\" BETWEEN ".concat(req.startMonth, " ");
                end_month = "and  ".concat(req.endMonth);

                if (req.startMonth.length == 0) {
                  start_month = "and  M.\"month\" BETWEEN 1 ";
                }

                if (req.endMonth.length == 0) {
                  end_month = "and 12";
                } // const page = req.page ? req.page : 1;
                // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                // const offset = (page - 1) * itemsPerPage;


                _sequelize["default"].sequelize.query("select  M.Id, M.\"districtId\",D.\"districtName\" , M.\"facilityId\", F.\"facilityName\",\nM.\"subCenterId\",S.\"subCenterName\" ,M.\"wardId\", W.\"wardName\", M.\"villageId\",\nV.\"villageName\",M.\"nameOfInvestigator\",M.\"totalMembersInFamily\" AS \"NoOfPersonsInterviewed\",\ncount(P.\"namePersonsEligibleForMDA\") AS \"NoOfBeneficiaries\",\nSum(P.\"noOfDECTabletsConsumed\") AS \"NoOfPersonsConsumed\",\nSum(P.\"noOfDECTabletsRecovered\") AS \"NoOfPersonsNotConsumed\",\n0 AS \"percentageConsumption\",\n\"isDrugAdministeredInHouse\" AS \"DidDDVisitHouse\",\n0 AS \"PercentageOfHousesVisited\",\n\"resonForNotSwallowDrug\",\n\"reservationDrugAdmin\" AS \"OpinionOfBeneficiariesDD\",\n\"sourceOfInformation\",\n0 AS \"NoOfBenefExpSideEffect\",\n\"deatilsOfSideEffects\",\n0 AS \"NoOfBenefAwareTreat\"\nfrom public.\"postMDAEvalLists\" M\nLEFT JOIN public.\"postMDAEvalListPersons\" P\nON P.\"postMDAEvalListId\"=M.id\nleft join public.districts D on D.id = M.\"districtId\"\nleft join public.facilities F on F.id = M.\"facilityId\"\nleft join public.\"subCenters\" S on S.id = M.\"subCenterId\"\nleft join public.villages V on V.id = M.\"villageId\"\nleft join public.wards W on W.id = M.\"wardId\"\n Where  M.\"isActive\"=true \n ".concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(districtId, " ").concat(facilityId, " ").concat(subCenterId, " ").concat(wardId, " ").concat(villageId, " ").concat(nameOfInvestigator, "\ngroup by M.\"id\",M.\"districtId\",D.\"districtName\" , M.\"facilityId\", F.\"facilityName\",\nM.\"subCenterId\",S.\"subCenterName\" ,M.\"wardId\", W.\"wardName\", M.\"villageId\",\nV.\"villageName\", M.\"districtId\", M.\"facilityId\", M.\"subCenterId\",M.\"wardId\", M.\"villageId\"\n")).then(function (_ref26) {
                  var _ref27 = (0, _slicedToArray2["default"])(_ref26, 2),
                      results = _ref27[0],
                      metadata = _ref27[1];

                  response.error = false;
                  response.data = results; // console.log("results", results)
                })["catch"](function (error) {
                  console.log(error);
                  response.error = true;
                })["finally"](function () {
                  resolve(response);
                });

              case 21:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      return function (_x11) {
        return _ref25.apply(this, arguments);
      };
    }());
  };

  var analysis2_postMDAEvaluationDao = function analysis2_postMDAEvaluationDao(req) {
    return new Promise( /*#__PURE__*/function () {
      var _ref28 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(resolve) {
        var response, year, month, districtId, facilityId, subCenterId, wardId, villageId, nameOfInvestigator, start_month, end_month;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                response = {};
                year = '';
                month = '';
                districtId = '';
                facilityId = '';
                subCenterId = '';
                wardId = '';
                villageId = '';
                nameOfInvestigator = '';
                req.year.length > 0 && (year = "and year = ".concat(req.year));
                req.districtId.length > 0 && (districtId = "and M.\"districtId\" = ".concat(req.districtId));
                req.facilityId.length > 0 && (facilityId = "and M.\"facilityId\" = ".concat(req.facilityId));
                req.subCenterId.length > 0 && (subCenterId = "and M.\"subCenterId\" = ".concat(req.subCenterId));
                req.wardId.length > 0 && (wardId = "and M.\"wardId\" = ".concat(req.wardId));
                req.villageId.length > 0 && (villageId = "and M.\"villageId\" = ".concat(req.villageId));
                req.nameOfInvestigator.length > 0 && (nameOfInvestigator = "and M.\"nameOfInvestigator\" = '".concat(req.nameOfInvestigator, "'"));
                start_month = "and  M.\"month\" BETWEEN ".concat(req.startMonth, " ");
                end_month = "and  ".concat(req.endMonth);

                if (req.startMonth.length == 0) {
                  start_month = "and  M.\"month\" BETWEEN 1 ";
                }

                if (req.endMonth.length == 0) {
                  end_month = "and 12";
                } // const page = req.page ? req.page : 1;
                // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                // const offset = (page - 1) * itemsPerPage;


                _sequelize["default"].sequelize.query("select   M.\"districtId\",D.\"districtName\" , M.\"facilityId\", F.\"facilityName\",\nM.\"subCenterId\",S.\"subCenterName\" ,M.\"wardId\", W.\"wardName\", M.\"villageId\",\nV.\"villageName\",M.\"nameOfInvestigator\",'' AS \"designationOfInvestigator\",\n0 AS \"populationOfVillage\",Count(M.id) AS \"noOfHousesSurveyed\",\nSum(M.\"totalMembersInFamily\") AS \"totalNoOfPersonInHouse\",\nCount(P.\"namePersonsEligibleForMDA\") AS \"totalNoOfBeneficiaries\",\n(Sum(P.\"noOfDECTabletsConsumed\") + Sum(P.\"noOfDECTabletsRecovered\")) AS \"totalNoOfPersonsRecived\",\nSum(P.\"noOfDECTabletsConsumed\") AS \"totalNoOfPersonsConsumed\",\nSum(P.\"noOfDECTabletsRecovered\") AS \"totalNoOfPersonsNotConsumed\",\n0 as \"percentageOfCoverage\", 0 AS \"percentageConsumption\",0 as \"districtReportedCoverage\",\nCount(CASE WHEN M.\"isDrugAdministeredInHouse\" =true THEN 1 ELSE NULL END) as \"noOfHousesDDVisited\",\n0 AS \"PercentageOfHousesVisited\",\nCount(CASE WHEN M.\"isDrugSwallowInDDPresence\" =true THEN 1 ELSE NULL END) as \"noOfPersonsSwallowInPresence\",\n0 AS \"PercentageOfPersonsSwallowInPresence\",\nCount(CASE WHEN M.\"resonForNotSwallowDrug\" IS NOT NULL THEN 1 ELSE NULL END) as \"resonForNotSwallowDrug\",\n--\"resonForNotSwallowDrug\",\nCount(CASE WHEN M.\"reservationDrugAdmin\" IS NOT NULL THEN 1 ELSE NULL END) as \"opinionOfBeneficiariesDD\",\n--\"reservationDrugAdmin\" AS \"OpinionOfBeneficiariesDD\",\nCount(CASE WHEN M.\"sourceOfInformation\" IS NOT NULL THEN 1 ELSE NULL END) as \"sourceOfInformation\",\n--\"sourceOfInformation\",\nCount(CASE WHEN M.\"isYouExperienceSideEffects\" IS NOT NULL THEN 1 ELSE NULL END)  AS \"noOfBenefExpSideEffect\",\n--\"deatilsOfSideEffects\",\"isYouExperienceSideEffects\"\n0 AS \"NoOfBenefAwareTreat\"\nfrom public.\"postMDAEvalLists\" M\nLEFT JOIN public.\"postMDAEvalListPersons\" P\nON P.\"postMDAEvalListId\"=M.id\nleft join public.districts D on D.id = M.\"districtId\"\nleft join public.facilities F on F.id = M.\"facilityId\"\nleft join public.\"subCenters\" S on S.id = M.\"subCenterId\"\nleft join public.villages V on V.id = M.\"villageId\"\nleft join public.wards W on W.id = M.\"wardId\"\nwhere M.\"isActive\"=true\n".concat(year, "  ").concat(districtId, " ").concat(facilityId, " ").concat(subCenterId, " ").concat(wardId, " ").concat(villageId, " ").concat(nameOfInvestigator, "\ngroup by M.\"districtId\",D.\"districtName\" , M.\"facilityId\", F.\"facilityName\",\nM.\"subCenterId\",S.\"subCenterName\" ,M.\"wardId\", W.\"wardName\", M.\"villageId\",\nV.\"villageName\",M.\"nameOfInvestigator\"\n\n")).then(function (_ref29) {
                  var _ref30 = (0, _slicedToArray2["default"])(_ref29, 2),
                      results = _ref30[0],
                      metadata = _ref30[1];

                  response.error = false;
                  response.data = results; // console.log("results", results)
                })["catch"](function (error) {
                  console.log(error);
                  response.error = true;
                })["finally"](function () {
                  resolve(response);
                });

              case 21:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      return function (_x12) {
        return _ref28.apply(this, arguments);
      };
    }());
  };

  var Co_ordinationCommitteReportDao = /*#__PURE__*/function () {
    var _ref31 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req) {
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              return _context14.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref32 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(resolve) {
                  var response, year, start_month, end_month, districtId;
                  return _regenerator["default"].wrap(function _callee13$(_context13) {
                    while (1) {
                      switch (_context13.prev = _context13.next) {
                        case 0:
                          response = {};
                          year = "and Year =  ".concat(req.body.year);
                          start_month = "and  M.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);
                          districtId = "and M.\"districtId\" = ".concat(req.body.districtId);

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  M.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = '';
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          //     db.sequelize.query(`SELECT
                          //     "districtId",
                          //     '' AS "designationOfMembers",
                          //     "dateDistrictCoordComitte" AS "dateOfFirstDCCMeeting"
                          //   FROM public."mdaIECActivities" M
                          //   WHERE "statementOfFundsAllotted" = (SELECT
                          //     id
                          //   FROM public."udCategoryOptions" M
                          //   WHERE "categoryCode" = 1009
                          //   AND "categoryOptionCode" = 'DCCF')
                          //   ${start_month} ${end_month}  ${year} ${districtId}
                          //   UNION
                          //   SELECT
                          //     "districtId",
                          //     '' AS "designationOfMembers",
                          //     "dateDistrictCoordComitte" AS "dateOfFirstDCCMeeting"
                          //   FROM public."mdaIECActivities" M
                          //   WHERE "statementOfFundsAllotted" = (SELECT
                          //     id
                          //   FROM public."udCategoryOptions" M
                          //   WHERE "categoryCode" = 1009
                          //   AND "categoryOptionCode" = 'DCCS')
                          //   ${start_month} ${end_month}  ${year} ${districtId}
                          //   `)


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          //     db.sequelize.query(`SELECT
                          //     "districtId",
                          //     '' AS "designationOfMembers",
                          //     "dateDistrictCoordComitte" AS "dateOfFirstDCCMeeting"
                          //   FROM public."mdaIECActivities" M
                          //   WHERE "statementOfFundsAllotted" = (SELECT
                          //     id
                          //   FROM public."udCategoryOptions" M
                          //   WHERE "categoryCode" = 1009
                          //   AND "categoryOptionCode" = 'DCCF')
                          //   ${start_month} ${end_month}  ${year} ${districtId}
                          //   UNION
                          //   SELECT
                          //     "districtId",
                          //     '' AS "designationOfMembers",
                          //     "dateDistrictCoordComitte" AS "dateOfFirstDCCMeeting"
                          //   FROM public."mdaIECActivities" M
                          //   WHERE "statementOfFundsAllotted" = (SELECT
                          //     id
                          //   FROM public."udCategoryOptions" M
                          //   WHERE "categoryCode" = 1009
                          //   AND "categoryOptionCode" = 'DCCS')
                          //   ${start_month} ${end_month}  ${year} ${districtId}
                          //   `)
                          _sequelize["default"].sequelize.query("\n           \n            select DCC1.\"districtId\",DCC1.\"designationOfMembers\",\n            DCC1.\"dateOfFirstDCCMeeting\",DCC2.\"dateOfSecondDCCMeeting\" from \n            (\n                select 33 as \"districtId\",'' AS \"designationOfMembers\",\"dateDistrictCoordComitte\" AS \"dateOfFirstDCCMeeting\" \n                from public.\"mdaIECActivities\" M\n                where \"statementOfFundsAllotted\"= (select id from public.\"udCategoryOptions\" M \n                                               where \"categoryCode\"=1009 and \"categoryOptionCode\"='DCCF')\n            ".concat(start_month, " ").concat(end_month, "  ").concat(year, " ").concat(districtId, "\n\n            )DCC1 \n            FULL JOIN \n            (\n                select M.\"districtId\",M.\"dateDistrictCoordComitte\" AS \"dateOfSecondDCCMeeting\" \n                        from public.\"mdaIECActivities\" M  \n                        where M.\"statementOfFundsAllotted\"= (select id from public.\"udCategoryOptions\" U\n                                            where U.\"categoryCode\"=1009 and U.\"categoryOptionCode\"='DCCS')\n                                            ").concat(start_month, " ").concat(end_month, " ").concat(year, " ").concat(districtId, "\n\n             )DCC2 ON DCC1.\"districtId\"=DCC2.\"districtId\"\n\t")).then(function (_ref33) {
                            var _ref34 = (0, _slicedToArray2["default"])(_ref33, 2),
                                results = _ref34[0],
                                metadata = _ref34[1];

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
                          return _context13.stop();
                      }
                    }
                  }, _callee13);
                }));

                return function (_x14) {
                  return _ref32.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    }));

    return function Co_ordinationCommitteReportDao(_x13) {
      return _ref31.apply(this, arguments);
    };
  }();

  var DEC100MgDao = /*#__PURE__*/function () {
    var _ref35 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req) {
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              return _context16.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref36 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(resolve) {
                  var response, year, month;
                  return _regenerator["default"].wrap(function _callee15$(_context15) {
                    while (1) {
                      switch (_context15.prev = _context15.next) {
                        case 0:
                          response = {};
                          year = "and  P.Year=  ".concat(req.body.year);
                          month = "and P.month = ".concat(req.body.month);

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.month == 0) {
                            month = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n           \n            select \"nameOfTablet\",\"year\",\"month\",sum(\"quantityTabletInStockBeforeRound\") AS \"tabletInStockBeforeRound\",\n            sum(\"quantityOfTabletReceivedForRound\") AS \"tabletReceivedForRound\",\n            string_agg(\"sourceFromTabletReceivedForRound\", ',') AS \"sourceFromTabletReceived\",\n            sum(\"quantityOfTabletsDestroyedDuringRound\") AS \"tabletsDestroyedDuringRound\",\n            string_agg(\"reasonForTabletsDestroyed\",',') AS \"reasonForTabletsDestroyed\",\n            sum(\"quantityOfBalanceTabletsInStock\") AS \"tabletsBalanceInStock\",\n            string_agg(concat(\"batchNumberOfTabletInStock\",'/',to_char(\"dateOfExpiryTabletInStock\",'DD-MM-YYYY')), ',') AS \"BatchAndExp\",\n            sum(\"quantityTabletRquireForMDA\") \n            from public.\"preMDAActivities\" P\n            left join public.\"preMDAActivityDrugLogistics\" PD ON PD.\"preMDAActivityId\"=P.id\n            where \"nameOfTablet\" like '%DEC%'\n            and P.\"isActive\"=true\n".concat(month, " ").concat(year, "\n            group by \"nameOfTablet\",\"year\",\"month\"\n\t")).then(function (_ref37) {
                            var _ref38 = (0, _slicedToArray2["default"])(_ref37, 2),
                                results = _ref38[0],
                                metadata = _ref38[1];

                            response.error = false;
                            response.data = results; // console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 6:
                        case "end":
                          return _context15.stop();
                      }
                    }
                  }, _callee15);
                }));

                return function (_x16) {
                  return _ref36.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    }));

    return function DEC100MgDao(_x15) {
      return _ref35.apply(this, arguments);
    };
  }();

  var AlbendazoleDao = /*#__PURE__*/function () {
    var _ref39 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(req) {
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              return _context18.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref40 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(resolve) {
                  var response, year, month;
                  return _regenerator["default"].wrap(function _callee17$(_context17) {
                    while (1) {
                      switch (_context17.prev = _context17.next) {
                        case 0:
                          response = {};
                          year = "and  P.Year =  ".concat(req.body.year);
                          month = "and P.month = ".concat(req.body.month);

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.month == 0) {
                            month = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n           \n            select \"nameOfTablet\",\"year\",\"month\",sum(\"quantityTabletInStockBeforeRound\") AS \"tabletInStockBeforeRound\",\n            sum(\"quantityOfTabletReceivedForRound\") AS \"tabletReceivedForRound\",\n            string_agg(\"sourceFromTabletReceivedForRound\", ',') AS \"sourceFromTabletReceived\",\n            sum(\"quantityOfTabletsDestroyedDuringRound\") AS \"tabletsDestroyedDuringRound\",\n            string_agg(\"reasonForTabletsDestroyed\",',') AS \"reasonForTabletsDestroyed\",\n            sum(\"quantityOfBalanceTabletsInStock\") AS \"tabletsBalanceInStock\",\n            string_agg(concat(\"batchNumberOfTabletInStock\",'/',to_char(\"dateOfExpiryTabletInStock\",'DD-MM-YYYY')), ',') AS \"BatchAndExp\",\n            sum(\"quantityTabletRquireForMDA\") \n            from public.\"preMDAActivities\" P\n            left join public.\"preMDAActivityDrugLogistics\" PD ON PD.\"preMDAActivityId\"=P.id\n            where \"nameOfTablet\" like '%Albendazole%'\n            and P.\"isActive\"=true\n".concat(year, " ").concat(month, "\n            group by \"nameOfTablet\",\"year\",\"month\"\n\t")).then(function (_ref41) {
                            var _ref42 = (0, _slicedToArray2["default"])(_ref41, 2),
                                results = _ref42[0],
                                metadata = _ref42[1];

                            response.error = false;
                            response.data = results; // console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 6:
                        case "end":
                          return _context17.stop();
                      }
                    }
                  }, _callee17);
                }));

                return function (_x18) {
                  return _ref40.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    }));

    return function AlbendazoleDao(_x17) {
      return _ref39.apply(this, arguments);
    };
  }();

  var MactizinDao = /*#__PURE__*/function () {
    var _ref43 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20(req) {
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              return _context20.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref44 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(resolve) {
                  var response, year, month;
                  return _regenerator["default"].wrap(function _callee19$(_context19) {
                    while (1) {
                      switch (_context19.prev = _context19.next) {
                        case 0:
                          response = {};
                          year = "and P.Year=  ".concat(req.body.year);
                          month = "and P.month = ".concat(req.body.month);

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.month == 0) {
                            month = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n           \n            select \"nameOfTablet\",\"year\",\"month\",sum(\"quantityTabletInStockBeforeRound\") AS \"tabletInStockBeforeRound\",\nsum(\"quantityOfTabletReceivedForRound\") AS \"tabletReceivedForRound\",\nstring_agg(\"sourceFromTabletReceivedForRound\", ',') AS \"sourceFromTabletReceived\",\nsum(\"quantityOfTabletsDestroyedDuringRound\") AS \"tabletsDestroyedDuringRound\",\nstring_agg(\"reasonForTabletsDestroyed\",',') AS \"reasonForTabletsDestroyed\",\nsum(\"quantityOfBalanceTabletsInStock\") AS \"tabletsBalanceInStock\",\nstring_agg(concat(\"batchNumberOfTabletInStock\",'/',to_char(\"dateOfExpiryTabletInStock\",'DD-MM-YYYY')), ',') AS \"BatchAndExp\",\nsum(\"quantityTabletRquireForMDA\") \nfrom public.\"preMDAActivities\" P\nleft join public.\"preMDAActivityDrugLogistics\" PD ON PD.\"preMDAActivityId\"=P.id\nwhere \"nameOfTablet\" like '%Mactizin%'\nand P.\"isActive\"=true\n".concat(year, " ").concat(month, "\ngroup by \"nameOfTablet\",\"year\",\"month\"\n\t")).then(function (_ref45) {
                            var _ref46 = (0, _slicedToArray2["default"])(_ref45, 2),
                                results = _ref46[0],
                                metadata = _ref46[1];

                            response.error = false;
                            response.data = results; // console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 6:
                        case "end":
                          return _context19.stop();
                      }
                    }
                  }, _callee19);
                }));

                return function (_x20) {
                  return _ref44.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20);
    }));

    return function MactizinDao(_x19) {
      return _ref43.apply(this, arguments);
    };
  }();

  var DrugRequirementMDA2StateDao = /*#__PURE__*/function () {
    var _ref47 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22(req) {
      return _regenerator["default"].wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              return _context22.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref48 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21(resolve) {
                  var response, year;
                  return _regenerator["default"].wrap(function _callee21$(_context21) {
                    while (1) {
                      switch (_context21.prev = _context21.next) {
                        case 0:
                          response = {};
                          year = "and M.Year=  ".concat(req.body.year);

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          _sequelize["default"].sequelize.query("select M.\"statementOfFundsAllotted\" AS \"statementOfFundsAllottedId\", \n                UD1.\"categoryOptionName\" AS \"statementOfFundsAllotted\",\n                SUM(\"fundAllocatedWithDate\") AS \"fundAllocatedWithDate\",\n                SUM(\"fundUtilisedWithDate\") AS \"fundUtilisedWithDate\",\n                SUM(\"fundBalanceAfterRound\") AS \"fundBalanceAfterRound\",\n                M.\"year\",M.\"stateId\"from public.\"mdaIECActivities\" M\n                left join public.\"udCategoryOptions\" UD1 ON UD1.Id = M.\"statementOfFundsAllotted\"\n                where M.\"isActive\"=true ".concat(year, " \n                group by UD1.\"categoryOptionName\",M.\"statementOfFundsAllotted\",M.\"year\",M.\"stateId\"")).then(function (_ref49) {
                            var _ref50 = (0, _slicedToArray2["default"])(_ref49, 2),
                                results = _ref50[0],
                                metadata = _ref50[1];

                            response.error = false;
                            response.data = results; // console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 4:
                        case "end":
                          return _context21.stop();
                      }
                    }
                  }, _callee21);
                }));

                return function (_x22) {
                  return _ref48.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22);
    }));

    return function DrugRequirementMDA2StateDao(_x21) {
      return _ref47.apply(this, arguments);
    };
  }();

  var DrugRequirementMDA2RdDao = /*#__PURE__*/function () {
    var _ref51 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24(req) {
      return _regenerator["default"].wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              return _context24.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref52 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23(resolve) {
                  var response, year;
                  return _regenerator["default"].wrap(function _callee23$(_context23) {
                    while (1) {
                      switch (_context23.prev = _context23.next) {
                        case 0:
                          response = {};
                          year = "and M.Year = ".concat(req.body.year);

                          if (req.body.year.length == 0) {
                            year = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select M.\"statementOfFundsAllotted\" AS \"statementOfFundsAllottedId\",\n                UD1.\"categoryOptionName\" AS \"statementOfFundsAllotted\",\n                SUM(\"fundAllocatedWithDate\") AS \"fundAllocatedWithDate\",\n                SUM(\"fundUtilisedWithDate\") AS \"fundUtilisedWithDate\",\n                SUM(\"fundBalanceAfterRound\") AS \"fundBalanceAfterRound\",\n                \"year\"\n            from public.\"mdaIECActivities\" M\n            left join public.\"udCategoryOptions\" UD1 \n            ON UD1.Id = M.\"statementOfFundsAllotted\"\n            where M.\"districtId\" > 0\nand M.\"isActive\" = true\n            ".concat(year, " \n            group by UD1.\"categoryOptionName\", M.\"statementOfFundsAllotted\", M.\"year\", M.\"stateId\"\n\n                ")).then(function (_ref53) {
                            var _ref54 = (0, _slicedToArray2["default"])(_ref53, 2),
                                results = _ref54[0],
                                metadata = _ref54[1];

                            response.error = false;
                            response.data = results; // console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 4:
                        case "end":
                          return _context23.stop();
                      }
                    }
                  }, _callee23);
                }));

                return function (_x24) {
                  return _ref52.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context24.stop();
          }
        }
      }, _callee24);
    }));

    return function DrugRequirementMDA2RdDao(_x23) {
      return _ref51.apply(this, arguments);
    };
  }();

  var DrugStockAtPHCDao = /*#__PURE__*/function () {
    var _ref55 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26(req) {
      return _regenerator["default"].wrap(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              return _context26.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref56 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25(resolve) {
                  var response, year, districtId, facilityId, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee25$(_context25) {
                    while (1) {
                      switch (_context25.prev = _context25.next) {
                        case 0:
                          response = {};
                          year = "and M.year = ".concat(req.body.year);
                          districtId = "and M.\"districtId\" = ".concat(req.body.districtId);
                          facilityId = "and M.\"facilityId\" = ".concat(req.body.facilityId);
                          start_month = "and  M.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  M.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.facilityId.length == 0) {
                            facilityId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n                select M.\"districtId\", M.\"talukaId\", M.\"facilityId\", MD.\"nameOfTablet\",\n                Sum(MD.\"quantityTabletRquireForMDA\") AS \"quantityTabletRquireForMDA\",\n                Sum(MD.\"quantityTabletInStockBeforeRound\") AS \"quantityTabletInStockBeforeRound\",\n                Sum(MD.\"quantityOfTabletReceivedForRound\") AS \"quantityOfTabletReceivedForRound\",\n                sum(MD.\"quantityOfTabletsDestroyedDuringRound\") AS \"quantityOfTabletsDestroyedDuringRound\",\n                Sum(MD.\"quantityOfBalanceTabletsInStock\") AS \"quantityOfBalanceTabletsInStock\"\n                from public.\"preMDAActivities\" M\n                left join public.\"preMDAActivityDrugLogistics\" MD\n                ON MD.\"preMDAActivityId\" = M.id\n                left join public.districts D on D.id = M.\"districtId\"\n                left join public.talukas T on T.id = M.\"talukaId\"\n                left join public.facilities F on F.id = M.\"facilityId\"\n                where M.\"isActive\" = true    \n                ".concat(start_month, " ").concat(end_month, "\n                ").concat(year, "  ").concat(facilityId, " ").concat(districtId, "\n                group by M.\"districtId\", M.\"talukaId\", M.\"facilityId\", MD.\"nameOfTablet\"\n                ")).then(function (_ref57) {
                            var _ref58 = (0, _slicedToArray2["default"])(_ref57, 2),
                                results = _ref58[0],
                                metadata = _ref58[1];

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
                          return _context25.stop();
                      }
                    }
                  }, _callee25);
                }));

                return function (_x26) {
                  return _ref56.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context26.stop();
          }
        }
      }, _callee26);
    }));

    return function DrugStockAtPHCDao(_x25) {
      return _ref55.apply(this, arguments);
    };
  }();

  var DrugAdminSupervisorAvailabilityDao = /*#__PURE__*/function () {
    var _ref59 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee28(req) {
      return _regenerator["default"].wrap(function _callee28$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              return _context28.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref60 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27(resolve) {
                  var response, year, districtId, facilityId, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee27$(_context27) {
                    while (1) {
                      switch (_context27.prev = _context27.next) {
                        case 0:
                          response = {};
                          year = "and P.year = ".concat(req.body.year);
                          districtId = "and P.\"districtId\" = ".concat(req.body.districtId);
                          facilityId = "and P.\"facilityId\" = ".concat(req.body.facilityId);
                          start_month = "and  P.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  P.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.facilityId.length == 0) {
                            facilityId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select  P.\"districtId\", P.\"facilityId\", P.\"year\", P.\"month\", \n            D.\"districtName\", F.\"facilityName\",\n            SUM(P.\"totalStaffSanctioned\") \"totalStaffSanctioned\", \n            SUM(P.\"totalStaffsUnit\") \"totalStaffsUnit\",\n            SUM(PDA.\"noOfDrugAdministrator\") \"noOfDrugAdministrator\",\n            SUM(P.\"actualAvailableDrugAdmin\") \"actualAvailableDrugAdmin\", \n            SUM(P.\"requiredSupervisors\") \"requiredSupervisors\", \n            SUM(PDS.\"noOfSupervisor\") \"noOfSupervisor\",\n            SUM(P.\"actualAvailableSupervisor\" ) \"actualAvailableSupervisor\" \n          from public.\"preMDAActivities\" P\n          left join public.\"preMDAActivityDrugAdministrators\" PDA on PDA.\"preMDAActivityId\"=P.Id\n          left join public.\"preMDAActivitySupervisors\" PDS on PDS.\"preMDAActivityId\"=P.Id\n          left join public.districts D on D.id = P.\"districtId\"\n          left join public.facilities F on F.id = P.\"facilityId\"\n          where P.\"isActive\" = true\n          ".concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(facilityId, " ").concat(districtId, "\n          group by  P.\"districtId\", P.\"facilityId\", P.\"year\", P.\"month\", \n          D.\"districtName\", F.\"facilityName\" ")).then(function (_ref61) {
                            var _ref62 = (0, _slicedToArray2["default"])(_ref61, 2),
                                results = _ref62[0],
                                metadata = _ref62[1];

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
                          return _context27.stop();
                      }
                    }
                  }, _callee27);
                }));

                return function (_x28) {
                  return _ref60.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context28.stop();
          }
        }
      }, _callee28);
    }));

    return function DrugAdminSupervisorAvailabilityDao(_x27) {
      return _ref59.apply(this, arguments);
    };
  }();

  var PhcHrAndTrainingStatusDao = /*#__PURE__*/function () {
    var _ref63 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee30(req) {
      return _regenerator["default"].wrap(function _callee30$(_context30) {
        while (1) {
          switch (_context30.prev = _context30.next) {
            case 0:
              return _context30.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref64 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee29(resolve) {
                  var response, year, month, districtId, facilityId;
                  return _regenerator["default"].wrap(function _callee29$(_context29) {
                    while (1) {
                      switch (_context29.prev = _context29.next) {
                        case 0:
                          response = {};
                          year = "and P.year = ".concat(req.body.year);
                          month = "and P.month = ".concat(req.body.month);
                          districtId = "and P.\"districtId\" = ".concat(req.body.districtId);
                          facilityId = "and P.\"facilityId\" = ".concat(req.body.facilityId);

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.month.length == 0) {
                            month = "";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.facilityId.length == 0) {
                            facilityId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select P.\"year\", P.\"month\", P.\"districtId\", P.\"facilityId\", D.\"districtName\", F.\"facilityName\",\n            sum(P.\"totalStaffSanctioned\") AS \"totalStaffSanctioned\",\n            SUM(P.\"totalStaffsUnit\") AS \"totalStaffsUnit\", SUM(P.\"totalManDaysRequired\") AS \"totalManDaysRequired\",\n            PDA.\"cadreOfDrugAdminId\", UD1.\"categoryOptionName\" AS \"cadreOfDrugAdmin\",\n            SUM(P.\"actualAvailableDrugAdmin\") AS \"actualAvailableDrugAdmin\",\n            SUM(P.\"requiredSupervisors\") AS \"requiredSupervisors\",\n            PDS.\"cadreOfSupervisorId\", UD2.\"categoryOptionName\" AS \"cadreOfSupervisor\",\n            SUM(P.\"actualAvailableSupervisor\") AS \"actualAvailableSupervisor\",\n            SUM(P.\"numberTrainedForMMDP\") AS \"numberTrainedForMMDP\",\n            SUM(P.\"batchesOfTrainingOrganizedMMDP\") AS \"batchesOfTrainingOrganizedMMDP\",\n            SUM(P.\"numberTrainedForMDAIDA\") AS \"numberTrainedForMDAIDA\",\n            SUM(P.\"batchesOfTrainingOrganizedMDAIDA\")  AS \"batchesOfTrainingOrganizedMDAIDA\"\n            from public.\"preMDAActivities\" P\n            left join public.\"preMDAActivityDrugAdministrators\" PDA on PDA.\"preMDAActivityId\"=P.Id\n            left join public.\"preMDAActivitySupervisors\" PDS on PDS.\"preMDAActivityId\"=P.Id\n            left join public.districts D on D.id = P.\"districtId\"\n            left join public.facilities F on F.id = P.\"facilityId\"\n            left join public.\"udCategoryOptions\" UD1 on UD1.id = PDA.\"cadreOfDrugAdminId\"\n            left join public.\"udCategoryOptions\" UD2 on UD2.id = PDS.\"cadreOfSupervisorId\"\n            where 1 = 1\n            ".concat(year, " ").concat(month, " ").concat(facilityId, " ").concat(districtId, "\n            group by  P.\"year\", P.\"month\", P.\"districtId\", P.\"facilityId\",\n            PDA.\"cadreOfDrugAdminId\", PDS.\"cadreOfSupervisorId\",\n            D.\"districtName\", F.\"facilityName\",\n            UD1.\"categoryOptionName\", UD2.\"categoryOptionName\"\n                ")).then(function (_ref65) {
                            var _ref66 = (0, _slicedToArray2["default"])(_ref65, 2),
                                results = _ref66[0],
                                metadata = _ref66[1];

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
                          return _context29.stop();
                      }
                    }
                  }, _callee29);
                }));

                return function (_x30) {
                  return _ref64.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context30.stop();
          }
        }
      }, _callee30);
    }));

    return function PhcHrAndTrainingStatusDao(_x29) {
      return _ref63.apply(this, arguments);
    };
  }();

  var PHCwiseDrugConsumptionDao = /*#__PURE__*/function () {
    var _ref67 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee32(req) {
      return _regenerator["default"].wrap(function _callee32$(_context32) {
        while (1) {
          switch (_context32.prev = _context32.next) {
            case 0:
              return _context32.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref68 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee31(resolve) {
                  var response, year, month, districtId, facilityId;
                  return _regenerator["default"].wrap(function _callee31$(_context31) {
                    while (1) {
                      switch (_context31.prev = _context31.next) {
                        case 0:
                          response = {};
                          year = "and M1.year = ".concat(req.body.year);
                          month = "and M1.month = ".concat(req.body.month);
                          districtId = "and M1.\"districtId\" = ".concat(req.body.districtId);
                          facilityId = "and M1.\"facilityId\" = ".concat(req.body.facilityId);

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.month.length == 0) {
                            month = "";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.facilityId.length == 0) {
                            facilityId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select M1.\"year\", M1.\"month\", M1.\"districtId\", M1.\"facilityId\", D.\"districtName\", F.\"facilityName\",\n                SUM(M1.\"totalPopulation\") AS \"totalPopulation\",\n                SUM(M1.\"eligiblePopulation\") AS \"eligiblePopulation\",\n                SUM(M1.\"noOfPeopleAdministered\") AS \"noOfPeopleAdministered\"\n            from\n                    (\n                        select M.\"year\", M.\"month\", M.\"districtId\", M.\"facilityId\", M.\"totalPopulation\", M.\"eligiblePopulation\",\n                        (sum(MR.\"noOfPeopleAdministered\") + sum(MM.\"noOfPeopleAdministered\")) AS \"noOfPeopleAdministered\"\n                from public.\"mdaIDACoverages\" M\n                left join public.\"mdaIDACoverageRegularLists\" MR ON MR.\"mdaIDACoverageId\" = M.id\n                left join public.\"mdaIDACoverageMopUpLists\" MM ON MM.\"mdaIDACoverageId\" = M.id\n                group by M.id\n                    )M1\n            left join public.districts D on D.id = M1.\"districtId\"\n            left join public.facilities F on F.id = M1.\"facilityId\"          \n           where 1 = 1\n            ".concat(year, " ").concat(month, " ").concat(facilityId, " ").concat(districtId, "\n            group by  M1.\"year\", M1.\"month\", M1.\"districtId\", M1.\"facilityId\", D.\"districtName\", F.\"facilityName\"\n                ")).then(function (_ref69) {
                            var _ref70 = (0, _slicedToArray2["default"])(_ref69, 2),
                                results = _ref70[0],
                                metadata = _ref70[1];

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
                          return _context31.stop();
                      }
                    }
                  }, _callee31);
                }));

                return function (_x32) {
                  return _ref68.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context32.stop();
          }
        }
      }, _callee32);
    }));

    return function PHCwiseDrugConsumptionDao(_x31) {
      return _ref67.apply(this, arguments);
    };
  }();

  var BifurcationOfRegularAndMopupDao = /*#__PURE__*/function () {
    var _ref71 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee34(req) {
      return _regenerator["default"].wrap(function _callee34$(_context34) {
        while (1) {
          switch (_context34.prev = _context34.next) {
            case 0:
              return _context34.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref72 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee33(resolve) {
                  var response, year, districtId, facilityId, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee33$(_context33) {
                    while (1) {
                      switch (_context33.prev = _context33.next) {
                        case 0:
                          response = {};
                          year = "and M.year = ".concat(req.body.year);
                          districtId = "and M.\"districtId\" = ".concat(req.body.districtId);
                          facilityId = "and M.\"facilityId\" = ".concat(req.body.facilityId);
                          start_month = "and  M.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth);

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  M.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          if (req.body.facilityId.length == 0) {
                            facilityId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n           select M.id, M.\"districtId\", M.\"facilityId\", M.\"villageId\",\n           D.\"districtName\", F.\"facilityName\", V.\"villageName\",\n           'Regular-1' as \"roundR1\",\n           R1.\"noOfPeopleAdministered\" as \"noOfPeopleAdministeredR1\",\n           R1.\"noOfPersonsWithFever\" as \"noOfPersonsWithFeverR1\",\n           R1.\"noOfPersonsWithHeadache\" as \"noOfPersonsWithHeadacheR1\",\n           R1.\"noOfPersonsWithBodyache\" as \"noOfPersonsWithBodyacheR1\",\n           R1.\"noOfPersonsWithNausea\" as \"noOfPersonsWithNauseaR1\",\n           R1.\"noOfPersonsWithVomiting\" as \"noOfPersonsWithVomitingR1\",\n           R1.\"noOfPersonsRecovered\" as \"noOfPersonsRecoveredR1\",\n           R1.\"noOfPersonsNotRecovered\" as \"noOfPersonsNotRecoveredR1\",\n           R1.\"noOfPersonsRequiredHospitalStay\" as \"noOfPersonsRequiredHospitalStayR1\",\n           R1.\"isRequiredHospitalStay\" as \"isRequiredHospitalStayR1\",\n           R1.remarks as remarksR1,\n           'Regular-2' as \"roundR2\",\n           R2.\"noOfPeopleAdministered\" as \"noOfPeopleAdministeredR2\",\n           R2.\"noOfPersonsWithFever\" as \"noOfPersonsWithFeverR2\",\n           R2.\"noOfPersonsWithHeadache\" as \"noOfPersonsWithHeadacheR2\",\n           R2.\"noOfPersonsWithBodyache\" as \"noOfPersonsWithBodyacheR2\",\n           R2.\"noOfPersonsWithNausea\" as \"noOfPersonsWithNauseaR2\",\n           R2.\"noOfPersonsWithVomiting\" as \"noOfPersonsWithVomitingR2\",\n           R2.\"noOfPersonsRecovered\" as \"noOfPersonsRecoveredR2\",\n           R2.\"noOfPersonsNotRecovered\" as \"noOfPersonsNotRecoveredR2\",\n           R2.\"noOfPersonsRequiredHospitalStay\" as \"noOfPersonsRequiredHospitalStayR2\",\n           R2.\"isRequiredHospitalStay\" as \"isRequiredHospitalStayR2\",\n           R2.remarks as remarksR2,\n           'Regular-3' as \"roundR3\",\n           R3.\"noOfPeopleAdministered\" as \"noOfPeopleAdministeredR3\",\n           R3.\"noOfPersonsWithFever\" as \"noOfPersonsWithFeverR3\",\n           R3.\"noOfPersonsWithHeadache\" as \"noOfPersonsWithHeadacheR3\",\n           R3.\"noOfPersonsWithBodyache\" as \"noOfPersonsWithBodyacheR3\",\n           R3.\"noOfPersonsWithNausea\" as \"noOfPersonsWithNauseaR3\",\n           R3.\"noOfPersonsWithVomiting\" as \"noOfPersonsWithVomitingR3\",\n           R3.\"noOfPersonsRecovered\" as \"noOfPersonsRecoveredR3\",\n           R3.\"noOfPersonsNotRecovered\" as \"noOfPersonsNotRecoveredR3\",\n           R3.\"noOfPersonsRequiredHospitalStay\" as \"noOfPersonsRequiredHospitalStayR3\",\n           R3.\"isRequiredHospitalStay\" as \"isRequiredHospitalStayR3\",\n           R3.remarks as remarksR3,\n           'Regular-4' as \"roundR4\",\n           R4.\"noOfPeopleAdministered\" as \"noOfPeopleAdministeredR4\",\n           R4.\"noOfPersonsWithFever\" as \"noOfPersonsWithFeverR4\",\n           R4.\"noOfPersonsWithHeadache\" as \"noOfPersonsWithHeadacheR4\",\n           R4.\"noOfPersonsWithBodyache\" as \"noOfPersonsWithBodyacheR4\",\n           R4.\"noOfPersonsWithNausea\" as \"noOfPersonsWithNauseaR4\",\n           R4.\"noOfPersonsWithVomiting\" as \"noOfPersonsWithVomitingR4\",\n           R4.\"noOfPersonsRecovered\" as \"noOfPersonsRecoveredR4\",\n           R4.\"noOfPersonsNotRecovered\" as \"noOfPersonsNotRecoveredR4\",\n           R4.\"noOfPersonsRequiredHospitalStay\" as \"noOfPersonsRequiredHospitalStayR4\",\n           R4.\"isRequiredHospitalStay\" as \"isRequiredHospitalStayR4\",\n           R4.remarks as remarksR4,\n           'Regular-5' as \"roundR5\",\n           R5.\"noOfPeopleAdministered\" as \"noOfPeopleAdministeredR5\",\n           R5.\"noOfPersonsWithFever\" as \"noOfPersonsWithFeverR5\",\n           R5.\"noOfPersonsWithHeadache\" as \"noOfPersonsWithHeadacheR5\",\n           R5.\"noOfPersonsWithBodyache\" as \"noOfPersonsWithBodyacheR5\",\n           R5.\"noOfPersonsWithNausea\" as \"noOfPersonsWithNauseaR5\",\n           R5.\"noOfPersonsWithVomiting\" as \"noOfPersonsWithVomitingR5\",\n           R5.\"noOfPersonsRecovered\" as \"noOfPersonsRecoveredR5\",\n           R5.\"noOfPersonsNotRecovered\" as \"noOfPersonsNotRecoveredR5\",\n           R5.\"noOfPersonsRequiredHospitalStay\" as \"noOfPersonsRequiredHospitalStayR5\",\n           R5.\"isRequiredHospitalStay\" as \"isRequiredHospitalStayR5\",\n           R5.remarks as remarksR5,\n           'Regular-6' as \"roundR6\",\n           R6.\"noOfPeopleAdministered\" as \"noOfPeopleAdministeredR6\",\n           R6.\"noOfPersonsWithFever\" as \"noOfPersonsWithFeverR6\",\n           R6.\"noOfPersonsWithHeadache\" as \"noOfPersonsWithHeadacheR6\",\n           R6.\"noOfPersonsWithBodyache\" as \"noOfPersonsWithBodyacheR6\",\n           R6.\"noOfPersonsWithNausea\" as \"noOfPersonsWithNauseaR6\",\n           R6.\"noOfPersonsWithVomiting\" as \"noOfPersonsWithVomitingR6\",\n           R6.\"noOfPersonsRecovered\" as \"noOfPersonsRecoveredR6\",\n           R6.\"noOfPersonsNotRecovered\" as \"noOfPersonsNotRecoveredR6\",\n           R6.\"noOfPersonsRequiredHospitalStay\" as \"noOfPersonsRequiredHospitalStayR6\",\n           R6.\"isRequiredHospitalStay\" as \"isRequiredHospitalStayR6\",\n           R6.remarks as remarksR6,\n           'Regular-7' as \"roundR7\",\n           R7.\"noOfPeopleAdministered\" as \"noOfPeopleAdministeredR7\",\n           R7.\"noOfPersonsWithFever\" as \"noOfPersonsWithFeverR7\",\n           R7.\"noOfPersonsWithHeadache\" as \"noOfPersonsWithHeadacheR7\",\n           R7.\"noOfPersonsWithBodyache\" as \"noOfPersonsWithBodyacheR7\",\n           R7.\"noOfPersonsWithNausea\" as \"noOfPersonsWithNauseaR7\",\n           R7.\"noOfPersonsWithVomiting\" as \"noOfPersonsWithVomitingR7\",\n           R7.\"noOfPersonsRecovered\" as \"noOfPersonsRecoveredR7\",\n           R7.\"noOfPersonsNotRecovered\" as \"noOfPersonsNotRecoveredR7\",\n           R7.\"noOfPersonsRequiredHospitalStay\" as \"noOfPersonsRequiredHospitalStayR7\",\n           R7.\"isRequiredHospitalStay\" as \"isRequiredHospitalStayR7\",\n           R7.remarks as remarksR7,\n           'Regular-8' as \"roundR8\",\n           R8.\"noOfPeopleAdministered\" as \"noOfPeopleAdministeredR8\",\n           R8.\"noOfPersonsWithFever\" as \"noOfPersonsWithFeverR8\",\n           R8.\"noOfPersonsWithHeadache\" as \"noOfPersonsWithHeadacheR8\",\n           R8.\"noOfPersonsWithBodyache\" as \"noOfPersonsWithBodyacheR8\",\n           R8.\"noOfPersonsWithNausea\" as \"noOfPersonsWithNauseaR8\",\n           R8.\"noOfPersonsWithVomiting\" as \"noOfPersonsWithVomitingR8\",\n           R8.\"noOfPersonsRecovered\" as \"noOfPersonsRecoveredR8\",\n           R8.\"noOfPersonsNotRecovered\" as \"noOfPersonsNotRecoveredR8\",\n           R8.\"noOfPersonsRequiredHospitalStay\" as \"noOfPersonsRequiredHospitalStayR8\",\n           R8.\"isRequiredHospitalStay\" as \"isRequiredHospitalStayR8\",\n           R8.remarks as remarksR8,\n       \n           'Regular-9' as \"roundR9\",\n           R9.\"noOfPeopleAdministered\" as \"noOfPeopleAdministeredR9\",\n           R9.\"noOfPersonsWithFever\" as \"noOfPersonsWithFeverR9\",\n           R9.\"noOfPersonsWithHeadache\" as \"noOfPersonsWithHeadacheR9\",\n           R9.\"noOfPersonsWithBodyache\" as \"noOfPersonsWithBodyacheR9\",\n           R9.\"noOfPersonsWithNausea\" as \"noOfPersonsWithNauseaR9\",\n           R9.\"noOfPersonsWithVomiting\" as \"noOfPersonsWithVomitingR9\",\n           R9.\"noOfPersonsRecovered\" as \"noOfPersonsRecoveredR9\",\n           R9.\"noOfPersonsNotRecovered\" as \"noOfPersonsNotRecoveredR9\",\n           R9.\"noOfPersonsRequiredHospitalStay\" as \"noOfPersonsRequiredHospitalStayR9\",\n           R9.\"isRequiredHospitalStay\" as \"isRequiredHospitalStayR9\",\n           R9.remarks as remarksR9,\n           'Regular-10' as \"roundR10\",\n           R10.\"noOfPeopleAdministered\" as \"noOfPeopleAdministeredR10\",\n           R10.\"noOfPersonsWithFever\" as \"noOfPersonsWithFeverR10\",\n           R10.\"noOfPersonsWithHeadache\" as \"noOfPersonsWithHeadacheR10\",\n           R10.\"noOfPersonsWithBodyache\" as \"noOfPersonsWithBodyacheR10\",\n           R10.\"noOfPersonsWithNausea\" as \"noOfPersonsWithNauseaR10\",\n           R10.\"noOfPersonsWithVomiting\" as \"noOfPersonsWithVomitingR10\",\n           R10.\"noOfPersonsRecovered\" as \"noOfPersonsRecoveredR10\",\n           R10.\"noOfPersonsNotRecovered\" as \"noOfPersonsNotRecoveredR10\",\n           R10.\"noOfPersonsRequiredHospitalStay\" as \"noOfPersonsRequiredHospitalStayR10\",\n           R10.\"isRequiredHospitalStay\" as \"isRequiredHospitalStayR10\",\n           R10.remarks as remarksR10,\n           'MopUp-1' as \"roundM1\",\n           M1.\"noOfPeopleAdministered\" as \"noOfPeopleAdministeredM1\",\n           M1.\"noOfPersonsWithFever\" as \"noOfPersonsWithFeverM1\",\n           M1.\"noOfPersonsWithHeadache\" as \"noOfPersonsWithHeadacheM1\",\n           M1.\"noOfPersonsWithBodyache\" as \"noOfPersonsWithBodyacheM1\",\n           M1.\"noOfPersonsWithNausea\" as \"noOfPersonsWithNauseaM1\",\n           M1.\"noOfPersonsWithVomiting\" as \"noOfPersonsWithVomitingM1\",\n           M1.\"noOfPersonsRecovered\" as \"noOfPersonsRecoveredM1\",\n           M1.\"noOfPersonsNotRecovered\" as \"noOfPersonsNotRecoveredM1\",\n           M1.\"noOfPersonsRequiredHospitalStay\" as \"noOfPersonsRequiredHospitalStayM1\",\n           M1.\"isRequiredHospitalStay\" as \"isRequiredHospitalStayM1\",\n           M1.remarks as remarksM1,\n           'MopUp-2' as \"roundM2\",\n           M2.\"noOfPeopleAdministered\" as \"noOfPeopleAdministeredM2\",\n           M2.\"noOfPersonsWithFever\" as \"noOfPersonsWithFeverM2\",\n           M2.\"noOfPersonsWithHeadache\" as \"noOfPersonsWithHeadacheM2\",\n           M2.\"noOfPersonsWithBodyache\" as \"noOfPersonsWithBodyacheM2\",\n           M2.\"noOfPersonsWithNausea\" as \"noOfPersonsWithNauseaM2\",\n           M2.\"noOfPersonsWithVomiting\" as \"noOfPersonsWithVomitingM2\",\n           M2.\"noOfPersonsRecovered\" as \"noOfPersonsRecoveredM2\",\n           M2.\"noOfPersonsNotRecovered\" as \"noOfPersonsNotRecoveredM2\",\n           M2.\"noOfPersonsRequiredHospitalStay\" as \"noOfPersonsRequiredHospitalStayM2\",\n           M2.\"isRequiredHospitalStay\" as \"isRequiredHospitalStayM2\",\n           M2.remarks as remarksM2,\n           'MopUp-3' as \"roundM3\",\n           M3.\"noOfPeopleAdministered\" as \"noOfPeopleAdministeredM3\",\n           M3.\"noOfPersonsWithFever\" as \"noOfPersonsWithFeverM3\",\n           M3.\"noOfPersonsWithHeadache\" as \"noOfPersonsWithHeadacheM3\",\n           M3.\"noOfPersonsWithBodyache\" as \"noOfPersonsWithBodyacheM3\",\n           M3.\"noOfPersonsWithNausea\" as \"noOfPersonsWithNauseaM3\",\n           M3.\"noOfPersonsWithVomiting\" as \"noOfPersonsWithVomitingM3\",\n           M3.\"noOfPersonsRecovered\" as \"noOfPersonsRecoveredM3\",\n           M3.\"noOfPersonsNotRecovered\" as \"noOfPersonsNotRecoveredM3\",\n           M3.\"noOfPersonsRequiredHospitalStay\" as \"noOfPersonsRequiredHospitalStayM3\",\n           M3.\"isRequiredHospitalStay\" as \"isRequiredHospitalStayM3\",\n           M3.remarks as remarksM3,\n           'MopUp-4' as \"roundM4\",\n           M4.\"noOfPeopleAdministered\" as \"noOfPeopleAdministeredM4\",\n           M4.\"noOfPersonsWithFever\" as \"noOfPersonsWithFeverM4\",\n           M4.\"noOfPersonsWithHeadache\" as \"noOfPersonsWithHeadacheM4\",\n           M4.\"noOfPersonsWithBodyache\" as \"noOfPersonsWithBodyacheM4\",\n           M4.\"noOfPersonsWithNausea\" as \"noOfPersonsWithNauseaM4\",\n           M4.\"noOfPersonsWithVomiting\" as \"noOfPersonsWithVomitingM4\",\n           M4.\"noOfPersonsRecovered\" as \"noOfPersonsRecoveredM4\",\n           M4.\"noOfPersonsNotRecovered\" as \"noOfPersonsNotRecoveredM4\",\n           M4.\"noOfPersonsRequiredHospitalStay\" as \"noOfPersonsRequiredHospitalStayM4\",\n           M4.\"isRequiredHospitalStay\" as \"isRequiredHospitalStayM4\",\n           M4.remarks as remarksM4,\n           'MopUp-5' as \"roundM5\",\n           M5.\"noOfPeopleAdministered\" as \"noOfPeopleAdministeredM5\",\n           M5.\"noOfPersonsWithFever\" as \"noOfPersonsWithFeverM5\",\n           M5.\"noOfPersonsWithHeadache\" as \"noOfPersonsWithHeadacheM5\",\n           M5.\"noOfPersonsWithBodyache\" as \"noOfPersonsWithBodyacheM5\",\n           M5.\"noOfPersonsWithNausea\" as \"noOfPersonsWithNauseaM5\",\n           M5.\"noOfPersonsWithVomiting\" as \"noOfPersonsWithVomitingM5\",\n           M5.\"noOfPersonsRecovered\" as \"noOfPersonsRecoveredM5\",\n           M5.\"noOfPersonsNotRecovered\" as \"noOfPersonsNotRecoveredM5\",\n           M5.\"noOfPersonsRequiredHospitalStay\" as \"noOfPersonsRequiredHospitalStayM5\",\n           M5.\"isRequiredHospitalStay\" as \"isRequiredHospitalStayM5\",\n           M5.remarks as remarksM5,\n           'MopUp-5' as \"roundM6\",\n           M6.\"noOfPeopleAdministered\" as \"noOfPeopleAdministeredM6\",\n           M6.\"noOfPersonsWithFever\" as \"noOfPersonsWithFeverM6\",\n           M6.\"noOfPersonsWithHeadache\" as \"noOfPersonsWithHeadacheM6\",\n           M6.\"noOfPersonsWithBodyache\" as \"noOfPersonsWithBodyacheM6\",\n           M6.\"noOfPersonsWithNausea\" as \"noOfPersonsWithNauseaM6\",\n           M6.\"noOfPersonsWithVomiting\" as \"noOfPersonsWithVomitingM6\",\n           M6.\"noOfPersonsRecovered\" as \"noOfPersonsRecoveredM6\",\n           M6.\"noOfPersonsNotRecovered\" as \"noOfPersonsNotRecoveredM6\",\n           M6.\"noOfPersonsRequiredHospitalStay\" as \"noOfPersonsRequiredHospitalStayM6\",\n           M6.\"isRequiredHospitalStay\" as \"isRequiredHospitalStayM6\",\n           M6.remarks as remarksM6,\n           'MopUp-7' as \"roundM7\",\n           M7.\"noOfPeopleAdministered\" as \"noOfPeopleAdministeredM7\",\n           M7.\"noOfPersonsWithFever\" as \"noOfPersonsWithFeverM7\",\n           M7.\"noOfPersonsWithHeadache\" as \"noOfPersonsWithHeadacheM7\",\n           M7.\"noOfPersonsWithBodyache\" as \"noOfPersonsWithBodyacheM7\",\n           M7.\"noOfPersonsWithNausea\" as \"noOfPersonsWithNauseaM7\",\n           M7.\"noOfPersonsWithVomiting\" as \"noOfPersonsWithVomitingM7\",\n           M7.\"noOfPersonsRecovered\" as \"noOfPersonsRecoveredM7\",\n           M7.\"noOfPersonsNotRecovered\" as \"noOfPersonsNotRecoveredM7\",\n           M7.\"noOfPersonsRequiredHospitalStay\" as \"noOfPersonsRequiredHospitalStayM7\",\n           M7.\"isRequiredHospitalStay\" as \"isRequiredHospitalStayM7\",\n           M7.remarks as remarksM7,\n           'MopUp-8' as \"roundM8\",\n           M8.\"noOfPeopleAdministered\" as \"noOfPeopleAdministeredM8\",\n           M8.\"noOfPersonsWithFever\" as \"noOfPersonsWithFeverM8\",\n           M8.\"noOfPersonsWithHeadache\" as \"noOfPersonsWithHeadacheM8\",\n           M8.\"noOfPersonsWithBodyache\" as \"noOfPersonsWithBodyacheM8\",\n           M8.\"noOfPersonsWithNausea\" as \"noOfPersonsWithNauseaM8\",\n           M8.\"noOfPersonsWithVomiting\" as \"noOfPersonsWithVomitingM8\",\n           M8.\"noOfPersonsRecovered\" as \"noOfPersonsRecoveredM8\",\n           M8.\"noOfPersonsNotRecovered\" as \"noOfPersonsNotRecoveredM8\",\n           M8.\"noOfPersonsRequiredHospitalStay\" as \"noOfPersonsRequiredHospitalStayM8\",\n           M8.\"isRequiredHospitalStay\" as \"isRequiredHospitalStayM8\",\n           M8.remarks as remarksM8,\n           'MopUp-9' as \"roundM9\",\n           M9.\"noOfPeopleAdministered\" as \"noOfPeopleAdministeredM9\",\n           M9.\"noOfPersonsWithFever\" as \"noOfPersonsWithFeverM9\",\n           M9.\"noOfPersonsWithHeadache\" as \"noOfPersonsWithHeadacheM9\",\n           M9.\"noOfPersonsWithBodyache\" as \"noOfPersonsWithBodyacheM9\",\n           M9.\"noOfPersonsWithNausea\" as \"noOfPersonsWithNauseaM9\",\n           M9.\"noOfPersonsWithVomiting\" as \"noOfPersonsWithVomitingM9\",\n           M9.\"noOfPersonsRecovered\" as \"noOfPersonsRecoveredM9\",\n           M9.\"noOfPersonsNotRecovered\" as \"noOfPersonsNotRecoveredM9\",\n           M9.\"noOfPersonsRequiredHospitalStay\" as \"noOfPersonsRequiredHospitalStayM9\",\n           M9.\"isRequiredHospitalStay\" as \"isRequiredHospitalStayM9\",\n           M9.remarks as remarksM9,\n           'MopUp-10' as \"roundM10\",\n           M10.\"noOfPeopleAdministered\" as \"noOfPeopleAdministeredM10\",\n           M10.\"noOfPersonsWithFever\" as \"noOfPersonsWithFeverM10\",\n           M10.\"noOfPersonsWithHeadache\" as \"noOfPersonsWithHeadacheM10\",\n           M10.\"noOfPersonsWithBodyache\" as \"noOfPersonsWithBodyacheM10\",\n           M10.\"noOfPersonsWithNausea\" as \"noOfPersonsWithNauseaM10\",\n           M10.\"noOfPersonsWithVomiting\" as \"noOfPersonsWithVomitingM10\",\n           M10.\"noOfPersonsRecovered\" as \"noOfPersonsRecoveredM10\",\n           M10.\"noOfPersonsNotRecovered\" as \"noOfPersonsNotRecoveredM10\",\n           M10.\"noOfPersonsRequiredHospitalStay\" as \"noOfPersonsRequiredHospitalStayM10\",\n           M10.\"isRequiredHospitalStay\" as \"isRequiredHospitalStayM10\",\n           M10.remarks as remarksM10\n           from public.\"mdaIDACoverages\" M\n           left join public.districts D on D.id = M.\"districtId\"\n           left join public.facilities F on F.id = M.\"facilityId\"\n           left join public.villages V on V.id = M.\"villageId\"\n           left join\n               (select * from public.\"mdaIDACoverageRegularLists\" where regular = 1)\n           R1 ON R1.\"mdaIDACoverageId\" = M.id\n           left join\n               (select * from public.\"mdaIDACoverageRegularLists\" where regular = 2)\n           R2 ON R2.\"mdaIDACoverageId\" = M.id\n           left join\n               (select * from public.\"mdaIDACoverageRegularLists\" where regular = 3)\n           R3 ON R3.\"mdaIDACoverageId\" = M.id\n           left join\n               (select * from public.\"mdaIDACoverageRegularLists\" where regular = 4)\n           R4 ON R4.\"mdaIDACoverageId\" = M.id\n           left join\n               (select * from public.\"mdaIDACoverageRegularLists\" where regular = 5)\n           R5 ON R5.\"mdaIDACoverageId\" = M.id\n           left join\n               (select * from public.\"mdaIDACoverageRegularLists\" where regular = 6)\n           R6 ON R6.\"mdaIDACoverageId\" = M.id\n           left join\n               (select * from public.\"mdaIDACoverageRegularLists\" where regular = 7)\n           R7 ON R7.\"mdaIDACoverageId\" = M.id\n           left join\n               (select * from public.\"mdaIDACoverageRegularLists\" where regular = 8)\n           R8 ON R8.\"mdaIDACoverageId\" = M.id\n           left join\n               (select * from public.\"mdaIDACoverageRegularLists\" where regular = 9)\n           R9 ON R9.\"mdaIDACoverageId\" = M.id\n           left join\n               (select * from public.\"mdaIDACoverageRegularLists\" where regular = 10)\n           R10 ON R10.\"mdaIDACoverageId\" = M.id\n           left join\n               (select * from public.\"mdaIDACoverageMopUpLists\" where \"mopUp\" = 1)\n           M1 ON M1.\"mdaIDACoverageId\" = M.id\n           left join\n               (select * from public.\"mdaIDACoverageMopUpLists\" where \"mopUp\" = 2)\n           M2 ON M2.\"mdaIDACoverageId\" = M.id\n           left join\n               (select * from public.\"mdaIDACoverageMopUpLists\" where \"mopUp\" = 3)\n           M3 ON M3.\"mdaIDACoverageId\" = M.id\n           left join\n               (select * from public.\"mdaIDACoverageMopUpLists\" where \"mopUp\" = 4)\n           M4 ON M4.\"mdaIDACoverageId\" = M.id\n           left join\n               (select * from public.\"mdaIDACoverageMopUpLists\" where \"mopUp\" = 5)\n           M5 ON M5.\"mdaIDACoverageId\" = M.id\n           left join\n               (select * from public.\"mdaIDACoverageMopUpLists\" where \"mopUp\" = 6)\n           M6 ON M6.\"mdaIDACoverageId\" = M.id\n           left join\n               (select * from public.\"mdaIDACoverageMopUpLists\" where \"mopUp\" = 7)\n           M7 ON M7.\"mdaIDACoverageId\" = M.id\n           left join\n               (select * from public.\"mdaIDACoverageMopUpLists\" where \"mopUp\" = 8)\n           M8 ON M8.\"mdaIDACoverageId\" = M.id\n           left join\n               (select * from public.\"mdaIDACoverageMopUpLists\" where \"mopUp\" = 9)\n           M9 ON M9.\"mdaIDACoverageId\" = M.id\n           left join\n               (select * from public.\"mdaIDACoverageMopUpLists\" where \"mopUp\" = 10)\n           M10 ON M10.\"mdaIDACoverageId\" = M.id\n           where 1 = 1\n            ".concat(year, " ").concat(start_month, " ").concat(end_month, " ").concat(facilityId, " ").concat(districtId, "\n\n            ")).then(function (_ref73) {
                            var _ref74 = (0, _slicedToArray2["default"])(_ref73, 2),
                                results = _ref74[0],
                                metadata = _ref74[1];

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
                          return _context33.stop();
                      }
                    }
                  }, _callee33);
                }));

                return function (_x34) {
                  return _ref72.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context34.stop();
          }
        }
      }, _callee34);
    }));

    return function BifurcationOfRegularAndMopupDao(_x33) {
      return _ref71.apply(this, arguments);
    };
  }();

  var ExpenditureBalanceReceivedFundsDao = /*#__PURE__*/function () {
    var _ref75 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee36(req) {
      return _regenerator["default"].wrap(function _callee36$(_context36) {
        while (1) {
          switch (_context36.prev = _context36.next) {
            case 0:
              return _context36.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref76 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee35(resolve) {
                  var response, year, districtId, start_month, end_month;
                  return _regenerator["default"].wrap(function _callee35$(_context35) {
                    while (1) {
                      switch (_context35.prev = _context35.next) {
                        case 0:
                          response = {};
                          year = "and M.year = ".concat(req.body.year, " ");
                          districtId = "and M.\"districtId\" = ".concat(req.body.districtId, " ");
                          start_month = "and  M.\"month\" BETWEEN ".concat(req.body.startMonth, " ");
                          end_month = "and  ".concat(req.body.endMonth, " ");

                          if (req.body.startMonth.length == 0) {
                            start_month = "and  M.\"month\" BETWEEN 1 ";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "and 12";
                          }

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select M.\"year\", M.\"month\", M.\"districtId\", D.\"districtName\",\n                M.\"materialActivity\" AS \"materialActivityId\", UD2.\"categoryOptionName\" AS \"materialActivity\",\n                    M.\"materialActivityNo\", M.\"materialActivityCostInRs\",\n                        M.\"statementOfFundsAllotted\" AS \"statementOfFundsAllottedId\", UD1.\"categoryOptionName\" AS \"statementOfFundsAllotted\",\n                            M.\"dateDistrictCoordComitte\", M.\"fundAllocatedWithDate\", M.\"fundUtilisedWithDate\", M.\"fundBalanceAfterRound\"\n            from public.\"mdaIECActivities\" M\n            left join public.\"udCategoryOptions\" UD1 on UD1.id = M.\"statementOfFundsAllotted\"\n            left join public.\"udCategoryOptions\" UD2 on UD2.id = M.\"materialActivity\"\n            left join public.districts D on D.id = M.\"districtId\"\n            where M.\"isActive\" = true\n            ".concat(year, " ").concat(start_month, " ").concat(end_month, "  ").concat(districtId, "\n\n            ")).then(function (_ref77) {
                            var _ref78 = (0, _slicedToArray2["default"])(_ref77, 2),
                                results = _ref78[0],
                                metadata = _ref78[1];

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
                          return _context35.stop();
                      }
                    }
                  }, _callee35);
                }));

                return function (_x36) {
                  return _ref76.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context36.stop();
          }
        }
      }, _callee36);
    }));

    return function ExpenditureBalanceReceivedFundsDao(_x35) {
      return _ref75.apply(this, arguments);
    };
  }();

  var ProposalWithdrawalOfMDADao = /*#__PURE__*/function () {
    var _ref79 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee38(req) {
      return _regenerator["default"].wrap(function _callee38$(_context38) {
        while (1) {
          switch (_context38.prev = _context38.next) {
            case 0:
              return _context38.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref80 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee37(resolve) {
                  var response, year, districtId;
                  return _regenerator["default"].wrap(function _callee37$(_context37) {
                    while (1) {
                      switch (_context37.prev = _context37.next) {
                        case 0:
                          response = {};
                          year = "and M.year = ".concat(req.body.year, " ");
                          districtId = "and M.\"districtId\" = ".concat(req.body.districtId, " ");

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          }

                          _sequelize["default"].sequelize.query("\n            select M.\"districtId\",D.\"districtName\",null \"sampleSizeELFGuidelines\", \n            Max(MR.regular) \"noOfRound\", null \"proposedDatesOfTAS\" from public.\"mdaIDACoverages\" M\n            left join public.\"mdaIDACoverageRegularLists\" MR ON M.id=MR.\"mdaIDACoverageId\"\n            left join public.districts D ON D.id=M.\"districtId\"\n            where 1=1  ".concat(year, "  ").concat(districtId, "\n            group by M.\"districtId\",D.\"districtName\"\n            ")).then(function (_ref81) {
                            var _ref82 = (0, _slicedToArray2["default"])(_ref81, 2),
                                results = _ref82[0],
                                metadata = _ref82[1];

                            response.error = false;
                            response.data = results; // console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 6:
                        case "end":
                          return _context37.stop();
                      }
                    }
                  }, _callee37);
                }));

                return function (_x38) {
                  return _ref80.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context38.stop();
          }
        }
      }, _callee38);
    }));

    return function ProposalWithdrawalOfMDADao(_x37) {
      return _ref79.apply(this, arguments);
    };
  }();

  return {
    StateLvlDao: StateLvlDao,
    CHCLvlDao: CHCLvlDao,
    coverageReport1Dao: coverageReport1Dao,
    subCenterLvlDao: subCenterLvlDao,
    infrastructureDao: infrastructureDao,
    analysis1_postMDAEvaluationDao: analysis1_postMDAEvaluationDao,
    analysis2_postMDAEvaluationDao: analysis2_postMDAEvaluationDao,
    Co_ordinationCommitteReportDao: Co_ordinationCommitteReportDao,
    DEC100MgDao: DEC100MgDao,
    AlbendazoleDao: AlbendazoleDao,
    MactizinDao: MactizinDao,
    DrugRequirementMDA2StateDao: DrugRequirementMDA2StateDao,
    DrugRequirementMDA2RdDao: DrugRequirementMDA2RdDao,
    DrugStockAtPHCDao: DrugStockAtPHCDao,
    DrugAdminSupervisorAvailabilityDao: DrugAdminSupervisorAvailabilityDao,
    PhcHrAndTrainingStatusDao: PhcHrAndTrainingStatusDao,
    PHCwiseDrugConsumptionDao: PHCwiseDrugConsumptionDao,
    BifurcationOfRegularAndMopupDao: BifurcationOfRegularAndMopupDao,
    ExpenditureBalanceReceivedFundsDao: ExpenditureBalanceReceivedFundsDao,
    ProposalWithdrawalOfMDADao: ProposalWithdrawalOfMDADao
  };
};

var _default = MDAReportDao();

exports["default"] = _default;
//# sourceMappingURL=MDAReportDao.js.map
