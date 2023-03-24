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

var GraphDao = function GraphDao() {
  var GetMMDPDetailsInPercentageDao = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req) {
      var response, results;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              response = {}; // new Promise(async function (resolve) {
              //     var response = {}
              //     if (typeof req.body.year  == 'string' && req.body.year.length != 0 ){
              //         // req.body.year = JSON.parse(req.body.year)
              //         req.body.year =  req.body.year.split(",")
              //         console.log("year", req.body.year)
              //     }
              //     var year = `and  year IN (${req.body.year})`
              //     if (req.body.year.length == 0) {
              //         year = ""
              //     }

              results = [{
                "id": 1,
                "districtName": "Ahmadnagar",
                "PercentageMMDPTraining": 75,
                "PercentageMMDPKitGiven": 72
              }, {
                "id": 2,
                "districtName": "Akola",
                "PercentageMMDPTraining": 90,
                "PercentageMMDPKitGiven": 85
              }, {
                "id": 3,
                "districtName": "Amravati",
                "PercentageMMDPTraining": 79,
                "PercentageMMDPKitGiven": 80
              }, {
                "id": 4,
                "districtName": "Aurangabad",
                "PercentageMMDPTraining": 85,
                "PercentageMMDPKitGiven": 89
              }, {
                "id": 5,
                "districtName": "Beed",
                "PercentageMMDPTraining": 93,
                "PercentageMMDPKitGiven": 91
              }, {
                "id": 6,
                "districtName": "Bhandara",
                "PercentageMMDPTraining": 96,
                "PercentageMMDPKitGiven": 95
              }, {
                "id": 7,
                "districtName": "Buldana",
                "PercentageMMDPTraining": 84,
                "PercentageMMDPKitGiven": 79
              }, {
                "id": 8,
                "districtName": "Chandrapur",
                "PercentageMMDPTraining": 97,
                "PercentageMMDPKitGiven": 95
              }, {
                "id": 9,
                "districtName": "Dhule",
                "PercentageMMDPTraining": 72,
                "PercentageMMDPKitGiven": 80
              }, {
                "id": 10,
                "districtName": "Gadchiroli",
                "PercentageMMDPTraining": 72,
                "PercentageMMDPKitGiven": 75
              }, {
                "id": 11,
                "districtName": "Gondiya",
                "PercentageMMDPTraining": 85,
                "PercentageMMDPKitGiven": 90
              }, {
                "id": 12,
                "districtName": "Hingoli",
                "PercentageMMDPTraining": 80,
                "PercentageMMDPKitGiven": 79
              }, {
                "id": 13,
                "districtName": "Jalgaon",
                "PercentageMMDPTraining": 89,
                "PercentageMMDPKitGiven": 85
              }, {
                "id": 14,
                "districtName": "Jalna",
                "PercentageMMDPTraining": 91,
                "PercentageMMDPKitGiven": 93
              }, {
                "id": 15,
                "districtName": "Kolhapur",
                "PercentageMMDPTraining": 95,
                "PercentageMMDPKitGiven": 96
              }, {
                "id": 16,
                "districtName": "Latur",
                "PercentageMMDPTraining": 79,
                "PercentageMMDPKitGiven": 84
              }, {
                "id": 19,
                "districtName": "Nagpur",
                "PercentageMMDPTraining": 95,
                "PercentageMMDPKitGiven": 97
              }, {
                "id": 20,
                "districtName": "Nanded",
                "PercentageMMDPTraining": 80,
                "PercentageMMDPKitGiven": 72
              }, {
                "id": 21,
                "districtName": "Nandurbar",
                "PercentageMMDPTraining": 75,
                "PercentageMMDPKitGiven": 72
              }, {
                "id": 22,
                "districtName": "Nashik",
                "PercentageMMDPTraining": 90,
                "PercentageMMDPKitGiven": 85
              }, {
                "id": 23,
                "districtName": "Osmanabad",
                "PercentageMMDPTraining": 79,
                "PercentageMMDPKitGiven": 80
              }, {
                "id": 24,
                "districtName": "Palghar",
                "PercentageMMDPTraining": 85,
                "PercentageMMDPKitGiven": 89
              }, {
                "id": 25,
                "districtName": "Parbhani",
                "PercentageMMDPTraining": 93,
                "PercentageMMDPKitGiven": 91
              }, {
                "id": 26,
                "districtName": "Pune",
                "PercentageMMDPTraining": 96,
                "PercentageMMDPKitGiven": 95
              }, {
                "id": 27,
                "districtName": "Raigarh",
                "PercentageMMDPTraining": 84,
                "PercentageMMDPKitGiven": 79
              }, {
                "id": 28,
                "districtName": "Ratnagiri",
                "PercentageMMDPTraining": 97,
                "PercentageMMDPKitGiven": 95
              }, {
                "id": 29,
                "districtName": "Sangli",
                "PercentageMMDPTraining": 72,
                "PercentageMMDPKitGiven": 80
              }, {
                "id": 30,
                "districtName": "Satara",
                "PercentageMMDPTraining": 72,
                "PercentageMMDPKitGiven": 75
              }, {
                "id": 31,
                "districtName": "Sindhudurg",
                "PercentageMMDPTraining": 85,
                "PercentageMMDPKitGiven": 90
              }, {
                "id": 32,
                "districtName": "Solapur",
                "PercentageMMDPTraining": 80,
                "PercentageMMDPKitGiven": 79
              }, {
                "id": 33,
                "districtName": "Thane",
                "PercentageMMDPTraining": 89,
                "PercentageMMDPKitGiven": 85
              }, {
                "id": 34,
                "districtName": "Wardha",
                "PercentageMMDPTraining": 91,
                "PercentageMMDPKitGiven": 93
              }, {
                "id": 35,
                "districtName": "Washim",
                "PercentageMMDPTraining": 95,
                "PercentageMMDPKitGiven": 96
              }, {
                "id": 36,
                "districtName": "Yavatmal",
                "PercentageMMDPTraining": 79,
                "PercentageMMDPKitGiven": 84
              }]; //     .then(([results, metadata]) => {
              //             response.error = false
              //             response.data = results
              //             // console.log("results", results)
              //         }).catch((error) => {
              //             console.log(error)
              //             response.error = true
              //         })
              //         .finally(() => {
              //             resolve(response)
              //         })
              // })

              response.error = false;
              response.data = results;
              return _context.abrupt("return", response);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function GetMMDPDetailsInPercentageDao(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var GetEndemicityGraphAllDistrictsDao = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req) {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(resolve) {
                  var response, districtId, year, month;
                  return _regenerator["default"].wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          response = {};

                          if (typeof req.body.month == 'string' && req.body.month.length != 0) {
                            // req.body.month = JSON.parse(req.body.month)
                            req.body.month = req.body.month.split(",");
                            console.log("month", req.body.month);
                          }

                          if (typeof req.body.year == 'string' && req.body.year.length != 0) {
                            // req.body.year = JSON.parse(req.body.year)
                            req.body.year = req.body.year.split(",");
                            console.log("year", req.body.year);
                          }

                          if (typeof req.body.districtId == 'string' && req.body.districtId.length != 0) {
                            // req.body.year = JSON.parse(req.body.year)
                            req.body.districtId = req.body.districtId.split(",");
                            console.log("districtId", req.body.districtId);
                          }

                          districtId = "where  D.\"id\"  IN (".concat(req.body.districtId, ")");
                          year = "and  year IN (".concat(req.body.year, ")");
                          month = "and  month IN (".concat(req.body.month, ")");

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.month.length == 0) {
                            month = "";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select (D.\"id\") AS \"districtId\",D.\"districtName\",\n            L1.\"NoOfLFCases\",L2.\"NoOfHydroceleCases\",\n            L3.\"NoOfHydroceleOperated\",L4.\"NoOfPendingApprovalMO\"\n            from public.districts D \n            LEFT OUTER JOIN \n            (\n                select count(id) AS \"NoOfLFCases\",\"districtId\" from public.\"lymphedemaLineLists\" L\n                where lower(\"diseaseType\") like '%lymphedema%' and L.\"isActive\"=true\n                ".concat(year, " ").concat(month, "\n                group by \"districtId\"\n            )L1 ON D.\"id\"=L1.\"districtId\"\n            LEFT OUTER JOIN \n            (\n                select count(id) AS \"NoOfHydroceleCases\",\"districtId\" from public.\"lymphedemaLineLists\" L\n                where lower(\"diseaseType\") like '%hydrocele%' and L.\"isActive\"=true\n                ").concat(year, " ").concat(month, "\n                group by \"districtId\"\n            )L2 ON D.\"id\"=L2.\"districtId\"\n            LEFT OUTER JOIN \n            (\n                select count(L.id) AS \"NoOfHydroceleOperated\",L.\"districtId\" from public.\"lymphedemaLineLists\" L\n                inner join public.\"lymphedemaLineListFollowUpsHFs\" HF on HF.\"lymphedemaLineListId\"=L.ID\n                where lower(\"diseaseType\") like '%hydrocele%' and HF.\"isSurgeryDone\"=true\n                and L.\"isActive\"=true\n                ").concat(year, " ").concat(month, "\n                group by L.\"districtId\"\n            )L3 ON D.\"id\"=L3.\"districtId\"\n            LEFT OUTER JOIN \n            (\n                select count(L.id) AS \"NoOfPendingApprovalMO\",L.\"districtId\" from public.\"lymphedemaLineLists\" L\n                inner join public.\"lymphedemaLineListSurveys\" LF on LF.\"lymphedemaLineListId\"=L.ID\n                where LF.\"isVerified\"=false and L.\"isActive\"=true\n                ").concat(year, " ").concat(month, "\n                group by L.\"districtId\"\n            )L4 ON D.\"id\"=L3.\"districtId\"\n            ").concat(districtId, "\n            \n  \n\t")).then(function (_ref4) {
                            var _ref5 = (0, _slicedToArray2["default"])(_ref4, 2),
                                results = _ref5[0],
                                metadata = _ref5[1];

                            response.error = false;
                            response.data = results; // console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 11:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                return function (_x3) {
                  return _ref3.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function GetEndemicityGraphAllDistrictsDao(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();

  var GetEndemicityGraphAllTaluksByDistrictDao = /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req) {
      return _regenerator["default"].wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              return _context5.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(resolve) {
                  var response, year, month, districtId;
                  return _regenerator["default"].wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          response = {};
                          year = "and year=  ".concat(req.body.year);
                          month = "and month = ".concat(req.body.month);
                          districtId = req.body.districtId;

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.month.length == 0) {
                            month = "";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select (T.\"id\") AS \"talukaId\",T.\"talukaName\",T.\"districtId\",\n            L1.\"NoOfLFCases\",L2.\"NoOfHydroceleCases\",\n            L3.\"NoOfHydroceleOperated\",L4.\"NoOfPendingApprovalMO\"\n            from public.talukas T \n            LEFT OUTER JOIN \n            (\n                select count(id) AS \"NoOfLFCases\",\"talukaId\" from public.\"lymphedemaLineLists\" L\n                where lower(\"diseaseType\") like '%lymphedema%' and L.\"isActive\"=true\n".concat(year, " ").concat(month, "\n                group by \"talukaId\"\n            )L1 ON T.\"id\"=L1.\"talukaId\"\n            LEFT OUTER JOIN \n            (\n                select count(id) AS \"NoOfHydroceleCases\",\"talukaId\" from public.\"lymphedemaLineLists\" L\n                where lower(\"diseaseType\") like '%hydrocele%' and L.\"isActive\"=true\n                ").concat(year, " ").concat(month, "\n                group by \"talukaId\"\n            )L2 ON T.\"id\"=L2.\"talukaId\"\n            LEFT OUTER JOIN \n            (\n                select count(L.id) AS \"NoOfHydroceleOperated\",L.\"talukaId\" from public.\"lymphedemaLineLists\" L\n                inner join public.\"lymphedemaLineListFollowUpsHFs\" HF on HF.\"lymphedemaLineListId\"=L.ID\n                where lower(\"diseaseType\") like '%hydrocele%' and HF.\"isSurgeryDone\"=true\n                and L.\"isActive\"=true\n                ").concat(year, " ").concat(month, "\n                group by L.\"talukaId\"\n            )L3 ON T.\"id\"=L3.\"talukaId\"\n            LEFT OUTER JOIN \n            (\n                select count(L.id) AS \"NoOfPendingApprovalMO\",L.\"talukaId\" from public.\"lymphedemaLineLists\" L\n                inner join public.\"lymphedemaLineListSurveys\" LF on LF.\"lymphedemaLineListId\"=L.ID\n                where LF.\"isVerified\"=false and L.\"isActive\"=true\n                ").concat(year, " ").concat(month, "\n                group by L.\"talukaId\"\n            )L4 ON T.\"id\"=L3.\"talukaId\"\n            where T.\"districtId\" =").concat(districtId, "\n  \n\t")).then(function (_ref8) {
                            var _ref9 = (0, _slicedToArray2["default"])(_ref8, 2),
                                results = _ref9[0],
                                metadata = _ref9[1];

                            response.error = false;
                            response.data = results; //console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 8:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4);
                }));

                return function (_x5) {
                  return _ref7.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function GetEndemicityGraphAllTaluksByDistrictDao(_x4) {
      return _ref6.apply(this, arguments);
    };
  }();

  var GetMFEndemicityGraphAllDistrictsDao = /*#__PURE__*/function () {
    var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req) {
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              return _context7.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(resolve) {
                  var response, year, month, districtId;
                  return _regenerator["default"].wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          response = {};

                          if (typeof req.body.month == 'string' && req.body.month.length != 0) {
                            // req.body.month = JSON.parse(req.body.month)
                            req.body.month = req.body.month.split(","); // console.log("month", req.body.month)
                          }

                          if (typeof req.body.year == 'string' && req.body.year.length != 0) {
                            // req.body.year = JSON.parse(req.body.year)
                            req.body.year = req.body.year.split(","); // console.log("year", req.body.year)
                          }

                          if (typeof req.body.districtId == 'string' && req.body.districtId.length != 0) {
                            // req.body.year = JSON.parse(req.body.year)
                            req.body.districtId = req.body.districtId.split(","); // console.log("districtId", req.body.districtId)
                          }

                          year = "and  year IN (".concat(req.body.year, ")");
                          month = "and  month IN (".concat(req.body.month, ")");
                          districtId = "where  D.\"id\"  IN (".concat(req.body.districtId, ")");

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.month.length == 0) {
                            month = "";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            \n            --GetMFEndemicityGraphAllDistricts\n            select (D.\"id\") AS \"districtId\",D.\"districtName\",\n            M1.\"NoMFPosetive\",M2.\"NoBSCollected\",M3.\"NoBSExamined\",M4.\"mfRate\"\n            from public.districts D \n            LEFT OUTER JOIN \n            ( \n                --GetMFEndemicityGraphMFPosetive\n                select sum( MS1.\"noOfPersons\") AS \"NoMFPosetive\",M.\"districtId\"  \n                from public.\"mfPositiveLineLists\" M left join\n                (select MS.\"noOfPersons\",MS.\"mfPositiveLineListId\" from public.\"vMFPositiveLineListSurveys\" MS\n                                              where MS.\"categoryOptionCode\"='NPMF') MS1\n                ON M.id=MS1.\"mfPositiveLineListId\"\n                where M.\"isActive\"=true\n                ".concat(year, " ").concat(month, "\n                group by M.\"districtId\"\n            ) M1 ON D.\"id\"=M1.\"districtId\"\n            LEFT OUTER JOIN \n            ( \n                --GetMFEndemicityGraphBSCollected\n                select sum( MS1.\"noOfPersons\") AS \"NoBSCollected\",M.\"districtId\"  \n                from public.\"mfPositiveLineLists\" M left join\n                (select MS.\"noOfPersons\",MS.\"mfPositiveLineListId\" from public.\"vMFPositiveLineListSurveys\" MS\n                                              where MS.\"categoryOptionCode\"='NPC') MS1\n                ON M.id=MS1.\"mfPositiveLineListId\"\n                where M.\"isActive\"=true\n                ").concat(year, " ").concat(month, "\n                group by M.\"districtId\"\n            ) M2 ON D.\"id\"=M2.\"districtId\"\n            LEFT OUTER JOIN \n            ( \n                --GetMFEndemicityGraphBSExamined\n                select sum( MS1.\"noOfPersons\") AS \"NoBSExamined\",M.\"districtId\"  \n                from public.\"mfPositiveLineLists\" M left join\n                (select MS.\"noOfPersons\",MS.\"mfPositiveLineListId\" from public.\"vMFPositiveLineListSurveys\" MS\n                                              where MS.\"categoryOptionCode\"='NBSE') MS1\n                ON M.id=MS1.\"mfPositiveLineListId\"\n                where M.\"isActive\"=true\n                ").concat(year, " ").concat(month, " \n                group by M.\"districtId\"\n            ) M3 ON D.\"id\"=M3.\"districtId\"\n            LEFT OUTER JOIN \n            ( \n                --GetMFEndemicityGraphMfRate \n                select \t\n                 sum( MS1.\"noOfPersons\") /\n                    CASE sum( MS2.\"noOfPersons\")\n                        WHEN 0 THEN NULL\n                        ELSE sum( MS2.\"noOfPersons\")\n                    END * 100 AS \"mfRate\",\n                    M.\"districtId\"  \n                from public.\"mfPositiveLineLists\" M left join\n                (select MS.\"noOfPersons\",MS.\"mfPositiveLineListId\" from public.\"vMFPositiveLineListSurveys\" MS\n                                              where MS.\"categoryOptionCode\"='NBSE') MS1 \n                ON M.id=MS1.\"mfPositiveLineListId\"\n                left join\n                (select MS.\"noOfPersons\",MS.\"mfPositiveLineListId\" from public.\"vMFPositiveLineListSurveys\" MS\n                                              where MS.\"categoryOptionCode\"='NPC') MS2\t\n                ON M.id=MS2.\"mfPositiveLineListId\"\n                where M.\"isActive\"=true\n                ").concat(year, " ").concat(month, " \n                group by M.\"districtId\"\n            ) M4 ON D.\"id\"=M4.\"districtId\"\n            ").concat(districtId, "\n        \n\n\t")).then(function (_ref12) {
                            var _ref13 = (0, _slicedToArray2["default"])(_ref12, 2),
                                results = _ref13[0],
                                metadata = _ref13[1];

                            response.error = false;
                            response.data = results;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 11:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _callee6);
                }));

                return function (_x7) {
                  return _ref11.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function GetMFEndemicityGraphAllDistrictsDao(_x6) {
      return _ref10.apply(this, arguments);
    };
  }();

  var GetMFEndemicityGraphMFPosetiveDao = /*#__PURE__*/function () {
    var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req) {
      return _regenerator["default"].wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              return _context9.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref15 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(resolve) {
                  var response, districtId, year, month;
                  return _regenerator["default"].wrap(function _callee8$(_context8) {
                    while (1) {
                      switch (_context8.prev = _context8.next) {
                        case 0:
                          response = {};

                          if (typeof req.body.month == 'string' && req.body.month.length != 0) {
                            // req.body.month = JSON.parse(req.body.month)
                            req.body.month = req.body.month.split(",");
                            console.log("month", req.body.month);
                          }

                          if (typeof req.body.year == 'string' && req.body.year.length != 0) {
                            // req.body.year = JSON.parse(req.body.year)
                            req.body.year = req.body.year.split(",");
                            console.log("year", req.body.year);
                          } // console.log("month",req.body.month[0])


                          // console.log("month",req.body.month[0])
                          districtId = "and  M.\"districtId\" = ".concat(req.body.districtId);
                          year = "and  M.year IN (".concat(req.body.year, ")");
                          month = "and  M.month IN (".concat(req.body.month, ")");

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.month.length == 0) {
                            month = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n                   \n            select \tM.\"srNo\",M.\"districtId\",M.\"subCenterId\",M.\"villageId\",\n            D.\"districtName\",Sb.\"subCenterName\",F.\"facilityName\",\n            V.\"villageName\",\n            area,M.\"nameOfUnit\",\n            \"nameOfFilariaFieldUnit\",\"populationCoveredByUnit\",\"noOfBSFoundPositive\",\nMS1.\"noOfPersons\" \"noOfPersonExamined\",\nV1.\"nameOfControlUnit\",V2.\"fieldUnitName\",M.month,M.year\n\n            from public.\"mfPositiveLineLists\" M \n            left join public.villages V on V.id = M.\"villageId\"\n            left join public.\"subCenters\" Sb on Sb.id = M.\"subCenterId\"\n            left join public.districts D on D.id = M.\"districtId\"\n            left join public.facilities F on F.id = M.\"facilityId\"\n            left join public.\"verticalControlUnits\" V1 ON V1.id=M.\"nameOfUnit\"\n            left join  public.\"verticalControlFieldUnits\" V2 ON V2.id=M.\"nameOfFilariaFieldUnit\"\n                left join\n                (select MS.\"noOfPersons\",MS.\"mfPositiveLineListId\" from public.\"vMFPositiveLineListSurveys\" MS\n                                              where MS.\"categoryOptionCode\"='NPMF') MS1\n                ON M.id=MS1.\"mfPositiveLineListId\"\n                where M.\"isActive\"=true\n                ".concat(year, " ").concat(month, " ").concat(districtId, "\n            \n    \n\t")).then(function (_ref16) {
                            var _ref17 = (0, _slicedToArray2["default"])(_ref16, 2),
                                results = _ref17[0],
                                metadata = _ref17[1];

                            response.error = false;
                            response.data = results;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 9:
                        case "end":
                          return _context8.stop();
                      }
                    }
                  }, _callee8);
                }));

                return function (_x9) {
                  return _ref15.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    }));

    return function GetMFEndemicityGraphMFPosetiveDao(_x8) {
      return _ref14.apply(this, arguments);
    };
  }();

  var GetMFEndemicityGraphBSCollectedDao = /*#__PURE__*/function () {
    var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req) {
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              return _context11.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref19 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(resolve) {
                  var response, districtId, year, month;
                  return _regenerator["default"].wrap(function _callee10$(_context10) {
                    while (1) {
                      switch (_context10.prev = _context10.next) {
                        case 0:
                          response = {};

                          if (typeof req.body.month == 'string' && req.body.month.length != 0) {
                            // req.body.month = JSON.parse(req.body.month)
                            req.body.month = req.body.month.split(",");
                            console.log("month", req.body.month);
                          }

                          if (typeof req.body.year == 'string' && req.body.year.length != 0) {
                            // req.body.year = JSON.parse(req.body.year)
                            req.body.year = req.body.year.split(",");
                            console.log("year", req.body.year);
                          } // console.log("month",req.body.month[0])


                          // console.log("month",req.body.month[0])
                          districtId = "and  M.\"districtId\" = ".concat(req.body.districtId);
                          year = "and  M.year IN (".concat(req.body.year, ")");
                          month = "and  M.month IN (".concat(req.body.month, ")");

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.month.length == 0) {
                            month = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            \n             \n            select \tM.\"srNo\",M.\"districtId\",M.\"subCenterId\",M.\"villageId\",\n            D.\"districtName\",Sb.\"subCenterName\",F.\"facilityName\",\n            V.\"villageName\",\n            area,M.\"nameOfUnit\",\n            \"nameOfFilariaFieldUnit\",\"populationCoveredByUnit\",\"noOfBSFoundPositive\",\nMS1.\"noOfPersons\" \"noOfPersonExamined\",\nV1.\"nameOfControlUnit\",V2.\"fieldUnitName\"\n\n            from public.\"mfPositiveLineLists\" M \n            left join public.villages V on V.id = M.\"villageId\"\n            left join public.\"subCenters\" Sb on Sb.id = M.\"subCenterId\"\n            left join public.districts D on D.id = M.\"districtId\"\n            left join public.facilities F on F.id = M.\"facilityId\"\n            left join public.\"verticalControlUnits\" V1 ON V1.id=M.\"nameOfUnit\"\n            left join  public.\"verticalControlFieldUnits\" V2 ON V2.id=M.\"nameOfFilariaFieldUnit\"\n             left join\n            (select MS.\"noOfPersons\",MS.\"mfPositiveLineListId\" from public.\"vMFPositiveLineListSurveys\" MS\n                                          where MS.\"categoryOptionCode\"='NPC') MS1\n            ON M.id=MS1.\"mfPositiveLineListId\"\n            where M.\"isActive\"=true\n                ".concat(year, " ").concat(month, " ").concat(districtId, "\n            \n    \n\t")).then(function (_ref20) {
                            var _ref21 = (0, _slicedToArray2["default"])(_ref20, 2),
                                results = _ref21[0],
                                metadata = _ref21[1];

                            response.error = false;
                            response.data = results;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 9:
                        case "end":
                          return _context10.stop();
                      }
                    }
                  }, _callee10);
                }));

                return function (_x11) {
                  return _ref19.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));

    return function GetMFEndemicityGraphBSCollectedDao(_x10) {
      return _ref18.apply(this, arguments);
    };
  }();

  var GetMFEndemicityGraphBSExaminedDao = /*#__PURE__*/function () {
    var _ref22 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req) {
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              return _context13.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref23 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(resolve) {
                  var response, districtId, year, month;
                  return _regenerator["default"].wrap(function _callee12$(_context12) {
                    while (1) {
                      switch (_context12.prev = _context12.next) {
                        case 0:
                          response = {};

                          if (typeof req.body.month == 'string' && req.body.month.length != 0) {
                            // req.body.month = JSON.parse(req.body.month)
                            req.body.month = req.body.month.split(",");
                            console.log("month", req.body.month);
                          }

                          if (typeof req.body.year == 'string' && req.body.year.length != 0) {
                            // req.body.year = JSON.parse(req.body.year)
                            req.body.year = req.body.year.split(",");
                            console.log("year", req.body.year);
                          } // console.log("month",req.body.month[0])


                          // console.log("month",req.body.month[0])
                          districtId = "and  M.\"districtId\" = ".concat(req.body.districtId);
                          year = "and  M.year IN (".concat(req.body.year, ")");
                          month = "and  M.month IN (".concat(req.body.month, ")");

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.month.length == 0) {
                            month = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            \n            select \tM.\"srNo\",M.\"districtId\",M.\"subCenterId\",M.\"villageId\",\n            D.\"districtName\",Sb.\"subCenterName\",F.\"facilityName\",\n            V.\"villageName\",\n            area,M.\"nameOfUnit\",\n            \"nameOfFilariaFieldUnit\",\"populationCoveredByUnit\",\"noOfBSFoundPositive\",\nMS1.\"noOfPersons\" \"noOfPersonExamined\",\nV1.\"nameOfControlUnit\",V2.\"fieldUnitName\"\n\n            from public.\"mfPositiveLineLists\" M \n            left join public.villages V on V.id = M.\"villageId\"\n            left join public.\"subCenters\" Sb on Sb.id = M.\"subCenterId\"\n            left join public.districts D on D.id = M.\"districtId\"\n            left join public.facilities F on F.id = M.\"facilityId\"\n            left join public.\"verticalControlUnits\" V1 ON V1.id=M.\"nameOfUnit\"\n            left join  public.\"verticalControlFieldUnits\" V2 ON V2.id=M.\"nameOfFilariaFieldUnit\"\n             left join\n            (select MS.\"noOfPersons\",MS.\"mfPositiveLineListId\" from public.\"vMFPositiveLineListSurveys\" MS\n                                          where MS.\"categoryOptionCode\"='NBSE') MS1\n            ON M.id=MS1.\"mfPositiveLineListId\"\n                where  M.\"isActive\"=true\n                ".concat(year, " ").concat(month, " ").concat(districtId, "\n            \n    \n\t")).then(function (_ref24) {
                            var _ref25 = (0, _slicedToArray2["default"])(_ref24, 2),
                                results = _ref25[0],
                                metadata = _ref25[1];

                            response.error = false;
                            response.data = results;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 9:
                        case "end":
                          return _context12.stop();
                      }
                    }
                  }, _callee12);
                }));

                return function (_x13) {
                  return _ref23.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }));

    return function GetMFEndemicityGraphBSExaminedDao(_x12) {
      return _ref22.apply(this, arguments);
    };
  }();

  var GetMFEndemicityGraphMfRateDao = /*#__PURE__*/function () {
    var _ref26 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(req) {
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              return _context15.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref27 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(resolve) {
                  var response, districtId, year, month;
                  return _regenerator["default"].wrap(function _callee14$(_context14) {
                    while (1) {
                      switch (_context14.prev = _context14.next) {
                        case 0:
                          response = {};

                          if (typeof req.body.month == 'string' && req.body.month.length != 0) {
                            // req.body.month = JSON.parse(req.body.month)
                            req.body.month = req.body.month.split(",");
                            console.log("month", req.body.month);
                          }

                          if (typeof req.body.year == 'string' && req.body.year.length != 0) {
                            // req.body.year = JSON.parse(req.body.year)
                            req.body.year = req.body.year.split(",");
                            console.log("year", req.body.year);
                          } // console.log("month",req.body.month[0])


                          // console.log("month",req.body.month[0])
                          districtId = "and  M.\"districtId\" = ".concat(req.body.districtId);
                          year = "and  M.year IN (".concat(req.body.year, ")");
                          month = "and  M.month IN (".concat(req.body.month, ")");

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.month.length == 0) {
                            month = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select \tM.\"srNo\",M.\"districtId\",M.\"subCenterId\",M.\"villageId\",\n            D.\"districtName\",Sb.\"subCenterName\",F.\"facilityName\",\n            V.\"villageName\",\n            M.area,M.\"nameOfUnit\",\n            M.\"nameOfFilariaFieldUnit\",M.\"populationCoveredByUnit\",M.\"noOfBSFoundPositive\",\n            MS1.\"noOfPersons\" /\nCASE MS2.\"noOfPersons\"\nWHEN 0 THEN NULL\nELSE MS2.\"noOfPersons\"\nEND * 100 AS \"mfRate\",\nMS1.\"noOfPersons\" \"noOfPersonExamined\",\nMS2.\"noOfPersons\" \"noOfPersonCollected\",\nV1.\"nameOfControlUnit\",V2.\"fieldUnitName\"\n           from public.\"mfPositiveLineLists\" M \n        left join public.villages V on V.id = M.\"villageId\"\n        left join public.\"subCenters\" Sb on Sb.id = M.\"subCenterId\"\n        left join public.districts D on D.id = M.\"districtId\"\n        left join public.facilities F on F.id = M.\"facilityId\"\n        left join public.\"verticalControlUnits\" V1 ON V1.id=M.\"nameOfUnit\"\n        left join  public.\"verticalControlFieldUnits\" V2 ON V2.id=M.\"nameOfFilariaFieldUnit\"\n\n        \n        \n                \n        \n        left join\n           (select MS.\"noOfPersons\",MS.\"mfPositiveLineListId\" from public.\"vMFPositiveLineListSurveys\" MS\n                                         where MS.\"categoryOptionCode\"='NBSE') MS1 \n           ON M.id=MS1.\"mfPositiveLineListId\"\n           left join\n           (select MS.\"noOfPersons\",MS.\"mfPositiveLineListId\" from public.\"vMFPositiveLineListSurveys\" MS\n                                         where MS.\"categoryOptionCode\"='NPC') MS2\t\n           ON M.id=MS2.\"mfPositiveLineListId\"\n                where M.\"isActive\"=true\n                ".concat(year, " ").concat(month, " ").concat(districtId, "\n            \n    \n\t")).then(function (_ref28) {
                            var _ref29 = (0, _slicedToArray2["default"])(_ref28, 2),
                                results = _ref29[0],
                                metadata = _ref29[1];

                            response.error = false;
                            response.data = results;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 9:
                        case "end":
                          return _context14.stop();
                      }
                    }
                  }, _callee14);
                }));

                return function (_x15) {
                  return _ref27.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    }));

    return function GetMFEndemicityGraphMfRateDao(_x14) {
      return _ref26.apply(this, arguments);
    };
  }();

  var GetEndemicityTrendGraphAllDistrictsDao = /*#__PURE__*/function () {
    var _ref30 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(req) {
      return _regenerator["default"].wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              return _context17.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref31 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(resolve) {
                  var response, start_year, start_month, end_year, end_month;
                  return _regenerator["default"].wrap(function _callee16$(_context16) {
                    while (1) {
                      switch (_context16.prev = _context16.next) {
                        case 0:
                          response = {};
                          start_year = "and Year <=  ".concat(req.body.startYear);
                          start_month = "and  month <= ".concat(req.body.startMonth);
                          end_year = "and Year >=  ".concat(req.body.endYear);
                          end_month = "and  month >= ".concat(req.body.endMonth);

                          if (req.body.startYear.length == 0) {
                            start_year = "";
                          }

                          if (req.body.startMonth.length == 0) {
                            start_month = "";
                          }

                          if (req.body.endYear.length == 0) {
                            end_year = "";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select COALESCE(L1.\"year\",COALESCE(L2.\"year\",M1.\"year\")) AS \"year\" ,\n            COALESCE(L1.\"month\",COALESCE(L2.\"month\",M1.\"month\")) \"month\",\n            L1.\"NoOfLFCases\",L2.\"NoOfHydroceleCases\",M1.\"NoMFPosetive\"\n            From\n            (\n                select count(id) AS \"NoOfLFCases\",\"year\",\"month\" from public.\"lymphedemaLineLists\" L\n                where lower(\"diseaseType\") like '%lymphedema%' and L.\"isActive\"=true\n".concat(start_year, " ").concat(end_year, " ").concat(start_month, " ").concat(end_month, " \n                group by \"year\",\"month\"\n            )L1 \n            FULL OUTER JOIN  \n            (\n                select count(id) AS \"NoOfHydroceleCases\",\"year\",\"month\" from public.\"lymphedemaLineLists\" L\n                where lower(\"diseaseType\") like '%hydrocele%' and  L.\"isActive\"=true\n                ").concat(start_year, " ").concat(end_year, " ").concat(start_month, " ").concat(end_month, " \n                group by \"year\",\"month\"\n            )L2 ON L1.\"year\"=L2.\"year\" and L1.\"month\"=L2.\"month\"\n            FULL OUTER JOIN \n            ( \n                select sum( MS1.\"noOfPersons\") AS \"NoMFPosetive\",M.\"year\",M.\"month\"\n                from public.\"mfPositiveLineLists\" M left join\n                (select MS.\"noOfPersons\",MS.\"mfPositiveLineListId\" from public.\"vMFPositiveLineListSurveys\" MS\n                                              where MS.\"categoryOptionCode\"='NPMF') MS1\n                ON M.id=MS1.\"mfPositiveLineListId\"\n               where M.\"isActive\"=true\n                ").concat(start_year, " ").concat(end_year, " ").concat(start_month, " ").concat(end_month, " \n                group by M.\"year\",M.\"month\"\n            ) M1 ON L1.\"year\"=M1.\"year\" and M1.\"month\"=L1.\"month\"\n            \n    \n\t")).then(function (_ref32) {
                            var _ref33 = (0, _slicedToArray2["default"])(_ref32, 2),
                                results = _ref33[0],
                                metadata = _ref33[1];

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
                          return _context16.stop();
                      }
                    }
                  }, _callee16);
                }));

                return function (_x17) {
                  return _ref31.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    }));

    return function GetEndemicityTrendGraphAllDistrictsDao(_x16) {
      return _ref30.apply(this, arguments);
    };
  }();

  var GetEndemicityTrendGraphByDistrictDao = /*#__PURE__*/function () {
    var _ref34 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(req) {
      return _regenerator["default"].wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              return _context19.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref35 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(resolve) {
                  var response, start_year, start_month, end_year, end_month, districtId;
                  return _regenerator["default"].wrap(function _callee18$(_context18) {
                    while (1) {
                      switch (_context18.prev = _context18.next) {
                        case 0:
                          response = {};
                          start_year = "and Year <=  ".concat(req.body.startYear);
                          start_month = "and  month <= ".concat(req.body.startMonth);
                          end_year = "and Year >=  ".concat(req.body.endYear);
                          end_month = "and  month >= ".concat(req.body.endMonth);
                          districtId = "and  \"districtId\" = ".concat(req.body.districtId);

                          if (req.body.startYear.length == 0) {
                            start_year = "";
                          }

                          if (req.body.startMonth.length == 0) {
                            start_month = "";
                          }

                          if (req.body.endYear.length == 0) {
                            end_year = "";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select COALESCE(L1.\"year\",COALESCE(L2.\"year\",M1.\"year\")) AS \"year\" ,\n            COALESCE(L1.\"month\",COALESCE(L2.\"month\",M1.\"month\")) \"month\",\n            L1.\"NoOfLFCases\",L2.\"NoOfHydroceleCases\",M1.\"NoMFPosetive\"\n            From\n            (\n                select count(id) AS \"NoOfLFCases\",\"year\",\"month\" from public.\"lymphedemaLineLists\" L\n                where lower(\"diseaseType\") like '%lymphedema%' and L.\"isActive\"=true\n                ".concat(start_year, " ").concat(end_year, " ").concat(start_month, " ").concat(end_month, " \n").concat(districtId, "\n                group by \"year\",\"month\"\n            )L1 \n            FULL OUTER JOIN  \n            (\n                select count(id) AS \"NoOfHydroceleCases\",\"year\",\"month\" from public.\"lymphedemaLineLists\" L\n                where lower(\"diseaseType\") like '%hydrocele%' and L.\"isActive\"=true\n                ").concat(start_year, " ").concat(end_year, " ").concat(start_month, " ").concat(end_month, " \n                ").concat(districtId, "\n                group by \"year\",\"month\"\n            )L2 ON L1.\"year\"=L2.\"year\" and L1.\"month\"=L2.\"month\"\n            FULL OUTER JOIN \n            ( \n                select sum( MS1.\"noOfPersons\") AS \"NoMFPosetive\",M.\"year\",M.\"month\"\n                from public.\"mfPositiveLineLists\" M left join\n                (select MS.\"noOfPersons\",MS.\"mfPositiveLineListId\" from public.\"vMFPositiveLineListSurveys\" MS\n                                              where MS.\"categoryOptionCode\"='NPMF') MS1\n                ON M.id=MS1.\"mfPositiveLineListId\"\n                where M.\"isActive\"=true\n                ").concat(start_year, " ").concat(end_year, " ").concat(start_month, " ").concat(end_month, " \n").concat(districtId, "\n                group by M.\"year\",M.\"month\"\n            ) M1 ON L1.\"year\"=M1.\"year\" and M1.\"month\"=L1.\"month\"\n            \n    \n\t")).then(function (_ref36) {
                            var _ref37 = (0, _slicedToArray2["default"])(_ref36, 2),
                                results = _ref37[0],
                                metadata = _ref37[1];

                            response.error = false;
                            response.data = results;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 12:
                        case "end":
                          return _context18.stop();
                      }
                    }
                  }, _callee18);
                }));

                return function (_x19) {
                  return _ref35.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19);
    }));

    return function GetEndemicityTrendGraphByDistrictDao(_x18) {
      return _ref34.apply(this, arguments);
    };
  }();

  var GetEndemicityTrendGraphAllDistrictsNoOfLFCasesDao = /*#__PURE__*/function () {
    var _ref38 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21(req) {
      return _regenerator["default"].wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              return _context21.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref39 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20(resolve) {
                  var response, start_year, start_month, end_year, end_month;
                  return _regenerator["default"].wrap(function _callee20$(_context20) {
                    while (1) {
                      switch (_context20.prev = _context20.next) {
                        case 0:
                          response = {};
                          start_year = "and L.Year <=  ".concat(req.body.startYear);
                          start_month = "and  L.month <= ".concat(req.body.startMonth);
                          end_year = "and L.Year >=  ".concat(req.body.endYear);
                          end_month = "and  L.month >= ".concat(req.body.endMonth);

                          if (req.body.startYear.length == 0) {
                            start_year = "";
                          }

                          if (req.body.startMonth.length == 0) {
                            start_month = "";
                          }

                          if (req.body.endYear.length == 0) {
                            end_year = "";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select  L.\"districtId\",\n            L.\"patientId\",L.\"nameOfPatient\",L.\"headOfFamily\",\n            L.month,L.year,L.\"corporationId\",L.\"talukaId\",L.\"facilityId\",\nL.town,L.\"subCenterId\",L.\"villageId\",L.\"patientMobileNumber\",\nL.\"diseaseType\",L.grading,\nW.\"wardName\",T.\"talukaName\",C.\"corporationName\",U.\"categoryOptionName\" As \"gender\",\nU1.\"categoryOptionName\" as gradingName\n             from public.\"lymphedemaLineLists\" L\n             left join public.corporations C on C.id = L.\"corporationId\"\n             left join public.districts D on D.id = L.\"districtId\"\n             left join public.facilities F on F.id = L.\"facilityId\"\n             left join public.\"subCenters\" Sb on Sb.id = L.\"subCenterId\"\n             left join public.talukas T on T.id = L.\"talukaId\"\n             left join public.villages V on V.id = L.\"villageId\"\n             left join public.wards W on W.id = L.\"wardId\"\n             left join public.zones Z on Z.id = L.\"zoneId\"\n        left join public.\"udCategoryOptions\" U ON U.id=L.gender\n        left join public.\"udCategoryOptions\" U1 on U1.id = L.\"grading\"        \n            where lower(\"diseaseType\") like '%lymphedema%'\n            and L.\"isActive\"=true\n".concat(start_year, " ").concat(end_year, " ").concat(start_month, " ").concat(end_month, " \n    \n\t")).then(function (_ref40) {
                            var _ref41 = (0, _slicedToArray2["default"])(_ref40, 2),
                                results = _ref41[0],
                                metadata = _ref41[1];

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
                          return _context20.stop();
                      }
                    }
                  }, _callee20);
                }));

                return function (_x21) {
                  return _ref39.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context21.stop();
          }
        }
      }, _callee21);
    }));

    return function GetEndemicityTrendGraphAllDistrictsNoOfLFCasesDao(_x20) {
      return _ref38.apply(this, arguments);
    };
  }();

  var GetEndemicityTrendGraphAllDistrictsNoOfHydroceleCasesDao = /*#__PURE__*/function () {
    var _ref42 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23(req) {
      return _regenerator["default"].wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              return _context23.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref43 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22(resolve) {
                  var response, start_year, start_month, end_year, end_month;
                  return _regenerator["default"].wrap(function _callee22$(_context22) {
                    while (1) {
                      switch (_context22.prev = _context22.next) {
                        case 0:
                          response = {};
                          start_year = "and L.Year <=  ".concat(req.body.startYear);
                          start_month = "and  L.month <= ".concat(req.body.startMonth);
                          end_year = "and L.Year >=  ".concat(req.body.endYear);
                          end_month = "and  L.month >= ".concat(req.body.endMonth);

                          if (req.body.startYear.length == 0) {
                            start_year = "";
                          }

                          if (req.body.startMonth.length == 0) {
                            start_month = "";
                          }

                          if (req.body.endYear.length == 0) {
                            end_year = "";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n             select  L.\"districtId\",\n            L.\"patientId\",L.\"nameOfPatient\",L.\"headOfFamily\",\n            L.month,L.year,L.\"corporationId\",L.\"talukaId\",L.\"facilityId\",\nL.town,L.\"subCenterId\",L.\"villageId\",L.\"patientMobileNumber\",\nL.\"diseaseType\",L.grading,\nW.\"wardName\",T.\"talukaName\",C.\"corporationName\",U.\"categoryOptionName\" As \"gender\",\nU1.\"categoryOptionName\" as gradingName\n             from public.\"lymphedemaLineLists\" L\n             left join public.corporations C on C.id = L.\"corporationId\"\n             left join public.districts D on D.id = L.\"districtId\"\n             left join public.facilities F on F.id = L.\"facilityId\"\n             left join public.\"subCenters\" Sb on Sb.id = L.\"subCenterId\"\n             left join public.talukas T on T.id = L.\"talukaId\"\n             left join public.villages V on V.id = L.\"villageId\"\n             left join public.wards W on W.id = L.\"wardId\"\n             left join public.zones Z on Z.id = L.\"zoneId\"\n        left join public.\"udCategoryOptions\" U ON U.id=L.gender\n        left join public.\"udCategoryOptions\" U1 on U1.id = L.\"grading\" \n            where lower(\"diseaseType\") like '%hydrocele%'\n            and L.\"isActive\"=true\n".concat(start_year, " ").concat(end_year, " ").concat(start_month, " ").concat(end_month, " \n    \n\t")).then(function (_ref44) {
                            var _ref45 = (0, _slicedToArray2["default"])(_ref44, 2),
                                results = _ref45[0],
                                metadata = _ref45[1];

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
                          return _context22.stop();
                      }
                    }
                  }, _callee22);
                }));

                return function (_x23) {
                  return _ref43.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context23.stop();
          }
        }
      }, _callee23);
    }));

    return function GetEndemicityTrendGraphAllDistrictsNoOfHydroceleCasesDao(_x22) {
      return _ref42.apply(this, arguments);
    };
  }();

  var GetEndemicityTrendGraphAllDistrictsnoOfPersonsDao = /*#__PURE__*/function () {
    var _ref46 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25(req) {
      return _regenerator["default"].wrap(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              return _context25.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref47 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24(resolve) {
                  var response, start_year, start_month, end_year, end_month;
                  return _regenerator["default"].wrap(function _callee24$(_context24) {
                    while (1) {
                      switch (_context24.prev = _context24.next) {
                        case 0:
                          response = {};
                          start_year = "and M.Year <=  ".concat(req.body.startYear);
                          start_month = "and  M.month <= ".concat(req.body.startMonth);
                          end_year = "and M.Year >=  ".concat(req.body.endYear);
                          end_month = "and  M.month >= ".concat(req.body.endMonth);

                          if (req.body.startYear.length == 0) {
                            start_year = "";
                          }

                          if (req.body.startMonth.length == 0) {
                            start_month = "";
                          }

                          if (req.body.endYear.length == 0) {
                            end_year = "";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select \tM.\"srNo\",M.\"districtId\",M.\"subCenterId\",M.\"villageId\",\n            D.\"districtName\",Sb.\"subCenterName\",F.\"facilityName\",\n            V.\"villageName\",\n            M.area,M.\"nameOfUnit\",\n            M.\"nameOfFilariaFieldUnit\",M.\"populationCoveredByUnit\",M.\"noOfBSFoundPositive\",\nMS1.\"noOfPersons\" \"noOfPersonExamined\",\nV1.\"nameOfControlUnit\",V2.\"fieldUnitName\"\n           from public.\"mfPositiveLineLists\" M \n        left join public.villages V on V.id = M.\"villageId\"\n        left join public.\"subCenters\" Sb on Sb.id = M.\"subCenterId\"\n        left join public.districts D on D.id = M.\"districtId\"\n        left join public.facilities F on F.id = M.\"facilityId\"\n        left join public.\"verticalControlUnits\" V1 ON V1.id=M.\"nameOfUnit\"\n        left join  public.\"verticalControlFieldUnits\" V2 ON V2.id=M.\"nameOfFilariaFieldUnit\"\n            left join\n\t(select MS.\"noOfPersons\",MS.\"mfPositiveLineListId\" from public.\"vMFPositiveLineListSurveys\" MS\n\t\t\t\t\t\t\t\t  where MS.\"categoryOptionCode\"='NPMF') MS1\n\tON M.id=MS1.\"mfPositiveLineListId\"\n    where M.\"isActive\"=true\n".concat(start_year, " ").concat(end_year, " ").concat(start_month, " ").concat(end_month, "\n\t")).then(function (_ref48) {
                            var _ref49 = (0, _slicedToArray2["default"])(_ref48, 2),
                                results = _ref49[0],
                                metadata = _ref49[1];

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
                          return _context24.stop();
                      }
                    }
                  }, _callee24);
                }));

                return function (_x25) {
                  return _ref47.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context25.stop();
          }
        }
      }, _callee25);
    }));

    return function GetEndemicityTrendGraphAllDistrictsnoOfPersonsDao(_x24) {
      return _ref46.apply(this, arguments);
    };
  }();

  var GetEndemicityTrendGraphByDistrictNoOfLFCasesDao = /*#__PURE__*/function () {
    var _ref50 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27(req) {
      return _regenerator["default"].wrap(function _callee27$(_context27) {
        while (1) {
          switch (_context27.prev = _context27.next) {
            case 0:
              return _context27.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref51 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26(resolve) {
                  var response, start_year, start_month, end_year, end_month, districtId;
                  return _regenerator["default"].wrap(function _callee26$(_context26) {
                    while (1) {
                      switch (_context26.prev = _context26.next) {
                        case 0:
                          response = {};
                          start_year = "and L.Year <=  ".concat(req.body.startYear);
                          start_month = "and  L.month <= ".concat(req.body.startMonth);
                          end_year = "and L.Year >=  ".concat(req.body.endYear);
                          end_month = "and  L.month >= ".concat(req.body.endMonth);
                          districtId = "and  L.\"districtId\" = ".concat(req.body.districtId);

                          if (req.body.startYear.length == 0) {
                            start_year = "";
                          }

                          if (req.body.startMonth.length == 0) {
                            start_month = "";
                          }

                          if (req.body.endYear.length == 0) {
                            end_year = "";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select  L.\"districtId\",\n            L.\"patientId\",L.\"nameOfPatient\",L.\"headOfFamily\",\n            L.month,L.year,L.\"corporationId\",L.\"talukaId\",L.\"facilityId\",\nL.town,L.\"subCenterId\",L.\"villageId\",L.\"patientMobileNumber\",\nL.\"diseaseType\",L.grading,\nW.\"wardName\",T.\"talukaName\",C.\"corporationName\",U.\"categoryOptionName\" As \"gender\",\nU1.\"categoryOptionName\" as gradingName\n             from public.\"lymphedemaLineLists\" L\n             left join public.corporations C on C.id = L.\"corporationId\"\n             left join public.districts D on D.id = L.\"districtId\"\n             left join public.facilities F on F.id = L.\"facilityId\"\n             left join public.\"subCenters\" Sb on Sb.id = L.\"subCenterId\"\n             left join public.talukas T on T.id = L.\"talukaId\"\n             left join public.villages V on V.id = L.\"villageId\"\n             left join public.wards W on W.id = L.\"wardId\"\n             left join public.zones Z on Z.id = L.\"zoneId\"\n        left join public.\"udCategoryOptions\" U ON U.id=L.gender\n        left join public.\"udCategoryOptions\" U1 on U1.id = L.\"grading\" \n        where lower(\"diseaseType\") like '%lymphedema%'\n        and L.\"isActive\"=true\n".concat(start_year, " ").concat(end_year, " ").concat(start_month, " ").concat(end_month, " ").concat(districtId, "\n\t")).then(function (_ref52) {
                            var _ref53 = (0, _slicedToArray2["default"])(_ref52, 2),
                                results = _ref53[0],
                                metadata = _ref53[1];

                            response.error = false;
                            response.data = results;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 12:
                        case "end":
                          return _context26.stop();
                      }
                    }
                  }, _callee26);
                }));

                return function (_x27) {
                  return _ref51.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context27.stop();
          }
        }
      }, _callee27);
    }));

    return function GetEndemicityTrendGraphByDistrictNoOfLFCasesDao(_x26) {
      return _ref50.apply(this, arguments);
    };
  }();

  var GetEndemicityTrendGraphByDistrictNoOfHydroceleCasesDao = /*#__PURE__*/function () {
    var _ref54 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee29(req) {
      return _regenerator["default"].wrap(function _callee29$(_context29) {
        while (1) {
          switch (_context29.prev = _context29.next) {
            case 0:
              return _context29.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref55 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee28(resolve) {
                  var response, start_year, start_month, end_year, end_month, districtId;
                  return _regenerator["default"].wrap(function _callee28$(_context28) {
                    while (1) {
                      switch (_context28.prev = _context28.next) {
                        case 0:
                          response = {};
                          start_year = "and L.Year <=  ".concat(req.body.startYear);
                          start_month = "and  L.month <= ".concat(req.body.startMonth);
                          end_year = "and L.Year >=  ".concat(req.body.endYear);
                          end_month = "and  L.month >= ".concat(req.body.endMonth);
                          districtId = "and  L.\"districtId\" = ".concat(req.body.districtId);

                          if (req.body.startYear.length == 0) {
                            start_year = "";
                          }

                          if (req.body.startMonth.length == 0) {
                            start_month = "";
                          }

                          if (req.body.endYear.length == 0) {
                            end_year = "";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select  L.\"districtId\",\n            L.\"patientId\",L.\"nameOfPatient\",L.\"headOfFamily\",\n            L.month,L.year,L.\"corporationId\",L.\"talukaId\",L.\"facilityId\",\nL.town,L.\"subCenterId\",L.\"villageId\",L.\"patientMobileNumber\",\nL.\"diseaseType\",L.grading,\nW.\"wardName\",T.\"talukaName\",C.\"corporationName\",U.\"categoryOptionName\" As \"gender\",\nU1.\"categoryOptionName\" as gradingName\n             from public.\"lymphedemaLineLists\" L\n             left join public.corporations C on C.id = L.\"corporationId\"\n             left join public.districts D on D.id = L.\"districtId\"\n             left join public.facilities F on F.id = L.\"facilityId\"\n             left join public.\"subCenters\" Sb on Sb.id = L.\"subCenterId\"\n             left join public.talukas T on T.id = L.\"talukaId\"\n             left join public.villages V on V.id = L.\"villageId\"\n             left join public.wards W on W.id = L.\"wardId\"\n             left join public.zones Z on Z.id = L.\"zoneId\"\n        left join public.\"udCategoryOptions\" U ON U.id=L.gender\n        left join public.\"udCategoryOptions\" U1 on U1.id = L.\"grading\" \n            where lower(\"diseaseType\") like '%hydrocele%'\n            and L.\"isActive\"=true\n".concat(start_year, " ").concat(end_year, " ").concat(start_month, " ").concat(end_month, " ").concat(districtId, "\n\t")).then(function (_ref56) {
                            var _ref57 = (0, _slicedToArray2["default"])(_ref56, 2),
                                results = _ref57[0],
                                metadata = _ref57[1];

                            response.error = false;
                            response.data = results;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 12:
                        case "end":
                          return _context28.stop();
                      }
                    }
                  }, _callee28);
                }));

                return function (_x29) {
                  return _ref55.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context29.stop();
          }
        }
      }, _callee29);
    }));

    return function GetEndemicityTrendGraphByDistrictNoOfHydroceleCasesDao(_x28) {
      return _ref54.apply(this, arguments);
    };
  }();

  var GetEndemicityTrendGraphByDistrictNoOfPersonsDao = /*#__PURE__*/function () {
    var _ref58 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee31(req) {
      return _regenerator["default"].wrap(function _callee31$(_context31) {
        while (1) {
          switch (_context31.prev = _context31.next) {
            case 0:
              return _context31.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref59 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee30(resolve) {
                  var response, start_year, start_month, end_year, end_month, districtId;
                  return _regenerator["default"].wrap(function _callee30$(_context30) {
                    while (1) {
                      switch (_context30.prev = _context30.next) {
                        case 0:
                          response = {};
                          start_year = "and M.Year <=  ".concat(req.body.startYear);
                          start_month = "and  M.month <= ".concat(req.body.startMonth);
                          end_year = "and M.Year >=  ".concat(req.body.endYear);
                          end_month = "and  M.month >= ".concat(req.body.endMonth);
                          districtId = "and  M.\"districtId\" = ".concat(req.body.districtId);

                          if (req.body.startYear.length == 0) {
                            start_year = "";
                          }

                          if (req.body.startMonth.length == 0) {
                            start_month = "";
                          }

                          if (req.body.endYear.length == 0) {
                            end_year = "";
                          }

                          if (req.body.endMonth.length == 0) {
                            end_month = "";
                          }

                          if (req.body.districtId.length == 0) {
                            districtId = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select \tM.\"srNo\",M.\"districtId\",M.\"subCenterId\",M.\"villageId\",\n            D.\"districtName\",Sb.\"subCenterName\",F.\"facilityName\",\n            V.\"villageName\",\n            M.area,M.\"nameOfUnit\",\n            M.\"nameOfFilariaFieldUnit\",M.\"populationCoveredByUnit\",M.\"noOfBSFoundPositive\",\nMS1.\"noOfPersons\" \"noOfPersonExamined\",\nV1.\"nameOfControlUnit\",V2.\"fieldUnitName\"\n           from public.\"mfPositiveLineLists\" M \n        left join public.villages V on V.id = M.\"villageId\"\n        left join public.\"subCenters\" Sb on Sb.id = M.\"subCenterId\"\n        left join public.districts D on D.id = M.\"districtId\"\n        left join public.facilities F on F.id = M.\"facilityId\"\n        left join public.\"verticalControlUnits\" V1 ON V1.id=M.\"nameOfUnit\"\n        left join  public.\"verticalControlFieldUnits\" V2 ON V2.id=M.\"nameOfFilariaFieldUnit\"\n            left join\n(select MS.\"noOfPersons\",MS.\"mfPositiveLineListId\" from public.\"vMFPositiveLineListSurveys\" MS\n\t\t\t\t\t\t\t\t  where MS.\"categoryOptionCode\"='NPMF') MS1\n\tON M.id=MS1.\"mfPositiveLineListId\"\n    where  M.\"isActive\"=true\n".concat(start_year, " ").concat(end_year, " ").concat(start_month, " ").concat(end_month, " ").concat(districtId, "\n\t")).then(function (_ref60) {
                            var _ref61 = (0, _slicedToArray2["default"])(_ref60, 2),
                                results = _ref61[0],
                                metadata = _ref61[1];

                            response.error = false;
                            response.data = results;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 12:
                        case "end":
                          return _context30.stop();
                      }
                    }
                  }, _callee30);
                }));

                return function (_x31) {
                  return _ref59.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context31.stop();
          }
        }
      }, _callee31);
    }));

    return function GetEndemicityTrendGraphByDistrictNoOfPersonsDao(_x30) {
      return _ref58.apply(this, arguments);
    };
  }();

  var GetLFCasesDistwiseDao = /*#__PURE__*/function () {
    var _ref62 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee33(req) {
      return _regenerator["default"].wrap(function _callee33$(_context33) {
        while (1) {
          switch (_context33.prev = _context33.next) {
            case 0:
              return _context33.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref63 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee32(resolve) {
                  var response, districtId, year, month;
                  return _regenerator["default"].wrap(function _callee32$(_context32) {
                    while (1) {
                      switch (_context32.prev = _context32.next) {
                        case 0:
                          response = {};

                          if (typeof req.body.month == 'string' && req.body.month.length != 0) {
                            req.body.month = req.body.month.split(',');
                            console.log("month", req.body.month[0]);
                          }

                          if (typeof req.body.year == 'string' && req.body.year.length != 0) {
                            // req.body.year = JSON.parse(req.body.year)
                            req.body.year = req.body.year.split(","); // console.log("year", req.body.year)
                          } // console.log("month",req.body.month[0])


                          // console.log("month",req.body.month[0])
                          districtId = "and  L.\"districtId\" = ".concat(req.body.districtId);
                          year = "and  L.year IN (".concat(req.body.year, ")");
                          month = "and  L.month IN (".concat(req.body.month, ")");

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.month.length == 0) {
                            month = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select\n            L.\"districtId\",\n            D.\"districtName\",\n            F.\"facilityName\",\n            Sb.\"subCenterName\",\n            V.\"villageName\",\n            L.\"patientId\",\n            L.\"nameOfPatient\",\n            L.\"headOfFamily\",\n            L.month,\n            L.year,\n            L.\"corporationId\",\n            L.\"talukaId\",\n            L.\"facilityId\",\n            L.town,\n            L.\"subCenterId\",\n            L.\"villageId\",\n            L.\"patientMobileNumber\",\n            L.\"diseaseType\",\n            L.grading,\n            W.\"wardName\",\n            T.\"talukaName\",\n            C.\"corporationName\",\n            U.\"categoryOptionName\" As \"gender\",\n            U1.\"categoryOptionName\" as gradingName\n          from\n            public.\"lymphedemaLineLists\" L\n            left join public.corporations C on C.id = L.\"corporationId\"\n            left join public.districts D on D.id = L.\"districtId\"\n            left join public.facilities F on F.id = L.\"facilityId\"\n            left join public.\"subCenters\" Sb on Sb.id = L.\"subCenterId\"\n            left join public.talukas T on T.id = L.\"talukaId\"\n            left join public.villages V on V.id = L.\"villageId\"\n            left join public.wards W on W.id = L.\"wardId\"\n            left join public.zones Z on Z.id = L.\"zoneId\"\n            left join public.\"udCategoryOptions\" U ON U.id = L.gender\n            left join public.\"udCategoryOptions\" U1 on U1.id = L.\"grading\"\n          where\n            lower(\"diseaseType\") like '%lymphedema%'\n            and L.\"isActive\" = true\n        ".concat(districtId, " ").concat(year, " ").concat(month, " \n        \n        ")).then(function (_ref64) {
                            var _ref65 = (0, _slicedToArray2["default"])(_ref64, 2),
                                results = _ref65[0],
                                metadata = _ref65[1];

                            response.error = false;
                            response.data = results;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 9:
                        case "end":
                          return _context32.stop();
                      }
                    }
                  }, _callee32);
                }));

                return function (_x33) {
                  return _ref63.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context33.stop();
          }
        }
      }, _callee33);
    }));

    return function GetLFCasesDistwiseDao(_x32) {
      return _ref62.apply(this, arguments);
    };
  }();

  var GetHydroceleCasesDistwiseDao = /*#__PURE__*/function () {
    var _ref66 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee35(req) {
      return _regenerator["default"].wrap(function _callee35$(_context35) {
        while (1) {
          switch (_context35.prev = _context35.next) {
            case 0:
              return _context35.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref67 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee34(resolve) {
                  var response, districtId, year, month;
                  return _regenerator["default"].wrap(function _callee34$(_context34) {
                    while (1) {
                      switch (_context34.prev = _context34.next) {
                        case 0:
                          response = {};

                          if (typeof req.body.month == 'string' && req.body.month.length != 0) {
                            // req.body.month = JSON.parse(req.body.month)
                            req.body.month = req.body.month.split(",");
                            console.log("month", req.body.month);
                          }

                          if (typeof req.body.year == 'string' && req.body.year.length != 0) {
                            // req.body.year = JSON.parse(req.body.year)
                            req.body.year = req.body.year.split(",");
                            console.log("year", req.body.year);
                          }

                          districtId = "and  L.\"districtId\" = ".concat(req.body.districtId);
                          year = "and  L.year IN (".concat(req.body.year, ")");
                          month = "and  L.month IN (".concat(req.body.month, ")");

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.month.length == 0) {
                            month = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select\n            L.\"districtId\",\n            D.\"districtName\",\n            F.\"facilityName\",\n            Sb.\"subCenterName\",\n            V.\"villageName\",\n            L.\"patientId\",\n            L.\"nameOfPatient\",\n            L.\"headOfFamily\",\n            L.month,\n            L.year,\n            L.\"corporationId\",\n            L.\"talukaId\",\n            L.\"facilityId\",\n            L.town,\n            L.\"subCenterId\",\n            L.\"villageId\",\n            L.\"patientMobileNumber\",\n            L.\"diseaseType\",\n            L.grading,\n            W.\"wardName\",\n            T.\"talukaName\",\n            C.\"corporationName\",\n            U.\"categoryOptionName\" As \"gender\",\n            U1.\"categoryOptionName\" as gradingName\n        from\n            public.\"lymphedemaLineLists\" L\n            left join public.corporations C on C.id = L.\"corporationId\"\n            left join public.districts D on D.id = L.\"districtId\"\n            left join public.facilities F on F.id = L.\"facilityId\"\n            left join public.\"subCenters\" Sb on Sb.id = L.\"subCenterId\"\n            left join public.talukas T on T.id = L.\"talukaId\"\n            left join public.villages V on V.id = L.\"villageId\"\n            left join public.wards W on W.id = L.\"wardId\"\n            left join public.zones Z on Z.id = L.\"zoneId\"\n            left join public.\"udCategoryOptions\" U ON U.id = L.gender\n            left join public.\"udCategoryOptions\" U1 on U1.id = L.\"grading\"\n        where\n            lower(\"diseaseType\") like '%hydrocele%'\n            and L.\"isActive\" = true\n             ".concat(districtId, " ").concat(year, " ").concat(month, " \n        \n        ")).then(function (_ref68) {
                            var _ref69 = (0, _slicedToArray2["default"])(_ref68, 2),
                                results = _ref69[0],
                                metadata = _ref69[1];

                            response.error = false;
                            response.data = results;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 9:
                        case "end":
                          return _context34.stop();
                      }
                    }
                  }, _callee34);
                }));

                return function (_x35) {
                  return _ref67.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context35.stop();
          }
        }
      }, _callee35);
    }));

    return function GetHydroceleCasesDistwiseDao(_x34) {
      return _ref66.apply(this, arguments);
    };
  }();

  var GetHydroceleOperatedDao = /*#__PURE__*/function () {
    var _ref70 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee37(req) {
      return _regenerator["default"].wrap(function _callee37$(_context37) {
        while (1) {
          switch (_context37.prev = _context37.next) {
            case 0:
              return _context37.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref71 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee36(resolve) {
                  var response, districtId, year, month;
                  return _regenerator["default"].wrap(function _callee36$(_context36) {
                    while (1) {
                      switch (_context36.prev = _context36.next) {
                        case 0:
                          response = {};

                          if (typeof req.body.month == 'string' && req.body.month.length != 0) {
                            // req.body.month = JSON.parse(req.body.month)
                            req.body.month = req.body.month.split(",");
                            console.log("month", req.body.month);
                          }

                          if (typeof req.body.year == 'string' && req.body.year.length != 0) {
                            // req.body.year = JSON.parse(req.body.year)
                            req.body.year = req.body.year.split(",");
                            console.log("year", req.body.year);
                          }

                          districtId = "and  L.\"districtId\" = ".concat(req.body.districtId);
                          year = "and  L.year IN (".concat(req.body.year, ")");
                          month = "and  L.month IN (".concat(req.body.month, ")");

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.month.length == 0) {
                            month = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select L.\"districtId\",\n            D.\"districtName\",F.\"facilityName\",Sb.\"subCenterName\",V.\"villageName\",\n            L.\"patientId\",L.\"nameOfPatient\",L.\"headOfFamily\",\n            L.month,L.year,L.\"corporationId\",L.\"talukaId\",L.\"facilityId\",\n            L.town,L.\"subCenterId\",L.\"villageId\",L.\"patientMobileNumber\",\n            L.\"diseaseType\",L.grading,\n            W.\"wardName\",T.\"talukaName\",C.\"corporationName\",U.\"categoryOptionName\" As \"gender\",\n            U1.\"categoryOptionName\" as gradingName\n            from public.\"lymphedemaLineLists\" L\n            inner join public.\"lymphedemaLineListFollowUpsHFs\" HF on HF.\"lymphedemaLineListId\"=L.ID and HF.\"isActive\"=true\n            left join public.corporations C on C.id = L.\"corporationId\"\n            left join public.districts D on D.id = L.\"districtId\"\n            left join public.facilities F on F.id = L.\"facilityId\"\n            left join public.\"subCenters\" Sb on Sb.id = L.\"subCenterId\"\n            left join public.talukas T on T.id = L.\"talukaId\"\n            left join public.villages V on V.id = L.\"villageId\"\n            left join public.wards W on W.id = L.\"wardId\"\n            left join public.zones Z on Z.id = L.\"zoneId\"\n            left join public.\"udCategoryOptions\" U ON U.id=L.gender\n            left join public.\"udCategoryOptions\" U1 on U1.id = L.\"grading\"\n            where lower(\"diseaseType\") like '%hydrocele%' and HF.\"isSurgeryDone\"=true and L.\"isActive\"=true            \n        ".concat(districtId, " ").concat(year, " ").concat(month, " \n        \n        ")).then(function (_ref72) {
                            var _ref73 = (0, _slicedToArray2["default"])(_ref72, 2),
                                results = _ref73[0],
                                metadata = _ref73[1];

                            response.error = false;
                            response.data = results;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 9:
                        case "end":
                          return _context36.stop();
                      }
                    }
                  }, _callee36);
                }));

                return function (_x37) {
                  return _ref71.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context37.stop();
          }
        }
      }, _callee37);
    }));

    return function GetHydroceleOperatedDao(_x36) {
      return _ref70.apply(this, arguments);
    };
  }();

  var GetPendingApprovalMODistwiseDao = /*#__PURE__*/function () {
    var _ref74 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee39(req) {
      return _regenerator["default"].wrap(function _callee39$(_context39) {
        while (1) {
          switch (_context39.prev = _context39.next) {
            case 0:
              return _context39.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref75 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee38(resolve) {
                  var response, districtId, year, month;
                  return _regenerator["default"].wrap(function _callee38$(_context38) {
                    while (1) {
                      switch (_context38.prev = _context38.next) {
                        case 0:
                          response = {};

                          if (typeof req.body.month == 'string' && req.body.month.length != 0) {
                            // req.body.month = JSON.parse(req.body.month)
                            req.body.month = req.body.month.split(",");
                            console.log("month", req.body.month);
                          }

                          if (typeof req.body.year == 'string' && req.body.year.length != 0) {
                            // req.body.year = JSON.parse(req.body.year)
                            req.body.year = req.body.year.split(",");
                            console.log("year", req.body.year);
                          }

                          districtId = "and  L.\"districtId\" = ".concat(req.body.districtId);
                          year = "and  L.year IN (".concat(req.body.year, ")");
                          month = "and  L.month IN (".concat(req.body.month, ")");

                          if (req.body.year.length == 0) {
                            year = "";
                          }

                          if (req.body.month.length == 0) {
                            month = "";
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select\n            L.\"districtId\",\n            D.\"districtName\",\n            F.\"facilityName\",\n            Sb.\"subCenterName\",\n            V.\"villageName\",\n            L.\"patientId\",\n            L.\"nameOfPatient\",\n            L.\"headOfFamily\",\n            L.month,\n            L.year,\n            L.\"corporationId\",\n            L.\"talukaId\",\n            L.\"facilityId\",\n            L.town,\n            L.\"subCenterId\",\n            L.\"villageId\",\n            L.\"patientMobileNumber\",\n            L.\"diseaseType\",\n            L.grading,\n            W.\"wardName\",\n            T.\"talukaName\",\n            C.\"corporationName\",\n            U.\"categoryOptionName\" As \"gender\",\n            U1.\"categoryOptionName\" as gradingName\n       from\n            public.\"lymphedemaLineLists\" L\n            inner join public.\"lymphedemaLineListSurveys\" LF on LF.\"lymphedemaLineListId\" = L.ID\n            and LF.\"isActive\" = true\n            left join public.corporations C on C.id = L.\"corporationId\"\n            left join public.districts D on D.id = L.\"districtId\"\n            left join public.facilities F on F.id = L.\"facilityId\"\n            left join public.\"subCenters\" Sb on Sb.id = L.\"subCenterId\"\n            left join public.talukas T on T.id = L.\"talukaId\"\n            left join public.villages V on V.id = L.\"villageId\"\n            left join public.wards W on W.id = L.\"wardId\"\n            left join public.zones Z on Z.id = L.\"zoneId\"\n            left join public.\"udCategoryOptions\" U ON U.id = L.gender\n            left join public.\"udCategoryOptions\" U1 on U1.id = L.\"grading\"\n       where\n            LF.\"isVerified\" = false\n            and L.\"isActive\" = true\n        ".concat(districtId, " ").concat(year, " ").concat(month, " \n        \n        ")).then(function (_ref76) {
                            var _ref77 = (0, _slicedToArray2["default"])(_ref76, 2),
                                results = _ref77[0],
                                metadata = _ref77[1];

                            response.error = false;
                            response.data = results;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 9:
                        case "end":
                          return _context38.stop();
                      }
                    }
                  }, _callee38);
                }));

                return function (_x39) {
                  return _ref75.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context39.stop();
          }
        }
      }, _callee39);
    }));

    return function GetPendingApprovalMODistwiseDao(_x38) {
      return _ref74.apply(this, arguments);
    };
  }();

  return {
    GetMMDPDetailsInPercentageDao: GetMMDPDetailsInPercentageDao,
    GetEndemicityGraphAllDistrictsDao: GetEndemicityGraphAllDistrictsDao,
    GetEndemicityGraphAllTaluksByDistrictDao: GetEndemicityGraphAllTaluksByDistrictDao,
    GetMFEndemicityGraphAllDistrictsDao: GetMFEndemicityGraphAllDistrictsDao,
    GetMFEndemicityGraphMFPosetiveDao: GetMFEndemicityGraphMFPosetiveDao,
    GetMFEndemicityGraphBSCollectedDao: GetMFEndemicityGraphBSCollectedDao,
    GetMFEndemicityGraphBSExaminedDao: GetMFEndemicityGraphBSExaminedDao,
    GetMFEndemicityGraphMfRateDao: GetMFEndemicityGraphMfRateDao,
    GetEndemicityTrendGraphAllDistrictsDao: GetEndemicityTrendGraphAllDistrictsDao,
    GetEndemicityTrendGraphByDistrictDao: GetEndemicityTrendGraphByDistrictDao,
    GetEndemicityTrendGraphAllDistrictsNoOfLFCasesDao: GetEndemicityTrendGraphAllDistrictsNoOfLFCasesDao,
    GetEndemicityTrendGraphAllDistrictsNoOfHydroceleCasesDao: GetEndemicityTrendGraphAllDistrictsNoOfHydroceleCasesDao,
    GetEndemicityTrendGraphAllDistrictsnoOfPersonsDao: GetEndemicityTrendGraphAllDistrictsnoOfPersonsDao,
    GetEndemicityTrendGraphByDistrictNoOfPersonsDao: GetEndemicityTrendGraphByDistrictNoOfPersonsDao,
    GetEndemicityTrendGraphByDistrictNoOfHydroceleCasesDao: GetEndemicityTrendGraphByDistrictNoOfHydroceleCasesDao,
    GetEndemicityTrendGraphByDistrictNoOfLFCasesDao: GetEndemicityTrendGraphByDistrictNoOfLFCasesDao,
    GetLFCasesDistwiseDao: GetLFCasesDistwiseDao,
    GetHydroceleCasesDistwiseDao: GetHydroceleCasesDistwiseDao,
    GetHydroceleOperatedDao: GetHydroceleOperatedDao,
    GetPendingApprovalMODistwiseDao: GetPendingApprovalMODistwiseDao
  };
};

var _default = GraphDao();

exports["default"] = _default;
//# sourceMappingURL=GraphDao.js.map
