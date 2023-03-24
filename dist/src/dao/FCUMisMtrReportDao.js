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

var FCUMisMtrReportDao = function FCUMisMtrReportDao() {
  var getFCUMisMtrReportDao = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve) {
                  var response, startYear, endYear, startMonth, endMonth, monthDiff, endMonthLastDate, startDate, endDate;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          response = {};
                          startYear = req.body.startYear;
                          endYear = req.body.endYear;
                          startMonth = req.body.startMonth;
                          endMonth = req.body.endMonth; // let year = `and mf."year" BETWEEN ${startYear} and ${endYear}`;
                          // let month = `and mf."month" BETWEEN ${startMonth} and  ${endMonth}`

                          // let year = `and mf."year" BETWEEN ${startYear} and ${endYear}`;
                          // let month = `and mf."month" BETWEEN ${startMonth} and  ${endMonth}`
                          monthDiff = _utils["default"].monthDiff(startYear, endYear, startMonth, endMonth);
                          endMonthLastDate = new Date(endYear, endMonth, 0).getDate();
                          startDate = "".concat(startYear, "-").concat(startMonth, "-01");
                          endDate = "".concat(endYear, "-").concat(endMonth, "-").concat(endMonthLastDate);

                          _sequelize["default"].sequelize.query("SELECT\n      v.\"nameOfControlUnit\",\n      v.\"unitType\",\n      v.\"districtId\",\n      d.\"districtName\",\n      fcuTargets.target AS fcuTarget,\n      COALESCE(SUM(vms.\"noOfPersonsNPS\"), 0) \"noOfPersonSurveyed\",\n      ".concat(monthDiff, " * COALESCE(fcuTargets.target, 0) AS \"target\",\n      COALESCE(SUM(vms.\"noOfPersonsNPMF\"), 0) \"noOfPersonsMFDetect\",\n      COALESCE(SUM(dis.\"noOfPersonsDisease\"), 0) \"noOfPersonsDiseaseDetect\",\n      (COALESCE(SUM(vms.\"noOfPersonsNPMF\"), 0) + COALESCE(SUM(dis.\"noOfPersonsDisease\"), 0)) \"noOfPersonsTotDetect\",\n      COALESCE(SUM(distreat.\"noOfPersonsDiseaseTreated\"), 0) \"noOfPersonsDiseaseTreated\",\n      COALESCE(SUM(mfTreat.\"noOfPersonsMFTreated\"), 0) \"noOfPersonsMFTreated\",\n      (COALESCE(SUM(mfTreat.\"noOfPersonsMFTreated\"), 0) + COALESCE(SUM(distreat.\"noOfPersonsDiseaseTreated\"), 0)) \"noOfPersonsTotTreated\",\n      (((COALESCE(SUM(vms.\"noOfPersonsNPS\"), 0) / (").concat(monthDiff, " * COALESCE(fcuTargets.target, 1) * 1.00)) * 100.00) ::DECIMAL(10, 2)) AS \"percentAchieved\",\n      COALESCE(SUM(vms.\"noOfPersonsNBSE\"), 0) \"noOfBSExamined\",\n      COALESCE(((COALESCE(SUM(vms.\"noOfPersonsNBSE\"), 0) * 1.0 /\n      ((CASE\n        WHEN COALESCE(SUM(vms.\"noOfPersonsNPS\"), 0) = 0 THEN NULL\n        ELSE SUM(vms.\"noOfPersonsNPS\")\n      END)) * 100.00) ::DECIMAL(10, 2)), 0.00) AS \"percentExamined\",\n      COALESCE(((COALESCE(SUM(vms.\"noOfPersonsNPMF\"), 0) * 1.0 /\n      ((CASE\n        WHEN COALESCE(SUM(vms.\"noOfPersonsNBSE\"), 0) = 0 THEN NULL\n        ELSE SUM(vms.\"noOfPersonsNBSE\")\n      END)) * 100.00) ::DECIMAL(10, 2)), 0.00) AS \"mfPercent\",\n      COALESCE(((COALESCE(SUM(dis.\"noOfPersonsDisease\"), 0) * 1.0 /\n      ((CASE\n        WHEN COALESCE(SUM(vms.\"noOfPersonsNBSE\"), 0) = 0 THEN NULL\n        ELSE SUM(vms.\"noOfPersonsNBSE\")\n      END)) * 100.00) ::DECIMAL(10, 2)), 0.00) AS \"disPercent\"\n    FROM public.\"verticalControlUnits\" v\n    LEFT JOIN public.\"districts\" d\n      ON v.\"districtId\" = d.id\n    LEFT JOIN public.\"mfPositiveLineLists\" mf\n      ON mf.\"nameOfUnit\" = v.id\n    LEFT JOIN public.\"vFCUTargets\" fcuTargets\n      ON v.id = fcuTargets.id\n    LEFT JOIN public.\"vMFPositiveLineListSurveysById\" vms\n      ON vms.id = mf.id\n    LEFT JOIN (SELECT\n      COUNT(id) \"noOfPersonsDisease\",\n      \"nameOfUnit\",\n      \"districtId\"\n    FROM public.\"lymphedemaLineLists\"\n    WHERE \"isActive\" = TRUE\n    GROUP BY \"nameOfUnit\",\n             \"districtId\") dis\n      ON dis.\"districtId\" = d.id\n      AND dis.\"nameOfUnit\" = v.id\n    LEFT JOIN (SELECT\n      COUNT(l1.id) \"noOfPersonsDiseaseTreated\",\n      \"nameOfUnit\",\n      \"districtId\"\n    FROM public.\"lymphedemaLineLists\" l1\n    JOIN public.\"lymphedemaLineListSurveys\" l2\n      ON l1.id = l2.\"lymphedemaLineListId\"\n    WHERE l1.\"isActive\" = TRUE\n    AND l2.\"isVerified\" = TRUE\n    AND l2.\"isActive\" = TRUE\n    GROUP BY \"nameOfUnit\",\n             \"districtId\") distreat\n      ON distreat.\"districtId\" = d.id\n      AND distreat.\"nameOfUnit\" = v.id\n    LEFT JOIN (SELECT\n      COUNT(m1.id) \"noOfPersonsMFTreated\",\n      \"nameOfUnit\",\n      \"districtId\"\n    FROM public.\"mfPositiveLineListPatients\" m1\n    JOIN public.\"mfPositiveLineLists\" m2\n      ON m2.id = m1.\"mfPositiveLineListId\"\n    WHERE m1.\"isActive\" = TRUE\n    AND m1.\"isTreatmentGive\" = TRUE\n    AND m2.\"isActive\" = TRUE\n    GROUP BY \"nameOfUnit\",\n             \"districtId\") mfTreat\n      ON mfTreat.\"districtId\" = d.id\n      AND mfTreat.\"nameOfUnit\" = v.id\n    WHERE v.\"unitType\" in ('FCU', 'MC', 'RCTC')\n    GROUP BY v.\"nameOfControlUnit\",\n             v.\"unitType\",\n             v.\"districtId\",\n             d.\"districtName\",\n             fcuTargets.target"), {// replacements: { year: year},
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

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function getFCUMisMtrReportDao(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var getFCUMisMtrReportDao2 = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req) {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return _context4.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(resolve) {
                  var response, startYear, endYear, startMonth, endMonth, monthDiff, endMonthLastDate, startDate, endDate;
                  return _regenerator["default"].wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          response = {};
                          startYear = req.body.startYear;
                          endYear = req.body.endYear;
                          startMonth = req.body.startMonth;
                          endMonth = req.body.endMonth; // let year = `and mf."year" BETWEEN ${startYear} and ${endYear}`;
                          // let month = `and mf."month" BETWEEN ${startMonth} and  ${endMonth}`

                          // let year = `and mf."year" BETWEEN ${startYear} and ${endYear}`;
                          // let month = `and mf."month" BETWEEN ${startMonth} and  ${endMonth}`
                          monthDiff = _utils["default"].monthDiff(startYear, endYear, startMonth, endMonth);
                          endMonthLastDate = new Date(endYear, endMonth, 0).getDate();
                          startDate = "".concat(startYear, "-").concat(startMonth, "-01");
                          endDate = "".concat(endYear, "-").concat(endMonth, "-").concat(endMonthLastDate);

                          _sequelize["default"].sequelize.query("SELECT\n        v.\"nameOfControlUnit\",\n        mf.\"districtId\",\n        d.\"districtName\",\n        v.id as vid,\n        fcuTargets.target AS fcuTarget,\n        COALESCE(SUM(vms.\"noOfPersonsNPS\"), 0) \"noOfPersonSurveyed\",\n        ".concat(monthDiff, " * COALESCE(fcuTargets.target, 0) AS \"target\",\n        COALESCE(SUM(NV.\"noVillages\"),0) \"noVillages\",\n        COALESCE(SUM(NT.\"noTowns\"),0) \"noTowns\",\n        COALESCE(SUM(vms.\"noOfPersonsNPMF\"), 0) \"noOfPersonsMFDetect\",\n        COALESCE(SUM(dis.\"noOfPersonsDisease\"), 0) \"noOfPersonsDiseaseDetect\",\n        COALESCE(SUM(vms.\"noOfPersonsNPLFMF\"), 0) \"noOfPersonsBothDetect\",\n        (COALESCE(SUM(vms.\"noOfPersonsNPMF\"), 0) + COALESCE(SUM(dis.\"noOfPersonsDisease\"), 0)) \"noOfPersonsTotDetect\",\n        COALESCE(SUM(distreat.\"noOfPersonsDiseaseTreated\"), 0) \"noOfPersonsDiseaseTreated\",\n        COALESCE(SUM(mfTreat.\"noOfPersonsMFTreated\"), 0) \"noOfPersonsMFTreated\",\n        (COALESCE(SUM(mfTreat.\"noOfPersonsMFTreated\"),0) + COALESCE(SUM(distreat.\"noOfPersonsDiseaseTreated\"), 0)) \"noOfPersonsTotTreated\",\n        (((COALESCE(SUM(vms.\"noOfPersonsNPS\"), 0) / (").concat(monthDiff, " * COALESCE(fcuTargets.target, 0) * 1.00)) * 100.00) ::DECIMAL(10, 2)) AS \"percentAchieved\",\n        COALESCE(SUM(vms.\"noOfPersonsNBSE\"), 0) \"noOfBSExamined\",\n        ((COALESCE(SUM(vms.\"noOfPersonsNBSE\"), 0) /\n        ((CASE\n          WHEN COALESCE(SUM(vms.\"noOfPersonsNPS\"), 0) = 0 THEN NULL\n          ELSE COALESCE(SUM(vms.\"noOfPersonsNPS\"), 0)\n        END)) * 100.00) ::DECIMAL(10, 2)) AS \"percentExamined\"\n      FROM public.\"districts\" d\n      LEFT JOIN public.\"mfPositiveLineLists\" mf\n        ON mf.\"districtId\" = d.id\n      JOIN public.\"verticalControlUnits\" v\n        ON mf.\"nameOfUnit\" = v.id\n      LEFT JOIN public.\"vFCUTargets\" fcuTargets on v.id = fcuTargets.id\n      LEFT JOIN public.\"vMFPositiveLineListSurveysById\" vms\n        ON vms.id = mf.id\n      LEFT JOIN (SELECT\n        COUNT(DISTINCT \"villageId\") \"noVillages\",\n        \"nameOfUnit\",\n        \"districtId\"\n      FROM public.\"mfPositiveLineLists\"\n      GROUP BY \"nameOfUnit\",\n              \"districtId\") NV\n        ON NV.\"districtId\" = d.id\n        AND NV.\"nameOfUnit\" = v.id\n      LEFT JOIN (SELECT\n        COUNT(DISTINCT \"town\") \"noTowns\",\n        \"nameOfUnit\",\n        \"districtId\"\n      FROM public.\"mfPositiveLineLists\"\n      GROUP BY \"nameOfUnit\",\n              \"districtId\") NT\n        ON NT.\"districtId\" = d.id\n        AND NT.\"nameOfUnit\" = v.id\n      LEFT JOIN (SELECT\n        COUNT(id) \"noOfPersonsDisease\",\n        \"nameOfUnit\",\n        \"districtId\"\n      FROM public.\"lymphedemaLineLists\"\n      WHERE \"isActive\" = TRUE\n      GROUP BY \"nameOfUnit\",\n              \"districtId\") dis\n        ON dis.\"districtId\" = d.id\n        AND dis.\"nameOfUnit\" = v.id\n      LEFT JOIN (SELECT\n        COUNT(l1.id) \"noOfPersonsDiseaseTreated\",\n        \"nameOfUnit\",\n        \"districtId\"\n      FROM public.\"lymphedemaLineLists\" l1\n      JOIN public.\"lymphedemaLineListSurveys\" l2\n        ON l1.id = l2.\"lymphedemaLineListId\"\n      WHERE l1.\"isActive\" = TRUE\n      AND l2.\"isVerified\" = TRUE\n      AND l2.\"isActive\" = TRUE\n      GROUP BY \"nameOfUnit\",\n              \"districtId\") distreat\n        ON distreat.\"districtId\" = d.id\n        AND distreat.\"nameOfUnit\" = v.id\n      LEFT JOIN (SELECT\n        COUNT(m1.id) \"noOfPersonsMFTreated\",\n        \"nameOfUnit\",\n        \"districtId\"\n      FROM public.\"mfPositiveLineListPatients\" m1\n      JOIN public.\"mfPositiveLineLists\" m2\n        ON m2.id = m1.\"mfPositiveLineListId\"\n      WHERE m1.\"isActive\" = TRUE\n      AND m1.\"isTreatmentGive\" = TRUE\n      AND m2.\"isActive\" = TRUE\n      GROUP BY \"nameOfUnit\",\n              \"districtId\") mfTreat\n        ON mfTreat.\"districtId\" = d.id\n        AND mfTreat.\"nameOfUnit\" = v.id\n      WHERE v.\"unitType\" in ('FCU', 'MC', 'RCTC') and \n      (date(concat(mf.\"year\"::varchar,'-',mf.\"month\"::varchar,'-01')) BETWEEN '").concat(startDate, "' AND '").concat(endDate, "')\n      GROUP BY v.\"nameOfControlUnit\",\n              mf.\"districtId\",\n              d.\"districtName\",\n              v.id,\n              fcuTargets.target"), {// replacements: { year: year},
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

                        case 10:
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

    return function getFCUMisMtrReportDao2(_x3) {
      return _ref5.apply(this, arguments);
    };
  }();

  return {
    getFCUMisMtrReportDao: getFCUMisMtrReportDao
  };
};

var _default = FCUMisMtrReportDao();

exports["default"] = _default;
//# sourceMappingURL=FCUMisMtrReportDao.js.map
