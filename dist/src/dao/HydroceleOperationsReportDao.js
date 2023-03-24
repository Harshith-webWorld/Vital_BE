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

var Op = _sequelize["default"].Sequelize.Op;
var sqDB = _sequelize["default"].Sequelize.sqDb;

var HydroceleOperationsReportDao = function HydroceleOperationsReportDao() {
  var getHydroceleOperationsReportDao = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve) {
                  var response, year, lastYear;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          response = {};
                          year = req.body.year;
                          lastYear = year - 1;

                          _sequelize["default"].sequelize.query("SELECT\n      COALESCE(A.\"districtId\", B.\"districtId\") AS \"districtId\",\n      COALESCE(A.\"districtName\", B.\"districtName\") AS \"districtName\",\n      COALESCE(A.jan, 0) AS \"jan\",\n      COALESCE(A.feb, 0) AS \"feb\",\n      COALESCE(A.mar, 0) AS \"mar\",\n      COALESCE(A.apr, 0) AS \"apr\",\n      COALESCE(A.may, 0) AS \"may\",\n      COALESCE(A.jun, 0) AS \"jun\",\n      COALESCE(A.jul, 0) AS \"jul\",\n      COALESCE(A.aug, 0) AS \"aug\",\n      COALESCE(A.sep, 0) AS \"sep\",\n      COALESCE(A.oct, 0) AS \"oct\",\n      COALESCE(A.nov, 0) AS \"nov\",\n      COALESCE(A.dec, 0) AS \"dec\",\n      COALESCE(A.total, 0) AS \"total\",\n      COALESCE(B.\"totalLast\", 0) AS \"totalLast\",\n      (CASE\n        WHEN COALESCE(COALESCE(B.\"totalLast\", 0) - A.\"total\", 0) < 0 THEN 0\n        ELSE COALESCE(COALESCE(B.\"totalLast\", 0) - A.\"total\", 0)\n      END) AS Pending\n    FROM (SELECT\n      D.id as \"districtId\",\n      D.\"districtName\",\n      SUM(H.jan) AS \"jan\",\n      SUM(H.feb) AS \"feb\",\n      SUM(H.mar) AS \"mar\",\n      SUM(H.apr) AS \"apr\",\n      SUM(H.may) AS \"may\",\n      SUM(H.jun) AS \"jun\",\n      SUM(H.jul) AS \"jul\",\n      SUM(H.aug) AS \"aug\",\n      SUM(H.sep) AS \"sep\",\n      SUM(H.oct) AS \"oct\",\n      SUM(H.nov) AS \"nov\",\n      SUM(H.dec) AS \"dec\",\n      SUM(H.jan + H.feb + H.mar + H.apr + H.may + H.jun + H.jul + H.aug + H.sep + H.oct + H.nov + H.dec) AS \"total\"\n    FROM public.districts D\n    LEFT JOIN (select \n               * \n               from public.\"hydrocelectomyOperations\"  \n               WHERE YEAR = :year) H\n      ON D.id = H.\"districtId\"\n    GROUP BY H.\"districtId\",\n             D.id,\n             D.\"districtName\"\n    ORDER BY H.\"districtId\") A\n    FULL JOIN (SELECT\n      H.\"districtId\",\n      D.id,\n      D.\"districtName\",\n      SUM(H.jan + H.feb + H.mar + H.apr + H.may + H.jun + H.jul + H.aug + H.sep + H.oct + H.nov + H.dec) AS \"totalLast\"\n    FROM public.\"hydrocelectomyOperations\" H\n    LEFT JOIN public.districts D\n      ON D.id = H.\"districtId\"\n    WHERE YEAR <=\n    (\n    :lastYear\n    )\n    GROUP BY H.\"districtId\",\n             D.id,\n             D.\"districtName\"\n    ORDER BY H.\"districtId\") B\n      ON A.\"districtId\" = B.\"districtId\"", {
                            replacements: {
                              year: year,
                              lastYear: lastYear
                            } // type: Sequelize.QueryTypes.SELECT

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

                        case 4:
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

    return function getHydroceleOperationsReportDao(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return {
    getHydroceleOperationsReportDao: getHydroceleOperationsReportDao
  };
};

var _default = HydroceleOperationsReportDao();

exports["default"] = _default;
//# sourceMappingURL=HydroceleOperationsReportDao.js.map
