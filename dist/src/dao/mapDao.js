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

var mapDao = function mapDao() {
  var GetEndemicityMapAllDistrictsDao = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve) {
                  var response, year, month, district;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          response = {};
                          year = '';
                          month = '';
                          district = '';

                          if (req.body.year.length > 0) {
                            year = "and year in  (".concat(req.body.year, ")");
                          }

                          if (req.body.startMonth.length > 0 && req.body.endMonth.length > 0) {
                            month = "and \"month\" BETWEEN ".concat(req.body.startMonth, " and  ").concat(req.body.endMonth);
                          }

                          if (req.body.district.length > 0) {
                            district = "where D.id in (".concat(req.body.district, ")");
                          } // if (req.body.year.length > 0) {
                          //     year = `and year in  (${req.body.year})`
                          // }
                          // if (req.body.month.length > 0) {
                          //     month = `and month in (${req.body.month})`
                          // }
                          // if (req.body.district.length > 0) {
                          //     district = `where D.id in (${req.body.district})`
                          // }
                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // if (req.body.year.length > 0) {
                          //     year = `and year in  (${req.body.year})`
                          // }
                          // if (req.body.month.length > 0) {
                          //     month = `and month in (${req.body.month})`
                          // }
                          // if (req.body.district.length > 0) {
                          //     district = `where D.id in (${req.body.district})`
                          // }
                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select (D.\"id\") AS \"districtId\",D.\"districtName\",D.\"mapId\" AS \"mapDistrictId\",\n            COALESCE(L1.\"NoOfLFCases\",0) :: INTEGER As \"NoOfLFCases\",\n            COALESCE(L2.\"NoOfHydroceleCases\",0):: INTEGER As \"NoOfHydroceleCases\",\n            COALESCE(L3.\"NoOfHydroceleSurgeries\",0):: INTEGER As \"NoOfHydroceleSurgeries\",\n            COALESCE(M1.\"NoMFPosetive\",0):: INTEGER As \"NoMFPosetive\",\n            COALESCE(E1.\"infectionRate\",0):: DECIMAL(10,2) As \"CulexInfection\",\n\t\t\tCOALESCE(E1.\"infectivityRate\",0):: DECIMAL(10,2)  As \"CulexInfectivity\"\n            from public.districts D  \n            LEFT OUTER JOIN \n            (select count(id) AS \"NoOfLFCases\",\"districtId\" from public.\"lymphedemaLineLists\" \n                where lower(\"diseaseType\") like '%lymphedema%' and \"isActive\" =true\n                ".concat(year, " ").concat(month, " \n                group by \"districtId\"\n            )L1 ON D.\"id\"=L1.\"districtId\"\n            LEFT OUTER JOIN \n            (select count(id) AS \"NoOfHydroceleCases\",\"districtId\" from public.\"lymphedemaLineLists\" \n                where lower(\"diseaseType\") like '%hydrocele%' and \"isActive\" =true\n                ").concat(year, " ").concat(month, "\n                group by \"districtId\"\n            )L2 ON D.\"id\"=L2.\"districtId\"\n            LEFT OUTER JOIN \n            (select count(H.id) AS \"NoOfHydroceleSurgeries\",\"districtId\" from public.\"lymphedemaLineLists\" H\n\t\t\t\tleft join public.\"lymphedemaLineListFollowUpsHFs\" HO ON H.id=HO.\"lymphedemaLineListId\"\n                where lower(\"diseaseType\") like '%hydrocele%' and HO.\"isSurgeryDone\"=true\n                ").concat(year, " ").concat(month, "\n                group by \"districtId\"\n            )L3 ON D.\"id\"=L3.\"districtId\"\n            LEFT OUTER JOIN \n            (select count(MP.id) AS \"NoMFPosetive\",M.\"districtId\" from public.\"mfPositiveLineListPatients\" MP\n                inner join public.\"mfPositiveLineLists\" M ON M.id=MP.\"mfPositiveLineListId\"\n                where MP.\"isActive\" =true and M.\"isActive\" =true\n                ").concat(year, " ").concat(month, "\n                group by M.\"districtId\"\n            )M1 ON D.\"id\"=M1.\"districtId\" \n            LEFT OUTER JOIN \n\t\t\t(select E.\"districtId\",\n\t\t\t\t((CAST(SUM(\"totalNoPositiveMosq1to3Stage\") AS float)/ (case when COALESCE (SUM(\"mosqDissectedCulexQui\"),0) = 0 \n\t\t\t\tthen null else SUM(\"mosqDissectedCulexQui\") end))*100.00)  as \"infectionRate\",\n\t\t\t\t((CAST(SUM(\"totalNoPositiveMosq3Stage\") AS float)/ (case when COALESCE (SUM(\"mosqDissectedCulexQui\"),0) = 0 \n\t\t\t\tthen null else SUM(\"mosqDissectedCulexQui\") end))*100.00) as \"infectivityRate\"\n\t\t\t\tfrom public.\"entomologicalLarvicidalLists\" E\n\t\t\t\twhere E.\"isActive\" =true \n\t\t\t\t").concat(year, " ").concat(month, "\n\t\t\t\tgroup by E.\"districtId\"\n\t\t\t)E1 ON D.\"id\"=E1.\"districtId\"             \n            ")).then(function (_ref3) {
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

    return function GetEndemicityMapAllDistrictsDao(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var GetEndemicityMapAllTaluksByDistrictDao = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req) {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(resolve) {
                  var response, year, month, mapDistrictId;
                  return _regenerator["default"].wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          response = {};
                          year = '';
                          month = '';
                          mapDistrictId = '';

                          if (req.body.year.length > 0) {
                            year = "and year in  (".concat(req.body.year, ")");
                          }

                          if (req.body.startMonth.length > 0 && req.body.endMonth.length > 0) {
                            month = "and \"month\" BETWEEN ".concat(req.body.startMonth, " and  ").concat(req.body.endMonth);
                          }

                          if (req.body.mapDistrictId.length > 0) {
                            mapDistrictId = req.body.mapDistrictId;
                          } // var year = `and "year" =  ${req.body.year}`
                          // var month = `and "month" = ${req.body.month}`
                          // var mapDistrictId = req.body.mapDistrictId
                          // if (req.body.year.length == 0) {
                          //     year = ""
                          // }
                          // if (req.body.month.length == 0) {
                          //     month = ""
                          // }
                          // if (req.body.mapDistrictId.length == 0) {
                          //     mapDistrictId = ""
                          // }
                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // var year = `and "year" =  ${req.body.year}`
                          // var month = `and "month" = ${req.body.month}`
                          // var mapDistrictId = req.body.mapDistrictId
                          // if (req.body.year.length == 0) {
                          //     year = ""
                          // }
                          // if (req.body.month.length == 0) {
                          //     month = ""
                          // }
                          // if (req.body.mapDistrictId.length == 0) {
                          //     mapDistrictId = ""
                          // }
                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("           \n            select (T.\"id\") AS \"talukaId\",T.\"talukaName\",T.\"mapId\" AS \"mapTalukaId\",\n            T.\"districtId\",D.\"mapId\" AS \"mapDistrictId\",\n            COALESCE(L1.\"NoOfLFCases\",0) :: INTEGER As \"NoOfLFCases\",\n            COALESCE(L2.\"NoOfHydroceleCases\",0):: INTEGER As \"NoOfHydroceleCases\",\n            COALESCE(L3.\"NoOfHydroceleSurgeries\",0):: INTEGER As \"NoOfHydroceleSurgeries\",\n            COALESCE(M1.\"NoMFPosetive\",0):: INTEGER As \"NoMFPosetive\",\n            COALESCE(E1.\"infectionRate\",0):: DECIMAL(10,2) As \"CulexInfection\",\n\t\t\tCOALESCE(E1.\"infectivityRate\",0):: DECIMAL(10,2)  As \"CulexInfectivity\"          \n            from public.talukas T\n            LEFT OUTER JOIN \n            public.districts D ON D.id=T.\"districtId\"\n            LEFT OUTER JOIN \n            (\n                select count(id) AS \"NoOfLFCases\",\"talukaId\" from public.\"lymphedemaLineLists\" \n                where lower(\"diseaseType\") like '%lymphedema%'\n                ".concat(year, " ").concat(month, "\n                group by \"talukaId\"\n            )L1 ON T.\"id\"=L1.\"talukaId\"\n            LEFT OUTER JOIN \n            (\n                select count(id) AS \"NoOfHydroceleCases\",\"talukaId\" from public.\"lymphedemaLineLists\" \n                where lower(\"diseaseType\") like '%hydrocele%'\n                ").concat(year, " ").concat(month, "\n                group by \"talukaId\"\n            )L2 ON T.\"id\"=L2.\"talukaId\"\n            LEFT OUTER JOIN \n            (\n                select count(H.id) AS \"NoOfHydroceleSurgeries\",\"talukaId\" from public.\"lymphedemaLineLists\" H\n\t\t\t\tleft join public.\"lymphedemaLineListFollowUpsHFs\" HO ON H.id=HO.\"lymphedemaLineListId\"\n                where lower(\"diseaseType\") like '%hydrocele%' and HO.\"isSurgeryDone\"=true\n                ").concat(year, " ").concat(month, "\n                group by \"talukaId\"\n            )L3 ON T.\"id\"=L3.\"talukaId\"\n            LEFT OUTER JOIN \n            (\n                select count(MP.id) AS \"NoMFPosetive\",M.\"talukaId\" from public.\"mfPositiveLineListPatients\" MP\n                inner join public.\"mfPositiveLineLists\" M ON M.id=MP.\"mfPositiveLineListId\"\n                where MP.\"mfCount\" > 0\n                ").concat(year, " ").concat(month, "\n                group by M.\"talukaId\"\n            )M1 ON T.\"id\"=M1.\"talukaId\"\n            LEFT OUTER JOIN \n\t\t\t(select E.\"talukaId\",\n\t\t\t\t((CAST(SUM(\"totalNoPositiveMosq1to3Stage\") AS float)/ (case when COALESCE (SUM(\"mosqDissectedCulexQui\"),0) = 0 \n\t\t\t\tthen null else SUM(\"mosqDissectedCulexQui\") end))*100.00)  as \"infectionRate\",\n\t\t\t\t((CAST(SUM(\"totalNoPositiveMosq3Stage\") AS float)/ (case when COALESCE (SUM(\"mosqDissectedCulexQui\"),0) = 0 \n\t\t\t\tthen null else SUM(\"mosqDissectedCulexQui\") end))*100.00) as \"infectivityRate\"\n\t\t\t\tfrom public.\"entomologicalLarvicidalLists\" E\n\t\t\t\twhere E.\"isActive\" =true \n\t\t\t\t").concat(year, " ").concat(month, "\n\t\t\t\tgroup by E.\"talukaId\"\n\t\t\t)E1 ON T.\"id\"=E1.\"talukaId\"\n            where D.\"mapId\" = '").concat(mapDistrictId, "'  \n\t")).then(function (_ref7) {
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

    return function GetEndemicityMapAllTaluksByDistrictDao(_x3) {
      return _ref5.apply(this, arguments);
    };
  }();

  var GetEndemicityMapAllVillagesByTalukaDao = /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req) {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(resolve) {
                  var response, year, month, mapDistrictId, mapTalukaId;
                  return _regenerator["default"].wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          response = {};
                          year = '';
                          month = '';
                          mapDistrictId = '';
                          mapTalukaId = '';

                          if (req.body.year.length > 0) {
                            year = "and year in  (".concat(req.body.year, ")");
                          }

                          if (req.body.startMonth.length > 0 && req.body.endMonth.length > 0) {
                            month = "and \"month\" BETWEEN ".concat(req.body.startMonth, " and  ").concat(req.body.endMonth);
                          }

                          if (req.body.mapDistrictId.length > 0) {
                            mapDistrictId = req.body.mapDistrictId;
                          }

                          if (req.body.mapTalukaId.length > 0) {
                            mapTalukaId = req.body.mapTalukaId;
                          } // var year = `and year =  ${req.body.year}`
                          // var month = `and month = ${req.body.month}`
                          // var mapDistrictId = req.body.mapDistrictId
                          // var mapTalukaId = req.body.mapTalukaId
                          // if (req.body.year.length == 0) {
                          //     year = ""
                          // }
                          // if (req.body.month.length == 0) {
                          //     month = ""
                          // }
                          // if (req.body.mapDistrictId.length == 0) {
                          //     mapDistrictId = ""
                          // }
                          // if (req.body.mapTalukaId.length == 0) {
                          //     mapTalukaId = ""
                          // }
                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // var year = `and year =  ${req.body.year}`
                          // var month = `and month = ${req.body.month}`
                          // var mapDistrictId = req.body.mapDistrictId
                          // var mapTalukaId = req.body.mapTalukaId
                          // if (req.body.year.length == 0) {
                          //     year = ""
                          // }
                          // if (req.body.month.length == 0) {
                          //     month = ""
                          // }
                          // if (req.body.mapDistrictId.length == 0) {
                          //     mapDistrictId = ""
                          // }
                          // if (req.body.mapTalukaId.length == 0) {
                          //     mapTalukaId = ""
                          // }
                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select (V.\"id\") AS \"villageId\",V.\"villageName\",V.\"mapId\" AS \"mapVillageId\",\n            V.\"districtId\",D.\"mapId\" AS \"mapDistrictId\",V.\"talukaId\",T.\"mapId\" AS \"mapTalukaId\",\n            COALESCE(L1.\"NoOfLFCases\",0) :: INTEGER As \"NoOfLFCases\",\n            COALESCE(L2.\"NoOfHydroceleCases\",0):: INTEGER As \"NoOfHydroceleCases\",\n            COALESCE(L3.\"NoOfHydroceleSurgeries\",0):: INTEGER As \"NoOfHydroceleSurgeries\",\n            COALESCE(M1.\"NoMFPosetive\",0):: INTEGER As \"NoMFPosetive\",            \n            COALESCE(E1.\"infectionRate\",0):: DECIMAL(10,2) As \"CulexInfection\",\n\t\t\tCOALESCE(E1.\"infectivityRate\",0):: DECIMAL(10,2)  As \"CulexInfectivity\"  \n            from public.villages V\n            LEFT OUTER JOIN \n            public.districts D ON D.id=V.\"districtId\"\n            LEFT OUTER JOIN \n            public.talukas T  ON T.id=V.\"talukaId\"\n            LEFT OUTER JOIN \n            (\n                select count(id) AS \"NoOfLFCases\",\"villageId\" from public.\"lymphedemaLineLists\" \n                where lower(\"diseaseType\") like '%lymphedema%'\n            ".concat(year, " ").concat(month, "\n                group by \"villageId\"\n            )L1 ON V.\"id\"=L1.\"villageId\"\n            LEFT OUTER JOIN \n            (\n                select count(id) AS \"NoOfHydroceleCases\",\"villageId\" from public.\"lymphedemaLineLists\" \n                where lower(\"diseaseType\") like '%hydrocele%'\n                ").concat(year, " ").concat(month, "\n                group by \"villageId\"\n            )L2 ON V.\"id\"=L2.\"villageId\"\n            LEFT OUTER JOIN \n            (\n                select count(H.id) AS \"NoOfHydroceleSurgeries\",\"villageId\" from public.\"lymphedemaLineLists\" H\n\t\t\t\tleft join public.\"lymphedemaLineListFollowUpsHFs\" HO ON H.id=HO.\"lymphedemaLineListId\"\n                where lower(\"diseaseType\") like '%hydrocele%' and HO.\"isSurgeryDone\"=true\n                ").concat(year, " ").concat(month, "\n                group by \"villageId\"\n            )L3 ON V.\"id\"=L3.\"villageId\"\n            LEFT OUTER JOIN \n            (\n                select count(MP.id) AS \"NoMFPosetive\",M.\"villageId\" from public.\"mfPositiveLineListPatients\" MP\n                inner join public.\"mfPositiveLineLists\" M ON M.id=MP.\"mfPositiveLineListId\"\n                where MP.\"mfCount\" > 0\n                ").concat(year, " ").concat(month, "\n                group by M.\"villageId\"\n            )M1 ON V.\"id\"=M1.\"villageId\"\n            LEFT OUTER JOIN \n\t\t\t(select E.\"villageId\",\n\t\t\t\t((CAST(SUM(\"totalNoPositiveMosq1to3Stage\") AS float)/ (case when COALESCE (SUM(\"mosqDissectedCulexQui\"),0) = 0 \n\t\t\t\tthen null else SUM(\"mosqDissectedCulexQui\") end))*100.00)  as \"infectionRate\",\n\t\t\t\t((CAST(SUM(\"totalNoPositiveMosq3Stage\") AS float)/ (case when COALESCE (SUM(\"mosqDissectedCulexQui\"),0) = 0 \n\t\t\t\tthen null else SUM(\"mosqDissectedCulexQui\") end))*100.00) as \"infectivityRate\"\n\t\t\t\tfrom public.\"entomologicalLarvicidalLists\" E\n\t\t\t\twhere E.\"isActive\" =true \n\t\t\t\t").concat(year, " ").concat(month, "\n\t\t\t\tgroup by E.\"villageId\"\n\t\t\t)E1 ON V.\"id\"=E1.\"villageId\"            \n            where D.\"mapId\"= '").concat(mapDistrictId, "' and T.\"mapId\" = '").concat(mapTalukaId, "'\n  \n\t")).then(function (_ref11) {
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

    return function GetEndemicityMapAllVillagesByTalukaDao(_x5) {
      return _ref9.apply(this, arguments);
    };
  }();

  var GetDistrictsGeoDao = /*#__PURE__*/function () {
    var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(resolve) {
                  var response;
                  return _regenerator["default"].wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          response = {};

                          _sequelize["default"].sequelize.query("\n            SELECT json_agg(features) AS features    \n            FROM (select \"stateId\" ,\"mapId\",\"districtName\",features    \n            FROM   public.\"districtsGeoJson\" \n\t\t\torder by \"districtName\") G \n            group by \"stateId\"\n            ").then(function (_ref15) {
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

                        case 2:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  }, _callee7);
                }));

                return function (_x7) {
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

    return function GetDistrictsGeoDao() {
      return _ref13.apply(this, arguments);
    };
  }();

  var GetTalukasGeoDao = /*#__PURE__*/function () {
    var _ref17 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req) {
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              return _context10.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(resolve) {
                  var response, districtMapId;
                  return _regenerator["default"].wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          response = {};
                          districtMapId = req.query.districtMapId;

                          _sequelize["default"].sequelize.query("\n            SELECT \"districtMapId\", json_agg(features) AS features    \n            FROM (select \"districtMapId\",\"talukaName\",features    \n            FROM   public.\"talukasGeoJson\" \n\t\t\torder by \"districtMapId\",\"talukaName\") G \n            where \"districtMapId\"= '".concat(districtMapId, "'\n            group by \"districtMapId\"  \n            ")).then(function (_ref19) {
                            var _ref20 = (0, _slicedToArray2["default"])(_ref19, 2),
                                results = _ref20[0],
                                metadata = _ref20[1];

                            response.error = false;
                            response.data = results[0];
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 3:
                        case "end":
                          return _context9.stop();
                      }
                    }
                  }, _callee9);
                }));

                return function (_x9) {
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

    return function GetTalukasGeoDao(_x8) {
      return _ref17.apply(this, arguments);
    };
  }();

  var GetVillagesGeoDao = /*#__PURE__*/function () {
    var _ref21 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req) {
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              return _context12.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref22 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(resolve) {
                  var response, talukaMapId;
                  return _regenerator["default"].wrap(function _callee11$(_context11) {
                    while (1) {
                      switch (_context11.prev = _context11.next) {
                        case 0:
                          response = {};
                          talukaMapId = req.query.talukaMapId;

                          _sequelize["default"].sequelize.query("\n            SELECT \"talukaMapId\",\"districtMapId\", json_agg(features) AS features\n            FROM  public.\"villagesGeoJson\"\n            where \"talukaMapId\"= '".concat(talukaMapId, "'\n            group by \"talukaMapId\",\"districtMapId\" \n            ")).then(function (_ref23) {
                            var _ref24 = (0, _slicedToArray2["default"])(_ref23, 2),
                                results = _ref24[0],
                                metadata = _ref24[1];

                            response.error = false;
                            response.data = results[0];
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 3:
                        case "end":
                          return _context11.stop();
                      }
                    }
                  }, _callee11);
                }));

                return function (_x11) {
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

    return function GetVillagesGeoDao(_x10) {
      return _ref21.apply(this, arguments);
    };
  }();

  var GetTownsGeoDao = /*#__PURE__*/function () {
    var _ref25 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req) {
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              return _context14.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref26 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(resolve) {
                  var response, talukaMapId;
                  return _regenerator["default"].wrap(function _callee13$(_context13) {
                    while (1) {
                      switch (_context13.prev = _context13.next) {
                        case 0:
                          response = {};
                          talukaMapId = req.query.talukaMapId;

                          _sequelize["default"].sequelize.query("\n            SELECT \"talukaMapId\",\"districtMapId\", json_agg(features) AS features\n            FROM  public.\"townsGeoJson\"\n            where \"talukaMapId\"= '".concat(talukaMapId, "'\n            group by \"talukaMapId\",\"districtMapId\" \n            ")).then(function (_ref27) {
                            var _ref28 = (0, _slicedToArray2["default"])(_ref27, 2),
                                results = _ref28[0],
                                metadata = _ref28[1];

                            response.error = false;
                            response.data = results[0];
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 3:
                        case "end":
                          return _context13.stop();
                      }
                    }
                  }, _callee13);
                }));

                return function (_x13) {
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

    return function GetTownsGeoDao(_x12) {
      return _ref25.apply(this, arguments);
    };
  }();

  var GetEndemicityMapHomeDao = /*#__PURE__*/function () {
    var _ref29 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              return _context16.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref30 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(resolve) {
                  var response, todaysDate, currentYear, year;
                  return _regenerator["default"].wrap(function _callee15$(_context15) {
                    while (1) {
                      switch (_context15.prev = _context15.next) {
                        case 0:
                          response = {};
                          todaysDate = new Date();
                          currentYear = todaysDate.getFullYear();
                          year = '';
                          year = "and year in  (".concat(currentYear, ")");

                          _sequelize["default"].sequelize.query("\n            select (D.\"id\") AS \"districtId\",D.\"districtName\",D.\"mapId\" AS \"mapDistrictId\",\n            COALESCE(L1.\"NoOfLFCases\",0) :: INTEGER As \"NoOfLFCases\",\n            COALESCE(L2.\"NoOfHydroceleCases\",0):: INTEGER As \"NoOfHydroceleCases\",\n            COALESCE(M1.\"NoMFPosetive\",0):: INTEGER As \"NoMFPosetive\"\n            from public.districts D  \n            LEFT OUTER JOIN \n            (select count(id) AS \"NoOfLFCases\",\"districtId\" from public.\"lymphedemaLineLists\" \n                where lower(\"diseaseType\") like '%lymphedema%' and \"isActive\" =true\n                ".concat(year, " \n                group by \"districtId\"\n            )L1 ON D.\"id\"=L1.\"districtId\"\n            LEFT OUTER JOIN \n            (select count(id) AS \"NoOfHydroceleCases\",\"districtId\" from public.\"lymphedemaLineLists\" \n                where lower(\"diseaseType\") like '%hydrocele%' and \"isActive\" =true\n                ").concat(year, " \n                group by \"districtId\"\n            )L2 ON D.\"id\"=L2.\"districtId\"\n            LEFT OUTER JOIN \n            (select count(MP.id) AS \"NoMFPosetive\",M.\"districtId\" from public.\"mfPositiveLineListPatients\" MP\n                inner join public.\"mfPositiveLineLists\" M ON M.id=MP.\"mfPositiveLineListId\"\n                where MP.\"isActive\" =true and M.\"isActive\" =true\n                ").concat(year, "\n                group by M.\"districtId\"\n            )M1 ON D.\"id\"=M1.\"districtId\" ")).then(function (_ref31) {
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

                        case 6:
                        case "end":
                          return _context15.stop();
                      }
                    }
                  }, _callee15);
                }));

                return function (_x14) {
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

    return function GetEndemicityMapHomeDao() {
      return _ref29.apply(this, arguments);
    };
  }();

  return {
    GetEndemicityMapAllDistrictsDao: GetEndemicityMapAllDistrictsDao,
    GetEndemicityMapAllTaluksByDistrictDao: GetEndemicityMapAllTaluksByDistrictDao,
    GetEndemicityMapAllVillagesByTalukaDao: GetEndemicityMapAllVillagesByTalukaDao,
    GetDistrictsGeoDao: GetDistrictsGeoDao,
    GetTalukasGeoDao: GetTalukasGeoDao,
    GetVillagesGeoDao: GetVillagesGeoDao,
    GetTownsGeoDao: GetTownsGeoDao,
    GetEndemicityMapHomeDao: GetEndemicityMapHomeDao
  };
};

var _default = mapDao();

exports["default"] = _default;
//# sourceMappingURL=mapDao.js.map
