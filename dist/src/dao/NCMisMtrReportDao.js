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

var NCMisMtrReportDao = function NCMisMtrReportDao() {
  var getNCMisMtrReportDao = /*#__PURE__*/function () {
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
                          console.log(endDate, endMonthLastDate, "endDate");

                          _sequelize["default"].sequelize.query("SELECT\n      fUnit.\"districtId\",\n      d.\"districtName\",\n      fUnit.\"nameOfControlUnit\",\n      fUnit.\"fieldUnitName\",\n      COALESCE(SUM(vms.\"noOfPersonsNPS\"), 0) \"noOfPersonSurveyed\",\n      ".concat(monthDiff * 1500, " AS \"target\",\n      COALESCE(SUM(vms.\"noOfPersonsNPMF\"), 0) \"noOfPersonsMFDetect\",\n      COALESCE(SUM(dis.\"noOfPersonsDisease\"), 0) \"noOfPersonsDiseaseDetect\",\n      (COALESCE(SUM(vms.\"noOfPersonsNPMF\"), 0) + COALESCE(SUM(dis.\"noOfPersonsDisease\"), 0)) \"noOfPersonsTotDetect\",\n      COALESCE(SUM(distreat.\"noOfPersonsDiseaseTreated\"), 0) \"noOfPersonsDiseaseTreated\",\n      COALESCE(SUM(mfTreat.\"noOfPersonsMFTreated\"), 0) \"noOfPersonsMFTreated\",\n      (COALESCE(SUM(mfTreat.\"noOfPersonsMFTreated\"), 0) + COALESCE(SUM(distreat.\"noOfPersonsDiseaseTreated\"), 0)) \"noOfPersonsTotTreated\",\n      (((COALESCE(SUM(vms.\"noOfPersonsNPS\"), 0) / (").concat(monthDiff * 1500, " * 1.00)) * 100.00) ::DECIMAL(10, 2)) AS \"percentAchieved\",\n      COALESCE(SUM(vms.\"noOfPersonsNBSE\"), 0) \"noOfBSExamined\",\n      COALESCE(((COALESCE(SUM(vms.\"noOfPersonsNBSE\"), 0) * 1.0 /\n      ((CASE\n        WHEN COALESCE(SUM(vms.\"noOfPersonsNPS\"), 0) = 0 THEN NULL\n        ELSE SUM(vms.\"noOfPersonsNPS\")\n      END)) * 100.00) ::DECIMAL(10, 2)), 0.00) AS \"percentExamined\",\n      COALESCE(((COALESCE(SUM(vms.\"noOfPersonsNPMF\"), 0) * 1.0 /\n      ((CASE\n        WHEN COALESCE(SUM(vms.\"noOfPersonsNBSE\"), 0) = 0 THEN NULL\n        ELSE SUM(vms.\"noOfPersonsNBSE\")\n      END)) * 100.00) ::DECIMAL(10, 2)), 0.00) AS \"mfPercent\",\n      COALESCE(((COALESCE(SUM(dis.\"noOfPersonsDisease\"), 0) * 1.0 /\n      ((CASE\n        WHEN COALESCE(SUM(vms.\"noOfPersonsNBSE\"), 0) = 0 THEN NULL\n        ELSE SUM(vms.\"noOfPersonsNBSE\")\n      END)) * 100.00) ::DECIMAL(10, 2)), 0.00) AS \"disPercent\"\n      FROM (SELECT\n      vcfu.id \"fieldUnitId\",\n      vcfu.\"fieldUnitName\",\n      vcfu.\"fieldUnitType\",\n      vcfu.\"districtId\",\n      vcfu.\"verticalControlUnitId\",\n      vcu.\"nameOfControlUnit\"\n      FROM public.\"verticalControlFieldUnits\" vcfu\n      JOIN public.\"verticalControlUnits\" vcu\n      ON vcfu.\"verticalControlUnitId\" = vcu.id\n      WHERE vcfu.\"fieldUnitType\" LIKE 'NC') fUnit\n      LEFT JOIN public.\"districts\" d\n      ON fUnit.\"districtId\" = d.id\n      LEFT JOIN public.\"mfPositiveLineLists\" mf\n      ON mf.\"nameOfUnit\" = fUnit.\"verticalControlUnitId\"\n      AND (date(concat(mf.\"year\"::varchar,'-',mf.\"month\"::varchar,'-01')) BETWEEN '").concat(startDate, "' AND '").concat(endDate, "')\n      LEFT JOIN public.\"verticalControlUnits\" v\n      ON fUnit.\"verticalControlUnitId\" = v.id\n      LEFT JOIN public.\"vMFPositiveLineListSurveysById\" vms\n      ON vms.id = mf.id\n      LEFT JOIN (SELECT\n      COUNT(id) \"noOfPersonsDisease\",\n      \"nameOfUnit\",\n      \"districtId\"\n      FROM public.\"lymphedemaLineLists\" l1\n      WHERE \"isActive\" = TRUE\n      AND (date(concat(l1.\"year\"::varchar,'-',l1.\"month\"::varchar,'-01')) BETWEEN '").concat(startDate, "' AND '").concat(endDate, "')\n      GROUP BY \"nameOfUnit\",\n             \"districtId\") dis\n      ON dis.\"districtId\" = d.id\n      AND dis.\"nameOfUnit\" = v.id\n      LEFT JOIN (SELECT\n      COUNT(l1.id) \"noOfPersonsDiseaseTreated\",\n      \"nameOfUnit\",\n      \"districtId\"\n      FROM public.\"lymphedemaLineLists\" l1\n      JOIN public.\"lymphedemaLineListSurveys\" l2\n      ON l1.id = l2.\"lymphedemaLineListId\"\n      WHERE l1.\"isActive\" = TRUE\n      AND l2.\"isVerified\" = TRUE\n      AND l2.\"isActive\" = TRUE\n      AND (date(concat(l1.\"year\"::varchar,'-',l1.\"month\"::varchar,'-01')) BETWEEN '").concat(startDate, "' AND '").concat(endDate, "')\n      GROUP BY \"nameOfUnit\",\n             \"districtId\") distreat\n      ON distreat.\"districtId\" = d.id\n      AND distreat.\"nameOfUnit\" = v.id\n      LEFT JOIN (SELECT\n      COUNT(m1.id) \"noOfPersonsMFTreated\",\n      \"nameOfUnit\",\n      \"districtId\"\n      FROM public.\"mfPositiveLineListPatients\" m1\n      JOIN public.\"mfPositiveLineLists\" m2\n      ON m2.id = m1.\"mfPositiveLineListId\"\n      WHERE m1.\"isActive\" = TRUE\n      AND m1.\"isTreatmentGive\" = TRUE\n      AND m2.\"isActive\" = TRUE\n      AND (date(concat(m2.\"year\"::varchar,'-',m2.\"month\"::varchar,'-01')) BETWEEN '").concat(startDate, "' AND '").concat(endDate, "')\n      GROUP BY \"nameOfUnit\",\n             \"districtId\") mfTreat\n      ON mfTreat.\"districtId\" = d.id\n      AND mfTreat.\"nameOfUnit\" = v.id\n      GROUP BY fUnit.\"districtId\",\n             d.\"districtName\",\n             fUnit.\"nameOfControlUnit\",\n             fUnit.\"fieldUnitName\""), {// replacements: { year: year},
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

                        case 11:
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

    return function getNCMisMtrReportDao(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return {
    getNCMisMtrReportDao: getNCMisMtrReportDao
  };
};

var _default = NCMisMtrReportDao(); // let nc = `SELECT
// fUnit."districtId",
// d."districtName",
// fUnit."nameOfControlUnit",
// fUnit."fieldUnitName",
// COALESCE(SUM(vms."noOfPersonsNPS"), 0) "noOfPersonSurveyed",
// ${monthDiff * 1500} AS "target",
// COALESCE(SUM(vms."noOfPersonsNPMF"), 0) "noOfPersonsMFDetect",
// COALESCE(SUM(dis."noOfPersonsDisease"), 0) "noOfPersonsDiseaseDetect",
// (COALESCE(SUM(vms."noOfPersonsNPMF"), 0) + COALESCE(SUM(dis."noOfPersonsDisease"), 0)) "noOfPersonsTotDetect",
// COALESCE(SUM(distreat."noOfPersonsDiseaseTreated"), 0) "noOfPersonsDiseaseTreated",
// COALESCE(SUM(mfTreat."noOfPersonsMFTreated"), 0) "noOfPersonsMFTreated",
// (COALESCE(SUM(mfTreat."noOfPersonsMFTreated"), 0) + COALESCE(SUM(distreat."noOfPersonsDiseaseTreated"), 0)) "noOfPersonsTotTreated",
// (((COALESCE(SUM(vms."noOfPersonsNPS"), 0) / (${monthDiff * 1500} * 1.00)) * 100.00) ::DECIMAL(10, 2)) AS "percentAchieved",
// COALESCE(SUM(vms."noOfPersonsNBSE"), 0) "noOfBSExamined",
// COALESCE(((COALESCE(SUM(vms."noOfPersonsNBSE"), 0) * 1.0 /
// ((CASE
//   WHEN COALESCE(SUM(vms."noOfPersonsNPS"), 0) = 0 THEN NULL
//   ELSE SUM(vms."noOfPersonsNPS")
// END)) * 100.00) ::DECIMAL(10, 2)), 0) AS "percentExamined",
// COALESCE(((COALESCE(SUM(vms."noOfPersonsNPMF"), 0) * 1.0 /
// ((CASE
//   WHEN COALESCE(SUM(vms."noOfPersonsNBSE"), 0) = 0 THEN NULL
//   ELSE SUM(vms."noOfPersonsNBSE")
// END)) * 100.00) ::DECIMAL(10, 2)), 0) AS "mfPercent",
// COALESCE(((COALESCE(SUM(dis."noOfPersonsDisease"), 0) * 1.0 /
// ((CASE
//   WHEN COALESCE(SUM(vms."noOfPersonsNBSE"), 0) = 0 THEN NULL
//   ELSE SUM(vms."noOfPersonsNBSE")
// END)) * 100.00) ::DECIMAL(10, 2)), 0) AS "disPercent"
// FROM (SELECT
// vcfu.id "fieldUnitId",
// vcfu."fieldUnitName",
// vcfu."fieldUnitType",
// vcfu."districtId",
// vcfu."verticalControlUnitId",
// vcu."nameOfControlUnit"
// FROM public."verticalControlFieldUnits" vcfu
// JOIN public."verticalControlUnits" vcu
// ON vcfu."verticalControlUnitId" = vcu.id
// WHERE vcfu."fieldUnitType" LIKE 'NC') fUnit
// LEFT JOIN public."districts" d
// ON fUnit."districtId" = d.id
// LEFT JOIN public."mfPositiveLineLists" mf
// ON mf."nameOfUnit" = fUnit."verticalControlUnitId"
// LEFT JOIN public."verticalControlUnits" v
// ON fUnit."verticalControlUnitId" = v.id
// LEFT JOIN public."vMFPositiveLineListSurveysById" vms
// ON vms.id = mf.id
// LEFT JOIN (SELECT
// COUNT(id) "noOfPersonsDisease",
// "nameOfUnit",
// "districtId"
// FROM public."lymphedemaLineLists"
// WHERE "isActive" = TRUE
// GROUP BY "nameOfUnit",
//        "districtId") dis
// ON dis."districtId" = d.id
// AND dis."nameOfUnit" = v.id
// LEFT JOIN (SELECT
// COUNT(l1.id) "noOfPersonsDiseaseTreated",
// "nameOfUnit",
// "districtId"
// FROM public."lymphedemaLineLists" l1
// JOIN public."lymphedemaLineListSurveys" l2
// ON l1.id = l2."lymphedemaLineListId"
// WHERE l1."isActive" = TRUE
// AND l2."isVerified" = TRUE
// AND l2."isActive" = TRUE
// GROUP BY "nameOfUnit",
//        "districtId") distreat
// ON distreat."districtId" = d.id
// AND distreat."nameOfUnit" = v.id
// LEFT JOIN (SELECT
// COUNT(m1.id) "noOfPersonsMFTreated",
// "nameOfUnit",
// "districtId"
// FROM public."mfPositiveLineListPatients" m1
// JOIN public."mfPositiveLineLists" m2
// ON m2.id = m1."mfPositiveLineListId"
// WHERE m1."isActive" = TRUE
// AND m1."isTreatmentGive" = TRUE
// AND m2."isActive" = TRUE
// GROUP BY "nameOfUnit",
//        "districtId") mfTreat
// ON mfTreat."districtId" = d.id
// AND mfTreat."nameOfUnit" = v.id
// GROUP BY fUnit."districtId",
//        d."districtName",
//        fUnit."nameOfControlUnit",
//        fUnit."fieldUnitName"`


exports["default"] = _default;
//# sourceMappingURL=NCMisMtrReportDao.js.map
