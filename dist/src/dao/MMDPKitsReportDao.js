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

var MMDPKitsReportDao = function MMDPKitsReportDao() {
  var getMMDPKitsReportDao = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(resolve) {
                  var response, year;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          response = {};
                          year = req.body.year;

                          _sequelize["default"].sequelize.query("SELECT\n      COALESCE(A.count, 0) AS count,\n      COALESCE(A.month, 0) AS month,\n      D.id AS \"districtId\",\n      D.\"districtName\"\n    FROM (SELECT\n      month,\n      \"districtId\",\n      D.\"districtName\",\n      COUNT(L.id)\n    FROM public.\"lymphedemaLineLists\" L\n    JOIN public.\"lymphedemaLineListFollowUpsLves\" LF\n      ON L.id = LF.\"lymphedemaLineListId\"\n    LEFT JOIN public.districts D\n      ON D.id = L.\"districtId\"\n    WHERE L.\"isActive\" = TRUE\n    AND LF.\"isServiceMMDPKitGiven\" = TRUE\n    AND date_part('year', LF.\"serviceMMDPKitGivenDate\") = :year\n    GROUP BY month,\n             \"districtId\",\n             D.\"districtName\") A\n    RIGHT JOIN public.districts D\n      ON D.id = A.\"districtId\";", {
                            replacements: {
                              year: year
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

                        case 3:
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

    return function getMMDPKitsReportDao(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return {
    getMMDPKitsReportDao: getMMDPKitsReportDao
  };
};

var _default = MMDPKitsReportDao();

exports["default"] = _default;
//# sourceMappingURL=MMDPKitsReportDao.js.map
