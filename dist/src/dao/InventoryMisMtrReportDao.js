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

var InventoryMisMtrReportDao = function InventoryMisMtrReportDao() {
  var getInventoryMisMtrReportDao = /*#__PURE__*/function () {
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

                          _sequelize["default"].sequelize.query("select VC.\"nameOfControlUnit\" \"unitName\",VC.\"itemName\" \"nameOfLarvicideDEC\",\n      coalesce(sum(\"openingBalanceQty\"),0) AS \"openingBalance\",\n      coalesce(sum(\"receivedDuringMonthQty\"),0) AS \"receipt\",\n      coalesce(sum(\"totalStock\"),0) AS \"total\",\n      coalesce(sum(\"actualConsumption\"),0) AS \"consumption\",\n      coalesce(sum(\"balanceEndOfMonth\"),0) AS \"balanceEndOfMonth\"\n      from (select vc1.*,uc1.\"categoryOptionName\" \"itemName\", uc1.\"categoryOptionCode\" \"itemCode\", uc1.\"id\" \"itemId\" from public.\"verticalControlUnits\" vc1, public.\"udCategoryOptions\" uc1\n      where vc1.\"unitType\" in('FCU','FSU') and uc1.\"categoryCode\"=1020 and uc1.\"categoryOptionCode\" in ('T','BTI','DEC')) VC\n      left join (select vc1.* from public.\"verticalUnitStockPositions\" vc1\n      -- where vc1.year=2022 and vc1.month=1)VSP -- Filter\n      where (date(concat(vc1.\"year\"::varchar,'-',vc1.\"month\"::varchar,'-01')) BETWEEN '".concat(startDate, "' AND '").concat(endDate, "'))VSP -- Filter\n      ON VC.id= VSP.\"unitName\" and VSP.\"items\"=VC.\"itemId\"\n      left join public.\"udCategoryOptions\" UC\n      ON UC.id= VSP.\"items\" and VC.\"itemCode\"=UC.\"categoryOptionCode\"\n      group by VC.\"unitType\",VC.\"nameOfControlUnit\",VC.\"itemName\" ,UC.\"categoryOptionName\"\n      order by VC.\"unitType\",VC.\"nameOfControlUnit\""), {// replacements: { year: year},
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

    return function getInventoryMisMtrReportDao(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return {
    getInventoryMisMtrReportDao: getInventoryMisMtrReportDao
  };
};

var _default = InventoryMisMtrReportDao();

exports["default"] = _default;
//# sourceMappingURL=InventoryMisMtrReportDao.js.map
