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

var dashboardDao = function dashboardDao() {
  var GetEndemicityTotalAllDistrictsDao = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve) {
                  var response, year, endYear, prevYear, districtId, month, selectYear, previosYear, cumulative;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          response = {}; //console.log(req.body);

                          //console.log(req.body);
                          year = "and A.\"year\" BETWEEN ".concat(req.body.fromYear, " and  ").concat(req.body.toYear, " ");
                          endYear = "and A.\"year\" = ".concat(req.body.toYear, " ");
                          prevYear = "and A.\"year\" = ".concat(req.body.toYear - 1, " ");
                          districtId = req.body.districtId.length == 0 || req.body.districtId == 0 ? " " : "and A.\"districtId\" = ".concat(req.body.districtId);
                          month = "and A.\"month\" BETWEEN ".concat(req.body.startMonth, " and  ").concat(req.body.endMonth, " "); // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;

                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          selectYear = _sequelize["default"].sequelize.query("\n            select \tsum(B.\"NoOfLFCases\") \"NoOfLFCases\", sum(B.\"NoOfHydroceleCases\") \"NoOfHydroceleCases\", \n\t        sum (B.\"NoOfHydroceleSurgery\") \"NoOfHydroceleSurgery\", sum (B.\"NoMFPosetive\") \"NoMFPosetive\"\n            From\n            (select (D.\"id\") AS \"districtId\",D.\"districtName\",D.\"mapId\" AS \"mapDistrictId\",\n\n            COALESCE(L1.\"NoOfLFCases\",0) + COALESCE(L11.\"NoOfLFCases\",0) As \"NoOfLFCases\",\n            COALESCE(L2.\"NoOfHydroceleCases\",0)  + COALESCE(L21.\"NoOfHydroceleCases\",0) As \"NoOfHydroceleCases\",\n            COALESCE(L3.\"NoOfHydroceleSurgery\",0) + COALESCE(L31.\"NoOfHydroceleSurgery\",0) As \"NoOfHydroceleSurgery\",\n            COALESCE(M1.\"NoMFPosetive\",0) As \"NoMFPosetive\"\n\n            from public.districts D  \n            LEFT OUTER JOIN \n            (select count(A.id) AS \"NoOfLFCases\", A.\"districtId\" from public.\"lymphedemaLineLists\" A\n                where lower(A.\"diseaseType\") like '%lymphedema%' and A.\"isActive\" =true\n                ".concat(endYear, " ").concat(month, " ").concat(districtId, "\n                group by A.\"districtId\"\n            )L1 ON D.\"id\"=L1.\"districtId\"\n            LEFT OUTER JOIN \n            (select sum(A.\"lfCases\"/A.month) AS \"NoOfLFCases\", A.\"districtId\" from public.\"districtYearWiseCasesLHHF\" A\n                where 1=1 \n                ").concat(endYear, " ").concat(districtId, "\n                group by A.\"districtId\"\n            )L11 ON D.\"id\"=L11.\"districtId\"\n            LEFT OUTER JOIN \n            (select count(A.id) AS \"NoOfHydroceleCases\",A.\"districtId\" from public.\"lymphedemaLineLists\"  A\n                where lower(A.\"diseaseType\") like '%hydrocele%' and A.\"isActive\" =true\n                ").concat(endYear, " ").concat(month, " ").concat(districtId, "\n                group by A.\"districtId\"\n            )L2 ON D.\"id\"=L2.\"districtId\"\n\t\t\tLEFT OUTER JOIN \n            (select sum(A.\"hydroceleCases\"/A.month) AS \"NoOfHydroceleCases\", A.\"districtId\" from public.\"districtYearWiseCasesLHHF\" A\n                where 1=1 \n                ").concat(endYear, " ").concat(districtId, "\n                group by A.\"districtId\"\n            )L21 ON D.\"id\"=L21.\"districtId\"\n            LEFT OUTER JOIN \n            (select count(LH.id) AS \"NoOfHydroceleSurgery\",A.\"districtId\" from public.\"lymphedemaLineLists\" A\n                inner join public.\"lymphedemaLineListFollowUpsHFs\" LH ON A.id=LH.\"lymphedemaLineListId\" \n                where lower(A.\"diseaseType\") like '%hydrocele%' and A.\"isActive\" = true \n                and LH.\"isActive\" =true and LH.\"isSurgeryDone\"=true \n                ").concat(endYear, " ").concat(month, " ").concat(districtId, "\n                group by A.\"districtId\"\n            )L3 ON D.\"id\"=L3.\"districtId\"\n            LEFT OUTER JOIN \n            (select sum(A.\"hydroceleSurgeries\"/A.month) AS \"NoOfHydroceleSurgery\", A.\"districtId\" from public.\"districtYearWiseCasesLHHF\" A\n                where 1=1 \n                ").concat(endYear, " ").concat(districtId, "\n                group by A.\"districtId\"\n            )L31 ON D.\"id\"=L31.\"districtId\"\n            LEFT OUTER JOIN \n            (select count(MP.id) AS \"NoMFPosetive\",A.\"districtId\" from public.\"mfPositiveLineListPatients\" MP\n                inner join public.\"mfPositiveLineLists\" A ON A.id=MP.\"mfPositiveLineListId\"\n                where MP.\"isActive\" =true and A.\"isActive\" =true\n                ").concat(endYear, " ").concat(month, " ").concat(districtId, "\n                group by A.\"districtId\"\n            )M1 ON D.\"id\"=M1.\"districtId\"\n            )B")).then(function (_ref3) {
                            var _ref4 = (0, _slicedToArray2["default"])(_ref3, 2),
                                results = _ref4[0],
                                metadata = _ref4[1];

                            return results;
                          });
                          previosYear = _sequelize["default"].sequelize.query("\n            select \tsum(B.\"NoOfLFCases\") \"NoOfLFCases\", sum(B.\"NoOfHydroceleCases\") \"NoOfHydroceleCases\", \n\t        sum (B.\"NoOfHydroceleSurgery\") \"NoOfHydroceleSurgery\", sum (B.\"NoMFPosetive\") \"NoMFPosetive\"\n            From\n            (select (D.\"id\") AS \"districtId\",D.\"districtName\",D.\"mapId\" AS \"mapDistrictId\",\n\n            COALESCE(L1.\"NoOfLFCases\",0) + COALESCE(L11.\"NoOfLFCases\",0) As \"NoOfLFCases\",\n            COALESCE(L2.\"NoOfHydroceleCases\",0)  + COALESCE(L21.\"NoOfHydroceleCases\",0) As \"NoOfHydroceleCases\",\n            COALESCE(L3.\"NoOfHydroceleSurgery\",0) + COALESCE(L31.\"NoOfHydroceleSurgery\",0) As \"NoOfHydroceleSurgery\",\n            COALESCE(M1.\"NoMFPosetive\",0) As \"NoMFPosetive\"\n\n            from public.districts D  \n            LEFT OUTER JOIN \n            (select count(A.id) AS \"NoOfLFCases\", A.\"districtId\" from public.\"lymphedemaLineLists\" A\n                where lower(A.\"diseaseType\") like '%lymphedema%' and A.\"isActive\" =true\n                ".concat(prevYear, " ").concat(month, " ").concat(districtId, "\n                group by A.\"districtId\"\n            )L1 ON D.\"id\"=L1.\"districtId\"\n            LEFT OUTER JOIN \n            (select sum(A.\"lfCases\"/A.month) AS \"NoOfLFCases\", A.\"districtId\" from public.\"districtYearWiseCasesLHHF\" A\n                where 1=1 \n                ").concat(prevYear, "  ").concat(districtId, "\n                group by A.\"districtId\"\n            )L11 ON D.\"id\"=L11.\"districtId\"\n            LEFT OUTER JOIN \n            (select count(A.id) AS \"NoOfHydroceleCases\",A.\"districtId\" from public.\"lymphedemaLineLists\"  A\n                where lower(A.\"diseaseType\") like '%hydrocele%' and A.\"isActive\" =true\n                ").concat(prevYear, " ").concat(month, " ").concat(districtId, "\n                group by A.\"districtId\"\n            )L2 ON D.\"id\"=L2.\"districtId\"\n            LEFT OUTER JOIN \n            (select sum(A.\"hydroceleCases\"/A.month) AS \"NoOfHydroceleCases\", A.\"districtId\" from public.\"districtYearWiseCasesLHHF\" A\n                where 1=1 \n                ").concat(prevYear, " ").concat(districtId, "\n                group by A.\"districtId\"\n            )L21 ON D.\"id\"=L21.\"districtId\"\n            LEFT OUTER JOIN \n            (select count(LH.id) AS \"NoOfHydroceleSurgery\",A.\"districtId\" from public.\"lymphedemaLineLists\" A\n                inner join public.\"lymphedemaLineListFollowUpsHFs\" LH ON A.id=LH.\"lymphedemaLineListId\" \n                where lower(A.\"diseaseType\") like '%hydrocele%' and A.\"isActive\" = true \n                and LH.\"isActive\" =true and LH.\"isSurgeryDone\"=true \n                ").concat(prevYear, " ").concat(month, " ").concat(districtId, "\n                group by A.\"districtId\"\n            )L3 ON D.\"id\"=L3.\"districtId\"\n            LEFT OUTER JOIN \n            (select sum(A.\"hydroceleSurgeries\"/A.month) AS \"NoOfHydroceleSurgery\", A.\"districtId\" from public.\"districtYearWiseCasesLHHF\" A\n                where 1=1 \n                ").concat(prevYear, " ").concat(districtId, "\n                group by A.\"districtId\"\n            )L31 ON D.\"id\"=L31.\"districtId\"\n            LEFT OUTER JOIN \n            (select count(MP.id) AS \"NoMFPosetive\",A.\"districtId\" from public.\"mfPositiveLineListPatients\" MP\n                inner join public.\"mfPositiveLineLists\" A ON A.id=MP.\"mfPositiveLineListId\"\n                where MP.\"isActive\" =true and A.\"isActive\" =true\n                ").concat(prevYear, " ").concat(month, " ").concat(districtId, "\n                group by A.\"districtId\"\n            )M1 ON D.\"id\"=M1.\"districtId\"\n            )B")).then(function (_ref5) {
                            var _ref6 = (0, _slicedToArray2["default"])(_ref5, 2),
                                results = _ref6[0],
                                metadata = _ref6[1];

                            return results;
                          });
                          cumulative = _sequelize["default"].sequelize.query("\n            select \tsum(B.\"NoOfLFCases\") \"NoOfLFCases\", sum(B.\"NoOfHydroceleCases\") \"NoOfHydroceleCases\", \n\t        sum (B.\"NoOfHydroceleSurgery\") \"NoOfHydroceleSurgery\", sum (B.\"NoMFPosetive\") \"NoMFPosetive\"\n            From\n            (select (D.\"id\") AS \"districtId\",D.\"districtName\",D.\"mapId\" AS \"mapDistrictId\",\n\n            COALESCE(L1.\"NoOfLFCases\",0) + COALESCE(L11.\"NoOfLFCases\",0) As \"NoOfLFCases\",\n            COALESCE(L2.\"NoOfHydroceleCases\",0)  + COALESCE(L21.\"NoOfHydroceleCases\",0) As \"NoOfHydroceleCases\",\n            COALESCE(L3.\"NoOfHydroceleSurgery\",0) + COALESCE(L31.\"NoOfHydroceleSurgery\",0) As \"NoOfHydroceleSurgery\",\n            COALESCE(M1.\"NoMFPosetive\",0) As \"NoMFPosetive\"\n            \n            from public.districts D  \n            LEFT OUTER JOIN \n            (select count(A.id) AS \"NoOfLFCases\", A.\"districtId\" from public.\"lymphedemaLineLists\" A\n                where lower(A.\"diseaseType\") like '%lymphedema%' and A.\"isActive\" =true\n                ".concat(year, " ").concat(districtId, "\n                group by A.\"districtId\"\n            )L1 ON D.\"id\"=L1.\"districtId\"\n            LEFT OUTER JOIN \n            (select sum(A.\"lfCases\") AS \"NoOfLFCases\", A.\"districtId\" from public.\"districtYearWiseCasesLHHF\" A\n                where 1=1 \n                ").concat(year, " ").concat(districtId, "\n                group by A.\"districtId\"\n            )L11 ON D.\"id\"=L11.\"districtId\"\n            LEFT OUTER JOIN \n            (select count(A.id) AS \"NoOfHydroceleCases\",A.\"districtId\" from public.\"lymphedemaLineLists\"  A\n                where lower(A.\"diseaseType\") like '%hydrocele%' and A.\"isActive\" =true\n                ").concat(year, " ").concat(districtId, "\n                group by A.\"districtId\"\n            )L2 ON D.\"id\"=L2.\"districtId\"\n            LEFT OUTER JOIN \n            (select sum(A.\"hydroceleCases\") AS \"NoOfHydroceleCases\", A.\"districtId\" from public.\"districtYearWiseCasesLHHF\" A\n                where 1=1 \n                ").concat(year, " ").concat(districtId, "\n                group by A.\"districtId\"\n            )L21 ON D.\"id\"=L21.\"districtId\"\n            LEFT OUTER JOIN \n            (select count(LH.id) AS \"NoOfHydroceleSurgery\",A.\"districtId\" from public.\"lymphedemaLineLists\" A\n                inner join public.\"lymphedemaLineListFollowUpsHFs\" LH ON A.id=LH.\"lymphedemaLineListId\" \n                where lower(A.\"diseaseType\") like '%hydrocele%' and A.\"isActive\" = true \n                and LH.\"isActive\" =true and LH.\"isSurgeryDone\"=true \n                ").concat(year, " ").concat(districtId, "\n                group by A.\"districtId\"\n            )L3 ON D.\"id\"=L3.\"districtId\"\n            LEFT OUTER JOIN \n            (select sum(A.\"hydroceleSurgeries\") AS \"NoOfHydroceleSurgery\", A.\"districtId\" from public.\"districtYearWiseCasesLHHF\" A\n                where 1=1 \n                ").concat(year, " ").concat(districtId, "\n                group by A.\"districtId\"\n            )L31 ON D.\"id\"=L31.\"districtId\"\n            LEFT OUTER JOIN \n            (select count(MP.id) AS \"NoMFPosetive\",A.\"districtId\" from public.\"mfPositiveLineListPatients\" MP\n                inner join public.\"mfPositiveLineLists\" A ON A.id=MP.\"mfPositiveLineListId\"\n                where MP.\"isActive\" =true and A.\"isActive\" =true\n                ").concat(year, " ").concat(districtId, "\n                group by A.\"districtId\"\n            )M1 ON D.\"id\"=M1.\"districtId\"\n            )B    \n            ")).then(function (_ref7) {
                            var _ref8 = (0, _slicedToArray2["default"])(_ref7, 2),
                                results = _ref8[0],
                                metadata = _ref8[1];

                            return results;
                          });
                          Promise.all([selectYear, previosYear, cumulative]).then(function (data) {
                            response.error = false;
                            var obj = {};
                            obj.selectYear = data[0];
                            obj.previosYear = data[1];
                            obj.cumulative = data[2];
                            response.data = obj;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 10:
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

            case 4:
              _context2.prev = 4;
              _context2.t0 = _context2["catch"](0);
              console.log("error", error);

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 4]]);
    }));

    return function GetEndemicityTotalAllDistrictsDao(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var get_DashboardTodayEntryDao = /*#__PURE__*/function () {
    var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req) {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(resolve) {
                  var response;
                  return _regenerator["default"].wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          response = {}; // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;

                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select B.\"TodayLF\",B.\"TodayHF\",B.\"TodayMF\", B.\"TodayEntry\",\n            (case when (B.\"TodayEntry\">B.\"YesterdayEntry\") then \n            +B.\"percentThanYesterday\" else -B.\"percentThanYesterday\" End) as \"percentThanYesterday\"\n            from\n            (\n                select A.\"TodayLF\",A.\"TodayHF\",A.\"TodayMF\", A.\"TodayEntry\", A.\"YesterdayEntry\",\n                (A.\"TodayEntry\"/(CASE A.\"YesterdayEntry\"\n                    WHEN 0 Then 1 ELSE A.\"YesterdayEntry\" END))*100 AS \"percentThanYesterday\"\n                FROM\n                (\n                    select A1.id as id, A1.\"TodayLF\",A2.\"YesterdayLF\",A3.\"TodayHF\",\n                      A4.\"YesterdayHF\",A5.\"TodayMF\",A6.\"YesterdayMF\",\n                      (A1.\"TodayLF\" + A3.\"TodayHF\" + A5.\"TodayMF\") AS \"TodayEntry\",\n                      (A2.\"YesterdayLF\" + A4.\"YesterdayHF\" + A6.\"YesterdayMF\") AS \"YesterdayEntry\"\n                    From\n                    (\n                        select 1 as id, count(id) AS \"TodayLF\" from public.\"lymphedemaLineLists\" \n                        where lower(\"diseaseType\") like '%lymphedema%' and \"isActive\"=true and DATE(\"createdAt\")= CURRENT_DATE\n                    )A1\n                    left join\n                    (\n                        select 1 as id, count(id) AS \"YesterdayLF\" from public.\"lymphedemaLineLists\" \n                        where lower(\"diseaseType\") like '%lymphedema%' and \"isActive\"=true and DATE(\"createdAt\")= (CURRENT_DATE-1)\n                    )A2\n                    ON A1.id=A2.id\n                    left join\n                    (\n                        select 1 as id, count(id) AS \"TodayHF\" from public.\"lymphedemaLineLists\" \n                        where lower(\"diseaseType\") like '%hydrocele%' and \"isActive\"=true and DATE(\"createdAt\")= CURRENT_DATE\n                    )A3\n                    ON A1.id=A3.id\n                    left join\n                    (\n                        select 1 as id, count(id) AS \"YesterdayHF\" from public.\"lymphedemaLineLists\" \n                        where lower(\"diseaseType\") like '%hydrocele%' and \"isActive\"=true and DATE(\"createdAt\")= (CURRENT_DATE-1)\n                    )A4\n                    ON A1.id=A4.id\n                    left join\n                    (\n                        select 1 as id, count(id) AS \"TodayMF\" from public.\"mfPositiveLineListPatients\"\n                        where  \"isActive\"=true and DATE(\"createdAt\")= CURRENT_DATE\n                    )A5\n                    ON A1.id=A5.id\n                    left join\n                    (\n                        select 1 as id, count(id) AS \"YesterdayMF\" from public.\"mfPositiveLineListPatients\"\n                        where\"isActive\"=true and DATE(\"createdAt\")= (CURRENT_DATE-1)\n                    )A6\n                    ON A1.id=A6.id\n                ) A\n            )B            \n\t").then(function (_ref11) {
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

                        case 2:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }));

                return function (_x4) {
                  return _ref10.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function get_DashboardTodayEntryDao(_x3) {
      return _ref9.apply(this, arguments);
    };
  }();

  var DashboardBSCollectedTodayDao = /*#__PURE__*/function () {
    var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req) {
      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              return _context6.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(resolve) {
                  var response;
                  return _regenerator["default"].wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          response = {}; // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;

                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select  C.\"bsCollectedToday\",\n            (case when (C.\"bsCollectedToday\">C.\"bsCollectedYesterday\") then \n            +C.\"percentThanYesterday\" else -C.\"percentThanYesterday\" End) as \"percentThanYesterday\"\n            from\n            (\n                select A1.id,A1.\"bsCollectedToday\" ,A2.\"bsCollectedYesterday\",\n                (A1.\"bsCollectedToday\"/(CASE A2.\"bsCollectedYesterday\"\n                    WHEN 0 Then 1 ELSE A2.\"bsCollectedYesterday\" END))*100 AS \"percentThanYesterday\"\n                From\n                (\n                    select 1 as id, count(id) \"bsCollectedToday\"  from public.\"vMFPositiveLineListSurveysById\" where  DATE(\"dateNPC\")= CURRENT_DATE\n                )A1\n                left join\n                (\n                    select 1 as id, count(id) \"bsCollectedYesterday\" from public.\"vMFPositiveLineListSurveysById\" where  DATE(\"dateNPC\")= (CURRENT_DATE-1)\n                )A2\n                ON A1.id=A2.id\n            )C          \n\t").then(function (_ref15) {
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

                        case 2:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5);
                }));

                return function (_x6) {
                  return _ref14.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function DashboardBSCollectedTodayDao(_x5) {
      return _ref13.apply(this, arguments);
    };
  }();

  var DashboardLFThisMonthDao = /*#__PURE__*/function () {
    var _ref17 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req) {
      return _regenerator["default"].wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(resolve) {
                  var response;
                  return _regenerator["default"].wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          response = {}; // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;

                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select  C.\"lfThisMonth\",\n            (case when (C.\"lfThisMonth\">C.\"lfLastMonth\") then \n            +C.\"percentThanLastmonth\" else -C.\"percentThanLastmonth\" End) as \"percentThanLastmonth\"\n            from\n            (\n                select A.id, A.\"lfThisMonth\",B.\"lfLastMonth\",  \n                (A.\"lfThisMonth\"/(CASE B.\"lfLastMonth\"\n                WHEN 0 Then 1 ELSE B.\"lfLastMonth\" END))*100 AS \"percentThanLastmonth\"\n                from\n                (\n                    select 1 as id,count(id) \"lfThisMonth\" from public.\"lymphedemaLineLists\" where \"isActive\"=true and \n                    \"month\"=date_part('month', CURRENT_DATE)\n                )A\n                left join\n                (\n                    select 1 as id,count(id) \"lfLastMonth\" from public.\"lymphedemaLineLists\" where \"isActive\"=true and \n                    \"month\"=(case when date_part('month', CURRENT_DATE)=1 then 12 else date_part('month', CURRENT_DATE)-1 end)\n                )B on A.id=B.id\n            )C\n\t").then(function (_ref19) {
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

                        case 2:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  }, _callee7);
                }));

                return function (_x8) {
                  return _ref18.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function DashboardLFThisMonthDao(_x7) {
      return _ref17.apply(this, arguments);
    };
  }();

  var DashboardMFPositive12MonthsDao = /*#__PURE__*/function () {
    var _ref21 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req) {
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              return _context10.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref22 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(resolve) {
                  var response;
                  return _regenerator["default"].wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          response = {}; // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;

                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            SELECT M1.\"month\",TO_CHAR(TO_DATE (M1.\"month\"::text, 'MM'), 'Mon') AS \"monthName\", M1.\"year\",M2.\"noMFPositive\" \n            From \n            (\n                SELECT\n                EXTRACT('month' FROM d) AS \"month\",\n                EXTRACT('year' FROM d) AS \"year\"\n                FROM\n                GENERATE_SERIES(\n                    now(),\n                    now() - interval '11 months',\n                    interval '-1 month'\n                ) AS d\t\n            ) M1\n            left join\n            (\n                select \"year\",\"month\",count(MP.id) AS \"noMFPositive\" \n                from public.\"mfPositiveLineListPatients\" MP\n                inner join public.\"mfPositiveLineLists\" M \n                ON M.id=MP.id and MP.\"isActive\"=true\n                where M.\"isActive\"=true and M.\"year\"<=date_part('year', CURRENT_DATE)-1\n                group by \"year\",\"month\"\n            )M2\n            ON M1.\"month\"=M2.\"month\" and M1.\"year\"=M2.\"year\"\n\t").then(function (_ref23) {
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

                        case 2:
                        case "end":
                          return _context9.stop();
                      }
                    }
                  }, _callee9);
                }));

                return function (_x10) {
                  return _ref22.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));

    return function DashboardMFPositive12MonthsDao(_x9) {
      return _ref21.apply(this, arguments);
    };
  }();

  var DashboardLFCases12MonthsDao = /*#__PURE__*/function () {
    var _ref25 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req) {
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              return _context12.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref26 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(resolve) {
                  var response;
                  return _regenerator["default"].wrap(function _callee11$(_context11) {
                    while (1) {
                      switch (_context11.prev = _context11.next) {
                        case 0:
                          response = {}; // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;

                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n           SELECT M1.\"month\",TO_CHAR(TO_DATE (M1.\"month\"::text, 'MM'), 'Mon') AS \"monthName\", M1.\"year\",M2.\"noLFCases\" \n            From \n            (\n                SELECT\n                EXTRACT('month' FROM d) AS \"month\",\n                EXTRACT('year' FROM d) AS \"year\"\n                FROM\n                GENERATE_SERIES(\n                    now(),\n                    now() - interval '11 months',\n                    interval '-1 month'\n                ) AS d\t\n            ) M1\n            left join\n            (\n            select L.\"year\",L.\"month\",count(L.id) AS \"noLFCases\" from public.\"lymphedemaLineLists\" L\n                where L.\"isActive\"=true and L.\"year\"<=date_part('year', CURRENT_DATE)-1\n                group by \"year\",\"month\"\n            )M2\n            ON M1.\"month\"=M2.\"month\" and M1.\"year\"=M2.\"year\"\n\t").then(function (_ref27) {
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

                        case 2:
                        case "end":
                          return _context11.stop();
                      }
                    }
                  }, _callee11);
                }));

                return function (_x12) {
                  return _ref26.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }));

    return function DashboardLFCases12MonthsDao(_x11) {
      return _ref25.apply(this, arguments);
    };
  }();

  var DashboardMONotVerifiedDao = /*#__PURE__*/function () {
    var _ref29 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req) {
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              return _context14.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref30 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(resolve) {
                  var response;
                  return _regenerator["default"].wrap(function _callee13$(_context13) {
                    while (1) {
                      switch (_context13.prev = _context13.next) {
                        case 0:
                          response = {}; // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;

                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select COALESCE(L1.\"noNotVerified\",0) AS \"noNotVerified\", D.id,D.\"districtName\" \n            from districts D\n            left join\n            (\n                select count(L.id) \"noNotVerified\", L.\"districtId\" from public.\"lymphedemaLineLists\" L\n                left join public.\"lymphedemaLineListSurveys\" LS\n                ON LS.\"lymphedemaLineListId\"=L.id\n                where LS.\"isVerified\"= false and  L.\"isActive\"=true\n                and (\"year\" =date_part('year', CURRENT_DATE) \n                    OR \"year\" = date_part('year',date_trunc('year', now()) - interval '1 year'))\n                and (\"month\" = date_part('month', CURRENT_DATE) \n                    OR \"month\"=date_part('month',date_trunc('month', now()) - interval '1 month'))\n                group by L.\"districtId\"\n             )L1\n            ON D.id=L1.\"districtId\"\n            order by L1.\"noNotVerified\" asc             \n            \n            \n\t").then(function (_ref31) {
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

                        case 2:
                        case "end":
                          return _context13.stop();
                      }
                    }
                  }, _callee13);
                }));

                return function (_x14) {
                  return _ref30.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    }));

    return function DashboardMONotVerifiedDao(_x13) {
      return _ref29.apply(this, arguments);
    };
  }();

  var DashboardFSUTargetsDao = /*#__PURE__*/function () {
    var _ref33 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req) {
      return _regenerator["default"].wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              return _context16.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref34 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(resolve) {
                  var response;
                  return _regenerator["default"].wrap(function _callee15$(_context15) {
                    while (1) {
                      switch (_context15.prev = _context15.next) {
                        case 0:
                          response = {}; // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;

                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            select F.\"nameOfFilariaSurveyUnit\" AS \"nameOfUnitId\",VC.\"nameOfControlUnit\" AS \"nameOfUnit\",\n            sum(F.\"noOfVillagesOrTowns\") AS \"noOfVillagesOrTowns\",sum(FS.\"targetedPopulation\") AS \"targetedPopulation\",\n            sum(FS.\"surveyedPopulation\") \"surveyedPopulation\",\n            sum(FS.\"noOfBSCollected\") \"noOfBSCollected\", sum(FS.\"noOfBSExamined\") \"noOfBSExamined\",\n            sum(FS.\"noOfMFPositiveCases\") \"noOfMFPositiveCases\"\n            from public.\"fsuTargetAchivements\" F\n            left join public.\"fsuTargetAchievementsSurveys\" FS ON FS.\"fsuTargetAchievementId\"=F.id\n            left join public.districts D on D.id =  F.\"districtId\"\n            left join public.facilities F1 on F1.id = F.\"facilityId\"\n            left join public.\"verticalControlUnits\" VC on VC.id = F.\"nameOfFilariaSurveyUnit\"\n            where F.\"isActive\"=true\n                and (F.\"year\" =date_part('year', CURRENT_DATE) \n                    OR F.\"year\" = date_part('year',date_trunc('year', now()) - interval '1 year'))\n                and (F.\"month\" = date_part('month', CURRENT_DATE) \n                    OR F.\"month\"=date_part('month',date_trunc('month', now()) - interval '1 month'))\n            group by F.year,F.month,F.\"nameOfFilariaSurveyUnit\",VC.\"nameOfControlUnit\"            \n            \n\t").then(function (_ref35) {
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

                        case 2:
                        case "end":
                          return _context15.stop();
                      }
                    }
                  }, _callee15);
                }));

                return function (_x16) {
                  return _ref34.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    }));

    return function DashboardFSUTargetsDao(_x15) {
      return _ref33.apply(this, arguments);
    };
  }();

  var DashboardMFRatesDao = /*#__PURE__*/function () {
    var _ref37 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(req) {
      return _regenerator["default"].wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              return _context18.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref38 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(resolve) {
                  var response;
                  return _regenerator["default"].wrap(function _callee17$(_context17) {
                    while (1) {
                      switch (_context17.prev = _context17.next) {
                        case 0:
                          response = {}; // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;

                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            SELECT M1.\"month\",\n            TO_CHAR(TO_DATE (M1.\"month\"::text, 'MM'), 'Mon') AS \"monthName\", \n            M1.\"year\",coalesce(M2.\"mfRate\",0) as \"mfRate\"\n            From \n            (\n                SELECT\n                EXTRACT('month' FROM d) AS \"month\",\n                EXTRACT('year' FROM d) AS \"year\"\n                FROM\n                GENERATE_SERIES(\n                    now(),\n                    now() - interval '6 months',\n                    interval '-1 month'\n                ) AS d\t\n            ) M1\n            left join\n            (\n                select sum(\"noOfPersonsNPMF\") AS \"noOfPersonsNPMF\",M.\"year\",M.\"month\",\n                sum(\"noOfPersonsNBSE\") AS \"noOfPersonsNBSE\" ,\n                (sum(\"noOfPersonsNPMF\")  /\n                    CASE sum(\"noOfPersonsNBSE\")\n                        WHEN 0 THEN 1\n                        ELSE sum(\"noOfPersonsNBSE\")\n                    END * 100)::integer AS \"mfRate\"\n                from public.\"vMFPositiveLineListSurveysById\" MF\n                left join public.\"mfPositiveLineLists\" M \n                ON M.\"id\"=MF.\"id\"\n                where M.\"isActive\"=true and M.\"year\"<=date_part('year', CURRENT_DATE)-1\n                group by M.\"year\",M.\"month\"\n            )M2\n            ON M1.\"month\"=M2.\"month\" and M1.\"year\"=M2.\"year\"\n\t").then(function (_ref39) {
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

                        case 2:
                        case "end":
                          return _context17.stop();
                      }
                    }
                  }, _callee17);
                }));

                return function (_x18) {
                  return _ref38.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    }));

    return function DashboardMFRatesDao(_x17) {
      return _ref37.apply(this, arguments);
    };
  }();

  var DashboardDrugConsumptionDao = /*#__PURE__*/function () {
    var _ref41 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20(req) {
      return _regenerator["default"].wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              return _context20.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref42 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(resolve) {
                  var response;
                  return _regenerator["default"].wrap(function _callee19$(_context19) {
                    while (1) {
                      switch (_context19.prev = _context19.next) {
                        case 0:
                          response = {}; // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;

                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("\n            SELECT M1.\"month\",\n            TO_CHAR(TO_DATE (M1.\"month\"::text, 'MM'), 'Mon') AS \"monthName\", \n            M1.\"year\",\n            coalesce(M2.\"noOfDECTabletsConsumed\" /\n                    CASE M2.\"noOfDECTabletsGiven\"\n                        WHEN 0 THEN 1\n                        ELSE M2.\"noOfDECTabletsGiven\"\n                    END * 100,0) AS \"percentDrugConsumption\"\n            From \n            (\n                SELECT\n                EXTRACT('month' FROM d) AS \"month\",\n                EXTRACT('year' FROM d) AS \"year\"\n                FROM\n                GENERATE_SERIES(\n                    now(),\n                    now() - interval '5 months',\n                    interval '-1 month'\n                ) AS d\t\n            ) M1\n            left join\n            (\n                select sum(\"noOfDECTabletsConsumed\") as \"noOfDECTabletsConsumed\",\n                sum(\"noOfDECTabletsRecovered\") as \"noOfDECTabletsRecovered\",M.\"year\",M.\"month\",\n                sum(\"noOfDECTabletsConsumed\"+\"noOfDECTabletsRecovered\") \"noOfDECTabletsGiven\"  \n                from  public.\"postMDAEvalListPersons\" MP\n                left join public.\"postMDAEvalLists\" M\n                ON M.id=MP.\"postMDAEvalListId\"\n                where M.\"isActive\"=true and M.\"year\"<=date_part('year', CURRENT_DATE)-1\n                group by M.\"year\",M.\"month\"\n            ) M2\n            ON M1.\"month\"=M2.\"month\" and M1.\"year\"=M2.\"year\"\n\t").then(function (_ref43) {
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

                        case 2:
                        case "end":
                          return _context19.stop();
                      }
                    }
                  }, _callee19);
                }));

                return function (_x20) {
                  return _ref42.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20);
    }));

    return function DashboardDrugConsumptionDao(_x19) {
      return _ref41.apply(this, arguments);
    };
  }();

  var GetMFRateTimeTrendDao = /*#__PURE__*/function () {
    var _ref45 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22(req) {
      return _regenerator["default"].wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              return _context22.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref46 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21(resolve) {
                  var response, startYear, endYear, year, districtId;
                  return _regenerator["default"].wrap(function _callee21$(_context21) {
                    while (1) {
                      switch (_context21.prev = _context21.next) {
                        case 0:
                          response = {};
                          startYear = '';
                          endYear = '';
                          year = '';
                          districtId = '';

                          if (req.body.startYear.length > 0 && req.body.endYear.length > 0) {
                            year = "and m.\"year\" BETWEEN ".concat(req.body.startYear, " and  ").concat(req.body.endYear);
                            startYear = req.body.startYear;
                            endYear = req.body.endYear;
                          }

                          if (req.body.districtId.length > 0 && req.body.districtId != '0') {
                            districtId = "and m.\"districtId\" = ".concat(req.body.districtId);
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("            \n            select A.year,COALESCE(B.\"mfRate\",COALESCE(T.\"mfRate\",0)) as \"mfRate\" \n            from (select generate_series(".concat(startYear, ",").concat(endYear, ") as year) A\n            LEFT JOIN\n            (SELECT m.year,\n                COALESCE((CAST(sum(vm.\"noOfPersonsNPMF\") AS float)  \n                    / (case when sum(vm.\"noOfPersonsNBSE\") = 0 \n                    then null else sum(vm.\"noOfPersonsNBSE\") end) * 100.00),0):: DECIMAL(10,2) AS \"mfRate\"\n            FROM \"vMFPositiveLineListSurveysById\" vm\n            LEFT JOIN \"mfPositiveLineLists\" m ON m.id = vm.id\n            WHERE m.\"isActive\" = true \n            ").concat(year, " ").concat(districtId, "\n            group by m.year) B\n            ON A.year=B.year\n            LEFT JOIN public.\"mfRateTemp\" T\n            ON A.year=T.year\n\t        ")).then(function (_ref47) {
                            var _ref48 = (0, _slicedToArray2["default"])(_ref47, 2),
                                results = _ref48[0],
                                metadata = _ref48[1];

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
                          return _context21.stop();
                      }
                    }
                  }, _callee21);
                }));

                return function (_x22) {
                  return _ref46.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22);
    }));

    return function GetMFRateTimeTrendDao(_x21) {
      return _ref45.apply(this, arguments);
    };
  }();

  var GetMFRateTimeTrendListDao = /*#__PURE__*/function () {
    var _ref49 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24(req) {
      return _regenerator["default"].wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              return _context24.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref50 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23(resolve) {
                  var response, year, districtId, year1;
                  return _regenerator["default"].wrap(function _callee23$(_context23) {
                    while (1) {
                      switch (_context23.prev = _context23.next) {
                        case 0:
                          response = {};
                          year = '';
                          districtId = '';
                          year1 = '';

                          if (req.body.year.length > 0) {
                            year = "and m.\"year\" = ".concat(req.body.year);
                            year1 = req.body.year;
                          }

                          if (req.body.districtId.length > 0 && req.body.districtId != '0') {
                            districtId = "and m.\"districtId\" = ".concat(req.body.districtId);
                          } // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;


                          // const page = req.page ? req.page : 1;
                          // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                          // const offset = (page - 1) * itemsPerPage;
                          _sequelize["default"].sequelize.query("            \n            select A.year,B.month,B.\"districtId\",B.\"facilityId\",B.\"villageId\",B.\"nameOfUnitId\",\n            D.\"districtName\",F.\"facilityName\", V.\"villageName\",VC.\"nameOfControlUnit\",\n             COALESCE(B.\"noOfPersonsMFPositive\",0) \"noOfPersonsMFPositive\",\n             COALESCE(B.\"noOfPersonsExamined\",0) \"noOfPersonsExamined\",\n             COALESCE(B.\"mfRate\",0) \"mfRate\"\n            from (select generate_series(".concat(year1, ",").concat(year1, ") as year) A\n            LEFT JOIN\n            (SELECT m.year,m.month,m.\"districtId\",m.\"facilityId\",m.\"villageId\",m.\"nameOfUnit\" \"nameOfUnitId\",\n             vm.\"noOfPersonsNPMF\" \"noOfPersonsMFPositive\",vm.\"noOfPersonsNBSE\" \"noOfPersonsExamined\",\n                COALESCE((CAST((vm.\"noOfPersonsNPMF\") AS float)  \n                    / (case when (vm.\"noOfPersonsNBSE\") = 0 \n                    then null else (vm.\"noOfPersonsNBSE\") end) * 100.00),0):: DECIMAL(10,2) AS \"mfRate\"\n            FROM \"vMFPositiveLineListSurveysById\" vm\n            LEFT JOIN \"mfPositiveLineLists\" m ON m.id = vm.id\n            WHERE m.\"isActive\" = true \n            ").concat(year, " ").concat(districtId, "\n            ) B ON A.year=B.year\n            left join public.districts D on D.id = B.\"districtId\" \n            left join public.facilities F on F.id=B.\"facilityId\"\n            left join public.villages V on V.id = B.\"villageId\"\n            left join public.\"verticalControlUnits\" VC on VC.id = B.\"villageId\"                       \n\t        ")).then(function (_ref51) {
                            var _ref52 = (0, _slicedToArray2["default"])(_ref51, 2),
                                results = _ref52[0],
                                metadata = _ref52[1];

                            response.error = false;
                            response.data = results; // console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 7:
                        case "end":
                          return _context23.stop();
                      }
                    }
                  }, _callee23);
                }));

                return function (_x24) {
                  return _ref50.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context24.stop();
          }
        }
      }, _callee24);
    }));

    return function GetMFRateTimeTrendListDao(_x23) {
      return _ref49.apply(this, arguments);
    };
  }();

  var GetLymphedemaCasesDistrictsDao = /*#__PURE__*/function () {
    var _ref53 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26(req) {
      return _regenerator["default"].wrap(function _callee26$(_context26) {
        while (1) {
          switch (_context26.prev = _context26.next) {
            case 0:
              return _context26.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref54 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25(resolve) {
                  var response, year, districtId, month;
                  return _regenerator["default"].wrap(function _callee25$(_context25) {
                    while (1) {
                      switch (_context25.prev = _context25.next) {
                        case 0:
                          response = {};
                          year = "and A.\"year\" = ".concat(req.body.year, " ");
                          districtId = req.body.districtId.length == 0 || req.body.districtId == 0 ? " " : "and A.\"districtId\" = ".concat(req.body.districtId);
                          month = "and A.\"month\" BETWEEN ".concat(req.body.startMonth, " and  ").concat(req.body.endMonth, " ");

                          _sequelize["default"].sequelize.query("            \n            select A.\"patientId\",A.\"nameOfPatient\",A.\"patientMobileNumber\",\n            A.year,A.month,A.\"ageYears\",G.\"categoryOptionName\" gender,\n            GR.\"categoryOptionName\" grading, A.\"districtId\",D.\"districtName\",\n            A.\"facilityId\",F.\"facilityName\", A.\"villageId\",V.\"villageName\"\n            from public.\"lymphedemaLineLists\" A\n            left join public.\"udCategoryOptions\" G on G.id = A.gender\n            left join public.\"udCategoryOptions\" GR on GR.id = A.grading\n            left join public.districts D on D.id = A.\"districtId\" \n            left join public.facilities F on F.id=A.\"facilityId\"\n            left join public.villages V on V.id = A.\"villageId\"\n            where lower(A.\"diseaseType\") like '%lymphedema%' and A.\"isActive\" =true\n            ".concat(year, " ").concat(month, " ").concat(districtId, "\n\t        ")).then(function (_ref55) {
                            var _ref56 = (0, _slicedToArray2["default"])(_ref55, 2),
                                results = _ref56[0],
                                metadata = _ref56[1];

                            response.error = false;
                            response.data = results; // console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 5:
                        case "end":
                          return _context25.stop();
                      }
                    }
                  }, _callee25);
                }));

                return function (_x26) {
                  return _ref54.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context26.stop();
          }
        }
      }, _callee26);
    }));

    return function GetLymphedemaCasesDistrictsDao(_x25) {
      return _ref53.apply(this, arguments);
    };
  }();

  var GetHydroceleCasesDistrictsDao = /*#__PURE__*/function () {
    var _ref57 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee28(req) {
      return _regenerator["default"].wrap(function _callee28$(_context28) {
        while (1) {
          switch (_context28.prev = _context28.next) {
            case 0:
              return _context28.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref58 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27(resolve) {
                  var response, year, districtId, month;
                  return _regenerator["default"].wrap(function _callee27$(_context27) {
                    while (1) {
                      switch (_context27.prev = _context27.next) {
                        case 0:
                          response = {};
                          year = "and A.\"year\" = ".concat(req.body.year, " ");
                          districtId = req.body.districtId.length == 0 || req.body.districtId == 0 ? " " : "and A.\"districtId\" = ".concat(req.body.districtId);
                          month = "and A.\"month\" BETWEEN ".concat(req.body.startMonth, " and  ").concat(req.body.endMonth, " ");

                          _sequelize["default"].sequelize.query("            \n            select A.\"patientId\",A.\"nameOfPatient\",A.\"patientMobileNumber\",\n            A.year,A.month,A.\"ageYears\",G.\"categoryOptionName\" gender,\n            GR.\"categoryOptionName\" grading, A.\"districtId\",D.\"districtName\",\n            A.\"facilityId\",F.\"facilityName\", A.\"villageId\",V.\"villageName\"\n            from public.\"lymphedemaLineLists\" A\n            left join public.\"udCategoryOptions\" G on G.id = A.gender\n            left join public.\"udCategoryOptions\" GR on GR.id = A.grading\n            left join public.districts D on D.id = A.\"districtId\" \n            left join public.facilities F on F.id=A.\"facilityId\"\n            left join public.villages V on V.id = A.\"villageId\"\n            where lower(A.\"diseaseType\") like '%hydrocele%' and A.\"isActive\" =true\n            ".concat(year, " ").concat(month, " ").concat(districtId, "\n\t        ")).then(function (_ref59) {
                            var _ref60 = (0, _slicedToArray2["default"])(_ref59, 2),
                                results = _ref60[0],
                                metadata = _ref60[1];

                            response.error = false;
                            response.data = results; // console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 5:
                        case "end":
                          return _context27.stop();
                      }
                    }
                  }, _callee27);
                }));

                return function (_x28) {
                  return _ref58.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context28.stop();
          }
        }
      }, _callee28);
    }));

    return function GetHydroceleCasesDistrictsDao(_x27) {
      return _ref57.apply(this, arguments);
    };
  }();

  var GetHydroceleSurgeriesDistrictsDao = /*#__PURE__*/function () {
    var _ref61 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee30(req) {
      return _regenerator["default"].wrap(function _callee30$(_context30) {
        while (1) {
          switch (_context30.prev = _context30.next) {
            case 0:
              return _context30.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref62 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee29(resolve) {
                  var response, year, districtId, month;
                  return _regenerator["default"].wrap(function _callee29$(_context29) {
                    while (1) {
                      switch (_context29.prev = _context29.next) {
                        case 0:
                          response = {};
                          year = "and A.\"year\" = ".concat(req.body.year, " ");
                          districtId = req.body.districtId.length == 0 || req.body.districtId == 0 ? " " : "and A.\"districtId\" = ".concat(req.body.districtId);
                          month = "and A.\"month\" BETWEEN ".concat(req.body.startMonth, " and  ").concat(req.body.endMonth, " ");

                          _sequelize["default"].sequelize.query("            \n            select A.\"patientId\",A.\"nameOfPatient\",A.\"patientMobileNumber\",\n            A.year,A.month,A.\"ageYears\",G.\"categoryOptionName\" gender,\n            GR.\"categoryOptionName\" grading, A.\"districtId\",D.\"districtName\",\n            A.\"facilityId\",F.\"facilityName\", A.\"villageId\",V.\"villageName\"\n            from public.\"lymphedemaLineLists\" A\n            inner join public.\"lymphedemaLineListFollowUpsHFs\" LH ON A.id=LH.\"lymphedemaLineListId\" \n            left join public.\"udCategoryOptions\" G on G.id = A.gender\n            left join public.\"udCategoryOptions\" GR on GR.id = A.grading\n            left join public.districts D on D.id = A.\"districtId\" \n            left join public.facilities F on F.id=A.\"facilityId\"\n            left join public.villages V on V.id = A.\"villageId\"\n            where lower(A.\"diseaseType\") like '%hydrocele%' and A.\"isActive\" = true \n            and LH.\"isActive\" =true and LH.\"isSurgeryDone\"=true \n            ".concat(year, " ").concat(month, " ").concat(districtId, "\n\t        ")).then(function (_ref63) {
                            var _ref64 = (0, _slicedToArray2["default"])(_ref63, 2),
                                results = _ref64[0],
                                metadata = _ref64[1];

                            response.error = false;
                            response.data = results; // console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 5:
                        case "end":
                          return _context29.stop();
                      }
                    }
                  }, _callee29);
                }));

                return function (_x30) {
                  return _ref62.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context30.stop();
          }
        }
      }, _callee30);
    }));

    return function GetHydroceleSurgeriesDistrictsDao(_x29) {
      return _ref61.apply(this, arguments);
    };
  }();

  var GetMFPositiveCasesDistrictsDao = /*#__PURE__*/function () {
    var _ref65 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee32(req) {
      return _regenerator["default"].wrap(function _callee32$(_context32) {
        while (1) {
          switch (_context32.prev = _context32.next) {
            case 0:
              return _context32.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref66 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee31(resolve) {
                  var response, year, districtId, month;
                  return _regenerator["default"].wrap(function _callee31$(_context31) {
                    while (1) {
                      switch (_context31.prev = _context31.next) {
                        case 0:
                          response = {};
                          year = "and A.\"year\" = ".concat(req.body.year, " ");
                          districtId = req.body.districtId.length == 0 || req.body.districtId == 0 ? " " : "and A.\"districtId\" = ".concat(req.body.districtId);
                          month = "and A.\"month\" BETWEEN ".concat(req.body.startMonth, " and  ").concat(req.body.endMonth, " ");

                          _sequelize["default"].sequelize.query("            \n            select MP.\"patientId\",MP.\"patientName\",MP.\"patientPhoneNo\",\n            A.year,A.month,MP.\"ageYears\",G.\"categoryOptionName\" gender,\n            MP.\"bsNumber\",MP.\"mfCount\", A.\"districtId\",D.\"districtName\",\n            A.\"facilityId\",F.\"facilityName\", A.\"villageId\",V.\"villageName\"\n            from public.\"mfPositiveLineListPatients\" MP\n            inner join public.\"mfPositiveLineLists\" A ON A.id=MP.\"mfPositiveLineListId\"\n            left join public.\"udCategoryOptions\" G on G.id = MP.gender\n            left join public.districts D on D.id = A.\"districtId\" \n            left join public.facilities F on F.id=A.\"facilityId\"\n            left join public.villages V on V.id = A.\"villageId\"\n            where MP.\"isActive\" =true and A.\"isActive\" =true\n            ".concat(year, " ").concat(month, " ").concat(districtId, "\n\t        ")).then(function (_ref67) {
                            var _ref68 = (0, _slicedToArray2["default"])(_ref67, 2),
                                results = _ref68[0],
                                metadata = _ref68[1];

                            response.error = false;
                            response.data = results; // console.log("results", results)
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 5:
                        case "end":
                          return _context31.stop();
                      }
                    }
                  }, _callee31);
                }));

                return function (_x32) {
                  return _ref66.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context32.stop();
          }
        }
      }, _callee32);
    }));

    return function GetMFPositiveCasesDistrictsDao(_x31) {
      return _ref65.apply(this, arguments);
    };
  }();

  var GetMDAIDACoverageAndConsumptionDao = /*#__PURE__*/function () {
    var _ref69 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee34(req) {
      return _regenerator["default"].wrap(function _callee34$(_context34) {
        while (1) {
          switch (_context34.prev = _context34.next) {
            case 0:
              return _context34.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref70 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee33(resolve) {
                  var response, startYear, endYear, year, districtId;
                  return _regenerator["default"].wrap(function _callee33$(_context33) {
                    while (1) {
                      switch (_context33.prev = _context33.next) {
                        case 0:
                          response = {};
                          startYear = '';
                          endYear = '';
                          year = '';
                          districtId = '';

                          if (req.body.startYear.length > 0 && req.body.endYear.length > 0) {
                            year = " and m.\"year\" BETWEEN ".concat(req.body.startYear, " and  ").concat(req.body.endYear);
                            startYear = req.body.startYear;
                            endYear = req.body.endYear;
                          }

                          if (req.body.districtId.length > 0 && req.body.districtId != '0') {
                            districtId = " and m.\"districtId\" = ".concat(req.body.districtId);

                            _sequelize["default"].sequelize.query("            \n                select  C0.\"talukaId\",\n                C0.\"talukaName\" \"name\",\n              \t(coalesce((Cast(C1. \"noOfDECTabletsConsumed\" as float) /\n                    case when C1.\"noOfDECTabletsGiven\"=0 then null else C1.\"noOfDECTabletsGiven\" end),0)*100.00)::DECIMAL(10,2) \"percentConsumption\",\n                (coalesce((Cast(C2. \"noOfPeopleAdministered\" as float) /\n                    case when C2.\"eligiblePopulation\"=0 then null else C2.\"eligiblePopulation\" end) ,0)*100.00)::DECIMAL(10,2) \"percentCoverage\"\n                 from\n                 (select id \"talukaId\",\"talukaName\" from public.talukas m where 1=1 ".concat(districtId, " ) C0\n                 left join\n                (select m.\"talukaId\", sum(coalesce(mp.\"noOfDECTabletsConsumed\",0)) \"noOfDECTabletsConsumed\" ,\n                sum(coalesce(mp.\"noOfDECTabletsRecovered\",0)) \"noOfDECTabletsRecovered\" ,\n                (sum(coalesce(mp.\"noOfDECTabletsConsumed\",0)) +  sum(coalesce(mp.\"noOfDECTabletsRecovered\",0))) \"noOfDECTabletsGiven\"\n                from public.\"postMDAEvalLists\" m\n                left join public.\"postMDAEvalListPersons\" mp on mp.\"postMDAEvalListId\"=m.id\n                ").concat(year, " ").concat(districtId, "\n                group by m.\"talukaId\")C1\n                on C0.\"talukaId\"=C1.\"talukaId\"\n                left join\n                (select m.\"talukaId\",sum(m.\"eligiblePopulation\") \"eligiblePopulation\",\n                sum(coalesce(mcr.\"noOfPeopleAdministered\",0)) \"noOfPeopleAdministeredR\",\n                sum(coalesce(mcm.\"noOfPeopleAdministered\",0)) \"noOfPeopleAdministeredM\",\n                (sum(coalesce(mcr.\"noOfPeopleAdministered\",0)) + sum(coalesce(mcm.\"noOfPeopleAdministered\",0))) \"noOfPeopleAdministered\"\n                from public.\"mdaIDACoverages\" m\n                left join public.\"mdaIDACoverageRegularLists\" mcr on m.id=mcr.\"mdaIDACoverageId\"\n                left join public.\"mdaIDACoverageMopUpLists\" mcm on m.id=mcm.\"mdaIDACoverageId\"\n                ").concat(year, " ").concat(districtId, "\n                group by m.\"talukaId\")C2 on C0.\"talukaId\"=c2.\"talukaId\"\n                ")).then(function (_ref71) {
                              var _ref72 = (0, _slicedToArray2["default"])(_ref71, 2),
                                  results = _ref72[0],
                                  metadata = _ref72[1];

                              response.error = false;
                              response.data = results; // console.log("results", results)
                            })["catch"](function (error) {
                              console.log(error);
                              response.error = true;
                            })["finally"](function () {
                              resolve(response);
                            });
                          } else {
                            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                            // const offset = (page - 1) * itemsPerPage;
                            _sequelize["default"].sequelize.query("            \n                select coalesce (C1.\"districtId\",C2.\"districtId\") \"districtId\",\n                D.\"districtName\" \"name\",\n\t\t\t\tC1. \"noOfDECTabletsConsumed\",C1.\"noOfDECTabletsGiven\",\n\t\t\t\tC2. \"noOfPeopleAdministered\",C2.\"eligiblePopulation\",\n                (coalesce((Cast(C1. \"noOfDECTabletsConsumed\" as float) /\n                    case when C1.\"noOfDECTabletsGiven\"=0 then null else C1.\"noOfDECTabletsGiven\" end),0)*100.00)::DECIMAL(10,2) \"percentConsumption\",\n                (coalesce((Cast(C2. \"noOfPeopleAdministered\" as float) /\n                    case when C2.\"eligiblePopulation\"=0 then null else C2.\"eligiblePopulation\" end) ,0)*100.00)::DECIMAL(10,2) \"percentCoverage\"\n                from\n                (select m.\"districtId\", sum(coalesce(mp.\"noOfDECTabletsConsumed\",0)) \"noOfDECTabletsConsumed\" ,\n                sum(coalesce(mp.\"noOfDECTabletsRecovered\",0)) \"noOfDECTabletsRecovered\" ,\n                (sum(coalesce(mp.\"noOfDECTabletsConsumed\",0)) +  sum(coalesce(mp.\"noOfDECTabletsRecovered\",0))) \"noOfDECTabletsGiven\"\n                from public.\"postMDAEvalLists\" m\n                left join public.\"postMDAEvalListPersons\" mp on mp.\"postMDAEvalListId\"=m.id\n                ".concat(year, "\n                group by m.\"districtId\")C1\n                full outer join\n                (select m.\"districtId\",sum(m.\"eligiblePopulation\") \"eligiblePopulation\",\n                sum(coalesce(mcr.\"noOfPeopleAdministered\",0)) \"noOfPeopleAdministeredR\",\n                sum(coalesce(mcm.\"noOfPeopleAdministered\",0)) \"noOfPeopleAdministeredM\",\n                (sum(coalesce(mcr.\"noOfPeopleAdministered\",0)) + sum(coalesce(mcm.\"noOfPeopleAdministered\",0))) \"noOfPeopleAdministered\"\n                from public.\"mdaIDACoverages\" m\n                left join public.\"mdaIDACoverageRegularLists\" mcr on m.id=mcr.\"mdaIDACoverageId\"\n                left join public.\"mdaIDACoverageMopUpLists\" mcm on m.id=mcm.\"mdaIDACoverageId\"\n                ").concat(year, "\n                group by m.\"districtId\")C2 on c1.\"districtId\"=c2.\"districtId\"\n                left join districts D ON D.id = coalesce (C1.\"districtId\",C2.\"districtId\")\n                ")).then(function (_ref73) {
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
                          }

                        case 7:
                        case "end":
                          return _context33.stop();
                      }
                    }
                  }, _callee33);
                }));

                return function (_x34) {
                  return _ref70.apply(this, arguments);
                };
              }()));

            case 1:
            case "end":
              return _context34.stop();
          }
        }
      }, _callee34);
    }));

    return function GetMDAIDACoverageAndConsumptionDao(_x33) {
      return _ref69.apply(this, arguments);
    };
  }();

  var GetMdaTasActivityStatusDao = /*#__PURE__*/function () {
    var _ref75 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee36(req) {
      return _regenerator["default"].wrap(function _callee36$(_context36) {
        while (1) {
          switch (_context36.prev = _context36.next) {
            case 0:
              return _context36.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref76 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee35(resolve) {
                  var response, year;
                  return _regenerator["default"].wrap(function _callee35$(_context35) {
                    while (1) {
                      switch (_context35.prev = _context35.next) {
                        case 0:
                          response = {};
                          year = "and (\"tas1Year\"<= ".concat(req.body.year, " or \"tas2Year\"<= ").concat(req.body.year, " or \"tas3Year\"<= ").concat(req.body.year, ") ");

                          _sequelize["default"].sequelize.query("            \n            SELECT * FROM public.\"mdaTASActivityStatus\"\n            where 1=1  ".concat(year, "\n\t        ")).then(function (_ref77) {
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

                        case 3:
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

    return function GetMdaTasActivityStatusDao(_x35) {
      return _ref75.apply(this, arguments);
    };
  }();

  var GetMMDPGraphDao = /*#__PURE__*/function () {
    var _ref79 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee38(req) {
      return _regenerator["default"].wrap(function _callee38$(_context38) {
        while (1) {
          switch (_context38.prev = _context38.next) {
            case 0:
              return _context38.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref80 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee37(resolve) {
                  var response, startYear, endYear, year, districtId;
                  return _regenerator["default"].wrap(function _callee37$(_context37) {
                    while (1) {
                      switch (_context37.prev = _context37.next) {
                        case 0:
                          response = {};
                          startYear = '';
                          endYear = '';
                          year = '';
                          districtId = '';

                          if (req.body.startYear.length > 0 && req.body.endYear.length > 0) {
                            year = "and l.\"year\" BETWEEN ".concat(req.body.startYear, " and  ").concat(req.body.endYear);
                            startYear = req.body.startYear;
                            endYear = req.body.endYear;
                          }

                          if (req.body.districtId.length > 0 && req.body.districtId != '0') {
                            districtId = "and l.\"districtId\" = ".concat(req.body.districtId);

                            _sequelize["default"].sequelize.query("            \n                select A0.\"talukaId\",A0.\"talukaName\" \"name\",\n                Coalesce(A1.\"totalCases\",0) \"totalCases\", \n                Coalesce(A2.\"mmdpTrained\",0) \"mmdpTrained\", \n                Coalesce(A3.\"mmdpKitGiven\",0) \"mmdpKitGiven\",\n                Coalesce((CAST(A2.\"mmdpTrained\" AS float) / \n                    (case when A1.\"totalCases\"=0 then null else A1.\"totalCases\" end) * 100.00),0)\n                    :: DECIMAL(10,2) as \"mmdpTrainedPercent\",\n                Coalesce((CAST(A3.\"mmdpKitGiven\" AS float) / \n                    (case when A1.\"totalCases\"=0 then null else A1.\"totalCases\" end) * 100.00),0)\n                    :: DECIMAL(10,2) as \"mmdpKitGivenPercent\"\n                from \n\t\t\t\t(select id \"talukaId\",\"talukaName\" from public.talukas l where 1=1  ".concat(districtId, " )A0\n\t\t\t\tleft join\n\t\t\t\t(select l.\"talukaId\", count(id) \"totalCases\" \n                from public.\"vMMDPReporting\" l where l.\"diseaseType\" like '%Lymphedema%' \n                ").concat(year, "  ").concat(districtId, " \n                group by l.\"talukaId\") A1\n\t\t\t\tON A0.\"talukaId\"=A1.\"talukaId\"\n                left join\n                (select l.\"talukaId\", count(l.id) \"mmdpTrained\" \n                from public.\"vMMDPReporting\" l \n                inner join lateral\n                (select * from public.\"lymphedemaLineListFollowUpsLves\"  where \"lymphedemaLineListId\"= l.id \n                 and Coalesce(\"isServiceMMDPTrainingGiven\",false)=true and \"isActive\"=true limit 1 )lf on true\n                where l.\"diseaseType\" like '%Lymphedema%' \n                ").concat(year, "  ").concat(districtId, "\n                group by l.\"talukaId\")A2\n                ON A0.\"talukaId\"=A2.\"talukaId\"\n                left join\n                (select l.\"talukaId\", count(l.id) \"mmdpKitGiven\" \n                from public.\"vMMDPReporting\" l \n                inner join lateral\n                (select * from public.\"lymphedemaLineListFollowUpsLves\"  where \"lymphedemaLineListId\"= l.id \n                 and Coalesce(\"isServiceMMDPKitGiven\",false)=true and \"isActive\"=true limit 1 )lf on true\n                where l.\"diseaseType\" like '%Lymphedema%' \n                ").concat(year, "   ").concat(districtId, "\n                group by l.\"talukaId\")A3\n                ON A0.\"talukaId\"=A3.\"talukaId\"             \n                ")).then(function (_ref81) {
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
                          } else {
                            // const itemsPerPage = req.itemsPerPage ? reqObj.itemsPerPage : 10;
                            // const offset = (page - 1) * itemsPerPage;
                            _sequelize["default"].sequelize.query("            \n                select A0.\"districtId\",A0.\"districtName\" \"name\",\n                Coalesce(A1.\"totalCases\",0) \"totalCases\",\n                Coalesce(A2.\"mmdpTrained\",0) \"mmdpTrained\",\n                Coalesce(A3.\"mmdpKitGiven\",0) \"mmdpKitGiven\",\n                Coalesce((CAST(A2.\"mmdpTrained\" AS float) /\n                    (case when A1.\"totalCases\"=0 then null else A1.\"totalCases\" end) * 100.00),0)\n                    :: DECIMAL(10,2) as \"mmdpTrainedPercent\",\n                Coalesce((CAST(A3.\"mmdpKitGiven\" AS float) /\n                    (case when A1.\"totalCases\"=0 then null else A1.\"totalCases\" end) * 100.00),0)\n                    :: DECIMAL(10,2) as \"mmdpKitGivenPercent\"\n                from \n                (select id \"districtId\",\"districtName\" from  public.districts) A0\n                left join\n                (select l.\"districtId\", count(id) \"totalCases\"\n                from public.\"vMMDPReporting\" l where l.\"diseaseType\" like '%Lymphedema%' \n                ".concat(year, "\n                group by l.\"districtId\") A1\n                ON A0.\"districtId\"=A1.\"districtId\"\n                left join\n                (select l.\"districtId\", count(l.id) \"mmdpTrained\"\n                from public.\"vMMDPReporting\" l\n                inner join lateral\n                (select * from public.\"lymphedemaLineListFollowUpsLves\"  where \"lymphedemaLineListId\"= l.id\n                and Coalesce(\"isServiceMMDPTrainingGiven\",false)=true and \"isActive\"=true limit 1 )lf on true\n                where l.\"diseaseType\" like '%Lymphedema%' \n                ").concat(year, "\n                group by l.\"districtId\")A2\n                ON A0.\"districtId\"=A2.\"districtId\"\n                left join\n                (select l.\"districtId\", count(l.id) \"mmdpKitGiven\"\n                from public.\"vMMDPReporting\" l\n                inner join lateral\n                (select * from public.\"lymphedemaLineListFollowUpsLves\"  where \"lymphedemaLineListId\"= l.id\n                and Coalesce(\"isServiceMMDPKitGiven\",false)=true and \"isActive\"=true limit 1 )lf on true\n                where l.\"diseaseType\" like '%Lymphedema%' \n                ").concat(year, "\n                group by l.\"districtId\")A3\n                ON A0.\"districtId\"=A3.\"districtId\"\n                ")).then(function (_ref83) {
                              var _ref84 = (0, _slicedToArray2["default"])(_ref83, 2),
                                  results = _ref84[0],
                                  metadata = _ref84[1];

                              response.error = false;
                              response.data = results; // console.log("results", results)
                            })["catch"](function (error) {
                              console.log(error);
                              response.error = true;
                            })["finally"](function () {
                              resolve(response);
                            });
                          }

                        case 7:
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

    return function GetMMDPGraphDao(_x37) {
      return _ref79.apply(this, arguments);
    };
  }();

  var GetFilariaUnitPerformanceDao = /*#__PURE__*/function () {
    var _ref85 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee40(req) {
      return _regenerator["default"].wrap(function _callee40$(_context40) {
        while (1) {
          switch (_context40.prev = _context40.next) {
            case 0:
              _context40.prev = 0;
              return _context40.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref86 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee39(resolve) {
                  var response, year, months, todaysDate, currentYear, fsu, fcu, nc;
                  return _regenerator["default"].wrap(function _callee39$(_context39) {
                    while (1) {
                      switch (_context39.prev = _context39.next) {
                        case 0:
                          response = {}; // console.log("req body",req.body)

                          // console.log("req body",req.body)
                          year = '';
                          months = 12;
                          todaysDate = new Date();
                          currentYear = todaysDate.getFullYear();

                          if (!req.body.year.length == 0) {
                            year = "and year=  ".concat(req.body.year);

                            if (req.body.year == currentYear) {
                              months = todaysDate.getMonth + 1;
                            }
                          }

                          fsu = _sequelize["default"].sequelize.query("\n            select A1.\"nameOfUnitId\",A1.\"nameOfUnit\", \n            (3000 * ".concat(months, ") \"noOfPersonsTarget\", \n            coalesce(A2. \"noOfPersonsAchieved\",0)  \"noOfPersonsAchieved\",\n            coalesce((CAST(A2. \"noOfPersonsAchieved\" as float)/\n                      (3000 * ").concat(months, " )*100),0) :: DECIMAL(10,2) as \"percentOfPersonsAchieved\",\n            coalesce(A3. \"noOfCasesMF\",0)  \"noOfCasesMF\",\n            coalesce(A4. \"noOfCasesDisease\",0)  \"noOfCasesDisease\",\n            (coalesce(A3. \"noOfCasesMF\",0)+coalesce(A4. \"noOfCasesDisease\",0))  \"noOfCasesTotal\",\n            coalesce(A5. \"noOfCasesMFTreated\",0)  \"noOfCasesMFTreated\",\n            coalesce(A6.\"noOfCasesDiseaseTreated\",0)  \"noOfCasesDiseaseTreated\",\n            (coalesce(A5. \"noOfCasesMFTreated\",0) + coalesce(A6.\"noOfCasesDiseaseTreated\",0))  \"noOfCasesTreatedTotal\"\n            from \n            (select id \"nameOfUnitId\",\"nameOfControlUnit\" \"nameOfUnit\"\n                 from  public.\"verticalControlUnits\" where \"unitType\"='FSU')A1\n            left join\n            (select m.\"nameOfUnit\" \"nameOfUnitId\", sum(ms.\"noOfPersonsNBSE\") \"noOfPersonsAchieved\"  \n            from public.\"mfPositiveLineLists\" m\n            left join public.\"vMFPositiveLineListSurveysById\" ms on ms.id=m.id\n            where m.\"isActive\"=true  ").concat(year, "\n            group by m.\"nameOfUnit\" ) A2\n            on A1.\"nameOfUnitId\"=A2.\"nameOfUnitId\"\n            left join\n            (select \"nameOfUnit\" \"nameOfUnitId\", count(mp.\"id\") \"noOfCasesMF\"  \n            from public.\"mfPositiveLineLists\" m\n            left join public.\"mfPositiveLineListPatients\" mp on mp.\"mfPositiveLineListId\"=m.id\n            where m.\"isActive\"=true and mp.\"isActive\"=true ").concat(year, "\n            group by m.\"nameOfUnit\" ) A3\n            on A1.\"nameOfUnitId\"=A3.\"nameOfUnitId\"\n            left join\n            (select \"nameOfUnit\" \"nameOfUnitId\", count(m.\"id\") \"noOfCasesDisease\"  \n            from public.\"lymphedemaLineLists\" m\n            where m.\"isActive\"=true and  m.\"diseaseType\" like '%Lymphedema%' ").concat(year, "\n            group by m.\"nameOfUnit\" ) A4\n            on A1.\"nameOfUnitId\"=A4.\"nameOfUnitId\"\n            left join\n            (select \"nameOfUnit\" \"nameOfUnitId\", count(mp.\"id\") \"noOfCasesMFTreated\"  \n            from public.\"mfPositiveLineLists\" m\n            left join public.\"mfPositiveLineListPatients\" mp on mp.\"mfPositiveLineListId\"=m.id\n            where m.\"isActive\"=true and mp.\"isActive\"=true and \"isTreatmentGive\"=true ").concat(year, "\n            group by m.\"nameOfUnit\" ) A5\n            on A1.\"nameOfUnitId\"=A5.\"nameOfUnitId\"\n            left join\n            (select \"nameOfUnit\" \"nameOfUnitId\", count(m.\"id\") \"noOfCasesDiseaseTreated\"  \n            from public.\"lymphedemaLineLists\" m\n            inner join lateral\n             (select * from public.\"lymphedemaLineListFollowUpsLves\" ml\n              where ml.\"lymphedemaLineListId\"= m.id and ml.\"isActive\"=true limit 1 )lf on true \n            where m.\"isActive\"=true and  m.\"diseaseType\" like '%Lymphedema%' ").concat(year, "\n            group by m.\"nameOfUnit\" ) A6\n            on A1.\"nameOfUnitId\"=A6.\"nameOfUnitId\";\n                ")).then(function (_ref87) {
                            var _ref88 = (0, _slicedToArray2["default"])(_ref87, 2),
                                results = _ref88[0],
                                metadata = _ref88[1];

                            return results;
                          });
                          fcu = _sequelize["default"].sequelize.query("\n            select A1.\"nameOfUnitId\",A1.\"nameOfUnit\", \n            (coalesce(A7.\"monthTarget\",600)* ".concat(months, ") \"noOfPersonsTarget\", \n            coalesce(A2. \"noOfPersonsAchieved\",0)  \"noOfPersonsAchieved\",\n            coalesce((CAST(A2. \"noOfPersonsAchieved\" as float)/\n                      (coalesce(A7.\"monthTarget\",600)* ").concat(months, ")*100),0) :: DECIMAL(10,2) as \"percentOfPersonsAchieved\",\n            coalesce(A3. \"noOfCasesMF\",0)  \"noOfCasesMF\",\n            coalesce(A4. \"noOfCasesDisease\",0)  \"noOfCasesDisease\",\n            (coalesce(A3. \"noOfCasesMF\",0)+coalesce(A4. \"noOfCasesDisease\",0))  \"noOfCasesTotal\",\n            coalesce(A5. \"noOfCasesMFTreated\",0)  \"noOfCasesMFTreated\",\n            coalesce(A6.\"noOfCasesDiseaseTreated\",0)  \"noOfCasesDiseaseTreated\",\n            (coalesce(A5. \"noOfCasesMFTreated\",0) + coalesce(A6.\"noOfCasesDiseaseTreated\",0))  \"noOfCasesTreatedTotal\"\n            from \n            (select id \"nameOfUnitId\",\"nameOfControlUnit\" \"nameOfUnit\"\n                 from  public.\"verticalControlUnits\" where \"unitType\" in ('FCU', 'MC', 'RCTC'))A1\n            left join\n            (select m.\"nameOfUnit\" \"nameOfUnitId\", sum(ms.\"noOfPersonsNBSE\") \"noOfPersonsAchieved\"  \n            from public.\"mfPositiveLineLists\" m\n            left join public.\"vMFPositiveLineListSurveysById\" ms on ms.id=m.id\n            where m.\"isActive\"=true  ").concat(year, "\n            group by m.\"nameOfUnit\" ) A2\n            on A1.\"nameOfUnitId\"=A2.\"nameOfUnitId\"\n            left join\n            (select \"nameOfUnit\" \"nameOfUnitId\", count(mp.\"id\") \"noOfCasesMF\"  \n            from public.\"mfPositiveLineLists\" m\n            left join public.\"mfPositiveLineListPatients\" mp on mp.\"mfPositiveLineListId\"=m.id\n            where m.\"isActive\"=true and mp.\"isActive\"=true ").concat(year, "\n            group by m.\"nameOfUnit\" ) A3\n            on A1.\"nameOfUnitId\"=A3.\"nameOfUnitId\"\n            left join\n            (select \"nameOfUnit\" \"nameOfUnitId\", count(m.\"id\") \"noOfCasesDisease\"  \n            from public.\"lymphedemaLineLists\" m\n            where m.\"isActive\"=true and  m.\"diseaseType\" like '%Lymphedema%' ").concat(year, "\n            group by m.\"nameOfUnit\" ) A4\n            on A1.\"nameOfUnitId\"=A4.\"nameOfUnitId\"\n            left join\n            (select \"nameOfUnit\" \"nameOfUnitId\", count(mp.\"id\") \"noOfCasesMFTreated\"  \n            from public.\"mfPositiveLineLists\" m\n            left join public.\"mfPositiveLineListPatients\" mp on mp.\"mfPositiveLineListId\"=m.id\n            where m.\"isActive\"=true and mp.\"isActive\"=true and \"isTreatmentGive\"=true ").concat(year, "\n            group by m.\"nameOfUnit\" ) A5\n            on A1.\"nameOfUnitId\"=A5.\"nameOfUnitId\"\n            left join\n            (select \"nameOfUnit\" \"nameOfUnitId\", count(m.\"id\") \"noOfCasesDiseaseTreated\"  \n            from public.\"lymphedemaLineLists\" m\n            inner join lateral\n             (select * from public.\"lymphedemaLineListFollowUpsLves\" ml\n              where ml.\"lymphedemaLineListId\"= m.id and ml.\"isActive\"=true limit 1 )lf on true \n            where m.\"isActive\"=true and  m.\"diseaseType\" like '%Lymphedema%' ").concat(year, "\n            group by m.\"nameOfUnit\" ) A6\n            on A1.\"nameOfUnitId\"=A6.\"nameOfUnitId\"\n            left join \n            (select \"verticalControlUnitId\" \"nameOfUnitId\",\n            SUM(CASE WHEN  \"fieldUnitType\" ='NC' THEN 1500 ELSE 600 END) as \"monthTarget\"\t\t\n            from public.\"verticalControlFieldUnits\" \n            group by \"verticalControlUnitId\") A7\t\t   \n            on A1.\"nameOfUnitId\"=A7.\"nameOfUnitId\";\n                ")).then(function (_ref89) {
                            var _ref90 = (0, _slicedToArray2["default"])(_ref89, 2),
                                results = _ref90[0],
                                metadata = _ref90[1];

                            return results;
                          });
                          nc = _sequelize["default"].sequelize.query("\n            select A1.\"nameOfUnitId\",A1.\"nameOfUnit\", \n            (1500 * ".concat(months, " ) \"noOfPersonsTarget\", \n            coalesce(A2. \"noOfPersonsAchieved\",0)  \"noOfPersonsAchieved\",\n            coalesce((CAST(A2. \"noOfPersonsAchieved\" as float)/\n                      (1500* ").concat(months, " )*100),0) :: DECIMAL(10,2) as \"percentOfPersonsAchieved\",\n            coalesce(A3. \"noOfCasesMF\",0)  \"noOfCasesMF\",\n            coalesce(A4. \"noOfCasesDisease\",0)  \"noOfCasesDisease\",\n            (coalesce(A3. \"noOfCasesMF\",0)+coalesce(A4. \"noOfCasesDisease\",0))  \"noOfCasesTotal\",\n            coalesce(A5. \"noOfCasesMFTreated\",0)  \"noOfCasesMFTreated\",\n            coalesce(A6.\"noOfCasesDiseaseTreated\",0)  \"noOfCasesDiseaseTreated\",\n            (coalesce(A5. \"noOfCasesMFTreated\",0) + coalesce(A6.\"noOfCasesDiseaseTreated\",0))  \"noOfCasesTreatedTotal\"\n            from \n            (select id \"nameOfUnitId\",\"fieldUnitName\" \"nameOfUnit\"\n                 from  public.\"verticalControlFieldUnits\" where \"fieldUnitType\" like 'NC')A1\n            left join\n            (select m.\"nameOfFilariaFieldUnit\" \"nameOfUnitId\", sum(ms.\"noOfPersonsNBSE\") \"noOfPersonsAchieved\"  \n            from public.\"mfPositiveLineLists\" m\n            left join public.\"vMFPositiveLineListSurveysById\" ms on ms.id=m.id\n            where m.\"isActive\"=true  ").concat(year, "\n            group by m.\"nameOfFilariaFieldUnit\" ) A2\n            on A1.\"nameOfUnitId\"=A2.\"nameOfUnitId\"\n            left join\n            (select \"nameOfFilariaFieldUnit\" \"nameOfUnitId\", count(mp.\"id\") \"noOfCasesMF\"  \n            from public.\"mfPositiveLineLists\" m\n            left join public.\"mfPositiveLineListPatients\" mp on mp.\"mfPositiveLineListId\"=m.id\n            where m.\"isActive\"=true and mp.\"isActive\"=true ").concat(year, "\n            group by m.\"nameOfFilariaFieldUnit\" ) A3\n            on A1.\"nameOfUnitId\"=A3.\"nameOfUnitId\"\n            left join\n            (select \"nameOfFiledUnit\" \"nameOfUnitId\", count(m.\"id\") \"noOfCasesDisease\"  \n            from public.\"lymphedemaLineLists\" m\n            where m.\"isActive\"=true and  m.\"diseaseType\" like '%Lymphedema%' ").concat(year, "\n            group by m.\"nameOfFiledUnit\" ) A4\n            on A1.\"nameOfUnitId\"=A4.\"nameOfUnitId\"\n            left join\n            (select \"nameOfFilariaFieldUnit\" \"nameOfUnitId\", count(mp.\"id\") \"noOfCasesMFTreated\"  \n            from public.\"mfPositiveLineLists\" m\n            left join public.\"mfPositiveLineListPatients\" mp on mp.\"mfPositiveLineListId\"=m.id\n            where m.\"isActive\"=true and mp.\"isActive\"=true and \"isTreatmentGive\"=true ").concat(year, "\n            group by m.\"nameOfFilariaFieldUnit\" ) A5\n            on A1.\"nameOfUnitId\"=A5.\"nameOfUnitId\"\n            left join\n            (select \"nameOfFiledUnit\" \"nameOfUnitId\", count(m.\"id\") \"noOfCasesDiseaseTreated\"  \n            from public.\"lymphedemaLineLists\" m\n            inner join lateral\n             (select * from public.\"lymphedemaLineListFollowUpsLves\" ml\n              where ml.\"lymphedemaLineListId\"= m.id and ml.\"isActive\"=true limit 1 )lf on true \n            where m.\"isActive\"=true and  m.\"diseaseType\" like '%Lymphedema%' ").concat(year, "\n            group by m.\"nameOfFiledUnit\" ) A6\n            on A1.\"nameOfUnitId\"=A6.\"nameOfUnitId\"\n                ")).then(function (_ref91) {
                            var _ref92 = (0, _slicedToArray2["default"])(_ref91, 2),
                                results = _ref92[0],
                                metadata = _ref92[1];

                            return results;
                          });
                          Promise.all([fsu, fcu, nc]).then(function (data) {
                            response.error = false;
                            var obj = {};
                            obj.fsu = data[0];
                            obj.fcu = data[1];
                            obj.nc = data[2];
                            response.data = obj;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 10:
                        case "end":
                          return _context39.stop();
                      }
                    }
                  }, _callee39);
                }));

                return function (_x40) {
                  return _ref86.apply(this, arguments);
                };
              }()));

            case 4:
              _context40.prev = 4;
              _context40.t0 = _context40["catch"](0);
              console.log("error", error);

            case 7:
            case "end":
              return _context40.stop();
          }
        }
      }, _callee40, null, [[0, 4]]);
    }));

    return function GetFilariaUnitPerformanceDao(_x39) {
      return _ref85.apply(this, arguments);
    };
  }();

  var GetAlertsForUserDao = /*#__PURE__*/function () {
    var _ref93 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee42(req) {
      return _regenerator["default"].wrap(function _callee42$(_context42) {
        while (1) {
          switch (_context42.prev = _context42.next) {
            case 0:
              _context42.prev = 0;
              return _context42.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref94 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee41(resolve) {
                  var response, userId, newAlerts, allAlerts;
                  return _regenerator["default"].wrap(function _callee41$(_context41) {
                    while (1) {
                      switch (_context41.prev = _context41.next) {
                        case 0:
                          response = {};
                          console.log("req body", req.body.userId);
                          userId = '';

                          if (!req.body.userId.length == 0) {
                            userId = "and \"userId\" =  ".concat(req.body.userId);
                          } else {
                            userId = "and \"userId\" = 0 ";
                          }

                          newAlerts = _sequelize["default"].sequelize.query("\n                select count (id) \"newAlerts\" from alerts where \"createdAt\">= (now()::date - '8 days'::interval)\n                ".concat(userId, " \n                ")).then(function (_ref95) {
                            var _ref96 = (0, _slicedToArray2["default"])(_ref95, 2),
                                results = _ref96[0],
                                metadata = _ref96[1];

                            return results;
                          });
                          allAlerts = _sequelize["default"].sequelize.query("\n                select * from alerts where 1=1  ".concat(userId, " \n                order by id desc\n                ")).then(function (_ref97) {
                            var _ref98 = (0, _slicedToArray2["default"])(_ref97, 2),
                                results = _ref98[0],
                                metadata = _ref98[1];

                            return results;
                          });
                          Promise.all([newAlerts, allAlerts]).then(function (data) {
                            response.error = false;
                            var obj = {};
                            obj.newAlerts = data[0];
                            obj.allAlerts = data[1];
                            response.data = obj;
                          })["catch"](function (error) {
                            console.log(error);
                            response.error = true;
                          })["finally"](function () {
                            resolve(response);
                          });

                        case 7:
                        case "end":
                          return _context41.stop();
                      }
                    }
                  }, _callee41);
                }));

                return function (_x42) {
                  return _ref94.apply(this, arguments);
                };
              }()));

            case 4:
              _context42.prev = 4;
              _context42.t0 = _context42["catch"](0);
              console.log("error", error);

            case 7:
            case "end":
              return _context42.stop();
          }
        }
      }, _callee42, null, [[0, 4]]);
    }));

    return function GetAlertsForUserDao(_x41) {
      return _ref93.apply(this, arguments);
    };
  }();

  return {
    GetEndemicityTotalAllDistrictsDao: GetEndemicityTotalAllDistrictsDao,
    get_DashboardTodayEntryDao: get_DashboardTodayEntryDao,
    DashboardBSCollectedTodayDao: DashboardBSCollectedTodayDao,
    DashboardLFThisMonthDao: DashboardLFThisMonthDao,
    DashboardMFPositive12MonthsDao: DashboardMFPositive12MonthsDao,
    DashboardLFCases12MonthsDao: DashboardLFCases12MonthsDao,
    DashboardMONotVerifiedDao: DashboardMONotVerifiedDao,
    DashboardFSUTargetsDao: DashboardFSUTargetsDao,
    DashboardMFRatesDao: DashboardMFRatesDao,
    DashboardDrugConsumptionDao: DashboardDrugConsumptionDao,
    GetMFRateTimeTrendDao: GetMFRateTimeTrendDao,
    GetMFRateTimeTrendListDao: GetMFRateTimeTrendListDao,
    GetLymphedemaCasesDistrictsDao: GetLymphedemaCasesDistrictsDao,
    GetHydroceleCasesDistrictsDao: GetHydroceleCasesDistrictsDao,
    GetHydroceleSurgeriesDistrictsDao: GetHydroceleSurgeriesDistrictsDao,
    GetMFPositiveCasesDistrictsDao: GetMFPositiveCasesDistrictsDao,
    GetMDAIDACoverageAndConsumptionDao: GetMDAIDACoverageAndConsumptionDao,
    GetMdaTasActivityStatusDao: GetMdaTasActivityStatusDao,
    GetMMDPGraphDao: GetMMDPGraphDao,
    GetFilariaUnitPerformanceDao: GetFilariaUnitPerformanceDao,
    GetAlertsForUserDao: GetAlertsForUserDao
  };
};

var _default = dashboardDao();

exports["default"] = _default;
//# sourceMappingURL=dashboardDao.js.map
