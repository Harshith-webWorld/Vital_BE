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

var EntologicalMisMtrReportDao = function EntologicalMisMtrReportDao() {
  var getEntologicalMisMtrReportDao = /*#__PURE__*/function () {
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

                          _sequelize["default"].sequelize.query("select\n      A.\"nameOfUnit\",\n      coalesce(A.\"totalTime\",0) totalTime,\n      coalesce(A.\"cQuinMale\",0) cQuinMale,\n      coalesce(A.\"cQuinFemale\",0) cQuinFemale,\n      coalesce(A.\"cQuinTot\",0) cQuinTot,\n      coalesce(A.\"noOfMosquitoDissected\",0) noOfMosquitoDissected,\n      coalesce(A.\"noOfPositiveI_II_IIIStage\",0) noOfPositiveI_II_IIIStage,\n      coalesce(A.\"noOfPositiveIIIStage\",0) noOfPositiveIIIStage,\n      coalesce((coalesce(A.\"cQuinTot\",0)*10.0/\n      (case \n       when A.\"totalTime\"=null then null\n       when A.\"totalTime\"=0 then null\n      else A.\"totalTime\" end))::DECIMAL(10, 2), 0) \"densityPer10Menhrs\",\n      coalesce((coalesce(A.\"noOfPositiveI_II_IIIStage\",0) * 100.00 /\n      (case when A.\"noOfMosquitoDissected\" = null then null\n      when\n         A.\"noOfMosquitoDissected\" = 0 \n      then\n         null \n      else A.\"noOfMosquitoDissected\" end ))::DECIMAL(10, 2), 0) AS \"InfectionRate\",\n      coalesce((coalesce(A.\"noOfPositiveIIIStage\",0) * 100.00 /\n      (case when A.\"noOfMosquitoDissected\" = null then null\n      when\n         A.\"noOfMosquitoDissected\" = 0 \n      then\n         null \n      else A.\"noOfMosquitoDissected\" end ))::DECIMAL(10, 2),0) AS \"InfectivityRate\"\n      from\n      (select VC.\"nameOfControlUnit\" \"nameOfUnit\",\n      sum(EL.\"totalTimeSpentHrs\"+ coalesce(EL.\"totalTimeSpentMinutes\",0)/60.0)::DECIMAL(10, 2) AS \"totalTime\",\n      Sum(ELC.\"noOfMosquitoCollectedMale\") \"cQuinMale\",\n      Sum(ELC.\"noOfMosquitoCollectedFemale\") \"cQuinFemale\",\n      Sum(ELC.\"noOfMosquitoCollectedTotal\") \"cQuinTot\",\n      Sum(\"mosqDissectedCulexQui\") \"noOfMosquitoDissected\",\n      Sum(\"totalNoPositiveMosq1to3Stage\") \"noOfPositiveI_II_IIIStage\",\n      Sum(\"totalNoPositiveMosq3Stage\") \"noOfPositiveIIIStage\"\n      from (select * from public.\"verticalControlUnits\" where \"unitType\" in('FCU','FSU'))VC -- Filter\n      -- left join (select * from public.\"entomologicalLarvicidalLists\" where year=2022 and month=1 )EL --filter\n      left join (select * from public.\"entomologicalLarvicidalLists\" \n      where (date(concat(\"year\"::varchar,'-',\"month\"::varchar,'-01')) BETWEEN '".concat(startDate, "' AND '").concat(endDate, "') )EL --filter\n      ON VC.\"id\"=EL.\"nameOfUnit\"\n      left join public.\"entomologicalDataCounts\" ELC\n      ON ELC.\"entomologicalLarvicidalListId\"=EL.\"id\"\n      left join public.\"udCategoryOptions\" UC\n      ON UC.\"id\"=ELC.\"mosquitoTypeId\" and UC.\"categoryOptionCode\" = 'CLX'\n      group by VC.\"nameOfControlUnit\") A\n      ORDER BY A.\"nameOfUnit\" DESC"), {// replacements: { year: year},
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

    return function getEntologicalMisMtrReportDao(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return {
    getEntologicalMisMtrReportDao: getEntologicalMisMtrReportDao
  };
};

var _default = EntologicalMisMtrReportDao();

exports["default"] = _default;
//# sourceMappingURL=EntologicalMisMtrReportDao.js.map
