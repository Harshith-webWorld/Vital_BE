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

var RCOMisMtrReportDao = function RCOMisMtrReportDao() {
  var getRCOMisMtrReportDao = /*#__PURE__*/function () {
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

                          _sequelize["default"].sequelize.query("SELECT\n      *,\n      (SELECT\n        SUM(\"noOpt\")\n      FROM (SELECT\n        year,\n        1 AS month,\n        concat(year, '-1-01') AS fulldate,\n        SUM(jan) AS \"noOpt\"\n      FROM public.\"hydrocelectomyOperations\"\n      GROUP BY year\n      UNION\n      SELECT\n        year,\n        2 AS month,\n        concat(year, '-2-01') AS fulldate,\n        SUM(feb) AS \"noOpt\"\n      FROM public.\"hydrocelectomyOperations\"\n      GROUP BY year\n      UNION\n      SELECT\n        year,\n        3 AS month,\n        concat(year, '-3-01') AS fulldate,\n        SUM(mar) AS \"noOpt\"\n      FROM public.\"hydrocelectomyOperations\"\n      GROUP BY year\n      UNION\n      SELECT\n        year,\n        4 AS month,\n        concat(year, '-4-01') AS fulldate,\n        SUM(apr) AS \"noOpt\"\n      FROM public.\"hydrocelectomyOperations\"\n      GROUP BY year\n      UNION\n      SELECT\n        year,\n        5 AS month,\n        concat(year, '-5-01') AS fulldate,\n        SUM(may) AS \"noOpt\"\n      FROM public.\"hydrocelectomyOperations\"\n      GROUP BY year\n      UNION\n      SELECT\n        year,\n        6 AS month,\n        concat(year, '-6-01') AS fulldate,\n        SUM(jun) AS \"noOpt\"\n      FROM public.\"hydrocelectomyOperations\"\n      GROUP BY year\n      UNION\n      SELECT\n        year,\n        7 AS month,\n        concat(year, '-7-01') AS fulldate,\n        SUM(jul) AS \"noOpt\"\n      FROM public.\"hydrocelectomyOperations\"\n      GROUP BY year\n      UNION\n      SELECT\n        year,\n        8 AS month,\n        concat(year, '-8-01') AS fulldate,\n        SUM(aug) AS \"noOpt\"\n      FROM public.\"hydrocelectomyOperations\"\n      GROUP BY year\n      UNION\n      SELECT\n        year,\n        9 AS month,\n        concat(year, '-9-01') AS fulldate,\n        SUM(sep) AS \"noOpt\"\n      FROM public.\"hydrocelectomyOperations\"\n      GROUP BY year\n      UNION\n      SELECT\n        year,\n        10 AS month,\n        concat(year, '-10-01') AS fulldate,\n        SUM(oct) AS \"noOpt\"\n      FROM public.\"hydrocelectomyOperations\"\n      GROUP BY year\n      UNION\n      SELECT\n        year,\n        11 AS month,\n        concat(year, '-11-01') AS fulldate,\n        SUM(nov) AS \"noOpt\"\n      FROM public.\"hydrocelectomyOperations\"\n      GROUP BY year\n      UNION\n      SELECT\n        year,\n        12 AS month,\n        concat(year, '-12-01') AS fulldate,\n        SUM(dec) AS \"noOpt\"\n      FROM public.\"hydrocelectomyOperations\"\n      GROUP BY year\n      ORDER BY year, month) a\n      WHERE a.fulldate BETWEEN '".concat(startDate, "' AND '").concat(endDate, "')\n      AS hydeocel\n    FROM (SELECT\n      \"unitType\",\n      COUNT(\"unitType\") \"noUnits\",\n      COALESCE(SUM(\"noOfPersonSurveyed\"), 0) \"noOfPersonSurveyed\",\n      COALESCE(SUM(\"target\"), 0) \"target\",\n      ((((COALESCE(SUM(\"noOfPersonSurveyed\"), 0) * 1.0) /\n      ((CASE\n        WHEN COALESCE(SUM(\"target\"), 0) = 0 THEN NULL\n        ELSE SUM(\"target\")\n      END))) * 100.00) ::DECIMAL(10, 2)) AS \"percentAchieved\",\n      COALESCE(SUM(\"noOfBSExamined\"), 0) \"noOfBSExamined\",\n      ((((COALESCE(SUM(\"noOfBSExamined\"), 0) * 1.0) /\n      ((CASE\n        WHEN COALESCE(SUM(\"noOfPersonSurveyed\"), 0) = 0 THEN NULL\n        ELSE SUM(\"noOfPersonSurveyed\")\n      END))) * 100.00) ::DECIMAL(10, 2)) AS \"percentExamined\",\n      COALESCE(SUM(\"noOfPersonsMFDetect\"), 0) \"noOfPersonsMFDetect\",\n      COALESCE(SUM(\"noOfPersonsDiseaseDetect\"), 0) \"noOfPersonsDiseaseDetect\",\n      COALESCE(SUM(\"noOfPersonsTotDetect\"), 0) \"noOfPersonsTotDetect\",\n      COALESCE(SUM(\"noOfPersonsTotTreated\"), 0) \"noOfPersonsTotTreated\"\n    FROM (SELECT\n      'Filaria Night Clinics' AS \"unitType\",\n      fUnit.\"districtId\",\n      d.\"districtName\",\n      fUnit.\"nameOfControlUnit\",\n      fUnit.\"fieldUnitName\",\n      COALESCE(SUM(vms.\"noOfPersonsNPS\"), 0) \"noOfPersonSurveyed\",\n      ").concat(monthDiff * 1500, " AS \"target\",\n      COALESCE(SUM(vms.\"noOfPersonsNPMF\"), 0) \"noOfPersonsMFDetect\",\n      COALESCE(SUM(dis.\"noOfPersonsDisease\"), 0) \"noOfPersonsDiseaseDetect\",\n      (COALESCE(SUM(vms.\"noOfPersonsNPMF\"), 0) + COALESCE(SUM(dis.\"noOfPersonsDisease\"), 0)) \"noOfPersonsTotDetect\",\n      COALESCE(SUM(distreat.\"noOfPersonsDiseaseTreated\"), 0) \"noOfPersonsDiseaseTreated\",\n      COALESCE(SUM(mfTreat.\"noOfPersonsMFTreated\"), 0) \"noOfPersonsMFTreated\",\n      (COALESCE(SUM(mfTreat.\"noOfPersonsMFTreated\"), 0) + COALESCE(SUM(distreat.\"noOfPersonsDiseaseTreated\"), 0)) \"noOfPersonsTotTreated\",\n      (((COALESCE(SUM(vms.\"noOfPersonsNPS\"), 0) / (").concat(monthDiff * 1500, " * 1.00)) * 100.00) ::DECIMAL(10, 2)) AS \"percentAchieved\",\n      COALESCE(SUM(vms.\"noOfPersonsNBSE\"), 0) \"noOfBSExamined\",\n      COALESCE(((COALESCE(SUM(vms.\"noOfPersonsNBSE\"), 0) * 1.0 /\n      ((CASE\n        WHEN COALESCE(SUM(vms.\"noOfPersonsNPS\"), 0) = 0 THEN NULL\n        ELSE SUM(vms.\"noOfPersonsNPS\")\n      END)) * 100.00) ::DECIMAL(10, 2)), 0) AS \"percentExamined\",\n      COALESCE(((COALESCE(SUM(vms.\"noOfPersonsNPMF\"), 0) * 1.0 /\n      ((CASE\n        WHEN COALESCE(SUM(vms.\"noOfPersonsNBSE\"), 0) = 0 THEN NULL\n        ELSE SUM(vms.\"noOfPersonsNBSE\")\n      END)) * 100.00) ::DECIMAL(10, 2)), 0) AS \"mfPercent\",\n      COALESCE(((COALESCE(SUM(dis.\"noOfPersonsDisease\"), 0) * 1.0 /\n      ((CASE\n        WHEN COALESCE(SUM(vms.\"noOfPersonsNBSE\"), 0) = 0 THEN NULL\n        ELSE SUM(vms.\"noOfPersonsNBSE\")\n      END)) * 100.00) ::DECIMAL(10, 2)), 0) AS \"disPercent\"\n    FROM (SELECT\n      vcfu.id \"fieldUnitId\",\n      vcfu.\"fieldUnitName\",\n      vcfu.\"fieldUnitType\",\n      vcfu.\"districtId\",\n      vcfu.\"verticalControlUnitId\",\n      vcu.\"nameOfControlUnit\"\n    FROM public.\"verticalControlFieldUnits\" vcfu\n    JOIN public.\"verticalControlUnits\" vcu\n      ON vcfu.\"verticalControlUnitId\" = vcu.id\n    WHERE vcfu.\"fieldUnitType\" = 'NC') fUnit\n    LEFT JOIN public.\"districts\" d\n      ON fUnit.\"districtId\" = d.id\n    LEFT JOIN public.\"mfPositiveLineLists\" mf\n      ON mf.\"nameOfUnit\" = fUnit.\"verticalControlUnitId\"\n      AND (DATE(concat(mf.\"year\" ::varchar, '-', mf.\"month\" ::varchar, '-01')) BETWEEN '").concat(startDate, "' AND '").concat(endDate, "')\n    LEFT JOIN public.\"verticalControlUnits\" v\n      ON fUnit.\"verticalControlUnitId\" = v.id\n    LEFT JOIN public.\"vMFPositiveLineListSurveysById\" vms\n      ON vms.id = mf.id\n    LEFT JOIN (SELECT\n      COUNT(id) \"noOfPersonsDisease\",\n      \"nameOfUnit\",\n      \"districtId\"\n    FROM public.\"lymphedemaLineLists\"\n    WHERE \"isActive\" = TRUE\n    GROUP BY \"nameOfUnit\",\n             \"districtId\") dis\n      ON dis.\"districtId\" = d.id\n      AND dis.\"nameOfUnit\" = v.id\n    LEFT JOIN (SELECT\n      COUNT(l1.id) \"noOfPersonsDiseaseTreated\",\n      \"nameOfUnit\",\n      \"districtId\"\n    FROM public.\"lymphedemaLineLists\" l1\n    JOIN public.\"lymphedemaLineListSurveys\" l2\n      ON l1.id = l2.\"lymphedemaLineListId\"\n    WHERE l1.\"isActive\" = TRUE\n    AND l2.\"isVerified\" = TRUE\n    AND l2.\"isActive\" = TRUE\n    GROUP BY \"nameOfUnit\",\n             \"districtId\") distreat\n      ON distreat.\"districtId\" = d.id\n      AND distreat.\"nameOfUnit\" = v.id\n    LEFT JOIN (SELECT\n      COUNT(m1.id) \"noOfPersonsMFTreated\",\n      \"nameOfUnit\",\n      \"districtId\"\n    FROM public.\"mfPositiveLineListPatients\" m1\n    JOIN public.\"mfPositiveLineLists\" m2\n      ON m2.id = m1.\"mfPositiveLineListId\"\n    WHERE m1.\"isActive\" = TRUE\n    AND m1.\"isTreatmentGive\" = TRUE\n    AND m2.\"isActive\" = TRUE\n    GROUP BY \"nameOfUnit\",\n             \"districtId\") mfTreat\n      ON mfTreat.\"districtId\" = d.id\n      AND mfTreat.\"nameOfUnit\" = v.id\n    GROUP BY fUnit.\"districtId\",\n             d.\"districtName\",\n             fUnit.\"nameOfControlUnit\",\n             fUnit.\"fieldUnitName\") A1\n    GROUP BY \"unitType\"\n    UNION\n    SELECT\n      \"unitType\",\n      COUNT(\"unitType\") \"noUnits\",\n      COALESCE(SUM(\"noOfPersonSurveyed\"), 0) \"noOfPersonSurveyed\",\n      COALESCE(SUM(\"target\"), 0) \"target\",\n      ((((COALESCE(SUM(\"noOfPersonSurveyed\"), 0) * 1.0) /\n      ((CASE\n        WHEN COALESCE(SUM(\"target\"), 0) = 0 THEN NULL\n        ELSE SUM(\"target\")\n      END))) * 100.00) ::DECIMAL(10, 2)) AS \"percentAchieved\",\n      COALESCE(SUM(\"noOfBSExamined\"), 0) \"noOfBSExamined\",\n      ((((COALESCE(SUM(\"noOfBSExamined\"), 0) * 1.0) /\n      ((CASE\n        WHEN COALESCE(SUM(\"noOfPersonSurveyed\"), 0) = 0 THEN NULL\n        ELSE SUM(\"noOfPersonSurveyed\")\n      END))) * 100.00) ::DECIMAL(10, 2)) AS \"percentExamined\",\n      COALESCE(SUM(\"noOfPersonsMFDetect\"), 0) \"noOfPersonsMFDetect\",\n      COALESCE(SUM(\"noOfPersonsDiseaseDetect\"), 0) \"noOfPersonsDiseaseDetect\",\n      COALESCE(SUM(\"noOfPersonsTotDetect\"), 0) \"noOfPersonsTotDetect\",\n      COALESCE(SUM(\"noOfPersonsTotTreated\"), 0) \"noOfPersonsTotTreated\"\n    FROM (SELECT\n      'Filaria Control Unit' AS \"unitType\",\n      v.\"nameOfControlUnit\",\n      v.\"districtId\",\n      d.\"districtName\",\n      fcuTargets.target AS fcuTarget,\n      COALESCE(SUM(vms.\"noOfPersonsNPS\"), 0) \"noOfPersonSurveyed\",\n      ").concat(monthDiff, " * COALESCE(fcuTargets.target, 0) AS \"target\",\n      COALESCE(SUM(vms.\"noOfPersonsNPMF\"), 0) \"noOfPersonsMFDetect\",\n      COALESCE(SUM(dis.\"noOfPersonsDisease\"), 0) \"noOfPersonsDiseaseDetect\",\n      (COALESCE(SUM(vms.\"noOfPersonsNPMF\"), 0) + COALESCE(SUM(dis.\"noOfPersonsDisease\"), 0)) \"noOfPersonsTotDetect\",\n      COALESCE(SUM(distreat.\"noOfPersonsDiseaseTreated\"), 0) \"noOfPersonsDiseaseTreated\",\n      COALESCE(SUM(mfTreat.\"noOfPersonsMFTreated\"), 0) \"noOfPersonsMFTreated\",\n      (COALESCE(SUM(mfTreat.\"noOfPersonsMFTreated\"), 0) + COALESCE(SUM(distreat.\"noOfPersonsDiseaseTreated\"), 0)) \"noOfPersonsTotTreated\",\n      (((COALESCE(SUM(vms.\"noOfPersonsNPS\"), 0) / (").concat(monthDiff, " * COALESCE(fcuTargets.target, 1) * 1.00)) * 100.00) ::DECIMAL(10, 2)) AS \"percentAchieved\",\n      COALESCE(SUM(vms.\"noOfPersonsNBSE\"), 0) \"noOfBSExamined\",\n      COALESCE(((COALESCE(SUM(vms.\"noOfPersonsNBSE\"), 0) * 1.0 /\n      ((CASE\n        WHEN COALESCE(SUM(vms.\"noOfPersonsNPS\"), 0) = 0 THEN NULL\n        ELSE SUM(vms.\"noOfPersonsNPS\")\n      END)) * 100.00) ::DECIMAL(10, 2)), 0.00) AS \"percentExamined\",\n      COALESCE(((COALESCE(SUM(vms.\"noOfPersonsNPMF\"), 0) * 1.0 /\n      ((CASE\n        WHEN COALESCE(SUM(vms.\"noOfPersonsNBSE\"), 0) = 0 THEN NULL\n        ELSE SUM(vms.\"noOfPersonsNBSE\")\n      END)) * 100.00) ::DECIMAL(10, 2)), 0.00) AS \"mfPercent\",\n      COALESCE(((COALESCE(SUM(dis.\"noOfPersonsDisease\"), 0) * 1.0 /\n      ((CASE\n        WHEN COALESCE(SUM(vms.\"noOfPersonsNBSE\"), 0) = 0 THEN NULL\n        ELSE SUM(vms.\"noOfPersonsNBSE\")\n      END)) * 100.00) ::DECIMAL(10, 2)), 0.00) AS \"disPercent\"\n    FROM public.\"verticalControlUnits\" v\n    LEFT JOIN public.\"districts\" d\n      ON v.\"districtId\" = d.id\n    LEFT JOIN (SELECT\n      *\n    FROM public.\"mfPositiveLineLists\"\n    WHERE (DATE(concat(\"year\" ::varchar, '-', \"month\" ::varchar, '-01')) BETWEEN '").concat(startDate, "' AND '").concat(endDate, "')) mf\n      ON mf.\"nameOfUnit\" = v.id\n    LEFT JOIN public.\"vFCUTargets\" fcuTargets\n      ON v.id = fcuTargets.id\n    LEFT JOIN public.\"vMFPositiveLineListSurveysById\" vms\n      ON vms.id = mf.id\n    LEFT JOIN (SELECT\n      COUNT(id) \"noOfPersonsDisease\",\n      \"nameOfUnit\",\n      \"districtId\"\n    FROM public.\"lymphedemaLineLists\"\n    WHERE \"isActive\" = TRUE\n    GROUP BY \"nameOfUnit\",\n             \"districtId\") dis\n      ON dis.\"districtId\" = d.id\n      AND dis.\"nameOfUnit\" = v.id\n    LEFT JOIN (SELECT\n      COUNT(l1.id) \"noOfPersonsDiseaseTreated\",\n      \"nameOfUnit\",\n      \"districtId\"\n    FROM public.\"lymphedemaLineLists\" l1\n    JOIN public.\"lymphedemaLineListSurveys\" l2\n      ON l1.id = l2.\"lymphedemaLineListId\"\n    WHERE l1.\"isActive\" = TRUE\n    AND l2.\"isVerified\" = TRUE\n    AND l2.\"isActive\" = TRUE\n    GROUP BY \"nameOfUnit\",\n             \"districtId\") distreat\n      ON distreat.\"districtId\" = d.id\n      AND distreat.\"nameOfUnit\" = v.id\n    LEFT JOIN (SELECT\n      COUNT(m1.id) \"noOfPersonsMFTreated\",\n      \"nameOfUnit\",\n      \"districtId\"\n    FROM public.\"mfPositiveLineListPatients\" m1\n    JOIN public.\"mfPositiveLineLists\" m2\n      ON m2.id = m1.\"mfPositiveLineListId\"\n    WHERE m1.\"isActive\" = TRUE\n    AND m1.\"isTreatmentGive\" = TRUE\n    AND m2.\"isActive\" = TRUE\n    GROUP BY \"nameOfUnit\",\n             \"districtId\") mfTreat\n      ON mfTreat.\"districtId\" = d.id\n      AND mfTreat.\"nameOfUnit\" = v.id\n    WHERE v.\"unitType\" = 'FCU'\n    GROUP BY v.\"nameOfControlUnit\",\n             v.\"unitType\",\n             v.\"districtId\",\n             d.\"districtName\",\n             fcuTargets.target) A1\n    GROUP BY \"unitType\"\n    UNION\n    SELECT\n      \"unitType\",\n      COUNT(\"unitType\") \"noUnits\",\n      COALESCE(SUM(\"noOfPersonSurveyed\"), 0) \"noOfPersonSurveyed\",\n      COALESCE(SUM(\"target\"), 0) \"target\",\n      ((((COALESCE(SUM(\"noOfPersonSurveyed\"), 0) * 1.0) /\n      ((CASE\n        WHEN COALESCE(SUM(\"target\"), 0) = 0 THEN NULL\n        ELSE SUM(\"target\")\n      END))) * 100.00) ::DECIMAL(10, 2)) AS \"percentAchieved\",\n      COALESCE(SUM(\"noOfBSExamined\"), 0) \"noOfBSExamined\",\n      ((((COALESCE(SUM(\"noOfBSExamined\"), 0) * 1.0) /\n      ((CASE\n        WHEN COALESCE(SUM(\"noOfPersonSurveyed\"), 0) = 0 THEN NULL\n        ELSE SUM(\"noOfPersonSurveyed\")\n      END))) * 100.00) ::DECIMAL(10, 2)) AS \"percentExamined\",\n      COALESCE(SUM(\"noOfPersonsMFDetect\"), 0) \"noOfPersonsMFDetect\",\n      COALESCE(SUM(\"noOfPersonsDiseaseDetect\"), 0) \"noOfPersonsDiseaseDetect\",\n      COALESCE(SUM(\"noOfPersonsTotDetect\"), 0) \"noOfPersonsTotDetect\",\n      COALESCE(SUM(\"noOfPersonsTotTreated\"), 0) \"noOfPersonsTotTreated\"\n    FROM (SELECT\n      'Filaria Survey Unit' AS \"unitType\",\n      v.\"nameOfControlUnit\",\n      COALESCE(SUM(vms.\"noOfPersonsNPS\"), 0) \"noOfPersonSurveyed\",\n      ").concat(monthDiff * 3000, " AS \"target\",\n      COALESCE(SUM(vms.\"noOfPersonsNPMF\"), 0) \"noOfPersonsMFDetect\",\n      COALESCE(SUM(dis.\"noOfPersonsDisease\"), 0) \"noOfPersonsDiseaseDetect\",\n      (COALESCE(SUM(vms.\"noOfPersonsNPMF\"), 0) + COALESCE(SUM(dis.\"noOfPersonsDisease\"), 0)) \"noOfPersonsTotDetect\",\n      COALESCE(SUM(distreat.\"noOfPersonsDiseaseTreated\"), 0) \"noOfPersonsDiseaseTreated\",\n      COALESCE(SUM(mfTreat.\"noOfPersonsMFTreated\"), 0) \"noOfPersonsMFTreated\",\n      (COALESCE(SUM(mfTreat.\"noOfPersonsMFTreated\"), 0) + COALESCE(SUM(distreat.\"noOfPersonsDiseaseTreated\"), 0)) \"noOfPersonsTotTreated\",\n      (((COALESCE(SUM(vms.\"noOfPersonsNPS\"), 0) / (").concat(monthDiff * 3000, " * 1.00)) * 100.00) ::DECIMAL(10, 2)) AS \"percentAchieved\",\n      COALESCE(SUM(vms.\"noOfPersonsNBSE\"), 0) \"noOfBSExamined\",\n      COALESCE(((COALESCE(SUM(vms.\"noOfPersonsNBSE\"), 0) * 1.0 /\n      ((CASE\n        WHEN COALESCE(SUM(vms.\"noOfPersonsNPS\"), 0) = 0 THEN NULL\n        ELSE SUM(vms.\"noOfPersonsNPS\")\n      END)) * 100.00) ::DECIMAL(10, 2)), 0.00) AS \"percentExamined\",\n      COALESCE(((COALESCE(SUM(vms.\"noOfPersonsNPMF\"), 0) * 1.0 /\n      ((CASE\n        WHEN COALESCE(SUM(vms.\"noOfPersonsNBSE\"), 0) = 0 THEN NULL\n        ELSE SUM(vms.\"noOfPersonsNBSE\")\n      END)) * 100.00) ::DECIMAL(10, 2)), 0.00) AS \"mfPercent\",\n      COALESCE(((COALESCE(SUM(dis.\"noOfPersonsDisease\"), 0) * 1.0 /\n      ((CASE\n        WHEN COALESCE(SUM(vms.\"noOfPersonsNBSE\"), 0) = 0 THEN NULL\n        ELSE SUM(vms.\"noOfPersonsNBSE\")\n      END)) * 100.00) ::DECIMAL(10, 2)), 0.00) AS \"disPercent\"\n    FROM public.\"verticalControlUnits\" v\n    LEFT JOIN public.\"districts\" d\n      ON v.\"districtId\" = d.id\n    LEFT JOIN public.\"mfPositiveLineLists\" mf\n      ON mf.\"nameOfUnit\" = v.id\n      AND (DATE(concat(mf.\"year\" ::varchar, '-', mf.\"month\" ::varchar, '-01')) BETWEEN '").concat(startDate, "' AND '").concat(endDate, "')\n    LEFT JOIN public.\"vMFPositiveLineListSurveysById\" vms\n      ON vms.id = mf.id\n    LEFT JOIN (SELECT\n      COUNT(id) \"noOfPersonsDisease\",\n      \"nameOfUnit\",\n      \"districtId\"\n    FROM public.\"lymphedemaLineLists\"\n    WHERE \"isActive\" = TRUE\n    GROUP BY \"nameOfUnit\",\n             \"districtId\") dis\n      ON dis.\"districtId\" = d.id\n      AND dis.\"nameOfUnit\" = v.id\n    LEFT JOIN (SELECT\n      COUNT(l1.id) \"noOfPersonsDiseaseTreated\",\n      \"nameOfUnit\",\n      \"districtId\"\n    FROM public.\"lymphedemaLineLists\" l1\n    JOIN public.\"lymphedemaLineListSurveys\" l2\n      ON l1.id = l2.\"lymphedemaLineListId\"\n    WHERE l1.\"isActive\" = TRUE\n    AND l2.\"isVerified\" = TRUE\n    AND l2.\"isActive\" = TRUE\n    GROUP BY \"nameOfUnit\",\n             \"districtId\") distreat\n      ON distreat.\"districtId\" = d.id\n      AND distreat.\"nameOfUnit\" = v.id\n    LEFT JOIN (SELECT\n      COUNT(m1.id) \"noOfPersonsMFTreated\",\n      \"nameOfUnit\",\n      \"districtId\"\n    FROM public.\"mfPositiveLineListPatients\" m1\n    JOIN public.\"mfPositiveLineLists\" m2\n      ON m2.id = m1.\"mfPositiveLineListId\"\n    WHERE m1.\"isActive\" = TRUE\n    AND m1.\"isTreatmentGive\" = TRUE\n    AND m2.\"isActive\" = TRUE\n    GROUP BY \"nameOfUnit\",\n             \"districtId\") mfTreat\n      ON mfTreat.\"districtId\" = d.id\n      AND mfTreat.\"nameOfUnit\" = v.id\n    WHERE v.\"unitType\" = 'FSU'\n    GROUP BY v.\"nameOfControlUnit\",\n             v.\"unitType\") A1\n    GROUP BY \"unitType\") sub1"), {// replacements: { year: year},
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

    return function getRCOMisMtrReportDao(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return {
    getRCOMisMtrReportDao: getRCOMisMtrReportDao
  };
};

var _default = RCOMisMtrReportDao();

exports["default"] = _default;
//# sourceMappingURL=RCOMisMtrReportDao.js.map
