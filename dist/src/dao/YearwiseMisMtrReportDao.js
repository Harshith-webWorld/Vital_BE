"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = _interopRequireDefault(require("../../config/sequelize"));

var _sequelize2 = _interopRequireDefault(require("sequelize"));

var _utils = _interopRequireDefault(require("../services/utils.service"));

var Op = _sequelize["default"].Sequelize.Op;
var sqDB = _sequelize["default"].Sequelize.sqDb;

var YearwiseMisMtrReportDao = function YearwiseMisMtrReportDao() {
  var getYearwiseMisMtrReportDao = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve) {
                  var response;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          response = {};

                          _sequelize["default"].sequelize.query("select year, \"noOfBSExamined\", \"noOfPersonsMFDetect\",\"noOfPersonsDiseaseDetect\",\"mfPercent\",\"disPercent\",\n      sum as \"hydrocelectomyOperations\"\n      from\n          (\n             SELECT \n            mf.year,\n            COALESCE(SUM(vms.\"noOfPersonsNBSE\"), 0) \"noOfBSExamined\",\n            COALESCE(SUM(vms.\"noOfPersonsNPMF\"), 0) \"noOfPersonsMFDetect\",\n            COALESCE(SUM(dis.\"noOfPersonsDisease\"), 0) \"noOfPersonsDiseaseDetect\",\n              COALESCE(((COALESCE(SUM(vms.\"noOfPersonsNPMF\"), 0) * 1.0 /\n              ((CASE\n                WHEN COALESCE(SUM(vms.\"noOfPersonsNBSE\"), 0) = 0 THEN NULL\n                ELSE SUM(vms.\"noOfPersonsNBSE\")\n              END)) * 100.00) ::DECIMAL(10, 2)), 0) AS \"mfPercent\",\n                COALESCE(((COALESCE(SUM(dis.\"noOfPersonsDisease\"), 0) * 1.0 /\n              ((CASE\n                WHEN COALESCE(SUM(vms.\"noOfPersonsNBSE\"), 0) = 0 THEN NULL\n                ELSE SUM(vms.\"noOfPersonsNBSE\")\n              END)) * 100.00) ::DECIMAL(10, 2)), 0) AS \"disPercent\"\n            From \n            public.\"mfPositiveLineLists\" mf\n            LEFT JOIN public.\"vMFPositiveLineListSurveysById\" vms\n            ON vms.id = mf.id\n            LEFT JOIN (SELECT\n              COUNT(id) \"noOfPersonsDisease\",\n              \"year\"\n            FROM public.\"lymphedemaLineLists\"\n            WHERE \"isActive\" = TRUE\n            GROUP BY year) dis\n            on dis.year = mf.year\n            Group by mf.year\n            ORDER BY mf.year ASC\n          ) q1\n          left outer join\n          (\n            Select a.year, sum(a.total) from (\n      select year,jan+feb+mar+apr+may+jun+jul+aug+sep+oct+nov+dec as total from public.\"hydrocelectomyOperations\"\n      ) a\n      group by a.year  \n          ) t using (year)\n      order by year", {// replacements: { year: year},
                            // type: Sequelize.QueryTypes.SELECT
                          }).then(function (_ref3) {
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

                        case 2:
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

    return function getYearwiseMisMtrReportDao(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var getFinancialYearwiseMisMtrReportDao = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req) {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(resolve) {
                  var response;
                  return _regenerator["default"].wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          response = {};

                          _sequelize["default"].sequelize.query("select financialyear as year, \"noOfBSExamined\", \"noOfPersonsMFDetect\",\"noOfPersonsDiseaseDetect\",\"mfPercent\",\"disPercent\",\n      hydrocelectomyOperations\n      from\n          (\n             SELECT (CASE WHEN t1.month  <=3 THEN \n        concat(year-1,'-',year)\n         ELSE concat(year,'-',year+1) end) AS financialyear,sum(t1.\"noOfBSExamined\") as \"noOfBSExamined\",\n         sum(t1.\"noOfPersonsMFDetect\") as \"noOfPersonsMFDetect\",\n         sum(t1.\"noOfPersonsDiseaseDetect\") as \"noOfPersonsDiseaseDetect\",\n         sum(t1.\"mfPercent\") as \"mfPercent\",\n         sum(t1.\"disPercent\") as \"disPercent\"\n      FROM (SELECT \n           mf.year,mf.month , \n            COALESCE(SUM(vms.\"noOfPersonsNBSE\"), 0) \"noOfBSExamined\",\n            COALESCE(SUM(vms.\"noOfPersonsNPMF\"), 0) \"noOfPersonsMFDetect\",\n            COALESCE(SUM(dis.\"noOfPersonsDisease\"), 0) \"noOfPersonsDiseaseDetect\",\n              COALESCE(((COALESCE(SUM(vms.\"noOfPersonsNPMF\"), 0) * 1.0 /\n              ((CASE\n                WHEN COALESCE(SUM(vms.\"noOfPersonsNBSE\"), 0) = 0 THEN NULL\n                ELSE SUM(vms.\"noOfPersonsNBSE\")\n              END)) * 100.00) ::DECIMAL(10, 2)), 0) AS \"mfPercent\",\n                COALESCE(((COALESCE(SUM(dis.\"noOfPersonsDisease\"), 0) * 1.0 /\n              ((CASE\n                WHEN COALESCE(SUM(vms.\"noOfPersonsNBSE\"), 0) = 0 THEN NULL\n                ELSE SUM(vms.\"noOfPersonsNBSE\")\n              END)) * 100.00) ::DECIMAL(10, 2)), 0) AS \"disPercent\"\n            From \n            public.\"mfPositiveLineLists\" mf\n            LEFT JOIN public.\"vMFPositiveLineListSurveysById\" vms\n            ON vms.id = mf.id\n            LEFT JOIN (SELECT\n              COUNT(id) \"noOfPersonsDisease\",\n              \"year\"\n            FROM public.\"lymphedemaLineLists\"\n            WHERE \"isActive\" = TRUE\n            GROUP BY year) dis\n            on dis.year = mf.year\n          Group by mf.year,mf.month\n            ORDER BY mf.year ASC\n            ) t1\n            group by financialyear  \n          ) q1\n          left outer join\n          (\n            select financialyear,sum(total) as hydrocelectomyOperations from\n      (select year,concat(year-1,'-',year)as financialyear,sum(quater1) as total from (\n          select year, jan+feb+mar as quater1 from public.\"hydrocelectomyOperations\" \n      ) a\n      group by a.year\n      UNION\n      select year,concat(year,'-',year+1)as financialyear,sum(quater2) as total from (\n          select year, apr+may+jun+jul+aug+sep+oct+nov+dec as quater2 from public.\"hydrocelectomyOperations\" \n      ) b\n      group by b.year\n      order by year) sub1\n      group by  sub1.financialyear\n      order by financialyear desc\n          ) t using (financialyear)\n      order by financialyear", {// replacements: { year: year},
                            // type: Sequelize.QueryTypes.SELECT
                          }).then(function (_ref7) {
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

                        case 2:
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

    return function getFinancialYearwiseMisMtrReportDao(_x3) {
      return _ref5.apply(this, arguments);
    };
  }();

  return {
    getYearwiseMisMtrReportDao: getYearwiseMisMtrReportDao,
    getFinancialYearwiseMisMtrReportDao: getFinancialYearwiseMisMtrReportDao
  };
};

var _default = YearwiseMisMtrReportDao();

exports["default"] = _default;
//# sourceMappingURL=YearwiseMisMtrReportDao.js.map
